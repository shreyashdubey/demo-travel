"use client";

import { Howl } from "howler";
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

type SoundKey = "wind" | "river" | "bell" | "snow" | "chime";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (key: SoundKey) => void;
  setAmbient: (key: "wind" | "river" | "night" | null) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const SOURCES: Record<SoundKey, string[]> = {
  // Free CC0 sources from pixabay/freesound rehosted as small data fallbacks.
  // We use external CDN sources; if they fail to load, the toggle still works (silently).
  wind: [
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_270f8a8bbb.mp3?filename=mountain-wind-ambience-loop-7088.mp3",
  ],
  river: [
    "https://cdn.pixabay.com/download/audio/2022/03/10/audio_d12cb86dc9.mp3?filename=river-flowing-loop-7090.mp3",
  ],
  bell: [
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e9b22.mp3?filename=temple-bell-7028.mp3",
  ],
  snow: [
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_b0464b3128.mp3?filename=snow-crunch-7035.mp3",
  ],
  chime: [
    "https://cdn.pixabay.com/download/audio/2022/03/10/audio_ad9b8e0a16.mp3?filename=soft-chime-7077.mp3",
  ],
};

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const sounds = useRef<Partial<Record<SoundKey, Howl>>>({});
  const ambientRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (!enabled) {
      Object.values(sounds.current).forEach((h) => h?.fade(h.volume(), 0, 600));
      return;
    }
    Object.entries(SOURCES).forEach(([key, src]) => {
      const k = key as SoundKey;
      if (!sounds.current[k]) {
        sounds.current[k] = new Howl({
          src,
          html5: true,
          loop: ["wind", "river"].includes(k),
          volume: 0,
          preload: false,
        });
      }
    });
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const next = !v;
      try {
        localStorage.setItem("dh_sound", String(next));
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dh_sound");
      if (saved === "true") setEnabled(true);
    } catch {}
  }, []);

  const play = useCallback(
    (key: SoundKey) => {
      if (!enabled) return;
      const s = sounds.current[key];
      if (!s) return;
      s.volume(0.6);
      s.play();
    },
    [enabled],
  );

  const setAmbient = useCallback(
    (key: "wind" | "river" | "night" | null) => {
      if (ambientRef.current) {
        ambientRef.current.fade(ambientRef.current.volume(), 0, 1200);
        ambientRef.current = null;
      }
      if (!enabled || !key || key === "night") return;
      const s = sounds.current[key];
      if (!s) return;
      s.volume(0);
      s.play();
      s.fade(0, 0.18, 1500);
      ambientRef.current = s;
    },
    [enabled],
  );

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
