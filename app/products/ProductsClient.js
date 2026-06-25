'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, Star, LayoutGrid, Users, Code2,
  Globe, ChevronRight,
} from 'lucide-react';
import { products } from '@/lib/data';
import PremiumCard from '@/components/PremiumCard';
import RequestDemoModal from '@/components/RequestDemoModal';

// Map each real product id to its visual config
const productConfig = {
  'erp': {
    Icon: LayoutGrid,
    gradient: 'from-purple-500/18 to-violet-600/8',
    border: 'border-purple-500/25',
    iconBg: 'from-purple-500/25 to-violet-500/10',
    iconColor: 'text-purple-400',
    tagColor: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
    lineColor: 'via-purple-500/40',
  },
  'crm': {
    Icon: Users,
    gradient: 'from-pink-500/18 to-rose-600/8',
    border: 'border-pink-500/25',
    iconBg: 'from-pink-500/25 to-rose-500/10',
    iconColor: 'text-pink-400',
    tagColor: 'bg-pink-500/15 text-pink-300 border-pink-500/25',
    lineColor: 'via-pink-500/40',
  },
  'customized-software': {
    Icon: Code2,
    gradient: 'from-blue-500/18 to-cyan-600/8',
    border: 'border-blue-500/25',
    iconBg: 'from-blue-500/25 to-cyan-500/10',
    iconColor: 'text-blue-400',
    tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    lineColor: 'via-blue-500/40',
  },
  'billing-system': {
    Icon: LayoutGrid,
    gradient: 'from-orange-500/18 to-amber-600/8',
    border: 'border-orange-500/25',
    iconBg: 'from-orange-500/25 to-amber-500/10',
    iconColor: 'text-orange-400',
    tagColor: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
    lineColor: 'via-orange-500/40',
  },
  'dynamic-website': {
    Icon: Globe,
    gradient: 'from-cyan-500/18 to-sky-600/8',
    border: 'border-cyan-500/25',
    iconBg: 'from-cyan-500/25 to-sky-500/10',
    iconColor: 'text-cyan-400',
    tagColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
    lineColor: 'via-cyan-500/40',
  },
};

