'use client';

import { motion } from 'framer-motion';
import PremiumCard from '@/components/PremiumCard';

const COUNTRIES = [
  { name: 'India',          flag: 'https://flagcdn.com/w80/in.png' },
  { name: 'United States',  flag: 'https://flagcdn.com/w80/us.png' },
  { name: 'United Kingdom', flag: 'https://flagcdn.com/w80/gb.png' },
  { name: 'UAE',            flag: 'https://flagcdn.com/w80/ae.png' },
  { name: 'Singapore',      flag: 'https://flagcdn.com/w80/sg.png' },
  { name: 'Germany',        flag: 'https://flagcdn.com/w80/de.png' },
];

const LOOP = [...COUNTRIES, ...COUNTRIES, ...COUNTRIES];

/**
 * Optical sizing — keeps every label visually equal in weight.
 * Short names (≤5 chars) get wider tracking to fill the space.
 * Long names (≥13 chars) get a slightly smaller font so they don't crowd.
 * Mid-length names stay at the base size.
 */
function labelStyle(name) {
  const len = name.length;
  if (len <= 3)  return { fontSize: '11px', letterSpacing: '0.14em', fontWeight: 700 };  // UAE
  if (len <= 5)  return { fontSize: '11px', letterSpacing: '0.10em', fontWeight: 700 };  // India
  if (len >= 13) return { fontSize: '10px', letterSpacing: '0.04em', fontWeight: 600 };  // United Kingdom
  return           { fontSize: '11px', letterSpacing: '0.06em', fontWeight: 600 };        // default
}

export default function GlobalPresence() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0b0b1f] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/8 blur-[100px]" />
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
            Serving the World, One Digital
            <br />
            <span className="text-gradient">Solution at a Time</span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Taruna Technology working with worldwide to deliver excellence
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0b0b1f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0b0b1f] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 xl:gap-8 animate-marquee w-max">
            {LOOP.map((country, i) => (
              <div key={i} className="flex-shrink-0 w-[200px] sm:w-[220px]">
                <PremiumCard rgb="139,92,246" lift={5}>
                  {/*
                    Fixed-height inner container — every card is identical.
                    flex-col + items-center + justify-center locks flag and
                    label to the exact vertical centre regardless of name length.
                  */}
                  <div
                    className="flex flex-col items-center justify-center gap-4 px-5"
                    style={{ height: '130px' }}
                  >
                    {/* Flag — larger, never stretches */}
                    <div
                      className="rounded-lg overflow-hidden shadow-lg ring-1 ring-white/15 flex-shrink-0"
                      style={{ width: '72px', height: '48px' }}
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>

                    {/* Optically balanced label */}
                    <span
                      className="text-white text-center leading-none tracking-wide select-none"
                      style={labelStyle(country.name)}
                    >
                      {country.name}
                    </span>
                  </div>
                </PremiumCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
