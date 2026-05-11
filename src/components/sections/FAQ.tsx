"use client";

import { faqs } from "@/data/content";
import { whatsappUrl } from "@/lib/contact";

export function FAQ() {
  return (
    <section id="faq" className="relative bg-snow py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-dusk">
            <span className="mr-2 inline-block h-px w-8 align-middle bg-dusk/60" />
            Common questions
          </p>
          <h2 className="font-display text-balance text-[40px] leading-[1.02] tracking-tightest text-pine sm:text-[56px]">
            Asked us before.<br /> Answered honestly.
          </h2>
        </div>

        <dl className="divide-y divide-pine/10 border-y border-pine/10">
          {faqs.map((f, i) => (
            <div key={i} className="py-7 sm:flex sm:gap-10">
              <dt className="mb-3 max-w-sm font-display text-[20px] leading-tight tracking-tightest text-pine sm:mb-0 sm:flex-none sm:basis-[44%] sm:text-[22px]">
                {f.q}
              </dt>
              <dd className="text-[15px] leading-relaxed text-pine/80">{f.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-[4px] border border-pine/10 bg-glacier p-6 text-center">
          <p className="text-[15px] leading-relaxed text-pine">
            Still have a question?{" "}
            <a
              href={whatsappUrl("Hi Saroj, I have a quick question before I plan a trip.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-alpenglow underline-offset-4 hover:underline"
            >
              Just ask Saroj on WhatsApp →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
