'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Globe, Code2, Smartphone, LayoutGrid, Users,
  Server, Shield, Clock, MessageSquare,
} from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import GradientMesh from '@/components/GradientMesh';

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const COUNTRIES = [
  {
    flag: 'https://flagcdn.com/w80/in.png',
    emoji: '🇮🇳',
    name: 'India',
    code: 'in',
    tagline: 'Headquarters & Innovation Center',
    desc: 'Taruna Technology is headquartered in Vadodara, India — our primary innovation hub where our engineering, design, and delivery teams collaborate to serve clients across the globe.',
    rgb: '168,85,247',
  },
  {
    flag: 'https://flagcdn.com/w80/us.png',
    emoji: '🇺🇸',
    name: 'USA',
    code: 'us',
    tagline: 'North American Business Hub',
    desc: 'A key market for Taruna Technology, the United States represents one of our strongest client bases — spanning startups, mid-market companies, and large enterprises across multiple industries.',
    rgb: '59,130,246',
  },
  {
    flag: 'https://flagcdn.com/w80/gb.png',
    emoji: '��',
    name: 'United Kingdom',
    code: 'gb',
    tagline: 'Strategic Technology Partner Network',
    desc: 'The United Kingdom is a significant part of our European footprint. We collaborate closely with UK organisations to deliver technology solutions aligned with British business and compliance standards.',
    rgb: '56,189,248',
  },
  {
    flag: 'https://flagcdn.com/w80/de.png',
    emoji: '��',
    name: 'Germany',
    code: 'de',
    tagline: 'Enterprise Client Operations',
    desc: 'Germany is home to some of our most established enterprise partnerships. We deliver precision-engineered digital solutions that meet the high standards expected by European industrial and commercial organisations.',
    rgb: '34,197,94',
  },
  {
    flag: 'https://flagcdn.com/w80/sg.png',
    emoji: '��',
    name: 'Singapore',
    code: 'sg',
    tagline: 'Asia-Pacific Business Hub',
    desc: 'Singapore serves as our gateway to the Asia-Pacific region. Our presence here enables us to serve clients across South-East Asia with rapid, reliable, and culturally aligned digital solutions.',
    rgb: '234,179,8',
  },
  {
    flag: 'https://flagcdn.com/w80/ae.png',
    emoji: '🇦🇪',
    name: 'UAE',
    code: 'ae',
    tagline: 'Middle East Business Presence',
    desc: 'The UAE represents our Middle East operations hub. From Dubai to Abu Dhabi, we partner with forward-looking businesses to accelerate their digital transformation in one of the world\'s fastest-growing economies.',
    rgb: '249,115,22',
  },
];

const SERVICES = [
  { icon: Code2,       color: 'purple', rgb: '168,85,247', title: 'Custom Software Development',          desc: 'Full-cycle bespoke software engineered around your unique workflows — from concept and architecture through to cloud deployment and ongoing support.' },
  { icon: LayoutGrid,  color: 'green',  rgb: '34,197,94',  title: 'Enterprise ERP Solutions',             desc: 'Integrated enterprise resource planning platforms that unify finance, HR, inventory, procurement, and operations across your entire organisation.' },
  { icon: Users,       color: 'yellow', rgb: '234,179,8',  title: 'CRM & Sales Platforms',                desc: 'Customer relationship management systems built to streamline pipelines, automate follow-ups, and maximise client retention for growth-focused businesses.' },
  { icon: Server,      color: 'orange', rgb: '249,115,22', title: 'Business Process Automation',          desc: 'Smart automation solutions that eliminate repetitive manual tasks, reduce operational overhead, and accelerate decision-making across your business.' },
  { icon: Globe,       color: 'blue',   rgb: '59,130,246', title: 'Web Application Development',          desc: 'Responsive, scalable web platforms designed to deliver exceptional user experiences and perform reliably at enterprise scale globally.' },
  { icon: Code2,       color: 'cyan',   rgb: '34,211,238', title: 'Mobile App Development',               desc: 'Cross-platform iOS and Android applications built with Flutter and React Native for businesses serving customers anywhere in the world.' },
  { icon: LayoutGrid,  color: 'purple', rgb: '168,85,247', title: 'Quotation & Order Management',         desc: 'Automated quotation generation, approval workflows, and order tracking systems purpose-built for B2B enterprises with complex sales cycles.' },
  { icon: Smartphone,  color: 'blue',   rgb: '59,130,246', title: 'Inventory & Supply Chain Software',    desc: 'Real-time inventory tracking, warehouse management, and multi-location stock control for global supply chains and distribution networks.' },
  { icon: Server,      color: 'green',  rgb: '34,197,94',  title: 'HR & Payroll Management',              desc: 'End-to-end HR platforms covering recruitment, attendance, payroll processing, and multi-region compliance for international workforces.' },
  { icon: LayoutGrid,  color: 'orange', rgb: '249,115,22', title: 'Cloud & SaaS Solutions',               desc: 'Scalable cloud-native and SaaS platforms designed for rapid deployment, high availability, and seamless growth as your user base expands.' },
  { icon: Users,       color: 'cyan',   rgb: '34,211,238', title: 'Data & Analytics Platforms',           desc: 'Business intelligence dashboards and data engineering solutions that transform raw operational data into actionable insights for leaders worldwide.' },
  { icon: Code2,       color: 'violet', rgb: '139,92,246', title: 'Industry-Specific Software',           desc: 'Tailor-made digital solutions designed for the distinct regulatory, operational, and workflow requirements of healthcare, manufacturing, retail, logistics, and finance.' },
];

