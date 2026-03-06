"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useInView as useInViewRIO } from "react-intersection-observer";
import {
  MapPin, Train, ShoppingBag, Building2, Landmark, Plane, Car,
  ArrowRight, Star, Wifi,
  TrendingUp, Send, Navigation
} from "lucide-react";

/* ── Slide images ─────────────────────────────────────── */
const slides = [
  {
    src: "/pdh/ct10_e-broucher__p3_img1.jpeg",
    headline: "The Epicentre of KL",
    sub: "Jalan Damanlela, Damansara Heights",
  },
  {
    src: "/pdh/(feb_2026)_pdh_rc_ro_p1_img3.jpeg",
    headline: "Integrated Lifestyle",
    sub: "Directly connected to Pavilion Lifestyle Mall",
  },
  {
    src: "/pdh/pdh_overview_(luxury_p3_img1.jpeg",
    headline: "Connected to Everything",
    sub: "Pavilion Damansara Heights MRT — Seamless transit",
  },
  {
    src: "/pdh/pdh_overview_(luxury_p6_img1.jpeg",
    headline: "Damansara Heights Landmark",
    sub: "Where luxury living meets world-class convenience",
  },
  {
    src: "/pdh/pdh_overview_(luxury_p7_img1.jpeg",
    headline: "KL's Most Coveted Address",
    sub: "15.92 acres of integrated premium lifestyle",
  },
];

/* ── Quick Facts ─────────────────────────────────────── */
const facts = [
  { value: "15.92", label: "Acres Total", icon: Building2 },
  { value: "1,314", label: "Residences", icon: Landmark },
  { value: "1M sqft", label: "Retail Mall", icon: ShoppingBag },
  { value: "9", label: "Corp Towers", icon: TrendingUp },
  { value: "Phase 1", label: "Ready", icon: Star },
  { value: "Freehold", label: "Tenure", icon: Wifi },
];

/* ── Connectivity ────────────────────────────────────── */
const connectivity = [
  { name: "Pavilion Lifestyle Mall", detail: "Over 1 million sqft of luxury retail", icon: ShoppingBag, highlight: true },
  { name: "Pavilion Damansara Heights MRT", detail: "Seamlessly connected to development", icon: Train, highlight: true },
  { name: "KL Sentral", detail: "2 stations away via MRT", icon: Train, highlight: false },
  { name: "KLCC Twin Towers", detail: "5 stations away via MRT", icon: Building2, highlight: false },
  { name: "Bukit Bintang / Pavilion KL", detail: "Direct connectivity via MRT line", icon: Landmark, highlight: false },
  { name: "KL International Airport", detail: "Transfer via KL Sentral KLIA Ekspres", icon: Plane, highlight: false },
  { name: "SPRINT Highway", detail: "Immediate highway access", icon: Car, highlight: false },
  { name: "Bangsar & Mont Kiara", detail: "test away from affluent neighborhoods", icon: Star, highlight: false },
];

