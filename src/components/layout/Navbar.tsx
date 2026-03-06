"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

/* WhatsApp SVG Icon */
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Location", href: "#location" },
  { label: "Facilities", href: "#facilities" },
  { label: "Units", href: "#units" },
  { label: "Concierge", href: "#concierge" },
  { label: "Gallery", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    let ticking = false;

    const updateActiveSection = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      // Handle scroll state
      setScrolled(scrollY > 50);

      // If at the very bottom, activate the last section
      if (scrollY + windowHeight >= docHeight - 80) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Pick the LAST section whose top has scrolled past the trigger point
      // This ensures the active section stays correct through the entire section height
      const triggerY = windowHeight * 0.35;
      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        // If this section's top is at or above the trigger, it's the current one
        if (top <= triggerY) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveSection(); // Set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pt-4 sm:pt-6`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8">
          <div className={`relative mx-auto transition-all duration-700 flex items-center justify-between px-0 sm:px-2 w-full ${scrolled ? "h-14 sm:h-16" : "h-14 sm:h-20"}`} >
            {/* Logo (Left) */}
            <div className="flex flex-1 justify-start">
              <Link href="#hero" className="flex items-center group relative z-50 transition-all duration-500 hover:scale-110 active:scale-95">
                {/* ── Logo Container (Transparent) ── */}
                <div className="relative w-40 sm:w-72 h-12 sm:h-24 flex flex-col justify-center items-center transition-all duration-700 px-0">
                  {/* Logo Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src="/pdh_logo_1.png"
                      alt="Pavilion Damansara Heights Logo"
                      fill
                      sizes="(max-width: 640px) 160px, 288px"
                      className="object-contain transition-all duration-700 group-hover:scale-105"
                      style={{
                        filter: scrolled
                          ? "drop-shadow(0.5px 0.5px 0 rgba(0,0,0,0.8)) drop-shadow(-0.5px -0.5px 0 rgba(0,0,0,0.8)) drop-shadow(0.5px -0.5px 0 rgba(0,0,0,0.8)) drop-shadow(-0.5px 0.5px 0 rgba(0,0,0,0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                          : "drop-shadow(0 1px 5px rgba(0,0,0,0.3))",
                      }}
                      priority
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Links (Center) */}
            <div className="hidden lg:flex justify-center shrink-0">
              <div className={`flex items-center gap-1 xl:gap-4 px-4 py-1.5 rounded-full transition-all duration-700 ${scrolled ? "bg-white/95 backdrop-blur-xl border border-black/90 shadow-[0_8px_32px_rgba(0,0,0,0.15)]" : "bg-transparent border border-transparent"}`}>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setActiveSection(link.href.replace("#", ""))}
                      className={`relative px-4 xl:px-6 py-2.5 text-[9.5px] xl:text-[11px] font-sans uppercase tracking-[0.25em] font-semibold transition-colors duration-500 rounded-full overflow-hidden group whitespace-nowrap flex items-center justify-center ${isActive ? "text-black" : (scrolled ? "text-[#555555] hover:text-black" : "text-white/70 hover:text-white")
                        }`}
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full z-0 bg-gradient-to-r from-[#C49A38] to-[#E3C275] shadow-[0_0_15px_rgba(196,154,56,0.5)]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {!isActive && (
                        <div className={`absolute inset-0 ${scrolled ? "bg-black/5" : "bg-[#C49A38]/15"} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* CTA + Mobile Toggle (Right) */}
            <div className="flex flex-1 justify-end items-center gap-4">
              <a
                href="https://api.whatsapp.com/send?phone=601115223700&text=Hi%2C+I+am+interested+in+Pavilion+Damansara+Heights"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex relative items-center justify-center px-6 py-2.5 group transition-all duration-500 overflow-hidden rounded-full bg-transparent border border-[#C49A38] hover:bg-[#C49A38] hover:shadow-[0_0_20px_rgba(196,154,56,0.4)] hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#C49A38]/40 to-transparent transform -skew-x-12 group-hover:animate-[shine-sweep_1.5s_ease-in-out_infinite]" />
                <span className="relative z-10 flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.2em] font-semibold text-[#C49A38] group-hover:text-black transition-colors duration-500">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Register Now</span>
                </span>
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all border ${scrolled ? "bg-white text-[#C49A38] border-white/30 hover:bg-white/90" : "bg-[#C49A38]/5 text-[#C49A38] border-[#C49A38]/15 backdrop-blur-md hover:bg-[#C49A38]/8"}`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] bg-white/98 backdrop-blur-3xl flex items-center justify-center"
          >
            <motion.div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 30 }}
                  className={`text-2xl sm:text-3xl font-heading font-medium tracking-wider hover:text-[#C49A38] transition-all duration-500 ${activeSection === link.href.replace("#", "") ? "text-[#C49A38] scale-105" : "text-[#666666]/80"
                    }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-8">
                <a
                  href="https://api.whatsapp.com/send?phone=601115223700&text=Hi%2C+I+am+interested+in+Pavilion+Damansara+Heights"
                  target="_blank"
                  className="btn-gold"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Register Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )
        }
      </AnimatePresence>
    </>
  );
}
