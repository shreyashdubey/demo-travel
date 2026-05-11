"use client";

import { type ReactNode } from "react";

// Lenis smooth scroll was disabled — it introduced perceptible scroll lag on
// trackpads. Native browser scroll feels snappier. Anchor smoothness is
// handled by `scroll-behavior: smooth` in globals.css.
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