const WHY_CARDS = [
  {
    icon: Code2,
    rgb: '168,85,247',
    iconBg: 'from-purple-500/20 to-purple-700/10',
    iconColor: 'text-purple-400',
    title: 'Tailor-Made Solutions',
    desc: 'Every product we build is crafted specifically around each client\'s unique business requirements, workflows, and growth goals — never a generic off-the-shelf template.',
  },
  {
    icon: Globe,
    rgb: '59,130,246',
    iconBg: 'from-blue-500/20 to-blue-700/10',
    iconColor: 'text-blue-400',
    title: 'Global Collaboration',
    desc: 'Our structured communication process and agile project management ensure efficient delivery across multiple time zones — from India to the USA, Germany, UAE, and beyond.',
  },
  {
    icon: Shield,
    rgb: '34,197,94',
    iconBg: 'from-green-500/20 to-green-700/10',
    iconColor: 'text-green-400',
    title: 'Secure & Scalable Development',
    desc: 'We engineer reliable, future-ready software architectures following industry-leading security standards and best practices, so your platform grows with your business.',
  },
  {
    icon: Clock,
    rgb: '249,115,22',
    iconBg: 'from-orange-500/20 to-orange-700/10',
    iconColor: 'text-orange-400',
    title: 'Long-Term Support',
    desc: 'Our partnership does not end at launch. We provide continuous maintenance, version updates, performance monitoring, and dedicated technical assistance after every deployment.',
  },
];

const STATS = [
  { value: 35,   suffix: '+',  label: 'Across 35+ Countries',          labelParts: ['Across ', '35+', ' Countries'], icon: '🌍', duration: 2000 },
  { value: 870,  suffix: '+',  label: 'Successful Projects Delivered', icon: '📦', duration: 2400 },
  { value: 1250, suffix: '+',  label: 'Business Solutions Developed',  icon: '💡', duration: 2600 },
  { value: 99,   suffix: '%',  label: 'Client Satisfaction Focus',     icon: '⭐', duration: 1800 },
  { value: 24,   suffix: '/7', label: 'Global Support Available',      icon: '🔄', duration: 1200 },
];

// ─────────────────────────────────────────────────────────────
// COUNTUP
// ─────────────────────────────────────────────────────────────
function CountUp({ target, suffix, duration, triggered }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setCount(target);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [triggered, target, duration]);
  return <>{count.toLocaleString()}{suffix}</>;
}

