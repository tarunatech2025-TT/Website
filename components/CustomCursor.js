'use client';

import { useEffect } from 'react';

function lerp(a, b, speed, dt) {
  const t = 1 - Math.pow(1 - 1 / speed, dt * 60);
  return a + (b - a) * t;
}

const DOT_SPEED = 8;

// Matches every element that has cursor:pointer in globals.css.
// Keep in sync with the CSS rule.
const CLICKABLE_SELECTOR = [
  'a',
  'button',
  '[role="button"]',
  'input[type="submit"]',
  'input[type="button"]',
  'input[type="reset"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
  'select',
  'label[for]',
  'summary',
  '[tabindex]:not([tabindex="-1"])',
  '.cursor-pointer',
  '[data-cursor-pointer]',
].join(', ');

class Particle {
  constructor(x, y) {
    this.x     = x;
    this.y     = y;
    this.life  = 1.0;
    this.decay = 0.07 + Math.random() * 0.04;
    this.r     = 2 + Math.random() * 2;
    this.vx    = (Math.random() - 0.5) * 0.5;
    this.vy    = (Math.random() - 0.5) * 0.5;
    this.pink  = Math.random() > 0.5;
  }

  update() {
    this.x    += this.vx;
    this.y    += this.vy;
    this.life -= this.decay;
    this.vx   *= 0.96;
    this.vy   *= 0.96;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const alpha = (this.life * 0.6).toFixed(3);
    const color = this.pink
      ? `rgba(236,72,153,${alpha})`
      : `rgba(168,85,247,${alpha})`;

    const grd = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.r * 2.5
    );
    grd.addColorStop(0, color);
    grd.addColorStop(1, this.pink ? 'rgba(236,72,153,0)' : 'rgba(168,85,247,0)');

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Guard: skip entirely on touch / coarse-pointer / no-hover devices.
    // Covers phones, tablets, stylus-only devices, and hybrid tablets in
    // touch mode. The CSS @media rule is a belt-and-suspenders backup.
    const coarse   = window.matchMedia('(pointer: coarse)');
    const noHover  = window.matchMedia('(hover: none)');
    if (coarse.matches || noHover.matches) return;

