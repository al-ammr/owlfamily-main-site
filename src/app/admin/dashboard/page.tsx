import { createClient } from "@/lib/supabase/server";
import { Package, FolderOpen, Star, PenTool } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  const supabase = await createClient();

  // Fetch counts in parallel
  const [
    { count: productCount },
    { data: data1 },
    { count: reviewCount },
    { count: blogCount }
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("products").select("category"),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
  ]);

  const collectionCount = data1 ? new Set(data1.map(p => p.category)).size : 0;

  const stats = [
    { name: "Total Products", value: productCount || 0, icon: Package },
    { name: "Collections", value: collectionCount || 0, icon: FolderOpen },
    { name: "Client Reviews", value: reviewCount || 0, icon: Star },
    { name: "Blog Posts", value: blogCount || 0, icon: PenTool },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="mb-10">
        <h1 className="font-display text-[#F5F0E8] text-[clamp(28px,4vw,36px)] tracking-wider uppercase mb-2">
          Dashboard Overview
        </h1>
        <p className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase">
          Welcome to the OWL FAMILY Admin Portal
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.name}
              className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#9CA3AF] tracking-widest uppercase">
                  {stat.name}
                </span>
                <Icon className="w-4 h-4 text-[#B45309]" />
              </div>
              <div className="font-display text-[#F5F0E8] text-4xl">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#141414] border border-[#1E1E1E] rounded-[8px] p-6">
          <h2 className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase mb-6 border-b border-[#1E1E1E] pb-4">
            Recent Activity
          </h2>
          <div className="flex items-center justify-center h-48">
            <span className="font-mono text-[10px] text-[#333] tracking-widest uppercase">
              Activity log coming soon
            </span>
          </div>
        </div>
        
        <div className="bg-[#141414] border border-[#1E1E1E] rounded-[8px] p-6">
          <h2 className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase mb-6 border-b border-[#1E1E1E] pb-4">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            <a href="/admin/products" className="bg-[#1A1A1A] hover:bg-[#B45309]/10 text-[#F5F0E8] hover:text-[#B45309] transition-colors border border-[#333] hover:border-[#B45309]/30 rounded-[6px] p-4 font-mono text-xs uppercase tracking-widest text-center">
              Add New Product
            </a>
            <a href="/admin/blog" className="bg-[#1A1A1A] hover:bg-[#B45309]/10 text-[#F5F0E8] hover:text-[#B45309] transition-colors border border-[#333] hover:border-[#B45309]/30 rounded-[6px] p-4 font-mono text-xs uppercase tracking-widest text-center">
              Write Blog Post
            </a>
            <a href="/admin/collections" className="bg-[#1A1A1A] hover:bg-[#B45309]/10 text-[#F5F0E8] hover:text-[#B45309] transition-colors border border-[#333] hover:border-[#B45309]/30 rounded-[6px] p-4 font-mono text-xs uppercase tracking-widest text-center">
              Manage Collections
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