const badgeColors = {
  'Most Popular': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'New': 'bg-green-500/20 text-green-300 border-green-500/30',
};

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleRequestDemo = (productTitle) => {
    setSelectedProduct(productTitle);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080818]">

      {/* Request Demo Modal */}
      <RequestDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={selectedProduct}
      />

      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#04040f]">

        {/* ── VIDEO: business / SaaS / enterprise software visuals ──
            ID 1851190 = business/office/tech environment (confirmed 200 OK)
            ID 3129671 = futuristic abstract tech (confirmed 200 OK)
        ── */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.62] pointer-events-none"
          style={{ filter: 'brightness(1.28) saturate(1.35) contrast(1.08)' }}
          aria-hidden="true"
        >
          <source src="https://videos.pexels.com/video-files/1851190/1851190-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/1851190/1851190-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>

        {/* ── Minimal overlay — video stays dominant ── */}
        {/* Centre radial ramp for centred text layout */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(4,4,15,0.78) 0%, rgba(4,4,15,0.35) 55%, transparent 100%)' }} />
        {/* Top/bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04040f]/55 via-transparent to-[#04040f]/92 pointer-events-none" />
        {/* Very light violet tint */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(76,29,149,0.28) 0%, transparent 50%, rgba(88,28,135,0.22) 100%)', mixBlendMode: 'multiply' }} />

        {/* ── Minimal neon accent glows — depth without hiding video ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Soft violet bloom top-centre */}
          <div className="absolute -top-16 left-[25%] w-[500px] h-[400px] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.26) 0%, transparent 65%)' }} />
          {/* Pink accent bottom-left */}
          <div className="absolute bottom-[8%] left-[5%] w-[380px] h-[300px] rounded-full blur-[110px]"
            style={{ background: 'radial-gradient(circle, rgba(232,121,249,0.18) 0%, transparent 65%)' }} />
          {/* Single floating orb */}
          <div className="absolute top-[18%] right-[12%] w-44 h-44 rounded-full blur-[65px] animate-float"
            style={{ background: 'rgba(139,92,246,0.20)' }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[220px] blur-[55px]"
            style={{ background: 'linear-gradient(to top, rgba(30,27,75,0.48) 0%, transparent 100%)' }} />
        </div>

        {/* ── Subtle dot grid ── */}
        <div className="absolute inset-0 dot-bg opacity-[0.05] pointer-events-none" />

        {/* Floating product category elements — pinned far right, xl+ only */}
        <div className="absolute inset-y-0 right-0 w-36 pointer-events-none overflow-hidden hidden xl:flex flex-col justify-center gap-4 pr-3">
          {[
            { label: '📊 ERP System',     color: 'border-purple-500/50 text-purple-200 bg-purple-500/12 shadow-[0_0_12px_rgba(168,85,247,0.25)]' },
            { label: '🤝 CRM Platform',   color: 'border-pink-500/50 text-pink-200 bg-pink-500/12 shadow-[0_0_12px_rgba(236,72,153,0.25)]' },
            { label: '💻 Custom Software',color: 'border-blue-500/50 text-blue-200 bg-blue-500/12 shadow-[0_0_12px_rgba(59,130,246,0.25)]' },
            { label: '📱 Mobile Apps',    color: 'border-green-500/50 text-green-200 bg-green-500/12 shadow-[0_0_12px_rgba(34,197,94,0.25)]' },
          ].map((el, i) => (
            <motion.div
              key={el.label}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.15, ease: 'easeOut' }}
              className={`px-2.5 py-1.5 rounded-full border text-[10px] font-medium backdrop-blur-xl whitespace-nowrap ${el.color}`}
            >
              {el.label}
            </motion.div>
          ))}
        </div>

        <div className="relative site-container py-24 lg:py-32 w-full">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Our Products &amp; Solutions
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.04] tracking-tight mb-6">
              <span className="text-white">Business Solutions</span>
              <br />
              <span className="text-gradient">Built for Scale</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Powerful, ready-to-deploy software solutions designed to streamline operations, boost productivity, and drive growth — from ERP and CRM to custom software, mobile apps, and AI.
            </p>
          </motion.div>

          {/* Solution type pills — real Taruna offerings only */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { label: 'ERP', icon: '📊' },
              { label: 'CRM', icon: '🤝' },
              { label: 'Custom Software', icon: '💻' },
              { label: 'Mobile Apps', icon: '📱' },
              { label: 'Dynamic Websites', icon: '🌐' },
            ].map((item, i) => (
              <motion.span
                key={item.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                className="glass flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-gray-300 text-sm font-medium backdrop-blur-xl"
              >
                <span>{item.icon}</span>
                {item.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="relative py-20 bg-[#080818] overflow-hidden">
        <div className="relative site-container" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>What We Build</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Our Core
              <span className="text-gradient"> Software Solutions</span>
            </h2>
          </motion.div>

          <div className="space-y-7">
            {products.map((product, index) => {
              const config = productConfig[product.id] ?? {
                Icon: Code2,
                gradient: 'from-purple-500/18 to-violet-600/8',
                border: 'border-purple-500/25',
                iconBg: 'from-purple-500/25 to-violet-500/10',
                iconColor: 'text-purple-400',
                tagColor: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
                lineColor: 'via-purple-500/40',
              };
              const { Icon } = config;

              // Map border color class to RGB for PremiumCard
              const rgbMap = {
                'border-purple-500/25': '168,85,247',
                'border-pink-500/25':   '236,72,153',
                'border-blue-500/25':   '59,130,246',
                'border-orange-500/25': '249,115,22',
                'border-cyan-500/25':   '34,211,238',
              };
              const rgb = rgbMap[config.border] || '168,85,247';

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PremiumCard rgb={rgb} lift={6} className="rounded-3xl">
                  <div className="p-8 lg:p-10">
                    <div className="grid lg:grid-cols-5 gap-8 items-start">

                      {/* Left — identity */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4 mb-5">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.iconBg} border ${config.border} flex items-center justify-center flex-shrink-0 transition-transform duration-300`}>
                            <Icon size={24} className={config.iconColor} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1.5">
                              <h3 className="text-white font-black text-xl leading-tight">{product.title}</h3>
                              {product.badge && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeColors[product.badge]}`}>
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.tagColor}`}>
                              {product.category}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleRequestDemo(product.title)}
                            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
                          >
                            Request Demo
                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 glass border border-white/10 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200"
                          >
                            Get Quote
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>

                      {/* Right — features */}
                      <div className="lg:col-span-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Key Features</p>
                        <div className="grid sm:grid-cols-2 gap-3 xl:gap-4">
                          {product.features.map((feature, fi) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: 12 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.28, delay: fi * 0.035 }}
                              className="flex items-start gap-2.5 p-3 rounded-xl bg-white/3 border border-white/5 transition-colors"
                            >
                              <CheckCircle2 size={13} className={`${config.iconColor} mt-0.5 flex-shrink-0`} />
                              <span className="text-gray-300 text-sm leading-snug">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0b0b1f]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12 border border-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
            <div className="relative">
              <div className="flex items-center justify-center gap-1 mb-5">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Not Sure Which Solution You Need?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
                Our experts will analyze your business requirements and recommend the perfect solution. Get your consultation today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/40 hover:-translate-y-0.5"
                >
                  Get Your Consultation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-purple-500/30 transition-all duration-200"
                >
                  View All Services
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
