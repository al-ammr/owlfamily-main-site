"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore, selectCartItemCount } from "@/store/cartStore";
import logoImg from "../../../public/images/brand/logo.png";

interface NavbarProps {
  variant?: "landing" | "shop";
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ variant = "landing" }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  
  const cartItemCount = useCartStore(selectCartItemCount);
  const toggleCart = useCartStore((s) => s.toggleCart);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 80);
    };
    handleScroll(); // init
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile overlays on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (mobileMenuOpen || mobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, mobileSearchOpen]);

  const handleOpenMenu = () => {
    setMobileMenuOpen(true);
  };
  
  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleOpenSearch = () => {
    setMobileSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setMobileSearchOpen(false);
  };

  // Swipe down to dismiss for mobile menu
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartY.current < touchEndY.current && touchEndY.current - touchStartY.current > 50) {
      handleCloseMenu();
    }
  };

  return (
    <>
      <nav 
        className={cn(
          "relative w-full transition-all duration-300",
          scrolled 
            ? "bg-[#0D0D0D] shadow-[0_1px_0_#1E1E1E]" 
            : "bg-[#0D0D0D] md:bg-transparent shadow-none"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-[60px] md:h-[72px]">
          
          {/* ——— Left: Desktop Nav Links / Mobile Hamburger ——— */}
          <div className="flex items-center w-1/3">
            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-[#F5F0E8] hover:text-[#C4622D] transition-colors p-2 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={handleOpenMenu}
              aria-label="Open Menu"
            >
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative group font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pb-1",
                      !isActive && "nav-link-underline"
                    )}
                  >
                    <span className={cn(
                      "transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive ? "text-[#F5F0E8]" : (scrolled ? "text-[#8A9A9E]" : "text-[rgba(245,240,232,0.8)]"),
                      !isActive && "hover:text-[#F5F0E8]"
                    )}>
                      {link.label}
                    </span>
                    {/* Active Underline */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C4622D]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ——— Center: Logo ——— */}
          <Link href="/" className="flex items-center justify-center shrink-0 w-1/3 relative h-14 md:h-16">
            <Image 
              src={logoImg} 
              alt="OWL FAMILY Logo" 
              fill
              className={cn("object-contain transition-all duration-300", scrolled ? "brightness-0 invert scale-95" : "brightness-0 invert scale-100")} 
              priority
            />
          </Link>

          {/* ——— Right: Desktop Search + Cart + CTA / Mobile Cart + Search Icon ——— */}
          <div className="flex items-center justify-end gap-4 md:gap-6 w-1/3">
            
            {/* Desktop Search Bar */}
            <div 
              className={cn(
                "hidden md:flex items-center border transition-all duration-300 h-[36px] px-3",
                scrolled ? "bg-[rgba(255,255,255,0.08)]" : "bg-transparent",
                searchFocused ? "border-[#C4622D] w-[280px]" : "border-[#333333] w-[180px]"
              )}
            >
              <Search strokeWidth={1.5} className="w-4 h-4 text-[#8A9A9E] shrink-0" />
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="bg-transparent border-none outline-none text-[#F5F0E8] font-mono text-[11px] w-full ml-2 placeholder:text-[#8A9A9E]"
              />
            </div>

            {/* Mobile Search Icon */}
            <button 
              className="md:hidden text-[#8A9A9E] hover:text-[#F5F0E8] transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={handleOpenSearch}
              aria-label="Search"
            >
              <Search strokeWidth={1.5} className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative text-[#8A9A9E] hover:text-[#F5F0E8] transition-colors p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag strokeWidth={1.5} className="w-5 h-5 md:w-[18px] md:h-[18px]" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C4622D] text-[#F5F0E8] font-mono font-bold text-[8px] md:text-[9px] rounded-full w-4 h-4 md:w-[16px] md:h-[16px] flex items-center justify-center leading-none">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>

            {/* Desktop CTA */}
            <Link 
              href="/shop"
              className="hidden md:flex bg-[#C4622D] text-[#F5F0E8] font-mono text-[11px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#A8521E] transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </nav>

      {/* ——— Full-Screen Mobile Overlay Menu ——— */}
      <div
        className={cn(
          "fixed inset-0 z-[600] md:hidden bg-[#0D0D0D] transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-end p-6">
          <button 
            onClick={handleCloseMenu}
            className="text-[#F5F0E8] hover:text-[#C4622D] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X strokeWidth={1.5} className="w-8 h-8" />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-0 mt-10">
          {NAV_LINKS.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleCloseMenu}
                className={cn(
                  "flex items-center justify-center h-[56px] font-display text-[28px] tracking-[0.1em] uppercase transition-all duration-300 ease-out",
                  isActive ? "text-[#C4622D]" : "text-[#F5F0E8] hover:text-[#C4622D]",
                  mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                )}
                style={{ transitionDelay: `${50 * index}ms` }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ——— Full-Screen Mobile Search Overlay ——— */}
      <div
        className={cn(
          "fixed inset-0 z-[600] md:hidden bg-[#0D0D0D]/95 backdrop-blur-md transition-opacity duration-300 flex flex-col p-6",
          mobileSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between gap-4 w-full border-b border-[#333] pb-4 mt-4">
          <Search strokeWidth={1.5} className="w-6 h-6 text-[#8A9A9E]" />
          <input 
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent border-none outline-none text-[#F5F0E8] font-mono text-[16px] md:text-[14px] placeholder:text-[#8A9A9E]"
            autoFocus={mobileSearchOpen}
          />
          <button 
            onClick={handleCloseSearch}
            className="text-[#F5F0E8] hover:text-[#C4622D] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X strokeWidth={1.5} className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
}
