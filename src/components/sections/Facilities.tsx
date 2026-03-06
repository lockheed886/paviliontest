"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Waves, Dumbbell, TreePine, Gamepad2, Star } from "lucide-react";

const levels = [
  {
    id: "AQUA",
    label: "Aquatic Oasis",
    headline: "Resort-Style Pools",
    stat: "4",
    statLabel: "Aquatic Zones",
    image: "/pdh/ct10_e-broucher__p4_img1.jpeg",
    bgImage: "/pdh/ct10_e-broucher__p6_img1.jpeg",
    features: ["Lap Pool", "Children's Pool", "Heated Pool", "Jacuzzi", "Sun Deck", "Poolside Lounge"],
    icon: Waves,
  },
  {
    id: "WELL",
    label: "Fitness & Wellness",
    headline: "Holistic Health",
    stat: "5+",
    statLabel: "Wellness Spaces",
    image: "/pdh/pdh_overview_(luxury_p16_img1.jpeg",
    bgImage: "/pdh/pdh_overview_(luxury_p16_img1.jpeg",
    features: ["Equipped Gym", "Yoga Room", "Sauna & Steam", "Wellness Trail", "Fitness Deck", "Meditation Zones"],
    icon: Dumbbell,
  },
  {
    id: "REC",
    label: "Recreation Hub",
    headline: "Curated Entertainment",
    stat: "Elite",
    statLabel: "Social Lounges",
    image: "/pdh/pdh_overview_(luxury_p17_img1.jpeg",
    bgImage: "/pdh/pdh_overview_(luxury_p17_img1.jpeg",
    features: ["Function Room", "Pre-function Room", "Library Gallery", "Game Room", "Private Lounges", "Reading Nooks"],
    icon: Gamepad2,
  },
  {
    id: "EXT",
    label: "Outdoor & Living",
    headline: "Elevated Living",
    stat: "∞",
    statLabel: "Lifestyle",
    image: "/pdh/pdh_overview_(luxury_p18_img1.jpeg",
    bgImage: "/pdh/pdh_overview_(luxury_p18_img1.jpeg",
    features: ["Sky Terrace", "Garden Lawn & BBQ", "Grill Kitchen", "Day Care Center", "Laundrette", "Prayer Room"],
    icon: TreePine,
  },
];

export default function Facilities() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = levels[activeIdx];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % levels.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const selectLevel = (i: number) => {
    setActiveIdx(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  };

  return (
    <section id="facilities" className="relative overflow-hidden min-h-screen">

      {/* ── Full-bleed background ── */}
      <AnimatePresence>
        <motion.div
          key={`fac-bg-${activeIdx}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image src={active.bgImage} alt="" fill sizes="100vw" priority className="object-cover" />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlays — warm umber, NOT black ── */}
      {/* Center-split: slightly darker left for text, let right show image */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1208]/92 via-[#1A1208]/70 to-[#1A1208]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/80 via-transparent to-[#1A1208]/50" />
      {/* Gold shimmer accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C49A38] to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C49A38]/60 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-24 min-h-screen flex flex-col justify-center">

        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C49A38] font-sans text-[10px] uppercase tracking-[0.45em] font-bold flex items-center gap-3 mb-4"
          >
            <Star className="w-3.5 h-3.5" />
            World-Class Lifestyle Amenities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg"
          >
            Sky-High <em className="italic font-light text-[#C49A38]">Facilities</em>
          </motion.h2>
          <div className="mt-4 w-16 h-[2px] bg-gradient-to-r from-[#C49A38] to-transparent" />
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {levels.map((l, i) => (
            <button
              key={l.id}
              onClick={() => selectLevel(i)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-sans font-bold transition-all duration-400 overflow-hidden group ${i === activeIdx
                ? "bg-[#C49A38] text-black shadow-[0_6px_24px_rgba(196,154,56,0.45)]"
                : "bg-white/10 text-white/60 border border-white/15 hover:border-[#C49A38]/50 hover:text-[#C49A38] backdrop-blur-sm"
                }`}
            >
              {i === activeIdx && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              <l.icon className="w-3.5 h-3.5 relative z-10" strokeWidth={i === activeIdx ? 2 : 1.5} />
              <span className="relative z-10">{l.label}</span>
            </button>
          ))}
        </div>

        {/* ── EQUAL 2-column grid (6/6) ── */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          {/* LEFT column — Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${active.id}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 h-full"
            >
              {/* Main info card — glassmorphism */}
              <div className="flex-1 relative p-7 sm:p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.2)]">
                {/* Corner gold brackets */}
                <div className="absolute top-0 left-0 w-12 h-[2px] bg-[#C49A38]" />
                <div className="absolute top-0 left-0 w-[2px] h-12 bg-[#C49A38]" />
                <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-[#C49A38]/40" />
                <div className="absolute bottom-0 right-0 w-[2px] h-12 bg-[#C49A38]/40" />

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C49A38]/50 bg-[#C49A38]/15 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C49A38] animate-pulse shadow-[0_0_8px_rgba(196,154,56,0.9)]" />
                  <span className="text-[9px] uppercase tracking-[0.35em] font-sans font-bold text-[#C49A38]">{active.label}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-heading font-normal text-white mb-7 leading-tight drop-shadow-md">
                  {active.headline}
                </h3>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {active.features.map((f, i) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#C49A38] px-3.5 py-1.5 rounded-full border border-[#C49A38]/35 bg-[#C49A38]/10 backdrop-blur-sm hover:border-[#C49A38]/70 hover:bg-[#C49A38]/20 transition-all duration-300 cursor-default"
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Stat card — solid gold */}
              <div className="relative p-6 rounded-3xl bg-[#C49A38] overflow-hidden shadow-[0_8px_30px_rgba(196,154,56,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shine-sweep_4s_ease-in-out_infinite]" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-sans uppercase tracking-[0.3em] font-bold text-black/55 mb-1">{active.statLabel}</div>
                    <div className="text-5xl font-heading font-normal text-black leading-none">{active.stat}</div>
                  </div>
                  <div className="w-16 h-16 rounded-full border-2 border-black/15 flex items-center justify-center bg-black/10">
                    <active.icon className="w-7 h-7 text-black/70" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT column — Image card (SAME height as left) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${active.id}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.0, ease: [0.25, 1, 0.35, 1] }}
                className="absolute inset-0 rounded-3xl overflow-hidden border border-white/15 shadow-[0_12px_60px_rgba(0,0,0,0.35)] group"
              >
                {/* Corner brackets on hover */}
                <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[#C49A38]/70 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-[#C49A38]/70 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Image
                  src={active.image}
                  alt={active.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
                />

                {/* Gradient — warm umber, not black */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/80 via-transparent to-transparent" />

                {/* Bottom HUD */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.35em] text-[#C49A38] font-bold font-sans mb-2">Zone · {active.id}</div>
                      <div className="text-2xl sm:text-3xl font-heading font-light text-white drop-shadow-lg">{active.headline}</div>
                    </div>
                    {/* Dot indicators */}
                    <div className="flex flex-col gap-1.5 items-end">
                      {levels.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => selectLevel(i)}
                          className={`rounded-full transition-all duration-500 ${i === activeIdx
                            ? "bg-[#C49A38] w-6 h-2 shadow-[0_0_10px_rgba(196,154,56,0.8)]"
                            : "bg-white/30 hover:bg-[#C49A38]/60 w-2 h-2"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
