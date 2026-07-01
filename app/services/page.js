// Server component — exports metadata for SEO.
// The actual page UI is in ServicesClient.js (client component).

import ServicesClient from './ServicesClient';

export const metadata = {
  title: 'IT Services in Vadodara | ERP, CRM & Software Development for Gujarat Businesses — Taruna Technology',
  description:
    'Taruna Technology offers IT services from Vadodara — Custom ERP Software, CRM Software, Mobile App Development, Website Development & Business Automation. Serving businesses across Vadodara, Ahmedabad, Surat, Gujarat & India.',
  keywords: [
    'IT Services Vadodara',
    'Software Development Company in Vadodara',
    'ERP Software Company in Vadodara',
    'CRM Software Company in Vadodara',
    'Mobile App Development Company in Vadodara',
    'Custom Software Development Company in Vadodara',
    'IT Consulting Company in Vadodara',
    'ERP Software Solutions for Ahmedabad Businesses',
    'CRM Software Solutions for Surat Businesses',
    'Custom Software Development for Companies in Ahmedabad',
    'Mobile App Development Services for Surat Businesses',
    'Business Automation Solutions for Gujarat Companies',
    'ERP CRM Solutions Across Gujarat',
    'Software Development Company Gujarat',
    'ERP Software Gujarat',
    'CRM Software Gujarat',
    'Mobile App Development Gujarat',
    'Software Development Company India',
    'Custom Software Development India',
    'web development Gujarat',
    'dynamic website development',
    'SEO marketing India',
  ],
  alternates: {
    canonical: 'https://tarunatech.com/services',
  },
  openGraph: {
    title: 'IT Services in Vadodara | ERP, CRM & Software Development for Gujarat Businesses',
    description:
      'Custom ERP Software, CRM Software, Mobile App Development & Business Automation from Vadodara. Serving businesses across Ahmedabad, Surat, Gujarat & India — Taruna Technology.',
    url: 'https://tarunatech.com/services',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — IT Services Vadodara serving Gujarat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Services in Vadodara | ERP, CRM & Software for Gujarat — Taruna Technology',
    description:
      'Custom ERP, CRM, Mobile App Development & IT Consulting from Vadodara. Serving Ahmedabad, Surat, Gujarat & India.',
    images: ['/logo.png'],
  },
};

// Services page breadcrumb + ItemList structured data
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://tarunatech.com/services' },
  ],
};

const servicesListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'IT Services — Taruna Technology, Vadodara — Serving Ahmedabad, Surat & Gujarat',
  url: 'https://tarunatech.com/services',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Custom ERP Software Development — Vadodara, Gujarat', url: 'https://tarunatech.com/services/erp' },
    { '@type': 'ListItem', position: 2, name: 'CRM Software Development — Vadodara, Gujarat', url: 'https://tarunatech.com/services/crm' },
    { '@type': 'ListItem', position: 3, name: 'Custom Software Development — Vadodara, Gujarat', url: 'https://tarunatech.com/services/customized-software' },
    { '@type': 'ListItem', position: 4, name: 'Mobile App Development — Vadodara, Gujarat', url: 'https://tarunatech.com/services/mobile-app' },
    { '@type': 'ListItem', position: 5, name: 'Dynamic Website Development', url: 'https://tarunatech.com/services/dynamic-website' },
    { '@type': 'ListItem', position: 6, name: 'Static Website Development', url: 'https://tarunatech.com/services/static-website' },
    { '@type': 'ListItem', position: 7, name: 'SEO & Digital Marketing Services', url: 'https://tarunatech.com/services/seo-marketing' },
    { '@type': 'ListItem', position: 8, name: 'Web Hosting Services', url: 'https://tarunatech.com/services/web-hosting' },
    { '@type': 'ListItem', position: 9, name: 'Data Gathering & Processing Services', url: 'https://tarunatech.com/services/data-gathering' },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesListJsonLd) }}
      />
      <ServicesClient />
    </>
  );
}
