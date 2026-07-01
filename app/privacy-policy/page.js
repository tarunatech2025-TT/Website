// Server component — Privacy Policy page with SEO metadata.

export const metadata = {
  title: 'Privacy Policy | Taruna Technology — IT Company in Vadodara, Gujarat',
  description:
    'Read the Privacy Policy of Taruna Technology, an IT company based in Vadodara, Gujarat, India. We serve businesses across Vadodara, Ahmedabad, Surat & Gujarat. Learn how we collect, use and protect your personal information.',
  keywords: [
    'Taruna Technology privacy policy',
    'IT company privacy policy Vadodara',
    'data privacy Gujarat',
    'software company privacy India',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tarunatech.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Taruna Technology — IT Company in Vadodara, Gujarat',
    description:
      'Privacy Policy of Taruna Technology, an IT company based in Vadodara, Gujarat, India, serving businesses across Ahmedabad, Surat & Gujarat.',
    url: 'https://tarunatech.com/privacy-policy',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Taruna Technology — Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Taruna Technology — Vadodara, Gujarat',
    description: 'Privacy Policy of Taruna Technology, IT company in Vadodara, Gujarat, India.',
    images: ['/logo.png'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tarunatech.com' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://tarunatech.com/privacy-policy' },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen py-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
        <p className="text-gray-400 mb-4 text-sm">Last updated: June 2025</p>

        <section className="space-y-6 text-gray-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>
              When you contact us or use our services, we may collect personal information including your name, email
              address, phone number, company name, and any details you provide in inquiry forms. We collect this
              information solely to respond to your enquiries and deliver our IT services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. How We Use Your Information</h2>
            <p>
              Taruna Technology uses collected information to respond to inquiries, provide IT consulting and software
              development services, send relevant service updates, and improve our website experience. We do not sell
              or rent your personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and
              accessed only by authorized personnel.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience and analyze website traffic. You can
              choose to disable cookies through your browser settings, though this may affect certain functionality
              of the site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Third-Party Services</h2>
            <p>
              We may use trusted third-party services (such as analytics platforms) that collect anonymized usage data
              to help us improve our services. These providers are bound by their own privacy policies and do not
              receive personally identifiable information unless necessary.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or request deletion of your personal data held by us. To exercise
              these rights, please contact us at{' '}
              <a href="mailto:tarunatechnology@gmail.com" className="text-purple-400 hover:underline">
                tarunatechnology@gmail.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact Taruna Technology at:
            </p>
            <address className="not-italic mt-2 text-gray-300">
              <strong className="text-white">Taruna Technology</strong>
              <br />
              709-710 Broadway Empire, Nilamber Circle, Vasna Bhayli Main Rd
              <br />
              Vadodara, Gujarat 391410, India
              <br />
              Phone:{' '}
              <a href="tel:+919106610595" className="text-purple-400 hover:underline">
                +91 91066 10595
              </a>
              <br />
              Email:{' '}
              <a href="mailto:tarunatechnology@gmail.com" className="text-purple-400 hover:underline">
                tarunatechnology@gmail.com
              </a>
            </address>
          </div>
        </section>
      </main>
    </>
  );
}
