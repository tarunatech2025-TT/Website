// Server component — exports metadata for SEO.
// The actual page UI is in ProductsClient.js (client component).

import ProductsClient from './ProductsClient';

export const metadata = {
  title: 'ERP Software, CRM Software & Business Solutions for Gujarat Companies — Taruna Technology, Vadodara',
  description:
    'Taruna Technology in Vadodara offers ERP Software, CRM Software, Custom Software, Billing Systems & Business Automation. We deliver software products to businesses across Vadodara, Ahmedabad, Surat, Gujarat & India.',
  keywords: [
    'ERP Software Company in Vadodara',
    'CRM Software Company in Vadodara',
    'ERP Software Solutions for Ahmedabad Businesses',
    'CRM Software Solutions for Surat Businesses',
    'Business Automation Solutions for Gujarat Companies',
    'ERP CRM Solutions Across Gujarat',
    'ERP Software Gujarat',
    'CRM Software Gujarat',
    'ERP Software India',
    'CRM Software India',
    'Custom Software Development Company in Vadodara',
    'billing system software Vadodara',
    'enterprise software Gujarat',
    'business software India',
    'ERP solutions Gujarat',
    'CRM solutions India',
    'custom software products Vadodara',
  ],
  alternates: {
    canonical: 'https://tarunatech.com/products',
  },
  openGraph: {
    title: 'ERP Software, CRM Software & Business Solutions | Taruna Technology — Vadodara',
    description:
      'ERP Software, CRM Software, Custom Software, Billing Systems & Business Automation from Taruna Technology, Vadodara. Serving businesses across Ahmedabad, Surat, Gujarat & India.',
    url: 'https://tarunatech.com/products',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — ERP CRM Software Products — Vadodara Gujarat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ERP Software, CRM Software & Business Solutions | Taruna Technology Vadodara',
    description:
      'ERP Solutions, CRM Software, Billing Systems & Business Automation. Serving Ahmedabad, Surat, Gujarat & India — Taruna Technology, Vadodara.',
    images: ['/logo.png'],
  },
};

// Products page breadcrumb + ItemList structured data
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
    { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://tarunatech.com/products' },
  ],
};

const productsListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Software Products — Taruna Technology, ERP & CRM Software Company in Vadodara',
  url: 'https://tarunatech.com/products',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Custom ERP Software — Enterprise Resource Planning', url: 'https://tarunatech.com/products' },
    { '@type': 'ListItem', position: 2, name: 'CRM Software — Customer Relationship Management', url: 'https://tarunatech.com/products' },
    { '@type': 'ListItem', position: 3, name: 'Customized Software Development', url: 'https://tarunatech.com/products' },
    { '@type': 'ListItem', position: 4, name: 'Billing System Software', url: 'https://tarunatech.com/products' },
    { '@type': 'ListItem', position: 5, name: 'Dynamic Website Development', url: 'https://tarunatech.com/products' },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsListJsonLd) }}
      />
      <ProductsClient />
    </>
  );
}
