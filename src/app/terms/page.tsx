import { Metadata } from 'next';
import Script from 'next/script';
import { TermsContent } from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms and Conditions | OWL FAMILY Store',
  description: "Read OWL FAMILY's terms and conditions, including shipping, returns, payment policies, and customer rights. Know your rights when shopping with us.",
  openGraph: {
    title: 'Terms and Conditions | OWL FAMILY',
    description: 'Our terms of service, shipping policy, returns policy, and legal information',
    url: 'https://owlfamily.com/terms',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Terms and Conditions | OWL FAMILY Store',
  'description': "Terms and conditions for using OWL FAMILY's website and services",
  'url': 'https://owlfamily.com/terms',
  'about': {
    '@type': 'Thing',
    'name': 'Terms of Service',
    'description': 'Legal terms governing use of OWL FAMILY website and services'
  },
  'isPartOf': {
    '@type': 'WebSite',
    'name': 'OWL FAMILY Store',
    'url': 'https://owlfamily.com'
  }
};

export default function TermsPage() {
  return (
    <>
      <Script
        id="terms-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0D0D0D] text-[#F5F0E8] pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="mb-16">
            <h1 className="font-display text-[40px] md:text-[64px] tracking-[0.1em] uppercase leading-none mb-4">
              Terms & <span className="text-[#C4622D]">Conditions</span>
            </h1>
            <p className="font-mono text-[12px] text-[#8A9A9E] uppercase tracking-[0.2em]">
              Last Updated: June 2026
            </p>
          </div>
          
          <TermsContent />
        </div>
      </main>
    </>
  );
}
