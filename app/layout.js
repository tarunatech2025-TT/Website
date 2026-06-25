import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import RoutePreloader from '@/components/RoutePreloader';
import CustomCursor from '@/components/CustomCursor';
import ClientLayout from '@/components/ClientLayout';
import ConsultationManager from '@/components/ConsultationManager';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://tarunatech.com'),
  title: {
    default: 'Taruna Technology',
    template: '%s | Taruna Technology',
  },
  description:
    'Taruna Technology is a trusted IT Company in Vadodara providing Custom ERP Software, CRM Solutions, Mobile App Development, Website Development & Business Automation. Serving businesses across Vadodara, Ahmedabad, Surat, Gujarat, India, USA, UK, UAE, Germany & Singapore.',
  keywords: [
    'Best IT Company in Vadodara',
    'Software Development Company in Vadodara',
    'ERP Software Company in Vadodara',
    'CRM Software Company in Vadodara',
    'Custom Software Development Company in Vadodara',
    'Mobile App Development Company in Vadodara',
    'IT Consulting Company in Vadodara',
    'ERP Software Solutions for Ahmedabad Businesses',
    'CRM Software Solutions for Surat Businesses',
    'Custom Software Development for Companies in Ahmedabad',
    'Mobile App Development Services for Surat Businesses',
    'Trusted Technology Partner Across Gujarat',
    'Serving Clients Across Vadodara Ahmedabad Surat and Gujarat',
    'Business Automation Solutions for Gujarat Companies',
    'ERP CRM Solutions Across Gujarat',
    'Software Development Company Gujarat',
    'ERP Software Gujarat',
    'CRM Software Gujarat',
    'Mobile App Development Gujarat',
    'Software Development Company India',
    'ERP Software India',
    'CRM Software India',
    'Custom Software Development India',
    'Enterprise Software Solutions India',
    'Digital Transformation Services India',
    'Taruna Technology',
    'IT company Vadodara',
    'web development Vadodara',
  ],
  authors: [{ name: 'Taruna Technology', url: 'https://tarunatech.com' }],
  creator: 'Taruna Technology',
  publisher: 'Taruna Technology',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-video-preview': -1, 'max-snippet': -1 },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Best IT Company in Vadodara | Taruna Technology — ERP, CRM & Custom Software',
    description:
      'Taruna Technology is a trusted IT Company in Vadodara — Custom ERP Software, CRM Solutions, Mobile App Development & IT Consulting. Serving businesses across Vadodara, Ahmedabad, Surat, Gujarat, India, USA, UK & UAE.',
    type: 'website',
    url: 'https://tarunatech.com',
    siteName: 'Taruna Technology',
    locale: 'en_IN',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — Best IT Company in Vadodara, Gujarat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best IT Company in Vadodara | Taruna Technology',
    description:
      'Custom ERP, CRM, Mobile App Development & IT Consulting from Vadodara. Serving businesses across Ahmedabad, Surat, Gujarat, India & globally.',
    images: ['/logo.png'],
    creator: '@tarunatech',
  },
  alternates: {
    canonical: 'https://tarunatech.com',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Taruna Technology',
  url: 'https://tarunatech.com',
  logo: 'https://tarunatech.com/logo.png',
  description:
    'Taruna Technology is a trusted IT company in Vadodara, Gujarat, India, providing Custom ERP Software, CRM Software, Mobile App Development, Website Development & IT Consulting. We serve businesses across Vadodara, Ahmedabad, Surat, Gujarat, India and internationally.',
  foundingDate: '2018',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '709-710 Broadway Empire, Nilamber Circle, Vasna Bhayli Main Rd',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '391410',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-91066-10595',
      contactType: 'customer service',
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'DE'],
      availableLanguage: 'English',
    },
  ],
  sameAs: [
    'https://www.facebook.com/tarunatechnology',
    'https://www.linkedin.com/company/taruna-technology',
    'https://www.instagram.com/tarunatechnology',
    'https://twitter.com/tarunatech',
  ],
  areaServed: [
    { '@type': 'City', name: 'Vadodara' },
    { '@type': 'City', name: 'Ahmedabad' },
    { '@type': 'City', name: 'Surat' },
    { '@type': 'State', name: 'Gujarat' },
    { '@type': 'Country', name: 'India' },
    'US', 'GB', 'AE', 'SG', 'DE',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT Services — Vadodara, Gujarat',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom ERP Software Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM Software Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Consulting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Automation Solutions' } },
    ],
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Taruna Technology',
  image: 'https://tarunatech.com/logo.png',
  url: 'https://tarunatech.com',
  telephone: '+91-91066-10595',
  email: 'tarunatechnology@gmail.com',
  description:
    'Taruna Technology is an IT company based in Vadodara, Gujarat, specializing in Custom ERP Software, CRM Software, Mobile App Development, Website Development & Business Automation. We serve businesses across Vadodara, Ahmedabad, Surat and Gujarat.',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '709-710 Broadway Empire, Nilamber Circle, Vasna Bhayli Main Rd',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '391410',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.3074',
    longitude: '73.1812',
  },
  areaServed: [
    { '@type': 'City', name: 'Vadodara' },
    { '@type': 'City', name: 'Ahmedabad' },
    { '@type': 'City', name: 'Surat' },
    { '@type': 'State', name: 'Gujarat' },
    { '@type': 'Country', name: 'India' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Taruna Technology',
  url: 'https://tarunatech.com',
  description:
    'Custom ERP Software, CRM Software, Mobile App Development, Website Development & IT Consulting — Taruna Technology, Vadodara, Gujarat, India.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://tarunatech.com/services/{search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured Data — Organization, LocalBusiness, WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-[#080818] text-white antialiased overflow-x-hidden">
        <CustomCursor />
        <RoutePreloader />
        <ConsultationManager />
        <ClientLayout>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ClientLayout>
      </body>
    </html>
  );
}
