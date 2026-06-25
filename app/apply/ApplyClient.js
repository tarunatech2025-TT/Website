'use client';

import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, User, Mail, Phone, BookOpen, Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { educationCourses } from '@/lib/data';

const EMPTY_FORM = {
  firstName: '', lastName: '', email: '', phone: '',
  course: '', experience: '', education: '', startDate: '',
  portfolio: '', linkedin: '', message: '',
};

export default function ApplyPage() {
  const [submitted, setSubmitted]       = useState(false);
  const [applicationType, setApplicationType] = useState('course');
  const [sending, setSending]           = useState(false);
  const [error, setError]               = useState('');
  const [form, setForm]                 = useState(EMPTY_FORM);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Resolve human-readable course/position label
    const selectedCourse = educationCourses.find((c) => c.id === form.course);
    const courseLabel = applicationType === 'course' && selectedCourse
      ? `${selectedCourse.title} — ${selectedCourse.duration}`
      : form.course;

    // Determine form_type label
    const formTypeMap = {
      course:      'Course Enrollment',
      internship:  'Internship Application',
      job:         'Job Application',
    };
    const formType = formTypeMap[applicationType] || 'Application';

    console.log('[Apply] Submitting payload:', {
      form_type: formType,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      course: courseLabel,
      education: form.education || '(not specified)',
      experience: form.experience || '(not specified)',
      portfolio: form.portfolio || '(none)',
      linkedin: form.linkedin || '(none)',
      message: form.message || '(none)',
    });

    setSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_ENROLLMENT_TEMPLATE_ID,
        {
          form_type:  formType,
          name:       `${form.firstName} ${form.lastName}`,
          email:      form.email,
          phone:      form.phone,
          course:     courseLabel,
          education:  form.education  || '(not specified)',
          experience: form.experience || '(not specified)',
          portfolio:  form.portfolio  || '(none)',
          linkedin:   form.linkedin   || '(none)',
          message:    form.message    || '(none)',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setForm(EMPTY_FORM);
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error('[Apply] EmailJS error:', err);
      setError('Failed to submit. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080818]">
      {/* Hero */}
      <section className="relative py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-900/12 blur-[120px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="relative site-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Applications Open
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Apply Now &
              <br />
              <span className="text-gradient">Start Your Journey</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Whether you're looking to enroll in our courses, apply for an internship, or join our team — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="pb-24 bg-[#080818]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Application Type Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-2 p-1.5 glass rounded-2xl border border-white/10 mb-8 w-fit mx-auto"
          >
            {[
              { id: 'course', label: 'Enroll in Course', icon: BookOpen },
              { id: 'internship', label: 'Apply for Internship', icon: Briefcase },
              { id: 'job', label: 'Join Our Team', icon: User },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setApplicationType(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  applicationType === id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
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
                <p className="text-gray-400 max-w-md mx-auto">
                  Thank you for applying! Our team will review your application and contact you within 2-3 business days.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="relative mb-8">
                  <h2 className="text-2xl font-black text-white mb-1">
                    {applicationType === 'course' && 'Course Enrollment Application'}
                    {applicationType === 'internship' && 'Internship Application'}
                    {applicationType === 'job' && 'Job Application'}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {applicationType === 'course' && 'Fill in your details to enroll in one of our courses.'}
                    {applicationType === 'internship' && 'Apply for our internship program and gain real-world experience.'}
                    {applicationType === 'job' && 'Join our growing team of IT professionals.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="relative space-y-5">
                  {/* Name */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">First Name *</label>
                      <input
                        type="text" required value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="First name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Last Name *</label>
                      <input
                        type="text" required value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        placeholder="Last name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid sm:grid-cols-2 gap-5">
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
                  </div>

                  {/* Course/Position */}
                  {applicationType === 'course' && (
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Select Course *</label>
                      <select
                        required value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-colors"
                      >
                        <option value="" className="bg-[#0a0a1a]">Choose a course</option>
                        {educationCourses.map((c) => (
                          <option key={c.id} value={c.id} className="bg-[#0a0a1a]">{c.title} ({c.duration})</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {applicationType === 'internship' && (
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Internship Track *</label>
                      <select
                        required value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-colors"
                      >
                        <option value="" className="bg-[#0a0a1a]">Select internship track</option>
                        <option value="fullstack" className="bg-[#0a0a1a]">Full-Stack Development</option>
                        <option value="mobile" className="bg-[#0a0a1a]">Mobile App Development</option>
                        <option value="ai" className="bg-[#0a0a1a]">AI & Data Science</option>
                        <option value="uiux" className="bg-[#0a0a1a]">UI/UX Design</option>
                        <option value="marketing" className="bg-[#0a0a1a]">Digital Marketing</option>
                      </select>
                    </div>
                  )}

                  {applicationType === 'job' && (
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Position Applied For *</label>
                      <select
                        required value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-colors"
                      >
                        <option value="" className="bg-[#0a0a1a]">Select position</option>
                        <option value="fullstack" className="bg-[#0a0a1a]">Full-Stack Developer</option>
                        <option value="frontend" className="bg-[#0a0a1a]">Frontend Developer</option>
                        <option value="backend" className="bg-[#0a0a1a]">Backend Developer</option>
                        <option value="mobile" className="bg-[#0a0a1a]">Mobile App Developer</option>
                        <option value="ai" className="bg-[#0a0a1a]">AI/ML Engineer</option>
                        <option value="uiux" className="bg-[#0a0a1a]">UI/UX Designer</option>
                        <option value="devops" className="bg-[#0a0a1a]">DevOps Engineer</option>
                        <option value="sales" className="bg-[#0a0a1a]">Business Development</option>
                      </select>
                    </div>
                  )}

                  {/* Education & Experience */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Highest Education</label>
                      <select
                        value={form.education}
                        onChange={(e) => setForm({ ...form, education: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-colors"
                      >
                        <option value="" className="bg-[#0a0a1a]">Select education</option>
                        <option value="10th" className="bg-[#0a0a1a]">10th Standard</option>
                        <option value="12th" className="bg-[#0a0a1a]">12th Standard</option>
                        <option value="diploma" className="bg-[#0a0a1a]">Diploma</option>
                        <option value="btech" className="bg-[#0a0a1a]">B.Tech / B.E.</option>
                        <option value="bca" className="bg-[#0a0a1a]">BCA / BSc CS</option>
                        <option value="mtech" className="bg-[#0a0a1a]">M.Tech / MCA</option>
                        <option value="other" className="bg-[#0a0a1a]">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Experience Level</label>
                      <select
                        value={form.experience}
                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-colors"
                      >
                        <option value="" className="bg-[#0a0a1a]">Select experience</option>
                        <option value="fresher" className="bg-[#0a0a1a]">Fresher (0 years)</option>
                        <option value="0-1" className="bg-[#0a0a1a]">0-1 years</option>
                        <option value="1-2" className="bg-[#0a0a1a]">1-2 years</option>
                        <option value="2-5" className="bg-[#0a0a1a]">2-5 years</option>
                        <option value="5+" className="bg-[#0a0a1a]">5+ years</option>
                      </select>
                    </div>
                  </div>

                  {/* Portfolio & LinkedIn */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Portfolio / GitHub URL</label>
                      <input
                        type="url" value={form.portfolio}
                        onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                        placeholder="https://github.com/username"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">LinkedIn Profile</label>
                      <input
                        type="url" value={form.linkedin}
                        onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                      {applicationType === 'course' ? 'Why do you want to take this course?' : 'Cover Letter / Message'}
                    </label>
                    <textarea
                      rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={applicationType === 'course' ? 'Tell us about your goals and why you want to enroll...' : 'Tell us about yourself, your skills, and why you want to join...'}
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
