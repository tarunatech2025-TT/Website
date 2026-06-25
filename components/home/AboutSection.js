'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ── Particle network canvas ──────────────────────────────────────────────────
// mouseRef is owned by the parent section so it receives events
// even when the cursor is over content layers above the canvas.
function ParticleCanvas({ mouseRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isMobile      = () => window.innerWidth < 768;
    // Mobile: 20 particles (was 32), no radial gradients, flat fills only
    const PARTICLE_COUNT = () => isMobile() ? 20 : 70;
    const CONNECTION_DIST = 140;   // particle ↔ particle
    const CURSOR_DIST     = 200;   // cursor ↔ particle (wider radius)

    const COLORS = [
      '168,85,247',   // purple
      '232,121,249',  // magenta
      '56,189,248',   // electric blue
      '139,92,246',   // violet
    ];

    let particles = [];
    let animId;
    let W = 0, H = 0;

    // RAF throttle — mobile targets 30fps, desktop uncapped
    let lastTime = 0;
    const MOBILE_INTERVAL = 1000 / 30; // 33ms between frames

    class Particle {
      constructor() { this.reset(true); }

      reset(initial = false) {
        this.x           = Math.random() * W;
        this.y           = initial ? Math.random() * H : (Math.random() > 0.5 ? -8 : H + 8);
        this.vx          = (Math.random() - 0.5) * 0.32;
        this.vy          = (Math.random() - 0.5) * 0.32;
        this.r           = Math.random() * 1.5 + 0.5;
        this.baseOpacity = Math.random() * 0.45 + 0.15;
        this.opacity     = this.baseOpacity;
        this.color       = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.pulseSpeed  = Math.random() * 0.018 + 0.007;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(t) {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity = this.baseOpacity + Math.sin(t * this.pulseSpeed + this.pulseOffset) * 0.1;
        // Wrap edges
        if (this.x < -10) this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
        if (this.y < -10) this.y = H + 10;
        if (this.y > H + 10) this.y = -10;
      }

      draw(mobile) {
        if (mobile) {
          // Mobile: flat circle only — no radial gradient (avoids per-frame
          // gradient object allocation which is expensive on mobile GPUs)
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
          ctx.fill();
        } else {
          // Desktop: full soft glow halo
          const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
          grd.addColorStop(0, `rgba(${this.color},${this.opacity})`);
          grd.addColorStop(1, `rgba(${this.color},0)`);
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
          // Core dot
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color},${Math.min(this.opacity + 0.35, 1)})`;
          ctx.fill();
        }
      }
    }

    function line(x1, y1, x2, y2, alpha, color, width = 0.6) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(${color},${alpha})`;
      ctx.lineWidth = width;
      ctx.stroke();
    }

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      const target = PARTICLE_COUNT();
      while (particles.length < target) particles.push(new Particle());
      while (particles.length > target) particles.pop();
    }

    let t = 0;
    function animate(timestamp) {
      animId = requestAnimationFrame(animate);
      const mobile = isMobile();

      // Throttle to 30fps on mobile
      if (mobile && timestamp - lastTime < MOBILE_INTERVAL) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, W, H);
      t++;

      // Read cursor position — tracked on the section, not the canvas
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasCursor = mx > -1000;

      // Cursor ↔ particle connections + attraction ONLY (no always-on mesh)
      // On mobile: skip cursor interaction entirely (touch doesn't have mousemove)
      if (hasCursor && !mobile) {
        for (const p of particles) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CURSOR_DIST) {
            const t0 = 1 - d / CURSOR_DIST;
            // Connection line — brighter closer to cursor
            line(p.x, p.y, mx, my, t0 * 0.6, '232,121,249', 0.7);
            // Gentle attraction
            p.vx += (mx - p.x) * 0.00015;
            p.vy += (my - p.y) * 0.00015;
            // Clamp speed
            const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (spd > 1.0) { p.vx = (p.vx / spd) * 1.0; p.vy = (p.vy / spd) * 1.0; }
          }
        }
      }

      // Update & draw
      for (const p of particles) { p.update(t); p.draw(mobile); }
    }

    resize();
    particles = Array.from({ length: PARTICLE_COUNT() }, () => new Particle());
    animate(0);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

// ── AboutSection ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });

  // Mouse tracked on the section — fires regardless of which child is hovered
  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };
  const handleMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-24 lg:py-32 bg-[#0b0b1f] overflow-hidden"
    >
      {/* Particle canvas — pointer-events-none so it never blocks clicks */}
      <ParticleCanvas mouseRef={mouseRef} />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-700/14 blur-[130px]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-700/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-pink-700/6 blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative site-container" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#FFD54A' }}>
              ABOUT TARUNA TECHNOLOGY
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Innovating the Future
              <br />
              with <span className="text-gradient">Cutting-Edge</span>
              <br />
              Technology Solutions.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-5">
              At Taruna Technology, we specialize in delivering custom software development, intuitive UX/UI design, and scalable cloud solutions that drive digital transformation. Our innovative technology services help businesses streamline operations, enhance user experience, and stay ahead in today&apos;s fast-paced digital landscape.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Our dedicated team of professionals is committed to delivering innovative and reliable technology services tailored to meet your unique needs. By leveraging the latest in technology and best practices, we help you achieve operational excellence and drive growth, positioning your business for long-term success.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
            >
              LEARN MORE
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — glass card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-card rounded-3xl p-8 border border-purple-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/8 rounded-full blur-[60px] pointer-events-none" />
              <div className="relative">
                <div className="space-y-4 mb-6">
                  {[
                    { icon: '🎯', title: 'Personalized Solutions', desc: 'Tailored to your unique business needs and workflows.' },
                    { icon: '⚡', title: 'Innovative Technology',  desc: 'Leveraging the latest tools to keep you ahead of the curve.' },
                    { icon: '👥', title: 'Expert Team',            desc: 'Seasoned professionals passionate about delivering excellence.' },
                    { icon: '🌍', title: 'Global Reach',           desc: 'Serving clients across India, USA, UK, UAE, Germany & Singapore.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/4 transition-colors">
                      <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-white font-semibold text-sm mb-0.5">{item.title}</p>
                        <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/5 border border-purple-500/15">
                  <p className="text-sm text-gray-300 text-center font-medium">
                    Serving the World, One Digital Solution at a Time
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Taruna Technology working with worldwide to deliver excellence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
