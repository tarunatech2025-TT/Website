'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Code2, Smartphone, LayoutGrid, Users, TrendingUp, Server, Globe, Layout, Cloud, Brain, Database, ChevronRight, ChevronDown } from 'lucide-react';
import { services } from '@/lib/data';

const iconMap = { Code2, Smartphone, LayoutGrid, Users, TrendingUp, Server, Globe, Layout, Cloud, Brain, Database };

const serviceDetails = {
  'customized-software': {
    description: 'We develop fully customized software solutions that align perfectly with your business processes. Our team analyzes your requirements in depth and builds scalable, secure, and high-performance applications that drive efficiency and growth.',
    features: ['Requirement Analysis & Planning', 'Custom Architecture Design', 'Agile Development Process', 'Quality Assurance & Testing', 'Deployment & Maintenance', 'Scalable & Secure Solutions'],
  },
  'mobile-app': {
    description: 'We create powerful, intuitive mobile applications for both iOS and Android platforms. From concept to deployment, our mobile development team delivers apps that provide exceptional user experiences and drive business results.',
    features: ['iOS & Android Development', 'Cross-Platform Solutions (React Native / Flutter)', 'UI/UX Design', 'API Integration', 'App Store Optimization', 'Post-Launch Support'],
  },
  'erp': {
    description: 'Our ERP solutions integrate all facets of your business operations into a single, unified system. We implement and customize ERP platforms that improve efficiency, reduce costs, and provide real-time insights across your entire organization.',
    features: ['Business Process Integration', 'Real-Time Reporting & Analytics', 'Inventory Management', 'Financial Management', 'HR & Payroll Module', 'Supply Chain Management'],
  },
  'crm': {
    description: 'Our CRM solutions help you build stronger customer relationships, streamline sales processes, and improve customer service. We develop and implement CRM systems that give you a 360-degree view of your customers and drive revenue growth.',
    features: ['Customer Data Management', 'Sales Pipeline Automation', 'Marketing Campaign Management', 'Customer Support Integration', 'Analytics & Reporting', 'Third-Party Integrations'],
  },
  'seo-marketing': {
    description: 'We provide comprehensive digital marketing services including SEO, social media marketing, PPC advertising, and content marketing. Our data-driven approach ensures maximum ROI and sustainable online growth for your business.',
    features: ['Search Engine Optimization (SEO)', 'Social Media Marketing', 'Pay-Per-Click Advertising', 'Content Marketing', 'Email Marketing', 'Analytics & Performance Tracking'],
  },
  'web-hosting': {
    description: 'We offer enterprise-grade web hosting solutions with 99.9% uptime guarantee, advanced security features, and 24/7 technical support. Our hosting infrastructure ensures your website performs optimally at all times.',
    features: ['99.9% Uptime Guarantee', 'SSL Certificate Included', 'Daily Backups', '24/7 Technical Support', 'DDoS Protection', 'Scalable Resources'],
  },
  'dynamic-website': {
    description: 'We build dynamic, content-rich websites with powerful CMS backends that allow you to easily manage and update your content. Our dynamic websites are built for performance, SEO, and exceptional user experience.',
    features: ['CMS Integration', 'Database-Driven Content', 'User Authentication', 'E-Commerce Functionality', 'SEO Optimization', 'Responsive Design'],
  },
  'static-website': {
    description: 'We create lightning-fast static websites that are secure, cost-effective, and easy to maintain. Perfect for businesses, portfolios, and landing pages that need exceptional performance and reliability.',
    features: ['Ultra-Fast Loading Speed', 'Enhanced Security', 'SEO-Friendly Structure', 'Mobile-First Design', 'CDN Integration', 'Low Maintenance Cost'],
  },
  'data-gathering': {
    description: 'We provide comprehensive data gathering and processing services that help businesses make informed decisions. Our data solutions include web scraping, data mining, data cleaning, and structured data delivery.',
    features: ['Web Scraping & Mining', 'Data Cleaning & Processing', 'Structured Data Delivery', 'Real-Time Data Feeds', 'Data Validation', 'Custom Data Pipelines'],
  },
  'cloud-solutions': {
    description: 'We help businesses leverage the power of cloud computing with our comprehensive cloud solutions. From cloud migration to infrastructure management, we ensure your business benefits from scalability, flexibility, and cost efficiency.',
    features: ['Cloud Migration Services', 'AWS / Azure / GCP Solutions', 'Cloud Architecture Design', 'DevOps & CI/CD', 'Cloud Security', 'Cost Optimization'],
  },
  'ai-solutions': {
    description: 'We develop intelligent AI-powered solutions that automate processes, extract insights from data, and create competitive advantages. Our AI solutions include machine learning models, natural language processing, computer vision, and predictive analytics.',
    features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'AI Chatbots', 'Process Automation'],
  },
};

