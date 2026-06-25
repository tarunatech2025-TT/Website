// Next.js App Router robots.txt — auto-generates /robots.txt
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://tarunatech.com/sitemap.xml',
    host: 'https://tarunatech.com',
  };
}
