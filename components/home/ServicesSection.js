'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Smartphone, LayoutGrid, Users, TrendingUp, Server, Globe, Layout, Cloud, Brain, Database } from 'lucide-react';
import { services } from '@/lib/data';
import GradientMesh from '@/components/GradientMesh';

const iconMap = { Code2, Smartphone, LayoutGrid, Users, TrendingUp, Server, Globe, Layout, Cloud, Brain, Database };

// Full RGBA values for each accent — used in JS style strings
const colorMap = {
  purple: { r: '168,85,247',  icon: 'text-purple-400',  iconBg: 'from-purple-500/25 to-purple-700/10' },
  blue:   { r: '59,130,246',  icon: 'text-blue-400',    iconBg: 'from-blue-500/25 to-blue-700/10'   },
  magenta:{ r: '236,72,153',  icon: 'text-pink-400',    iconBg: 'from-pink-500/25 to-pink-700/10'   },
  green:  { r: '34,197,94',   icon: 'text-green-400',   iconBg: 'from-green-500/25 to-green-700/10' },
  orange: { r: '249,115,22',  icon: 'text-orange-400',  iconBg: 'from-orange-500/25 to-orange-700/10'},
  cyan:   { r: '34,211,238',  icon: 'text-cyan-400',    iconBg: 'from-cyan-500/25 to-cyan-700/10'   },
  sky:    { r: '56,189,248',  icon: 'text-sky-400',     iconBg: 'from-sky-500/25 to-sky-700/10'     },
  violet: { r: '139,92,246',  icon: 'text-violet-400',  iconBg: 'from-violet-500/25 to-violet-700/10'},
  teal:   { r: '20,184,166',  icon: 'text-teal-400',    iconBg: 'from-teal-500/25 to-teal-700/10'   },
};

// ── Premium service card ─────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse]     = useState({ x: 50, y: 50 }); // % within card
  const cardRef = useRef(null);
  const Icon = iconMap[service.icon] || Code2;
  const c    = colorMap[service.color] || colorMap.purple;
  const rgb  = c.r;

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/services/${service.id}`} tabIndex={-1}>
        <motion.div
          ref={cardRef}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => { setHovered(false); setMouse({ x: 50, y: 50 }); }}
          onMouseMove={handleMouseMove}
          animate={{ y: hovered ? -8 : 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl p-5 lg:p-6 h-full overflow-hidden select-none"
          style={{
            /* Base glass surface */
            background: hovered
              ? `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)`
              : `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            /* Animated border — brighter on hover */
            border: `1px solid rgba(${rgb},${hovered ? 0.50 : 0.16})`,
            /* Layered shadow: colored ambient + dark depth + inset highlight */
            boxShadow: hovered
              ? `0 0 0 1px rgba(${rgb},0.12),
                 0 8px 32px rgba(${rgb},0.22),
                 0 24px 64px rgba(0,0,0,0.45),
                 inset 0 1px 0 rgba(255,255,255,0.10),
                 inset 0 -1px 0 rgba(${rgb},0.08)`
              : `0 2px 12px rgba(0,0,0,0.25),
                 inset 0 1px 0 rgba(255,255,255,0.04)`,
            transition: 'background 0.38s ease, border-color 0.38s ease, box-shadow 0.38s ease',
          }}
        >
          {/* ── Mouse-follow radial glow ── */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(${rgb},0.14) 0%, transparent 60%)`,
            }}
          />

          {/* ── Ambient corner bloom ── */}
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-500"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(circle, rgba(${rgb},0.18) 0%, transparent 70%)`,
              filter: 'blur(20px)',
            }}
          />

          {/* ── Top shimmer line ── */}
          <div
            className="absolute top-0 left-4 right-4 h-px rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: `linear-gradient(to right, transparent, rgba(${rgb},0.85), transparent)`,
              boxShadow: `0 0 8px rgba(${rgb},0.5)`,
            }}
          />

          {/* ── Bottom edge glow ── */}
          <div
            className="absolute bottom-0 left-6 right-6 h-px pointer-events-none transition-opacity duration-500"
            style={{
              opacity: hovered ? 0.6 : 0,
              background: `linear-gradient(to right, transparent, rgba(${rgb},0.4), transparent)`,
            }}
          />

          {/* ── Content ── */}
          <div className="relative z-10">

            {/* Icon */}
            <motion.div
              animate={{
                scale: hovered ? 1.12 : 1,
                y:     hovered ? -2   : 0,
              }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.iconBg} flex items-center justify-center mb-4 relative`}
              style={{
                boxShadow: hovered
                  ? `0 0 0 1px rgba(${rgb},0.30), 0 4px 20px rgba(${rgb},0.30)`
                  : `0 0 0 1px rgba(${rgb},0.12)`,
                transition: 'box-shadow 0.38s ease',
              }}
            >
              {/* Icon inner glow on hover */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: hovered ? 1 : 0,
                  background: `radial-gradient(circle at 40% 35%, rgba(${rgb},0.25) 0%, transparent 70%)`,
                }}
              />
              <Icon size={20} className={c.icon} />
            </motion.div>

            {/* Title */}
            <motion.h3
              animate={{ x: hovered ? 1 : 0 }}
              transition={{ duration: 0.28 }}
              className="text-white font-semibold text-sm mb-2 leading-snug"
            >
              {service.title}
            </motion.h3>

            {/* Description */}
            <p className="text-gray-500 text-xs leading-relaxed mb-5">
              {service.shortDesc}
            </p>

            {/* CTA row */}
            <motion.div
              animate={{
                x:       hovered ? 3 : 0,
                opacity: hovered ? 1 : 0.65,
              }}
              transition={{ duration: 0.28 }}
              className={`flex items-center gap-1.5 text-xs font-medium ${c.icon}`}
            >
              <span>Learn more</span>
              <motion.span
                animate={{ x: hovered ? 3 : 0 }}
                transition={{ duration: 0.28, delay: 0.04 }}
              >
                <ArrowRight size={11} />
              </motion.span>
            </motion.div>

          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#080818] overflow-hidden">
      <GradientMesh />
      <div className="relative site-container" style={{ zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>BETTER FUTURE WITH INNOVATIVE TECH</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Explore Our IT Services
            <br />
            <span className="text-gradient">&amp; Solutions</span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            From custom software to AI solutions, we deliver end-to-end technology services that transform businesses and drive measurable results.
          </p>
        </motion.div>

        {/* Grid — 4 cols desktop, last card centred when it lands alone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.slice(0, -1).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Last card — perfectly centred relative to the full section width */}
        {services.length > 0 && (() => {
          const last = services[services.length - 1];
          return (
            <div className="mt-5 lg:mt-6 flex justify-center">
              <div className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]">
                <ServiceCard service={last} index={services.length - 1} />
              </div>
            </div>
          );
        })()}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 glass border border-purple-500/30 text-purple-300 font-medium rounded-xl hover:bg-purple-500/10 hover:text-white transition-all duration-200"
          >
            VIEW MORE SERVICES
            <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
