'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RequestDemoModal({ isOpen, onClose, productName }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
      setStatus('idle');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'product-demo',
          product:  productName,
          name:     form.name,
          email:    form.email,
          phone:    form.phone,
          company:  form.company || '',
          message:  form.message || '',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send.');
      }
      setStatus('success');
      setTimeout(() => { onClose(); }, 3000);
    } catch (err) {
      console.error('[RequestDemoModal] error:', err);
      setStatus('error');
    }
  };

  const handleBackdropClick = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-[#0b0b1f] rounded-3xl overflow-hidden"
            style={{
              border: '1px solid rgba(139,92,246,0.30)',
              boxShadow: '0 0 0 1px rgba(139,92,246,0.10), 0 24px 80px rgba(0,0,0,0.80), 0 0 60px -10px rgba(139,92,246,0.30)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/8 rounded-full blur-[80px] pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 group"
              aria-label="Close modal"
            >
              <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Content */}
            <div className="relative p-8">
              {status === 'success' ? (
                // Success state
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-3">Request Sent!</h3>
                  <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
                    Thank you for your interest in <strong className="text-white">{productName}</strong>. Our team will contact you within 2–4 business hours to schedule your demo.
                  </p>
                </motion.div>
              ) : (
                // Form state
                <>
                  <div className="mb-6">
                    <h2 className="text-white font-black text-2xl mb-2">Request Demo</h2>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Product:</span>
                      <span className="text-purple-400 font-semibold">{productName}</span>
                    </div>
                  </div>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
                    >
                      <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-400 text-sm font-semibold mb-1">Failed to Send Request</p>
                        <p className="text-red-400/80 text-xs">Please try again or contact us directly.</p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition-colors"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition-colors"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition-colors"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Your Company"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition-colors"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                        Message
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your requirements..."
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition-colors resize-none"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Request Demo
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-gray-600 text-xs text-center mt-4">
                    We typically respond within 2–4 business hours
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
