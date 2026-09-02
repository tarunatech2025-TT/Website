'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    let lenis;
    let rafId;
    let isMounted = true;
    
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        if (!isMounted) return;

        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        lenisRef.current = lenis;
        window.__lenis = lenis;

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      } catch (e) {
        console.log('Lenis not available, using default scroll');
      }
    };

    initLenis();

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // ── Scroll-to-top on every route change ──────────────────────────────────
  // Lenis holds its own scroll position in memory. On mobile, smoothTouch is
  // disabled so Lenis never intercepts touch scroll — meaning native scroll
  // position is NOT reset by Lenis on navigation. We must reset both manually.
  useEffect(() => {
    if (lenisRef.current) {
      // Reset Lenis internal position instantly (no animation)
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    // Always reset the native scroll position as well.
    // This covers: mobile (where Lenis doesn't control scroll),
    // the brief window before Lenis initialises, and any fallback scenario.
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
