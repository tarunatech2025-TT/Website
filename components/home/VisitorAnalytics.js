'use client';

import { motion } from 'framer-motion';
import { visitorAnalytics } from '@/lib/data';
import { BarChart3, Globe } from 'lucide-react';

// Percentages derived from real visitor counts on tarunatech.com
const total = 7312 + 9125 + 14414 + 166; // 31017
const withPct = visitorAnalytics.map((r) => {
  const count = parseInt(r.visitors.replace(',', ''));
  return { ...r, pct: Math.round((count / total) * 100) };
});

const barColors = {
  purple: 'from-purple-500 to-pink-500',
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-teal-500',
  pink: 'from-pink-500 to-rose-500',
};

export default function VisitorAnalytics() {
  return (
    <section className="relative py-24 lg:py-28 bg-[#080818] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-900/6 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-900/6 blur-[80px]" />
      </div>

      <div className="relative site-container" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
            Global Visitor
            <span className="text-gradient"> Analytics</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Visitors from around the world trust Taruna Technology for their IT needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-2xl p-6 border border-white/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <BarChart3 size={17} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Visitor Distribution</p>
                <p className="text-gray-500 text-xs">By region</p>
              </div>
            </div>

            <div className="space-y-5">
              {withPct.map((region, i) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-300 font-medium">{region.region}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{region.visitors} Visitors</span>
                      <span className="text-sm font-bold text-purple-400">{region.pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${region.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.1 + 0.3, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${barColors[region.color] || barColors.purple}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Summary cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <Globe size={22} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-3xl font-black text-white">31,017</p>
                  <p className="text-gray-400 text-sm">Total Visitors</p>
                </div>
              </div>
            </div>

            {withPct.map((region, i) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.10, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-xl p-4 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${barColors[region.color]}`} />
                  <span className="text-gray-300 text-sm font-medium">{region.region}</span>
                </div>
                <span className="text-white font-bold text-sm">{region.visitors} Visitors</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
