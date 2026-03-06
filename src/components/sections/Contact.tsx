"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Phone, Mail, MapPin, Send,
  Facebook, Instagram, Globe, ExternalLink,
  ChevronLeft, ChevronRight, CheckCircle, Star,
} from "lucide-react";

/* WhatsApp SVG Icon */
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Gallery images ─────────────────────────────────── */
const gallery = [
  { src: "/pdh/ct10_e-broucher__p3_img1.jpeg", label: "Grand Arrival Lobby" },
  { src: "/pdh/ct10_e-broucher__p4_img1.jpeg", label: "Sky Pool — Level 67" },
  { src: "/pdh/imperial_resi_e-broc_fullpage_p5.jpeg", label: "Luxury Residence Interior" },
  { src: "/pdh/pdh_overview_(luxury_p16_img1.jpeg", label: "Rooftop Sky Garden" },
  { src: "/pdh/pdh_r1_&_r2_1br_e-br_p4_img1.jpeg", label: "Premium Suite Living" },
  { src: "/pdh/(feb_2026)_pdh_rc_ro_p1_img3.jpeg", label: "Facade — Damansara Heights" },
  { src: "/pdh/ct10_e-broucher__p6_img1.jpeg", label: "Dining & Entertainment" },
  { src: "/pdh/pdh_overview_(luxury_p6_img1.jpeg", label: "Master Bedroom" },
  { src: "/pdh/pdh_overview_(luxury_p17_img1.jpeg", label: "Aerial Pavilion View" },
  { src: "/pdh/pdh_overview_(luxury_p18_img1.jpeg", label: "Crown Penthouse" },
];

const contactInfo = [
  { icon: Phone, label: "Sales Line", value: "+6011-1522 3700", href: "tel:+601115223700" },
  { icon: WhatsAppIcon, label: "WhatsApp", value: "+6011 2880 8088", href: "https://api.whatsapp.com/send?phone=601115223700" },
  { icon: Mail, label: "Email", value: "sales@paviliondamansaraheights.com", href: "mailto:sales@paviliondamansaraheights.com" },
  { icon: MapPin, label: "Gallery", value: "Jalan Damansara, Damansara Heights, KL", href: null },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/paviliondamansaraheights" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/paviliondamansaraheights" },
  { icon: Globe, label: "Website", href: "https://www.paviliondamansaraheightscondo.com" },
];

const quickLinks = [
  { label: "Unit Layouts", href: "#unit-layouts" },
  { label: "Facilities", href: "#facilities" },
  { label: "Concierge Services", href: "#concierge" },
  { label: "Location", href: "#location" },
];

