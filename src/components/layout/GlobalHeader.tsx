"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";

export function GlobalHeader() {
  const pathname = usePathname();
  const isShop = pathname.startsWith('/shop') || pathname.startsWith('/blogs');
  
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll(); // init
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If on landing page, announcement bar is 36px tall. Translate up to -36px as user scrolls.
  const headerOffset = pathname === '/' ? Math.min(scrollY, 36) : 0;

  // Do not render the global header inside the admin portal
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header 
      className="fixed top-0 left-0 w-full z-[500] pointer-events-none" 
      style={{ transform: `translateY(-${headerOffset}px)` }}
    >
      <div className="pointer-events-auto">
        {pathname === '/' && <AnnouncementBar />}
        <Navbar variant={isShop ? "shop" : "landing"} />
      </div>
    </header>
  );
}
