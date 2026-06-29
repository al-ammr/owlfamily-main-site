import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const BADGES = [
  {
    icon: Truck,
    label: "Free Shipping",
    subtext: "On all orders over ₦30,000"
  },
  {
    icon: ShieldCheck,
    label: "Secure Payment",
    subtext: "100% safe & encrypted"
  },
  {
    icon: RotateCcw,
    label: "100% Money Back",
    subtext: "30-day return policy"
  },
  {
    icon: Headset,
    label: "Online Support",
    subtext: "24/7 dedicated support"
  }
];

export function TrustBadges() {
  return (
    <section className="w-full bg-[#E8E0D0] py-6 px-6 md:px-12 border-y border-[#D8D0C0]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0">
        {BADGES.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div 
              key={badge.label} 
              className={`flex flex-col items-center text-center gap-2 
                ${index !== 3 ? 'md:border-r border-[#D8D0C0]' : ''} 
                ${index === 0 || index === 2 ? 'border-r border-[#D8D0C0] md:border-r-0' : ''}
                ${index === 0 || index === 1 ? 'border-b md:border-b-0 border-[#D8D0C0] pb-6 md:pb-0' : 'pt-2 md:pt-0'}
              `}
            >
              <Icon className="w-8 h-8 text-[#C4622D] shrink-0 mb-1" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-[14px] min-[480px]:text-[15px] text-[#0D0D0D] leading-none">
                {badge.label}
              </span>
              <span className="font-mono text-[9px] min-[480px]:text-[10px] text-[#544E45] tracking-[0.05em] leading-tight">
                {badge.subtext}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
