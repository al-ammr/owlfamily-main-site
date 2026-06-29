"use client";

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

export function ContactInfoSidebar() {
  const InstagramIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );

  const FacebookIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-[#141414] border border-[#1E1E1E] p-8 md:p-10 rounded-sm">
        <h3 className="font-display text-[28px] text-[#F5F0E8] tracking-widest uppercase mb-8">
          Get In Touch
        </h3>
        
        <div className="flex flex-col gap-8">
          
          <div className="flex items-start gap-5 group">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#C4622D] group-hover:scale-110 group-hover:border-[#C4622D] transition-all duration-300 shrink-0">
              <Mail strokeWidth={1.5} className="w-5 h-5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-mono text-[11px] text-[#8A9A9E] uppercase tracking-[0.2em] mb-1">Email Us</span>
              <a href="mailto:info.owlfamily@gmail.com" className="font-serif text-[18px] text-[#F5F0E8] hover:text-[#C4622D] transition-colors">
                info.owlfamily@gmail.com
              </a>
              <span className="font-mono text-[10px] text-[#8A9A9E] mt-2">Send us an email anytime</span>
            </div>
          </div>

          <div className="flex items-start gap-5 group">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#C4622D] group-hover:scale-110 group-hover:border-[#C4622D] transition-all duration-300 shrink-0">
              <Phone strokeWidth={1.5} className="w-5 h-5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-mono text-[11px] text-[#8A9A9E] uppercase tracking-[0.2em] mb-1">Call Us</span>
              <a href="tel:+2347067415318" className="font-serif text-[18px] text-[#F5F0E8] hover:text-[#C4622D] transition-colors">
                +234 706 741 5318
              </a>
              <span className="font-mono text-[10px] text-[#8A9A9E] mt-2">Mon-Fri: 9AM - 6PM (WAT)</span>
            </div>
          </div>

          <div className="flex items-start gap-5 group">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#C4622D] group-hover:scale-110 group-hover:border-[#C4622D] transition-all duration-300 shrink-0">
              <MessageCircle strokeWidth={1.5} className="w-5 h-5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-mono text-[11px] text-[#8A9A9E] uppercase tracking-[0.2em] mb-1">WhatsApp</span>
              <a href="https://wa.me/2347067415318" target="_blank" rel="noreferrer" className="font-serif text-[18px] text-[#F5F0E8] hover:text-[#C4622D] transition-colors">
                +234 706 741 5318
              </a>
              <span className="font-mono text-[10px] text-[#8A9A9E] mt-2">Chat with us directly</span>
            </div>
          </div>

          <div className="flex items-start gap-5 group">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#C4622D] group-hover:scale-110 group-hover:border-[#C4622D] transition-all duration-300 shrink-0">
              <MapPin strokeWidth={1.5} className="w-5 h-5" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-mono text-[11px] text-[#8A9A9E] uppercase tracking-[0.2em] mb-1">Visit Us</span>
              <span className="font-serif text-[18px] text-[#F5F0E8] leading-tight">
                Abuja, Nigeria<br/>London, UK
              </span>
              <span className="font-mono text-[10px] text-[#8A9A9E] mt-2 italic">*By appointment only</span>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#141414] border border-[#1E1E1E] p-8 md:p-10 rounded-sm">
        <h3 className="font-display text-[24px] text-[#F5F0E8] tracking-widest uppercase mb-6">
          Follow Us
        </h3>
        <p className="font-serif text-[#8A9A9E] text-[16px] mb-6">
          Stay updated with our latest drops, collections, and behind-the-scenes content.
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="https://www.instagram.com/the.owlfamily" 
            target="_blank" 
            rel="noreferrer"
            className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center text-[#8A9A9E] hover:text-[#C4622D] hover:border-[#C4622D] transition-all duration-300 bg-[#1A1A1A]"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a 
            href="https://www.facebook.com/share/1DkFGUC9QG/" 
            target="_blank" 
            rel="noreferrer"
            className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center text-[#8A9A9E] hover:text-[#C4622D] hover:border-[#C4622D] transition-all duration-300 bg-[#1A1A1A]"
            aria-label="Facebook"
          >
            <FacebookIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
