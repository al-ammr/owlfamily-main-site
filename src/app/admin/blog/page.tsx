"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { DataTable } from "@/components/admin/DataTable";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  published: boolean;
  featured: boolean;
  cover_image: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog?includeDrafts=true");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      key: "cover_image" as keyof BlogPost,
      header: "Image",
      render: (val: any) => {
        const imgUrl = typeof val === 'string' && val.startsWith('/') 
          ? getCloudinaryUrl(val, { width: 64, height: 64, crop: "fill" })
          : val;
        return imgUrl ? (
          <div className="relative w-16 h-10 rounded-[4px] overflow-hidden bg-[#1A1A1A]">
            <Image src={imgUrl} alt="Cover" fill className="object-cover" sizes="64px" />
          </div>
        ) : (
          <div className="w-16 h-10 bg-[#1A1A1A] rounded-[4px]" />
        );
      }
    },
    { key: "title" as keyof BlogPost, header: "Title" },
    { 
      key: "category" as keyof BlogPost, 
      header: "Category",
      render: (val: any) => (
        <span className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">
          {typeof val === 'string' ? val.replace('-', ' ') : val}
        </span>
      )
    },
    { 
      key: "published" as keyof BlogPost, 
      header: "Status",
      render: (val: any) => (
        <span className={`px-2 py-1 rounded-[4px] font-mono text-[9px] uppercase tracking-widest ${
          val ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
        }`}>
          {val ? 'Published' : 'Draft'}
        </span>
      )
    },
    { 
      key: "featured" as keyof BlogPost, 
      header: "Featured",
      render: (val: any) => (
        <span className="font-mono text-[10px] uppercase text-[#9CA3AF]">
          {val ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      key: "id" as keyof BlogPost,
      header: "Actions",
      render: (val: any, item: BlogPost) => (
        <div className="flex items-center gap-3">
          <button className="text-[#9CA3AF] hover:text-[#B45309] transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors" 
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[#F5F0E8] text-3xl tracking-wider uppercase mb-1">
            Blog Posts
          </h1>
          <p className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase">
            Manage articles, editorials, and style guides
          </p>
        </div>
        <button 
          className="bg-[#B45309] hover:bg-[#92400E] text-[#F5F0E8] px-6 py-3 rounded-[6px] font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Write Post
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#B45309] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <DataTable data={posts} columns={columns} searchKey="title" />
      )}
    </div>
  );
}
