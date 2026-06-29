export function MarqueeStrip() {
  const items = [
    'OWL FAMILY', 'STREETWEAR', 'SMART CASUAL', 'CORPORATE', 'VINTAGE',
    'WEAR THE CULTURE', 'ABUJA', 'EST. 2026'
  ];

  // Duplicate 4x to ensure seamless infinite scroll on any screen width
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-[#C4622D] overflow-hidden py-3 border-y border-[#0D0D0D] z-30 relative">
      <div 
        className="flex whitespace-nowrap hover:[animation-play-state:paused] w-max"
        style={{
          animation: 'marqueeLeftToRight 20s linear infinite',
        }}
      >
        <style>{`
          @keyframes marqueeLeftToRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
        `}</style>
        
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="font-display text-[15px] text-[#0D0D0D] tracking-[0.3em] uppercase whitespace-nowrap leading-none mt-1">
              {item}
            </span>
            <span className="text-[#F5F0E8] opacity-50 mx-6 text-[10px] leading-none">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