export default function ServiceDetailClient({ slug }) {
  // Controls the mobile accordion — collapsed by default so content is visible first
  const [navOpen, setNavOpen] = useState(false);

  const service = services.find((s) => s.id === slug);
  const detail = serviceDetails[slug] || {
    description: service?.shortDesc || '',
    features: [],
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-black text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Code2;

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Breadcrumb */}
      <div className="border-b border-white/5 bg-[#060609]">
        <div className="site-container py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/services" className="hover:text-gray-300 transition-colors">Services</Link>
            <ChevronRight size={13} />
            <span className="text-gray-300">{service.title}</span>
          </div>
        </div>
      </div>

      {/* py-6 on mobile, py-14 on desktop */}
      <div className="relative site-container py-6 lg:py-14">
        {/*
          Grid: single column on mobile, 4-col on lg+.
          On mobile the sidebar div is pushed below content via `order-last lg:order-first`.
          Desktop layout is completely unchanged.
        */}
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-10">

          {/* ── Sidebar — rendered second in DOM on mobile via order-last ── */}
          <div className="lg:col-span-1 order-last lg:order-first">
            <div className="lg:sticky lg:top-24 space-y-4">

              {/* ── All Services — accordion on mobile, always open on desktop ── */}
              <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
                {/* Header — tappable on mobile to toggle, static label on desktop */}
                <button
                  type="button"
                  onClick={() => setNavOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-5 py-4 lg:py-4 lg:cursor-default"
                  aria-expanded={navOpen}
                >
                  <h3 className="text-white font-semibold text-xs uppercase tracking-widest">
                    All Services
                  </h3>
                  {/* Chevron only visible on mobile */}
                  <ChevronDown
                    size={15}
                    className={`text-gray-400 transition-transform duration-200 lg:hidden ${navOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/*
                  On mobile: AnimatePresence collapses/expands the list.
                  On desktop (lg+): always visible via `lg:block` — the
                  AnimatePresence wrapper is bypassed with a static div.
                */}
                {/* Desktop — always visible, no animation overhead */}
                <div className="hidden lg:block px-3 pb-3">
                  <ServiceList services={services} slug={slug} iconMap={iconMap} />
                </div>

                {/* Mobile — animated accordion */}
                <div className="lg:hidden">
                  <AnimatePresence initial={false}>
                    {navOpen && (
                      <motion.div
                        key="mobile-nav"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3">
                          <ServiceList services={services} slug={slug} iconMap={iconMap} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* CTA card — compact on mobile */}
              <div className="glass-card rounded-2xl p-4 lg:p-5 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                <h3 className="text-white font-semibold text-sm mb-1.5">Need This Service?</h3>
                <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                  Get a consultation and custom quote for your project.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200"
                >
                  Get Your Quote
                </Link>
              </div>
            </div>
          </div>

          {/* ── Main Content — first in DOM = first on mobile ── */}
          <div className="lg:col-span-3 space-y-5 lg:space-y-6 order-first lg:order-last">

            {/* Hero card — tighter padding on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="glass-card rounded-2xl lg:rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative">
                <div className="flex items-start gap-4 mb-4 lg:mb-6">
                  <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-purple-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1">{service.title}</h1>
                    <p className="text-purple-400 text-xs sm:text-sm font-medium">Professional IT Service — Taruna Technology</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{detail.description}</p>
              </div>
            </motion.div>

            {/* Features */}
            {detail.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="glass-card rounded-2xl p-5 sm:p-8 border border-white/5"
              >
                <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">What We Offer</h2>
                <div className="grid sm:grid-cols-2 gap-2.5 lg:gap-3">
                  {detail.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.38, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5"
                    >
                      <CheckCircle2 size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Process */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="glass-card rounded-2xl p-5 sm:p-8 border border-white/5"
            >
              <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Our Development Process</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {[
                  { step: '01', title: 'Discovery', desc: 'Understanding your requirements and business goals' },
                  { step: '02', title: 'Planning', desc: 'Creating detailed project roadmap and architecture' },
                  { step: '03', title: 'Development', desc: 'Agile development with regular progress updates' },
                  { step: '04', title: 'Delivery', desc: 'Testing, deployment, and ongoing support' },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.42, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center p-3 lg:p-4 rounded-xl bg-white/3 border border-white/5"
                  >
                    <div className="text-xl lg:text-2xl font-black text-gradient mb-1.5">{item.step}</div>
                    <h4 className="text-white font-semibold text-xs sm:text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="glass-card rounded-2xl p-5 sm:p-8 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 text-center"
            >
              <h2 className="text-xl lg:text-2xl font-black text-white mb-2 lg:mb-3">Ready to Get Started?</h2>
              <p className="text-gray-400 mb-4 lg:mb-6 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
                Contact us today for a consultation and let us build the perfect{' '}
                {service.title.toLowerCase()} solution for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
                >
                  Get Your Consultation
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/apply-now"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 glass border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-200"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Extracted so it can be rendered in both the desktop (always-visible) and
// mobile (accordion) slots without duplicating JSX.
function ServiceList({ services, slug, iconMap }) {
  return (
    <div className="space-y-0.5">
      {services.map((s) => {
        const SIcon = iconMap[s.icon] || Code2;
        return (
          <Link
            key={s.id}
            href={`/services/${s.id}`}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
              s.id === slug
                ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <SIcon size={13} className="flex-shrink-0" />
            <span className="truncate">{s.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
