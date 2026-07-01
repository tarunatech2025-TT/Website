'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, Zap, Globe, Shield,
  Code2, Smartphone, LayoutGrid, TrendingUp, Server, Brain,
} from 'lucide-react';
import { TrustBadgeDesktop } from '@/components/home/TrustBadge';

// ── Mobile badge SVG — inline component, fully self-contained ────────────────
// Rendered inside the left column in normal document flow.
// No absolute positioning, no negative margins — section overflow:hidden
// keeps it cleanly contained. Desktop hides it via the parent's lg:hidden.
const MOBILE_BADGE_STYLES = `
  @keyframes tbm-rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .tbm-spin { transform-origin: 100px 100px; animation: tbm-rotate 30s linear infinite; }
  .tbm-size { width: 130px; height: 130px; }
  @media (min-width: 640px) and (max-width: 1023px) {
    .tbm-size { width: 150px; height: 150px; }
  }
`;
const MOBILE_RING_TEXT = 'DECADES OF HANDS-ON EXPERTISE. DECADES OF HANDS-ON EXPERTISE. ';
const MOBILE_PATH_D    = 'M 100 18 A 82 82 0 1 1 99.999 18';

function TrustBadgeMobileInline() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MOBILE_BADGE_STYLES }} />
      <div
        className="tbm-size"
        style={{
          borderRadius: '50%',
          flexShrink: 0,
          boxShadow:
            '0 0 36px rgba(246,232,55,0.35), ' +
            '0 0 70px rgba(246,232,55,0.12), ' +
            '0 12px 36px rgba(0,0,0,0.50)',
        }}
      >
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="99.5" fill="#F6E837" />
          <circle cx="100" cy="100" r="98"   fill="none" stroke="#1A1A2A" strokeWidth="2" />
          <defs><path id="tbm-path" d={MOBILE_PATH_D} /></defs>
          <g className="tbm-spin">
            <text fill="#1A1A2A" fontSize="13" fontWeight="700" letterSpacing="0.07"
              fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif" textRendering="geometricPrecision">
              <textPath href="#tbm-path" startOffset="0%">{MOBILE_RING_TEXT}</textPath>
            </text>
          </g>
          <image href="/logo1.png" x="54" y="54" width="92" height="92" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating glassmorphism service badge — unchanged
