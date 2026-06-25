// Server component — exports metadata for SEO.
// The actual page UI is in ApplyClient.js (client component).

import ApplyClient from './ApplyClient';

export const metadata = {
  title: 'Apply for IT Courses, Internship & Jobs in Vadodara | Open to Ahmedabad, Surat & Gujarat — Taruna Technology',
  description:
    'Apply for IT courses, internships or job opportunities at Taruna Technology, Vadodara, Gujarat. Open to candidates from Ahmedabad, Surat & across Gujarat. Enroll in Full Stack MERN, AI/ML, Mobile App Development, React.js, Node.js & more. Start your IT career today.',
  keywords: [
    'apply IT course Vadodara',
    'IT internship Vadodara',
    'IT jobs Vadodara',
    'IT career Vadodara Gujarat',
    'IT course enrollment for Ahmedabad students',
    'IT internship for Surat students',
    'Full Stack internship Gujarat',
    'software developer jobs Gujarat',
    'mobile app development course apply',
    'programming course enrollment Vadodara',
    'IT job openings Gujarat',
    'IT training Ahmedabad Surat Gujarat',
  ],
  alternates: {
    canonical: 'https://tarunatech.com/apply',
  },
  openGraph: {
    title: 'Apply for IT Courses, Internship & Jobs | Taruna Technology — Vadodara, Gujarat',
    description:
      'Apply for IT courses, internships and jobs at Taruna Technology, Vadodara. Open to candidates from Ahmedabad, Surat & Gujarat. Start your tech career today.',
    url: 'https://tarunatech.com/apply',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — Apply for IT Courses — Vadodara, Gujarat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply for IT Courses, Internships & Jobs — Taruna Technology Vadodara',
    description:
      'IT courses, internships & jobs at Taruna Technology, Vadodara. Open to candidates from Ahmedabad, Surat & across Gujarat.',
    images: ['/logo.png'],
  },
};

// Apply page breadcrumb structured data
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
    { '@type': 'ListItem', position: 2, name: 'Apply', item: 'https://tarunatech.com/apply' },
  ],
};

export default function ApplyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ApplyClient />
    </>
  );
}
