'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Shield, Eye, Database, Lock, Cookie, Users, Share2,
  UserCheck, Mail, Phone, MapPin, RefreshCw, FileText,
  CheckSquare, Cpu, Briefcase, CreditCard, AlertTriangle,
  Info, Globe, XCircle, Edit, Scale,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
//  SHARED PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════════

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm leading-relaxed">
          <span
            className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full"
            style={{ background: 'linear-gradient(135deg,#a855f7,#e879f9)' }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PolicyCard({ icon: Icon, title, accentColor, children }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right,transparent,${accentColor},transparent)` }}
      />
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: accentColor, filter: 'blur(32px)', opacity: 0.18 }}
      />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(168,85,247,0.12)',
              border: '1px solid rgba(168,85,247,0.25)',
              boxShadow: '0 0 16px -4px rgba(168,85,247,0.35)',
            }}
          >
            <Icon size={16} className="text-purple-400" />
          </div>
          <h3 className="text-white font-bold text-base leading-tight">{title}</h3>
        </div>
        <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PRIVACY POLICY CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const PRIVACY_SECTIONS = [
  {
    id: 'pp1', icon: Shield, title: '1. Introduction',
    accentColor: 'rgba(168,85,247,0.40)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed">
          Taruna Technology respects your privacy and is committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and safeguard information
          when you visit our website or contact us.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mt-3">
          By using our website or services, you agree to the terms described in this policy.
          We encourage you to read it carefully.
        </p>
      </>
    ),
  },
  {
    id: 'pp2', icon: Database, title: '2. Information We Collect',
    accentColor: 'rgba(34,211,238,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          When you contact us or submit forms on our website, we may collect:
        </p>
        <BulletList items={[
          'Full Name', 'Email Address', 'Phone Number', 'Company Name',
          'Project Requirements', 'Information submitted through contact forms',
        ]} />
      </>
    ),
  },
  {
    id: 'pp3', icon: Eye, title: '3. Automatically Collected Information',
    accentColor: 'rgba(56,189,248,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          When you visit our website, we may automatically collect:
        </p>
        <BulletList items={[
          'IP Address', 'Browser Type', 'Device Information',
          'Operating System', 'Website Usage Statistics', 'Date and Time of Visits',
        ]} />
      </>
    ),
  },
  {
    id: 'pp4', icon: Users, title: '4. How We Use Your Information',
    accentColor: 'rgba(244,114,182,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          The information we collect is used strictly for legitimate business purposes:
        </p>
        <BulletList items={[
          'Respond to your inquiries and messages',
          'Discuss project requirements and provide proposals',
          'Deliver software development and IT services',
          'Improve website performance and user experience',
          'Maintain ongoing communication regarding services',
          'Ensure website security and prevent fraud',
        ]} />
      </>
    ),
  },
  {
    id: 'pp5', icon: Lock, title: '5. Data Protection & Confidentiality',
    accentColor: 'rgba(168,85,247,0.50)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Any personal, business, or project-related information shared with us is treated as
          strictly confidential.
        </p>
        <BulletList items={[
          'We do not sell, rent, or trade personal information to third parties.',
          'All project details remain private and confidential.',
          'Client data is accessible only to authorized personnel.',
          'We implement reasonable technical and organizational security measures.',
          'We protect client information from unauthorized access, disclosure, or misuse.',
        ]} />
        <div
          className="mt-4 p-3.5 rounded-xl flex items-start gap-3"
          style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.20)' }}
        >
          <Lock size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
          <p className="text-purple-200 text-xs leading-relaxed">
            Your data security is our priority. We regularly review our practices to ensure
            your information is always protected.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'pp6', icon: Cookie, title: '6. Cookies & Analytics',
    accentColor: 'rgba(251,191,36,0.30)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Our website may use cookies and similar tracking technologies to:
        </p>
        <BulletList items={[
          'Improve website functionality and performance',
          'Analyze website traffic and usage patterns',
          'Remember user preferences and settings',
          'Enhance overall user experience',
        ]} />
        <p className="text-gray-400 text-xs leading-relaxed mt-4">
          You may configure your browser settings to refuse cookies, though this may affect
          certain website features.
        </p>
      </>
    ),
  },
  {
    id: 'pp7', icon: Share2, title: '7. Third-Party Services',
    accentColor: 'rgba(34,211,238,0.30)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          We may use trusted third-party service providers, including:
        </p>
        <BulletList items={[
          'Website Hosting Providers',
          'Email Service Providers',
          'Google Maps (for location services)',
          'Analytics Services (e.g., Google Analytics)',
        ]} />
        <p className="text-gray-400 text-xs leading-relaxed mt-4">
          These providers may process information according to their own privacy policies.
        </p>
      </>
    ),
  },
  {
    id: 'pp8', icon: Share2, title: '8. Data Sharing',
    accentColor: 'rgba(236,72,153,0.30)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          We do not share personal information with third parties except:
        </p>
        <BulletList items={[
          'When required by applicable law or legal process',
          'To protect our legal rights or the rights of others',
          'When strictly necessary to provide the services you have requested',
        ]} />
      </>
    ),
  },
  {
    id: 'pp9', icon: UserCheck, title: '9. User Rights',
    accentColor: 'rgba(99,179,255,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          You may contact us to request:
        </p>
        <BulletList items={[
          'Access to the personal information we hold about you',
          'Correction of any inaccurate or incomplete information',
          'Deletion of your personal information from our records',
          'Details regarding how your data is being used',
        ]} />
      </>
    ),
  },
  {
    id: 'pp10', icon: Mail, title: '10. Contact Information',
    accentColor: 'rgba(168,85,247,0.42)',
    content: (
      <div className="grid sm:grid-cols-2 gap-4 mt-1">
        <div
          className="rounded-xl p-4 space-y-2.5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <img src="https://flagcdn.com/w20/in.png" alt="India" width={16} height={12} className="rounded-sm" />
            <p className="text-white font-bold text-sm">India Office</p>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={12} className="text-purple-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-400 text-xs leading-relaxed">
              709-710 Broadway Empire, Nilamber Circle,<br />
              Vasna Bhayli Main Rd, Vadodara, Gujarat 391410
            </p>
          </div>
          <a href="tel:+919106610595" className="flex items-center gap-2 group">
            <Phone size={12} className="text-purple-400 flex-shrink-0" />
            <span className="text-gray-400 text-xs group-hover:text-purple-300 transition-colors">+91 91066 10595</span>
          </a>
          <a href="mailto:tarunatechnology@gmail.com" className="flex items-center gap-2 group">
            <Mail size={12} className="text-purple-400 flex-shrink-0" />
            <span className="text-gray-400 text-xs group-hover:text-purple-300 transition-colors break-all">tarunatechnology@gmail.com</span>
          </a>
        </div>
        <div
          className="rounded-xl p-4 space-y-2.5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <img src="https://flagcdn.com/w20/us.png" alt="USA" width={16} height={12} className="rounded-sm" />
            <p className="text-white font-bold text-sm">USA Office</p>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-400 text-xs leading-relaxed">
              7575 Bellaire Blvd,<br />
              Houston, TX 77036, United States
            </p>
          </div>
          <a href="tel:+18329292131" className="flex items-center gap-2 group">
            <Phone size={12} className="text-blue-400 flex-shrink-0" />
            <span className="text-gray-400 text-xs group-hover:text-blue-300 transition-colors">+1 (832) 929-2131</span>
          </a>
        </div>
      </div>
    ),
  },
  {
    id: 'pp11', icon: RefreshCw, title: '11. Policy Updates',
    accentColor: 'rgba(34,211,238,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes in our practices
          or applicable laws. Any changes will be posted on this page with an updated revision date.
        </p>
        <p className="text-gray-400 text-xs leading-relaxed mt-3">
          Your continued use of our website following any changes constitutes acceptance of the
          updated policy.
        </p>
        <div
          className="mt-4 p-3.5 rounded-xl flex items-center gap-3"
          style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.18)' }}
        >
          <RefreshCw size={13} className="text-cyan-400 flex-shrink-0" />
          <p className="text-cyan-200 text-xs leading-relaxed">
            Last updated: <strong className="text-white">June 12, 2026</strong>
          </p>
        </div>
      </>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  TERMS OF SERVICE CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const TERMS_SECTIONS = [
  {
    id: 'tos1', icon: CheckSquare, title: '1. Acceptance of Terms',
    accentColor: 'rgba(168,85,247,0.40)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed">
          By accessing or using the website and services of Taruna Technology, you agree to be
          bound by these Terms of Service. If you do not agree to these terms, please do not use
          our website or engage our services.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mt-3">
          These Terms apply to all visitors, users, and clients who access or use our services.
          We reserve the right to update these Terms at any time with notice posted on this page.
        </p>
      </>
    ),
  },
  {
    id: 'tos2', icon: Cpu, title: '2. Services',
    accentColor: 'rgba(34,211,238,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Taruna Technology provides a range of IT and software development services, including
          but not limited to:
        </p>
        <BulletList items={[
          'Custom Software Development',
          'Mobile Application Development',
          'Web Design and Development',
          'ERP and CRM Solutions',
          'SEO and Digital Marketing',
          'Web Hosting and Cloud Services',
          'IT Education and Training',
          'AI and Emerging Technology Solutions',
        ]} />
        <p className="text-gray-400 text-xs leading-relaxed mt-4">
          The scope, timeline, and deliverables of each engagement are defined in a separate
          project agreement or statement of work.
        </p>
      </>
    ),
  },
  {
    id: 'tos3', icon: Users, title: '3. User Responsibilities',
    accentColor: 'rgba(244,114,182,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          By using our services, you agree to:
        </p>
        <BulletList items={[
          'Provide accurate, complete, and up-to-date information when requested.',
          'Use our services only for lawful purposes.',
          'Not attempt to reverse-engineer, copy, or misuse any software or system we develop.',
          'Not engage in any activity that could disrupt or damage our website or services.',
          'Maintain confidentiality of any login credentials or access details shared with you.',
          'Promptly communicate any changes to project requirements or deadlines.',
        ]} />
      </>
    ),
  },
  {
    id: 'tos4', icon: Shield, title: '4. Intellectual Property',
    accentColor: 'rgba(168,85,247,0.45)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          All intellectual property rights related to our website, branding, and proprietary
          tools remain the exclusive property of Taruna Technology.
        </p>
        <BulletList items={[
          'Custom software and deliverables created for a client become the client\'s property upon full payment.',
          'Source code ownership is governed by the specific project agreement.',
          'Our company name, logo, and branding may not be used without prior written consent.',
          'Third-party components or libraries remain subject to their respective licenses.',
        ]} />
      </>
    ),
  },
  {
    id: 'tos5', icon: Briefcase, title: '5. Project Delivery & Client Obligations',
    accentColor: 'rgba(56,189,248,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          To ensure successful project completion, clients are expected to:
        </p>
        <BulletList items={[
          'Provide timely feedback, approvals, and required content or assets.',
          'Designate a primary point of contact for all project communications.',
          'Review and test deliverables within agreed timeframes.',
          'Notify us promptly of any defects or issues discovered post-delivery.',
          'Understand that delays caused by the client may affect project timelines and costs.',
        ]} />
        <p className="text-gray-400 text-xs leading-relaxed mt-4">
          Taruna Technology will make reasonable efforts to meet agreed milestones but is not
          liable for delays caused by circumstances beyond our control.
        </p>
      </>
    ),
  },
  {
    id: 'tos6', icon: CreditCard, title: '6. Payments & Billing',
    accentColor: 'rgba(251,191,36,0.30)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Payment terms are specified in each individual project agreement. General conditions include:
        </p>
        <BulletList items={[
          'Projects typically require an advance payment before work commences.',
          'Milestone payments may be required for larger engagements.',
          'All fees are non-refundable unless otherwise agreed in writing.',
          'Late payments may result in work suspension or project delays.',
          'Any additional work beyond the agreed scope will be quoted and billed separately.',
        ]} />
        <div
          className="mt-4 p-3.5 rounded-xl flex items-start gap-3"
          style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.20)' }}
        >
          <CreditCard size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-yellow-200 text-xs leading-relaxed">
            All payment terms are confirmed in writing before project commencement.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'tos7', icon: Share2, title: '7. Third-Party Services',
    accentColor: 'rgba(34,211,238,0.28)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Our services may involve the use of third-party platforms, tools, or APIs, including:
        </p>
        <BulletList items={[
          'Cloud hosting and infrastructure providers',
          'Payment gateways and billing systems',
          'Email and communication platforms',
          'Analytics and monitoring tools',
          'Open-source frameworks and libraries',
        ]} />
        <p className="text-gray-400 text-xs leading-relaxed mt-4">
          Taruna Technology is not responsible for the availability, accuracy, or policies of
          third-party services. Their use is subject to their respective terms and conditions.
        </p>
      </>
    ),
  },
  {
    id: 'tos8', icon: AlertTriangle, title: '8. Limitation of Liability',
    accentColor: 'rgba(236,72,153,0.30)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          To the fullest extent permitted by applicable law:
        </p>
        <BulletList items={[
          'Taruna Technology shall not be liable for any indirect, incidental, or consequential damages.',
          'Our total liability shall not exceed the total fees paid by the client for the specific project.',
          'We are not responsible for data loss due to client-side failures or third-party service outages.',
          'We are not liable for business loss resulting from delays beyond our reasonable control.',
        ]} />
      </>
    ),
  },
  {
    id: 'tos9', icon: Info, title: '9. Disclaimer',
    accentColor: 'rgba(99,179,255,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed">
          Our website and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis.
          Taruna Technology makes no warranties, express or implied, regarding the accuracy,
          reliability, or completeness of any content or services.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mt-3">
          We do not guarantee that our website will be uninterrupted, error-free, or free of
          viruses or other harmful components.
        </p>
      </>
    ),
  },
  {
    id: 'tos10', icon: Lock, title: '10. Privacy',
    accentColor: 'rgba(168,85,247,0.38)',
    content: (
      <p className="text-gray-300 text-sm leading-relaxed">
        Your use of our services is also governed by our Privacy Policy, which is incorporated
        into these Terms by reference. By using our services, you consent to the collection and
        use of information as described in our Privacy Policy. We encourage you to review it
        alongside these Terms.
      </p>
    ),
  },
  {
    id: 'tos11', icon: XCircle, title: '11. Termination',
    accentColor: 'rgba(236,72,153,0.32)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Either party may terminate a service engagement under the following conditions:
        </p>
        <BulletList items={[
          'Client may terminate with written notice subject to the agreed project terms.',
          'Taruna Technology reserves the right to suspend or terminate services for non-payment, breach of these Terms, or unethical conduct.',
          'Upon termination, all outstanding invoices become immediately due.',
          'Completed work up to the termination date remains billable.',
        ]} />
      </>
    ),
  },
  {
    id: 'tos12', icon: Edit, title: '12. Changes to Terms',
    accentColor: 'rgba(34,211,238,0.30)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed">
          Taruna Technology reserves the right to modify these Terms of Service at any time.
          Updated Terms will be posted on this page with a revised date. Continued use of our
          services after any modifications constitutes acceptance of the updated Terms.
        </p>
      </>
    ),
  },
  {
    id: 'tos13', icon: Scale, title: '13. Governing Law',
    accentColor: 'rgba(168,85,247,0.38)',
    content: (
      <>
        <p className="text-gray-300 text-sm leading-relaxed">
          These Terms of Service shall be governed by and construed in accordance with the laws
          of India. Any disputes arising from or related to these Terms shall be subject to the
          exclusive jurisdiction of the courts in Vadodara, Gujarat, India.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mt-3">
          For clients outside India, local laws may also apply. In the event of conflict,
          both parties agree to resolve disputes through good-faith negotiation before pursuing
          legal remedies.
        </p>
      </>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  MODAL SHELL  — identical chrome for both documents
// ═══════════════════════════════════════════════════════════════════════════════

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.20 } },
};
const panelVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.97, y: 8,  transition: { duration: 0.20, ease: [0.22, 1, 0.36, 1] } },
};

function ModalShell({ open, onClose, title, ariaLabel, headerIcon: HeaderIcon, trustPills, sections, afterSections }) {
  const scrollRef = useRef(null);

  // ESC key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Scroll lock — native + Lenis
  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow             = 'hidden';
      const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow             = '';
      document.body.style.paddingRight         = '';
      window.__lenis?.start();
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow             = '';
      document.body.style.paddingRight         = '';
      window.__lenis?.start();
    };
  }, [open]);

  // Reset scroll to top on open
  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="lm-backdrop"
            variants={backdropVariants}
            initial="hidden" animate="visible" exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[9998]"
            style={{ background: 'rgba(4,4,15,0.82)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            aria-hidden="true"
          />

          {/* Panel container — catches backdrop clicks that slip through */}
          <motion.div
            key="lm-panel"
            variants={panelVariants}
            initial="hidden" animate="visible" exit="exit"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            {/* Inner panel — stops propagation so clicks inside don't close */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col overflow-hidden"
              style={{
                width: '90vw',
                maxWidth: '1000px',
                maxHeight: '90vh',
                borderRadius: '20px',
                background: 'rgba(10,8,28,0.95)',
                border: '1px solid rgba(168,85,247,0.28)',
                boxShadow:
                  '0 0 0 1px rgba(168,85,247,0.10),' +
                  '0 32px 80px rgba(0,0,0,0.70),' +
                  '0 0 60px -10px rgba(168,85,247,0.25),' +
                  'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              {/* Gradient shimmer overlay */}
              <div
                className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.12) 0%,transparent 50%,rgba(236,72,153,0.08) 100%)' }}
              />
              {/* Ambient blobs */}
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.14) 0%,transparent 70%)', filter: 'blur(40px)' }} />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.10) 0%,transparent 70%)', filter: 'blur(36px)' }} />

              {/* ── Fixed header ── */}
              <div
                className="relative flex-shrink-0 flex items-start justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-[20px]"
                  style={{ background: 'linear-gradient(to right,transparent,rgba(168,85,247,0.55),rgba(236,72,153,0.35),transparent)' }} />

                <div>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
                    style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.28)', color: '#c084fc' }}
                  >
                    <HeaderIcon size={9} className="text-purple-400" />
                    Taruna Technology
                  </div>
                  <h2 className="text-white font-black text-xl sm:text-2xl leading-tight">{title}</h2>
                  <p className="text-gray-500 text-xs mt-1 flex items-center gap-1.5">
                    <RefreshCw size={10} className="text-purple-500" />
                    Last Updated: <span className="text-gray-400 font-medium">June 12, 2026</span>
                  </p>
                </div>

                <button
                  onClick={onClose}
                  aria-label={`Close ${title}`}
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', marginTop: '2px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background   = 'rgba(236,72,153,0.15)';
                    e.currentTarget.style.borderColor  = 'rgba(236,72,153,0.35)';
                    e.currentTarget.style.boxShadow    = '0 0 16px -4px rgba(236,72,153,0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background   = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.10)';
                    e.currentTarget.style.boxShadow    = 'none';
                  }}
                >
                  <X size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* ── Scrollable content ── */}
              <div
                ref={scrollRef}
                className="lm-scroll relative flex-1 overflow-y-auto overscroll-contain"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(168,85,247,0.40) transparent',
                  WebkitOverflowScrolling: 'touch',
                  minHeight: 0,
                }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <style>{`
                  .lm-scroll::-webkit-scrollbar { width: 4px; }
                  .lm-scroll::-webkit-scrollbar-track { background: transparent; }
                  .lm-scroll::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.40); border-radius: 2px; }
                  .lm-scroll::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.65); }
                `}</style>

                <div className="px-6 py-6 sm:px-8 sm:py-8 space-y-4">
                  {/* Trust pills */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {trustPills.map((t) => (
                      <span
                        key={t.label}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-300"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
                      >
                        <span>{t.icon}</span>{t.label}
                      </span>
                    ))}
                  </div>

                  {/* Sections */}
                  {sections.map(({ id, icon, title: sTitle, accentColor, content }) => (
                    <PolicyCard key={id} icon={icon} title={sTitle} accentColor={accentColor}>
                      {content}
                    </PolicyCard>
                  ))}

                  {/* After-sections content (e.g. Last Updated box for Terms) */}
                  {afterSections && afterSections}

                  <div className="h-4" />
                </div>
              </div>

              {/* ── Fixed footer ── */}
              <div
                className="relative flex-shrink-0 flex items-center justify-between gap-3 px-6 py-4 sm:px-8"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-gray-600 text-[11px]">
                  © {new Date().getFullYear()} Taruna Technology. All rights reserved.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg,rgba(124,58,237,0.80),rgba(168,85,247,0.70))',
                    border: '1px solid rgba(168,85,247,0.35)',
                    boxShadow: '0 0 16px -4px rgba(168,85,247,0.45)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 24px -4px rgba(168,85,247,0.70)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 16px -4px rgba(168,85,247,0.45)'; }}
                >
                  <X size={12} />
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PUBLIC EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

const PRIVACY_PILLS = [
  { icon: '🔒', label: 'Data Confidential'       },
  { icon: '🚫', label: 'Never Sold'              },
  { icon: '✅', label: 'Compliant & Transparent' },
];

const TERMS_PILLS = [
  { icon: '📋', label: 'Clear & Fair'    },
  { icon: '🤝', label: 'Client-Focused' },
  { icon: '⚖️', label: 'Legally Sound'  },
];

export function PrivacyPolicyModal({ open, onClose }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Privacy Policy"
      ariaLabel="Privacy Policy"
      headerIcon={Shield}
      trustPills={PRIVACY_PILLS}
      sections={PRIVACY_SECTIONS}
    />
  );
}

export function TermsModal({ open, onClose }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Terms of Service"
      ariaLabel="Terms of Service"
      headerIcon={FileText}
      trustPills={TERMS_PILLS}
      sections={TERMS_SECTIONS}
      afterSections={
        <div
          className="mt-4 p-3.5 rounded-xl flex items-center gap-3"
          style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.18)' }}
        >
          <RefreshCw size={13} className="text-cyan-400 flex-shrink-0" />
          <p className="text-cyan-200 text-xs leading-relaxed">
            Last updated: <strong className="text-white">June 12, 2026</strong>
          </p>
        </div>
      }
    />
  );
}

// Default export — kept so Footer's existing `import LegalModal from …` still works
export default PrivacyPolicyModal;
