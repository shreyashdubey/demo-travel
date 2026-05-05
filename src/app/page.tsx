"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { StoryStrip } from "@/components/sections/StoryStrip";
import { Destinations } from "@/components/sections/Destinations";
import { Experiences } from "@/components/sections/Experiences";
import { Packages } from "@/components/sections/Packages";
import { Journey } from "@/components/sections/Journey";
// import { RangeMoment } from "@/components/sections/RangeMoment"; // disabled per request — bring back when 3D is ready
import { FoodCulture } from "@/components/sections/FoodCulture";
import { AboutSaroj } from "@/components/sections/AboutSaroj";
import { BookingForm } from "@/components/sections/BookingForm";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [selected, setSelected] = useState<string | null>("spiti-circuit");

  return (
    <main className="relative">
      <Hero />
      <StoryStrip />
      <Destinations />
      <Experiences />
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
