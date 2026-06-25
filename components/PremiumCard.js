'use client';

/**
 * PremiumCard — reusable glassmorphism card with contained premium hover.
 *
 * All glow effects are strictly inside the card via overflow-hidden.
 * No external box-shadow spread, no corner blobs bleeding outside.
 *
 * Props:
 *   rgb        {string}  — RGB accent, e.g. "168,85,247"
 *   lift       {number}  — px to lift on hover (default 4)
 *   className  {string}  — extra classes for the outer wrapper
 *   children   {node}    — card content
 *   style      {object}  — extra inline styles
 */

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function PremiumCard({
  rgb = '168,85,247',
  lift = 4,
  className = '',
  children,
  style = {},
}) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse]     = useState({ x: 50, y: 50 });
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setMouse({ x: 50, y: 50 }); }}
      onMouseMove={onMouseMove}
      animate={{ y: hovered ? -lift : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      // overflow-hidden is the key — clips ALL internal effects to card boundary
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        // Border brightens on hover — contained, no external spread
        border: `1px solid rgba(${rgb},${hovered ? 0.42 : 0.14})`,
        // box-shadow: only inset shadows — nothing escapes the card
        boxShadow: hovered
          ? `inset 0 1px 0 rgba(255,255,255,0.10),
             inset 0 0 24px -6px rgba(${rgb},0.14),
             0 4px 16px -4px rgba(0,0,0,0.35)`
          : `inset 0 1px 0 rgba(255,255,255,0.04),
             0 2px 8px -2px rgba(0,0,0,0.22)`,
        transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
        ...style,
      }}
    >
      {/* Mouse-follow radial spotlight — clipped by overflow-hidden on parent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(168,85,247,0.08) 0%, rgba(236,72,153,0.04) 30%, transparent 50%)`,
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* No top shimmer line — was causing the horizontal glow strip at card edges */}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
