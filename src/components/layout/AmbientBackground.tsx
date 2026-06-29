"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function AmbientBackground() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#0a0a0a]">
      {/* Heavy Film Grain Overlay */}
      <div className="ambient-grain absolute inset-0 opacity-[0.04] mix-blend-overlay z-10" />

      {/* Premium Dynamic Mesh Gradient */}
      <div className="absolute inset-0 opacity-40">
        {/* Core Rust Aura */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full opacity-30 animate-mesh-1 mix-blend-screen" 
             style={{ background: 'radial-gradient(circle, rgba(196,98,45,0.4) 0%, rgba(196,98,45,0.1) 40%, rgba(196,98,45,0) 70%)' }} />
        
        {/* Secondary Gold Aura */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full opacity-20 animate-mesh-2 mix-blend-screen" 
             style={{ background: 'radial-gradient(circle, rgba(184,150,46,0.3) 0%, rgba(184,150,46,0.1) 40%, rgba(184,150,46,0) 70%)' }} />
        
        {/* Deep Accent */}
        <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full opacity-30 animate-mesh-3 mix-blend-screen" 
             style={{ background: 'radial-gradient(circle, rgba(92,45,19,0.5) 0%, rgba(92,45,19,0.1) 40%, rgba(92,45,19,0) 70%)' }} />
        
        {/* Subdued Cool/Neutral Accent */}
        <div className="absolute bottom-[20%] left-[10%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full opacity-[0.15] animate-mesh-4 mix-blend-screen" 
             style={{ background: 'radial-gradient(circle, rgba(138,154,158,0.3) 0%, rgba(138,154,158,0.1) 40%, rgba(138,154,158,0) 70%)' }} />
      </div>

      {/* Vignette Overlay for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0D0D0D_100%)] opacity-80" />
    </div>
  );
}
