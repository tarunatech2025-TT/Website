'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

export default function ConsultationManager() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [hasSeenModal, setHasSeenModal] = useState(false);
  const [bottomOffset, setBottomOffset] = useState('24px');
  const rafRef = useRef(null);

  // Check if user has seen modal before
  useEffect(() => {
    const seen = sessionStorage.getItem('tt_consult_seen');
    setHasSeenModal(!!seen);
    
    if (!seen) {
      // First visit - modal will auto-open, show button after it closes
      const timer = setTimeout(() => {
        setModalOpen(true);
        sessionStorage.setItem('tt_consult_seen', '1');
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      // Returning visitor - show button immediately
      setShowButton(true);
    }
  }, []);

  // Raise the widget slightly when footer links are about to be overlapped.
  // On mobile (< 768px) skip footer detection — just stay fixed at the default offset.
  useEffect(() => {
    const DEFAULT_BOTTOM = 24; // px — resting position
    const MAX_LIFT       = 120; // px — hard cap so it never flies near the navbar
    const GAP            = 12;  // px — breathing room above footer

    const updateOffset = () => {
      // Mobile: no footer avoidance, stay put
      if (window.innerWidth < 768) {
        setBottomOffset(`${DEFAULT_BOTTOM}px`);
        return;
      }

      const footer = document.querySelector('footer');
      if (!footer) {
        setBottomOffset(`${DEFAULT_BOTTOM}px`);
        return;
      }

      const footerTop  = footer.getBoundingClientRect().top;
      const viewportH  = window.innerHeight;

      // How many px of the footer are currently scrolled into view
      const overlap = Math.max(0, viewportH - footerTop);

      if (overlap > 0) {
        // Lift only as much as needed, but never more than MAX_LIFT
        const lift = Math.min(overlap + GAP, MAX_LIFT);
        setBottomOffset(`${lift}px`);
      } else {
        setBottomOffset(`${DEFAULT_BOTTOM}px`);
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleModalChange = (isOpen) => {
    setModalOpen(isOpen);
    
    // Show button when modal is closed
    if (!isOpen) {
      setTimeout(() => setShowButton(true), 300);
    }
  };

  const handleButtonClick = () => {
    setShowButton(false);
    setTimeout(() => setModalOpen(true), 100);
  };

  return (
    <>
      {/* Consultation Modal */}
      <ConsultationModal isOpen={modalOpen} onOpenChange={handleModalChange} />

      {/* Floating Consultation Button */}
      <AnimatePresence>
        {showButton && !modalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[9999]"
            style={{
              bottom: bottomOffset,
              right: 'clamp(16px, 4vw, 24px)',
              transition: 'bottom 0.18s ease-out',
            }}
          >
            {/* Tooltip - hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none hidden lg:block"
              style={{
                background: 'rgba(8,4,26,0.95)',
                border: '1px solid rgba(168,85,247,0.30)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4), 0 0 20px rgba(168,85,247,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="text-xs font-semibold text-white">Consultation</span>
              <div
                className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full w-0 h-0"
                style={{
                  borderLeft: '6px solid rgba(168,85,247,0.30)',
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                }}
              />
            </motion.div>

            {/* Button */}
            <motion.button
              onClick={handleButtonClick}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-full flex items-center justify-center text-white overflow-hidden group"
              style={{
                width: 'clamp(52px, 12vw, 56px)',
                height: 'clamp(52px, 12vw, 56px)',
                background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                boxShadow: '0 4px 24px rgba(168,85,247,0.50), 0 0 0 1px rgba(236,72,153,0.25)',
              }}
              aria-label="Open Consultation"
            >
              {/* Pulse rings */}
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: 'rgba(168,85,247,0.40)',
                  animationDuration: '2s',
                }}
              />
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                  boxShadow: '0 0 30px rgba(168,85,247,0.60)',
                }}
              />

              {/* Icon */}
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
                className="relative z-10"
              >
                <MessageCircle size={24} strokeWidth={2} />
              </motion.div>

              {/* Shimmer effect */}
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
