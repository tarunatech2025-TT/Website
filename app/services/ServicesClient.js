'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Code2, Smartphone, LayoutGrid, Users, TrendingUp,
  Server, Globe, Layout, Database, Search, Compass, Palette, Rocket,
  Headphones, CheckCircle2, Sparkles, ChevronRight, Layers, Workflow,
} from 'lucide-react';
import { services } from '@/lib/data';
import PremiumCard from '@/components/PremiumCard';
import GradientMesh from '@/components/GradientMesh';

const iconMap = { Code2, Smartphone, LayoutGrid, Users, TrendingUp, Server, Globe, Layout, Database };

const colorMap = {
  purple:  'from-purple-500/15 to-purple-600/5 border-purple-500/25 text-purple-400',
  blue:    'from-blue-500/15 to-blue-600/5 border-blue-500/25 text-blue-400',
  magenta: 'from-pink-500/15 to-pink-600/5 border-pink-500/25 text-pink-400',
  green:   'from-green-500/15 to-green-600/5 border-green-500/25 text-green-400',
  orange:  'from-orange-500/15 to-orange-600/5 border-orange-500/25 text-orange-400',
  cyan:    'from-cyan-500/15 to-cyan-600/5 border-cyan-500/25 text-cyan-400',
  sky:     'from-sky-500/15 to-sky-600/5 border-sky-500/25 text-sky-400',
  violet:  'from-violet-500/15 to-violet-600/5 border-violet-500/25 text-violet-400',
  teal:    'from-teal-500/15 to-teal-600/5 border-teal-500/25 text-teal-400',
};

