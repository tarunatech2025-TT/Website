'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Responsive card dimensions injected as a <style> block so GSAP reads the
// correct scrollWidth at whatever breakpoint the component mounts at.
// Desktop: 240×178px  |  Mobile (<640px): 180×148px
const CARD_STYLES = `
  .partner-card { width: 240px; height: 178px; }
  .partner-logo-cap { max-width: 210px; max-height: 92px; }
  .partner-row-gap { gap: 24px; }
  .partner-edge-fade { width: 120px; }
  @media (max-width: 639px) {
    .partner-card { width: 180px; height: 148px; }
    .partner-logo-cap { max-width: 160px; max-height: 68px; }
    .partner-row-gap { gap: 14px; }
    .partner-edge-fade { width: 48px; }
  }
`;

// ── Partner data ─────────────────────────────────────────────────────────────
// logoH / logoW : adaptive per-logo sizing (50–60% of card visual area).
// darkLogo      : logo artwork is dark/black → gets frosted backdrop + brightness boost.
// All files live in /public/partrners/ (folder name has intentional typo).
const PARTNERS = [
  // ── Original partners ────────────────────────────────────────────────────
  { name: 'Artful Corner',            src: '/partrners/artfulcorner.png',       logoH: 92,  logoW: 210, darkLogo: true,  url: null },
  { name: 'Eventlok',                 src: '/partrners/eventlok.png',           logoH: 90,  logoW: 210, darkLogo: true,  url: null },
  { name: 'Gujarat Hazardwest',       src: '/partrners/Gujarat_hazardwest.png', logoH: 76,  logoW: 200, darkLogo: false, url: 'https://gujarathazardwestmanagementco.com/' },
  { name: 'Instacook',                src: '/partrners/Instacook.png',          logoH: 82,  logoW: 200, darkLogo: false, url: 'https://myinstacook.com/' },
  { name: 'Krisha Lights',            src: '/partrners/krishalights.png',       logoH: 86,  logoW: 200, darkLogo: true,  url: null },
  { name: 'Moonbyte',                 src: '/partrners/moonbtye.png',           logoH: 76,  logoW: 200, darkLogo: false, url: 'https://moonbyte.in/' },
  { name: 'Nasmah',                   src: '/partrners/Nasmah.jpg',             logoH: 78,  logoW: 190, darkLogo: false, url: 'https://www.nasmahbuilds.com/' },
  { name: 'Nimbus Investment',        src: '/partrners/Nimbus.png',             logoH: 92,  logoW: 210, darkLogo: false, url: null },
  { name: 'Omnitrix Technologies',    src: '/partrners/Omnitrix.png',           logoH: 76,  logoW: 200, darkLogo: false, url: 'https://www.omnitrixcoretechnologies.com/' },
  { name: 'Spark Surgical & Engg',    src: '/partrners/sparks.png',             logoH: 78,  logoW: 190, darkLogo: false, url: null },
  // ── New partners ─────────────────────────────────────────────────────────
  { name: 'The Techknow Automation',  src: '/partrners/Techknow.png',           logoH: 82,  logoW: 200, darkLogo: false, url: 'https://thetechknowautomation.com/' },
  { name: 'Moonlight Interior',       src: '/partrners/Moonlight.png',          logoH: 92,  logoW: 210, darkLogo: false, url: 'https://moonlightinterior.com/' },
  { name: 'Omada Group',              src: '/partrners/Omada.png',              logoH: 84,  logoW: 210, darkLogo: true,  url: 'https://www.omadagroup.in/' },
  { name: 'Furnisure',                src: '/partrners/Furnisure.png',          logoH: 80,  logoW: 200, darkLogo: false, url: 'https://furnisuremfg.com/' },
  { name: 'Bhakti Sales',             src: '/partrners/Bhakti.png',             logoH: 78,  logoW: 190, darkLogo: true,  url: 'https://www.bhaktisales.in/' },
  { name: 'Canary Enterprise',        src: '/partrners/canary.png',             logoH: 88,  logoW: 210, darkLogo: false, url: null },
  { name: 'Vasu Container',           src: '/partrners/Vasu.jpeg',              logoH: 92,  logoW: 210, darkLogo: false, url: 'https://vasucontainers.com/' },
  { name: 'Enviro Chem',              src: '/partrners/Enviro_chem.png',        logoH: 80,  logoW: 200, darkLogo: true,  url: 'https://envirochemwastesolutions.com/' },
  { name: 'Iscon Elevator',           src: '/partrners/Iscon elevators.png',    logoH: 82,  logoW: 200, darkLogo: false, url: 'https://isconelevators.com/' },
  { name: 'TejaskP AI Software',      src: '/partrners/Tejas kp.png',           logoH: 80,  logoW: 200, darkLogo: false, url: 'https://tejaskp-ai.vercel.app/' },
  { name: 'OPAL Clinic',              src: '/partrners/Opal.png',               logoH: 80,  logoW: 200, darkLogo: false, url: null },
];

