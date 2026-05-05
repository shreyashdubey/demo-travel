"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { packages } from "@/data/content";
import { useSound } from "@/components/providers/SoundProvider";
import { cn } from "@/lib/cn";

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
  const { play } = useSound();

  const update = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const next = () => {
    play("chime");
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = () => {
    const ref = `DHODHU-${form.month.toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;
    play("bell");
    setSubmitted({ ref, data: form });
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
                    <Step title="What kind of journey?" hint="Pick a starter — we customise from here.">
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
                              From ₹{p.priceFrom.toLocaleString("en-IN")}
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
                              I'm not sure — suggest me a route
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
                    <Step title="Take a look — does this feel right?" hint="One tap and Saroj is on it.">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Summary k="Traveller" v={form.name || "—"} />
                        <Summary k="Travellers" v={`${form.travellers}`} />
                        <Summary k="WhatsApp" v={form.whatsapp || "—"} />
                        <Summary k="Email" v={form.email || "—"} />
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
                  className="inline-flex items-center gap-2 rounded-full bg-alpenglow px-7 py-3 text-[14px] font-medium text-pine transition-all hover:bg-pine hover:text-snow"
                >
                  Send to Saroj
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid place-items-center text-center"
    >
      <Confetti />
      <div className="grid h-20 w-20 place-items-center rounded-full bg-alpenglow/20">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8895C" strokeWidth="1.6">
          <path d="M5 12l4 4L19 6" />
        </svg>
      </div>
      <h3 className="mt-6 font-display text-[32px] leading-tight tracking-tightest text-pine sm:text-[44px]">
        Your journey is being drawn.
      </h3>
      <p className="mt-3 max-w-xl text-pretty text-[15.5px] leading-relaxed text-pine/70">
        Saroj will WhatsApp <span className="text-pine">{submitted.data.name || "you"}</span>{" "}
        within 4 hours with a sketched itinerary and a fair quote. No pressure — we promise.
      </p>
      <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-pine/15 bg-white px-5 py-2.5 font-mono text-[13px] tracking-tight text-pine">
        <span className="opacity-60">Reference</span>
        <span className="font-medium">{submitted.ref}</span>
      </div>
      <p className="mt-10 max-w-md text-[14px] italic text-pine/60">
        “The mountains will still be here when you are ready.” — Saroj
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
              background: b.snow ? "#fff" : i % 3 === 0 ? "#E8895C" : "#1F3A2E",
              borderRadius: b.snow ? 999 : 1,
            }}
          />
        </motion.span>
      ))}
    </div>
  );
}