/* ── Full-bleed BG Slider ────────────────────────────── */
function BgSlider({ current, slides }: { current: number; slides: { src: string; headline: string; sub: string }[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <Image
            src={s.src}
            alt={s.headline}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover kb-zoom-bg"
          />
        </motion.div>
      ))}
      {/* Dark overlay — strong enough for text but preserving image visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#171410]/95 via-[#1F1B16]/80 to-[#1F1B16]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#100D0A] via-transparent to-[#100D0A]/60" />
      {/* Gold shimmer line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C49A38]/60 to-transparent" />
    </div>
  );
}

/* ── Animated counter ────────────────────────────────── */
function StatItem({ value, label, icon: Icon, delay }: { value: string; label: string; icon: React.ElementType; delay: number }) {
  const { ref, inView } = useInViewRIO({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between p-5 border-l border-[#C49A38]/30 hover:border-[#C49A38] hover:bg-gradient-to-r from-[#C49A38]/10 to-transparent transition-all duration-500"
    >
      {/* Prominent Glowing Icon */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-transparent border border-[#C49A38] mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(196,154,56,0.4)] group-hover:bg-[#C49A38]/20 transition-all duration-500">
        <Icon className="w-5 h-5 text-[#C49A38] transition-colors duration-500" strokeWidth={1.5} />
      </div>
      <div>
        <div
          className="text-3xl sm:text-4xl font-heading font-semibold leading-none mb-2"
          style={{
            color: "#E8C66A",
            textShadow: "0 0 20px rgba(196,154,56,0.4), 0 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          {value}
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/80 group-hover:text-[#E8C66A] transition-colors font-bold font-sans">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function LocationFacts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInViewRIO({ triggerOnce: true, threshold: 0.1 });

  /* Auto-advance slider */
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [isPaused]);

  const goTo = (i: number) => { setCurrent(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000); };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <section id="location" ref={sectionRef} className="relative overflow-hidden bg-white">
      <BgSlider current={current} slides={slides} />

      {/* Content */}
      <div className="relative z-10 flex flex-col py-16 sm:py-24">
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6">

          {/* ── TOP: Hero text + slide info (full width) ── */}
          <div className="mb-12 sm:mb-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", x: -20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold flex items-center gap-3 mb-6"
              style={{
                color: "#E8C66A",
                textShadow: "0 0 12px rgba(196,154,56,0.4)",
              }}
            >
              <Navigation className="w-3.5 h-3.5" />
              Prime Location — Damansara Heights, KL
            </motion.div>

            {/* Slide headline */}
            <div className="overflow-hidden mb-3">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={current}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-normal leading-[1.05] tracking-tight"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)",
                  }}
                >
                  {slides[current].headline.split(" ").map((w, i) =>
                    i === slides[current].headline.split(" ").length - 1 ? (
                      <span
                        key={i}
                        className="italic font-light"
                        style={{
                          color: "#E8C66A",
                          textShadow: "0 0 25px rgba(196,154,56,0.5), 0 2px 10px rgba(0,0,0,0.5)",
                        }}
                      >
                        {w}{" "}
                      </span>
                    ) : <span key={i}>{w} </span>
                  )}
                </motion.h1>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-base md:text-lg font-sans font-light tracking-wide max-w-lg"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {slides[current].sub}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── MIDDLE: Two equal columns side by side ── */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

            {/* LEFT — Strategic Connectivity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-gradient-to-r from-[#C49A38] to-transparent" />
                <div
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-extrabold font-sans"
                  style={{
                    color: "#E8C66A",
                    textShadow: "0 0 10px rgba(196,154,56,0.3)",
                  }}
                >
                  Strategic Connectivity
                </div>
              </div>

              <div className="relative pl-6 border-l border-[#C49A38]/25 space-y-6">
                {connectivity.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group cursor-default"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[29px] top-1.5 w-[7px] h-[7px] rounded-full bg-white border border-[#C49A38]/50 group-hover:border-[#C49A38] group-hover:bg-[#C49A38] transition-all duration-500 shadow-[0_0_0_rgba(196,154,56,0)] group-hover:shadow-[0_0_15px_rgba(196,154,56,0.8)]" />

                    <div className="flex gap-4 sm:gap-5 items-start">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/20 border border-[#C49A38]/30 group-hover:border-[#C49A38] group-hover:bg-[#C49A38]/10 transition-all duration-500 shrink-0">
                        <item.icon className={`w-4 h-4 ${item.highlight ? "text-[#E8C66A]" : "text-white/50"} group-hover:text-[#E8C66A] transition-colors`} strokeWidth={1.5} />
                      </div>

                      <div>
                        <div
                          className={`text-sm sm:text-[15px] tracking-wide font-semibold font-sans group-hover:text-white transition-colors duration-300`}
                          style={{
                            color: item.highlight ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          className="text-[11px] sm:text-xs font-sans tracking-wide mt-1 max-w-xs leading-relaxed group-hover:text-white/80 transition-colors duration-300"
                          style={{
                            color: "rgba(255,255,255,0.6)",
                            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          }}
                        >
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Project Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="flex flex-col gap-6 w-full"
            >
              {/* Stats grid */}
              <div ref={statsRef}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-[#C49A38] to-transparent" />
                  <div
                    className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.4em] font-extrabold"
                    style={{
                      color: "#E8C66A",
                      textShadow: "0 0 10px rgba(196,154,56,0.3)",
                    }}
                  >
                    Project Highlights
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-10">
                  {facts.map((f, i) => (
                    <StatItem key={f.label} {...f} delay={0.08 * i} />
                  ))}
                </div>
              </div>

              {/* Map CTA & Enquire CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <motion.a
                  href="https://maps.google.com/?q=Pavilion+Damansara+Heights"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-[1.2] group relative p-5 sm:p-6 rounded-2xl flex items-center justify-between transition-all duration-500 overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(196,154,56,0.15)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 0 0 0 rgba(196,154,56,0)",
                  }}
                >
                  {/* Hover shine sweep */}
                  <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#C49A38]/10 to-transparent transform -skew-x-12 group-hover:animate-[shine-sweep_2s_ease-in-out_infinite]" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C49A38]/10 to-[#C49A38]/5 border border-[#C49A38]/20 flex items-center justify-center shrink-0 group-hover:border-[#C49A38]/60 group-hover:bg-[#C49A38]/15 group-hover:shadow-[0_0_15px_rgba(196,154,56,0.2)] transition-all duration-500">
                      <MapPin className="w-4.5 h-4.5 text-[#C49A38]" strokeWidth={1.5} />
                    </div>
                    <div className="font-sans">
                      <div className="text-[#333] font-bold text-sm tracking-wide group-hover:text-[#B8860B] transition-colors duration-300">Jalan Damanlela</div>
                      <div className="text-[#999] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5 group-hover:text-[#C49A38] transition-colors duration-300">Open in Maps</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#C49A38]/10 flex items-center justify-center group-hover:bg-[#C49A38] transition-all duration-500 relative z-10">
                    <ArrowRight className="w-3.5 h-3.5 text-[#C49A38] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 group relative p-5 sm:p-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #C49A38 0%, #D4AF5C 40%, #C49A38 70%, #B8860B 100%)",
                    backgroundSize: "200% 100%",
                    boxShadow: "0 4px 25px rgba(196,154,56,0.35), 0 0 50px rgba(196,154,56,0.1)",
                  }}
                >
                  {/* Animated shine */}
                  <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:animate-[shine-sweep_1.5s_ease-in-out_infinite]" />
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)" }} />
                  <Send className="w-4 h-4 text-black relative z-10 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
                  <span className="text-black font-sans font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.25em] relative z-10">Enquire Now</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