/* ─────────────────────────────────────────────────── */
export default function Contact() {
  /* Scroll Animation Ref */
  const registerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: registerRef,
    offset: ["start 90%", "center center"]
  });
  const leftX = useTransform(scrollYProgress, [0, 1], ["-40vw", "0vw"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["40vw", "0vw"]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 1, 1]);

  /* Gallery */
  const [galIdx, setGalIdx] = useState(0);
  const galPaused = useRef(false);
  useEffect(() => {
    const t = setInterval(() => { if (!galPaused.current) setGalIdx((i) => (i + 1) % gallery.length); }, 4500);
    return () => clearInterval(t);
  }, []);
  const goGal = (i: number) => { galPaused.current = true; setGalIdx(i); setTimeout(() => { galPaused.current = false; }, 8000); };
  const galPrev = () => goGal((galIdx - 1 + gallery.length) % gallery.length);
  const galNext = () => goGal((galIdx + 1) % gallery.length);

  /* Form */
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; }); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message required";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputCls = "w-full bg-[#F5EEDD] border border-[#C49A38]/20 rounded-2xl px-5 py-4 text-[14px] font-sans text-[#333333] placeholder-[#999999] focus:outline-none focus:border-[#C49A38] focus:shadow-[0_0_0_3px_rgba(196,154,56,0.1)] transition-all duration-300";

  return (
    <section id="contact" className="relative overflow-hidden bg-[#FDFBF7]">

      {/* ══════════════════════════════════════
          GALLERY SECTION
      ══════════════════════════════════════ */}
      <div id="gallery" className="relative h-[85vh] overflow-hidden">

        {/* Slides */}
        {gallery.map((g, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ opacity: i === galIdx ? 1 : 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <Image
              src={g.src}
              alt={g.label}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
          </motion.div>
        ))}

        {/* Warm umber overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/85 via-[#1A1208]/30 to-[#1A1208]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1208]/60 via-transparent to-transparent" />
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C49A38] to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C49A38]/60 to-transparent" />

        {/* Section label top-left */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-[#C49A38]/40 bg-[#1A1208]/50 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 text-[#C49A38]" />
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] font-bold text-[#C49A38]">Explore The Gallery</span>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={galPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border-2 border-white/25 bg-[#1A1208]/40 backdrop-blur-md flex items-center justify-center text-white hover:border-[#C49A38] hover:bg-[#C49A38]/20 transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:text-[#C49A38] transition-colors" />
        </button>
        <button
          onClick={galNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border-2 border-white/25 bg-[#1A1208]/40 backdrop-blur-md flex items-center justify-center text-white hover:border-[#C49A38] hover:bg-[#C49A38]/20 transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:text-[#C49A38] transition-colors" />
        </button>

        {/* Bottom HUD — label + thumbnail strip */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6">
          {/* Active image caption */}
          <AnimatePresence mode="wait">
            <motion.div
              key={galIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mb-4 flex items-center gap-3"
            >
              <div className="w-6 h-[2px] bg-[#C49A38]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#C49A38] font-bold">{gallery[galIdx].label}</span>
              <span className="text-[10px] text-white/40">{galIdx + 1} / {gallery.length}</span>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => goGal(i)}
                className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-400 ${i === galIdx
                  ? "w-24 h-16 ring-2 ring-[#C49A38] shadow-[0_0_15px_rgba(196,154,56,0.5)]"
                  : "w-16 h-12 opacity-50 hover:opacity-80 hover:ring-1 hover:ring-[#C49A38]/50"
                  }`}
              >
                <Image src={g.src} alt={g.label} fill sizes="96px" className="object-cover" />
                {i !== galIdx && <div className="absolute inset-0 bg-[#1A1208]/40" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          REGISTER YOUR ENQUIRY SECTION
      ══════════════════════════════════════ */}
      <div id="register" ref={registerRef} className="relative overflow-hidden">

        {/* Background — warm champagne with gold glow */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #F9F1E0 0%, #F5EBCE 40%, #F0E4BC 70%, #F5EBCE 100%)" }} />
        <div className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(196,154,56,0.8) 0%, transparent 70%)" }}
        />
        {/* Subtle dot texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #B8860B 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C49A38] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C49A38]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">

          {/* ── TOP: Heading area (full width) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 sm:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C49A38]/40 bg-[#C49A38]/10 mb-7">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C49A38] animate-pulse" />
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] font-bold text-[#C49A38]">Priority Access</span>
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-normal text-[#333333] leading-[1.05] tracking-tight mb-4">
              Register Your <em className="text-[#C49A38] italic font-light">Enquiry</em>
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#C49A38] to-transparent mb-8" />

            <p className="text-[#555555] font-sans font-light text-[15px] leading-relaxed max-w-xl">
              Be the first to access exclusive floor plans, pricing, and private viewing appointments.
            </p>
          </motion.div>

          {/* ── MIDDLE: Two equal columns side by side ── */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">

            {/* LEFT — Contact info card (premium glassmorphism) */}
            <motion.div
              style={{ x: leftX, opacity: cardOpacity }}
              className="relative p-8 sm:p-10 rounded-3xl bg-[#FBF5E8] border border-[#C49A38]/25 overflow-hidden shadow-[0_20px_60px_rgba(196,154,56,0.12)] flex flex-col"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-[2px] bg-[#C49A38]" />
              <div className="absolute top-0 left-0 w-[2px] h-12 bg-[#C49A38]" />
              <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-[#C49A38]/40" />
              <div className="absolute bottom-0 right-0 w-[2px] h-12 bg-[#C49A38]/40" />

              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[2px] bg-gradient-to-r from-[#C49A38] to-transparent" />
                <div className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C49A38] font-bold">Get In Touch</div>
              </div>

              {/* Contact tiles — premium hover cards */}
              <div className="flex flex-col gap-3 flex-1">
                {contactInfo.map((c) => (
                  <a
                    key={c.label}
                    href={c.href || "#"}
                    className="group flex items-center gap-4 p-4 rounded-2xl border border-[#C49A38]/15 bg-[#F5EEDD] hover:border-[#C49A38]/40 hover:bg-[#FBF5E8] hover:shadow-[0_4px_20px_rgba(196,154,56,0.15)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl border border-[#C49A38]/30 bg-gradient-to-br from-[#C49A38]/10 to-[#C49A38]/5 flex items-center justify-center shrink-0 group-hover:border-[#C49A38]/60 group-hover:bg-[#C49A38]/15 group-hover:shadow-[0_0_15px_rgba(196,154,56,0.2)] transition-all duration-300">
                      <c.icon className="w-5 h-5 text-[#C49A38]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#C49A38] font-bold mb-0.5">{c.label}</div>
                      <div className="text-[14px] font-sans font-semibold text-[#333333] group-hover:text-[#C49A38] transition-colors">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social icons + WhatsApp — enhanced with hover glow */}
              <div className="mt-8 pt-6 border-t border-[#C49A38]/15">
                <div className="text-[9px] font-sans uppercase tracking-[0.35em] text-[#C49A38]/60 font-bold mb-4">Follow Us</div>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="group w-12 h-12 rounded-2xl border border-[#C49A38]/25 bg-[#F5EEDD] flex items-center justify-center hover:border-[#C49A38]/60 hover:bg-[#C49A38] hover:shadow-[0_4px_20px_rgba(196,154,56,0.35)] hover:scale-110 transition-all duration-300"
                    >
                      <s.icon className="w-5 h-5 text-[#C49A38] group-hover:text-white transition-colors" />
                    </a>
                  ))}
                  <a href="https://api.whatsapp.com/send?phone=601115223700" target="_blank" rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#C49A38] to-[#B8860B] text-white text-[10px] font-sans font-bold uppercase tracking-[0.2em] hover:shadow-[0_4px_25px_rgba(196,154,56,0.5)] hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shine-sweep_1.5s_ease-in-out_infinite]" />
                    <WhatsAppIcon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Form card (starts at same level) */}
            <motion.div
              style={{ x: rightX, opacity: cardOpacity }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative p-10 rounded-3xl bg-[#FBF5E8] border border-[#C49A38]/25 text-center overflow-hidden shadow-[0_20px_60px_rgba(196,154,56,0.12)]"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C49A38] to-transparent" />
                    <div className="w-20 h-20 rounded-full border-2 border-[#C49A38]/40 bg-[#C49A38]/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-[#C49A38]" />
                    </div>
                    <h3 className="text-2xl font-heading font-light text-[#333333] mb-3">Enquiry Registered</h3>
                    <p className="text-[#555555] text-[14px] font-sans font-light leading-relaxed mb-8">
                      Our senior sales consultant will be in touch shortly to arrange your private viewing.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C49A38] hover:text-[#A67C2E] transition-colors"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="relative p-8 sm:p-10 rounded-3xl bg-[#FBF5E8] border border-[#C49A38]/25 overflow-hidden flex flex-col gap-5 shadow-[0_20px_60px_rgba(196,154,56,0.12)]"
                  >
                    {/* Top gold bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C49A38] to-transparent" />
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-12 h-[2px] bg-[#C49A38]" />
                    <div className="absolute top-0 left-0 w-[2px] h-12 bg-[#C49A38]" />
                    <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-[#C49A38]/40" />
                    <div className="absolute bottom-0 right-0 w-[2px] h-12 bg-[#C49A38]/40" />

                    {/* Header */}
                    <div className="mb-2">
                      <div className="text-[9px] font-sans uppercase tracking-[0.4em] text-[#C49A38] font-bold mb-3">Complete Your Registration</div>
                      <h3 className="text-2xl sm:text-3xl font-heading font-light text-[#333333] leading-tight">
                        Secure Your <em className="text-[#C49A38] italic">Priority Access</em>
                      </h3>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-sans font-bold text-[#555555] uppercase tracking-[0.2em]">
                        Full Name <span className="text-[#C49A38]">*</span>
                      </label>
                      <input
                        value={form.name}
                        onChange={e => set("name", e.target.value)}
                        placeholder="Your name"
                        className={inputCls}
                      />
                      {errors.name && <span className="text-red-400 text-[11px]">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-sans font-bold text-[#555555] uppercase tracking-[0.2em]">
                        Email Address <span className="text-[#C49A38]">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => set("email", e.target.value)}
                        placeholder="your@email.com"
                        className={inputCls}
                      />
                      {errors.email && <span className="text-red-400 text-[11px]">{errors.email}</span>}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-sans font-bold text-[#555555] uppercase tracking-[0.2em]">
                        Message <span className="text-[#C49A38]">*</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={e => set("message", e.target.value)}
                        rows={4}
                        placeholder="Tell us your preferred unit type, move-in date, or any questions…"
                        className={inputCls + " resize-none"}
                      />
                      {errors.message && <span className="text-red-400 text-[11px]">{errors.message}</span>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="relative group w-full py-4 rounded-2xl bg-[#C49A38] text-black font-sans font-bold text-[11px] uppercase tracking-[0.25em] disabled:opacity-60 hover:shadow-[0_0_30px_rgba(196,154,56,0.5)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                      <div className="relative flex items-center justify-center gap-2">
                        {submitting ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="15" /></svg>
                            Sending…
                          </>
                        ) : (
                          <><Send className="w-4 h-4" /> Register My Enquiry</>
                        )}
                      </div>
                    </button>

                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="relative overflow-hidden bg-[#1A1208]">
        {/* Subtle gold glow */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(196,154,56,0.8) 0%, transparent 70%)" }} />
        {/* Dot texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #C49A38 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        {/* Gold accent top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C49A38] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-16 sm:pt-20 pb-10">

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* Brand — Logo + description (5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="mb-6">
                <Image src="/pdh_logo_1.png" alt="Pavilion Damansara Heights" width={220} height={70} className="object-contain h-16 sm:h-[72px] w-auto brightness-[1.15]" />
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#C49A38] to-transparent mb-5" />
              <p className="text-[13px] font-sans font-light text-white/50 leading-relaxed max-w-sm mb-8">
                1,314 luxury freehold residences across 3 premium towers atop the 1 million sq.ft. Pavilion Lifestyle Mall, Damansara Heights.
              </p>
              {/* Social icons */}
              <div className="text-[9px] font-sans uppercase tracking-[0.35em] text-[#C49A38]/60 font-bold mb-3">Follow Us</div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="group w-12 h-12 rounded-xl border border-[#C49A38]/40 bg-[#C49A38]/10 flex items-center justify-center hover:border-[#C49A38] hover:bg-[#C49A38] hover:shadow-[0_0_25px_rgba(196,154,56,0.4)] hover:scale-110 transition-all duration-300"
                  >
                    <s.icon className="w-5 h-5 text-[#C49A38] group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links (3 cols) */}
            <div className="lg:col-span-3 flex flex-col lg:pl-8">
              <h4 className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#C49A38] font-bold mb-6">Navigation</h4>
              <ul className="flex flex-col gap-1">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group flex items-center gap-3 py-2.5 text-[14px] font-sans font-light text-white/50 hover:text-[#C49A38] transition-all duration-300">
                      <div className="w-1 h-1 rounded-full bg-[#C49A38]/40 group-hover:bg-[#C49A38] group-hover:shadow-[0_0_6px_rgba(196,154,56,0.6)] transition-all" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact (4 cols) */}
            <div className="lg:col-span-4 flex flex-col lg:pl-8">
              <h4 className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#C49A38] font-bold mb-6">Contact</h4>
              <div className="flex flex-col gap-4">
                <a href="tel:+601115223700" className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[#C49A38]/50 group-hover:bg-[#C49A38]/10 transition-all">
                    <Phone className="w-4 h-4 text-[#C49A38]" />
                  </div>
                  <div>
                    <div className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#C49A38]/70 font-semibold mb-0.5">Sales Line</div>
                    <div className="text-[15px] font-sans font-semibold text-white/80 group-hover:text-[#C49A38] transition-colors">+6011-1522 3700</div>
                  </div>
                </a>
                <a href="https://api.whatsapp.com/send?phone=601115223700" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[#C49A38]/50 group-hover:bg-[#C49A38]/10 transition-all">
                    <WhatsAppIcon className="w-4 h-4 text-[#C49A38]" />
                  </div>
                  <div>
                    <div className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#C49A38]/70 font-semibold mb-0.5">WhatsApp</div>
                    <div className="text-[15px] font-sans font-semibold text-white/80 group-hover:text-[#C49A38] transition-colors">+6011 2880 8088</div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#C49A38]/60" />
                  </div>
                  <p className="text-[13px] font-sans font-light text-white/40 leading-relaxed mt-1.5">
                    Jalan Damansara, Damansara Heights,<br />50490 Kuala Lumpur
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-14 mb-6" />

          {/* Copyright */}
          <div className="text-center">
            <span className="text-[10px] font-sans font-light text-white/25 tracking-wider">
              © {new Date().getFullYear()} Pavilion Damansara Heights
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
