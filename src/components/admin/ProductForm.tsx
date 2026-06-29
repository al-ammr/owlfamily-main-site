"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { X, GripVertical, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ProductFormProps {
  initialData?: any;
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "ONE SIZE"];

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [description, setDescription] = useState(initialData?.description || "");
  
  // Pricing
  const [price, setPrice] = useState(initialData?.price ? (initialData.price / 100).toString() : "");
  const [originalPrice, setOriginalPrice] = useState(initialData?.original_price ? (initialData.original_price / 100).toString() : "");
  const [badge, setBadge] = useState(initialData?.badge || "None");
  
  // Sizes & Inventory
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes || []);
  const [inStock, setInStock] = useState(initialData?.in_stock !== false);
  const [stockCount, setStockCount] = useState(initialData?.stock_count?.toString() || "0");
  
  // Options
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  // SEO
  const metaTitle = name;
  const metaDescription = description.substring(0, 160);

  const generateSlug = (val: string) => {
    return val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!initialData) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const toggleSize = (size: string) => {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Move image up (left)
  const moveImageUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index - 1];
    newImages[index - 1] = temp;
    setImages(newImages);
  };

  // Move image down (right)
  const moveImageDown = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index + 1];
    newImages[index + 1] = temp;
    setImages(newImages);
  };

  const handleSave = async (isDraft: boolean) => {
    if (!name || !slug || !category || !price) {
      alert("Please fill in all required fields (Name, Category, Price).");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const productPayload = {
      name,
      slug,
      category,
      description,
      price: Math.round(parseFloat(price) * 100),
      original_price: originalPrice ? Math.round(parseFloat(originalPrice) * 100) : null,
      badge: badge !== "None" ? badge : null,
      sizes,
      images,
      in_stock: !isDraft,
      stock_count: parseInt(stockCount) || 0,
      featured
    };

    try {
      if (initialData?.id) {
        // Update
        const { error } = await supabase.from('products').update(productPayload).eq('id', initialData.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from('products').insert([productPayload]);
        if (error) throw error;
      }
      
      alert("Product saved successfully!");
      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      alert("Error saving product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto pb-24">
      <h1 className="font-display text-[28px] tracking-widest uppercase mb-8">
        {initialData ? "Edit Product" : "Add New Product"}
      </h1>

      <div className="space-y-8">
        
        {/* SECTION A: IMAGES */}
        <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px]">
          <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Section A — Images</h2>
          
          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-[120px] h-[160px] bg-[#1A1A1A] rounded overflow-hidden group border border-[#1E1E1E]">
                <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => moveImageUp(idx)} className="p-1 text-white bg-black/50 hover:bg-[#C4622D] rounded" disabled={idx === 0}>←</button>
                    <button type="button" onClick={() => moveImageDown(idx)} className="p-1 text-white bg-black/50 hover:bg-[#C4622D] rounded" disabled={idx === images.length - 1}>→</button>
                  </div>
                  <button type="button" onClick={() => removeImage(idx)} className="p-1 text-red-400 bg-black/50 hover:bg-red-500 hover:text-white rounded">
                    <X size={16} />
                  </button>
                </div>
                {idx === 0 && <span className="absolute top-2 left-2 bg-[#C4622D] text-white text-[9px] font-mono px-1.5 py-0.5 rounded uppercase">Main</span>}
              </div>
            ))}

            {images.length < 6 && (
              <CldUploadWidget
                uploadPreset="owl_family_products"
                onSuccess={(result: any) => {
                  console.log("Cloudinary Upload Success:", result);
                  if (result?.info?.secure_url) {
                    setImages(prev => [...prev, result.info.secure_url]);
                  }
                }}
                onError={(error: any) => {
                  console.error("Cloudinary Upload Error:", error);
                  alert("Upload failed. Make sure your upload preset 'owl_family_products' exists and is set to Unsigned in Cloudinary.");
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-[120px] h-[160px] bg-[#1A1A1A] border border-dashed border-[#333] hover:border-[#C4622D] rounded flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#C4622D] transition-colors"
                  >
                    <Plus size={24} className="mb-2" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">Add Image</span>
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>
          <p className="font-mono text-[10px] text-[#9CA3AF]">Use arrows on hover to reorder. First image is the main thumbnail. (Max 6)</p>
        </div>

        {/* SECTION B: BASIC DETAILS */}
        <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] space-y-4">
          <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Section B — Basic Details</h2>
          
          <div>
            <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Product Name *</label>
            <input type="text" value={name} onChange={handleNameChange} className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] text-[16px] md:text-[14px] outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Slug</label>
              <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#9CA3AF] outline-none font-mono text-[16px] md:text-[11px]" />
              <p className="mt-1 font-mono text-[9px] text-[#666]">Preview: /shop/{slug}</p>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Category *</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[16px] md:text-[11px] uppercase">
                <option value="">Select Category</option>
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
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded p-3 text-[#F5F0E8] text-[16px] md:text-[14px] outline-none resize-y" />
          </div>
        </div>

        {/* SECTION C: PRICING */}
        <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] space-y-4">
          <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Section C — Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Price (₦) *</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[16px] md:text-[14px]" />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Compare at Price (₦)</label>
              <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[16px] md:text-[14px] line-through decoration-[#EF4444]" />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Product Badge</label>
              <select value={badge} onChange={e => setBadge(e.target.value)} className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[16px] md:text-[11px] uppercase">
                <option value="None">None</option>
                <option value="NEW">NEW</option>
                <option value="HOT">HOT</option>
                <option value="SALE">SALE</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION D: SIZES */}
        <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px]">
          <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Section D — Sizes</h2>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SIZES.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`h-[36px] px-4 border rounded font-mono text-[11px] transition-colors uppercase
                  ${sizes.includes(size) 
                    ? "bg-[#C4622D] border-[#C4622D] text-white" 
                    : "bg-[#1A1A1A] border-[#1E1E1E] text-[#9CA3AF] hover:border-[#333]"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION E: INVENTORY */}
        <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] space-y-4">
          <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Section E — Inventory</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <label className="font-mono text-[11px] text-[#F5F0E8] uppercase tracking-wider flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} className="accent-[#C4622D] w-4 h-4" />
              In Stock (Published)
            </label>
            <label className="font-mono text-[11px] text-[#F5F0E8] uppercase tracking-wider flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="accent-[#C4622D] w-4 h-4" />
              Featured Product
            </label>
          </div>

          {inStock && (
            <div className="w-[200px]">
              <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Stock Count</label>
              <input type="number" value={stockCount} onChange={e => setStockCount(e.target.value)} className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[16px] md:text-[14px]" />
            </div>
          )}
        </div>

        {/* SECTION F: SEO */}
        <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] space-y-4">
          <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Section F — SEO Details</h2>
          <div>
            <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1">Meta Title</label>
            <p className="font-sans text-[13px] text-[#F5F0E8] bg-[#1A1A1A] p-3 rounded border border-[#1E1E1E]">{metaTitle || "Product Name"}</p>
          </div>
          <div>
            <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1">Meta Description</label>
            <p className="font-sans text-[13px] text-[#F5F0E8] bg-[#1A1A1A] p-3 rounded border border-[#1E1E1E]">{metaDescription || "Product description will appear here..."}</p>
          </div>
        </div>
      </div>

      {/* STICKY ACTIONS BAR */}
      <div className="fixed bottom-0 left-0 md:left-[240px] right-0 h-[72px] bg-[#0D0D0D] border-t border-[#1E1E1E] px-8 flex items-center justify-between z-40">
        <button 
          type="button" 
          onClick={() => handleSave(true)}
          disabled={loading}
          className="font-mono text-[11px] text-[#9CA3AF] hover:text-[#F5F0E8] uppercase tracking-wider disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save as Draft'}
        </button>
        
        <div className="flex gap-4">
          <button 
            type="button" 
            className="h-[40px] px-6 border border-[#1E1E1E] hover:bg-[#1A1A1A] text-[#F5F0E8] rounded-[4px] font-mono text-[11px] uppercase tracking-wider transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Preview →
          </button>
          <button 
            type="button" 
            onClick={() => handleSave(false)}
            disabled={loading}
            className="h-[40px] px-6 bg-[#C4622D] hover:bg-[#A34E21] text-[#F5F0E8] rounded-[4px] font-mono text-[11px] uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish Product →'}
          </button>
        </div>
      </div>
    </div>
  );
}