// ── Sparkline SVG path — smooth upward trend ────────────
// 12 data points, normalised 0–1, rendered into a 280×72 viewport
const SPARK_PTS = [0.72, 0.58, 0.65, 0.50, 0.62, 0.45, 0.55, 0.38, 0.48, 0.30, 0.22, 0.10];
function buildSparkPath(pts, W = 280, H = 72) {
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * W);
  const ys = pts.map((v) => v * H);
  // Catmull-Rom → cubic bezier approximation for smooth curve
  let d = `M ${xs[0]} ${ys[0]}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const x0 = i > 0 ? xs[i - 1] : xs[i];
    const y0 = i > 0 ? ys[i - 1] : ys[i];
    const x1 = xs[i], y1 = ys[i];
    const x2 = xs[i + 1], y2 = ys[i + 1];
    const x3 = i < xs.length - 2 ? xs[i + 2] : x2;
    const y3 = i < xs.length - 2 ? ys[i + 2] : y2;
    const cp1x = x1 + (x2 - x0) / 6;
    const cp1y = y1 + (y2 - y0) / 6;
    const cp2x = x2 - (x3 - x1) / 6;
    const cp2y = y2 - (y3 - y1) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
  }
  return d;
}
const SPARK_LINE = buildSparkPath(SPARK_PTS);
// Area fill — close path to bottom
const SPARK_AREA = SPARK_LINE + ` L 280 72 L 0 72 Z`;

// ── Premium hero panel — single focused card ────────────
function ServicesDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ transform: 'translateY(-8px)' }}
    >
      {/* Ambient glow behind the card — pulsing softly */}
      <div
        className="absolute -inset-6 rounded-3xl pointer-events-none animate-card-breathe"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 55% 50%, rgba(139,92,246,0.22) 0%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* ── Main card ── */}
      <div
        className="relative rounded-2xl overflow-hidden backdrop-blur-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(139,92,246,0.22)',
          boxShadow: `
            0 0 0 1px rgba(139,92,246,0.08),
            0 8px 40px rgba(0,0,0,0.45),
            0 32px 80px rgba(0,0,0,0.30),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
        }}
      >
        {/* Light sweep shimmer — runs every ~7s */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          aria-hidden="true"
          style={{ zIndex: 2 }}
        >
          <div
            className="animate-light-sweep absolute top-0 bottom-0 w-[35%]"
            style={{
              background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.055) 45%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.055) 55%, transparent 100%)',
            }}
          />
        </div>
        {/* ── Window chrome ── */}
        <div
          className="flex items-center gap-2 px-5 py-3.5 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-3 text-[10px] text-gray-500 font-mono tracking-widest select-none">
            taruna · performance
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400 font-mono">LIVE</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-6">

          {/* ── Top stat row — 2 numbers, wide breathing room ── */}
          <div className="grid grid-cols-2 gap-4 mb-7">
            {[
              { value: '500+', label: 'Projects Delivered', delta: '+12% this year', color: 'rgba(168,85,247,1)', dimColor: 'rgba(168,85,247,0.55)' },
              { value: '98%',  label: 'Client Satisfaction', delta: 'Industry avg 81%', color: 'rgba(34,211,238,1)', dimColor: 'rgba(34,211,238,0.55)' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                className="rounded-xl p-4 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                }}
              >
                {/* Subtle corner glow */}
                <div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${stat.dimColor} 0%, transparent 70%)`, filter: 'blur(12px)' }}
                />
                <p
                  className={`text-3xl font-black tracking-tight mb-0.5 ${i === 0 ? 'animate-stat-glow-purple' : 'animate-stat-glow-cyan'}`}
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-400 text-[11px] font-medium leading-tight mb-1.5">{stat.label}</p>
                <p className="text-[10px] font-mono" style={{ color: stat.dimColor }}>{stat.delta}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Sparkline chart ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-2"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Project Growth</span>
              <span className="text-[10px] text-purple-400 font-mono">↑ 3.2× ROI avg</span>
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ height: 72 }}>
              {/* Area fill gradient */}
              <svg
                viewBox="0 0 280 72"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(139,92,246,0.22)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                  </linearGradient>
                  <linearGradient id="spark-stroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(139,92,246,0.5)" />
                    <stop offset="60%" stopColor="rgba(168,85,247,0.9)" />
                    <stop offset="100%" stopColor="rgba(232,121,249,1)" />
                  </linearGradient>
                  <filter id="spark-glow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Area */}
                <path d={SPARK_AREA} fill="url(#spark-fill)" />
                {/* Line — animated draw */}
                <motion.path
                  d={SPARK_LINE}
                  fill="none"
                  stroke="url(#spark-stroke)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  filter="url(#spark-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.85, duration: 1.4, ease: 'easeOut' }}
                />
                {/* End dot */}
                <motion.circle
                  cx="280" cy={SPARK_PTS[SPARK_PTS.length - 1] * 72}
                  r="3.5"
                  fill="rgba(232,121,249,1)"
                  filter="url(#spark-glow)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.1, duration: 0.3 }}
                />
              </svg>
            </div>
          </motion.div>

          {/* ── Month labels ── */}
          <div className="flex justify-between mb-6">
            {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((m) => (
              <span key={m} className="text-[9px] text-gray-600 font-mono">{m}</span>
            ))}
          </div>

          {/* ── Divider ── */}
          <div className="h-px mb-5" style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.20), transparent)' }} />

          {/* ── 2 service pills — max 2, wide spacing ── */}
          <div className="flex items-center gap-2.5">
            {[
              { label: 'Enterprise Software', color: 'rgba(168,85,247,0.14)', border: 'rgba(168,85,247,0.30)', text: 'rgba(196,148,255,1)' },
              { label: 'AI & Cloud',           color: 'rgba(34,211,238,0.10)', border: 'rgba(34,211,238,0.25)', text: 'rgba(103,232,249,1)' },
            ].map((pill, i) => (
              <motion.span
                key={pill.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide"
                style={{
                  background: pill.color,
                  border: `1px solid ${pill.border}`,
                  color: pill.text,
                }}
              >
                {pill.label}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35 }}
              className="ml-auto text-[10px] text-gray-600 font-mono"
            >
              +9 more
            </motion.span>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA: 6-Step 'How We Work' Process Workflow
// ─────────────────────────────────────────────────────────────────────────────
const WORKFLOW_STEPS = [
  {
    number: '01',
    id: 'discover',
    name: 'Discover',
    title: 'Understand Your Business',
    subtitle: 'Requirements • Workflow • Goals',
    description:
      'We dive deep into your operational processes, pain points, and commercial objectives to blueprint the optimal technology foundation.',
    icon: Search,
    color: 'from-purple-500 to-indigo-500',
    accentColor: '#a855f7',
    badge: 'Phase 01: Inception & Discovery',
    pillars: [
      {
        title: 'Requirements Audit',
        desc: 'Comprehensive study of business logic, stakeholder needs, and operational bottlenecks.',
      },
      {
        title: 'Workflow Mapping',
        desc: 'Diagramming user journeys, role permissions, approval flows, and data handoffs.',
      },
      {
        title: 'Goal & KPI Alignment',
        desc: 'Defining crystal-clear performance benchmarks, milestone dates, and ROI metrics.',
      },
    ],
    deliverables: [
      'Scope of Work & Requirements Document',
      'Technical Feasibility Assessment',
      'Strategic Project Roadmap',
    ],
  },
  {
    number: '02',
    id: 'plan',
    name: 'Plan',
    title: 'Strategy & Architecture',
    subtitle: 'Tech Stack • Roadmap • Milestones',
    description:
      'Architecting resilient database schemas, cloud infrastructure, and sprint breakdowns engineered for enterprise scale.',
    icon: Compass,
    color: 'from-blue-500 to-cyan-500',
    accentColor: '#38bdf8',
    badge: 'Phase 02: Architecture & Roadmap',
    pillars: [
      {
        title: 'System Architecture',
        desc: 'Selecting high-performance frameworks, database schemas, and microservice boundaries.',
      },
      {
        title: 'Agile Sprint Planning',
        desc: 'Iterative sprint cadence with transparent milestone tracking and deliverables.',
      },
      {
        title: 'Security & Compliance',
        desc: 'Role-based access control, data encryption protocols, and zero-trust safeguards.',
      },
    ],
    deliverables: [
      'System Architecture Blueprint',
      'Database Schema & API Specifications',
      'Sprint-by-Sprint Execution Schedule',
    ],
  },
  {
    number: '03',
    id: 'design',
    name: 'Design',
    title: 'UI/UX & Interactive Prototypes',
    subtitle: 'User Journeys • Wireframes • Design System',
    description:
      'Crafting high-converting, modern, and intuitive user experiences validated through interactive clickable prototypes.',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    accentColor: '#ec4899',
    badge: 'Phase 03: Experience & Interface',
    pillars: [
      {
        title: 'User Experience (UX)',
        desc: 'Frictionless navigation patterns designed for high adoption and speed.',
      },
      {
        title: 'High-Fidelity UI',
        desc: 'Pixel-perfect responsive interfaces tailored with rich modern aesthetics.',
      },
      {
        title: 'Component Design System',
        desc: 'Reusable component libraries, design tokens, and comprehensive style guides.',
      },
    ],
    deliverables: [
      'Clickable Figma Prototype',
      'Production-Ready UI Component Library',
      'Complete User Flow Specs',
    ],
  },
  {
    number: '04',
    id: 'develop',
    name: 'Develop',
    title: 'Scalable Clean-Code Build',
    subtitle: 'Modern Frameworks • API Integrations • Security',
    description:
      'Building robust, modular software using modern tech stacks with continuous integration and clean code standards.',
    icon: Code2,
    color: 'from-emerald-500 to-teal-500',
    accentColor: '#10b981',
    badge: 'Phase 04: Engineering & Implementation',
    pillars: [
      {
        title: 'Frontend & Mobile',
        desc: 'High-performance React, Next.js, and mobile applications with 60fps fluidity.',
      },
      {
        title: 'Backend & APIs',
        desc: 'Scalable REST / GraphQL APIs, asynchronous event processing, and microservices.',
      },
      {
        title: 'Database & Integrations',
        desc: 'PostgreSQL, Redis caching, third-party ERP/CRM hooks, and webhooks.',
      },
    ],
    deliverables: [
      'Modular Clean-Code Repository',
      'Comprehensive API Documentation',
      'Live Staging Environment Access',
    ],
  },
  {
    number: '05',
    id: 'test-launch',
    name: 'Test & Launch',
    title: 'Quality Assurance & Deployment',
    subtitle: 'Stress Testing • Bug Fixes • Cloud Launch',
    description:
      'Exhaustive automated testing, load benchmarks, vulnerability checks, and zero-downtime production deployment.',
    icon: Rocket,
    color: 'from-amber-500 to-orange-500',
    accentColor: '#f59e0b',
    badge: 'Phase 05: Validation & Deployment',
    pillars: [
      {
        title: 'Automated & Manual QA',
        desc: 'Cross-browser testing, edge-case validation, and regression suites.',
      },
      {
        title: 'Stress & Security Testing',
        desc: 'Penetration tests, load-handling audits, and data protection verification.',
      },
      {
        title: 'Production Go-Live',
        desc: 'Automated CI/CD deployment, CDN caching setup, and DNS cutover.',
      },
    ],
    deliverables: [
      'QA Sign-Off & Test Audit Report',
      'Cloud Infrastructure Setup',
      'Live Production Release',
    ],
  },
  {
    number: '06',
    id: 'support',
    name: 'Support',
    title: 'Continuous Evolution & SLA',
    subtitle: '24/7 Monitoring • Feature Updates • Scaling',
    description:
      'Proactive monitoring, rapid SLA incident resolution, performance tuning, and ongoing feature updates to power long-term growth.',
    icon: Headphones,
    color: 'from-violet-500 to-purple-600',
    accentColor: '#8b5cf6',
    badge: 'Phase 06: Support & Growth',
    pillars: [
      {
        title: '24/7 Uptime Monitoring',
        desc: 'Real-time telemetry, server health alerts, and instant incident response.',
      },
      {
        title: 'Performance & Optimization',
        desc: 'Continuous query tuning, memory optimization, and security patches.',
      },
      {
        title: 'Feature Enhancements',
        desc: 'Agile feature additions based on user feedback and changing market needs.',
      },
    ],
    deliverables: [
      'Guaranteed SLA Coverage',
      'Monthly Health & Analytics Reports',
      'Dedicated Technical Support Desk',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Interactive 'How We Work' Process Section
// ─────────────────────────────────────────────────────────────────────────────
function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = WORKFLOW_STEPS[activeStep];
  const StepIcon = current.icon;

  return (
    <section className="relative py-24 bg-[#080818] overflow-hidden">
      {/* Background glowing blooms */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-20"
          style={{ background: `radial-gradient(circle, ${current.accentColor} 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 dot-bg opacity-[0.04]" />
      </div>

      <div className="relative site-container" style={{ zIndex: 10 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-bold tracking-[0.25em] uppercase mb-4 text-purple-300">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            HOW WE WORK
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-[1.12]">
            From Idea to Impact,
            <br />
            <span className="text-gradient">We Build With You</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Our proven process combines business understanding, design, technology and continuous
            support to create solutions that grow with your business.
          </p>
        </motion.div>

        {/* ── Interactive 6-Step Horizontal Tabs ── */}
        <div className="mb-10">
          <div className="flex items-center justify-start lg:justify-between gap-2.5 sm:gap-3 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar select-none">
            {WORKFLOW_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const IconComponent = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex-shrink-0 flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-900/40 ring-1 ring-white/25 scale-[1.02]'
                      : 'text-gray-400 bg-[#0e0e24]/80 hover:bg-[#151536] hover:text-white border border-white/8 hover:border-purple-500/30'
                  }`}
                >
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded-md transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-purple-300/80 group-hover:text-purple-200'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="tracking-wide">{step.name}</span>

                  {/* Active down-pointer indicator arrow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepArrow"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[7px] border-x-transparent border-t-[8px] border-t-pink-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Detailed Active Step Showcase Card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden backdrop-blur-2xl border border-purple-500/25 p-7 sm:p-10 lg:p-12 shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(20,20,48,0.75) 0%, rgba(10,10,28,0.92) 100%)',
              boxShadow: `0 0 0 1px rgba(168,85,247,0.12), 0 20px 60px -15px rgba(0,0,0,0.7), 0 0 50px -10px ${current.accentColor}25`,
            }}
          >
            {/* Subtle top card glow line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${current.accentColor} 50%, transparent 100%)`,
              }}
            />

            {/* Top row: Badge & Step counter */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center shadow-lg`}
                >
                  <StepIcon size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-purple-300/80">
                    {current.badge}
                  </div>
                  <div className="text-sm font-semibold text-gray-400">
                    Step {current.number} of 06
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.accentColor }} />
                {current.subtitle}
              </div>
            </div>

            {/* Step Heading & Description */}
            <div className="max-w-3xl mb-10">
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="text-2xl sm:text-3xl font-black font-mono tracking-tight"
                  style={{ color: current.accentColor }}
                >
                  {current.number}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {current.title}
                </h3>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* 3 Focus Pillar Cards */}
            <div className="mb-10">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2 font-mono">
                <Layers size={14} className="text-purple-400" />
                Key Focus Pillars
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {current.pillars.map((pillar, i) => (
                  <div
                    key={pillar.title}
                    className="group relative p-5 rounded-2xl bg-[#121230]/70 border border-white/8 hover:border-purple-500/30 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold flex items-center justify-center border border-purple-500/30">
                        {i + 1}
                      </span>
                      <h4 className="text-white font-bold text-sm tracking-wide">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Deliverables Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400 mb-3 font-mono flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Key Deliverables
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {current.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/25 text-xs font-medium text-purple-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-purple-900/30 hover:-translate-y-0.5 flex-shrink-0"
              >
                <span>Discuss This Phase</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#080818]">

      {/* ══════════════════════════════════════════════════
          HERO — cinematic two-column layout
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#04040f]">

        {/* ── VIDEO: futuristic tech — confirmed 200 OK URLs ──
            3129957 = "Digital Projection Of The Earth Mass In Blue Lights"
                      Rotating digital globe, blue neon light patterns, pure dark bg
            3141211 = "Digital Calculation Of Geometrical Space"
                      Abstract digital network, glowing geometric connections, dark bg
            3130284 = Abstract tech data flow (fallback)
        ── */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.70] pointer-events-none"
          style={{ filter: 'brightness(1.35) saturate(1.5) contrast(1.1) hue-rotate(10deg)' }}
          aria-hidden="true"
        >
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>

        {/* ── Overlay: minimal — video must be the dominant visual ──
            Only a left-side text ramp + light top/bottom vignette.
            NO heavy colour-grade, NO full-screen dark wash.
        ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(4,4,15,0.82) 0%, rgba(4,4,15,0.55) 28%, rgba(4,4,15,0.12) 52%, transparent 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04040f]/45 via-transparent to-[#04040f]/88 pointer-events-none" />
        {/* Subtle purple tint — just enough to tie into brand, not a mask */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.22) 0%, transparent 45%)', mixBlendMode: 'screen' }} />

        {/* ── Minimal neon accent glows — depth without hiding video ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Soft purple bloom top-left — behind text only */}
          <div className="absolute -top-20 -left-20 w-[500px] h-[450px] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 65%)' }} />
          {/* Cyan accent bottom-right */}
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[350px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 65%)' }} />
          {/* Single floating orb — animated */}
          <div className="absolute top-[20%] right-[15%] w-48 h-48 rounded-full blur-[70px] animate-float"
            style={{ background: 'rgba(139,92,246,0.22)' }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[250px] blur-[60px]"
            style={{ background: 'linear-gradient(to top, rgba(30,27,75,0.50) 0%, transparent 100%)' }} />
        </div>

        {/* ── Subtle dot grid ── */}
        <div className="absolute inset-0 dot-bg opacity-[0.05] pointer-events-none" />

        {/* ── CONTENT ── */}
        <div className="relative site-container py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-5 gap-12 items-center">

            {/* LEFT: headline */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              {/* Animated radial glow behind heading */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 70%)' }} />

              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/8 text-xs font-bold mb-6 tracking-widest uppercase backdrop-blur-sm"
                style={{ color: '#a855f7' }}
              >
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
                TarunaTech Services
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.9)]" />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-black text-white mb-5 leading-[1.04]">
                <span className="block">Comprehensive IT Solutions</span>
                <span className="block text-gradient drop-shadow-[0_0_40px_rgba(168,85,247,0.55)]">
                  Built for Your Business
                </span>
              </h1>

              <p className="text-gray-200 text-base max-w-xl leading-relaxed mb-2">
                From custom software development to AI solutions, we deliver end-to-end technology services that transform businesses and drive measurable results.
              </p>
              <p className="text-purple-300/80 text-sm font-medium mb-8">
                Enterprise-grade. Scalable. Delivered on time.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.4)]"
                >
                  Get Your Consultation
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-white/15 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-purple-500/50 transition-all duration-200 backdrop-blur-md"
                >
                  Explore Services
                </a>
              </div>
            </motion.div>

            {/* RIGHT: floating glass dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2 hidden lg:block"
            >
              <ServicesDashboard />
            </motion.div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080818] to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════════════════ */}
      <section id="services" className="relative pt-8 pb-24 bg-[#080818] overflow-hidden">
        <GradientMesh />
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-12" />
        <div className="relative site-container" style={{ zIndex: 10 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-7">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code2;
              const colorStr = colorMap[service.color] || colorMap.purple;
              const parts = colorStr.split(' ');
              const bgGrad = parts[0] + ' ' + parts[1];
              const borderColor = parts[2];
              const iconColor = parts[3];
              // Map color name to RGB for PremiumCard
              const rgbMap = {
                purple:  '168,85,247',
                blue:    '59,130,246',
                magenta: '236,72,153',
                green:   '34,197,94',
                orange:  '249,115,22',
                cyan:    '34,211,238',
                sky:     '56,189,248',
                violet:  '139,92,246',
                teal:    '20,184,166',
              };
              const rgb = rgbMap[service.color] || '168,85,247';
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <Link href={`/services/${service.id}`}>
                    <PremiumCard rgb={rgb} className="p-8 xl:p-9 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgGrad} flex items-center justify-center mb-5`}
                        style={{ boxShadow: `0 0 0 1px rgba(${rgb},0.20)` }}>
                        <Icon size={22} className={iconColor} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        {service.shortDesc}
                      </p>
                      <div className={`flex items-center gap-1 text-sm font-medium ${iconColor} transition-all`}>
                        <span>Learn More</span>
                        <ArrowRight size={14} />
                      </div>
                    </PremiumCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          HOW WE WORK — 6-Step Interactive Workflow
      ══════════════════════════════════════════════════ */}
      <HowWeWorkSection />

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0b0b1f]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12 border border-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl font-black text-white mb-4">Not Sure Which Service You Need?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Our experts will analyze your business requirements and recommend the perfect solution. Get your consultation today.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
              >
                Get Your Consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
