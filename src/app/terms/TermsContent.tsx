"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "products-pricing", title: "3. Products and Pricing" },
  { id: "orders-payment", title: "4. Orders and Payment" },
  { id: "shipping-delivery", title: "5. Shipping and Delivery" },
  { id: "returns-refunds", title: "6. Returns and Refunds" },
  { id: "intellectual-property", title: "7. Intellectual Property" },
  { id: "user-accounts", title: "8. User Accounts" },
  { id: "privacy-data", title: "9. Privacy and Data Protection" },
  { id: "prohibited-activities", title: "10. Prohibited Activities" },
  { id: "disclaimer", title: "11. Disclaimer of Warranties" },
  { id: "limitation-liability", title: "12. Limitation of Liability" },
  { id: "indemnification", title: "13. Indemnification" },
  { id: "governing-law", title: "14. Governing Law" },
  { id: "dispute-resolution", title: "15. Dispute Resolution" },
  { id: "changes-terms", title: "16. Changes to Terms" },
  { id: "communications", title: "17. Communications" },
  { id: "promotions", title: "18. Promotions and Discounts" },
  { id: "feedback", title: "19. Customer Feedback" },
  { id: "contact", title: "20. Contact Us" },
  { id: "complete-agreement", title: "21. Complete Agreement" },
  { id: "waiver", title: "22. Waiver" },
  { id: "force-majeure", title: "23. Force Majeure" },
  { id: "customer-rights", title: "24. Customer Rights" },
  { id: "sizes-fitting", title: "25. Sizes and Fitting" },
  { id: "social-media", title: "26. Social Media and Community" },
  { id: "newsletter", title: "27. Newsletter and Marketing" },
  { id: "feedback-complaints", title: "28. Feedback and Complaints" },
  { id: "accessibility", title: "29. Website Accessibility" },
  { id: "final-provisions", title: "30. Final Provisions" }
];

