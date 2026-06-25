// Next.js App Router sitemap — auto-generates /sitemap.xml
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import { services, educationCourses } from '@/lib/data';

const BASE_URL = 'https://tarunatech.com';

export default function sitemap() {
  const now = new Date().toISOString();

  // Static pages — ordered by SEO priority
  const staticRoutes = [
    { url: BASE_URL,                            lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/services`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE_URL}/products`,              lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/education`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/contact`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/global-reach`,          lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/apply-now`,             lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/apply`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`,        lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  // Service detail pages — high priority (core business keywords)
  const serviceRoutes = services.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Education / course detail pages
  const courseRoutes = educationCourses.map((course) => ({
    url: `${BASE_URL}/education/${course.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...courseRoutes];
}
