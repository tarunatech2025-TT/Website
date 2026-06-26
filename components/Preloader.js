'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fixed particle positions — no Math.random() to avoid hydration mismatch
// Desktop: 16 particles. Mobile: first 8 only (MOBILE_PARTICLE_COUNT).
const PARTICLES = [
  { x: 8,  y: 14, s: 1.4, o: 0.28, d: 2.8, c: 0 },
  { x: 88, y: 10, s: 1.0, o: 0.20, d: 3.4, c: 1 },
  { x: 20, y: 72, s: 1.6, o: 0.24, d: 2.2, c: 0 },
  { x: 76, y: 80, s: 1.2, o: 0.20, d: 3.8, c: 2 },
  { x: 54, y: 18, s: 1.0, o: 0.16, d: 4.2, c: 1 },
  { x: 36, y: 88, s: 1.4, o: 0.22, d: 2.6, c: 0 },
  { x: 92, y: 50, s: 1.2, o: 0.18, d: 3.1, c: 2 },
  { x: 6,  y: 56, s: 1.6, o: 0.20, d: 2.9, c: 1 },
  // Desktop-only particles below
  { x: 64, y: 44, s: 1.0, o: 0.14, d: 4.5, c: 0 },
  { x: 46, y: 6,  s: 1.4, o: 0.22, d: 3.3, c: 2 },
  { x: 16, y: 38, s: 1.2, o: 0.18, d: 2.7, c: 1 },
  { x: 82, y: 26, s: 1.0, o: 0.16, d: 3.9, c: 0 },
  { x: 30, y: 52, s: 0.8, o: 0.14, d: 5.0, c: 2 },
  { x: 70, y: 64, s: 1.2, o: 0.18, d: 3.6, c: 1 },
  { x: 50, y: 90, s: 0.8, o: 0.16, d: 4.8, c: 0 },
  { x: 14, y: 28, s: 1.0, o: 0.14, d: 4.0, c: 2 },
];
// Only render 8 particles on mobile to halve Framer Motion animate instances
const MOBILE_PARTICLE_COUNT = 8;

const COLORS = [
  'rgba(168,85,247,0.85)',
  'rgba(236,72,153,0.80)',
  'rgba(99,102,241,0.70)',
];

const DEFAULT_TAGLINE = 'INSPIRING THE INTELLIGENCE';

