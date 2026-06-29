"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { deleteBlogPost } from "@/app/actions/blog";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  views: number;
  published_at: string | null;
  cover_image: string;
}

export function BlogsTableClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter logic
  const filteredPosts = posts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter.toLowerCase().replace(" ", "-");
    const matchesStatus = statusFilter === "All" 
      || (statusFilter === "Published" && p.published)
      || (statusFilter === "Draft" && !p.published);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlogPost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (err) {
        alert("Failed to delete post.");
      }
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "style-guide": return "bg-[#C4622D]/10 text-[#C4622D] border-[#C4622D]/20";
      case "brand-story": return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
      case "culture": return "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20";
      case "tips": return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-display text-[28px] tracking-widest uppercase">Blog Posts</h1>
        <Link 
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-[#C4622D] hover:bg-[#A34E21] text-[#F5F0E8] px-4 py-2 rounded-[6px] font-mono text-[11px] uppercase tracking-wider transition-colors"
        >
          <Plus size={16} />
          Write New Post
        </Link>
      </div>

      {/* CONTROLS ROW */}
      <div className="bg-[#141414] border border-[#1E1E1E] p-4 rounded-[8px] flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search posts by title..." 
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
          <option>All</option>
          <option>Style Guide</option>
          <option>Brand Story</option>
          <option>Culture</option>
          <option>Tips</option>
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
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Cover</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Title</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Views</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Published</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E1E]">
              {paginatedPosts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#9CA3AF] font-mono text-[12px]">
                    No posts found.
                  </td>
                </tr>
              ) : (
                paginatedPosts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-[80px] h-[48px] bg-[#1E1E1E] rounded-[4px] overflow-hidden relative">
                        {p.cover_image ? (
                          <Image 
                            src={getCloudinaryUrl(p.cover_image, { width: 160, height: 96, crop: "fill" })} 
                            alt={p.title} 
                            fill 
                            className="object-cover"
                            sizes="80px"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]">
                            <ImageIcon size={16} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-serif text-[14px] font-semibold text-[#F5F0E8]">{p.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full border font-mono text-[9px] uppercase tracking-widest ${getCategoryColor(p.category)}`}>
                        {p.category.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {p.published ? (
                        <span className="font-mono text-[11px] text-[#10B981]">● Live</span>
                      ) : (
                        <span className="font-mono text-[11px] text-[#9CA3AF]">○ Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-[#9CA3AF]">
                      {p.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF]">
                      {p.published && p.published_at 
                        ? new Date(p.published_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <Link href={`/admin/blogs/${p.id}`} className="p-1.5 text-[#9CA3AF] hover:text-[#F5F0E8] hover:bg-[#1E1E1E] rounded transition-colors">
                          <Edit2 size={16} />
                        </Link>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#1E1E1E] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length}
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
