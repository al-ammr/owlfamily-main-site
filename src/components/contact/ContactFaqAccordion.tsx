"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How long does shipping take?",
    answer: "Shipping within Nigeria takes 1-7 business days depending on your location. International shipping to the UK takes 7-14 business days."
  },
  {
    question: "Do you offer returns?",
    answer: "Yes, we offer a 30-day return policy. Items must be unworn, unwashed, and with tags attached."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a tracking number via email. You can track your order through our shipping partner's website."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to the UK and other international locations. Additional shipping fees apply."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via email at info.owlfamily@gmail.com, call or WhatsApp us at +234 706 741 5318, or use the contact form on this page."
  },
  {
    question: "Are your products authentic?",
    answer: "Yes, all OWL FAMILY products are 100% authentic and designed by our founder, Mubarak Jafar (Jahboi)."
  }
];

export function ContactFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-24">
      <div className="text-center mb-12">
        <h2 className="font-display text-[32px] md:text-[40px] text-[#F5F0E8] tracking-widest uppercase mb-4">
          Frequently Asked Questions
        </h2>
        <p className="font-mono text-[12px] text-[#8A9A9E] uppercase tracking-[0.2em]">
          Find quick answers to common questions
        </p>
      </div>

      <div className="max-w-[800px] mx-auto flex flex-col gap-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={cn(
                "border border-[#1E1E1E] bg-[#141414] overflow-hidden transition-all duration-300",
                isOpen ? "border-[#C4622D]" : "hover:border-[#333]"
              )}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className={cn(
                  "font-serif text-[18px] md:text-[20px] transition-colors duration-300",
                  isOpen ? "text-[#C4622D]" : "text-[#F5F0E8]"
                )}>
                  {faq.question}
                </span>
                <span className="text-[#8A9A9E] ml-4 shrink-0 transition-transform duration-300">
                  {isOpen ? <Minus strokeWidth={1.5} className="w-5 h-5 text-[#C4622D]" /> : <Plus strokeWidth={1.5} className="w-5 h-5" />}
                </span>
              </button>
              
              <div 
                className={cn(
                  "grid transition-all duration-300 ease-in-out px-6",
                  isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="font-serif text-[#8A9A9E] text-[16px] leading-relaxed pt-2 border-t border-[#1E1E1E]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
