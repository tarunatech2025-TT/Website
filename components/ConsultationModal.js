'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

const SERVICES = [
  'Web Development', 'Mobile App Development', 'AI Solutions',
  'ERP / CRM', 'Digital Marketing', 'Custom Software', 'Other',
];
const EMPTY = { name: '', email: '', phone: '', service: '', description: '' };

// ── Neon-focus input components ───────────────────────────────────────────────
const BASE = 'w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-200';
// Mobile-compact version — shorter py
const BASE_SM = 'w-full rounded-xl px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-200';
const REST  = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' };
const FOCUS = {
  background: 'rgba(168,85,247,0.10)',
  border: '1px solid rgba(168,85,247,0.65)',
  boxShadow: '0 0 0 3px rgba(168,85,247,0.14), 0 0 18px rgba(168,85,247,0.18)',
};
function useFieldFocus() {
  const [f, setF] = useState(false);
  return { style: f ? FOCUS : REST, onFocus: () => setF(true), onBlur: () => setF(false) };
}
// compact prop: uses shorter padding class on mobile
function NI({ type = 'text', placeholder, value, onChange, required, compact }) {
  const fp = useFieldFocus();
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange}
    required={required} className={compact ? BASE_SM : BASE} {...fp} />;
}
function NS({ value, onChange, compact }) {
  const fp = useFieldFocus();
  return (
    <select value={value} onChange={onChange} className={compact ? BASE_SM : BASE} {...fp}>
      <option value="" className="bg-[#0d0520]">Select a service</option>
      {SERVICES.map(s => <option key={s} value={s} className="bg-[#0d0520]">{s}</option>)}
    </select>
  );
}
function NT({ placeholder, value, onChange, compact }) {
  const fp = useFieldFocus();
  // compact: rows=1 + reduced padding gives ~20% less height than rows=2 desktop
  return <textarea rows={compact ? 1 : 2} placeholder={placeholder} value={value} onChange={onChange}
    className={`${compact ? `${BASE_SM} !py-1` : BASE} resize-none`} {...fp} />;
}

// ── Static particle positions ─────────────────────────────────────────────────
const DOTS = [
  { t: '12%', l: '6%',  s: 3, c: 'rgba(236,72,153,0.65)',  d: 2.6 },
  { t: '72%', l: '4%',  s: 2, c: 'rgba(168,85,247,0.55)',  d: 3.2 },
  { t: '28%', r: '5%',  s: 2, c: 'rgba(139,92,246,0.50)',  d: 2.9 },
  { t: '82%', r: '7%',  s: 3, c: 'rgba(236,72,153,0.45)',  d: 3.8 },
  { t: '50%', l: '2%',  s: 2, c: 'rgba(168,85,247,0.40)',  d: 4.2 },
  { t: '40%', r: '3%',  s: 2, c: 'rgba(236,72,153,0.35)',  d: 3.5 },
];

const DESKTOP_SHADOW = [
  '0 0 0 1px rgba(236,72,153,0.10)',
  '0 40px 100px rgba(0,0,0,0.75)',
  '0 0 70px -8px rgba(168,85,247,0.38)',
  '0 0 35px -5px rgba(236,72,153,0.22)',
  'inset 0 1px 0 rgba(255,255,255,0.09)',
  'inset 0 0 50px rgba(168,85,247,0.05)',
].join(', ');

