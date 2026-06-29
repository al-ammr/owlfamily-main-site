"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { DataTable } from "@/components/admin/DataTable";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface Collection {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  featured: boolean;
  status: string;
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const res = await fetch("/api/admin/collections?includeDrafts=true");
      if (res.ok) {
        const data = await res.json();
        setCollections(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    
    try {
      const res = await fetch(`/api/admin/collections?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCollections(collections.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      key: "cover_image" as keyof Collection,
      header: "Image",
      render: (val: any) => {
        const imgUrl = typeof val === 'string' && val.startsWith('/') 
          ? getCloudinaryUrl(val, { width: 64, height: 64, crop: "fill" })
          : val;
        return val ? (
          <div className="relative w-12 h-12 rounded-[4px] overflow-hidden bg-[#1A1A1A]">
            <Image src={imgUrl} alt="Cover" fill className="object-cover" sizes="48px" />
          </div>
        ) : (
          <div className="w-12 h-12 bg-[#1A1A1A] rounded-[4px]" />
        );
      }
    },
    { key: "name" as keyof Collection, header: "Name" },
    { 
      key: "status" as keyof Collection, 
      header: "Status",
      render: (val: any) => (
        <span className={`px-2 py-1 rounded-[4px] font-mono text-[9px] uppercase tracking-widest ${
          val === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
        }`}>
          {val}
        </span>
      )
    },
    { 
      key: "featured" as keyof Collection, 
      header: "Featured",
      render: (val: any) => (
        <span className="font-mono text-[10px] uppercase text-[#9CA3AF]">
          {val ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      key: "id" as keyof Collection,
      header: "Actions",
      render: (val: any, item: Collection) => (
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
            Collections
          </h1>
          <p className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase">
            Manage your product collections and drops
          </p>
        </div>
        <button 
          className="bg-[#B45309] hover:bg-[#92400E] text-[#F5F0E8] px-6 py-3 rounded-[6px] font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Collection
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#B45309] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <DataTable data={collections} columns={columns} searchKey="name" />
      )}
    </div>
  );
}
