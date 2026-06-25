// Server component — no 'use client' directive.
// generateStaticParams tells Next.js (and Netlify) every slug to pre-render
// at build time, so direct URL access and page refresh always work.
//
// Next.js 15+ makes params a Promise — must be awaited before accessing .slug.

import { services } from '@/lib/data';
import ServiceDetailClient from './ServiceDetailClient';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

const serviceMetaMap = {
  'customized-software': {
    title: 'Custom Software Development Company in Vadodara | Serving Ahmedabad, Surat & Gujarat — Taruna Technology',
    description:
      'Taruna Technology in Vadodara builds tailor-made software solutions for businesses across Ahmedabad, Surat, Gujarat & India. Scalable, secure & high-performance Custom Software Development for companies in Vadodara, Ahmedabad, Surat and across India, USA, UK & UAE.',
    keywords: [
      'Custom Software Development Company in Vadodara',
      'Custom Software Development for Companies in Ahmedabad',
      'Custom Software Development Company Gujarat',
      'Custom Software Development India',
      'bespoke software development Vadodara',
      'tailor-made software solutions Gujarat',
      'software development company Vadodara',
      'custom business software Ahmedabad',
      'enterprise software development Gujarat',
      'IT company Vadodara serving Gujarat',
    ],
  },
  'mobile-app': {
    title: 'Mobile App Development in Vadodara | Mobile App Development Services for Surat & Ahmedabad Businesses — Taruna Technology',
    description:
      'Taruna Technology in Vadodara builds native iOS, Android & cross-platform mobile apps for businesses across Ahmedabad, Surat, Gujarat & India. Mobile App Development Services for Surat Businesses and Ahmedabad companies using React Native and Flutter.',
    keywords: [
      'Mobile App Development Company in Vadodara',
      'Mobile App Development Services for Surat Businesses',
      'Mobile App Development for Companies in Ahmedabad',
      'Mobile App Development Company Gujarat',
      'Mobile App Development Gujarat',
      'iOS app development Vadodara',
      'Android app development Gujarat',
      'React Native development India',
      'Flutter app development Vadodara',
      'cross-platform app development Gujarat',
      'mobile app development India',
    ],
  },
  'erp': {
    title: 'ERP Software Company in Vadodara | ERP Software Solutions for Ahmedabad & Gujarat Businesses — Taruna Technology',
    description:
      'Taruna Technology in Vadodara develops custom ERP Software for businesses in Ahmedabad, Surat, Gujarat & India. We provide ERP Software Solutions for Ahmedabad Businesses — integrating finance, HR, inventory, procurement & operations into one unified platform.',
    keywords: [
      'ERP Software Company in Vadodara',
      'ERP Software Solutions for Ahmedabad Businesses',
      'ERP Software Company Gujarat',
      'ERP Software India',
      'Custom ERP Software Development Vadodara',
      'ERP Solutions Gujarat',
      'enterprise resource planning Vadodara',
      'ERP software for Surat businesses',
      'ERP CRM Solutions Across Gujarat',
      'ERP development company India',
      'ERP system Gujarat',
    ],
  },
  'crm': {
    title: 'CRM Software Company in Vadodara | CRM Software Solutions for Surat & Gujarat Businesses — Taruna Technology',
    description:
      'Taruna Technology in Vadodara builds custom CRM Software for businesses in Surat, Ahmedabad, Gujarat & India. CRM Software Solutions for Surat Businesses to streamline sales, automate marketing & deliver exceptional customer experiences.',
    keywords: [
      'CRM Software Company in Vadodara',
      'CRM Software Solutions for Surat Businesses',
      'CRM Software for Ahmedabad Companies',
      'CRM Software Company Gujarat',
      'CRM Software Gujarat',
      'CRM Software India',
      'Custom CRM Development Vadodara',
      'customer relationship management software Gujarat',
      'CRM solutions India',
      'ERP CRM Solutions Across Gujarat',
      'sales automation software Vadodara',
      'CRM development company India',
    ],
  },
  'seo-marketing': {
    title: 'SEO & Digital Marketing Services in Vadodara | Serving Ahmedabad, Surat & Gujarat — Taruna Technology',
    description:
      'Data-driven SEO and digital marketing services from Taruna Technology, Vadodara. We help businesses across Ahmedabad, Surat, Gujarat & India grow their online presence, drive organic traffic & achieve sustainable growth.',
    keywords: [
      'SEO services Vadodara',
      'digital marketing company Vadodara',
      'SEO company Gujarat',
      'digital marketing for Ahmedabad businesses',
      'SEO services Surat',
      'SEO marketing India',
      'search engine optimization Vadodara',
      'online marketing services Gujarat',
      'social media marketing Gujarat',
      'PPC advertising India',
    ],
  },
  'web-hosting': {
    title: 'Web Hosting Services in Vadodara | Reliable Hosting for Gujarat Businesses — Taruna Technology',
    description:
      'Enterprise-grade web hosting from Taruna Technology, Vadodara — 99.9% uptime, SSL, daily backups & 24/7 support. Serving businesses across Ahmedabad, Surat, Gujarat & India with reliable and secure web hosting solutions.',
    keywords: [
      'web hosting services Vadodara',
      'web hosting company Gujarat',
      'web hosting for Ahmedabad businesses',
      'web hosting India',
      'reliable web hosting Vadodara',
      'SSL hosting Gujarat',
      'managed web hosting India',
      'cloud hosting services Vadodara',
      'business web hosting Gujarat',
    ],
  },
  'dynamic-website': {
    title: 'Dynamic Website Development in Vadodara | Website Development for Gujarat Businesses — Taruna Technology',
    description:
      'Taruna Technology in Vadodara builds feature-rich dynamic websites for businesses across Ahmedabad, Surat, Gujarat & India. CMS integration, e-commerce & interactive UX — trusted website development partner for Gujarat companies.',
    keywords: [
      'dynamic website development Vadodara',
      'website development company Vadodara',
      'website development for Ahmedabad businesses',
      'website development company Gujarat',
      'CMS development Vadodara',
      'e-commerce website development Gujarat',
      'web application development India',
      'dynamic website Gujarat',
      'custom website development India',
      'web development company Vadodara',
    ],
  },
  'static-website': {
    title: 'Static Website Development in Vadodara | Fast & SEO-Friendly Websites for Gujarat — Taruna Technology',
    description:
      'Lightning-fast, secure & SEO-friendly static websites from Taruna Technology, Vadodara. Perfect for businesses and portfolios across Ahmedabad, Surat, Gujarat & India.',
    keywords: [
      'static website development Vadodara',
      'static website developer Gujarat',
      'fast website development India',
      'SEO-friendly website Vadodara',
      'business website development Gujarat',
      'website development for Ahmedabad companies',
      'portfolio website development India',
      'website development company Vadodara',
      'affordable website development Gujarat',
    ],
  },
  'data-gathering': {
    title: 'Data Gathering & Processing Services in Vadodara | Serving Gujarat & India — Taruna Technology',
    description:
      'Professional data gathering, web scraping, data mining, cleaning & processing services from Taruna Technology, Vadodara. Serving businesses across Ahmedabad, Surat, Gujarat & India with structured, actionable data solutions.',
    keywords: [
      'data gathering services Vadodara',
      'data collection services Gujarat',
      'web scraping services India',
      'data mining company Vadodara',
      'data processing services Gujarat',
      'data services for Ahmedabad businesses',
      'data entry services India',
      'data analytics services Vadodara',
      'business intelligence Gujarat',
    ],
  },
};