export default function Preloader({ subtitle = 'Preparing Your Digital Experience...', duration = 3200 }) {
  const [visible, setVisible]         = useState(true);
  const [pulseActive, setPulseActive] = useState(false);
  const [isMobile, setIsMobile]       = useState(false);
  const [mounted, setMounted]         = useState(false);

  const TAGLINE = subtitle.split('');

  useEffect(() => {
    setMounted(true);
    // Detect mobile once — avoids window reads during SSR
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // Adjust pulse timing based on duration
    const pulseDelay = duration > 2000 ? 2400 : duration * 0.6;
    const hideDelay = duration - 200; // Slightly before actual hide for smooth transition
    
    const pulse = setTimeout(() => setPulseActive(true), pulseDelay);
    const hide  = setTimeout(() => setVisible(false), hideDelay);
    return () => { clearTimeout(pulse); clearTimeout(hide); };
  }, [duration]);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  const particles = isMobile ? PARTICLES.slice(0, MOBILE_PARTICLE_COUNT) : PARTICLES;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#050816',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            willChange: 'opacity',
          }}
          aria-hidden="true"
        >

          {/* ── Dot grid ── */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(168,85,247,0.18) 1px, transparent 1px)',
            backgroundSize: '30px 30px', opacity: 0.55,
          }} />

          {/* ── Aurora glows — static, GPU-isolated ──
              filter: blur() removed on mobile — expensive on low-end GPUs.
              Replaced with non-blurred radial gradients that look similar.
          ── */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '800px', height: '560px', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(139,92,246,0.16) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)',
              // Only apply blur on non-mobile to avoid GPU compositing cost
              filter: isMobile ? 'none' : 'blur(70px)',
            }} />
            {!isMobile && (
              <>
                <div style={{
                  position: 'absolute', top: '20%', right: '10%',
                  width: '360px', height: '280px', borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(236,72,153,0.09) 0%, transparent 70%)',
                  filter: 'blur(55px)',
                }} />
                <div style={{
                  position: 'absolute', bottom: '20%', left: '10%',
                  width: '320px', height: '260px', borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                }} />
              </>
            )}
          </div>

          {/* ── Floating particles — reduced count on mobile ── */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {particles.map((p, i) => (
              <motion.div key={i}
                style={{
                  position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
                  width: p.s * 2, height: p.s * 2, borderRadius: '50%',
                  background: COLORS[p.c], willChange: 'opacity',
                }}
                animate={{ opacity: [p.o, p.o * 2.6, p.o] }}
                transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.13 }}
              />
            ))}
          </div>

          {/* ── Logo area ── */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* ── Rotating neon rings ──────────────────────────────────────
                Both desktop and mobile render both rings.
                Mobile optimisations vs desktop:
                  • Outer ring: 220px → 190px
                  • Inner ring: 180px → 156px
                  • Outer rotation: 8s → 14s  (slower = fewer GPU composites/s)
                  • Inner rotation: 12s → 20s
                  • No SVG filter / feGaussianBlur — pure border CSS only
                  • willChange:'transform' keeps each ring on its own GPU layer
                    so rotation never triggers a repaint on the rest of the screen
                  • Both rings live inside AnimatePresence {visible && ...} so
                    they are fully unmounted (not just hidden) when the
                    preloader closes — no rogue RAF continues after fade-out
            ── */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: isMobile ? 14 : 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                width:  isMobile ? '190px' : '220px',
                height: isMobile ? '190px' : '220px',
                borderRadius: '50%',
                border: '1px solid transparent',
                borderTopColor:   'rgba(168,85,247,0.55)',
                borderRightColor: 'rgba(236,72,153,0.30)',
                // No filter/blur — pure transform only
                willChange: 'transform',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: isMobile ? 20 : 12,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                width:  isMobile ? '156px' : '180px',
                height: isMobile ? '156px' : '180px',
                borderRadius: '50%',
                border: '1px solid transparent',
                borderTopColor:  'rgba(236,72,153,0.40)',
                borderLeftColor: 'rgba(139,92,246,0.25)',
                willChange: 'transform',
              }}
            />

            {/* Radial glow behind logo.
                On mobile: simplified — no blur filter, reduced animation range */}
            <motion.div
              animate={pulseActive
                ? { opacity: [0.55, 1.0, 0.25], scale: [1, 1.45, 0.90] }
                : { opacity: [0.35, 0.75, 0.35], scale: isMobile ? [1, 1.03, 1] : [1, 1.08, 1] }
              }
              transition={pulseActive
                ? { duration: 0.60, ease: 'easeOut' }
                : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
              }
              style={{
                position: 'absolute',
                width: '300px', height: '160px', borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(168,85,247,0.48) 0%, rgba(236,72,153,0.22) 45%, transparent 70%)',
                // filter:blur is the most expensive CSS property on mobile —
                // removed entirely here since the radial gradient already softens
                filter: isMobile ? 'none' : 'blur(26px)',
                willChange: 'opacity, transform',
              }}
            />

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <img
                src="/logo.png"
                alt="Taruna Technology"
                className="w-[210px] h-auto object-contain drop-shadow-[0_0_14px_rgba(232,121,249,0.45)] md:drop-shadow-[0_0_22px_rgba(232,121,249,0.52)]"
              />
            </motion.div>
          </div>

          {/* ── Tagline — character-by-character ── */}
          <div style={{
            display: 'flex', marginTop: '34px',
            flexWrap: 'wrap', justifyContent: 'center', maxWidth: '420px',
          }}>
            {TAGLINE.map((ch, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: 0.70 + i * 0.030, ease: 'easeOut' }}
                style={{
                  fontSize: '11px', fontWeight: 500,
                  letterSpacing: ch === ' ' ? '0.18em' : '0.26em',
                  textTransform: 'uppercase',
                  color: 'rgba(218,208,255,0.72)',
                  // text-shadow removed on mobile — triggers repaint per character
                  textShadow: isMobile ? 'none' : '0 0 16px rgba(168,85,247,0.42)',
                  userSelect: 'none', willChange: 'opacity, transform',
                }}
              >
                {ch === ' ' ? '\u00A0\u00A0' : ch}
              </motion.span>
            ))}
          </div>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.85 }}
            style={{
              marginTop: '26px', position: 'relative',
              width: '200px', height: '2px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.95, delay: 0.90, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '100%', borderRadius: '2px',
                background: 'linear-gradient(to right, #A855F7, #EC4899, #6366F1)',
                // box-shadow on animated element causes repaint on every frame —
                // removed on mobile, kept on desktop for visual quality
                boxShadow: isMobile
                  ? 'none'
                  : '0 0 10px rgba(168,85,247,0.70), 0 0 4px rgba(236,72,153,0.55)',
                willChange: 'width',
              }}
            />
            {/* Shimmer sweep — desktop only */}
            {!isMobile && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '300%' }}
                transition={{ duration: 1.95, delay: 0.90, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.38) 50%, transparent 100%)',
                  willChange: 'transform',
                }}
              />
            )}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