export default function ConsultationModal({ isOpen, onOpenChange }) {
  const [form, setForm]           = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast]         = useState(false);
  const [sending, setSending]     = useState(false);
  const [sendError, setSendError] = useState('');
  const [isMobile, setIsMobile]   = useState(false);
  const shimmerCtrl               = useAnimationControls();

  // Use external open state if provided, otherwise internal
  const open = isOpen !== undefined ? isOpen : false;
  const setOpen = onOpenChange || (() => {});

  // ── Detect mobile once on mount + on resize ───────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // ── Session trigger (only if not externally controlled) ───────────────────
  useEffect(() => {
    if (isOpen !== undefined) return; // Skip if externally controlled
    if (sessionStorage.getItem('tt_consult_seen')) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('tt_consult_seen', '1');
    }, 4000);
    return () => clearTimeout(t);
  }, [isOpen, setOpen]);

  const close = useCallback(() => {
    setOpen(false);
    if (onOpenChange) onOpenChange(false);
  }, [onOpenChange, setOpen]);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') close(); };
    if (open) window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, close]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // ── CTA shimmer — runs every 6 s ─────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const run = async () => {
      await shimmerCtrl.start({ x: ['-100%', '200%'], transition: { duration: 0.9, ease: 'easeInOut' } });
    };
    run();
    const id = setInterval(run, 6000);
    return () => clearInterval(id);
  }, [open, shimmerCtrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendError('');
    setSending(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'consultation',
          name:     form.name,
          email:    form.email,
          phone:    form.phone,
          service:  form.service || 'Not selected',
          message:  form.description || '',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send.');
      }
      setSubmitted(true);
      setToast(true);
      setTimeout(() => setToast(false), 4000);
      setTimeout(() => { close(); setSubmitted(false); setForm(EMPTY); }, 3000);
    } catch (err) {
      console.error('[ConsultationModal] error:', err);
      setSendError(err.message || 'Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <>
      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div key="toast"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-[10002] flex items-center gap-3 px-5 py-3.5 rounded-2xl"
            style={{
              background: 'rgba(8,4,26,0.96)', border: '1px solid rgba(34,197,94,0.32)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 0 20px rgba(34,197,94,0.14)',
              backdropFilter: 'blur(20px)',
            }}>
            <CheckCircle2 size={17} className="text-green-400 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-semibold leading-none mb-0.5">Request Received!</p>
              <p className="text-gray-400 text-xs">We&apos;ll reach out within 2–4 business hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div key="bd"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-[10000]"
              style={{
                background: 'rgba(2,2,12,0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              onClick={close} aria-hidden="true" />

            {/* Shell */}
            <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none">
              <motion.div key="panel"
                role="dialog" aria-modal="true" aria-label="IT Consultation"
                initial={{ opacity: 0, scale: 0.93, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 18 }}
                transition={{ duration: 0.40, ease: [0.22, 1, 0.36, 1] }}
                // cm-panel class lets globals.css halve the shadow on mobile
                className={`cm-panel relative pointer-events-auto ${
                  isMobile
                    ? 'w-[88vw] max-w-[360px] flex flex-col max-h-[90vh]'
                    : 'w-full max-w-[580px]'
                }`}
                style={{
                  borderRadius: '26px',
                  background: 'linear-gradient(155deg, #0e0523 0%, #160c36 35%, #1c0d40 65%, rgba(72,16,100,0.50) 100%)',
                  border: '1px solid rgba(168,85,247,0.32)',
                  boxShadow: DESKTOP_SHADOW,
                }}
                onClick={e => e.stopPropagation()}
              >

                {/* ── Animated neon border glow ── */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ borderRadius: '26px', overflow: 'hidden', zIndex: 0 }} aria-hidden="true">
                  <defs>
                    <linearGradient id="cm-border" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="rgba(236,72,153,0)" />
                      <stop offset="30%"  stopColor="rgba(236,72,153,0.70)" />
                      <stop offset="60%"  stopColor="rgba(168,85,247,0.70)" />
                      <stop offset="100%" stopColor="rgba(236,72,153,0)" />
                      <animateTransform attributeName="gradientTransform" type="rotate"
                        from="0 0.5 0.5" to="360 0.5 0.5" dur="6s" repeatCount="indefinite" />
                    </linearGradient>
                  </defs>
                  <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)"
                    rx="25.5" fill="none" stroke="url(#cm-border)" strokeWidth="1" opacity="0.55" />
                </svg>

                {/* ── Decorative glows ── */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{ borderRadius: '26px', zIndex: 1 }} aria-hidden="true">
                  <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '260px', height: '260px',
                    borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.26) 0%, transparent 70%)', filter: 'blur(45px)' }} />
                  <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '240px', height: '240px',
                    borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.30) 0%, transparent 70%)', filter: 'blur(45px)' }} />
                  <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)',
                    width: '340px', height: '220px', borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)', filter: 'blur(35px)' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '42%',
                    borderRadius: '26px 26px 60% 60% / 26px 26px 40% 40%',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.065) 0%, transparent 100%)' }} />
                  {DOTS.map((p, i) => (
                    <motion.div key={i}
                      style={{
                        position: 'absolute', top: p.t, left: p.l, right: p.r,
                        width: p.s, height: p.s, borderRadius: '50%', background: p.c,
                        boxShadow: `0 0 ${p.s * 4}px ${p.c}`,
                      }}
                      animate={{ opacity: [0.35, 1, 0.35] }}
                      transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.28 }} />
                  ))}
                </div>

                {/* ── Close button — always fixed at top-right ── */}
                <motion.button type="button" onClick={close}
                  whileHover={{ scale: 1.12, rotate: 90 }} whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:text-white"
                  style={{
                    background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.32)',
                    boxShadow: '0 0 14px rgba(168,85,247,0.18)', transition: 'box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 22px rgba(168,85,247,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 14px rgba(168,85,247,0.18)'; }}
                  aria-label="Close modal">
                  <X size={14} strokeWidth={2.5} />
                </motion.button>

                {/* ══════════════════════════════════════════════════════════
                    DESKTOP LAYOUT — single scrollable block, original design
                ══════════════════════════════════════════════════════════ */}
                {!isMobile && (
                  <div className="relative z-10 p-8 sm:p-9">
                    {submitted ? <SuccessState /> : (
                      <>
                        <Header isMobile={false} />
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Field label="Full Name *"><NI type="text" required placeholder="Your name" value={form.name} onChange={set('name')} /></Field>
                            <Field label="Email *"><NI type="email" required placeholder="you@email.com" value={form.email} onChange={set('email')} /></Field>
                          </div>
                          <Field label="Phone *"><NI type="tel" required placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set('phone')} /></Field>
                          <Field label="Service Interested In"><NS value={form.service} onChange={set('service')} /></Field>
                          <Field label="Project Description"><NT placeholder="Briefly describe your project..." value={form.description} onChange={set('description')} /></Field>
                          <ConsultationButtons
                            isMobile={isMobile}
                            sending={sending}
                            sendError={sendError}
                            onClose={close}
                          />
                          <p className="text-center text-[10px] text-gray-600 pt-0.5">
                            No obligation · Expert Guidance · Response within 2–4 hrs
                          </p>
                        </form>
                      </>
                    )}
                  </div>
                )}

                {/* ══════════════════════════════════════════════════════════
                    MOBILE LAYOUT — three zones: header | scroll body | buttons
                    Header and buttons stay fixed; only fields scroll.
                ══════════════════════════════════════════════════════════ */}
                {isMobile && (
                  <>
                    {submitted ? (
                      <div className="relative z-10 p-5 flex-1 flex items-center justify-center">
                        <SuccessState />
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col flex-1 min-h-0">

                        {/* Zone 1 — Header (fixed, never scrolls) */}
                        <div className="flex-shrink-0 px-4 pt-3 pb-2">
                          <Header isMobile={true} />
                        </div>

                        {/* Zone 2 — Fields (scrolls when content overflows) */}
                        <div className="flex-1 overflow-y-auto px-4 space-y-1.5 min-h-0">
                          <Field label="Full Name *"><NI type="text" required placeholder="Your name" value={form.name} onChange={set('name')} compact /></Field>
                          <Field label="Email *"><NI type="email" required placeholder="you@email.com" value={form.email} onChange={set('email')} compact /></Field>
                          <Field label="Phone *"><NI type="tel" required placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set('phone')} compact /></Field>
                          <Field label="Service Interested In"><NS value={form.service} onChange={set('service')} compact /></Field>
                          <Field label="Project Description"><NT placeholder="Briefly describe your project..." value={form.description} onChange={set('description')} compact /></Field>
                        </div>

                        {/* Zone 3 — Buttons (fixed, always visible) */}
                        <div className="flex-shrink-0 px-4 pb-4 pt-2.5 border-t border-white/5">
                          <ConsultationButtons
                            isMobile={isMobile}
                            sending={sending}
                            sendError={sendError}
                            onClose={close}
                          />
                          <p className="text-center text-[10px] text-gray-600 mt-1">
                            No obligation · Expert Guidance · Response within 2–4 hrs
                          </p>
                        </div>

                      </form>
                    )}
                  </>
                )}

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[11px] text-gray-400 mb-1.5 font-medium tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function Header({ isMobile }) {
  return (
    <div className={isMobile ? 'mb-0' : 'mb-7'}>
      <h2 className={`font-black leading-tight mb-1.5 ${isMobile ? 'text-xl' : 'text-[1.40rem] mb-2'}`}>
        <span className="text-white">Schedule an </span>
        <span style={{
          background: 'linear-gradient(135deg, #f472b6, #a855f7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          IT Consultation
        </span>
      </h2>
      <p className={`text-gray-400 leading-relaxed ${isMobile ? 'text-xs' : 'text-[13px]'}`}>
        Discuss your project idea or digital transformation goals with our experts.
      </p>
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.30 }} className="text-center py-10">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{
          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.30)',
          boxShadow: '0 0 22px rgba(34,197,94,0.16)',
        }}>
        <CheckCircle2 size={30} className="text-green-400" />
      </div>
      <h3 className="text-white font-black text-xl mb-2">You&apos;re All Set!</h3>
      <p className="text-gray-400 text-sm max-w-[260px] mx-auto leading-relaxed">
        Our team will contact you within 2–4 business hours to schedule your consultation.
      </p>
    </motion.div>
  );
}

