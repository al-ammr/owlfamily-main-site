import { Metadata } from "next";
import { ContactFormClient } from "@/components/contact/ContactFormClient";
import { ContactInfoSidebar } from "@/components/contact/ContactInfoSidebar";
import { ContactFaqAccordion } from "@/components/contact/ContactFaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us | OWL FAMILY Store",
  description: "Get in touch with OWL FAMILY. Contact us for inquiries about orders, products, collaborations, and partnerships. We're based in Abuja, Nigeria and London, UK.",
  openGraph: {
    title: "Contact OWL FAMILY — We'd Love to Hear From You",
    description: "Reach out to us for any questions about our products, orders, or collaborations.",
    url: "https://owlfamily.com/contact",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact OWL FAMILY",
  "description": "Get in touch with OWL FAMILY customer support",
  "url": "https://owlfamily.com/contact",
  "email": "info.owlfamily@gmail.com",
  "telephone": "+2347067415318",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+2347067415318",
    "contactType": "Customer Service",
    "availableLanguage": ["English"],
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "opens": "09:00",
      "closes": "18:00",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    }
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Abuja",
    "addressCountry": "Nigeria"
  }
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      
      <main className="min-h-screen bg-[#0D0D0D] text-[#F5F0E8] pt-32 pb-24 overflow-hidden">
        
        {/* Background ambient gradient */}
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[600px] bg-[#C4622D]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          
          {/* Hero Section */}
          <div className="mb-16 md:mb-24 text-center md:text-left">
            <h1 className="font-display text-[48px] md:text-[80px] tracking-widest uppercase leading-none mb-6">
              Contact <span className="text-[#C4622D]">Us</span>
            </h1>
            <p className="font-serif text-[18px] md:text-[22px] text-[#8A9A9E] max-w-2xl leading-relaxed">
              We'd love to hear from you. Whether you have a question about an order, a suggestion, or just want to say hello.
            </p>
            <p className="font-mono text-[12px] text-[#C4622D] uppercase tracking-[0.2em] mt-4">
              Get in touch with the OWL FAMILY team
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
            
            {/* Left: Form */}
            <div className="w-full">
              <ContactFormClient />
            </div>

            {/* Right: Sidebar */}
            <div className="w-full">
              <ContactInfoSidebar />
            </div>

          </div>

          {/* FAQ Section */}
          <ContactFaqAccordion />

        </div>
      </main>
    </>
  );
}
