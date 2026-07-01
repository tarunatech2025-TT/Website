import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsSection from '@/components/home/StatsSection';
import GlobalPresence from '@/components/home/GlobalPresence';
import PartnersSection from '@/components/home/PartnersSection';
import AccomplishmentsSection from '@/components/home/AccomplishmentsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import VisitorAnalytics from '@/components/home/VisitorAnalytics';
import ConsultationSection from '@/components/home/ConsultationSection';

export const metadata = {
  title: 'Taruna Technology',
  description:
    'Taruna Technology is a trusted IT Company in Vadodara providing Custom ERP Software, CRM Solutions, Mobile App Development, Website Development & Business Automation Services. We proudly serve businesses across Vadodara, Ahmedabad, Surat, Gujarat, India and international markets including USA, UK, UAE, Germany & Singapore.',
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
    'Software Development Company India',
    'ERP Software India',
    'CRM Software India',
    'Custom Software Development India',
    'Enterprise Software Solutions India',
    'Digital Transformation Services India',
  ],
  alternates: {
    canonical: 'https://tarunatech.com',
  },
  openGraph: {
    title: 'Best IT Company in Vadodara | ERP, CRM & Software Development | Taruna Technology',
    description:
      'Taruna Technology is a trusted IT Company in Vadodara — Custom ERP Software, CRM Solutions, Mobile App Development & IT Consulting. Serving businesses across Vadodara, Ahmedabad, Surat, Gujarat, India, USA, UK & UAE.',
    url: 'https://tarunatech.com',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — IT Company in Vadodara serving Gujarat and India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best IT Company in Vadodara | Taruna Technology',
    description:
      'Custom ERP, CRM, Mobile App Development & IT Consulting from Vadodara. Serving Ahmedabad, Surat, Gujarat, India & globally.',
    images: ['/logo.png'],
  },
};

// Home page — Service ItemList structured data
const serviceListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'IT Services by Taruna Technology — Vadodara, Serving Ahmedabad, Surat & Gujarat',
  description:
    'Comprehensive IT services by Taruna Technology, Vadodara — serving businesses across Ahmedabad, Surat, Gujarat & India.',
  url: 'https://tarunatech.com/services',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Custom ERP Software Development', url: 'https://tarunatech.com/services/erp' },
    { '@type': 'ListItem', position: 2, name: 'CRM Software Development', url: 'https://tarunatech.com/services/crm' },
    { '@type': 'ListItem', position: 3, name: 'Custom Software Development', url: 'https://tarunatech.com/services/customized-software' },
    { '@type': 'ListItem', position: 4, name: 'Mobile App Development', url: 'https://tarunatech.com/services/mobile-app' },
    { '@type': 'ListItem', position: 5, name: 'Dynamic Website Development', url: 'https://tarunatech.com/services/dynamic-website' },
    { '@type': 'ListItem', position: 6, name: 'Static Website Development', url: 'https://tarunatech.com/services/static-website' },
    { '@type': 'ListItem', position: 7, name: 'SEO & Digital Marketing', url: 'https://tarunatech.com/services/seo-marketing' },
    { '@type': 'ListItem', position: 8, name: 'Web Hosting', url: 'https://tarunatech.com/services/web-hosting' },
    { '@type': 'ListItem', position: 9, name: 'Data Gathering Services', url: 'https://tarunatech.com/services/data-gathering' },
  ],
};

// FAQ structured data — improves rich snippets for competitive queries
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which is the best IT company in Vadodara?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Taruna Technology is a trusted IT company in Vadodara, Gujarat, specializing in Custom ERP Software, CRM Software, Mobile App Development, Website Development & IT Consulting. We serve businesses across Vadodara, Ahmedabad, Surat and Gujarat.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Taruna Technology provide ERP software solutions for businesses in Ahmedabad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. While Taruna Technology is based in Vadodara, we provide ERP Software Solutions for Ahmedabad businesses and companies across Gujarat. Our custom ERP systems integrate finance, HR, inventory, procurement and operations into one unified platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Taruna Technology offer CRM software for Surat businesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Taruna Technology provides CRM Software Solutions for Surat businesses and companies across Gujarat. Our custom CRM software helps manage leads, automate sales pipelines and deliver exceptional customer experiences.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Taruna Technology develop mobile apps for businesses in Gujarat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Taruna Technology is a mobile app development company based in Vadodara, offering Mobile App Development Services for Surat Businesses, Ahmedabad businesses and companies across Gujarat. We build native iOS, Android and cross-platform apps using React Native and Flutter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Taruna Technology serve clients internationally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. While headquartered in Vadodara, Gujarat, Taruna Technology serves clients globally including businesses in USA, United Kingdom, UAE, Germany and Singapore, in addition to businesses across Vadodara, Ahmedabad, Surat and Gujarat.',
      },
    },
    {
      '@type': 'Question',
      name: 'What business automation and software solutions does Taruna Technology offer for Gujarat companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Taruna Technology provides Business Automation Solutions for Gujarat Companies including Custom ERP Software, CRM Software, Custom Software Development, Mobile App Development, Website Development & IT Consulting. We are a trusted technology partner across Gujarat serving Vadodara, Ahmedabad, Surat and beyond.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUs />
      <StatsSection />
      <GlobalPresence />
      <PartnersSection />
      <AccomplishmentsSection />
      <TestimonialsSection />
      <VisitorAnalytics />
      <ConsultationSection />
    </>
  );
}
