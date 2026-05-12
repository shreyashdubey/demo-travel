import { NextResponse } from "next/server";
import { z } from "zod";
import { packages } from "@/data/content";

export const runtime = "nodejs";

const LeadSchema = z.object({
  ref: z.string().min(4).max(40),
  name: z.string().min(1).max(120),
  travellers: z.number().int().min(1).max(20),
  whatsapp: z.string().min(6).max(40),
  email: z.union([z.string().email(), z.literal("")]).default(""),
  month: z.string().min(1).max(20),
  pkg: z.string().min(1).max(60),
  pace: z.enum(["slow", "standard", "packed"]),
  stay: z.enum(["homestay", "boutique", "hotel"]),
  food: z.enum(["veg", "non-veg", "vegan"]),
  notes: z.string().max(2000).default(""),
  // Honeypot: visible to bots, hidden from humans. Must be empty.
  website: z.string().max(0).default(""),
});

type Lead = z.infer<typeof LeadSchema>;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-json" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, reason: "validation" }, { status: 400 });
  }

  const lead = parsed.data;

  // Silently accept honeypot hits, bots get a 200, real users never see this branch.
  if (lead.website.length > 0) {
    return NextResponse.json({ ok: true, channels: { email: false, sheet: false } });
  }

  const [emailResult, sheetResult] = await Promise.allSettled([
    sendEmail(lead),
    appendToSheet(lead),
  ]);

  if (emailResult.status === "rejected") {
    console.error("[lead] email failed:", emailResult.reason);
  }
  if (sheetResult.status === "rejected") {
    console.error("[lead] sheet failed:", sheetResult.reason);
  }

  return NextResponse.json({
    ok: true,
    channels: {
      email: emailResult.status === "fulfilled",
      sheet: sheetResult.status === "fulfilled",
    },
  });
}

function journeyLabel(slug: string): string {
  if (slug === "custom") return "Custom (suggest a route)";
  return packages.find((p) => p.slug === slug)?.title ?? slug;
}

async function sendEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    throw new Error("Resend env vars missing (RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL)");
  }

  const subject = `New enquiry · ${lead.name} · ${lead.month} · ${lead.ref}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: renderText(lead),
      html: renderHtml(lead),
      reply_to: lead.email || undefined,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
}

async function appendToSheet(lead: Lead): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) {
    throw new Error("Sheets env vars missing (SHEETS_WEBHOOK_URL, SHEETS_WEBHOOK_SECRET)");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      receivedAt: new Date().toISOString(),
      lead: { ...lead, journey: journeyLabel(lead.pkg) },
    }),
    redirect: "follow",
  });

  // Apps Script always returns HTTP 200, we have to inspect the JSON body
  // to know if it actually wrote the row.
  const text = await res.text();
  let json: { ok?: boolean; error?: string } | null = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* fall through */
  }

  if (!res.ok || !json || json.ok !== true) {
    throw new Error(`Sheets: ${json?.error ?? text.slice(0, 300) ?? res.statusText}`);
  }
}

function renderText(lead: Lead): string {
  return [
    "New enquiry from the website",
    "",
    `Reference: ${lead.ref}`,
    `Name: ${lead.name}`,
    `Travellers: ${lead.travellers}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Email: ${lead.email || "-"}`,
    `Month: ${lead.month}`,
    `Journey: ${journeyLabel(lead.pkg)}`,
    `Pace: ${lead.pace}`,
    `Stay: ${lead.stay}`,
    `Food: ${lead.food}`,
    "",
    "Notes:",
    lead.notes || "-",
  ].join("\n");
}

function renderHtml(lead: Lead): string {
  const esc = (s: string) =>
    s.replace(/[&<>"']/g, (c) =>
      c === "&"
        ? "&amp;"
        : c === "<"
          ? "&lt;"
          : c === ">"
            ? "&gt;"
            : c === '"'
              ? "&quot;"
              : "&#39;",
    );
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 18px 6px 0;color:#5b6258;font-size:13px;white-space:nowrap;">${k}</td><td style="padding:6px 0;color:#1c2316;font-size:14px;">${v ? esc(v) : "&mdash;"}</td></tr>`;

  const journey = journeyLabel(lead.pkg);

  return `<!doctype html>
<html><body style="margin:0;background:#f7f4ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1c2316;">
<div style="max-width:560px;margin:0 auto;padding:28px;">
  <p style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#B85A3E;margin:0 0 8px;">New enquiry</p>
  <h1 style="font-size:22px;margin:0 0 4px;line-height:1.2;">${esc(lead.name)} &middot; ${esc(lead.month)}</h1>
  <p style="font-size:12px;color:#5b6258;margin:0 0 22px;font-family:ui-monospace,SFMono-Regular,monospace;">Ref ${esc(lead.ref)}</p>
  <table style="border-collapse:collapse;width:100%;">
    ${row("WhatsApp", lead.whatsapp)}
    ${row("Email", lead.email)}
    ${row("Travellers", String(lead.travellers))}
    ${row("Month", lead.month)}
    ${row("Journey", journey)}
    ${row("Pace", lead.pace)}
    ${row("Stay", lead.stay)}
    ${row("Food", lead.food)}
  </table>
  ${lead.notes ? `<div style="margin-top:22px;padding:14px 16px;background:#fff;border:1px solid #e6e1d6;border-radius:4px;font-size:14px;line-height:1.5;font-style:italic;">&ldquo;${esc(lead.notes)}&rdquo;</div>` : ""}
  <p style="margin-top:28px;font-size:12px;color:#8a8d83;">Reply directly to this email${lead.email ? ` &mdash; it goes to ${esc(lead.email)}` : ""}.</p>
</div></body></html>`;
}
