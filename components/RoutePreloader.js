'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Preloader from './Preloader';

const ROUTE_TITLES = {
  '/': 'Welcome to Taruna Technology',
  '/about': 'About Taruna Technology',
  '/services': 'Enterprise Software Development',
  '/products': 'Smart Business Products',
  '/education': 'Professional Training Programs',
  '/global-reach': 'Connecting Businesses Worldwide',
  '/contact': "Let's Connect",
};

// Routes where the preloader is suppressed when navigating between them.
// Any transition where BOTH the previous and next path start with one of
// these prefixes will skip the preloader entirely.
const SILENT_PREFIXES = ['/services'];

function isSilentTransition(from, to) {
  return SILENT_PREFIXES.some(
    (prefix) => from?.startsWith(prefix) && to?.startsWith(prefix)
  );
}

export default function RoutePreloader() {
  const pathname = usePathname();
  const prevPathRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isNavigating, setIsNavigating] = useState(true);

  // Get the base path without dynamic segments
  const basePath = pathname?.split('/').slice(0, 2).join('/') || '/';
  const subtitle = ROUTE_TITLES[basePath] || 'Welcome to Taruna Technology';

  // Determine preloader duration based on route
  const isHomePage = basePath === '/';
  const preloaderDuration = isHomePage ? 3200 : 1900;

  // Handle route changes and preloader timing
  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Skip preloader for navigations within silent prefix groups
    // (e.g. /services → /services/crm, /services/crm → /services/erp)
    if (isSilentTransition(prevPath, pathname)) {
      setShowPreloader(false);
      setIsNavigating(false);
      return;
    }

    // Show preloader immediately when route changes
    setShowPreloader(true);
    setIsNavigating(true);

    // Hide preloader after animation completes
    const timer = setTimeout(() => {
      setShowPreloader(false);
      setIsNavigating(false);
    }, preloaderDuration);

    return () => clearTimeout(timer);
  }, [pathname, preloaderDuration]);

  return (
    <>
      {/* Preloader overlay */}
      {showPreloader && <Preloader key={pathname} subtitle={subtitle} duration={preloaderDuration} />}

      {/* Content blocker - prevents flash of content during navigation */}
      {isNavigating && showPreloader && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: '#050816',
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
}