// ─────────────────────────────────────────────────────────────────────────────
function FloatingBadge({ icon: Icon, label, color, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className={`absolute flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-semibold text-white shadow-lg ${color} ${className}`}
    >
      <Icon size={13} className="flex-shrink-0 opacity-90" />
      {label}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main HeroSection — video-first background, all content preserved
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    // Outer wrapper is the absolute positioning context for TrustBadgeDesktop.
    // zIndex:2 ensures the desktop badge stacks above ServicesSection.
    // Mobile badge lives inside the <section> in normal flow — no offset needed.
    <div className="relative" style={{ zIndex: 2 }}>
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#04040f]">

      {/* ══════════════════════════════════════════════════════════════
          LAYER 1 — PREMIUM FUTURISTIC TECH VIDEO (locally served)
          hero-premium.mp4   = Pexels 5223113
            "A Futuristic Screen with Blue Background" — sleek digital
            interface, blue holographic display, premium tech aesthetic.
          hero-premium-2.mp4 = Pexels 11041433
            "3D Animation of Circuit Board" — cinematic circuit board,
            glowing pathways, enterprise technology infrastructure.
          Both confirmed HTTP 200 OK, downloaded to /public.
          Zero nature / ocean / server cables / globe animations.
      ══════════════════════════════════════════════════════════════ */}
      {/* ── VIDEO: GPU-isolated layer ──
          - filter removed from video element (moved to overlay instead)
          - will-change + translateZ force GPU compositing layer
          - prevents video frames from triggering overlay repaints
      ── */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          opacity: 0.72,
          zIndex: 0,
          // Promote video to its own GPU layer — decouples it from overlay compositing
          transform: 'translateZ(0)',
          willChange: 'transform',
          // Filter moved OFF the video — applied via overlay tint instead
        }}
        aria-hidden="true"
      >
        <source src="/hero-premium.mp4"   type="video/mp4" />
      </video>

      {/* ── OVERLAY LAYER: all visual effects isolated here ──
          - mixBlendMode removed (replaced with equivalent gradient tint)
          - blur radii reduced to avoid expensive large-radius repaints
          - SVG globe uses CSS transform for GPU-accelerated spin
          - light sweep removed (was triggering continuous repaints)
          - all divs are pointer-events-none, no interaction cost
      ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">

        {/* Colour grade — lighter tint, preserves video detail */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(76,29,149,0.28) 0%, rgba(30,27,75,0.12) 50%, rgba(8,30,63,0.22) 100%)' }} />

        {/* Brightness/saturation compensation */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.05) 0%, rgba(34,211,238,0.02) 100%)' }} />

        {/* Left text readability ramp */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(4,4,15,0.88) 0%, rgba(4,4,15,0.65) 35%, rgba(4,4,15,0.20) 60%, transparent 100%)' }} />

        {/* Mobile right-side fade */}
        <div className="absolute inset-0 sm:hidden"
          style={{ background: 'linear-gradient(to right, rgba(4,4,15,0.10) 0%, transparent 40%, rgba(4,4,15,0.05) 100%)' }} />

        {/* Top/bottom vignette */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(4,4,15,0.45) 0%, transparent 20%, transparent 70%, rgba(4,4,15,0.90) 100%)' }} />

        {/* Purple bloom — sharper, smaller blur */}
        <div className="absolute -top-10 -left-10 w-[320px] h-[280px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)',
            filter: 'blur(50px)',
            transform: 'translateZ(0)',
          }} />

        {/* Cyan accent — sharper */}
        <div className="absolute top-[8%] right-[-3%] w-[260px] h-[260px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 65%)',
            filter: 'blur(45px)',
            transform: 'translateZ(0)',
          }} />

        {/* Globe SVG — GPU layer via will-change:transform, spin via transform not CSS animation */}
        <svg
          className="absolute right-[2%] sm:right-[8%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] opacity-[0.14] sm:opacity-[0.10] animate-spin-slow"
          viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ willChange: 'transform' }}
          aria-hidden="true"
        >
          <circle cx="210" cy="210" r="200" stroke="rgba(168,85,247,1)" strokeWidth="1" />
          <ellipse cx="210" cy="210" rx="100" ry="200" stroke="rgba(168,85,247,1)" strokeWidth="0.8" />
          <ellipse cx="210" cy="210" rx="170" ry="200" stroke="rgba(168,85,247,1)" strokeWidth="0.6" />
          <ellipse cx="210" cy="210" rx="200" ry="90" stroke="rgba(168,85,247,1)" strokeWidth="0.8" />
          <ellipse cx="210" cy="210" rx="200" ry="150" stroke="rgba(168,85,247,1)" strokeWidth="0.6" />
          <line x1="10" y1="210" x2="410" y2="210" stroke="rgba(168,85,247,1)" strokeWidth="0.6" />
          <line x1="210" y1="10" x2="210" y2="410" stroke="rgba(168,85,247,1)" strokeWidth="0.6" />
        </svg>

      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3 — CONTENT (z-index above all background layers)
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
        <div className="site-container py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

            {/* ── LEFT — headline + CTAs ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-yellow-500/30 text-sm mb-9"
                style={{ color: '#FFD54A' }}
              >
                <Sparkles size={13} style={{ color: '#FFD54A' }} />
                <span>WELCOME TO TARUNA TECHNOLOGY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="text-3xl sm:text-4xl xl:text-5xl font-black leading-[1.04] tracking-tight mb-6"
              >
                <span className="text-white">Enhancing Business</span>
                <br />
                <span className="text-gradient">With Innovative</span>
                <br />
                <span className="text-white">Solutions Worldwide</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 max-w-xl"
              >
                Unlock the power of digital transformation with custom software, mobile apps, and web solutions. We deliver scalable, innovative technology that helps businesses across the globe grow faster.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/40 hover:shadow-purple-900/60 hover:-translate-y-0.5"
                >
                  CONTACT US
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 glass border border-white/12 text-white font-semibold rounded-xl hover:bg-white/6 hover:border-purple-500/40 transition-all duration-200"
                >
                  VIEW SERVICES
                </Link>
              </motion.div>

              {/* ── Mobile badge — inline, right-aligned, fully inside hero ──
                  lg:hidden keeps it off desktop entirely.
                  flex justify-end aligns it to the right.
                  No negative margins, no absolute positioning, no overlap.
                  Section overflow:hidden naturally contains it.
              ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden flex justify-end mb-8 pointer-events-none select-none"
                aria-hidden="true"
              >
                <TrustBadgeMobileInline />
              </motion.div>

              {/* Feature highlights — desktop only */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="hidden lg:flex flex-wrap items-center gap-5"
              >
                {[
                  { icon: Zap,    color: 'text-purple-400', label: 'Decades of Expertise' },
                  { icon: Globe,  color: 'text-pink-400',   label: '35+ Countries Served' },
                  { icon: Shield, color: 'text-blue-400',   label: 'Enterprise Grade' },
                ].map(({ icon: Icon, color, label }, i) => (
                  <span key={label} className="flex items-center gap-2 text-xs text-gray-400">
                    {i > 0 && <span className="w-px h-3 bg-white/10" />}
                    <Icon size={12} className={color} />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT — floating service badges over video (unchanged) ── */}
            <div className="hidden lg:block relative h-[540px]">

              <FloatingBadge
                icon={Code2} label="Custom Software"
                color="bg-purple-500/15 border-purple-500/35"
                className="top-6 left-2"
                delay={0.55}
              />
              <FloatingBadge
                icon={Brain} label="AI Solutions"
                color="bg-violet-500/15 border-violet-500/35"
                className="top-6 right-2"
                delay={0.65}
              />
              <FloatingBadge
                icon={Smartphone} label="Mobile Apps"
                color="bg-blue-500/15 border-blue-500/35"
                className="top-[38%] left-0"
                delay={0.75}
              />
              <FloatingBadge
                icon={LayoutGrid} label="ERP / CRM"
                color="bg-pink-500/15 border-pink-500/35"
                className="top-[38%] right-0"
                delay={0.70}
              />
              <FloatingBadge
                icon={TrendingUp} label="SEO Marketing"
                color="bg-orange-500/15 border-orange-500/35"
                className="bottom-20 left-2"
                delay={0.80}
              />
              <FloatingBadge
                icon={Server} label="Web Hosting"
                color="bg-cyan-500/15 border-cyan-500/35"
                className="bottom-20 right-2"
                delay={0.85}
              />

              {/* Live consultancy pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30 text-xs text-green-300 font-medium backdrop-blur-xl whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                IT Consultancy Available
                <Link href="/contact" className="text-pink-400 hover:text-pink-300 transition-colors ml-1 font-semibold">
                  Book Now →
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

    </section>

    {/* Desktop badge — absolute, straddles hero/services boundary on right side */}
    <TrustBadgeDesktop />

    </div>
  );
}