// ── Module-level Buttons component — avoids "component created during render" lint error ──
function ConsultationButtons({ isMobile, sending, sendError, onClose }) {
  return (
    <div className={`flex gap-3 ${isMobile ? 'flex-col pt-1' : 'pt-2'}`}>
      {/* Error banner — shown above buttons */}
      {sendError && (
        <div className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs mb-1">
          {sendError}
        </div>
      )}

      {/* Primary — shimmer CTA */}
      <div className="flex-1 relative overflow-hidden rounded-xl">
        <motion.button
          type="submit"
          disabled={sending}
          whileHover={sending ? {} : { scale: 1.02, y: -1 }}
          whileTap={sending ? {} : { scale: 0.98 }}
          className="w-full h-11 flex items-center justify-center text-white text-sm font-bold rounded-xl relative z-10 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #a855f7)',
            boxShadow: '0 4px 22px rgba(168,85,247,0.42), 0 0 0 1px rgba(236,72,153,0.22)',
            transition: 'box-shadow 0.2s ease',
          }}
          onMouseEnter={e => {
            if (!sending) e.currentTarget.style.boxShadow = '0 6px 30px rgba(168,85,247,0.65), 0 0 0 1px rgba(236,72,153,0.40)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 4px 22px rgba(168,85,247,0.42), 0 0 0 1px rgba(236,72,153,0.22)';
          }}
        >
          {sending ? 'Sending…' : 'Schedule Consultation'}
        </motion.button>
        {!sending && (
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 0.85, ease: 'easeInOut', repeat: Infinity, repeatDelay: 5.5 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none',
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)',
              willChange: 'transform',
            }}
          />
        )}
      </div>

      {/* Secondary — Maybe Later */}
      <motion.button
        type="button"
        onClick={onClose}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`h-11 text-gray-300 text-sm font-medium rounded-xl hover:text-white ${isMobile ? 'w-full px-4' : 'px-5 flex-shrink-0'}`}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.12)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(168,85,247,0.10)';
          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.38)';
          e.currentTarget.style.boxShadow = '0 0 14px rgba(168,85,247,0.18)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Maybe Later
      </motion.button>
    </div>
  );
}
