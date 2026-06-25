'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import PremiumCard from '@/components/PremiumCard';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [0, 1, 2].map((offset) => testimonials[(current + offset) % testimonials.length]);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0b0b1f] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-900/12 blur-[140px]" />
      </div>

      {/* Header */}
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center mb-14" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>TESTIMONIAL</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            What Our Clients
            <span className="text-gradient"> Say</span>
          </h2>
        </motion.div>
      </div>

      {/* Desktop: 3-col grid */}
      <div className="relative site-container mb-10" style={{ zIndex: 10 }}>
        <div className="hidden md:grid grid-cols-3 gap-6 xl:gap-8">
          {visible.map((t, i) => (
            <motion.div
              key={`${t.id}-${current}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={i === 1 ? 'scale-[1.025]' : ''}
            >
              <PremiumCard
                rgb={i === 1 ? '168,85,247' : '139,92,246'}
                lift={i === 1 ? 8 : 6}
                className="p-8 xl:p-9 flex flex-col h-full"
                style={i === 1 ? {
                  background: 'linear-gradient(to bottom, rgba(168,85,247,0.06), rgba(255,255,255,0.03))',
                } : {}}
              >
                {/* Quote + stars */}
                <div className="flex items-start justify-between mb-5">
                  <Quote size={28} className="text-purple-500/50" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                {/* Content */}
                <p className="text-gray-300 text-[15px] leading-relaxed mb-6 italic flex-1">
                  &ldquo;{t.content}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg shadow-purple-900/30">
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              <PremiumCard rgb="168,85,247" lift={4} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Quote size={22} className="text-purple-500/40" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonials[current].rating }).map((_, j) => (
                      <Star key={j} size={11} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[current].content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonials[current].name}</p>
                    <p className="text-gray-500 text-xs">{testimonials[current].role}</p>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4" style={{ position: 'relative', zIndex: 10 }}>
        <button onClick={prev} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/40 transition-all duration-200" aria-label="Previous testimonial">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`transition-all duration-200 rounded-full ${i === current ? 'w-6 h-2 bg-purple-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to testimonial ${i + 1}`} />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/40 transition-all duration-200" aria-label="Next testimonial">
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
