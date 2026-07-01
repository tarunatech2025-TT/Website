'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// AccomplishmentsSection
// Two-column layout matching the original Taruna Technology website:
//   LEFT  — logo icon, yellow label, bold white heading
//   RIGHT — three hexagon stat cards in a staggered arrangement
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  {
    value:    '+4.9',
    sup:      '★',
    label:    'Customer Satisfaction',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #fb923c 100%)',
    glow:     'rgba(236,72,153,0.45)',
    delay:    0.15,
  },
  {
    value:    '+4.9k',
    sup:      '',
    label:    'Active Our Members',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #6d28d9 100%)',
    glow:     'rgba(139,92,246,0.45)',
    delay:    0.28,
  },
  {
    value:    '+30%',
    sup:      '',
    label:    'Same Day Resolution',
    gradient: 'linear-gradient(135deg, #9333ea 0%, #ec4899 55%, #a855f7 100%)',
    glow:     'rgba(168,85,247,0.45)',
    delay:    0.41,
  },
];

// ── Shared globe internals — used by both desktop and mobile/tablet instances ─
function GlobeInner({ size = 480 }) {
  return (
    <>
      {/* Radial purple glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-15%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.48) 0%, rgba(88,28,135,0.20) 40%, transparent 68%)',
          filter: 'blur(38px)',
          borderRadius: '50%',
        }}
      />
      {/*
        Globe SVG. viewBox always 420×420; size prop scales the rendered output.
        Desktop: 480px  |  Tablet/mobile: 400px (≈ 17% smaller)
      */}
      <svg
        viewBox="0 0 420 420"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="accom-globe-svg"
        style={{ animation: 'accom-globe-spin 28s linear infinite', display: 'block', filter: 'blur(0.4px)' }}
      >
        {/* ── Outer sphere circle ── */}
        <circle cx="210" cy="210" r="200" stroke="rgba(168,85,247,1)"   strokeWidth="0.9" />

        {/* ── Longitude ellipses (vertical) ── */}
        <ellipse cx="210" cy="210" rx="50"  ry="200" stroke="rgba(168,85,247,1)"   strokeWidth="0.65" />
        <ellipse cx="210" cy="210" rx="100" ry="200" stroke="rgba(56,189,248,0.9)"  strokeWidth="0.55" />
        <ellipse cx="210" cy="210" rx="150" ry="200" stroke="rgba(168,85,247,0.85)" strokeWidth="0.5"  />
        <ellipse cx="210" cy="210" rx="185" ry="200" stroke="rgba(56,189,248,0.7)"  strokeWidth="0.4"  />

        {/* ── Latitude ellipses (horizontal) ── */}
        <ellipse cx="210" cy="210" rx="200" ry="50"  stroke="rgba(56,189,248,1)"   strokeWidth="0.65" />
        <ellipse cx="210" cy="210" rx="200" ry="100" stroke="rgba(168,85,247,0.9)" strokeWidth="0.55" />
        <ellipse cx="210" cy="210" rx="200" ry="150" stroke="rgba(56,189,248,0.85)" strokeWidth="0.5" />
        <ellipse cx="210" cy="210" rx="200" ry="185" stroke="rgba(168,85,247,0.7)" strokeWidth="0.4"  />

        {/* ── Equator + prime meridian ── */}
        <line x1="10"  y1="210" x2="410" y2="210" stroke="rgba(56,189,248,0.9)"  strokeWidth="0.7" />
        <line x1="210" y1="10"  x2="210" y2="410" stroke="rgba(168,85,247,0.9)" strokeWidth="0.7" />

        {/* ── Extra diagonal grid lines for depth ── */}
        <line x1="60"  y1="60"  x2="360" y2="360" stroke="rgba(139,92,246,0.35)" strokeWidth="0.35" />
        <line x1="360" y1="60"  x2="60"  y2="360" stroke="rgba(139,92,246,0.35)" strokeWidth="0.35" />

        {/* ── Network nodes ── */}
        {[
          { cx: 210, cy: 10  },
          { cx: 210, cy: 410 },
          { cx: 10,  cy: 210 },
          { cx: 410, cy: 210 },
          { cx: 120, cy: 100 },
          { cx: 300, cy: 100 },
          { cx: 100, cy: 310 },
          { cx: 320, cy: 320 },
          { cx: 260, cy: 150 },
          { cx: 150, cy: 270 },
        ].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.cx} cy={pt.cy} r="5" fill="none"
              stroke={i % 2 === 0 ? 'rgba(56,189,248,0.7)' : 'rgba(168,85,247,0.7)'}
              strokeWidth="0.6" />
            <circle cx={pt.cx} cy={pt.cy} r="2.2"
              fill={i % 2 === 0 ? 'rgba(56,189,248,0.95)' : 'rgba(168,85,247,0.95)'} />
          </g>
        ))}

        {/* ── Network connection lines ── */}
        <line x1="260" y1="150" x2="300" y2="100" stroke="rgba(56,189,248,0.45)"  strokeWidth="0.5" strokeDasharray="3 4" />
        <line x1="150" y1="270" x2="100" y2="310" stroke="rgba(168,85,247,0.45)" strokeWidth="0.5" strokeDasharray="3 4" />
        <line x1="120" y1="100" x2="150" y2="270" stroke="rgba(139,92,246,0.30)" strokeWidth="0.4" strokeDasharray="4 5" />
        <line x1="300" y1="100" x2="320" y2="320" stroke="rgba(56,189,248,0.30)"  strokeWidth="0.4" strokeDasharray="4 5" />
        <line x1="260" y1="150" x2="210" y2="10"  stroke="rgba(168,85,247,0.28)" strokeWidth="0.35" strokeDasharray="3 6" />
      </svg>
    </>
  );
}


