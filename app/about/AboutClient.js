'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Zap, Users, Globe, Award, TrendingUp } from 'lucide-react';
import { whyChooseUs } from '@/lib/data';
import PremiumCard from '@/components/PremiumCard';
import GradientMesh from '@/components/GradientMesh';

const iconMap = { Target, Zap, Users };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080818]">

      {/* ── Hero — split layout with video ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#04040f]">

        {/* ── VIDEO: futuristic business / human + tech interaction ── */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.52] pointer-events-none"
          style={{ filter: 'brightness(1.18) saturate(1.2)' }}
          aria-hidden="true"
        >
          <source src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>

        {/* ── Cinematic colour grade — purple/blue neon tint ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.48) 0%, rgba(15,10,40,0.18) 50%, rgba(8,30,63,0.38) 100%)', mixBlendMode: 'multiply' }} />

        {/* ── Left text-readability ramp ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(4,4,15,0.90) 0%, rgba(4,4,15,0.65) 35%, rgba(4,4,15,0.20) 60%, transparent 100%)' }} />

        {/* ── Top & bottom vignette ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04040f]/60 via-transparent to-[#04040f]/92 pointer-events-none" />

        {/* ── Deep neon glow layers ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-28 -left-28 w-[750px] h-[650px] rounded-full blur-[180px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.36) 0%, rgba(88,28,135,0.14) 55%, transparent 100%)' }} />
          <div className="absolute top-[8%] right-[-6%] w-[550px] h-[550px] rounded-full blur-[150px]"
            style={{ background: 'radial-gradient(circle, rgba(232,121,249,0.20) 0%, rgba(168,85,247,0.08) 55%, transparent 100%)' }} />
          <div className="absolute top-[40%] left-[30%] w-[450px] h-[380px] rounded-full blur-[130px]"
            style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[320px] blur-[90px]"
            style={{ background: 'linear-gradient(to top, rgba(30,27,75,0.58) 0%, transparent 100%)' }} />
          {/* Floating animated orbs */}
          <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full blur-[75px] animate-float"
            style={{ background: 'rgba(139,92,246,0.26)' }} />
          <div className="absolute bottom-[22%] left-[6%] w-56 h-56 rounded-full blur-[65px] animate-float-delayed"
            style={{ background: 'rgba(232,121,249,0.20)' }} />
          <div className="absolute top-[50%] right-[28%] w-36 h-36 rounded-full blur-[55px] animate-float"
            style={{ background: 'rgba(56,189,248,0.18)', animationDelay: '1.5s' }} />
          {/* Neon scan lines */}
          <div className="absolute top-[22%] left-0 right-0 h-px animate-pulse"
            style={{ background: 'linear-gradient(to right, transparent 0%, rgba(139,92,246,0.45) 35%, rgba(232,121,249,0.30) 65%, transparent 100%)' }} />
          <div className="absolute top-[62%] left-0 right-0 h-px animate-pulse"
            style={{ background: 'linear-gradient(to right, transparent 0%, rgba(56,189,248,0.28) 50%, transparent 100%)', animationDelay: '1.6s' }} />
        </div>

        {/* ── Subtle dot grid ── */}
        <div className="absolute inset-0 dot-bg opacity-[0.07] pointer-events-none" />

        <div className="relative site-container py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/8 text-xs font-bold mb-7 tracking-widest uppercase" style={{ color: '#FFD54A' }}>
                <Globe size={11} style={{ color: '#FFD54A' }} />
                About Taruna Technology
              </div>
              <h1 className="text-3xl sm:text-[2.6rem] lg:text-5xl font-black text-white mb-6 leading-[1.04] tracking-tight">
                Innovating the Future
                <br />
                <span className="text-gradient">with Cutting-Edge</span>
                <br />
                Technology.
              </h1>
              <p className="text-gray-300 text-base leading-relaxed max-w-lg mb-8">
                At Taruna Technology, we specialize in developing advanced solutions that transform industries. Our expertise spans custom software, UX/UI design, and scalable cloud solutions.
              </p>

              {/* Floating achievement badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: '🏆', label: 'Digital Transformation & Custom Software Solutions' },
                  { icon: '🌍', label: '6+ Countries Served' },
                  { icon: '⚡', label: 'Decades of Expertise' },
                ].map((badge) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-white/10 text-xs text-gray-300"
                  >
                    <span>{badge.icon}</span>
                    {badge.label}
                  </motion.div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
              >
                CONTACT US
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right — mission statement card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="glass rounded-3xl p-8 border border-purple-500/25 backdrop-blur-xl space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/8 rounded-full blur-[40px] pointer-events-none" />
                {[
                  { icon: '🎯', title: 'Personalized Solutions', desc: 'Tailored to your unique business needs and workflows.' },
                  { icon: '⚡', title: 'Innovative Technology', desc: 'Leveraging the latest tools to keep you ahead of the curve.' },
                  { icon: '👥', title: 'Expert Team', desc: 'Seasoned professionals passionate about delivering excellence.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4 relative"
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-white font-semibold text-sm mb-0.5">{item.title}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── About body ── */}
      <section className="relative py-24 bg-[#0b0b1f] overflow-hidden">
        <div className="relative site-container text-center" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#FFD54A' }}>DIGITAL TRANSFORMATION & CUSTOM SOFTWARE SOLUTIONS</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Innovating the Future with
              <br />
              <span className="text-gradient">Cutting-Edge Technology Solutions.</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-5 max-w-3xl mx-auto">
              At Taruna Technology, we specialize in delivering custom software development, intuitive UX/UI design, and scalable cloud solutions that drive digital transformation.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-3xl mx-auto">
              Our dedicated team of professionals is committed to delivering innovative and reliable technology services tailored to meet your unique needs, positioning your business for long-term success.
            </p>

            {/* Trust indicators row */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { icon: Award, label: 'Digital Transformation & Software Solutions', color: 'text-yellow-400' },
                { icon: TrendingUp, label: '1250+ Clients', color: 'text-green-400' },
                { icon: Globe, label: '6+ Countries', color: 'text-blue-400' },
                { icon: Zap, label: 'Decades of Expertise', color: 'text-purple-400' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/10 text-xs text-gray-300">
                  <Icon size={12} className={color} />
                  {label}
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
            >
              CONTACT US
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="relative py-20 bg-[#080818] overflow-hidden">
        <GradientMesh />
        <div className="site-container relative" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>WHY CHOOSE TARUNA TECHNOLOGY</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Empowering Your Vision
              <span className="text-gradient"> with Innovation</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 xl:gap-8">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PremiumCard rgb="139,92,246" className="p-8 xl:p-9 h-full">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center mb-4"
                      style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.18)' }}>
                      <Icon size={20} className="text-purple-400" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{item.title}:</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Global Presence ── */}
      <section className="relative py-20 bg-[#0b0b1f] overflow-hidden">
        <div className="site-container relative" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Serving the World, One Digital
              <br />
              <span className="text-gradient">Solution at a Time</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Taruna Technology working with worldwide to deliver excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 xl:gap-5">
            {[
              { name: 'India',          code: 'in' },
              { name: 'United States',  code: 'us' },
              { name: 'United Kingdom', code: 'gb' },
              { name: 'UAE',            code: 'ae' },
              { name: 'Singapore',      code: 'sg' },
              { name: 'Germany',        code: 'de' },
            ].map((country, i) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.48, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <PremiumCard rgb="139,92,246" lift={5} className="p-5 xl:p-6 text-center">
                  <div className="flex justify-center mb-2.5">
                    <img
                      src={`https://flagcdn.com/w80/${country.code}.png`}
                      alt={country.name}
                      width={56}
                      height={42}
                      className="w-14 h-10 object-cover rounded-md shadow-lg"
                    />
                  </div>
                  <p className="text-white font-semibold text-xs">{country.name}</p>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0b0b1f]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12 border border-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl font-black text-white mb-4">
                Ready to Build Something Better
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Get in touch with our team and let&apos;s discuss how we can help your business grow.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
              >
                CONTACT US
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
