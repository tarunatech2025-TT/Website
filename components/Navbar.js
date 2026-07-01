'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { useEnrollmentModal } from './ClientLayout';

// ── Premium NavItem — floating glass pill, no dot, no underline ─────────────
function NavItem({ link, isActive }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={link.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-300 select-none ${
        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      {/* Shared floating pill — slides between active items via layoutId */}
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(232,121,249,0.12) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(232,121,249,0.22)',
            boxShadow: '0 4px 24px rgba(168,85,247,0.18), 0 1px 0 rgba(255,255,255,0.08) inset',
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
        />
      )}

      {/* Hover ghost pill — only shows when not active */}
      {!isActive && (
        <motion.span
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.92,
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(168,85,247,0.06) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
      )}

      {/* Label */}
      <span className="relative z-10">{link.label}</span>
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openEnrollmentModal } = useEnrollmentModal();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* ── Main navbar ── */}
      <motion.nav
        initial={{ y: -110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-40 transition-all duration-400 ${
          isScrolled
            ? 'bg-[#080818]/85 backdrop-blur-2xl shadow-[0_8px_40px_rgba(168,85,247,0.12)] border-b border-white/6'
            : 'bg-[#080818]/40 backdrop-blur-xl border-b border-white/4'
        }`}
      >
        {/* Bottom neon accent line — always visible, brighter on scroll */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-400 pointer-events-none bg-gradient-to-r from-transparent via-pink-500/50 to-transparent ${
            isScrolled ? 'opacity-100' : 'opacity-30'
          }`}
        />

        <div className="site-container">
          <div
            className="flex items-center justify-between transition-[height] duration-300 ease-in-out"
            style={{ height: isScrolled ? '76px' : '96px' }}
          >

            {/* ── Logo ── */}
            <Link href="/" className="flex-shrink-0 group relative flex items-center py-2">
              {/* Ambient glow behind logo on hover */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/8 group-hover:to-purple-500/8 blur-xl transition-all duration-500 scale-125 pointer-events-none" />
              <Image
                src="/logo.png"
                alt="Taruna Technology — Inspiring the Intelligence"
                width={220}
                height={77}
                priority
                unoptimized
                className={`relative object-contain transition-all duration-400 ease-in-out
                  drop-shadow-[0_0_14px_rgba(232,121,249,0.22)]
                  group-hover:drop-shadow-[0_0_22px_rgba(232,121,249,0.50)]
                `}
                style={{
                  width: isScrolled ? 'clamp(116px, 12vw, 134px)' : 'clamp(136px, 14vw, 162px)',
                  height: 'auto',
                }}
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) =>
                link.isButton ? (
                  <button
                    key={link.label}
                    onClick={() => openEnrollmentModal()}
                    className="relative ml-4 px-5 py-2.5 text-white text-sm font-bold rounded-xl tracking-wide overflow-hidden
                      bg-gradient-to-r from-pink-600 to-purple-600
                      hover:from-pink-500 hover:to-purple-500
                      hover:-translate-y-0.5
                      hover:shadow-[0_4px_24px_rgba(232,121,249,0.45),0_0_0_1px_rgba(232,121,249,0.25)]
                      active:translate-y-0 transition-all duration-300 shadow-lg shadow-purple-900/30
                      after:absolute after:inset-0 after:bg-gradient-to-t after:from-white/0 after:to-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300"
                  >
                    {link.label}
                  </button>
                ) : (
                  <NavItem
                    key={link.label}
                    link={link}
                    isActive={isActive(link.href)}
                  />
                )
              )}
            </nav>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2.5 text-gray-300 hover:text-white transition-colors rounded-xl hover:bg-white/6 border border-white/8 active:scale-95"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="md:hidden bg-[#0b0b1f]/97 backdrop-blur-2xl border-t border-white/5 overflow-hidden"
            >
              {/* Links */}
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.2 }}
                  >
                    {link.isButton ? (
                      <button
                        onClick={() => {
                          openEnrollmentModal();
                          setIsMobileOpen(false);
                        }}
                        className="block w-full text-center px-4 py-3 mt-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-bold rounded-xl tracking-wide hover:from-pink-500 hover:to-purple-500 transition-all duration-200"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150 ${
                          isActive(link.href)
                            ? 'text-pink-400 bg-pink-500/10 border border-pink-500/20'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Tagline */}
              <div className="px-5 pb-5 pt-1">
                <p className="text-[10px] text-purple-400/50 tracking-[0.25em] uppercase font-medium">
                  Inspiring the Intelligence
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