// Per-service Service schema data
const serviceSchemaMap = {
  'customized-software': {
    name: 'Custom Software Development',
    description: 'Tailor-made software solutions built to fit unique business requirements and workflows in Vadodara, Gujarat, India.',
  },
  'mobile-app': {
    name: 'Mobile App Development',
    description: 'Native and cross-platform mobile app development for iOS and Android in Vadodara, Gujarat, India.',
  },
  'erp': {
    name: 'Custom ERP Software Development',
    description: 'Enterprise Resource Planning software development integrating finance, HR, inventory and operations in Vadodara, Gujarat.',
  },
  'crm': {
    name: 'CRM Software Development',
    description: 'Custom Customer Relationship Management software development to streamline sales and customer engagement in Vadodara, Gujarat.',
  },
  'seo-marketing': {
    name: 'SEO & Digital Marketing Services',
    description: 'Data-driven SEO and digital marketing services to boost online presence and drive growth — Vadodara, Gujarat, India.',
  },
  'web-hosting': {
    name: 'Web Hosting Services',
    description: 'Reliable, fast & secure web hosting solutions for businesses of all sizes — Vadodara, Gujarat, India.',
  },
  'dynamic-website': {
    name: 'Dynamic Website Development',
    description: 'Feature-rich dynamic websites with CMS integration and interactive user experiences — Vadodara, Gujarat, India.',
  },
  'static-website': {
    name: 'Static Website Development',
    description: 'Fast, secure & SEO-friendly static website development for businesses and portfolios — Vadodara, Gujarat, India.',
  },
  'data-gathering': {
    name: 'Data Gathering & Processing Services',
    description: 'Professional data collection, web scraping, data mining, cleaning & processing services — Vadodara, Gujarat, India.',
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  const meta = serviceMetaMap[slug];

  const title = meta?.title ?? `${service?.title ?? 'Service'} | IT Services in Vadodara — Taruna Technology`;
  const description =
    meta?.description ??
    (service
      ? `${service.shortDesc} — Taruna Technology, Best IT Company in Vadodara, Gujarat, India.`
      : 'Professional IT services by Taruna Technology, Vadodara, Gujarat, India.');

  const keywords = meta?.keywords ?? [
    'Software Development Company in Vadodara',
    'IT Services Vadodara',
    'Best IT Company in Vadodara',
    'IT company Gujarat',
    'software development India',
    service?.title ?? '',
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://tarunatech.com/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://tarunatech.com/services/${slug}`,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: `Taruna Technology — ${service?.title ?? 'IT Service'} in Vadodara` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  const schemaMeta = serviceSchemaMap[slug];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://tarunatech.com/services' },
      { '@type': 'ListItem', position: 3, name: schemaMeta?.name ?? service?.title ?? slug, item: `https://tarunatech.com/services/${slug}` },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: schemaMeta?.name ?? service?.title ?? slug,
    description: schemaMeta?.description ?? service?.shortDesc ?? '',
    provider: {
      '@type': 'Organization',
      name: 'Taruna Technology',
      url: 'https://tarunatech.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '709-710 Broadway Empire, Nilamber Circle, Vasna Bhayli Main Rd',
        addressLocality: 'Vadodara',
        addressRegion: 'Gujarat',
        postalCode: '391410',
        addressCountry: 'IN',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Vadodara' },
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'City', name: 'Surat' },
      { '@type': 'State', name: 'Gujarat' },
      { '@type': 'Country', name: 'India' },
    ],
    url: `https://tarunatech.com/services/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServiceDetailClient slug={slug} />
    </>
  );
}
