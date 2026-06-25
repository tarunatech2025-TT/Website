// Server component — no 'use client' directive.
// generateStaticParams tells Next.js (and Netlify) every slug to pre-render
// at build time, so direct URL access and page refresh always work.
//
// Next.js 15+ makes params a Promise — must be awaited before accessing .slug.

import { educationCourses } from '@/lib/data';
import CourseDetailClient from './EducationDetailClient';

export function generateStaticParams() {
  return educationCourses.map((course) => ({ slug: course.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = educationCourses.find((c) => c.id === slug);

  if (!course) {
    return {
      title: 'Course Not Found | IT Training in Vadodara — Taruna Technology',
      description: 'The requested course was not found. Browse all IT courses at Taruna Technology, Vadodara, Gujarat.',
    };
  }

  const title = `${course.title} Course in Vadodara | ${course.duration} ${course.level} Training — Taruna Technology`;
  const description = `Enroll in the ${course.title} course at Taruna Technology, Vadodara, Gujarat. ${course.tagline} ${course.duration} program, ${course.level}. ${course.hours} of hands-on training. Open to students from Ahmedabad, Surat & across Gujarat. Get job-ready with industry-recognized certification.`;

  return {
    title,
    description,
    keywords: [
      `${course.title} course Vadodara`,
      `${course.title} training Vadodara`,
      `${course.title} course Gujarat`,
      `${course.title} course for Ahmedabad students`,
      `${course.title} certification India`,
      'IT courses Vadodara',
      'IT training Gujarat',
      'IT training institute Vadodara',
      'IT courses for Ahmedabad students',
      'IT training for Surat students',
      'software development courses India',
      'programming courses Vadodara',
      ...course.careers.slice(0, 4),
    ],
    alternates: {
      canonical: `https://tarunatech.com/education/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://tarunatech.com/education/${slug}`,
      images: [
        {
          url: '/logo.png',
          width: 512,
          height: 512,
          alt: `Taruna Technology — ${course.title} Course in Vadodara`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
    },
  };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = educationCourses.find((c) => c.id === slug);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
      { '@type': 'ListItem', position: 2, name: 'IT Courses & Training', item: 'https://tarunatech.com/education' },
      { '@type': 'ListItem', position: 3, name: course?.title ?? slug, item: `https://tarunatech.com/education/${slug}` },
    ],
  };

  const courseJsonLd = course
    ? {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `${course.title} Course — Taruna Technology, Vadodara, Gujarat`,
        description: `${course.description} Open to students from Vadodara, Ahmedabad, Surat and across Gujarat.`,
        url: `https://tarunatech.com/education/${slug}`,
        provider: {
          '@type': 'Organization',
          name: 'Taruna Technology',
          url: 'https://tarunatech.com',
          description: 'IT company based in Vadodara, Gujarat, providing IT courses and training for students across Vadodara, Ahmedabad, Surat and Gujarat.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '709-710 Broadway Empire, Nilamber Circle, Vasna Bhayli Main Rd',
            addressLocality: 'Vadodara',
            addressRegion: 'Gujarat',
            postalCode: '391410',
            addressCountry: 'IN',
          },
        },
        timeRequired: `P${course.duration.replace(' ', '')}`,
        educationalLevel: course.level,
        teaches: course.whatYouLearn,
        occupationalCategory: course.careers,
        inLanguage: 'en',
        isAccessibleForFree: false,
        courseMode: 'blended',
        image: 'https://tarunatech.com/logo.png',
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {courseJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
      )}
      <CourseDetailClient slug={slug} />
    </>
  );
}
