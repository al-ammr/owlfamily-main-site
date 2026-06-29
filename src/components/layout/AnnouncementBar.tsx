export function AnnouncementBar() {
  return (
    <div className="w-full h-[36px] bg-[#C4622D] flex items-center justify-between px-6 md:px-10 z-50 relative">
      {/* Left side: Contact */}
      <div className="hidden md:flex items-center gap-6 font-mono text-[10px] text-[#F5F0E8] tracking-[0.15em] uppercase">
        <span className="flex items-center gap-2">
          <span className="text-sm">✉</span> info.owlfamily@gmail.com
        </span>
        <span className="flex items-center gap-2">
          <span className="text-sm">📞</span> +234 706 741 5318
        </span>
      </div>

      {/* Right side / Mobile Center: Promo */}
      <div className="flex-1 md:flex-none text-center md:text-right font-mono text-[10px] text-[#F5F0E8] tracking-[0.15em] uppercase">
        Free shipping on orders over ₦1,000,000
      </div>
    </div>
  );
}
