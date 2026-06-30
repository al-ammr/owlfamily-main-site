"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Plus, Edit2, Trash2, AlertTriangle, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock_count: number;
  in_stock: boolean;
  images: string[];
}

export function ProductsTableClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter.toLowerCase().replace(" ", "_");
    
    // In our schema, we use in_stock boolean. 
    // True = Published/Live, False = Draft
    const matchesStatus = statusFilter === "All" 
      || (statusFilter === "Published" && p.in_stock)
      || (statusFilter === "Draft" && !p.in_stock);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const supabase = createClient();
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Failed to delete product.");
      }
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "streetwear": return "bg-[#C4622D]/10 text-[#C4622D] border-[#C4622D]/20";
      case "smart_casual": return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
      case "casual_wear": return "bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20";
      case "corporate_wear": return "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20";
      case "vintage": return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
      case "native_wear": return "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20";
      case "formal_wear": return "bg-[#EAB308]/10 text-[#EAB308] border-[#EAB308]/20";
      case "ceremonial_wear": return "bg-[#EC4899]/10 text-[#EC4899] border-[#EC4899]/20";
      case "luxury_editions": return "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStockStatus = (count: number, inStock: boolean) => {
    if (!inStock) return { color: "text-[#9CA3AF]", icon: null };
    if (count > 10) return { color: "text-[#10B981]", icon: null };
    if (count >= 5) return { color: "text-[#F59E0B]", icon: null };
    return { color: "text-[#EF4444]", icon: <AlertTriangle size={12} className="inline mr-1" /> };
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "streetwear": return "Street wear";
      case "smart_casual": return "Smart Casual";
      case "casual_wear": return "Casual";
      case "corporate_wear": return "Corporate";
      case "vintage": return "Vintage";
      case "native_wear": return "Native Wears";
      case "formal_wear": return "Formal Wears";
      case "ceremonial_wear": return "Ceremonial Wears";
      case "luxury_editions": return "Luxury Editions";
      default: return cat.replace("_", " ");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-display text-[28px] tracking-widest uppercase">Products</h1>
        <Link 
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#C4622D] hover:bg-[#A34E21] text-[#F5F0E8] px-4 py-2 rounded-[6px] font-mono text-[11px] uppercase tracking-wider transition-colors"
        >
          <Plus size={16} />
          Add New Product
        </Link>
      </div>

      {/* CONTROLS ROW */}
      <div className="bg-[#141414] border border-[#1E1E1E] p-4 rounded-[8px] flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search products by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] pl-10 pr-4 text-[13px] text-[#F5F0E8] font-sans outline-none transition-colors"
          />
        </div>
        
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] px-4 text-[13px] text-[#F5F0E8] font-sans outline-none"
        >
          <option value="All">All</option>
          <option value="streetwear">Street wear</option>
          <option value="smart_casual">Smart Casual</option>
          <option value="casual_wear">Casual</option>
          <option value="corporate_wear">Corporate</option>
          <option value="vintage">Vintage</option>
          <option value="native_wear">Native Wears</option>
          <option value="formal_wear">Formal Wears</option>
          <option value="ceremonial_wear">Ceremonial Wears</option>
          <option value="luxury_editions">Luxury Editions</option>
        </select>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] px-4 text-[13px] text-[#F5F0E8] font-sans outline-none"
        >
          <option>All</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-[#141414] border border-[#1E1E1E] rounded-[8px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1A1A1A] border-b border-[#1E1E1E]">
              <tr>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Image</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Stock</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E1E]">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#9CA3AF] font-mono text-[12px]">
                    No products found.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => {
                  const stockInfo = getStockStatus(p.stock_count, p.in_stock);
                  return (
                    <tr key={p.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="w-[48px] h-[64px] bg-[#1E1E1E] rounded-[4px] overflow-hidden relative">
                          {p.images && p.images.length > 0 ? (
                            <Image 
                              src={p.images[0]} 
                              alt={p.name} 
                              fill 
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]">
                              <ImageIcon size={16} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-serif text-[14px] font-semibold text-[#F5F0E8]">{p.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full border font-mono text-[9px] uppercase tracking-widest ${getCategoryColor(p.category)}`}>
                          {getCategoryLabel(p.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-display text-[16px] tracking-wider text-[#C4622D]">
                        ₦{(p.price / 100).toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 font-mono text-[11px] ${stockInfo.color}`}>
                        {stockInfo.icon} {p.in_stock ? p.stock_count : '-'}
                      </td>
                      <td className="px-6 py-4">
                        {p.in_stock ? (
                          <span className="font-mono text-[11px] text-[#10B981]">● Live</span>
                        ) : (
                          <span className="font-mono text-[11px] text-[#9CA3AF]">○ Draft</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <Link href={`/admin/products/${p.id}`} className="p-1.5 text-[#9CA3AF] hover:text-[#F5F0E8] hover:bg-[#1E1E1E] rounded transition-colors">
                            <Edit2 size={16} />
                          </Link>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#1E1E1E] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-[#1A1A1A] border border-[#1E1E1E] rounded-[4px] text-[#C8C0B0] hover:text-[#F5F0E8] disabled:opacity-50 font-mono text-[10px] uppercase tracking-wider transition-colors"
              >
                Prev
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-[#1A1A1A] border border-[#1E1E1E] rounded-[4px] text-[#C8C0B0] hover:text-[#F5F0E8] disabled:opacity-50 font-mono text-[10px] uppercase tracking-wider transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
