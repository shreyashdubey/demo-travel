"use client";

import { whatsappUrl } from "@/lib/contact";

const STEPS = [
  {
    num: "01",
    title: "Tell Saroj your dates",
    detail:
      "Message on WhatsApp with your rough dates, group size and what you're after. No form, no signup.",
  },
  {
    num: "02",
    title: "Get a hand-crafted itinerary",
    detail:
      "Within 4 hours Saroj sends back a tailored day-by-day plan and a fair quote. Tweak it as much as you want.",
  },
  {
    num: "03",
    title: "Pay 25% to confirm",
    detail:
      "Balance on arrival in cash, UPI or bank transfer. Free cancellation up to 14 days before. The Saroj Promise covers the rest.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-snow py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-dusk">
            <span className="mr-2 inline-block h-px w-8 align-middle bg-dusk/60" />
            How it works
          </p>
          <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[58px]">
            Three steps. No forms.
          </h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-pine/70">
            We don't sell packages off a shelf. Saroj builds each itinerary by hand — you talk to a
            person, not a chatbot.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="rounded-[4px] border border-pine/10 bg-white p-7"
            >
              <p className="font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-alpenglow">
                Step {s.num}
              </p>
              <h3 className="mt-3 font-display text-[24px] leading-tight tracking-tightest text-pine">
                {s.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-pine/75">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={whatsappUrl("Hi Saroj, I'd like to plan a trip — could we talk?")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#1ebd5a]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
            </svg>
            Start on WhatsApp · +91 85809-46251
          </a>
        </div>
      </div>
    </section>
  );
}
