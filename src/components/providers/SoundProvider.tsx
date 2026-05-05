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
 * Sound is synthesised entirely in the browser with the Web Audio API
 * (no external audio files):
 *
 * - Hero ambient ("wind"): filtered pink noise + a slow bansuri-flute
 *   melody in D pentatonic, played one note every ~6–8 seconds with
 *   meditative pauses.
 * - Journey ambient ("river"): higher-passed pink noise, no flute.
 * - Cues: chime (two-tone), bell (harmonic stack), snow (noise puff).
 *
 * Default is ON. The toggle in the top bar is the user's escape hatch
 * and the choice persists in localStorage. Browsers block AudioContext
 * until a user gesture, so we resume on the first pointerdown/keydown.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const ambientNodesRef = useRef<{ stop: () => void } | null>(null);
  const desiredAmbient = useRef<Ambient>(null);
  const unlockedRef = useRef(false);

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
      const saved = localStorage.getItem("dh_sound");
      if (saved === "false") setEnabled(false);
      else if (saved === "true") setEnabled(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dh_sound", String(enabled));
    } catch {}
  }, [enabled]);

  const stopAmbient = useCallback(() => {
    const node = ambientNodesRef.current;
    if (!node) return;
    node.stop();
    ambientNodesRef.current = null;
  }, []);

  const startAmbient = useCallback(
    (kind: Ambient) => {
      if (!kind) {
        stopAmbient();
        return;
      }
      const ctx = ensureCtx();
      const master = masterRef.current;
      if (!ctx || !master) return;
      stopAmbient();

      const sampleRate = ctx.sampleRate;

      // ── Wind/river bed: filtered pink noise with a slow LFO on cutoff
      const length = sampleRate * 4;
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      if (kind === "wind") {
        filter.type = "lowpass";
        filter.frequency.value = 380;
        filter.Q.value = 0.6;
      } else {
        filter.type = "highpass";
        filter.frequency.value = 700;
        filter.Q.value = 0.4;
      }

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = kind === "wind" ? 0.08 : 0.15;
      lfoGain.gain.value = kind === "wind" ? 80 : 200;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0;
      source.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(master);
      source.start();
      const noiseTarget = kind === "wind" ? 0.12 : 0.12;
      noiseGain.gain.linearRampToValueAtTime(noiseTarget, ctx.currentTime + 1.5);

      // ── Bansuri-flute melody (only over the wind bed)
      // D major pentatonic: D5 E5 F#5 A5 B5
      const flutePhrase = [587.33, 659.26, 739.99, 880, 987.77, 880, 739.99, 587.33, 493.88];
      let phraseIdx = 0;
      let cancelled = false;
      const fluteVoices: Array<() => void> = [];
      let phraseTimer: ReturnType<typeof setTimeout> | null = null;

      const playFluteNote = (freq: number, duration: number) => {
        const t0 = ctx.currentTime;
        const fund = ctx.createOscillator();
        const second = ctx.createOscillator();
        fund.type = "sine";
        second.type = "sine";
        fund.frequency.value = freq;
        second.frequency.value = freq * 2;

        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.value = 4.5;
        vibratoGain.gain.value = freq * 0.004;
        vibrato.connect(vibratoGain);
        vibratoGain.connect(fund.frequency);
        vibratoGain.connect(second.frequency);

        const gFund = ctx.createGain();
        const gSecond = ctx.createGain();
        gFund.gain.value = 0;
        gSecond.gain.value = 0;

        const attack = 0.6;
        const release = 0.9;
        gFund.gain.setValueAtTime(0, t0);
        gFund.gain.linearRampToValueAtTime(0.08, t0 + attack);
        gFund.gain.linearRampToValueAtTime(0.06, t0 + duration - release);
        gFund.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

        gSecond.gain.setValueAtTime(0, t0);
        gSecond.gain.linearRampToValueAtTime(0.022, t0 + attack);
        gSecond.gain.linearRampToValueAtTime(0.015, t0 + duration - release);
        gSecond.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

        // Brief breath at note start
        const breathBuf = ctx.createBuffer(1, sampleRate * 0.8, sampleRate);
        const bd = breathBuf.getChannelData(0);
        for (let i = 0; i < bd.length; i++) bd[i] = (Math.random() * 2 - 1) * 0.5;
        const breath = ctx.createBufferSource();
        breath.buffer = breathBuf;
        const breathFilter = ctx.createBiquadFilter();
        breathFilter.type = "bandpass";
        breathFilter.frequency.value = freq * 1.5;
        breathFilter.Q.value = 4;
        const breathGain = ctx.createGain();
        breathGain.gain.setValueAtTime(0, t0);
        breathGain.gain.linearRampToValueAtTime(0.022, t0 + 0.1);
        breathGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.7);

        fund.connect(gFund);
        second.connect(gSecond);
        gFund.connect(master);
        gSecond.connect(master);
        breath.connect(breathFilter);
        breathFilter.connect(breathGain);
        breathGain.connect(master);

        fund.start(t0);
        second.start(t0);
        vibrato.start(t0);
        breath.start(t0);
        fund.stop(t0 + duration + 0.1);
        second.stop(t0 + duration + 0.1);
        vibrato.stop(t0 + duration + 0.1);
        breath.stop(t0 + 0.85);

        fluteVoices.push(() => {
          try {
            fund.disconnect();
            second.disconnect();
            vibrato.disconnect();
            vibratoGain.disconnect();
            gFund.disconnect();
            gSecond.disconnect();
            breath.disconnect();
            breathFilter.disconnect();
            breathGain.disconnect();
          } catch {}
        });
      };

      const stepPhrase = () => {
        if (cancelled) return;
        const freq = flutePhrase[phraseIdx % flutePhrase.length];
        const dur = 4 + Math.random() * 2;
        playFluteNote(freq, dur);
        phraseIdx += 1;
        const gap = phraseIdx % flutePhrase.length === 0 ? 7 : 3 + Math.random() * 1.5;
        phraseTimer = setTimeout(stepPhrase, (dur * 0.7 + gap) * 1000);
      };
      if (kind === "wind") {
        phraseTimer = setTimeout(stepPhrase, 2500);
      }

      const stop = () => {
        cancelled = true;
        if (phraseTimer) clearTimeout(phraseTimer);
        try {
          noiseGain.gain.cancelScheduledValues(ctx.currentTime);
          noiseGain.gain.setValueAtTime(noiseGain.gain.value, ctx.currentTime);
          noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        } catch {}
        setTimeout(() => {
          try {
            source.stop();
          } catch {}
          try {
            lfo.stop();
          } catch {}
          try {
            source.disconnect();
            filter.disconnect();
            lfo.disconnect();
            lfoGain.disconnect();
            noiseGain.disconnect();
          } catch {}
          fluteVoices.forEach((c) => c());
        }, 800);
      };
      ambientNodesRef.current = { stop };
    },
    [ensureCtx, stopAmbient],
  );

  const setAmbient = useCallback(
    (a: Ambient) => {
      desiredAmbient.current = a;
      if (!enabled || !unlockedRef.current) return;
      startAmbient(a);
    },
    [enabled, startAmbient],
  );

  // Unlock on first user gesture
  useEffect(() => {
    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      const ctx = ensureCtx();
      if (ctx?.state === "suspended") void ctx.resume();
      if (enabled && desiredAmbient.current) startAmbient(desiredAmbient.current);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [enabled, ensureCtx, startAmbient]);

  // React to enable/disable changes
  useEffect(() => {
    if (!enabled) {
      stopAmbient();
      return;
    }
    if (unlockedRef.current && desiredAmbient.current) {
      startAmbient(desiredAmbient.current);
    }
  }, [enabled, startAmbient, stopAmbient]);

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