// ─────────────────────────────────────────────────────────────
// COUNTRY CARD
// ─────────────────────────────────────────────────────────────
function CountryCard({ country, index }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={ref}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => { setHovered(false); setMouse({ x: 50, y: 50 }); }}
        onMouseMove={onMove}
        animate={{ y: hovered ? -8 : 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl p-6 h-full overflow-hidden"
        style={{
          background: hovered
            ? 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid rgba(${country.rgb},${hovered ? 0.50 : 0.16})`,
          boxShadow: hovered
            ? `0 0 0 1px rgba(${country.rgb},0.12), 0 8px 32px rgba(${country.rgb},0.22), 0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10)`
            : `0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)`,
          transition: 'background 0.38s ease, border-color 0.38s ease, box-shadow 0.38s ease',
        }}
      >
        {/* Mouse glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(${country.rgb},0.14) 0%, transparent 60%)` }} />
        {/* Corner bloom */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(circle, rgba(${country.rgb},0.18) 0%, transparent 70%)`, filter: 'blur(20px)' }} />
        {/* Top shimmer */}
        <div className="absolute top-0 left-4 right-4 h-px rounded-full pointer-events-none transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: `linear-gradient(to right, transparent, rgba(${country.rgb},0.85), transparent)` }} />

        <div className="relative z-10">
          {/* Flag + name row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-white/15 flex-shrink-0" style={{ width: '64px', height: '44px' }}>
              <img src={country.flag} alt={country.name} className="w-full h-full object-cover" draggable={false} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{country.name}</h3>
              <p className="text-xs font-semibold mt-0.5" style={{ color: `rgba(${country.rgb},0.85)` }}>{country.tagline}</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{country.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────────────────────────
const colorIconBg = {
  purple: 'from-purple-500/25 to-purple-700/10',
  blue:   'from-blue-500/25 to-blue-700/10',
  green:  'from-green-500/25 to-green-700/10',
  yellow: 'from-yellow-500/25 to-yellow-700/10',
  orange: 'from-orange-500/25 to-orange-700/10',
  cyan:   'from-cyan-500/25 to-cyan-700/10',
  violet: 'from-violet-500/25 to-violet-700/10',
};
const colorIconText = {
  purple: 'text-purple-400', blue: 'text-blue-400', green: 'text-green-400',
  yellow: 'text-yellow-400', orange: 'text-orange-400', cyan: 'text-cyan-400',
  violet: 'text-violet-400',
};

function ServiceCard({ svc, index }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const ref = useRef(null);
  const Icon = svc.icon;

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={ref}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => { setHovered(false); setMouse({ x: 50, y: 50 }); }}
        onMouseMove={onMove}
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl p-4 md:p-5 lg:p-6 h-full overflow-hidden"
        style={{
          background: hovered
            ? 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid rgba(${svc.rgb},${hovered ? 0.50 : 0.16})`,
          boxShadow: hovered
            ? `0 0 0 1px rgba(${svc.rgb},0.12), 0 8px 32px rgba(${svc.rgb},0.22), 0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10)`
            : `0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)`,
          transition: 'background 0.38s ease, border-color 0.38s ease, box-shadow 0.38s ease',
        }}
      >
        <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(${svc.rgb},0.14) 0%, transparent 60%)` }} />
        <div className="absolute top-0 left-4 right-4 h-px pointer-events-none transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: `linear-gradient(to right, transparent, rgba(${svc.rgb},0.85), transparent)` }} />

        <div className="relative z-10">
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1, y: hovered ? -2 : 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorIconBg[svc.color] || colorIconBg.purple} flex items-center justify-center mb-3 md:mb-4`}
            style={{ boxShadow: hovered ? `0 0 0 1px rgba(${svc.rgb},0.30), 0 4px 20px rgba(${svc.rgb},0.30)` : `0 0 0 1px rgba(${svc.rgb},0.12)`, transition: 'box-shadow 0.38s ease' }}
          >
            <Icon size={20} className={colorIconText[svc.color] || colorIconText.purple} />
          </motion.div>
          <h3 className="text-white font-semibold text-sm mb-1.5 md:mb-2 leading-snug">{svc.title}</h3>
          <p className="text-gray-500 text-[11px] md:text-xs leading-[1.45] md:leading-relaxed line-clamp-5">{svc.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// WORLD PRESENCE PANEL — right-side hero visual
// Premium floating country presence cards.
// No globe, no sphere, no network routes.
// ─────────────────────────────────────────────────────────────

const PRESENCE_COUNTRIES = [
  { flag:'https://flagcdn.com/w80/in.png', name:'India',          role:'Headquarters & Innovation Center', color:'#a855f7', delay:0.30 },
  { flag:'https://flagcdn.com/w80/us.png', name:'USA',            role:'North American Business Hub',      color:'#38bdf8', delay:0.42 },
  { flag:'https://flagcdn.com/w80/gb.png', name:'United Kingdom', role:'Strategic Partner Network',        color:'#63b3ff', delay:0.54 },
  { flag:'https://flagcdn.com/w80/de.png', name:'Germany',        role:'Enterprise Client Operations',     color:'#22c55e', delay:0.66 },
  { flag:'https://flagcdn.com/w80/ae.png', name:'UAE',            role:'Middle East Business Presence',    color:'#f97316', delay:0.78 },
  { flag:'https://flagcdn.com/w80/sg.png', name:'Singapore',      role:'Asia-Pacific Business Hub',        color:'#eab308', delay:0.90 },
];

function WorldPresencePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col gap-2.5"
      aria-label="Countries served by Taruna Technology"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-1">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(56,189,248,0.45), transparent)' }} />
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase"
          style={{ color: 'rgba(125,211,252,0.70)' }}>Global Presence</span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(56,189,248,0.45), transparent)' }} />
      </div>

      {PRESENCE_COUNTRIES.map((c) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.48, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
          style={{
            background: 'rgba(6,6,22,0.52)',
            border: `1px solid ${c.color}28`,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Status dot */}
          <span className="relative flex-shrink-0 w-2 h-2">
            <span className="absolute inset-0 rounded-full animate-ping"
              style={{ background: c.color, opacity: 0.28, animationDuration: '2.5s' }} />
            <span className="block w-2 h-2 rounded-full"
              style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }} />
          </span>
          
          {/* Country name and subtitle */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold leading-tight">{c.name}</p>
            <p className="text-[11px] leading-tight mt-0.5" style={{ color: `${c.color}99` }}>{c.role}</p>
          </div>

          {/* Small flag image on the right */}
          <div className="flex-shrink-0 w-6 h-4 rounded overflow-hidden shadow-sm ring-1 ring-white/10">
            <img src={c.flag} alt={c.name} className="w-full h-full object-cover" draggable={false} />
          </div>

          {/* ACTIVE badge */}
          <span className="flex-shrink-0 text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded"
            style={{ background: `${c.color}18`, color: `${c.color}cc`, border: `1px solid ${c.color}30` }}>
            ACTIVE
          </span>
        </motion.div>
      ))}

      <p className="text-center text-[10px] mt-1" style={{ color: 'rgba(148,163,184,0.40)' }}>
        Serving clients across 35+ countries worldwide
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function GlobalReachPage() {
  const statsRef = useRef(null);
  const statsTriggered = useRef(false);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsTriggered.current) {
          statsTriggered.current = true;
          setStatsActive(true);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#080818]">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[82vh] flex items-center overflow-hidden bg-[#04040f]">

        {/* ── Layer 0: Solid base — prevents flash before video loads ── */}
        <div className="absolute inset-0" style={{ background: '#04040f', zIndex: 0 }} aria-hidden="true" />

        {/* ── Layer 1: Cinematic video — Dubai city skyline at night (Pexels 7277163) ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ zIndex: 1, opacity: 0.75, filter: 'brightness(0.58) saturate(1.20) contrast(1.10)' }}
          aria-hidden="true"
        >
          <source src="/videos/global-reach.mp4" type="video/mp4" />
          <source src="/hero-bg.mp4"              type="video/mp4" />
        </video>

        {/* ── Layer 2: Dark overlay — left text mask + brand tint ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }} aria-hidden="true">
          {/* Strong left mask so text pops; right stays open so video shows */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(4,4,15,0.96) 0%, rgba(4,4,15,0.88) 30%, rgba(4,4,15,0.45) 52%, rgba(4,4,15,0.12) 68%, transparent 100%)' }} />
          {/* Top + bottom vignette */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(4,4,15,0.55) 0%, transparent 20%, transparent 58%, rgba(8,8,24,0.98) 100%)' }} />
          {/* Deep-navy brand tint */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(5,12,50,0.55) 0%, rgba(25,8,55,0.18) 48%, transparent 100%)' }} />
          {/* Left navy bloom */}
          <div className="absolute -top-20 -left-20 w-[520px] h-[460px] rounded-full blur-[140px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(10,38,120,0.52) 0%, transparent 65%)' }} />
          {/* Lower-left sky accent */}
          <div className="absolute bottom-0 left-[4%] w-[300px] h-[300px] rounded-full blur-[110px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(28,75,175,0.28) 0%, transparent 70%)' }} />
          {/* Right violet — Taruna brand warmth */}
          <div className="absolute top-[8%] right-0 w-[320px] h-[320px] rounded-full blur-[110px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(90,35,165,0.18) 0%, transparent 65%)' }} />
        </div>

        {/* ── Layer 4: Two-column hero layout ── */}
        <div className="relative w-full" style={{ zIndex: 10 }}>
          <div className="site-container pt-8 pb-12 lg:pt-14 lg:pb-20">
            <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

              {/* ── LEFT: headline + trust signals + CTAs ── */}
              <div>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border font-bold mb-6 tracking-widest uppercase backdrop-blur-sm"
                  style={{
                    borderColor: 'rgba(56,189,248,0.38)',
                    background: 'rgba(56,189,248,0.10)',
                    color: 'rgba(125,211,252,1)',
                    boxShadow: '0 0 22px rgba(56,189,248,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
                    fontSize: 'clamp(9px, 2.2vw, 12px)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse flex-shrink-0"
                    style={{ boxShadow: '0 0 8px rgba(56,189,248,0.9)' }} />
                  <span className="hidden sm:inline">🌍 Global Reach — Software Company in India</span>
                  <span className="sm:hidden">🌍 Global Reach</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse flex-shrink-0"
                    style={{ boxShadow: '0 0 8px rgba(56,189,248,0.9)' }} />
                </motion.div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.70, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl lg:text-[3.3rem] font-black mb-5 leading-[1.07]"
                >
                  <span className="block text-white">Delivering Custom</span>
                  <span className="block" style={{ color: '#FFD54A' }}>
                    Software Solutions
                  </span>
                  <span className="block text-white">Worldwide</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.60, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gray-300 text-base lg:text-lg leading-relaxed mb-3 max-w-lg"
                >
                  Taruna Technology is a leading <strong className="text-white">custom software development company</strong> in India delivering innovative digital solutions for businesses across the USA, Europe, the Middle East, Asia-Pacific, and beyond.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg"
                >
                  From custom ERP development to CRM solutions, business automation, and enterprise software — our team is built for global delivery, no matter where in the world your business operates.
                </motion.p>

                {/* Trust pills */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-2.5 mb-8"
                >
                  {[
                    { icon: '🇮🇳', label: 'Based in India',         glow: 'rgba(168,85,247,0.20)' },
                    { icon: '🌍',  label: '35+ Countries Served',    glow: 'rgba(34,211,238,0.18)' },
                    { icon: '📦',  label: '870+ Projects Delivered', glow: 'rgba(56,189,248,0.18)' },
                  ].map((t) => (
                    <span key={t.label}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-200 transition-all duration-200 hover:text-white"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 16px -2px ${t.glow}`; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
                    >
                      <span>{t.icon}</span>{t.label}
                    </span>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.50, delay: 0.40, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
                  >
                    Request a Consultation
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/services"
                    className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-sky-500/30 text-sky-300 font-semibold rounded-xl hover:bg-sky-500/10 hover:text-white transition-all duration-200"
                  >
                    Explore Services
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>

              {/* ── RIGHT: World presence panel ── */}
              <WorldPresencePanel />

            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0b0b1f 0%, transparent 100%)', zIndex: 5 }} />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — GLOBAL PRESENCE
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-[#0b0b1f] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/8 blur-[100px]" />
        </div>

        <div className="relative site-container" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>INTERNATIONAL SOFTWARE COMPANY</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Global Presence
              <br />
              <span style={{ color: '#FFD54A' }}>Across 35+ Countries</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              From our headquarters in India, Taruna Technology delivers world-class software solutions to clients across six continents — building long-term technology partnerships with businesses that demand excellence.
            </p>
          </motion.div>

          {/* Single uniform 3-column grid — all 6 cards, consistent heights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {COUNTRIES.map((c, i) => (
              <CountryCard key={c.code} country={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — GLOBAL SERVICES
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-[#080818] overflow-hidden">
        <GradientMesh />
        <div className="relative site-container" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>ENTERPRISE SOFTWARE DEVELOPMENT</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Global Software
              <br />
              <span style={{ color: '#FFD54A' }}>Services &amp; Solutions</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Taruna Technology delivers the full spectrum of enterprise software capabilities — every solution built to global quality standards and deployed for clients across industries and time zones worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 md:gap-5 lg:gap-6">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — WHY GLOBAL CLIENTS CHOOSE US
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-[#0b0b1f] overflow-hidden">
        <GradientMesh />
        <div className="relative site-container" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>WHY GLOBAL CLIENTS CHOOSE TARUNA TECHNOLOGY</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Built for Global
              <br />
              <span style={{ color: '#FFD54A' }}>Enterprise Standards</span>
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Clients across the USA, Europe, the Middle East, and Asia-Pacific choose Taruna Technology for our uncompromising quality, reliable delivery, and long-term partnership approach.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-7">
            {WHY_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PremiumCard rgb={card.rgb} className="p-7 xl:p-8 h-full">
                    <div className="absolute top-5 right-5 text-6xl font-black text-white/[0.03] select-none pointer-events-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center mb-5`}
                      style={{ boxShadow: `0 0 0 1px rgba(${card.rgb},0.18)` }}>
                      <Icon size={22} className={card.iconColor} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3">{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — GLOBAL IMPACT STATS
      ══════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="relative py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1f] via-[#0a0515] to-[#0b0b1f]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/15 blur-[120px]" />
        </div>

        <div className="relative z-10 site-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>GLOBAL IMPACT</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Numbers That Reflect Our
              <br />
              <span style={{ color: '#FFD54A' }}>Worldwide Commitment</span>
            </h2>
          </motion.div>

          {/* Stats Grid - Mobile: 2x2 + centered last card; Desktop: 5 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-7 items-stretch">
            {STATS.slice(0, 4).map((stat, index) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.10, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                
                <PremiumCard rgb="168,85,247" lift={6} className="p-6 xl:p-7 text-center h-full">
                  <div className="flex flex-col items-center justify-center h-full gap-2">
                    <div className="text-3xl leading-none">{stat.icon}</div>
                    <h3 className="font-black leading-none tabular-nums"
                      style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: '#ffffff', textShadow: '0 0 20px rgba(168,85,247,0.4)' }}
                    >
                      <CountUp target={stat.value} suffix={stat.suffix} duration={stat.duration} triggered={statsActive} />
                    </h3>
                    <p className="text-gray-400 text-xs font-medium leading-snug text-center w-full">
                      {stat.labelParts ? (
                        <>
                          {stat.labelParts[0]}
                          <span className="bg-gradient-to-r from-[#FACC15] to-[#F59E0B] bg-clip-text text-transparent font-bold">
                            {stat.labelParts[1]}
                          </span>
                          {stat.labelParts[2]}
                        </>
                      ) : (
                        stat.label
                      )}
                    </p>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
            {/* Last stat - centered on mobile, normal on desktop */}
            <motion.div key={STATS[4].label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 4 * 0.10, ease: [0.22, 1, 0.36, 1] }}
              className="h-full col-span-2 sm:col-span-1"
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: 'calc(50% - 10px)',
              }}
            >
              <PremiumCard rgb="168,85,247" lift={6} className="p-6 xl:p-7 text-center h-full">
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <div className="text-3xl leading-none">{STATS[4].icon}</div>
                  <h3 className="font-black leading-none tabular-nums"
                    style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: '#ffffff', textShadow: '0 0 20px rgba(168,85,247,0.4)' }}
                  >
                    <CountUp target={STATS[4].value} suffix={STATS[4].suffix} duration={STATS[4].duration} triggered={statsActive} />
                  </h3>
                  <p className="text-gray-400 text-xs font-medium leading-snug text-center w-full">
                    {STATS[4].labelParts ? (
                      <>
                        {STATS[4].labelParts[0]}
                        <span className="bg-gradient-to-r from-[#FACC15] to-[#F59E0B] bg-clip-text text-transparent font-bold">
                          {STATS[4].labelParts[1]}
                        </span>
                        {STATS[4].labelParts[2]}
                      </>
                    ) : (
                      STATS[4].label
                    )}
                  </p>
                </div>
              </PremiumCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — SEO TEXT BLOCK
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-[#080818] overflow-hidden">
        <GradientMesh />
        <div className="relative site-container" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#FFD54A' }}>SOFTWARE COMPANY IN INDIA — SERVING THE WORLD</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
              Trusted Global Software
              <br />
              <span style={{ color: '#FFD54A' }}>Development Partner</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 text-left mt-8">
              {[
                {
                  title: 'Custom ERP Development',
                  body: 'As a specialist ERP development company, we build fully integrated enterprise resource planning systems for businesses across multiple continents — connecting finance, HR, inventory, procurement, and operations on a single unified platform.',
                  rgb: '168,85,247',
                },
                {
                  title: 'Custom CRM Development',
                  body: 'Our CRM development services help businesses worldwide manage customer relationships, automate sales pipelines, and maximise retention through intelligent, purpose-built platforms tailored to each client\'s unique sales process.',
                  rgb: '59,130,246',
                },
                {
                  title: 'Business Process Automation',
                  body: 'We design and deploy business automation solutions that eliminate manual effort, reduce operational errors, and accelerate decision-making for enterprises operating across multiple regions and time zones.',
                  rgb: '34,197,94',
                },
                {
                  title: 'Mobile App Development',
                  body: 'From React Native to Flutter, our mobile app development team delivers cross-platform applications for iOS and Android used by global businesses in over 35 countries, supporting millions of end-users worldwide.',
                  rgb: '249,115,22',
                },
              ].map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PremiumCard rgb={item.rgb} className="p-6 h-full">
                    <div className="w-1 h-10 rounded-full mb-4 flex-shrink-0"
                      style={{ background: `linear-gradient(to bottom, rgba(${item.rgb},0.9), rgba(${item.rgb},0.2))` }} />
                    <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — CALL TO ACTION
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1f] via-[#0a0515] to-[#0b0b1f]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-900/12 blur-[130px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

        <div className="relative site-container" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="glass-card rounded-3xl p-6 md:p-12 lg:p-16 border border-purple-500/20 relative overflow-hidden max-w-4xl mx-auto text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/8 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/6 rounded-full blur-[50px] pointer-events-none" />

              <div className="relative">
                {/* Live indicator */}
                <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full glass border border-green-500/30 text-xs md:text-sm text-green-300 mb-4 md:mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  💼 Consultation Available
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-5 leading-tight">
                  Let&apos;s Build Your Next
                  <br />
                  <span style={{ color: '#FFD54A' }}>Software Solution</span>
                </h2>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6 md:mb-8">
                  Looking for a trusted <strong className="text-gray-300">software development company</strong> to transform your business operations? Our team is ready to build custom software, ERP systems, CRM solutions, and enterprise applications tailored to your unique needs — no matter where you are in the world.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30 text-base"
                  >
                    Request a Consultation
                    <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/contact"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 glass border border-purple-500/30 text-purple-300 font-semibold rounded-xl hover:bg-purple-500/10 hover:text-white transition-all duration-200 text-base"
                  >
                    <MessageSquare size={17} />
                    Contact Us
                  </Link>
                </div>

                {/* Trust row - 2x2 grid on mobile, flexible row on larger screens */}
                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8">
                  {['🌍 35+ Countries', '📦 870+ Projects', '⭐ 1250+ Clients', '🔄 24/7 Support'].map((t) => (
                    <span key={t} className="text-[10px] md:text-xs text-gray-500 flex items-center justify-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 glass rounded-full border border-white/6">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