// Triple the list so the marquee strip never shows a gap on any viewport
const LOOP_A = [...PARTNERS, ...PARTNERS, ...PARTNERS];
const LOOP_B = [...[...PARTNERS].reverse(), ...[...PARTNERS].reverse(), ...[...PARTNERS].reverse()];

// ── Single partner card ──────────────────────────────────────────────────────
function PartnerCard({ partner }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered]   = useState(false);

  // Prevent marquee drag from triggering a navigation click
  const dragRef   = useRef(false);
  const originRef = useRef(0);
  const onMouseDown = (e) => { dragRef.current = false; originRef.current = e.clientX; };
  const onMouseMove = (e) => { if (Math.abs(e.clientX - originRef.current) > 5) dragRef.current = true; };
  const onClickCapture = (e) => { if (dragRef.current) e.preventDefault(); };

  const cardStyle = {
    // width & height come from .partner-card CSS class (responsive via media query)
    borderRadius: '18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 16px 14px',
    background: hovered
      ? 'linear-gradient(145deg, #1e1240 0%, #2a1550 45%, #4b1168 100%)'
      : 'linear-gradient(145deg, #16102b 0%, #24123d 55%, rgba(75,17,104,0.25) 100%)',
    boxShadow: hovered
      ? [
          'inset 0 0 32px -6px rgba(139,92,246,0.35)',
          'inset 0 0 14px -4px rgba(236,72,153,0.18)',
          'inset 0 1px 0 rgba(255,255,255,0.10)',
          'inset 0 -1px 0 rgba(139,92,246,0.15)',
        ].join(', ')
      : 'inset 0 1px 0 rgba(255,255,255,0.06)',
    border: hovered
      ? '1px solid rgba(192,100,255,0.55)'
      : '1px solid rgba(139,92,246,0.28)',
    transform: hovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
    transition: [
      'transform 0.30s cubic-bezier(0.25,1,0.5,1)',
      'box-shadow 0.30s ease',
      'border-color 0.30s ease',
      'background 0.30s ease',
    ].join(', '),
    willChange: 'transform',
    textDecoration: 'none',
  };

  const sharedProps = {
    // partner-card supplies responsive width/height; flex-shrink-0 keeps marquee layout intact
    className: 'partner-card flex-shrink-0 select-none relative overflow-hidden cursor-pointer',
    style: cardStyle,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onMouseDown,
    onMouseMove,
    onClickCapture,
  };

  const inner = (
    <>
      {/* Glossy top-edge sheen */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '48%', borderRadius: '18px 18px 60% 60% / 18px 18px 40% 40%', background: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(200,150,255,0.03) 55%, transparent 100%)', pointerEvents: 'none' }} />

      {/* Ambient inner glow */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: '18px', background: hovered ? 'radial-gradient(ellipse at 50% 115%, rgba(236,72,153,0.16) 0%, rgba(139,92,246,0.13) 38%, transparent 68%)' : 'radial-gradient(ellipse at 50% 115%, rgba(139,92,246,0.07) 0%, rgba(109,40,217,0.04) 45%, transparent 68%)', transition: 'background 0.35s ease', pointerEvents: 'none' }} />

      {/* Top-right pink corner accent */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '-18px', right: '-18px', width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.11) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ── Logo area ── */}
      <div style={{ position: 'relative', width: '100%', flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, zIndex: 1 }}>
        {imgError ? (
          <div style={{ width: '60px', height: '60px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.30)', color: '#fff', fontWeight: 900, fontSize: '24px' }}>
            {partner.name.charAt(0)}
          </div>
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', ...(partner.darkLogo ? { padding: '7px 11px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' } : {}) }}>
            <Image
              src={partner.src}
              alt={`${partner.name} logo`}
              width={partner.logoW}
              height={partner.logoH}
              unoptimized
              onError={() => setImgError(true)}
              className="partner-logo-cap"
              style={{
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
                maxWidth: `${partner.logoW}px`,
                maxHeight: `${partner.logoH}px`,
                display: 'block',
                opacity: 1,
                filter: partner.darkLogo
                  ? (hovered ? 'brightness(1.80) contrast(1.20) drop-shadow(0 0 6px rgba(255,255,255,0.22))' : 'brightness(1.55) contrast(1.15) drop-shadow(0 0 4px rgba(255,255,255,0.14))')
                  : (hovered ? 'brightness(1.30) contrast(1.12)' : 'brightness(1.18) contrast(1.08)'),
                transition: 'filter 0.30s ease',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Company name ── */}
      <p style={{ flexShrink: 0, textAlign: 'center', lineHeight: 1.25, fontWeight: 700, letterSpacing: '0.03em', color: hovered ? '#ffffff' : '#e2d8f5', textShadow: hovered ? '0 0 8px rgba(192,100,255,0.35)' : 'none', fontSize: partner.name.length > 20 ? '10px' : partner.name.length > 14 ? '11px' : '12px', maxWidth: '210px', zIndex: 1, margin: 0, transition: 'color 0.25s ease, text-shadow 0.25s ease' }}>
        {partner.name}
      </p>
    </>
  );

  // Render as <a> when a URL is provided, plain <div> otherwise
  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" {...sharedProps}>
      {inner}
    </a>
  ) : (
    <div {...sharedProps}>
      {inner}
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function PartnersSection() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const tween1Ref = useRef(null);
  const tween2Ref = useRef(null);

  useGSAP(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!row1 || !row2) return;

    const dist1 = row1.scrollWidth / 3;
    const dist2 = row2.scrollWidth / 3;

    tween1Ref.current = gsap.to(row1, {
      x: -dist1,
      duration: 50,
      ease: 'none',
      repeat: -1,
      force3D: true,
      overwrite: true,
    });

    gsap.set(row2, { x: -dist2, force3D: true });
    tween2Ref.current = gsap.to(row2, {
      x: 0,
      duration: 50,
      ease: 'none',
      repeat: -1,
      force3D: true,
      overwrite: true,
    });
  }, []);

  const slowDown = (tweenRef) => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0.18, duration: 0.7, ease: 'power2.out' });
  };
  const speedUp = (tweenRef) => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1.0, duration: 0.7, ease: 'power2.inOut' });
  };

  const BG = '#080818';
  const fadeL = `linear-gradient(to right, ${BG}, transparent)`;
  const fadeR = `linear-gradient(to left,  ${BG}, transparent)`;

  return (
    <section className="relative py-20 lg:py-28 bg-[#080818] overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: CARD_STYLES }} />

      {/* Static ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '900px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, rgba(56,189,248,0.03) 55%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -top-16 -left-16 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute -bottom-16 -right-16 w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* ── Section header ── */}
      <div className="relative site-container mb-12" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
            Our Associate Partners
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Proud to collaborate with these innovative companies across industries
          </p>
        </motion.div>
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <div
        className="relative overflow-hidden mb-6 py-6"
        onMouseEnter={() => slowDown(tween1Ref)}
        onMouseLeave={() => speedUp(tween1Ref)}
      >
        <div className="partner-edge-fade absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{ background: fadeL }} />
        <div className="partner-edge-fade absolute right-0 top-0 bottom-0 z-10 pointer-events-none" style={{ background: fadeR }} />
        <div
          ref={row1Ref}
          className="partner-row-gap flex w-max transform-gpu"
          style={{ willChange: 'transform' }}
        >
          {LOOP_A.map((partner, i) => (
            <PartnerCard key={`a-${i}`} partner={partner} />
          ))}
        </div>
      </div>

      {/* ── Row 2 — scrolls right ── */}
      <div
        className="relative overflow-hidden py-6"
        onMouseEnter={() => slowDown(tween2Ref)}
        onMouseLeave={() => speedUp(tween2Ref)}
      >
        <div className="partner-edge-fade absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{ background: fadeL }} />
        <div className="partner-edge-fade absolute right-0 top-0 bottom-0 z-10 pointer-events-none" style={{ background: fadeR }} />
        <div
          ref={row2Ref}
          className="partner-row-gap flex w-max transform-gpu"
          style={{ willChange: 'transform' }}
        >
          {LOOP_B.map((partner, i) => (
            <PartnerCard key={`b-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
