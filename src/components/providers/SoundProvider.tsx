"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Ambient = "wind" | "river" | null;
type Cue = "bell" | "chime" | "snow";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (cue: Cue) => void;
  setAmbient: (a: Ambient) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

/**
 * Sound is intentionally minimal. Synthesised drone/flute layers were
 * iterated on and judged "weird" by the founder, so this version ships
 * only short interaction cues:
 *
 * - chime  : two-tone soft chime, played on package select / day change
 * - bell   : harmonic bell with longer decay, on the primary CTA
 * - snow   : tiny puff of high-passed noise
 *
 * `setAmbient` is preserved on the API surface for compatibility with
 * existing call sites (Hero, Journey) but is now a no-op.
 *
 * Sound is on by default. The user toggle in the top bar persists the
 * choice in localStorage (`dh_sound_v3`). Browsers block AudioContext
 * until a user gesture; we resume on the first pointerdown/keydown.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor: typeof AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.gain.value = 0.55;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    return ctxRef.current;
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dh_sound_v3");
      if (saved === "false") setEnabled(false);
      else if (saved === "true") setEnabled(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dh_sound_v3", String(enabled));
    } catch {}
  }, [enabled]);

  // Unlock the audio context on the first user gesture
  useEffect(() => {
    const unlock = () => {
      const ctx = ensureCtx();
      if (ctx?.state === "suspended") void ctx.resume();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [ensureCtx]);

  const play = useCallback(
    (cue: Cue) => {
      if (!enabled) return;
      const ctx = ensureCtx();
      const master = masterRef.current;
      if (!ctx || !master) return;
      if (ctx.state === "suspended") void ctx.resume();
      const now = ctx.currentTime;

      if (cue === "chime") {
        [880, 1318.51].forEach((f, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "sine";
          o.frequency.value = f;
          o.connect(g);
          g.connect(master);
          const t = now + i * 0.07;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.16, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
          o.start(t);
          o.stop(t + 1.6);
        });
      } else if (cue === "bell") {
        const fundamental = 523.25;
        const partials: [number, number, number][] = [
          [1, 0.45, 2.2],
          [2.76, 0.22, 1.4],
          [5.4, 0.1, 0.9],
        ];
        partials.forEach(([mult, amp, dur]) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "sine";
          o.frequency.value = fundamental * mult;
          o.connect(g);
          g.connect(master);
          g.gain.setValueAtTime(0, now);
          g.gain.linearRampToValueAtTime(amp, now + 0.005);
          g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
          o.start(now);
          o.stop(now + dur + 0.1);
        });
      } else if (cue === "snow") {
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
        const d = buffer.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const f = ctx.createBiquadFilter();
        f.type = "highpass";
        f.frequency.value = 2500;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.18, now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        src.connect(f);
        f.connect(g);
        g.connect(master);
        src.start(now);
        src.stop(now + 0.4);
      }
    },
    [enabled, ensureCtx],
  );

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  // No-op — preserves API for existing call sites in Hero / Journey.
  const setAmbient = useCallback((_: Ambient) => {}, []);

  const value = useMemo<SoundContextValue>(
    () => ({ enabled, toggle, play, setAmbient }),
    [enabled, toggle, play, setAmbient],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside SoundProvider");
  return ctx;
}
