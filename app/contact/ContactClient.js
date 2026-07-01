'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { companyInfo, services } from '@/lib/data';


export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [sendError, setSendError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendError('');
    setSending(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          name:     form.name,
          email:    form.email,
          phone:    form.phone,
          service:  form.service || '',
          message:  form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message.');
      }
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => { setSubmitted(false); }, 5000);
    } catch (err) {
      console.error('[ContactForm] error:', err);
      setSendError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#080818]">

      {/* ── Hero — cinematic two-column layout ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#04040f]">

        {/* ── Layer 0: Deep space base — unique dark gradient, no video ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 120% 100% at 70% 50%, #0d0528 0%, #060418 40%, #04040f 100%)' }} />
        </div>

        {/* ── Layer 1: Communication hub SVG — unique to Contact page ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
          <svg className="absolute right-[-4%] top-1/2 -translate-y-1/2 w-[700px] h-[700px]"
            viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <radialGradient id="ch-hub" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(168,85,247,0.22)" />
                <stop offset="100%" stopColor="rgba(139,92,246,0)" />
              </radialGradient>
              <radialGradient id="ch-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(232,121,249,0.90)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0.40)" />
              </radialGradient>
              <linearGradient id="ch-r1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168,85,247,0.80)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0)" />
              </linearGradient>
              <linearGradient id="ch-r2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.70)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0)" />
              </linearGradient>
              <linearGradient id="ch-r3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(236,72,153,0.65)" />
                <stop offset="100%" stopColor="rgba(236,72,153,0)" />
              </linearGradient>
              <filter id="ch-gs"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="ch-gl"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            {/* Ambient glow */}
            <circle cx="300" cy="300" r="260" fill="url(#ch-hub)" />
            {/* Rotating dashed rings */}
            {[80,130,185,245].map((r,i) => (
              <circle key={i} cx="300" cy="300" r={r} stroke="rgba(168,85,247,0.12)" strokeWidth="0.7" fill="none" strokeDasharray="6 10">
                <animateTransform attributeName="transform" type="rotate" from={`0 300 300`} to={`${i%2===0?360:-360} 300 300`} dur={`${18+i*6}s`} repeatCount="indefinite"/>
              </circle>
            ))}
            {/* Hexagonal hub */}
            <polygon points="300,240 352,270 352,330 300,360 248,330 248,270" stroke="rgba(168,85,247,0.55)" strokeWidth="1.2" fill="rgba(168,85,247,0.06)" filter="url(#ch-gs)">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
            </polygon>
            <polygon points="300,258 334,276 334,312 300,330 266,312 266,276" stroke="rgba(232,121,249,0.40)" strokeWidth="0.8" fill="rgba(232,121,249,0.04)"/>
            {/* Core pulse */}
            <circle cx="300" cy="300" r="18" fill="url(#ch-core)" filter="url(#ch-gl)">
              <animate attributeName="r" values="16;20;16" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="300" cy="300" r="8" fill="rgba(255,255,255,0.90)" filter="url(#ch-gs)"/>
            {/* 8 transmission rays */}
            {[0,45,90,135,180,225,270,315].map((angle,i) => {
              const rad=(angle*Math.PI)/180;
              const x2=+(300+Math.cos(rad)*240).toFixed(2), y2=+(300+Math.sin(rad)*240).toFixed(2);
              const ids=['ch-r1','ch-r2','ch-r3','ch-r1','ch-r2','ch-r3','ch-r1','ch-r2'];
              return <line key={i} x1="300" y1="300" x2={x2} y2={y2} stroke={`url(#${ids[i]})`} strokeWidth="0.7" opacity="0.5">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2.5+i*0.3}s`} begin={`${i*0.2}s`} repeatCount="indefinite"/>
              </line>;
            })}
            {/* Floating data packets */}
            {[
              {angle:30, dist:120, color:'rgba(232,121,249,1)', r:3.5, dur:'3.0s', delay:'0s'},
              {angle:110,dist:160, color:'rgba(34,211,238,1)',  r:3.0, dur:'3.8s', delay:'0.8s'},
              {angle:200,dist:140, color:'rgba(168,85,247,1)',  r:2.5, dur:'4.2s', delay:'1.5s'},
              {angle:290,dist:180, color:'rgba(244,114,182,1)', r:3.0, dur:'3.5s', delay:'0.4s'},
              {angle:60, dist:200, color:'rgba(34,211,238,1)',  r:2.0, dur:'5.0s', delay:'2.0s'},
              {angle:160,dist:100, color:'rgba(192,132,252,1)', r:2.5, dur:'2.8s', delay:'1.2s'},
            ].map((p,i) => {
              const rad=(p.angle*Math.PI)/180;
              const cx=+(300+Math.cos(rad)*p.dist).toFixed(2), cy=+(300+Math.sin(rad)*p.dist).toFixed(2);
              const dx=+(Math.cos(rad)*p.dist).toFixed(2), dy=+(Math.sin(rad)*p.dist).toFixed(2);
              const path=`M0,0 L${dx},${dy}`;
              return <g key={i}>
                <circle cx={cx} cy={cy} r={p.r} fill={p.color} filter="url(#ch-gs)">
                  <animate attributeName="opacity" values="0;1;1;0" dur={p.dur} begin={p.delay} repeatCount="indefinite"/>
                  <animateMotion path={path} dur={p.dur} begin={p.delay} repeatCount="indefinite"/>
                </circle>
                <circle cx={cx} cy={cy} r={p.r*2.2} fill="none" stroke={p.color} strokeWidth="0.5" opacity="0">
                  <animate attributeName="opacity" values="0;0.4;0" dur={p.dur} begin={p.delay} repeatCount="indefinite"/>
                  <animateMotion path={path} dur={p.dur} begin={p.delay} repeatCount="indefinite"/>
                </circle>
              </g>;
            })}
            {/* 6 satellite nodes */}
            {[0,60,120,180,240,300].map((angle,i) => {
              const rad=(angle*Math.PI)/180;
              const cx=+(300+Math.cos(rad)*200).toFixed(2), cy=+(300+Math.sin(rad)*200).toFixed(2);
              const c=['rgba(232,121,249,1)','rgba(34,211,238,1)','rgba(168,85,247,1)','rgba(244,114,182,1)','rgba(34,211,238,1)','rgba(192,132,252,1)'][i];
              return <g key={i}>
                <circle cx={cx} cy={cy} r="10" fill="rgba(168,85,247,0.08)" stroke={c} strokeWidth="0.8" opacity="0.7">
                  <animate attributeName="opacity" values="0.5;0.9;0.5" dur={`${2.8+i*0.4}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
                </circle>
                <circle cx={cx} cy={cy} r="4" fill={c} filter="url(#ch-gs)">
                  <animate attributeName="r" values="3;5;3" dur={`${2.8+i*0.4}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
                </circle>
                <circle cx={cx} cy={cy} r="14" fill="none" stroke={c} strokeWidth="0.5" opacity="0">
                  <animate attributeName="r" values="10;22;10" dur={`${3.5+i*0.3}s`} begin={`${i*0.5}s`} repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur={`${3.5+i*0.3}s`} begin={`${i*0.5}s`} repeatCount="indefinite"/>
                </circle>
              </g>;
            })}
            {/* Particle wave — bottom */}
            {Array.from({length:18}).map((_,i) => {
              const x=60+i*27, baseY=520, amp=18;
              return <circle key={i} cx={x} cy={baseY} r="1.5" fill="rgba(168,85,247,0.55)" opacity="0.6">
                <animate attributeName="cy" values={`${baseY};${baseY-amp};${baseY}`} dur={`${1.8+(i%4)*0.3}s`} begin={`${(i*0.08).toFixed(2)}s`} repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${1.8+(i%4)*0.3}s`} begin={`${(i*0.08).toFixed(2)}s`} repeatCount="indefinite"/>
              </circle>;
            })}
          </svg>
        </div>

        {/* ── Layer 2: Cinematic overlays ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }} aria-hidden="true">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(4,4,15,0.96) 0%, rgba(4,4,15,0.80) 28%, rgba(4,4,15,0.35) 52%, rgba(4,4,15,0.08) 72%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(4,4,15,0.50) 0%, transparent 18%, transparent 60%, rgba(8,8,24,0.97) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.22) 0%, transparent 48%)', mixBlendMode: 'screen' }} />
          <div className="absolute -top-20 -left-20 w-[520px] h-[460px] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.30) 0%, transparent 65%)' }} />
          <div className="absolute top-[45%] -left-8 w-[280px] h-[280px] rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)' }} />
          <div className="absolute top-[10%] right-[-2%] w-[360px] h-[360px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 65%)' }} />
          <div className="absolute top-[20%] right-[26%] w-36 h-36 rounded-full blur-[60px] animate-float"
            style={{ background: 'rgba(168,85,247,0.16)' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(rgba(168,85,247,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-[42%] left-0 right-0 h-px opacity-[0.12]"
            style={{ background: 'linear-gradient(to right, transparent 0%, rgba(168,85,247,0.45) 30%, rgba(34,211,238,0.30) 60%, transparent 100%)' }} />
        </div>

        {/* ── Layer 3: Foreground accent nodes ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 4 }} aria-hidden="true">
          {[
            { top: '14%', left: '5%',  size: 8, color: 'rgba(244,114,182,0.55)', dur: '3.2s', delay: '0s'   },
            { top: '64%', left: '9%',  size: 6, color: 'rgba(192,132,252,0.50)', dur: '2.8s', delay: '0.7s' },
            { top: '44%', left: '2%',  size: 5, color: 'rgba(34,211,238,0.42)',  dur: '3.8s', delay: '1.0s' },
            { top: '82%', left: '22%', size: 4, color: 'rgba(168,85,247,0.38)',  dur: '4.0s', delay: '0.4s' },
          ].map((n, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                top: n.top, left: n.left,
                width: n.size, height: n.size,
                background: n.color,
                boxShadow: `0 0 ${n.size * 4}px ${n.color}`,
                animation: `pulse ${n.dur} ease-in-out infinite ${n.delay}`,
              }}
            />
          ))}
        </div>

        {/* ── Content ── */}
        <div className="relative w-full" style={{ zIndex: 10 }}>
          <div className="site-container py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

              {/* LEFT — headline + trust signals */}
              <div>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/38 bg-pink-500/10 text-xs text-pink-300 mb-6 tracking-widest uppercase backdrop-blur-sm"
                  style={{ boxShadow: '0 0 22px rgba(236,72,153,0.15), inset 0 1px 0 rgba(255,255,255,0.06)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_rgba(244,114,182,0.9)]" />
                  Contact Taruna Technology
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_rgba(244,114,182,0.9)]" />
                </motion.div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.70, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl lg:text-[3.3rem] font-black text-white mb-5 leading-[1.07]"
                >
                  <span className="block">Get Your</span>
                  <span className="block text-gradient drop-shadow-[0_0_40px_rgba(168,85,247,0.55)]">
                    Quote Today
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.60, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 max-w-lg"
                >
                  Looking for the best IT business solution? Tell us about your project and our experts will get back to you within hours.
                </motion.p>

                {/* Trust pills */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.30, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-2.5"
                >
                  {[
                    { icon: '⚡', label: 'Response in 2–4 hrs',  glow: 'rgba(251,191,36,0.20)'  },
                    { icon: '🌍', label: 'Available Worldwide',   glow: 'rgba(34,211,238,0.18)'  },
                    { icon: '🔒', label: 'Confidential & Secure', glow: 'rgba(168,85,247,0.18)'  },
                  ].map((t) => (
                    <span
                      key={t.label}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-200 transition-all duration-250 hover:text-white"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 16px -2px ${t.glow}`; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
                    >
                      <span>{t.icon}</span>
                      {t.label}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT — stat cards */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {[
                  { value: '1250+', label: 'Clients Served',     icon: '🌟', bg: 'rgba(168,85,247,0.12)',  border: 'rgba(168,85,247,0.30)', glow: 'rgba(168,85,247,0.40)', delay: 0.32 },
                  { value: '35+',   label: 'Countries Reached',  icon: '🌍', bg: 'rgba(34,211,238,0.10)',  border: 'rgba(34,211,238,0.26)', glow: 'rgba(34,211,238,0.38)', delay: 0.42 },
                  { value: '870+',  label: 'Projects Delivered', icon: '📦', bg: 'rgba(236,72,153,0.10)',  border: 'rgba(236,72,153,0.26)', glow: 'rgba(236,72,153,0.38)', delay: 0.52 },
                  { value: '2–4h',  label: 'Avg. Response Time', icon: '⚡', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.22)', glow: 'rgba(251,191,36,0.35)', delay: 0.62 },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: stat.delay, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                    className="rounded-2xl p-5 relative overflow-hidden"
                    style={{
                      background: stat.bg,
                      border: `1px solid ${stat.border}`,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.07)`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 28px -6px ${stat.glow}, inset 0 1px 0 rgba(255,255,255,0.10)`; e.currentTarget.style.borderColor = stat.glow; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.07)`; e.currentTarget.style.borderColor = stat.border; }}
                  >
                    {/* Glossy top sheen */}
                    <div className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none rounded-t-2xl"
                      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)' }} />
                    {/* Corner glow */}
                    <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full pointer-events-none"
                      style={{ background: stat.glow, filter: 'blur(20px)', opacity: 0.5 }} />
                    <div className="relative z-10">
                      <div className="text-2xl mb-3 leading-none">{stat.icon}</div>
                      <p className="text-2xl font-black text-white mb-1 leading-none tracking-tight">{stat.value}</p>
                      <p className="text-gray-400 text-xs font-medium leading-snug">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Bottom fade into form section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #080818 0%, transparent 100%)', zIndex: 5 }} />
      </section>

      {/* ── Contact Info + Form ── */}
      <section className="relative pb-24 bg-[#080818] overflow-hidden">
        <div className="relative site-container" style={{ zIndex: 1 }}>
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Left — Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Contact info card */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h3 className="text-white font-bold text-lg mb-5">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/25 transition-colors">
                      <Phone size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Phone</p>
                      <p className="text-white text-sm font-semibold group-hover:text-purple-300 transition-colors">
                        {companyInfo.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/25 transition-colors">
                      <Mail size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Email</p>
                      <p className="text-white text-sm font-semibold group-hover:text-purple-300 transition-colors">
                        {companyInfo.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-2">Office Locations</p>

                      {/* India */}
                      <div className="mb-3">
                        <p className="text-white text-xs font-semibold mb-0.5 flex items-center gap-1.5">
                          <img src="https://flagcdn.com/w80/in.png" alt="India" className="w-6 h-4 rounded object-cover shadow-sm" />
                          India
                        </p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          709-710 Broadway Empire,<br />
                          Nilamber Circle, Vasna Bhayli Main Rd,<br />
                          Vadodara, Gujarat 391410
                        </p>
                        <a
                          href="tel:+919106610595"
                          className="text-purple-400 text-xs font-medium hover:text-purple-300 transition-colors mt-0.5 inline-block"
                        >
                          +91 91066 10595
                        </a>
                      </div>

                      {/* USA */}
                      <div>
                        <p className="text-white text-xs font-semibold mb-0.5 flex items-center gap-1.5">
                          <img src="https://flagcdn.com/w80/us.png" alt="United States" className="w-6 h-4 rounded object-cover shadow-sm" />
                          United States
                        </p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          7575 Bellaire Blvd,<br />
                          Houston, TX 77036,<br />
                          United States
                        </p>
                        <a
                          href="tel:+18329292131"
                          className="text-purple-400 text-xs font-medium hover:text-purple-300 transition-colors mt-0.5 inline-block"
                        >
                          +1 (832) 929-2131
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Countries */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h3 className="text-white font-bold text-base mb-4">We Serve Worldwide</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { flag: 'https://flagcdn.com/w80/in.png', name: 'India' },
                    { flag: 'https://flagcdn.com/w80/us.png', name: 'United States' },
                    { flag: 'https://flagcdn.com/w80/gb.png', name: 'United Kingdom' },
                    { flag: 'https://flagcdn.com/w80/ae.png', name: 'UAE' },
                    { flag: 'https://flagcdn.com/w80/sg.png', name: 'Singapore' },
                    { flag: 'https://flagcdn.com/w80/de.png', name: 'Germany' },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-2 p-2 rounded-lg bg-white/3">
                      <img src={c.flag} alt={c.name} className="w-6 h-4 rounded object-cover shadow-sm flex-shrink-0" />
                      <span className="text-gray-300 text-xs font-medium">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick response */}
              <div className="glass-card rounded-2xl p-5 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare size={16} className="text-purple-400" />
                  <h3 className="text-white font-semibold text-sm">Quick Response</h3>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  We typically respond to all inquiries within 2–4 business hours.
                </p>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-3xl p-8 border border-purple-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={40} className="text-green-400" />
                    </div>
                    <h3 className="text-white font-bold text-2xl mb-3">Message Sent!</h3>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">
                      Thank you for reaching out. Our team will get back to you within 2–4 business hours.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-white font-bold text-2xl mb-1 relative">Send Your Message</h3>
                    <p className="text-gray-400 text-sm mb-7 relative">Fill out the form and we&apos;ll get back to you shortly.</p>

                    <form onSubmit={handleSubmit} className="relative space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Full Name *</label>
                          <input
                            type="text" required value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your full name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Email Address *</label>
                          <input
                            type="email" required value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 font-medium">Phone Number</label>
                        <input
                          type="tel" value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 font-medium">Service Required *</label>
                        <select
                          required
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-colors"
                        >
                          <option value="" className="bg-[#0a0a1a]">Select a service</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.title} className="bg-[#0a0a1a]">{s.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 font-medium">Message *</label>
                        <textarea
                          rows={5} required value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your project or requirements..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors resize-none"
                        />
                      </div>

                      {/* Error banner */}
                      {sendError && (
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                          {sendError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <Send size={16} />
                        {sending ? 'Sending…' : 'SEND YOUR MESSAGE'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Google Maps Section ── */}
      <section className="relative bg-[#080818] pb-24">

        {/* Ambient glows — richer than before */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full blur-[130px]"
            style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.14) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[450px] h-[220px] rounded-full blur-[110px]"
            style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[350px] h-[200px] rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />
        </div>

        {/* Top separator — gradient fade from form section */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-16" />

        <div className="relative site-container">

          {/* Section header — glassmorphism card, integrated with map */}
          <div className="mb-8">
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 sm:px-6 py-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(139,92,246,0.20)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Left — label + heading */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.30), rgba(236,72,153,0.18))', border: '1px solid rgba(168,85,247,0.30)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="rgba(216,180,254,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-purple-400 text-[10px] font-semibold tracking-[0.22em] uppercase mb-0.5">FIND US</p>
                  <h2 className="text-lg sm:text-xl font-black text-white leading-none">Visit Our Office</h2>
                </div>
              </div>
              {/* Right — address */}
              <div className="text-center sm:text-right w-full sm:w-auto sm:max-w-xs">
                <p className="text-gray-400 text-[11px] sm:text-xs leading-[1.7] sm:leading-relaxed">
                  <span className="hidden sm:inline">709–710 Brodway Empire, Nilamber Circle,<br className="hidden sm:block" /> Vadodara, Gujarat 391410</span>
                  <span className="sm:hidden">709–710 Broadway Empire,<br />Nilamber Circle,<br />Vadodara, Gujarat 391410</span>
                </p>
              </div>
            </div>
          </div>

          {/* Map card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              border: '1px solid rgba(139,92,246,0.30)',
              boxShadow: [
                '0 0 0 1px rgba(139,92,246,0.10)',
                '0 12px 50px rgba(0,0,0,0.60)',
                '0 0 40px -10px rgba(139,92,246,0.20)',
                'inset 0 1px 0 rgba(255,255,255,0.06)',
              ].join(', '),
            }}
          >
            {/* Corner glow accents — contained, no upward bleed */}
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full pointer-events-none blur-[40px]"
              style={{ background: 'rgba(168,85,247,0.18)', zIndex: 8, transform: 'translate(-30%, -30%)' }} />
            <div className="absolute bottom-0 right-0 w-28 h-28 rounded-full pointer-events-none blur-[35px]"
              style={{ background: 'rgba(34,211,238,0.12)', zIndex: 8, transform: 'translate(30%, 30%)' }} />

            {/* Open in Maps button — hover lift + glow */}
            <a
              href="https://maps.google.com/?q=TARUNA+TECHNOLOGY+Vadodara"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white group"
              style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.85), rgba(236,72,153,0.75))',
                border: '1px solid rgba(216,180,254,0.45)',
                boxShadow: '0 4px 18px rgba(168,85,247,0.35)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                transition: 'transform 0.22s cubic-bezier(0.25,1,0.5,1), box-shadow 0.22s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(168,85,247,0.55), 0 0 0 1px rgba(216,180,254,0.30)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(168,85,247,0.35)';
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Open in Maps
            </a>

            {/* Iframe — plain coordinate pin, no business info panel */}
            <div className="relative w-full" style={{ paddingBottom: '46%', minHeight: '340px' }}>
              {/* Iframe — coordinate-only pin, no place ID = no business popup */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.454226487781!2d73.12872127506927!3d22.298654879687785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x63d2aa8fe3918693%3A0x9201f14f8cce4e9a!2sTARUNA%20TECHNOLOGY%20%7C%20Software%20%26%20IT%20Services%20%7C%20Consultancy%20%7C%20Web%20%26%20Mobile%20App%20Development%20Company!5e0!3m2!1sen!2sin!4v1779972806037!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full"
                data-map-iframe="true"
                style={{ border: 0, filter: 'invert(82%) hue-rotate(180deg) saturate(1.0) brightness(0.98)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Taruna Technology Office Location"
              />
              {/* Subtle purple brand tint */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.05) 0%, transparent 45%)', mixBlendMode: 'multiply', zIndex: 1 }} />
              {/* Soft vignette edges */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 50px rgba(4,4,15,0.28)', zIndex: 1 }} />
            </div>
          </div>

          {/* Bottom info strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-0 mt-7">
            {[
              { icon: '📍', label: '709–710 Brodway Empire, Nilamber Circle, Vadodara', mobileLabel: '709–710 Brodway Empire, Vadodara' },
              { icon: '🕐', label: 'Mon–Sat: 10:00 AM – 7:00 PM' },
              { icon: '📞', label: '+91 91066 10595' },
            ].map((item, i) => (
              <span key={item.label} className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200 px-3 sm:px-4 md:px-5">
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.mobileLabel || item.label}</span>
                {i < 2 && <span className="hidden sm:inline ml-2 sm:ml-4 md:ml-5 text-gray-700">·</span>}
              </span>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
