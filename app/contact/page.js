// Server component — exports metadata for SEO.
// The actual page UI is in ContactClient.js (client component).

import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us | IT Company in Vadodara Serving Ahmedabad, Surat & Gujarat — Taruna Technology',
  description:
    'Contact Taruna Technology — IT Company in Vadodara, Gujarat, India. Get a free consultation for Custom ERP Software, CRM Software, Mobile App Development, Website Development & IT Consulting. We serve businesses across Vadodara, Ahmedabad, Surat & Gujarat. Response within 2–4 hours.',
  keywords: [
    'contact Taruna Technology',
    'IT Company in Vadodara contact',
    'IT consultation Vadodara',
    'free IT consultation Gujarat',
    'ERP software quote Vadodara',
    'ERP software for Ahmedabad businesses contact',
    'CRM software Solutions for Surat contact',
    'CRM software quote Gujarat',
    'custom software quote India',
    'mobile app development quote Vadodara',
    'website development contact Gujarat',
    'IT company contact Vadodara',
    'serving businesses across Ahmedabad Surat Gujarat',
    'software development company contact India',
  ],
  alternates: {
    canonical: 'https://tarunatech.com/contact',
  },
  openGraph: {
    title: 'Contact Taruna Technology | Free IT Consultation — Vadodara, Gujarat',
    description:
      'Get in touch with Taruna Technology, IT Company in Vadodara, for Custom ERP, CRM, Mobile App Development & IT Consulting. Serving Vadodara, Ahmedabad, Surat, Gujarat & India. Response within 2–4 hours.',
    url: 'https://tarunatech.com/contact',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Contact Taruna Technology — IT Company in Vadodara, Gujarat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Taruna Technology | Free IT Consultation — Vadodara',
    description:
      'Free consultation for ERP, CRM, Mobile App & IT Consulting. IT Company in Vadodara serving Ahmedabad, Surat, Gujarat & India.',
    images: ['/logo.png'],
  },
};

// Contact page breadcrumb + ContactPoint structured data
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://tarunatech.com/contact' },
  ],
};

const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Taruna Technology — IT Company in Vadodara Serving Gujarat',
  url: 'https://tarunatech.com/contact',
  description:
    'Contact Taruna Technology, IT Company in Vadodara, for a free consultation on ERP Software, CRM Software, Mobile App Development & IT Consulting. We serve businesses across Vadodara, Ahmedabad, Surat, Gujarat & India.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Taruna Technology',
    url: 'https://tarunatech.com',
    telephone: '+91-91066-10595',
    email: 'tarunatechnology@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '709-710 Broadway Empire, Nilamber Circle, Vasna Bhayli Main Rd',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      postalCode: '391410',
      addressCountry: 'IN',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
