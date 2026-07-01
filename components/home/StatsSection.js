'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PremiumCard from '@/components/PremiumCard';

const statsData = [
  { value: 1250, suffix: '+', label: 'Clients Served',     icon: '🌟' },
  { value: 870,  suffix: '+', label: 'Projects Delivered', icon: '📦' },
  { value: 120,  suffix: '+', label: 'Active Clients',     icon: '🔄' },
  { value: 35,   suffix: '+', label: 'Countries Served',   icon: '🌍' },
];

function CountUp({ target, suffix, duration, triggered }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [triggered, target, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const triggered = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1f] via-[#0a0515] to-[#0b0b1f]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/15 blur-[120px]" />
      </div>

      <div className="relative z-10 site-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>
            WHAT WE&apos;VE ACCOMPLISHED
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            We pride ourselves on our
            <br />
            <span className="text-gradient">excellent support and service</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-7 items-stretch">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <PremiumCard rgb="168,85,247" lift={6} className="p-6 xl:p-8 text-center h-full">
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <div className="text-3xl leading-none">{stat.icon}</div>
                  <h3
                    className="font-black leading-none tabular-nums"
                    style={{
                      fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
                      color: '#ffffff',
                      WebkitTextFillColor: '#ffffff',
                      textShadow: '0 0 20px rgba(168,85,247,0.4)',
                    }}
                  >
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={2200}
                      triggered={triggered}
                    />
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium leading-snug text-center w-full">
                    {stat.label}
                  </p>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
