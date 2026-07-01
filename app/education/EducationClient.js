'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Clock,
  Code2, Brain, Smartphone, Globe, Zap,
  Server, Palette, BarChart2, Pen, Briefcase, TrendingUp,
} from 'lucide-react';
import { educationCourses } from '@/lib/data';
import PremiumCard from '@/components/PremiumCard';
import GradientMesh from '@/components/GradientMesh';
import CourseEnrollmentModal from '@/components/CourseEnrollmentModal';

// ── Course icon map ──────────────────────────────────────
const courseIconMap = {
  fullstack:                 Code2,
  'ai-ml':                   Brain,
  'mobile-app-development':  Smartphone,
  'frontend-development':    Globe,
  'backend-development':     Zap,
  reactjs:                   Code2,
  nodejs:                    Server,
  'web-design':              Palette,
  'data-analysis':           BarChart2,
  'graphic-design-course':   Pen,
  'hr-business-development': Briefcase,
  'digital-marketing-course':TrendingUp,
};

// ── Color theme map ──────────────────────────────────────
const colorTheme = {
  purple: { card:'from-purple-500/10 to-purple-600/5 border-purple-500/25', hover:'hover:border-purple-400/50', glow:'group-hover:shadow-purple-500/20', icon:'text-purple-400 bg-purple-500/15', tag:'bg-purple-500/10 text-purple-300 border-purple-500/20', btn:'text-purple-400 hover:text-purple-300', badge:'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  violet: { card:'from-violet-500/10 to-violet-600/5 border-violet-500/25', hover:'hover:border-violet-400/50', glow:'group-hover:shadow-violet-500/20', icon:'text-violet-400 bg-violet-500/15', tag:'bg-violet-500/10 text-violet-300 border-violet-500/20', btn:'text-violet-400 hover:text-violet-300', badge:'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  blue:   { card:'from-blue-500/10 to-blue-600/5 border-blue-500/25',   hover:'hover:border-blue-400/50',   glow:'group-hover:shadow-blue-500/20',   icon:'text-blue-400 bg-blue-500/15',   tag:'bg-blue-500/10 text-blue-300 border-blue-500/20',   btn:'text-blue-400 hover:text-blue-300',   badge:'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  cyan:   { card:'from-cyan-500/10 to-cyan-600/5 border-cyan-500/25',   hover:'hover:border-cyan-400/50',   glow:'group-hover:shadow-cyan-500/20',   icon:'text-cyan-400 bg-cyan-500/15',   tag:'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',   btn:'text-cyan-400 hover:text-cyan-300',   badge:'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  green:  { card:'from-green-500/10 to-green-600/5 border-green-500/25', hover:'hover:border-green-400/50', glow:'group-hover:shadow-green-500/20', icon:'text-green-400 bg-green-500/15', tag:'bg-green-500/10 text-green-300 border-green-500/20', btn:'text-green-400 hover:text-green-300', badge:'bg-green-500/20 text-green-300 border-green-500/30' },
  sky:    { card:'from-sky-500/10 to-sky-600/5 border-sky-500/25',     hover:'hover:border-sky-400/50',   glow:'group-hover:shadow-sky-500/20',   icon:'text-sky-400 bg-sky-500/15',     tag:'bg-sky-500/10 text-sky-300 border-sky-500/20',     btn:'text-sky-400 hover:text-sky-300',     badge:'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  lime:   { card:'from-lime-500/10 to-lime-600/5 border-lime-500/25',   hover:'hover:border-lime-400/50',   glow:'group-hover:shadow-lime-500/20',   icon:'text-lime-400 bg-lime-500/15',   tag:'bg-lime-500/10 text-lime-300 border-lime-500/20',   btn:'text-lime-400 hover:text-lime-300',   badge:'bg-lime-500/20 text-lime-300 border-lime-500/30' },
  pink:   { card:'from-pink-500/10 to-pink-600/5 border-pink-500/25',   hover:'hover:border-pink-400/50',   glow:'group-hover:shadow-pink-500/20',   icon:'text-pink-400 bg-pink-500/15',   tag:'bg-pink-500/10 text-pink-300 border-pink-500/20',   btn:'text-pink-400 hover:text-pink-300',   badge:'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  orange: { card:'from-orange-500/10 to-orange-600/5 border-orange-500/25', hover:'hover:border-orange-400/50', glow:'group-hover:shadow-orange-500/20', icon:'text-orange-400 bg-orange-500/15', tag:'bg-orange-500/10 text-orange-300 border-orange-500/20', btn:'text-orange-400 hover:text-orange-300', badge:'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  red:    { card:'from-red-500/10 to-red-600/5 border-red-500/25',     hover:'hover:border-red-400/50',   glow:'group-hover:shadow-red-500/20',   icon:'text-red-400 bg-red-500/15',     tag:'bg-red-500/10 text-red-300 border-red-500/20',     btn:'text-red-400 hover:text-red-300',     badge:'bg-red-500/20 text-red-300 border-red-500/30' },
  teal:   { card:'from-teal-500/10 to-teal-600/5 border-teal-500/25',   hover:'hover:border-teal-400/50',   glow:'group-hover:shadow-teal-500/20',   icon:'text-teal-400 bg-teal-500/15',   tag:'bg-teal-500/10 text-teal-300 border-teal-500/20',   btn:'text-teal-400 hover:text-teal-300',   badge:'bg-teal-500/20 text-teal-300 border-teal-500/30' },
  yellow: { card:'from-yellow-500/10 to-yellow-600/5 border-yellow-500/25', hover:'hover:border-yellow-400/50', glow:'group-hover:shadow-yellow-500/20', icon:'text-yellow-400 bg-yellow-500/15', tag:'bg-yellow-500/10 text-yellow-300 border-yellow-500/20', btn:'text-yellow-400 hover:text-yellow-300', badge:'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
};

// ── Tech tags per course ─────────────────────────────────
const courseTechTags = {
  fullstack:                  ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
  'ai-ml':                    ['Python', 'TensorFlow', 'Keras', 'Scikit-learn'],
  'mobile-app-development':   ['React Native', 'Flutter', 'Firebase', 'Dart'],
  'frontend-development':     ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
  'backend-development':      ['Node.js', 'Express.js', 'PostgreSQL', 'Docker'],
  reactjs:                    ['React.js', 'Redux', 'React Router', 'Vite'],
  nodejs:                     ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  'web-design':               ['Figma', 'Adobe XD', 'CSS3', 'Bootstrap'],
  'data-analysis':            ['Python', 'Pandas', 'Power BI', 'SQL'],
  'graphic-design-course':    ['Photoshop', 'Illustrator', 'Figma', 'Canva'],
  'hr-business-development':  ['CRM Tools', 'Recruitment', 'Sales Strategy', 'LinkedIn'],
  'digital-marketing-course': ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'],
};

const FEATURED_IDS = [
  'fullstack','ai-ml','mobile-app-development','frontend-development',
  'backend-development','reactjs','nodejs','web-design',
  'data-analysis','graphic-design-course','hr-business-development','digital-marketing-course',
];

// ── Animated terminal lines ──────────────────────────────
const TERMINAL_LINES = [
  { text: '$ npm install taruna-skills',        color: 'text-green-400',  delay: 0 },
  { text: 'Resolving packages...',              color: 'text-gray-500',   delay: 0.4 },
  { text: '✓ Full Stack / MERN',               color: 'text-cyan-400',   delay: 0.8 },
  { text: '✓ AI & Machine Learning',           color: 'text-violet-400', delay: 1.1 },
  { text: '✓ Mobile App Development',          color: 'text-blue-400',   delay: 1.4 },
  { text: '✓ Frontend & Backend Dev',          color: 'text-cyan-400',   delay: 1.7 },
  { text: '✓ React.js & Node.js',              color: 'text-sky-400',    delay: 2.0 },
  { text: '✓ Web Design & Data Analysis',      color: 'text-pink-400',   delay: 2.3 },
  { text: '✓ Graphic & Digital Marketing',     color: 'text-orange-400', delay: 2.6 },
  { text: '✓ HR & Business Development',       color: 'text-teal-400',   delay: 2.9 },
  { text: '12 courses installed successfully', color: 'text-gray-400',   delay: 3.2 },
  { text: '→ Ready to launch your career 🚀',  color: 'text-purple-400', delay: 3.5 },
];

// ── Hero right panel — Terminal + Courses only ──────────
function HeroDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Terminal', 'Courses'];

  const courseList = [
    { name: 'Full Stack / MERN',     bar: 'from-purple-500 to-violet-400', pct: 92 },
    { name: 'AI / Machine Learning', bar: 'from-violet-500 to-violet-400', pct: 88 },
    { name: 'React.js',              bar: 'from-sky-500 to-cyan-400',      pct: 85 },
    { name: 'Mobile App Dev',        bar: 'from-blue-500 to-blue-400',     pct: 78 },
    { name: 'Frontend Development',  bar: 'from-pink-500 to-pink-400',     pct: 75 },
    { name: 'Backend Development',   bar: 'from-green-500 to-emerald-400', pct: 73 },
    { name: 'Data Analysis',         bar: 'from-orange-500 to-amber-400',  pct: 70 },
    { name: 'Digital Marketing',     bar: 'from-yellow-500 to-yellow-400', pct: 65 },
  ];

  return (
    <div className="glass rounded-2xl border border-purple-500/25 overflow-hidden backdrop-blur-xl shadow-2xl shadow-purple-900/30">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/[0.06]">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[10px] text-gray-500 font-mono tracking-wider">taruna-edu v2.0</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-green-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          LIVE
        </span>
        <div className="ml-3 flex gap-1">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === i
                  ? 'bg-purple-500/25 text-purple-300 border border-purple-500/30'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Terminal */}
      {activeTab === 0 && (
        <div className="p-5 font-mono text-xs space-y-1.5 min-h-[360px]">
          {TERMINAL_LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: line.delay, duration: 0.3 }}
              className={line.color}
            >
              {line.text}
            </motion.p>
          ))}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.9 }} className="text-gray-700 pt-1">
            ─────────────────────────────
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.1 }} className="text-cyan-500/80">
            $ taruna --start-learning
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.4 }} className="text-green-400/80">
            ✓ Mentor sessions activated
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.7 }} className="text-purple-400/80">
            ✓ Live projects unlocked
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.0 }}
            className="inline-block w-2 h-4 bg-green-400 animate-pulse mt-1"
          />
        </div>
      )}

      {/* Tab: Courses */}
      {activeTab === 1 && (
        <div className="p-5 space-y-2.5 min-h-[360px]">
          <p className="text-gray-500 text-[10px] mb-4 font-mono tracking-wider uppercase">
            // enrollment popularity — 12 programs
          </p>
          {courseList.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="space-y-1"
            >
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">{c.name}</span>
                <span className="text-gray-500 font-mono">{c.pct}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{ delay: i * 0.07 + 0.15, duration: 0.65, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${c.bar} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-600 text-[10px] font-mono pt-2 border-t border-white/[0.05]"
          >
            + 4 more: Web Design · Graphic Design · HR · Node.js
          </motion.p>
        </div>
      )}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────
export default function EducationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleEnrollClick = (courseTitle) => {
    setSelectedCourse(courseTitle || 'General Inquiry');
    setIsModalOpen(true);
  };

  const featuredCourses = FEATURED_IDS
    .map((id) => educationCourses.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#080818]">

      {/* Course Enrollment Modal */}
      <CourseEnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCourse={selectedCourse}
      />

      {/* ══════════════════════════════════════════════════
          PREMIUM HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[96vh] flex items-center overflow-hidden bg-[#04040f]">

        {/* ── VIDEO: real coding / developer environment ──
            edu-hero.mp4   = Pexels 8632602 "People Programming on a Computer"
                             Real developers at screens, coding environment
            edu-hero-2.mp4 = Pexels 7989833 "Computer Programmers Working"
                             Programmers collaborating, modern workspace
            Both confirmed HTTP 200 OK, served locally from /public.
        ── */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.52] pointer-events-none"
          style={{ filter: 'brightness(1.15) saturate(1.3) contrast(1.05)' }}
          aria-hidden="true"
        >
          <source src="/edu-hero.mp4"   type="video/mp4" />
          <source src="/edu-hero-2.mp4" type="video/mp4" />
        </video>

        {/* ── Cinematic colour grade — cyan/purple tint for coding identity ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(8,30,63,0.62) 0%, rgba(30,27,75,0.30) 50%, rgba(88,28,135,0.50) 100%)', mixBlendMode: 'multiply' }} />

        {/* ── Left text-readability ramp ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(4,4,15,0.90) 0%, rgba(4,4,15,0.65) 32%, rgba(4,4,15,0.18) 58%, transparent 100%)' }} />

        {/* ── Top & bottom vignette ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04040f]/60 via-transparent to-[#04040f]/92 pointer-events-none" />

        {/* ── Minimal accent glows — depth without masking video ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-[600px] h-[550px] rounded-full blur-[160px]"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 65%)' }} />
          <div className="absolute top-[10%] right-[-4%] w-[500px] h-[500px] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[250px] blur-[70px]"
            style={{ background: 'linear-gradient(to top, rgba(30,27,75,0.55) 0%, transparent 100%)' }} />
          <div className="absolute top-[18%] right-[14%] w-52 h-52 rounded-full blur-[70px] animate-float"
            style={{ background: 'rgba(34,211,238,0.16)' }} />
        </div>

        {/* ── Subtle dot grid ── */}
        <div className="absolute inset-0 dot-bg opacity-[0.05] pointer-events-none" />

        {/* ── CONTENT ── */}
        <div className="relative site-container py-20 lg:py-28 w-full">
          <div className="grid lg:grid-cols-5 gap-12 items-center">

            {/* LEFT: headline + CTAs + course tags */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3 relative"
            >
              {/* Animated radial glow behind heading */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)' }} />

              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-xs text-cyan-300 mb-6 tracking-widest uppercase backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.12)]"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                TarunaTech Education Platform
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              </motion.div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-black text-white mb-5 leading-[1.04]">
                <span className="block text-white">TarunaTech Education —</span>
                <span className="block text-gradient drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]">
                  Empowering Global
                </span>
                <span className="block text-white">IT Innovators</span>
              </h1>

              <p className="text-gray-200 text-base max-w-xl leading-relaxed mb-2">
                Get trained by world-class professionals. Master industry-leading technologies. Earn globally recognized certifications.
              </p>
              <p className="text-cyan-300/90 text-sm font-medium mb-8">
                Transform your potential, compete globally, lead the future.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={() => handleEnrollClick('')}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.4)]"
                >
                  Enroll Now
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-white/15 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-purple-500/50 transition-all duration-200 backdrop-blur-md"
                >
                  View Courses
                </a>
              </div>

              {/* All 12 course tags */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-2 max-w-xl"
              >
                {[
                  { label: 'Full Stack',        color: 'border-purple-500/45 text-purple-200 bg-purple-500/12',  shadow: '0 0 14px rgba(168,85,247,0.20)' },
                  { label: 'AI / ML',           color: 'border-violet-500/45 text-violet-200 bg-violet-500/12', shadow: '0 0 14px rgba(139,92,246,0.20)' },
                  { label: 'React.js',          color: 'border-cyan-500/45 text-cyan-200 bg-cyan-500/12',       shadow: '0 0 14px rgba(34,211,238,0.20)' },
                  { label: 'Mobile Apps',       color: 'border-blue-500/45 text-blue-200 bg-blue-500/12',       shadow: '0 0 14px rgba(59,130,246,0.20)' },
                  { label: 'Backend Dev',       color: 'border-green-500/45 text-green-200 bg-green-500/12',    shadow: '0 0 14px rgba(34,197,94,0.20)' },
                  { label: 'Frontend Dev',      color: 'border-pink-500/45 text-pink-200 bg-pink-500/12',       shadow: '0 0 14px rgba(236,72,153,0.20)' },
                  { label: 'Data Analysis',     color: 'border-orange-500/45 text-orange-200 bg-orange-500/12', shadow: '0 0 14px rgba(249,115,22,0.20)' },
                  { label: 'UI / UX',           color: 'border-pink-400/45 text-pink-200 bg-pink-400/10',       shadow: '0 0 14px rgba(244,114,182,0.20)' },
                  { label: 'Graphic Design',    color: 'border-red-500/45 text-red-200 bg-red-500/12',          shadow: '0 0 14px rgba(239,68,68,0.20)' },
                  { label: 'Digital Marketing', color: 'border-yellow-500/45 text-yellow-200 bg-yellow-500/12', shadow: '0 0 14px rgba(234,179,8,0.20)' },
                  { label: 'HR Management',     color: 'border-teal-500/45 text-teal-200 bg-teal-500/12',       shadow: '0 0 14px rgba(20,184,166,0.20)' },
                  { label: 'Business Dev',      color: 'border-sky-500/45 text-sky-200 bg-sky-500/12',          shadow: '0 0 14px rgba(56,189,248,0.20)' },
                ].map((pill, i) => (
                  <motion.span
                    key={pill.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.28, delay: 0.5 + i * 0.055 }}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-sm whitespace-nowrap ${pill.color}`}
                    style={{ boxShadow: pill.shadow }}
                  >
                    {pill.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: terminal dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:col-span-2 hidden lg:block"
            >
              <HeroDashboard />
            </motion.div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080818] to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════════
          COURSE CARDS GRID
      ══════════════════════════════════════════════════ */}
      <section id="courses" className="relative py-24 bg-[#0b0b1f] overflow-hidden">
        <GradientMesh />
        <div className="relative site-container" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/8 text-xs font-bold mb-4 tracking-widest uppercase" style={{ color: '#FFD54A' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Industry-Aligned Programs
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Our <span className="text-gradient">Featured Courses</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              Comprehensive, hands-on programs designed to make you job-ready from day one. Real projects, real skills, real careers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-6">
            {featuredCourses.map((course, index) => {
              const theme = colorTheme[course.color] || colorTheme.purple;
              const Icon = courseIconMap[course.id] || Code2;
              const tags = courseTechTags[course.id] || [];
              // Map color name to RGB for PremiumCard
              const rgbMap = {
                purple:'168,85,247', violet:'139,92,246', blue:'59,130,246',
                cyan:'34,211,238', green:'34,197,94', sky:'56,189,248',
                lime:'132,204,22', pink:'236,72,153', orange:'249,115,22',
                red:'239,68,68', teal:'20,184,166', yellow:'234,179,8',
              };
              const rgb = rgbMap[course.color] || '168,85,247';
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.52, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PremiumCard rgb={rgb} className="p-6 xl:p-7 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${theme.icon}`}
                        style={{ boxShadow: `0 0 0 1px rgba(${rgb},0.20)` }}>
                        <Icon size={20} />
                      </div>
                      {course.badge && (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${theme.badge}`}>
                          {course.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4">{course.tagline}</p>
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-xs text-gray-400">
                        <Clock size={10} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-xs text-gray-400">
                        {course.level}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {tags.map((tag) => (
                        <span key={tag} className={`px-2 py-0.5 rounded-md border text-[10px] font-medium ${theme.tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/education/${course.id}`}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${theme.btn}`}
                    >
                      Explore Course
                      <ArrowRight size={13} />
                    </Link>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#080818]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="glass-card rounded-3xl p-12 border border-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/6 to-pink-500/4 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/8 text-xs font-bold mb-5 tracking-widest uppercase" style={{ color: '#FFD54A' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                Start Today
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Start Your Learning Journey
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Join hundreds of students who have transformed their careers with Taruna Technology Education. Real skills, real projects, real results.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => handleEnrollClick('')}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
                >
                  Apply Now
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-200"
                >
                  Ask a Question
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
