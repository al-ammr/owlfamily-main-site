"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import logoImg from "../../../public/images/brand/logo.png";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full bg-[#0D0D0D] pt-16 pb-10 px-6 md:px-12 border-t border-[#1E1E1E]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Grid: 4 columns (approx 30% / 23% / 23% / 24%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%_23%_23%_24%] gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col">
            <Link href="/" className="group flex items-center gap-3 shrink-0 mb-6 w-max">
              <div className="relative w-10 h-10">
                <Image
                  src={logoImg}
                  alt="OWL FAMILY Logo"
                  fill
                  className="object-contain invert transition-transform duration-500 group-hover:scale-110"
                  sizes="40px"
                />
              </div>
              <span className="font-display text-[20px] tracking-widest leading-none drop-shadow-md">
                <span className="text-[#F5F0E8]">OWL </span>
                <span className="text-[#C4622D]">FAMILY</span>
              </span>
            </Link>
            
            <p className="font-serif italic text-[#8A9A9E] text-[15px] leading-relaxed mb-8 max-w-xs">
              Pieces designed to define the culture. <br />
              From the streets of Abuja to the boardroom. <br />
              Wear the culture. Own the look.
            </p>

            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/the.owlfamily" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#1E1E1E] flex items-center justify-center text-[#8A9A9E] hover:text-[#C4622D] hover:border-[#C4622D] transition-all"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/share/1DkFGUC9QG/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#1E1E1E] flex items-center justify-center text-[#8A9A9E] hover:text-[#C4622D] hover:border-[#C4622D] transition-all"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@the.owlfamily" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#1E1E1E] flex items-center justify-center text-[#8A9A9E] hover:text-[#C4622D] hover:border-[#C4622D] transition-all"
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v11a4 4 0 1 1-6-4.004Z"></path>
                </svg>
              </a>
              <a 
                href="https://www.threads.net/@the.owlfamily" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#1E1E1E] flex items-center justify-center text-[#8A9A9E] hover:text-[#C4622D] hover:border-[#C4622D] transition-all"
                aria-label="Threads"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-display text-[#F5F0E8] text-xl tracking-widest uppercase mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Shop', href: '/shop' },
                { label: 'Blog', href: '/blogs' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="group flex items-center py-2 font-mono text-[11px] text-[#8A9A9E] uppercase tracking-[0.15em] hover:text-[#F5F0E8] transition-colors w-max"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2 transition-all duration-300 text-[#C4622D]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div className="flex flex-col">
            <h4 className="font-display text-[#F5F0E8] text-xl tracking-widest uppercase mb-6">
              Our Products
            </h4>
            <ul className="flex flex-col gap-4">
              {['Streetwear', 'Smart Casual', 'Corporate', 'Vintage', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <Link 
                    href={`/shop?category=${cat.toLowerCase().replace(' ', '_')}`}
                    className="group flex items-center py-2 font-mono text-[11px] text-[#8A9A9E] uppercase tracking-[0.15em] hover:text-[#F5F0E8] transition-colors w-max"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2 transition-all duration-300 text-[#C4622D]" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col">
            <h4 className="font-display text-[#F5F0E8] text-xl tracking-widest uppercase mb-6">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex flex-col">
                <span className="font-mono text-[10px] text-[#C4622D] uppercase tracking-[0.2em] mb-1">Address</span>
                <span className="font-serif text-[#8A9A9E] text-sm">Abuja, Nigeria<br/>(Est. 2026)</span>
              </li>
              <li className="flex flex-col">
                <span className="font-mono text-[10px] text-[#C4622D] uppercase tracking-[0.2em] mb-1">Phone</span>
                <a href="tel:+2347067415318" className="font-serif text-[#8A9A9E] hover:text-[#F5F0E8] transition-colors text-sm">
                  +234 706 741 5318
                </a>
              </li>
              <li className="flex flex-col">
                <span className="font-mono text-[10px] text-[#C4622D] uppercase tracking-[0.2em] mb-1">Email</span>
                <a href="mailto:info.owlfamily@gmail.com" className="font-serif text-[#8A9A9E] hover:text-[#F5F0E8] transition-colors text-sm">
                  info.owlfamily@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-[#1E1E1E] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[#8A9A9E] uppercase tracking-[0.2em]">
            © 2026 OWL FAMILY. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-mono text-[10px] text-[#8A9A9E] uppercase tracking-[0.2em]">
            <Link href="/terms" className="hover:text-[#F5F0E8] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[#F5F0E8] transition-colors">Privacy Policy</Link>
            <Link href="/admin/sign-in" className="hover:text-[#C4622D] transition-colors">Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
