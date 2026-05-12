"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { packages } from "@/data/content";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/cn";

const DRAFT_KEY = "wst-booking-draft-v1";

type Form = {
  name: string;
  travellers: number;
  whatsapp: string;
  email: string;
  month: string;
  pkg: string;
  pace: "slow" | "standard" | "packed";
  stay: "homestay" | "boutique" | "hotel";
  food: "veg" | "non-veg" | "vegan";
  notes: string;
};

const MONTHS = [
  ["Jan", 95], ["Feb", 90], ["Mar", 60], ["Apr", 25],
  ["May", 5], ["Jun", 0], ["Jul", 0], ["Aug", 0],
  ["Sep", 5], ["Oct", 20], ["Nov", 50], ["Dec", 85],
] as const;

const STEPS = ["Who", "When", "What", "How", "Confirm"] as const;

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<{ ref: string; data: Form } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Form>({
    name: "",
    travellers: 2,
    whatsapp: "",
    email: "",
    month: "Oct",
    pkg: "spiti-circuit",
    pace: "standard",
    stay: "homestay",
    food: "veg",
    notes: "",
  });

  // Restore an in-progress draft so an accidental refresh mid-fill doesn't wipe their answers.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      setForm((f) => ({ ...f, ...draft }));
    } catch {}
  }, []);

  useEffect(() => {
    if (submitted) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {}
  }, [form, submitted]);

  useEffect(() => {
    if (!submitted) return;
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {}
  }, [submitted]);

  const update = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const next = () => {
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (submitting) return;
    const ref = `WST-${form.month.toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref,
          ...form,
          website: honeypotRef.current?.value ?? "",
        }),
        keepalive: true,
      });
    } catch (err) {
      // Server-side failure is logged in Vercel; the user still gets the
      // success screen with the WhatsApp button so the lead isn't dropped.
      console.error("[lead] submit failed", err);
    } finally {
      setSubmitting(false);
      setSubmitted({ ref, data: form });
    }
  };

  const valid = useMemo(() => {
    if (step === 0) return form.name.length > 1 && form.whatsapp.length > 6;
    return true;
  }, [step, form]);

  return (
    <section id="book" className="relative bg-glacier py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-dusk">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-dusk/60" />
              Plan your journey
            </p>
            <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[58px]">
              Five gentle questions.<br /> Saroj will WhatsApp within 4 hours.
            </h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-[4px] bg-snow ring-soft">
          {/* Progress */}
          <div className="border-b border-pine/10">
            <div className="flex">
              {STEPS.map((s, i) => (
                <div
                  key={s}
                  className={cn(
                    "flex-1 border-r border-pine/10 px-4 py-4 last:border-r-0 sm:px-6",
                    i === step
                      ? "bg-pine text-snow"
                      : i < step
                        ? "bg-snow text-pine/60"
                        : "bg-snow text-pine/35",
                  )}
                >
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.22em]">
                    Step {i + 1}
                  </div>
                  <div className={cn("mt-0.5 text-[14px]", i === step && "font-medium")}>
                    {s}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-1 bg-pine/10">
              <motion.div
                className="h-full bg-alpenglow"
                initial={{ width: "0%" }}
                animate={{ width: `${((step + (submitted ? 1 : 0)) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <div className="p-7 sm:p-12 lg:p-16 min-h-[480px]">
            <AnimatePresence mode="wait">
              {submitted ? (
                <Success key="done" submitted={submitted} />
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 0 && (
                    <Step
                      title="Tell us who's coming"
                      hint="We'll keep this between us."
                    >
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field label="Your name">
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Anjali Sharma"
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Travellers">
                          <div className="flex items-center gap-3 rounded-[3px] border border-pine/15 px-4 py-3">
                            <button
                              type="button"
                              onClick={() => update("travellers", Math.max(1, form.travellers - 1))}
                              className="grid h-7 w-7 place-items-center rounded-full bg-pine/10 text-pine hover:bg-pine/15"
                            >
                              –
                            </button>
                            <div className="flex-1 text-center font-display text-[22px] tracking-tightest text-pine">
                              {form.travellers}
                            </div>
                            <button
                              type="button"
                              onClick={() => update("travellers", Math.min(8, form.travellers + 1))}
                              className="grid h-7 w-7 place-items-center rounded-full bg-pine/10 text-pine hover:bg-pine/15"
                            >
                              +
                            </button>
                          </div>
                        </Field>
                        <Field label="WhatsApp number">
                          <input
                            type="tel"
                            value={form.whatsapp}
                            onChange={(e) => update("whatsapp", e.target.value)}
                            placeholder="+91 98xxxxxxxx"
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Email (optional)">
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="you@example.com"
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </Step>
                  )}

                  {step === 1 && (
                    <Step title="When were you thinking?" hint="The bar shows the chance of snowfall.">
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {MONTHS.map(([m, snow]) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => update("month", m)}
                            className={cn(
                              "group relative overflow-hidden rounded-[3px] border p-3 text-left transition-all",
                              form.month === m
                                ? "border-pine bg-pine text-snow"
                                : "border-pine/15 bg-white hover:border-pine/40",
                            )}
                          >
                            <div className="font-display text-[20px] leading-none tracking-tightest">
                              {m}
                            </div>
                            <div
                              className={cn(
                                "mt-1 text-[10.5px] uppercase tracking-[0.18em]",
                                form.month === m ? "text-snow/65" : "text-pine/55",
                              )}
                            >
                              Snow {snow}%
                            </div>
                            <div
                              className={cn(
                                "absolute inset-x-0 bottom-0 h-1 transition-colors",
                                form.month === m ? "bg-alpenglow" : "bg-pine/10",
                              )}
                            >
                              <div
                                className={cn(
                                  "h-full transition-all",
                                  form.month === m ? "bg-snow" : "bg-pine/40",
                                )}
                                style={{ width: `${snow}%` }}
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="mt-6 text-[14px] leading-relaxed text-pine/70">
                        {form.month === "Jan" || form.month === "Feb"
                          ? "Deep snow season. Spiti is closed by road. Manali, Solang and Auli are at their cinematic best."
                          : form.month === "May" || form.month === "Jun"
                            ? "Bright high-season. Spiti is open by mid-June, treks all green, fishing's in."
                            : form.month === "Sep" || form.month === "Oct"
                              ? "Our favourite season. Apple harvest, Kullu Dussehra, the air sharp and gold."
                              : "A good time. We can shape the route around the weather window."}
                      </p>
                    </Step>
                  )}

                  {step === 2 && (
                    <Step title="What kind of journey?" hint="Pick a starter, we customise from here.">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {packages.map((p) => (
                          <button
                            key={p.slug}
                            type="button"
                            onClick={() => update("pkg", p.slug)}
                            className={cn(
                              "rounded-[3px] border p-5 text-left transition-all",
                              form.pkg === p.slug
                                ? "border-pine bg-pine text-snow"
                                : "border-pine/15 bg-white hover:border-pine/40",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em]">
                                {p.days}D · {p.nights}N
                              </div>
                              <div
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ background: p.accent }}
                              />
                            </div>
                            <h4 className="mt-3 font-display text-[24px] leading-tight tracking-tightest">
                              {p.title}
                            </h4>
                            <p
                              className={cn(
                                "mt-2 text-[13px] leading-snug",
                                form.pkg === p.slug ? "text-snow/75" : "text-pine/65",
                              )}
                            >
                              {p.days} days · {p.nights} nights
                            </p>
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => update("pkg", "custom")}
                          className={cn(
                            "rounded-[3px] border p-5 text-left transition-all sm:col-span-3",
                            form.pkg === "custom"
                              ? "border-pine bg-pine text-snow"
                              : "border-dashed border-pine/30 bg-white hover:border-pine/50",
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-display text-[20px] tracking-tightest">
                              I'm not sure, suggest me a route
                            </h4>
                            <span>→</span>
                          </div>
                        </button>
                      </div>
                    </Step>
                  )}

                  {step === 3 && (
                    <Step title="How do you like to travel?" hint="No wrong answers. We'll match you.">
                      <div className="space-y-7">
                        <Choice
                          label="Pace"
                          options={[
                            ["slow", "Slow", "More time per place"],
                            ["standard", "Standard", "Most travellers"],
                            ["packed", "Packed", "See as much as possible"],
                          ]}
                          value={form.pace}
                          onChange={(v) => update("pace", v as Form["pace"])}
                        />
                        <Choice
                          label="Accommodation"
                          options={[
                            ["homestay", "Homestay", "Eat with the family"],
                            ["boutique", "Boutique", "Small charming hotel"],
                            ["hotel", "Hotel", "Star comfort"],
                          ]}
                          value={form.stay}
                          onChange={(v) => update("stay", v as Form["stay"])}
                        />
                        <Choice
                          label="Food"
                          options={[
                            ["veg", "Vegetarian", ""],
                            ["non-veg", "Non-veg", ""],
                            ["vegan", "Vegan", "We'll arrange"],
                          ]}
                          value={form.food}
                          onChange={(v) => update("food", v as Form["food"])}
                        />
                        <Field label="Anything else? (allergies, accessibility, dreams)">
                          <textarea
                            rows={3}
                            value={form.notes}
                            onChange={(e) => update("notes", e.target.value)}
                            placeholder="e.g. We want one quiet day, a cooking class, and to see the Milky Way once."
                            className={cn(inputCls, "resize-none")}
                          />
                        </Field>
                      </div>
                    </Step>
                  )}

                  {step === 4 && (
                    <Step title="Take a look, does this feel right?" hint="One tap and Saroj is on it.">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Summary k="Traveller" v={form.name || "-"} />
                        <Summary k="Travellers" v={`${form.travellers}`} />
                        <Summary k="WhatsApp" v={form.whatsapp || "-"} />
                        <Summary k="Email" v={form.email || "-"} />
                        <Summary k="Month" v={form.month} />
                        <Summary
                          k="Journey"
                          v={
                            form.pkg === "custom"
                              ? "Custom (we'll design)"
                              : packages.find((p) => p.slug === form.pkg)?.title || form.pkg
                          }
                        />
                        <Summary k="Pace" v={cap(form.pace)} />
                        <Summary k="Stay" v={cap(form.stay)} />
                        <Summary k="Food" v={cap(form.food)} />
                      </div>
                      {form.notes && (
                        <p className="mt-6 rounded-[3px] border border-pine/10 bg-glacier p-4 text-[14px] italic text-pine/80">
                          “{form.notes}”
                        </p>
                      )}
                    </Step>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Honeypot, visible to bots, hidden from humans. Bots auto-fill all
              inputs; if this field has a value on submit, the API silently drops it. */}
          <div aria-hidden className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden opacity-0">
            <label>
              Website (leave empty)
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </label>
          </div>

          {/* Footer / actions */}
          {!submitted && (
            <div className="flex items-center justify-between border-t border-pine/10 bg-snow p-5 sm:p-7">
              <button
                onClick={back}
                disabled={step === 0}
                className="rounded-full px-5 py-2.5 text-[13.5px] text-pine/70 hover:text-pine disabled:opacity-30"
              >
                ← Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  onClick={next}
                  disabled={!valid}
                  className="inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 text-[14px] font-medium text-snow transition-all hover:bg-pine/90 disabled:opacity-30"
                >
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-alpenglow px-7 py-3 text-[14px] font-medium text-pine transition-all hover:bg-pine hover:text-snow disabled:cursor-progress disabled:opacity-70 disabled:hover:bg-alpenglow disabled:hover:text-pine"
                >
                  {submitting ? "Sending…" : "Send to Saroj"}
                  {submitting ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="animate-spin"
                      aria-hidden
                    >
                      <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-[3px] border border-pine/15 bg-white px-4 py-3 text-[15px] text-pine placeholder:text-mist focus:border-pine focus:outline-none focus:ring-0";

function Step({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[12px] uppercase tracking-[0.22em] text-dusk">{hint}</p>
      <h3 className="mt-2 font-display text-[28px] leading-tight tracking-tightest text-pine sm:text-[36px]">
        {title}
      </h3>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] uppercase tracking-[0.22em] text-pine/60">
        {label}
      </span>
      {children}
    </label>
  );
}

function Choice({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: [string, string, string][];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[12px] uppercase tracking-[0.22em] text-pine/60">{label}</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {options.map(([v, t, sub]) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={cn(
              "rounded-[3px] border p-4 text-left transition-all",
              value === v
                ? "border-pine bg-pine text-snow"
                : "border-pine/15 bg-white hover:border-pine/40",
            )}
          >
            <div className="font-display text-[20px] leading-tight tracking-tightest">{t}</div>
            {sub && (
              <div
                className={cn(
                  "mt-1 text-[12.5px]",
                  value === v ? "text-snow/65" : "text-pine/60",
                )}
              >
                {sub}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function Summary({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-[3px] border border-pine/10 bg-glacier p-4">
      <p className="text-[11.5px] uppercase tracking-[0.22em] text-pine/55">{k}</p>
      <p className="mt-1 font-display text-[20px] leading-tight tracking-tightest text-pine">
        {v}
      </p>
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Success({ submitted }: { submitted: { ref: string; data: Form } }) {
  const { ref, data } = submitted;
  const pkg = packages.find((p) => p.slug === data.pkg);
  const journeyName =
    data.pkg === "custom"
      ? "Custom journey (suggest a route)"
      : pkg?.title || data.pkg;

  // Build a WhatsApp message that summarises the form so Saroj sees everything in one ping.
  const messageLines = [
    "Hi Saroj!",
    "",
    "Here are the details from your website:",
    `• Name: ${data.name || "-"}`,
    `• Travellers: ${data.travellers}`,
    `• Month: ${data.month}`,
    `• Journey: ${journeyName}`,
    `• Pace: ${data.pace}`,
    `• Stay: ${data.stay}`,
    `• Food: ${data.food}`,
  ];
  if (data.notes) messageLines.push(`• Notes: ${data.notes}`);
  if (data.email) messageLines.push(`• Email: ${data.email}`);
  messageLines.push("", `Ref: ${ref}`);

  const sendHref = whatsappUrl(messageLines.join("\n"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid place-items-center text-center"
    >
      <Confetti />
      <div className="grid h-20 w-20 place-items-center rounded-full bg-alpenglow/20">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B85A3E" strokeWidth="1.6">
          <path d="M5 12l4 4L19 6" />
        </svg>
      </div>
      <h3 className="mt-6 font-display text-[32px] leading-tight tracking-tightest text-pine sm:text-[42px]">
        Your details are ready.
      </h3>
      <p className="mt-3 max-w-xl text-pretty text-[15.5px] leading-relaxed text-pine/70">
        Send them to Saroj on WhatsApp, she replies within 4 hours with a hand-crafted itinerary
        and a fair quote.
      </p>

      <a
        href={sendHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#1ebd5a]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
        </svg>
        Send to Saroj on WhatsApp
      </a>

      <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-pine/15 bg-white px-5 py-2.5 font-mono text-[13px] tracking-tight text-pine">
        <span className="opacity-60">Reference</span>
        <span className="font-medium">{ref}</span>
      </div>
      <p className="mt-10 max-w-md text-[14px] italic text-pine/60">
        "The mountains will still be here when you are ready.", Saroj
      </p>
    </motion.div>
  );
}

function Confetti() {
  const bits = Array.from({ length: 32 }, (_, i) => ({
    x: ((i * 53) % 100) - 50,
    y: -((i * 31) % 80) - 30,
    r: ((i * 19) % 360) - 180,
    d: (i % 9) * 0.05,
    snow: i % 2 === 0,
  }));
  return (
    <div className="pointer-events-none absolute inset-0">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: b.x * 4,
            y: b.y * 5 + 220,
            rotate: b.r,
            opacity: 0,
          }}
          transition={{ duration: 2.4, delay: b.d, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 block"
          style={{ width: b.snow ? 5 : 8, height: b.snow ? 5 : 3 }}
        >
          <span
            className="block h-full w-full"
            style={{
              background: b.snow ? "#fff" : i % 3 === 0 ? "#B85A3E" : "#3A4A2F",
              borderRadius: b.snow ? 999 : 1,
            }}
          />
        </motion.span>
      ))}
    </div>
  );
}
