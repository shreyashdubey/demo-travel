"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { StoryStrip } from "@/components/sections/StoryStrip";
import { Destinations } from "@/components/sections/Destinations";
import { Experiences } from "@/components/sections/Experiences";
import { HiddenHimachal } from "@/components/sections/HiddenHimachal";
import { WeatherWindow } from "@/components/sections/WeatherWindow";
import { Packages } from "@/components/sections/Packages";
import { Journey } from "@/components/sections/Journey";
// import { RangeMoment } from "@/components/sections/RangeMoment"; // disabled per request — bring back when 3D is ready
import { FoodCulture } from "@/components/sections/FoodCulture";
import { AboutSaroj } from "@/components/sections/AboutSaroj";
import { BookingForm } from "@/components/sections/BookingForm";
import { Footer } from "@/components/sections/Footer";

function defaultPackageForSeason(): string {
  // Show the package that matches the current month so the page feels personal.
  const m = new Date().getMonth();
  if (m >= 10 || m <= 1) return "first-snow"; // Nov–Feb: snow season
  if (m === 8 || m === 9) return "kullu-roots"; // Sep–Oct: apple harvest
  return "spiti-circuit"; // Mar–Aug: long days, full circuit
}

export default function Home() {
  const [selected, setSelected] = useState<string | null>(() => defaultPackageForSeason());

  return (
    <main className="relative">
      <Hero />
      <Experiences />
      <HiddenHimachal />
      <StoryStrip />
      <Destinations />
      <WeatherWindow />
      {/* <RangeMoment /> — disabled per request */}
      <Packages selected={selected} onSelect={setSelected} />
      <Journey selected={selected} />
      <FoodCulture />
      <AboutSaroj />
      <BookingForm />
      <Footer />
    </main>
  );
}