    // ── Canvas ────────────────────────────────────────────────────────────────
    // pointer-events:none keeps the canvas out of hit-testing so the browser
    // resolves cursor style from the real element underneath.
    const canvas = document.createElement('canvas');
    canvas.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:99999',
      'pointer-events:none', 'width:100%', 'height:100%',
    ].join(';');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── Map-iframe style ──────────────────────────────────────────────────────
    const mapStyle = document.createElement('style');
    mapStyle.id = 'tt-cursor-map';
    mapStyle.textContent = '[data-map-iframe] { cursor: auto !important; }';

    // ── State ─────────────────────────────────────────────────────────────────
    let mx = -300, my = -300;
    let cx = -300, cy = -300;
    let inWindow      = false;
    let inMap         = false;
    let overClickable = false;
    let moving        = false;
    let moveTimer     = null;
    let particles     = [];
    let lastSpawn     = 0;
    let lastTs        = 0;
    let raf;

    // ── Canvas show / hide ────────────────────────────────────────────────────
    const showDot = () => {
      canvas.style.visibility = 'visible';
    };
    const hideDot = () => {
      canvas.style.visibility = 'hidden';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = [];
    };

    // ── Clickable enter / leave — event delegation ────────────────────────────
    // Using mouseover/mouseout (which bubble) instead of polling elementFromPoint
    // on every mousemove. This fires exactly once per element transition with no
    // missed frames and no flicker from child-element re-entry.
    const onDocMouseOver = (e) => {
      // Skip map iframe — handled separately
      if (e.target?.dataset?.mapIframe === 'true') return;
      if (e.target?.closest(CLICKABLE_SELECTOR)) {
        if (!overClickable) {
          overClickable = true;
          hideDot();
        }
      }
    };

    const onDocMouseOut = (e) => {
      if (e.target?.dataset?.mapIframe === 'true') return;
      if (e.target?.closest(CLICKABLE_SELECTOR)) {
        // relatedTarget is where the mouse is going.
        // If it's still inside a clickable, stay hidden.
        if (!e.relatedTarget || !e.relatedTarget?.closest?.(CLICKABLE_SELECTOR)) {
          overClickable = false;
          if (!inMap) showDot();
        }
      }
    };

    document.addEventListener('mouseover', onDocMouseOver, { passive: true });
    document.addEventListener('mouseout',  onDocMouseOut,  { passive: true });

    // ── Map iframe enter / leave ──────────────────────────────────────────────
    const enterMap = () => {
      if (inMap) return;
      inMap = true;
      hideDot();
      moving = false;
      document.head.appendChild(mapStyle);
    };

    const leaveMap = () => {
      if (!inMap) return;
      inMap = false;
      mapStyle.remove();
      if (!overClickable) showDot();
    };

    const onMapOver = (e) => {
      if (e.target?.dataset?.mapIframe === 'true') enterMap();
    };
    const onMapOut = (e) => {
      if (e.target?.dataset?.mapIframe === 'true') {
        if (!e.relatedTarget || e.relatedTarget?.dataset?.mapIframe !== 'true') {
          leaveMap();
        }
      }
    };
    document.addEventListener('mouseover', onMapOver, { passive: true });
    document.addEventListener('mouseout',  onMapOut,  { passive: true });

    // Cross-origin iframes steal window focus without firing mouseleave.
    const onBlur = () => {
      const mapEl = document.querySelector('[data-map-iframe]');
      if (mapEl) {
        const rect = mapEl.getBoundingClientRect();
        if (mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom) {
          enterMap();
          return;
        }
      }
      inWindow = false;
      particles = [];
    };
    const onFocus = () => { leaveMap(); inWindow = true; };

    window.addEventListener('blur',  onBlur,  { passive: true });
    window.addEventListener('focus', onFocus, { passive: true });

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const onMove = (e) => {
      if (inMap) return;
      mx = e.clientX;
      my = e.clientY;
      inWindow = true;
      moving   = true;
      clearTimeout(moveTimer);
      moveTimer = setTimeout(() => { moving = false; }, 120);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Visibility ────────────────────────────────────────────────────────────
    const hide = () => { inWindow = false; particles = []; };
    const show = () => { inWindow = true; };
    document.addEventListener('mouseleave',       hide, { passive: true });
    document.addEventListener('mouseenter',       show, { passive: true });
    document.addEventListener('visibilitychange', () => { document.hidden ? hide() : show(); });

    // ── RAF loop ──────────────────────────────────────────────────────────────
    function loop(ts) {
      raf = requestAnimationFrame(loop);

      // Don't draw while the dot is hidden — prevents any stale pixel bleed
      if (inMap || overClickable) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!inWindow) return;

      const dt = Math.min((ts - (lastTs || ts)) / 1000, 0.1);
      lastTs = ts;

      cx = lerp(cx, mx, DOT_SPEED, dt);
      cy = lerp(cy, my, DOT_SPEED, dt);

      if (moving && ts - lastSpawn > 45 && particles.length < 5) {
        particles.push(new Particle(cx, cy));
        lastSpawn = ts;
      }

      particles = particles.filter(p => p.life > 0);
      for (const p of particles) { p.update(); p.draw(ctx); }

      // ── Center dot ──────────────────────────────────────────────────────────
      const r = 5;

      const ambient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 5);
      ambient.addColorStop(0,   'rgba(168,85,247,0.18)');
      ambient.addColorStop(0.5, 'rgba(236,72,153,0.07)');
      ambient.addColorStop(1,   'rgba(168,85,247,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r * 5, 0, Math.PI * 2);
      ctx.fillStyle = ambient;
      ctx.fill();

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.2);
      glow.addColorStop(0,   'rgba(236,72,153,0.55)');
      glow.addColorStop(0.6, 'rgba(168,85,247,0.30)');
      glow.addColorStop(1,   'rgba(168,85,247,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      core.addColorStop(0,    'rgba(255,255,255,1)');
      core.addColorStop(0.4,  'rgba(255,200,230,0.95)');
      core.addColorStop(0.75, 'rgba(236,72,153,0.90)');
      core.addColorStop(1,    'rgba(168,85,247,0.80)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();
    }

    raf = requestAnimationFrame(loop);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(moveTimer);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('blur',      onBlur);
      window.removeEventListener('focus',     onFocus);
      document.removeEventListener('mouseover',        onDocMouseOver);
      document.removeEventListener('mouseout',         onDocMouseOut);
      document.removeEventListener('mouseover',        onMapOver);
      document.removeEventListener('mouseout',         onMapOut);
      document.removeEventListener('mouseleave',       hide);
      document.removeEventListener('mouseenter',       show);
      document.removeEventListener('visibilitychange', () => {});
      canvas.remove();
      document.getElementById('tt-cursor-map')?.remove();
    };
  }, []);

  return null;
}