export function TermsContent() {
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
        <div className="sticky top-[120px] hidden lg:block h-[calc(100vh-140px)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
          <nav className="flex flex-col gap-4 border-l border-[#1E1E1E] pl-6 pb-12">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "text-left font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 py-1",
                  activeSection === section.id 
                    ? "text-[#C4622D] translate-x-2 font-bold" 
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
            Welcome to OWL FAMILY. These Terms and Conditions govern your use of our website, products, and services. By accessing or using our website, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our website.
          </p>
          <p className="mb-4">
            <strong className="text-[#F5F0E8] font-normal">OWL FAMILY</strong> is a fashion brand based in Abuja, Nigeria, with operations in the United Kingdom. We provide premium streetwear, smart casual, corporate wear, vintage, and casual wear to customers across Nigeria and the diaspora.
          </p>
          <div className="bg-[#141414] border border-[#1E1E1E] p-6 mt-6">
            <h3 className="font-mono text-[12px] text-[#E8E0D0] uppercase tracking-widest mb-4">Company Information</h3>
            <ul className="list-none space-y-2 text-sm font-mono text-[#8A9A9E]">
              <li><span className="text-[#C4622D]">Brand Name:</span> OWL FAMILY</li>
              <li><span className="text-[#C4622D]">Location:</span> Abuja, Nigeria | London, UK</li>
              <li><span className="text-[#C4622D]">Email:</span> info.owlfamily@gmail.com</li>
              <li><span className="text-[#C4622D]">Phone:</span> +234 706 741 5318</li>
            </ul>
          </div>
        </section>

        <section id="eligibility" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">2. Eligibility</h2>
          <p className="mb-4">By using our website and services, you confirm that:</p>
          <ul className="list-disc pl-6 space-y-3 marker:text-[#C4622D] mb-6">
            <li>You are at least 18 years of age or are using the site under the supervision of a parent or guardian.</li>
            <li>You have the legal capacity to enter into a binding contract.</li>
            <li>All information you provide is accurate, current, and complete.</li>
            <li>You will use the website for lawful purposes only.</li>
            <li>You will not use the website to engage in any fraudulent or deceptive activities.</li>
          </ul>
          <p className="italic text-[#E8E0D0]">We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.</p>
        </section>

        <section id="products-pricing" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-8">3. Products and Pricing</h2>
          
          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">3.1 Product Descriptions</h3>
            <p>We strive to ensure that all product descriptions, images, and specifications are accurate. However, we do not guarantee that product descriptions, colors, or other content are error-free. The actual colors of products may vary due to your screen settings and lighting conditions.</p>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">3.2 Pricing</h3>
            <p>All prices are listed in Nigerian Naira (₦) and are inclusive of applicable taxes unless otherwise stated. We reserve the right to change prices at any time without prior notice. Prices for products are subject to change, but any changes will not affect orders that have already been confirmed.</p>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">3.3 Availability</h3>
            <p>All products are subject to availability. We reserve the right to discontinue any product at any time. In the event that a product is out of stock after you have placed an order, we will notify you and offer a full refund or alternative options.</p>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">3.4 Product Authenticity</h3>
            <p>All products sold by OWL FAMILY are 100% authentic and designed by our founder, Mubarak Jafar (Jahboi). We do not sell counterfeit or replica products. Every piece is created with attention to quality, craftsmanship, and cultural aesthetic.</p>
          </div>
        </section>

        <section id="orders-payment" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-8">4. Orders and Payment</h2>
          
          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">4.1 Order Confirmation</h3>
            <p className="mb-4">When you place an order, you will receive an order confirmation via email. This confirmation does not constitute acceptance of your order. We reserve the right to cancel or reject any order for any reason, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#C4622D]">
              <li>Product unavailability</li>
              <li>Pricing errors</li>
              <li>Suspected fraudulent activity</li>
              <li>Failure to verify payment</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">4.2 Payment Methods</h3>
            <p className="mb-4">We accept the following payment methods:</p>
            <ul className="list-none space-y-2 font-mono text-[13px]">
              <li><strong className="text-[#E8E0D0] mr-2">Paystack:</strong> All major debit and credit cards in Nigeria</li>
              <li><strong className="text-[#E8E0D0] mr-2">Bank Transfers:</strong> Manual confirmation required</li>
              <li><strong className="text-[#E8E0D0] mr-2">PayPal:</strong> For international customers</li>
              <li><strong className="text-[#E8E0D0] mr-2">Payment on Delivery:</strong> Selected locations, subject to availability</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">4.3 Payment Processing</h3>
            <p>All payments are processed securely through Paystack. We do not store your credit card or payment information on our servers. Your payment details are encrypted and handled by our payment partners in compliance with industry security standards.</p>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">4.4 Order Modifications and Cancellations</h3>
            <p className="mb-4">You may request to modify or cancel your order within 1 hour of placing it. After this period, we may have already begun processing your order and cannot guarantee modifications or cancellations.</p>
            <p className="text-[#E8E0D0]">To request changes, contact us immediately at:</p>
            <p className="font-mono text-sm mt-2"><span className="text-[#C4622D]">Email:</span> info.owlfamily@gmail.com | <span className="text-[#C4622D]">Phone:</span> +234 706 741 5318</p>
          </div>
        </section>

        <section id="shipping-delivery" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-8">5. Shipping and Delivery</h2>
          
          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">5.1 Delivery Areas</h3>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#C4622D]">
              <li><strong className="text-[#E8E0D0]">Nigeria:</strong> All states (delivery times vary by location)</li>
              <li><strong className="text-[#E8E0D0]">United Kingdom:</strong> Selected areas (estimated delivery 7-14 days)</li>
              <li><strong className="text-[#E8E0D0]">International:</strong> Available on request (additional shipping fees apply)</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">5.2 Delivery Times</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#333] text-sm text-left">
                <thead>
                  <tr className="bg-[#1A1A1A] text-[#E8E0D0] font-mono uppercase tracking-widest text-xs">
                    <th className="p-4 border-b border-r border-[#333]">Location</th>
                    <th className="p-4 border-b border-[#333]">Estimated Delivery Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { loc: "Abuja", time: "1-3 business days" },
                    { loc: "Lagos", time: "2-5 business days" },
                    { loc: "Kaduna", time: "1-3 business days" },
                    { loc: "Other Nigerian States", time: "3-7 business days" },
                    { loc: "United Kingdom", time: "7-14 business days" },
                    { loc: "International", time: "14-21 business days" }
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-[#333] hover:bg-[#141414] transition-colors">
                      <td className="p-4 border-r border-[#333] font-medium text-[#E8E0D0]">{row.loc}</td>
                      <td className="p-4 text-[#8A9A9E]">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[14px] italic mt-4 text-[#8A9A9E]">*Please note: Delivery times are estimates and not guaranteed. Delays may occur due to factors beyond our control.*</p>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">5.3 Shipping Costs</h3>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#C4622D]">
              <li><strong className="text-[#E8E0D0]">Free Shipping:</strong> On orders above ₦1,000,000 within Nigeria</li>
              <li><strong className="text-[#E8E0D0]">Standard Shipping:</strong> ₦2,500 for orders below ₦30,000</li>
              <li><strong className="text-[#E8E0D0]">Express Shipping:</strong> ₦5,000 (1-2 business days within Abuja and Lagos)</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">5.4 Order Tracking & 5.5 Delivery Issues</h3>
            <p className="mb-4">Once your order is shipped, you will receive a tracking number via email. You can track your order through our shipping partner's website.</p>
            <p className="mb-4">If you have not received your order within the estimated delivery time, please contact us. We will investigate and resolve the issue as quickly as possible. We are not responsible for delays caused by:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#C4622D]">
              <li>Incorrect shipping addresses</li>
              <li>Unavailable recipients</li>
              <li>Customs clearance processes</li>
              <li>Natural disasters or unforeseen events</li>
            </ul>
          </div>
        </section>

        <section id="returns-refunds" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-8">6. Returns and Refunds</h2>
          
          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">6.1 Return Policy</h3>
            <p className="mb-4">We want you to love your OWL FAMILY purchase. If you are not completely satisfied, we offer a <strong className="text-[#E8E0D0]">30-day return policy</strong> from the date of delivery.</p>
            <p className="text-[#E8E0D0] font-medium mb-2">Conditions for Returns:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#C4622D]">
              <li>Products must be in original condition (unworn, unwashed, with tags attached)</li>
              <li>Products must be returned in original packaging</li>
              <li>Sale items are final sale (not eligible for return)</li>
              <li>Custom or personalized items are not eligible for return</li>
            </ul>
          </div>

          <div className="mb-8 bg-[#141414] border-l-2 border-[#C4622D] p-6">
            <h3 className="font-mono text-[14px] text-[#E8E0D0] uppercase tracking-widest mb-4">6.2 Return Process</h3>
            <ol className="list-decimal pl-5 space-y-3 marker:text-[#C4622D] marker:font-bold">
              <li>Contact us at info.owlfamily@gmail.com with your order number and reason for return</li>
              <li>Wait for return authorization and shipping instructions</li>
              <li>Package the item securely</li>
              <li>Ship the item back to our Abuja address (you are responsible for return shipping costs unless the item is defective)</li>
            </ol>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">6.3 Refunds & 6.4 Exchanges</h3>
            <p className="mb-4">Once we receive and inspect your return, approved refunds will be processed within 5-7 business days to the original payment method. Shipping costs are non-refundable. A restocking fee may apply (up to 10%) for returns not due to product defects.</p>
            <p>If you need a different size or color, we recommend placing a new order and returning the original item following our return process. This ensures you get the desired item faster.</p>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-[22px] text-[#C4622D] mb-4">6.5 Damaged or Defective Items</h3>
            <p>If you receive a damaged or defective item, contact us within 48 hours of delivery and provide photos of the damage. We will arrange for a replacement or full refund at no cost to you.</p>
          </div>
        </section>

        <section id="intellectual-property" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">7. Intellectual Property</h2>
          <p className="mb-4">All content on our website, including but not limited to text, graphics, logos, icons, images, product designs, patterns, brand names, trademarks, and service marks is the exclusive property of <strong className="text-[#F5F0E8]">OWL FAMILY</strong> and is protected by Nigerian and international copyright, trademark, and intellectual property laws.</p>
          <p className="mb-4">The OWL FAMILY name, logo, and designs are registered trademarks. You may not use, reproduce, or distribute any of our intellectual property without our express written permission.</p>
          <p>You are granted a limited, non-exclusive, non-transferable license to access and use our website for personal, non-commercial purposes. This license does not include reproducing or copying content, modifying or creating derivative works, using content for commercial purposes, or reverse engineering or decompiling.</p>
        </section>

        <section id="user-accounts" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">8. User Accounts</h2>
          <p className="mb-4">You may create an account on our website to save shipping information, track orders, view order history, save favorite items, and receive personalized recommendations.</p>
          <p className="mb-4">You are responsible for maintaining the confidentiality of your account credentials, all activities that occur under your account, notifying us immediately of any unauthorized use, and ensuring your account information is accurate and up to date.</p>
          <p>We reserve the right to suspend or terminate your account if you violate these terms, we suspect fraudulent activity, or you misuse our website or services.</p>
        </section>

        <section id="privacy-data" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">9. Privacy and Data Protection</h2>
          <p className="mb-4">Your privacy is important to us. Please review our <a href="/privacy" className="text-[#C4622D] hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your personal information.</p>
          <p>We implement industry-standard security measures to protect your data, including SSL encryption for all data transmission, secure payment processing (PCI DSS compliant), regular security audits, and access controls.</p>
        </section>

        <section id="prohibited-activities" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">10. Prohibited Activities</h2>
          <p className="mb-4">You agree not to use our website or services for any unlawful or prohibited purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-[#C4622D] mb-6">
            <li>Engaging in fraudulent activities</li>
            <li>Transmitting viruses or harmful code</li>
            <li>Attempting to gain unauthorized access to our systems</li>
            <li>Violating any applicable laws or regulations</li>
            <li>Harassing, abusing, or harming others</li>
            <li>Interfering with the proper functioning of our website</li>
            <li>Copying or scraping content without authorization</li>
          </ul>
          <p className="text-[#C4622D] font-bold">Violation of these terms may result in termination of your account, legal action, and reporting to law enforcement authorities.</p>
        </section>

        <section id="disclaimer" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">11. Disclaimer of Warranties</h2>
          <p className="mb-4">Our website and products are provided on an "as-is" and "as-available" basis. We make no warranties, express or implied, including but not limited to merchantability or fitness for a particular purpose, accuracy or completeness of content, uninterrupted or error-free service, or security or reliability of our website.</p>
          <p>Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of third-party sites. Your use of third-party websites is at your own risk.</p>
        </section>

        <section id="limitation-liability" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">12. Limitation of Liability</h2>
          <p className="mb-4">To the fullest extent permitted by law, OWL FAMILY, our affiliates, employees, and partners shall not be liable for:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-[#C4622D] mb-6">
            <li>Any indirect, incidental, special, consequential, or punitive damages</li>
            <li>Loss of profits, revenue, data, or goodwill</li>
            <li>Damages resulting from unauthorized access to your account</li>
            <li>Damages related to product use or inability to use products</li>
            <li>Damages from delays or errors in delivery</li>
          </ul>
          <div className="bg-[#141414] border border-[#C4622D]/30 p-4">
            <strong className="text-[#C4622D]">Maximum Liability:</strong> Our total liability to you shall not exceed the amount you paid for the product giving rise to the claim.
          </div>
        </section>

        <section id="indemnification" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">13. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless OWL FAMILY, its founders, employees, and partners from any claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from your violation of these terms, your use of our website or products, your violation of any law or third-party rights, or your negligence or misconduct.</p>
        </section>

        <section id="governing-law" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">14. Governing Law</h2>
          <p className="mb-4">These terms and conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be resolved in the courts of Abuja, Nigeria.</p>
          <p className="italic text-[#E8E0D0]"><strong className="text-[#F5F0E8] not-italic">For international customers:</strong> You agree to submit to the jurisdiction of Nigerian courts and waive any objections based on inconvenient forum.</p>
        </section>

        <section id="dispute-resolution" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">15. Dispute Resolution</h2>
          <p className="mb-4">Before initiating any legal action, you agree to attempt to resolve the dispute informally by contacting us at info.owlfamily@gmail.com. If informal resolution fails, we agree to attempt mediation through a neutral third party before pursuing court action. Any dispute not resolved through mediation shall be resolved through binding arbitration in accordance with Nigerian arbitration laws.</p>
        </section>

        <section id="changes-terms" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">16. Changes to Terms</h2>
          <p className="mb-4">We reserve the right to update or modify these terms and conditions at any time without prior notice. Changes will be effective immediately upon posting on our website. <strong className="text-[#C4622D]">Your continued use of our website constitutes acceptance of the updated terms.</strong></p>
          <p>We encourage you to review these terms periodically. The "Last Updated" date at the top of this page indicates when the terms were last revised.</p>
        </section>

        <section id="communications" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">17. Communications</h2>
          <p className="mb-4">By using our website, you consent to receive communications from us electronically. We will communicate with you via Email (order confirmations, promotions), SMS (delivery notifications), and WhatsApp (customer support).</p>
          <p>You may opt out of marketing communications at any time by clicking the "unsubscribe" link in our emails, replying "STOP" to SMS messages, or contacting us directly.</p>
        </section>

        <section id="promotions" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">18. Promotions and Discounts</h2>
          <p className="mb-4">We occasionally offer promotions, discounts, and special offers. These are subject to specific terms and conditions that will be communicated at the time of the offer.</p>
          <p>Discount codes cannot be combined with other offers, are valid for a limited time only, and are not valid on sale items or certain collections. OWL FAMILY reserves the right to cancel or modify promotions at any time.</p>
        </section>

        <section id="feedback" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">19. Customer Feedback</h2>
          <p>We value your feedback and suggestions. By providing feedback, you grant OWL FAMILY the right to use, reproduce, and share your feedback without compensation. We welcome product reviews, suggestions for improvement, and feedback on your shopping experience.</p>
        </section>

        <section id="contact" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">20. Contact Us</h2>
          <div className="bg-[#141414] border border-[#1E1E1E] p-8">
            <h3 className="font-display text-2xl text-[#C4622D] mb-4">OWL FAMILY Customer Support</h3>
            <ul className="space-y-4 font-mono text-sm tracking-wider">
              <li><strong className="text-[#E8E0D0]">Email:</strong> info.owlfamily@gmail.com</li>
              <li><strong className="text-[#E8E0D0]">Phone:</strong> +234 706 741 5318</li>
              <li><strong className="text-[#E8E0D0]">WhatsApp:</strong> +234 706 741 5318</li>
              <li><strong className="text-[#E8E0D0]">Instagram:</strong> @the.owlfamily</li>
              <li><strong className="text-[#E8E0D0]">Facebook:</strong> OWL FAMILY</li>
            </ul>
            <div className="mt-8 pt-8 border-t border-[#333]">
              <p className="font-mono text-sm"><strong className="text-[#E8E0D0]">Physical Address:</strong> Abuja, Nigeria | London, UK</p>
              <p className="font-mono text-sm mt-2"><strong className="text-[#C4622D]">Response Time:</strong> We aim to respond to all inquiries within 24-48 hours.</p>
            </div>
          </div>
        </section>

        <section id="complete-agreement" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">21. Complete Agreement</h2>
          <p className="mb-4">These terms and conditions, together with our Privacy Policy, constitute the entire agreement between you and OWL FAMILY regarding your use of our website and services.</p>
          <p>Any heading or section titles are for convenience only and do not affect the interpretation of these terms. If any provision of these terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.</p>
        </section>

        <section id="waiver" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">22. Waiver</h2>
          <p>Our failure to enforce any right or provision of these terms shall not constitute a waiver of that right or provision. Any waiver must be in writing and signed by an authorized representative of OWL FAMILY.</p>
        </section>

        <section id="force-majeure" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">23. Force Majeure</h2>
          <p className="mb-4">We shall not be liable for delays or failures in performance resulting from circumstances beyond our reasonable control, including natural disasters (earthquakes, floods, fires), acts of war or terrorism, government actions, labor disputes, pandemic outbreaks, supply chain disruptions, or cyber attacks.</p>
          <p>In such events, our obligations shall be suspended for the duration of the force majeure event.</p>
        </section>

        <section id="customer-rights" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">24. Customer Rights</h2>
          <p className="mb-4">OWL FAMILY complies with Nigerian consumer protection laws. You have the right to receive products of satisfactory quality, receive accurate information about products, cancel orders within a reasonable period, and return defective products for refund or replacement.</p>
          <p>For international customers, these terms shall be interpreted in accordance with Nigerian law. You are responsible for import duties, customs fees, compliance with local laws, and currency conversion fees.</p>
        </section>

        <section id="sizes-fitting" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">25. Sizes and Fitting</h2>
          <p className="mb-4">We provide size charts on our website to help you choose the right fit. However, we cannot guarantee that products will fit perfectly. We recommend checking the size chart carefully before ordering.</p>
          <p>Product descriptions include information on fabric composition and care instructions. Failure to follow care instructions may affect the product and void any warranty.</p>
        </section>

        <section id="social-media" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">26. Social Media and Community</h2>
          <p className="mb-4">We encourage you to share your OWL FAMILY looks on social media. By sharing content with our hashtags or tagging us, you grant us the right to repost your content on our channels, use your content in marketing materials, and edit or modify content as needed.</p>
          <p>When engaging with our community, you agree to be respectful and kind. Violations may result in being blocked from our channels.</p>
        </section>

        <section id="newsletter" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">27. Newsletter and Marketing</h2>
          <p>By subscribing to our newsletter, you agree to receive new product announcements, promotional offers, style guides, and brand updates. You can unsubscribe at any time by clicking the unsubscribe link in emails or updating your account preferences.</p>
        </section>

        <section id="feedback-complaints" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">28. Feedback and Complaints</h2>
          <p className="mb-4">If you have a complaint about our products or services, please contact us with your order number, a detailed description of the issue, and supporting photos. We aim to resolve complaints within 5-7 business days.</p>
        </section>

        <section id="accessibility" className="mb-16 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">29. Website Accessibility</h2>
          <p>We are committed to making our website accessible to all users, including those with disabilities. If you have difficulty accessing any part of our site, please contact us.</p>
        </section>

        <section id="final-provisions" className="mb-24 scroll-mt-32">
          <h2 className="font-display text-[28px] text-[#F5F0E8] tracking-wider mb-6">30. Final Provisions</h2>
          <ul className="list-disc pl-6 space-y-3 marker:text-[#C4622D]">
            <li>These terms are binding on you and your heirs, executors, and administrators.</li>
            <li>We may assign our rights and obligations under these terms without notice.</li>
            <li>You may not assign your rights or obligations without our written consent.</li>
            <li>These terms are available in English; any translation is for convenience only.</li>
          </ul>
          
          <div className="mt-16 text-center border-t border-[#1E1E1E] pt-16">
            <h3 className="font-serif text-[24px] text-[#C4622D] italic mb-6">Thank you for choosing OWL FAMILY.</h3>
            <p className="font-display tracking-[0.2em] text-[20px] text-[#F5F0E8] uppercase mb-10">"We are not just a brand. We are building an empire."</p>
            <p className="font-mono text-[11px] text-[#8A9A9E] tracking-widest uppercase">
              Built by Al Ammr × TechOptyx · Abuja, Nigeria<br/>
              <span className="text-[#E8E0D0] mt-2 block">"Wear the culture. Own the look."</span>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
