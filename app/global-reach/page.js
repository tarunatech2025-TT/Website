// Server component — exports metadata for SEO.
// The actual page UI is in GlobalReachClient.js (client component).

import GlobalReachClient from './GlobalReachClient';

export const metadata = {
  title: 'Global Reach | IT Company in Vadodara Serving USA, UK, UAE, Germany & Singapore — Taruna Technology',
  description:
    'Taruna Technology is an IT Company based in Vadodara, Gujarat, India delivering Custom ERP Software, CRM Software, Mobile App Development & IT Consulting to clients in USA, UK, UAE, Germany, Singapore & 35+ countries. Trusted technology partner across Vadodara, Ahmedabad, Surat, Gujarat & globally.',
  keywords: [
    'Software Development Company India',
    'IT Company in Vadodara serving USA',
    'software development company Vadodara India',
    'IT outsourcing India',
    'Custom Software Development India',
    'ERP Software India',
    'CRM Software India',
    'Mobile App Development India',
    'IT services USA from India',
    'software company UK India',
    'IT services UAE from Vadodara',
    'software development Germany India',
    'IT company Singapore India',
    'Digital Transformation Services India',
    'Enterprise Software Solutions India',
    'serving businesses across Ahmedabad and Surat',
    'Trusted Technology Partner Across Gujarat',
    'IT consulting India global',
  ],
  alternates: {
    canonical: 'https://tarunatech.com/global-reach',
  },
  openGraph: {
    title: 'Global Reach | IT Company in Vadodara Serving USA, UK, UAE & 35+ Countries — Taruna Technology',
    description:
      'Taruna Technology is based in Vadodara, Gujarat, India. We deliver Custom ERP, CRM, Mobile App Development & IT Consulting to clients in USA, UK, UAE, Germany, Singapore & 35+ countries, while proudly serving businesses across Ahmedabad, Surat & Gujarat.',
    url: 'https://tarunatech.com/global-reach',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — Global Reach — IT Company in Vadodara, Gujarat, India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Reach | IT Company in Vadodara | Taruna Technology',
    description:
      'Custom ERP, CRM, Mobile App & IT Consulting from Vadodara. Serving Ahmedabad, Surat, Gujarat, India, USA, UK, UAE, Germany & Singapore.',
    images: ['/logo.png'],
  },
};

// Global reach breadcrumb structured data
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
    { '@type': 'ListItem', position: 2, name: 'Global Reach', item: 'https://tarunatech.com/global-reach' },
  ],
};

export default function GlobalReachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GlobalReachClient />
    </>
  );
}
