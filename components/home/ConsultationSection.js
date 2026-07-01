'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { companyInfo, services } from '@/lib/data';
import Link from 'next/link';

export default function ConsultationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1f] via-[#0a0515] to-[#0b0b1f]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/12 blur-[120px]" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="relative site-container" style={{ zIndex: 10 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30 text-sm text-green-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            💼 Get Your IT Consultancy!
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
            Discuss your project idea or business needs
            <br />
            <span className="text-gradient">with our experts — no obligation.</span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Looking for the best IT business solution?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-white font-bold text-lg mb-4">Schedule Consultation</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/20 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Call us</p>
                    <p className="text-white text-sm font-semibold group-hover:text-purple-300 transition-colors">{companyInfo.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/20 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email us</p>
                    <p className="text-white text-sm font-semibold group-hover:text-purple-300 transition-colors">{companyInfo.email}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                At Taruna Technology, we specialize in delivering custom software development, intuitive UX/UI design, and scalable cloud solutions that drive digital transformation.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                CONTACT US
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-card rounded-3xl p-8 border border-purple-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Request Submitted!</h3>
                  <p className="text-gray-400 text-sm">We&apos;ll contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-xl mb-5 relative">Get Your Quote Today</h3>
                  <form onSubmit={handleSubmit} className="relative space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Full Name *</label>
                      <input
                        type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 font-medium">Email *</label>
                        <input
                          type="email" required value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 font-medium">Phone</label>
                        <input
                          type="tel" value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 XXXXX"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Service</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-colors"
                      >
                        <option value="" className="bg-[#0a0a1a]">Select a service</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id} className="bg-[#0a0a1a]">{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Message</label>
                      <textarea
                        rows={3} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your project..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
                    >
                      <Send size={15} />
                      Schedule Consultation
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
