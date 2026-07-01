'use client';

import { useEffect, useRef } from 'react';

export default function SectionParticles() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');

    const COLORS = ['168,85,247', '232,121,249', '56,189,248', '139,92,246'];
    const mobile = () => window.innerWidth < 768;
    const COUNT  = mobile() ? 20 : 75;
    const CONN   = 130;
    const CUR    = 190;

    // 30fps throttle for mobile
    const MOBILE_INTERVAL = 1000 / 30;
    let lastTime = 0;

    let particles = [], animId, W = 0, H = 0, t = 0;

    class P {
      constructor() { this.init(true); }
      init(rand = false) {
        this.x  = Math.random() * W;
        this.y  = rand ? Math.random() * H : (Math.random() > 0.5 ? -8 : H + 8);
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r  = Math.random() * 1.4 + 0.4;
        this.bo = Math.random() * 0.4 + 0.15;
        this.o  = this.bo;
        this.c  = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.ps = Math.random() * 0.016 + 0.007;
        this.po = Math.random() * Math.PI * 2;
      }
      tick(t) {
        this.x += this.vx; this.y += this.vy;
        this.o = this.bo + Math.sin(t * this.ps + this.po) * 0.1;
        if (this.x < -10) this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
        if (this.y < -10) this.y = H + 10;
        if (this.y > H + 10) this.y = -10;
      }
      draw(isMob) {
        if (isMob) {
          // Flat circle — no gradient allocation on mobile
          ctx.beginPath(); ctx.arc(this.x, this.y, this.r + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.c},${this.o})`; ctx.fill();
        } else {
          const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
          g.addColorStop(0, `rgba(${this.c},${this.o})`);
          g.addColorStop(1, `rgba(${this.c},0)`);
          ctx.beginPath(); ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
          ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.c},${Math.min(this.o + 0.3, 1)})`; ctx.fill();
        }
      }
    }

    const ln = (x1, y1, x2, y2, a, c, w = 0.6) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(${c},${a})`; ctx.lineWidth = w; ctx.stroke();
    };

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      const count = mobile() ? 20 : 75;
      while (particles.length < count) particles.push(new P());
      while (particles.length > count) particles.pop();
    };

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    const loop = (timestamp) => {
      animId = requestAnimationFrame(loop);
      const isMob = mobile();

      // Throttle to 30fps on mobile
      if (isMob && timestamp - lastTime < MOBILE_INTERVAL) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, W, H); t++;
      const { x: mx, y: my } = mouseRef.current;
      const hasCur = mx > -1000;

      // Cursor interaction: desktop only (touch has no mousemove)
      if (hasCur && !isMob) {
        for (const p of particles) {
          const dx = p.x - mx, dy = p.y - my;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CUR) {
            ln(p.x, p.y, mx, my, (1 - d / CUR) * 0.55, '232,121,249', 0.7);
            p.vx += (mx - p.x) * 0.00014;
            p.vy += (my - p.y) * 0.00014;
            const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (spd > 1) { p.vx = p.vx / spd; p.vy = p.vy / spd; }
          }
        }
      }

      for (const p of particles) { p.tick(t); p.draw(isMob); }
    };

    resize();
    particles = Array.from({ length: mobile() ? 20 : 75 }, () => new P());
    loop(0);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
