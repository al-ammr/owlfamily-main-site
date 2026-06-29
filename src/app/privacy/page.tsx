import { Metadata } from 'next';
import Script from 'next/script';
import { PrivacyContent } from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | OWL FAMILY Store',
  description: 'OWL FAMILY Privacy Policy - Learn how we collect, use, and protect your personal information.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Privacy Policy | OWL FAMILY Store',
  'description': 'OWL FAMILY Privacy Policy - Learn how we collect, use, and protect your personal information.',
  'url': 'https://owlfamily.com/privacy',
  'inLanguage': 'en-NG',
  'about': {
    '@type': 'Thing',
    'name': 'Privacy Policy',
    'description': 'Our commitment to protecting your personal data and privacy.'
  },
  'dateModified': '2026-06-01',
  'publisher': {
    '@type': 'Organization',
    'name': 'OWL FAMILY',
    'email': 'info.owlfamily@gmail.com',
    'url': 'https://owlfamily.shop',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'ABUJA',
      'addressCountry': 'Nigeria'
    }
  }
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Script
        id="privacy-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0D0D0D] text-[#F5F0E8] pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="mb-16">
            <h1 className="font-display text-[40px] md:text-[64px] tracking-[0.1em] uppercase leading-none mb-4">
              Privacy <span className="text-[#C4622D]">Policy</span>
            </h1>
            <p className="font-mono text-[12px] text-[#8A9A9E] uppercase tracking-[0.2em]">
              Last Updated: June 1, 2026
            </p>
          </div>
          
          <PrivacyContent />
        </div>
      </main>
    </>
  );
}
