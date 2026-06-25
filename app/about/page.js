// Server component — exports metadata for SEO.
// The actual page UI is in AboutClient.js (client component).

import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Us | IT Company in Vadodara Serving Ahmedabad, Surat & Gujarat — Taruna Technology',
  description:
    'Learn about Taruna Technology — an IT company based in Vadodara, Gujarat, India. Our expert team delivers Custom ERP Software, CRM Solutions, Mobile App Development, Website Development & IT Consulting to businesses across Vadodara, Ahmedabad, Surat, Gujarat, India, USA, UK, UAE, Germany & Singapore.',
  keywords: [
    'about Taruna Technology',
    'IT company in Vadodara',
    'IT company based in Vadodara',
    'Software Development Company Vadodara',
    'ERP Software Company Vadodara',
    'CRM Software Company Vadodara',
    'IT Consulting Company Vadodara',
    'Mobile App Development Company Vadodara',
    'serving businesses across Ahmedabad and Surat',
    'Trusted Technology Partner Across Gujarat',
    'IT company Gujarat India',
    'Software Development Company India',
    'Digital Transformation Services India',
    'Custom Software Development India',
  ],
  alternates: {
    canonical: 'https://tarunatech.com/about',
  },
  openGraph: {
    title: 'About Taruna Technology | IT Company in Vadodara Serving Gujarat & India',
    description:
      'Taruna Technology is an IT company based in Vadodara, Gujarat, India. We specialize in Custom ERP Software, CRM Software, Mobile App Development & IT Consulting. We serve businesses across Vadodara, Ahmedabad, Surat, Gujarat, India, USA, UK & UAE.',
    url: 'https://tarunatech.com/about',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — IT Company in Vadodara, Gujarat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Taruna Technology | IT Company in Vadodara, Gujarat',
    description:
      'Custom ERP, CRM, Mobile App Development & IT Consulting from Vadodara. Serving businesses across Ahmedabad, Surat, Gujarat & India.',
    images: ['/logo.png'],
  },
};

// About page breadcrumb structured data
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://tarunatech.com/about' },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
