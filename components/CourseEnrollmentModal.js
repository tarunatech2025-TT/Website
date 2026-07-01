'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { educationCourses } from '@/lib/data';

export default function CourseEnrollmentModal({ isOpen, onClose, selectedCourse }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');

  // Auto-select course when modal opens
  useEffect(() => {
    if (isOpen && selectedCourse) {
      const courseData = educationCourses.find((c) => c.title === selectedCourse);
      setForm({
        fullName: '',
        email: '',
        phone: '',
        course: courseData ? courseData.id : '',
        message: '',
      });
      setStatus('idle');
      setError('');
    }
  }, [isOpen, selectedCourse]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('submitting');

    // Find the human-readable course title from the selected id
    const selectedCourseData = educationCourses.find((c) => c.id === form.course);
    const courseLabel = selectedCourseData
      ? `${selectedCourseData.title} — ${selectedCourseData.duration}`
      : form.course;

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'course-enrollment',
          name:     form.fullName,
          email:    form.email,
          phone:    form.phone,
          course:   courseLabel,
          message:  form.message || '',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit.');
      }
      setStatus('success');
      setTimeout(() => { onClose(); }, 3000);
    } catch (err) {
      console.error('[CourseEnrollmentModal] error:', err);
      setError(err.message || 'Failed to submit. Please try again or email us directly.');
      setStatus('error');
    }
  };

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
            className="relative w-full max-w-[680px] bg-[#0b0b1f] rounded-3xl overflow-hidden"
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
            <div className="relative p-6 md:p-7">
              {status === 'success' ? (
                // Success state
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Application Submitted!</h3>
                  <p className="text-gray-400 text-sm max-w-xs mx-auto">
                    Thank you for applying to <strong className="text-white">{selectedCourse}</strong>! Our team will review your application and contact you within 2–3 business days.
                  </p>
                </motion.div>
              ) : (
                // Form state
                <>
                  <h2 className="text-xl font-black text-white mb-1 relative pr-12 leading-snug">Course Enrollment Application</h2>
                  <p className="text-gray-400 text-xs mb-5 relative">
                    Fill in your details to enroll in <span className="text-purple-400 font-semibold">{selectedCourse}</span>.
                  </p>

                  <form onSubmit={handleSubmit} className="relative space-y-3.5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 font-medium">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition-colors"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 font-medium">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition-colors"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 font-medium">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition-colors"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Course - Disabled dropdown showing selected course */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 font-medium">
                        Select Course <span className="text-red-400">*</span>
                      </label>
                      <select
                        required
                        value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-purple-500/50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={status === 'submitting'}
                      >
                        <option value="" className="bg-[#0a0a1a]">Choose a course</option>
                        {educationCourses.map((c) => (
                          <option key={c.id} value={c.id} className="bg-[#0a0a1a]">
                            {c.title} — {c.duration}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 font-medium">
                        Message (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your goals or any questions you have..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition-colors resize-none"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Error banner */}
                    {error && status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/30"
                      >
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-400 text-xs font-semibold mb-0.5">Failed to Submit</p>
                          <p className="text-red-400/80 text-xs leading-snug">{error}</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