// Standard hexagon: 6 points, pointy-top variant rotated 90° = flat-top
const HEX_CLIP = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';

function HexCard({ stat, index, mobileStack = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
      // Desktop stagger: card 1 up, cards 0&2 down — suppressed on mobile stack
      className={`flex flex-col items-center ${
        mobileStack ? '' : index === 1 ? 'lg:-mt-4' : 'lg:mt-4'
      }`}
    >
      {/* Float animation wrapper */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + index * 0.7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.5,
        }}
        className="relative"
        style={{ width: '164px', height: '148px' }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${stat.glow} 0%, transparent 68%)`,
            filter: 'blur(22px)',
            transform: 'scale(1.35)',
          }}
          aria-hidden="true"
        />

        {/* Hexagon shell — gradient background */}
        <div
          className="absolute inset-0"
          style={{
            clipPath:   HEX_CLIP,
            background: stat.gradient,
          }}
          aria-hidden="true"
        />

        {/* Inner slightly-darker hexagon for depth */}
        <div
          className="absolute"
          style={{
            inset:      '3px',
            clipPath:   HEX_CLIP,
            background: 'rgba(0,0,0,0.18)',
          }}
          aria-hidden="true"
        />

        {/* Top-left sheen */}
        <div
          className="absolute"
          style={{
            inset:      '3px',
            clipPath:   HEX_CLIP,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.18) 0%, transparent 45%)',
          }}
          aria-hidden="true"
        />

        {/* Text content centred inside hex */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1"
          style={{ clipPath: HEX_CLIP }}
        >
          <span
            className="font-black text-white leading-none"
            style={{ fontSize: '28px', letterSpacing: '-0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
          >
            {stat.value}
            {stat.sup && (
              <sup style={{ fontSize: '16px', verticalAlign: 'super', marginLeft: '1px' }}>
                {stat.sup}
              </sup>
            )}
          </span>
          <span
            className="text-white/90 font-semibold text-center leading-tight px-4"
            style={{ fontSize: '10.5px', maxWidth: '110px' }}
          >
            {stat.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AccomplishmentsSection() {
  return (
    /*
      overflow-hidden is intentional — it strictly contains the globe and all
      background glows inside this section so nothing bleeds into adjacent sections.
      The section padding (8rem) is sized to give the 480px globe room to breathe
      on every side without ever touching the top or bottom boundary.
    */
    <section className="relative bg-[#080818] overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>

      {/* ── Background glows (all contained by overflow-hidden on <section>) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Right-side purple bloom */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(109,40,217,0.06) 45%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Subtle left accent */}
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(88,28,135,0.08) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Centre accent beneath achievements area */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px]"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ── Digital globe watermark ───────────────────────────────────────────
          DESKTOP ONLY (hidden on lg and below via CSS class).
          On mobile/tablet a separate globe renders inside the cards column
          so it tracks the hexagons' centre naturally — see below.
          Key constraints:
          • Section padding = 8rem (~128px) top & bottom.
          • Globe wrapper = 480×480px — the SVG circle (r=200 in a 420 viewBox)
            maps to ~457px rendered, leaving ~11px margin each side inside the
            wrapper before the section boundary is reached.
          • Float animation = ±8px — total travel 16px, well within the padding.
          • overflow-hidden on the wrapper clips the blur halo so it cannot
            escape the wrapper bounds (and by extension the section).
          • translate(-50%, -50%) works correctly because width+height are set
            explicitly, so the anchor is the wrapper's true centre.
          • Shifted right ~80px to sit behind the hexagon cards.
      ── */}
      <div
        className="hidden lg:block absolute pointer-events-none select-none overflow-hidden accom-globe-wrap"
        style={{
          width: '480px',
          height: '480px',
          top: '50%',
          left: 'calc(50% + 80px)',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          opacity: 0.13,
          borderRadius: '50%',
          animation: 'accom-globe-float 9s ease-in-out infinite',
        }}
        aria-hidden="true"
      >
        <GlobeInner />
      </div>

      {/* ── Scoped keyframes ── */}
      <style>{`
        @keyframes accom-globe-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes accom-globe-float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px);  }
          50%       { transform: translate(-50%, -50%) translateY(-8px); }
        }
        /* Disable globe spin on mobile — saves a compositor layer */
        @media (max-width: 767px) {
          .accom-globe-svg { animation: none !important; }
          .accom-globe-wrap { animation: none !important; }
        }
      `}</style>

      <div className="relative site-container" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ════════════════════════════════════════════════════════
              LEFT COLUMN — logo + label + heading
              Pulled up ~100px via negative top margin so it aligns
              with the visual centre of the hexagon cards.
          ════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7 lg:-mt-[100px]"
          >
            {/* Logo icon */}
            <div className="relative w-16 h-16">
              <Image
                src="/logo1.png"
                alt="Taruna Technology"
                fill
                sizes="64px"
                className="object-contain"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.55))',
                }}
              />
            </div>

            {/* Yellow section label */}
            <p
              className="text-xs font-bold uppercase tracking-[0.28em]"
              style={{ color: '#FFD54A' }}
            >
              WHAT WE&apos;VE ACCOMPLISHED
            </p>

            {/* Bold white heading */}
            <h2 className="text-3xl sm:text-4xl xl:text-[2.6rem] font-black text-white leading-[1.12] tracking-tight">
              We pride ourselves on
              <br />
              our excellent support
              <br />
              and service
            </h2>

            {/* Subtle rule beneath heading */}
            <div
              className="w-16 h-[3px] rounded-full"
              style={{
                background: 'linear-gradient(to right, #a855f7, #ec4899)',
              }}
            />
          </motion.div>

          {/* ════════════════════════════════════════════════════════
              RIGHT COLUMN — three hexagon stat cards
              Desktop (lg+) : single row, three across
              Tablet (md)   : 2-up top row + 1 centred below
              Mobile        : single column, each card centred

              The wrapping div is position:relative on mobile/tablet so
              the globe can be absolutely centred inside it, directly
              behind the cards. On desktop (lg+) this wrapper has no
              special positioning — the section-level globe takes over.
          ════════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-center lg:justify-end">

            {/* ── Mobile: vertical stack ── */}
            {/* relative + inline-block so the absolute globe sizes to the cards */}
            <div className="relative flex flex-col items-center gap-8 md:hidden">
              {/* Globe centred behind the mobile stack — hidden on lg+ */}
              <div
                className="lg:hidden absolute pointer-events-none select-none overflow-hidden accom-globe-wrap"
                style={{
                  width: '400px',
                  height: '400px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                  opacity: 0.13,
                  borderRadius: '50%',
                  animation: 'accom-globe-float 9s ease-in-out infinite',
                }}
                aria-hidden="true"
              >
                <GlobeInner size={400} />
              </div>
              {STATS.map((stat, i) => (
                <HexCard key={stat.label} stat={stat} index={i} mobileStack />
              ))}
            </div>

            {/* ── Tablet: 2 + 1 ── */}
            <div className="hidden md:flex lg:hidden relative flex-col items-center gap-8">
              {/* Globe centred behind the tablet card group */}
              <div
                className="absolute pointer-events-none select-none overflow-hidden accom-globe-wrap"
                style={{
                  width: '420px',
                  height: '420px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                  opacity: 0.13,
                  borderRadius: '50%',
                  animation: 'accom-globe-float 9s ease-in-out infinite',
                }}
                aria-hidden="true"
              >
                <GlobeInner size={420} />
              </div>
              {/* Row 1 — first two cards */}
              <div className="flex flex-row items-center gap-8">
                {STATS.slice(0, 2).map((stat, i) => (
                  <HexCard key={stat.label} stat={stat} index={i} />
                ))}
              </div>
              {/* Row 2 — third card centred */}
              <div className="flex justify-center">
                <HexCard stat={STATS[2]} index={2} />
              </div>
            </div>

            {/* ── Desktop: original single row (globe handled at section level) ── */}
            <div className="hidden lg:flex flex-row items-center gap-6 xl:gap-8">
              {STATS.map((stat, i) => (
                <HexCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
