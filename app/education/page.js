// Server component — exports metadata for SEO.
// The actual page UI is in EducationClient.js (client component).

import EducationClient from './EducationClient';

export const metadata = {
  title: 'IT Courses & Training in Vadodara | Full Stack, AI/ML, Mobile App for Gujarat Students — Taruna Technology',
  description:
    'Enroll in Taruna Technology\'s IT courses in Vadodara, Gujarat — Full Stack MERN, AI/ML, Mobile App Development, React.js, Node.js, Web Design, Digital Marketing & more. Students from Ahmedabad, Surat & across Gujarat are welcome. Get certified and job-ready.',
  keywords: [
    'IT courses Vadodara',
    'IT training institute Vadodara',
    'IT courses Gujarat',
    'IT education Gujarat',
    'programming courses Vadodara',
    'IT courses for students from Ahmedabad',
    'IT training for Surat students',
    'Full Stack development course Vadodara',
    'MERN stack course Gujarat',
    'AI ML course Vadodara',
    'Mobile App Development course Gujarat',
    'React.js course Vadodara',
    'Node.js course Gujarat',
    'web design course Vadodara',
    'data analysis course Gujarat',
    'digital marketing course Vadodara',
    'software development course India',
    'IT certification Vadodara',
    'coding bootcamp Gujarat',
  ],
  alternates: {
    canonical: 'https://tarunatech.com/education',
  },
  openGraph: {
    title: 'IT Courses & Training in Vadodara | Taruna Technology — Gujarat',
    description:
      'IT courses in Vadodara — Full Stack MERN, AI/ML, Mobile App, React.js, Node.js, Web Design & more. Welcoming students from Ahmedabad, Surat & across Gujarat. Get certified at Taruna Technology.',
    url: 'https://tarunatech.com/education',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — IT Courses & Training Vadodara for Gujarat Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Courses & Training in Vadodara | Taruna Technology',
    description:
      'Full Stack MERN, AI/ML, Mobile App, React.js, Node.js, Web Design & more. IT training in Vadodara — welcoming students from Ahmedabad, Surat & Gujarat.',
    images: ['/logo.png'],
  },
};

// Education page breadcrumb + ItemList structured data
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
    { '@type': 'ListItem', position: 2, name: 'IT Courses & Training', item: 'https://tarunatech.com/education' },
  ],
};

const coursesListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'IT Courses at Taruna Technology — IT Training Institute in Vadodara',
  url: 'https://tarunatech.com/education',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Full Stack / MERN Development Course', url: 'https://tarunatech.com/education/fullstack' },
    { '@type': 'ListItem', position: 2, name: 'AI/ML Course', url: 'https://tarunatech.com/education/ai-ml' },
    { '@type': 'ListItem', position: 3, name: 'Mobile App Development Course', url: 'https://tarunatech.com/education/mobile-app-development' },
    { '@type': 'ListItem', position: 4, name: 'Frontend Development Course', url: 'https://tarunatech.com/education/frontend-development' },
    { '@type': 'ListItem', position: 5, name: 'Backend Development Course', url: 'https://tarunatech.com/education/backend-development' },
    { '@type': 'ListItem', position: 6, name: 'React.js Course', url: 'https://tarunatech.com/education/reactjs' },
    { '@type': 'ListItem', position: 7, name: 'Node.js Course', url: 'https://tarunatech.com/education/nodejs' },
    { '@type': 'ListItem', position: 8, name: 'Web Designing Course', url: 'https://tarunatech.com/education/web-design' },
    { '@type': 'ListItem', position: 9, name: 'Data Analysis Course', url: 'https://tarunatech.com/education/data-analysis' },
    { '@type': 'ListItem', position: 10, name: 'Graphic Design Course', url: 'https://tarunatech.com/education/graphic-design-course' },
    { '@type': 'ListItem', position: 11, name: 'HR & Business Development Course', url: 'https://tarunatech.com/education/hr-business-development' },
    { '@type': 'ListItem', position: 12, name: 'Digital Marketing Course', url: 'https://tarunatech.com/education/digital-marketing-course' },
  ],
};

export default function EducationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesListJsonLd) }}
      />
      <EducationClient />
    </>
  );
}
