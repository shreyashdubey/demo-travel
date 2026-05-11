"use client";

import { whatsappUrl } from "@/lib/contact";

const HREF = whatsappUrl("Hi Saroj, I'd like to ask about a trip.");

export function WhatsAppFab() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-5 sm:bottom-6 sm:right-6">
      <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-pine px-3 py-1.5 text-[11px] font-medium text-snow shadow-md">
        <span className="h-1.5 w-1.5 rounded-full bg-alpenglow animate-ember" />
        Saroj replies in 4 hrs
      </span>
      <a
        href={HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Saroj — chat about a trip"
        className="animate-happy-hop flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] active:scale-95 sm:h-16 sm:w-16"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.001 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.005c6.582 0 11.941-5.335 11.944-11.892a11.821 11.821 0 0 0-3.474-8.454z" />
        </svg>
      </a>
    </div>
  );
}
