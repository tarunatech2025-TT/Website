'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Shield } from 'lucide-react';
import { TrustBadgeDesktop } from '@/components/home/TrustBadge';

// ─────────────────────────────────────────────────────────────────────────────
// Easing Curve for Enterprise Masked Line Reveal (Stripe/Linear style)
// ─────────────────────────────────────────────────────────────────────────────
const MASK_EASING = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// Main HeroSection — Preloader-Synchronized Line-by-Line Staggered Animation
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [startAnim, setStartAnim] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Synchronize animation start with homepage preloader fade-out (3.1s)
    const timer = setTimeout(() => {
      setStartAnim(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure smooth autoplay without blocking
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy handled silently
      });
    }

    // Pause video when scrolled out of viewport to free GPU resources
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative" style={{ zIndex: 2 }}>
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#04040f]">

      {/* LAYER 1 — VIDEO (Optimized GPU Video Surface) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          opacity: 0.90,
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <source src="/hero-premium.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY LAYER — High-Visibility Soft Composite Shading */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(circle at 50% 50%, rgba(4,4,15,0.32) 0%, rgba(4,4,15,0.60) 65%, rgba(4,4,15,0.82) 100%), ' +
            'linear-gradient(to bottom, rgba(4,4,15,0.30) 0%, transparent 35%, transparent 65%, rgba(4,4,15,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* LAYER 3 — CENTRALIZED CONTENT (Synchronized Staggered Entry Animation) */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
        <div className="site-container pt-8 pb-16 lg:pt-12 lg:pb-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">

            {/* LINE 1 — EYEBROW SUBTITLE */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.6, delay: 0.05, ease: MASK_EASING }}
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-purple-300/90 mb-6 font-mono"
            >
              ENTERPRISE SOFTWARE MADE EASY
            </motion.div>

            {/* LINE 2, 3, 4 — ULTRA-BOLD HEADLINE (DIRECT MASKED LINE REVEAL) */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight mb-8">
              <span className="block overflow-hidden py-1">
                <motion.span
                  initial={{ opacity: 0, y: 55 }}
                  animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 55 }}
                  transition={{ duration: 0.85, delay: 0.18, ease: MASK_EASING }}
                  className="block text-white"
                >
                  Next-generation
                </motion.span>
              </span>

              <span className="block overflow-hidden py-1">
                <motion.span
                  initial={{ opacity: 0, y: 55 }}
                  animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 55 }}
                  transition={{ duration: 0.85, delay: 0.32, ease: MASK_EASING }}
                  className="block text-white"
                >
                  Custom ERP & Software
                </motion.span>
              </span>

              <span className="block overflow-hidden py-1">
                <motion.span
                  initial={{ opacity: 0, y: 55 }}
                  animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 55 }}
                  transition={{ duration: 0.85, delay: 0.46, ease: MASK_EASING }}
                  className="block text-gradient py-1"
                >
                  For Global Enterprises
                </motion.span>
              </span>
            </h1>

            {/* LINE 5 — PARAGRAPH WITH HIGHLIGHT PILLS */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.60, ease: MASK_EASING }}
              className="text-gray-300 text-base sm:text-xl lg:text-2xl leading-relaxed mb-10 max-w-3xl text-center font-normal"
            >
              Taruna Technology helps businesses{' '}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={startAnim ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.72 }}
                className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold inline-block my-0.5 shadow-sm shadow-emerald-950/30"
              >
                build faster
              </motion.span>{' '}
              and{' '}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={startAnim ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.78 }}
                className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold inline-block my-0.5 shadow-sm shadow-purple-950/30"
              >
                scale effortlessly
              </motion.span>{' '}
              with custom ERPs, mobile apps, and intelligent AI software.
            </motion.p>

            {/* LINE 6 — CTA BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.7, delay: 0.88, ease: MASK_EASING }}
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-emerald-400 text-slate-950 font-extrabold rounded-xl hover:bg-emerald-300 transition-all duration-200 shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5 text-sm sm:text-base overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Get Free Consultation
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </span>
              </Link>
            </motion.div>

            {/* LINE 7 — FEATURE HIGHLIGHTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.00 }}
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-4 border-t border-white/10 w-full max-w-xl"
            >
              {[
                { icon: Zap,    color: 'text-purple-400', label: '15+ Years Experience' },
                { icon: Globe,  color: 'text-pink-400',   label: '35+ Countries Served' },
                { icon: Shield, color: 'text-blue-400',   label: '99.8% Client Satisfaction' },
              ].map(({ icon: Icon, color, label }, i) => (
                <span key={label} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-medium">
                  {i > 0 && <span className="hidden sm:inline-block w-px h-3.5 bg-white/15 -ml-3 mr-3" />}
                  <Icon size={14} className={color} />
                  {label}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Seamless Bottom Section Blend (Mixes Hero into ServicesSection smoothly) */}
      <div
        className="absolute bottom-0 inset-x-0 h-44 pointer-events-none"
        style={{
          zIndex: 12,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,24,0.4) 40%, rgba(8,8,24,0.85) 75%, #080818 100%)',
        }}
        aria-hidden="true"
      />

    </section>

    {/* Desktop badge */}
    <TrustBadgeDesktop />

    </div>
  );
}
