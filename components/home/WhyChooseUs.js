'use client';

import { motion } from 'framer-motion';
import { Target, Zap, Users } from 'lucide-react';
import { whyChooseUs } from '@/lib/data';
import PremiumCard from '@/components/PremiumCard';
import GradientMesh from '@/components/GradientMesh';

const iconMap = { Target, Zap, Users };

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#080818] overflow-hidden">
      <GradientMesh />
      <div className="relative site-container" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>WHY CHOOSE TARUNA TECHNOLOGY</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Empowering Your Vision
            <br />
            <span className="text-gradient">with Innovation</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 xl:gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon] || Zap;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                <PremiumCard rgb="139,92,246" className="p-8 xl:p-9 h-full">
                  <div className="absolute top-5 right-5 text-6xl font-black text-white/[0.03] select-none pointer-events-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center mb-5"
                    style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.18)' }}>
                    <Icon size={22} className="text-purple-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{item.title}:</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </PremiumCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
