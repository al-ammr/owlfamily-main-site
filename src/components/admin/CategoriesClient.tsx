"use client";

import { FolderOpen } from "lucide-react";

interface CategoriesClientProps {
  counts: Record<string, number>;
}

const CATEGORY_LIST = [
  { id: "streetwear", label: "Street wear" },
  { id: "smart_casual", label: "Smart Casual" },
  { id: "casual_wear", label: "Casual" },
  { id: "corporate_wear", label: "Corporate" },
  { id: "vintage", label: "Vintage" },
  { id: "native_wear", label: "Native Wears" },
  { id: "formal_wear", label: "Formal Wears" },
  { id: "ceremonial_wear", label: "Ceremonial Wears" },
  { id: "luxury_editions", label: "Luxury Editions" },
];

export function CategoriesClient({ counts }: CategoriesClientProps) {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-display text-[28px] tracking-widest uppercase">Categories</h1>
      </div>

      <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px]">
        <div className="flex items-start gap-4 mb-8 p-4 bg-[#C4622D]/10 border border-[#C4622D]/20 rounded text-[#F5F0E8] font-mono text-[11px]">
          <FolderOpen className="w-5 h-5 text-[#C4622D] shrink-0" />
          <p className="leading-relaxed text-[#9CA3AF]">
            <strong className="text-[#C4622D] uppercase tracking-widest">Note:</strong> Categories are statically configured in the codebase and database to ensure data integrity. To add or remove a category entirely, the system database constraints must be updated. This page shows your active categories and their product counts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORY_LIST.map((cat) => {
            const productCount = counts[cat.id] || 0;
            return (
              <div key={cat.id} className="bg-[#1A1A1A] border border-[#1E1E1E] p-6 rounded-[8px] flex flex-col justify-between hover:border-[#333] transition-colors">
                <h3 className="font-serif text-[18px] text-[#F5F0E8] mb-2">{cat.label}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#9CA3AF]">ID: {cat.id}</span>
                  <span className="bg-[#1E1E1E] text-[#C8C0B0] px-3 py-1 rounded-full font-mono text-[10px]">
                    {productCount} {productCount === 1 ? 'Product' : 'Products'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
