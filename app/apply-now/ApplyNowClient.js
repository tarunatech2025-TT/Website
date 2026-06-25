'use client';

import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { educationCourses } from '@/lib/data';

export default function ApplyNowPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState('');
  const [sending, setSending]     = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', course: '', message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Find the human-readable course title from the selected id
    const selectedCourse = educationCourses.find((c) => c.id === form.course);
    const courseLabel = selectedCourse
      ? `${selectedCourse.title} — ${selectedCourse.duration}`
      : form.course;

    console.log('[ApplyNow] Submitting payload:', {
      form_type: 'Course Enrollment',
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      course: courseLabel,
      message: form.message || '(none)',
    });

    setSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_ENROLLMENT_TEMPLATE_ID,
        {
          form_type: 'Course Enrollment',
          name:      form.fullName,
          email:     form.email,
          phone:     form.phone,
          course:    courseLabel,
          message:   form.message || '(none)',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setForm({ fullName: '', email: '', phone: '', course: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error('[ApplyNow] EmailJS error:', err);
      setError('Failed to submit. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080818]">

      {/* ── Hero ── */}
      <section className="relative py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-900/12 blur-[120px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="relative site-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30 text-sm text-green-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Applications Open
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5">
              Apply Now for
              <br />
              <span className="text-gradient">IT Courses</span>
            </h1>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Fill in your details below to enroll in one of our industry-leading IT courses at Taruna Technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="pb-24 bg-[#080818]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 lg:p-10 border border-purple-500/20 relative overflow-hidden"
          >
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
                <h3 className="text-white font-bold text-2xl mb-3">Application Submitted!</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto">
                  Thank you for applying! Our team will review your application and contact you within 2–3 business days.
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-white mb-1 relative">Course Enrollment Application</h2>
                <p className="text-gray-400 text-sm mb-7 relative">
                  Fill in your details to enroll in one of our courses.
                </p>

                <form onSubmit={handleSubmit} className="relative space-y-5">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">Full Name *</label>
                    <input
                      type="text" required value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
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

                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">Phone Number *</label>
                    <input
                      type="tel" required value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">Select Course *</label>
                    <select
                      required value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-colors"
                    >
                      <option value="" className="bg-[#0a0a1a]">Choose a course</option>
                      {educationCourses.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#0a0a1a]">
                          {c.title} — {c.duration}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">Message (Optional)</label>
                    <textarea
                      rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your goals or any questions you have..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Error banner */}
                  {error && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                      <AlertCircle size={15} className="flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                    {sending ? 'Submitting…' : 'Submit Application'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
