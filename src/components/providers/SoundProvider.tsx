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
 * Sound is synthesized in the browser via Web Audio API.
 * No external audio files = no broken CDN dependencies.
 *
 * - Wind: filtered pink noise + slow LFO modulation on the cutoff.
 * - River: brighter pink noise with high-pass.
 * - Bell: layered sine harmonics with exponential decay.
 * - Chime: short sine + 5th, soft envelope.
 * - Snow: tiny burst of high-passed white noise.
 *
 * Browsers block AudioContext until a user gesture. We resume on the first
 * pointerdown/keydown so the user doesn't have to do anything explicit.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const ambientNodesRef = useRef<{ gain: GainNode; stop: () => void } | null>(null);
  const desiredAmbient = useRef<Ambient>(null);
  const unlockedRef = useRef(false);

  // Initialise context lazily on first need
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
      master.gain.value = 0.7;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    return ctxRef.current;
  }, []);

  // Read persisted preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dh_sound");
      if (saved === "false") setEnabled(false);
      else if (saved === "true") setEnabled(true);
    } catch {}
  }, []);

  // Persist whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("dh_sound", String(enabled));
    } catch {}
  }, [enabled]);

  // Unlock audio on first user gesture
  useEffect(() => {
    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      const ctx = ensureCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();
      // Replay the desired ambient if one was queued before unlock
      if (enabled && desiredAmbient.current) {
        startAmbient(desiredAmbient.current);
      }
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ensureCtx]);

  const stopAmbient = useCallback(() => {
    const node = ambientNodesRef.current;
    if (!node) return;
    const ctx = ctxRef.current;
    if (ctx) {
      node.gain.gain.cancelScheduledValues(ctx.currentTime);
      node.gain.gain.setValueAtTime(node.gain.gain.value, ctx.currentTime);
      node.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      setTimeout(node.stop, 800);
    } else {
      node.stop();
    }
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

      // ── 1. Wind/river bed: filtered pink noise with a slow LFO on the cutoff
      const sampleRate = ctx.sampleRate;
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
      const noiseTarget = kind === "wind" ? 0.14 : 0.12;
      noiseGain.gain.linearRampToValueAtTime(noiseTarget, ctx.currentTime + 1.5);

      // ── 2. Bansuri-flute melody (only over the 'wind' bed)
      // A slow morning raga in D — pentatonic Bilawal-ish:
      //   Sa  Re  Ga  Pa  Dha   (D5 E5 F#5 A5 B5)
      const flutePhrase: number[] = [
        587.33, 659.26, 739.99, 880, 987.77, 880, 739.99, 587.33, 493.88,
      ];
      let phraseIdx = 0;
      let fluteCancelled = false;
      const fluteVoices: Array<() => void> = [];

      const playFluteNote = (freq: number, duration: number) => {
        const t0 = ctx.currentTime;
        // Two harmonics (sine + 2nd) gives a hollow, breathy bansuri-ish tone
        const fund = ctx.createOscillator();
        const second = ctx.createOscillator();
        fund.type = "sine";
        second.type = "sine";
        fund.frequency.value = freq;
        second.frequency.value = freq * 2;

        // Vibrato (~5 Hz, ±3 cents)
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

        // Soft envelope: 0.6s attack, hold, 0.8s release
        const attack = 0.6;
        const release = 0.9;
        gFund.gain.setValueAtTime(0, t0);
        gFund.gain.linearRampToValueAtTime(0.09, t0 + attack);
        gFund.gain.linearRampToValueAtTime(0.075, t0 + duration - release);
        gFund.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

        gSecond.gain.setValueAtTime(0, t0);
        gSecond.gain.linearRampToValueAtTime(0.025, t0 + attack);
        gSecond.gain.linearRampToValueAtTime(0.018, t0 + duration - release);
        gSecond.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

        // Breath: brief filtered noise burst at note start
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
        breathGain.gain.linearRampToValueAtTime(0.025, t0 + 0.1);
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

        const cleanup = () => {
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
        };
        fluteVoices.push(cleanup);
      };

      let phraseTimer: ReturnType<typeof setTimeout> | null = null;
      const stepPhrase = () => {
        if (fluteCancelled) return;
        const freq = flutePhrase[phraseIdx % flutePhrase.length];
        const dur = 4 + Math.random() * 2; // 4–6s notes
        playFluteNote(freq, dur);
        phraseIdx += 1;
        // Pause between notes — sometimes longer to feel meditative
        const gap = phraseIdx % flutePhrase.length === 0 ? 7 : 3 + Math.random() * 1.5;
        phraseTimer = setTimeout(stepPhrase, (dur * 0.7 + gap) * 1000);
      };

      if (kind === "wind") {
        // Start the first note shortly after the wind fades in
        phraseTimer = setTimeout(stepPhrase, 2000);
      }

      const stop = () => {
        fluteCancelled = true;
        if (phraseTimer) clearTimeout(phraseTimer);
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
        // Cleanup any in-flight flute voices in ~2s
        setTimeout(() => fluteVoices.forEach((c) => c()), 2000);
      };
      ambientNodesRef.current = { gain: noiseGain, stop };
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

  // When enabled flips, start or stop the desired ambient
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
        // Two-tone soft chime: A5 + E6
        const freqs = [880, 1318.51];
        freqs.forEach((f, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "sine";
          o.frequency.value = f;
          o.connect(g);
          g.connect(master);
          const t = now + i * 0.07;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.18, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
          o.start(t);
          o.stop(t + 1.6);
        });
      } else if (cue === "bell") {
        // Bell: fundamental + 2.76x harmonic + 5.4x harmonic, longer decay
        const fundamental = 523.25; // C5
        const partials = [
          [1, 0.6, 2.4],
          [2.76, 0.3, 1.6],
          [5.4, 0.15, 1.0],
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
        // Tiny puff of high-passed noise
        const bufferSize = ctx.sampleRate * 0.3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const f = ctx.createBiquadFilter();
        f.type = "highpass";
        f.frequency.value = 2500;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.2, now + 0.02);
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

  const toggle = useCallback(() => {
    setEnabled((v) => !v);
  }, []);

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
