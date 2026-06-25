'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import LegalModal, { TermsModal } from '@/components/LegalModal';
import { useEnrollmentModal } from './ClientLayout';

// ── Data ─────────────────────────────────────────────────────────────────────
const footerServices = [
  { label: 'Customized Software', href: '/services/customized-software' },
  { label: 'Mobile App',          href: '/services/mobile-app' },
  { label: 'ERP Solutions',       href: '/services/erp' },
  { label: 'CRM Solutions',       href: '/services/crm' },
  { label: 'SEO Marketing',       href: '/services/seo-marketing' },
  { label: 'Web Hosting',         href: '/services/web-hosting' },
  { label: 'Dynamic Website',     href: '/services/dynamic-website' },
  { label: 'Static Website',      href: '/services/static-website' },
  { label: 'Data Gathering',      href: '/services/data-gathering' },
];

const quickLinks = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  { label: 'Services',     href: '/services' },
  { label: 'Products',     href: '/products' },
  { label: 'Education',    href: '/education' },
  { label: 'Global Reach', href: '/global-reach' },
  { label: 'Contact',      href: '/contact' },
  { label: 'Apply Now',    href: '/apply-now', isButton: true },
];

// Social links
const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/taruna-technology',
    glowColor: 'rgba(10,102,194,0.70)',
    hoverBorder: 'rgba(10,102,194,0.55)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tarunatech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    glowColor: 'rgba(225,48,108,0.70)',
    hoverBorder: 'rgba(225,48,108,0.55)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1BCtDZqv3W/?mibextid=wwXIfr',
    glowColor: 'rgba(24,119,242,0.70)',
    hoverBorder: 'rgba(24,119,242,0.55)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];



// ── Sub-components ────────────────────────────────────────────────────────────
function SocialIcon({ social }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '34px',
        height: '34px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? social.hoverBorder : 'rgba(255,255,255,0.08)'}`,
        color: hovered ? '#fff' : 'rgba(156,163,175,1)',
        boxShadow: hovered ? `0 0 16px -2px ${social.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)` : 'none',
        transform: hovered ? 'scale(1.12) translateY(-1px)' : 'scale(1) translateY(0)',
        transition: 'all 0.22s cubic-bezier(0.25,1,0.5,1)',
        flexShrink: 0,
      }}
    >
      {social.icon}
    </a>
  );
}

function FooterLink({ item, onButtonClick }) {
  const [hovered, setHovered] = useState(false);
  
  // If it's a button (Apply Now), render as button instead of Link
  if (item.isButton) {
    return (
      <li>
        <button
          onClick={onButtonClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="inline-flex items-center gap-2 text-xs transition-colors duration-200"
          style={{ color: hovered ? '#f472b6' : 'rgba(156,163,175,1)' }}
        >
          <ArrowRight
            size={10}
            className="flex-shrink-0 transition-all duration-200"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
              color: '#f472b6',
            }}
          />
          <span
            style={{
              transform: hovered ? 'translateX(2px)' : 'translateX(0)',
              transition: 'transform 0.2s ease',
            }}
          >
            {item.label}
          </span>
        </button>
      </li>
    );
  }
  
  return (
    <li>
      {/* inline-flex so the hit area is exactly the content width, not the full column */}
      <Link
        href={item.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="inline-flex items-center gap-2 text-xs transition-colors duration-200"
        style={{ color: hovered ? '#f472b6' : 'rgba(156,163,175,1)' }}
      >
        <ArrowRight
          size={10}
          className="flex-shrink-0 transition-all duration-200"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
            color: '#f472b6',
          }}
        />
        <span
          style={{
            transform: hovered ? 'translateX(2px)' : 'translateX(0)',
            transition: 'transform 0.2s ease',
          }}
        >
          {item.label}
        </span>
      </Link>
    </li>
  );
}

