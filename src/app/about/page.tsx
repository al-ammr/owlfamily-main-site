import { Metadata } from 'next';
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutContent } from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: "About Us | OWL FAMILY — Nigerian Streetwear & Fashion Brand",
  description: "Learn about OWL FAMILY, founded by Mubarak Jafar (Jahboi) in Abuja, Nigeria. Discover our story, values, and commitment to quality streetwear, smart casual, corporate and vintage fashion.",
  openGraph: {
    title: "About OWL FAMILY — Wear the Culture",
    description: "Meet the founder, explore our values, and join the movement. OWL FAMILY is building a fashion empire from Abuja, Nigeria.",
    images: [
      {
        url: "/images/about/IMG 4.jpg",
        width: 1200,
        height: 630,
        alt: "OWL FAMILY product collection - streetwear, smart casual, corporate, vintage, casual wear",
      },
    ],
    url: "https://owlfamily.com/about",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About OWL FAMILY",
  "description": "OWL FAMILY is a Nigerian streetwear and lifestyle brand founded by Mubarak Jafar (Jahboi) in Abuja, Nigeria. We design streetwear, smart casual, corporate wear, vintage, and casual wear.",
  "url": "https://owlfamily.com/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "OWL FAMILY",
    "founder": {
      "@type": "Person",
      "name": "Mubarak Jafar",
      "alternateName": "Jahboi",
      "description": "Fashion designer and music talent with an eye for cultural aesthetic"
    },
    "foundingDate": "2026",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Abuja",
        "addressCountry": "Nigeria"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abuja",
      "addressCountry": "Nigeria"
    },
    "email": "info.owlfamily@gmail.com",
    "telephone": "+2347067415318",
    "url": "https://owlfamily.com",
    "sameAs": [
      "https://www.instagram.com/the.owlfamily",
      "https://www.facebook.com/share/1DkFGUC9QG/"
    ]
  }
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="min-h-screen bg-[#0D0D0D] text-[#F5F0E8]">
        <AboutContent />
      </main>
    </>
  );
}
