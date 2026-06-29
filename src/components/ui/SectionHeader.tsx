import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
  align?: 'center' | 'left';
  light?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  accent = true,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col mb-12", align === 'center' ? "items-center text-center" : "items-start text-left")}>
      <h2 
        className={cn(
          "font-display text-[clamp(40px,5vw,64px)] tracking-widest uppercase leading-none mb-3",
          light ? "text-[#F5F0E8]" : "text-[#0D0D0D]"
        )}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p className={cn(
          "font-serif italic text-lg max-w-xl",
          light ? "text-[#D8D0C0]" : "text-[#544E45]"
        )}>
          {subtitle}
        </p>
      )}

      {accent && (
        <div 
          className={cn(
            "h-[2px] w-[40px] bg-[#C4622D] mt-6",
            align === 'center' ? "mx-auto" : ""
          )}
        />
      )}
    </div>
  );
}
