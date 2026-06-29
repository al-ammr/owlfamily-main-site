import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import logoImg from "../../../public/images/brand/logo.png";

export function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex items-center justify-between pointer-events-auto">
      {/* Left: Logo & Name */}
      <Link href="/" className="group flex items-center gap-4">
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <Image 
            src={logoImg}
            alt="OWL FAMILY Logo"
            fill
            className="object-contain invert transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="flex flex-col hidden sm:flex">
          <span className="font-display text-[#F5F0E8] text-2xl md:text-3xl tracking-widest leading-none drop-shadow-md">
            OWL FAMILY
          </span>
          <span className="font-serif italic text-[#B8962E] text-[10px] md:text-xs drop-shadow-md">
            Wear The Culture
          </span>
        </div>
      </Link>

      {/* Right: Premium Icon Navigation */}
      <nav className="flex items-center gap-6 md:gap-8 text-[#F5F0E8]">
        {/* Shop / Search Icon */}
        <Link 
          href="/shop" 
          className="hover:text-[#C4622D] transition-colors drop-shadow-md hover:scale-110 transform duration-300" 
          aria-label="Shop / Catalog"
        >
          <Search strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7" />
        </Link>
        
        {/* Cart Icon with minimalist badge */}
        <button 
          className="relative hover:text-[#C4622D] transition-colors drop-shadow-md hover:scale-110 transform duration-300" 
          aria-label="Shopping Cart"
        >
          <ShoppingBag strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7" />
          {/* Subtle badge for items in cart */}
          <span className="absolute -bottom-2 -right-2 bg-[#C4622D] text-[#0D0D0D] font-bold text-[9px] font-mono rounded-full w-4 h-4 flex items-center justify-center border border-[#0D0D0D]">
            0
          </span>
        </button>
      </nav>
    </header>
  );
}
