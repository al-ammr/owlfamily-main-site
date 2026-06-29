"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-collection", title: "2. Information We Collect" },
  { id: "information-use", title: "3. How We Use Your Information" },
  { id: "information-sharing", title: "4. Information Sharing" },
  { id: "data-security", title: "5. Data Security" },
  { id: "contact-us", title: "6. Contact Us" },
];

export function PrivacyContent() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Accounts for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
      {/* Sticky Sidebar Navigation */}
      <aside className="lg:w-[280px] shrink-0">
        <div className="sticky top-[120px] hidden lg:block">
          <nav className="flex flex-col gap-4 border-l border-[#1E1E1E] pl-6">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "text-left font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300",
                  activeSection === section.id 
                    ? "text-[#C4622D] translate-x-2" 
                    : "text-[#8A9A9E] hover:text-[#F5F0E8] hover:translate-x-1"
                )}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation Dropdown Alternative */}
        <div className="block lg:hidden w-full border-b border-[#1E1E1E] pb-6 mb-8">
          <select 
            value={activeSection}
            onChange={(e) => scrollToSection(e.target.value)}
            className="w-full bg-[#141414] border border-[#333] text-[#F5F0E8] font-mono text-[11px] uppercase tracking-[0.1em] p-4 rounded-none outline-none focus:border-[#C4622D]"
          >
            {SECTIONS.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[800px] font-serif text-[#8A9A9E] leading-relaxed text-[16px] md:text-[18px]">
        
        <section id="introduction" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">1. Introduction</h2>
          <p className="mb-4">
            At OWL FAMILY, we are absolutely committed to protecting your privacy and ensuring the uncompromising security of your personal information. 
            This Privacy Policy formally outlines how we collect, use, disclose, and safeguard your sensitive data when you interact with our platform, 
            visit our physical locations, or make a purchase from our premium collections.
          </p>
          <p>
            By accessing or using our services, you signify your understanding and agreement to the practices described in this document. 
            If you do not agree with our policies, please refrain from using our platform.
          </p>
        </section>

        <section id="information-collection" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">2. Information We Collect</h2>
          <p className="mb-4">To provide you with a tailored luxury shopping experience, we may collect several categories of personal data, including:</p>
          <ul className="list-none space-y-4 mb-8">
            <li className="flex gap-4">
              <span className="text-[#C4622D] mt-1">■</span>
              <span><strong className="text-[#F5F0E8] font-normal">Contact Information:</strong> Your full name, primary email address, mobile phone number, and physical billing/shipping addresses.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#C4622D] mt-1">■</span>
              <span><strong className="text-[#F5F0E8] font-normal">Financial Data:</strong> Secure payment information, credit card details, and transaction history (processed exclusively through our encrypted payment gateways like Paystack).</span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#C4622D] mt-1">■</span>
              <span><strong className="text-[#F5F0E8] font-normal">Technical Information:</strong> IP addresses, browser types, device identifiers, and operating systems collected automatically via cookies when you browse our catalog.</span>
            </li>
          </ul>
        </section>

        <section id="information-use" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">3. How We Use Your Information</h2>
          <p className="mb-4">The data we collect is utilized strictly to elevate your experience with OWL FAMILY:</p>
          <div className="bg-[#141414] border border-[#1E1E1E] p-8">
            <ul className="list-disc pl-6 space-y-3 marker:text-[#C4622D]">
              <li>To rapidly process, verify, and fulfill your premium orders.</li>
              <li>To provide dedicated, VIP-level customer support and respond to inquiries.</li>
              <li>To communicate exclusive drops, private collection access, and promotional offers (only with your explicit consent).</li>
              <li>To monitor and proactively prevent fraudulent transactions on our platform.</li>
              <li>To comply strictly with domestic and international legal obligations.</li>
            </ul>
          </div>
        </section>

        <section id="information-sharing" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">4. Information Sharing</h2>
          <p className="mb-4">
            <strong className="text-[#F5F0E8] font-normal">We do not sell, trade, or rent your personal identification information under any circumstances.</strong>
          </p>
          <p>
            We may share necessary data exclusively with our trusted third-party service providers (such as Paystack for secure payments, 
            or our logistics partners for shipping) strictly to facilitate the delivery of our services to you. These partners are legally 
            bound by strict confidentiality agreements.
          </p>
        </section>

        <section id="data-security" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">5. Data Security</h2>
          <p>
            We implement state-of-the-art security measures to maintain the absolute safety of your personal information. All sensitive 
            credit information you supply is transmitted via highly secure Secure Socket Layer (SSL) technology and encrypted directly 
            into our payment gateway providers' databases, accessible only by individuals holding special elite clearance rights.
          </p>
        </section>

        <section id="contact-us" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions regarding this Privacy Policy, your data rights, or how your information is handled by OWL FAMILY, 
            please reach out to our dedicated support team:
          </p>
          <div className="flex flex-col gap-2 font-mono text-[12px] uppercase tracking-widest text-[#F5F0E8] border-l-2 border-[#C4622D] pl-6 mt-8">
            <a href="mailto:info.owlfamily@gmail.com" className="hover:text-[#C4622D] transition-colors w-max">info.owlfamily@gmail.com</a>
            <a href="tel:+2347067415318" className="hover:text-[#C4622D] transition-colors w-max">+234 706 741 5318</a>
            <span className="text-[#8A9A9E] mt-4">Abuja, Nigeria</span>
          </div>
        </section>

      </div>
    </div>
  );
}
