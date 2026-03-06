import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import LocationFacts from "@/components/sections/LocationFacts";
import UnitLayouts from "@/components/sections/UnitLayouts";
import Facilities from "@/components/sections/Facilities";
import Concierge from "@/components/sections/Concierge";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg relative">
      <Navbar />
      <Hero />
      <LocationFacts />
      <Facilities />
      <UnitLayouts />
      <Concierge />
      <Contact />
    </main>
  );
}
