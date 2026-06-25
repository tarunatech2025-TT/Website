// Server component — exports metadata for SEO.
// The actual page UI is in ApplyNowClient.js (client component).

import ApplyNowClient from './ApplyNowClient';

export const metadata = {
  title: 'Apply Now for IT Courses in Vadodara | Open to Ahmedabad, Surat & Gujarat — Taruna Technology',
  description:
    'Apply now to enroll in Taruna Technology\'s IT courses in Vadodara, Gujarat. Open to candidates from Ahmedabad, Surat & across Gujarat. Choose from Full Stack MERN, AI/ML, Mobile App Development, React.js, Node.js, Web Design, Digital Marketing & more. Limited seats.',
  keywords: [
    'apply IT courses Vadodara',
    'enroll IT course Gujarat',
    'IT course enrollment Vadodara',
    'apply IT course from Ahmedabad',
    'IT course enrollment Surat',
    'Full Stack course enrollment Vadodara',
    'MERN stack course apply Gujarat',
    'AI ML course enrollment Vadodara',
    'mobile app development course Gujarat',
    'IT training enrollment Vadodara',
    'programming course Gujarat',
    'React.js course apply Vadodara',
    'IT training Ahmedabad Surat Gujarat',
  ],
  alternates: {
    canonical: 'https://tarunatech.com/apply-now',
  },
  openGraph: {
    title: 'Apply Now for IT Courses in Vadodara | Taruna Technology — Open to Gujarat Students',
    description:
      'Enroll in Full Stack MERN, AI/ML, Mobile App Development, React.js, Node.js & more at Taruna Technology, Vadodara. Open to students from Ahmedabad, Surat & Gujarat. Limited seats.',
    url: 'https://tarunatech.com/apply-now',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — Apply Now for IT Courses Vadodara Gujarat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply Now for IT Courses in Vadodara — Taruna Technology',
    description:
      'IT courses in Vadodara open to students from Ahmedabad, Surat & Gujarat. Full Stack, AI/ML, Mobile App & more.',
    images: ['/logo.png'],
  },
};

// Apply Now page breadcrumb structured data
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
    { '@type': 'ListItem', position: 2, name: 'Apply Now', item: 'https://tarunatech.com/apply-now' },
  ],
};

export default function ApplyNowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ApplyNowClient />
    </>
  );
}