function ContactRow({ href, icon: Icon, iconBg, iconColor, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    // Outer div is never the pointer target — it's just layout
    <div className="flex items-start gap-3">
      {/* Icon — decorative, not part of the clickable area */}
      <div
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: hovered ? iconBg.replace('0.10', '0.22').replace('0.08', '0.20') : iconBg,
          boxShadow: hovered ? `0 0 12px -2px ${iconColor}` : 'none',
          transition: 'all 0.22s ease',
          flexShrink: 0,
          marginTop: '1px',
        }}
      >
        <Icon size={13} style={{ color: iconColor }} />
      </div>

      {/* Text — inline so the hit area is exactly the text, not the full row */}
      {href ? (
        <a
          href={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="text-xs leading-relaxed transition-colors duration-200 inline"
          style={{ color: hovered ? '#f472b6' : 'rgba(156,163,175,1)' }}
        >
          {children}
        </a>
      ) : (
        <span className="text-xs leading-relaxed" style={{ color: 'rgba(156,163,175,1)' }}>
          {children}
        </span>
      )}
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen,   setTermsOpen]   = useState(false);
  const { openEnrollmentModal } = useEnrollmentModal();

  return (
    <footer className="relative bg-[#060614] overflow-hidden">

      {/* ── Background effects ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top neon separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
        {/* Ambient purple bloom — centre */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[320px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, rgba(168,85,247,0.04) 50%, transparent 70%)', filter: 'blur(80px)' }} />
        {/* Pink accent — bottom left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[200px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(rgba(168,85,247,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      <div className="relative site-container pt-10 sm:pt-14 pb-6">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 xl:gap-12 mb-10 sm:mb-12">

          {/* ── Col 1: Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-block mb-4 sm:mb-5 group">
              <div className="relative">
                {/* Neon glow behind logo */}
                <div className="absolute inset-0 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse, rgba(232,121,249,0.25) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)', transform: 'scale(1.3)' }} />
                <Image
                  src="/logo.png"
                  alt="Taruna Technology — Inspiring the Intelligence"
                  width={220}
                  height={77}
                  className="relative object-contain drop-shadow-[0_0_12px_rgba(232,121,249,0.25)] group-hover:drop-shadow-[0_0_22px_rgba(232,121,249,0.50)] transition-all duration-300"
                  style={{ width: '175px', height: 'auto' }}
                  unoptimized
                />
              </div>
            </Link>

            {/* Description */}
            <p className="text-gray-400 text-xs leading-[1.8] mb-4 sm:mb-6 max-w-[260px]">
              Delivering comprehensive IT solutions designed to accelerate business growth. Trusted by companies across 35+ countries worldwide.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map((s) => <SocialIcon key={s.label} social={s} />)}
            </div>
          </div>

          {/* ── Mobile-optimized grid for Services + Quick Links ── */}
          {/* On mobile (min-380px): 2-column grid side by side */}
          {/* Below 380px: stacked single column */}
          <div className="grid grid-cols-2 min-[380px]:grid-cols-2 sm:contents gap-4 sm:gap-0">
            
            {/* ── Col 2: Services ── */}
            <div>
              <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.22em] mb-3 sm:mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-gradient-to-r from-pink-500 to-purple-500" />
                Services
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerServices.map((item) => <FooterLink key={item.label} item={item} />)}
              </ul>
            </div>

            {/* ── Col 3: Quick Links ── */}
            <div>
              <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.22em] mb-3 sm:mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-gradient-to-r from-pink-500 to-purple-500" />
                Quick Links
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((item) => (
                  <FooterLink 
                    key={item.label} 
                    item={item}
                    onButtonClick={item.isButton ? () => openEnrollmentModal() : undefined}
                  />
                ))}
              </ul>
            </div>

          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.22em] mb-3 sm:mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-gradient-to-r from-pink-500 to-purple-500" />
              Contact Us
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <ContactRow
                href="tel:+919106610595"
                icon={Phone}
                iconBg="rgba(236,72,153,0.10)"
                iconColor="rgba(244,114,182,1)"
              >
                +91 91066 10595
              </ContactRow>
              <ContactRow
                href="mailto:tarunatechnology@gmail.com"
                icon={Mail}
                iconBg="rgba(168,85,247,0.10)"
                iconColor="rgba(192,132,252,1)"
              >
                tarunatechnology@gmail.com
              </ContactRow>
              <ContactRow
                icon={MapPin}
                iconBg="rgba(59,130,246,0.08)"
                iconColor="rgba(96,165,250,1)"
              >
                <span className="flex items-center gap-1.5 font-semibold text-white mb-0.5">
                  <img src="https://flagcdn.com/w20/in.png" alt="India" width={16} height={12} style={{ display: 'inline', verticalAlign: 'middle', borderRadius: '1px' }} />
                  India
                </span>
                709–710 Broadway Empire,<br />
                Nilamber Circle,<br />
                Vasna Bhayli Main Rd,<br />
                Vadodara, Gujarat 391410<br />
                <a href="tel:+919106610595" className="transition-colors duration-200" style={{ color: '#f472b6' }}>+91 91066 10595</a>
                <span className="flex items-center gap-1.5 font-semibold text-white mb-0.5 mt-3">
                  <img src="https://flagcdn.com/w20/us.png" alt="USA" width={16} height={12} style={{ display: 'inline', verticalAlign: 'middle', borderRadius: '1px' }} />
                  USA
                </span>
                7575 Bellaire Blvd,<br />
                Houston, TX 77036,<br />
                United States<br />
                <a href="tel:+18329292131" className="transition-colors duration-200" style={{ color: '#f472b6' }}>+1 (832) 929-2131</a>
              </ContactRow>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Glowing top border accent */}
          <div className="h-px -mt-5 mb-5 bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-[11px]">
              © {new Date().getFullYear()} Taruna Technology. All rights reserved.
            </p>

            <div className="flex items-center gap-1">
              {/* Privacy Policy — opens modal */}
              <button
                onClick={() => setPrivacyOpen(true)}
                className="text-[11px] text-gray-600 hover:text-purple-400 transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <span className="text-gray-700 text-[10px]">·</span>
              {/* Terms of Service — opens modal */}
              <button
                onClick={() => setTermsOpen(true)}
                className="text-[11px] text-gray-600 hover:text-purple-400 transition-colors duration-200"
              >
                Terms of Service
              </button>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-center mt-4 text-[10px] tracking-[0.35em] uppercase font-medium"
            style={{ color: 'rgba(168,85,247,0.40)' }}>
            ✦ &nbsp;Inspiring the Intelligence&nbsp; ✦
          </p>
        </div>

      </div>

      {/* Legal modals */}
      <LegalModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal  open={termsOpen}   onClose={() => setTermsOpen(false)}   />

    </footer>
  );
}
