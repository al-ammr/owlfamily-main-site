"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { X, Image as ImageIcon, Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Heading3, Quote, Link as LinkIcon, List, Minus, Eye, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { saveBlogPost } from "@/app/actions/blog";

// TipTap
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import TiptapUnderline from '@tiptap/extension-underline'

interface BlogFormProps {
  initialData?: any;
}

const ALLOWED_CATEGORIES = [
  { value: 'style-guide', label: 'Style Guide' },
  { value: 'brand-story', label: 'Brand Story' },
  { value: 'culture', label: 'Culture' },
  { value: 'tips', label: 'Tips' }
];

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State - Left Column
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");

  // Form State - Right Column (Settings)
  const [published, setPublished] = useState(initialData?.published || false);
  const [category, setCategory] = useState(initialData?.category || "style-guide");
  
  // Tags
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  
  // Meta
  const [readTime, setReadTime] = useState(initialData?.read_time?.toString() || "5");
  const [authorName, setAuthorName] = useState(initialData?.author_name || "OWL FAMILY");
  const [authorAvatar, setAuthorAvatar] = useState(initialData?.author_avatar || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  
  // Dates
  const [publishedAt, setPublishedAt] = useState(
    initialData?.published_at 
      ? new Date(initialData.published_at).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );

  // Auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!initialData) {
      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  // Tags logic
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput("");
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter(tag => tag !== t));
  };

  // TipTap Editor Setup
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapUnderline,
      TiptapImage.configure({
        inline: true,
        allowBase64: true,
      }),
      TiptapLink.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Write your story here...',
      }),
      CharacterCount.configure({
        limit: 50000,
      }),
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] text-[#141414] font-serif',
      },
    },
    onUpdate: ({ editor }) => {
      // Auto-calculate read time: roughly 200 words per minute
      const words = editor.storage.characterCount.words();
      const minutes = Math.max(1, Math.ceil(words / 200));
      setReadTime(minutes.toString());
    }
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleSave = async (publishAction: boolean) => {
    if (!title || !slug || !excerpt || !coverImage || !editor) {
      alert("Please fill in Title, Slug, Excerpt, and Cover Image.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const isNowPublished = publishAction || published;

    const postPayload = {
      title,
      slug,
      excerpt,
      content: editor.getHTML(),
      cover_image: coverImage,
      category,
      tags,
      author_name: authorName,
      author_avatar: authorAvatar || null,
      published: isNowPublished,
      featured,
      read_time: parseInt(readTime) || 5,
      published_at: isNowPublished ? new Date(publishedAt).toISOString() : null,
    };

    try {
      await saveBlogPost(postPayload, initialData?.id);
      
      alert(`Post ${isNowPublished ? 'published' : 'saved as draft'} successfully via Server Action!`);
      router.push('/admin/blogs');
      router.refresh();
    } catch (err: any) {
      alert("Error saving post: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-[28px] tracking-widest uppercase">
          {initialData ? "Edit Post" : "Write New Post"}
        </h1>
        {/* Toggle large visual status */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[#9CA3AF] uppercase tracking-wider">Status:</span>
          <button 
            onClick={() => setPublished(!published)}
            className={`px-4 py-2 rounded font-mono text-[11px] uppercase tracking-wider transition-colors border ${
              published 
                ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' 
                : 'bg-[#1A1A1A] text-[#9CA3AF] border-[#1E1E1E]'
            }`}
          >
            {published ? '● Published' : '○ Draft'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN (65%) */}
        <div className="w-full lg:w-[65%] space-y-6">
          
          {/* Title & Slug */}
          <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] space-y-4">
            <input 
              type="text" 
              placeholder="Post Title..." 
              value={title}
              onChange={handleTitleChange}
              className="w-full bg-transparent text-[#F5F0E8] font-serif text-[24px] outline-none placeholder:text-[#333]"
            />
            <div className="flex items-center gap-2 border-t border-[#1E1E1E] pt-4">
              <span className="font-mono text-[11px] text-[#9CA3AF]">owlfamily.com/blogs/</span>
              <input 
                type="text" 
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="flex-1 bg-transparent text-[#C4622D] font-mono text-[16px] md:text-[11px] outline-none"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px]">
            <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Excerpt (Shown on listing) *</label>
            <textarea 
              value={excerpt} 
              onChange={e => setExcerpt(e.target.value)} 
              rows={2} 
              placeholder="Brief summary of the post..."
              className="w-full bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded p-3 text-[#F5F0E8] outline-none resize-none font-sans text-[16px] md:text-[13px]" 
            />
          </div>

          {/* Cover Image */}
          <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px]">
            <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-4">Cover Image *</label>
            <CldUploadWidget
              uploadPreset="owl_family_products"
              onSuccess={(result: any) => {
                if (result.info && result.info.secure_url) {
                  setCoverImage(result.info.secure_url);
                }
              }}
            >
              {({ open }) => (
                <div className="space-y-4">
                  {coverImage ? (
                    <div className="relative w-full h-[240px] rounded overflow-hidden group border border-[#1E1E1E]">
                      <NextImage src={getCloudinaryUrl(coverImage, { width: 800, height: 480, crop: "fill" })} alt="Cover" fill className="object-cover" unoptimized />
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setCoverImage(""); }} 
                        className="absolute top-2 right-2 p-2 bg-black/60 text-white hover:bg-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-[120px] bg-[#1A1A1A] border border-dashed border-[#333] rounded flex flex-col items-center justify-center text-[#9CA3AF]">
                      <ImageIcon size={24} className="mb-2" />
                      <span className="font-mono text-[10px] uppercase tracking-wider">No Cover Image Selected</span>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full py-3 bg-[#1A1A1A] border border-[#333] hover:border-[#C4622D] rounded text-[#9CA3AF] hover:text-[#C4622D] transition-colors font-mono text-[10px] uppercase tracking-wider"
                  >
                    {coverImage ? 'Change Cover Image' : 'Upload Cover Image'}
                  </button>
                </div>
              )}
            </CldUploadWidget>
          </div>

          {/* TipTap Editor */}
          <div className="border border-[#1E1E1E] rounded-[8px] overflow-hidden">
            {/* Toolbar */}
            <div className="bg-[#1A1A1A] border-b border-[#1E1E1E] p-2 flex flex-wrap items-center gap-1">
              <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive('bold') ? 'bg-[#333] text-white' : 'text-[#9CA3AF] hover:bg-[#222]'}`}><Bold size={14} /></button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded ${editor.isActive('italic') ? 'bg-[#333] text-white' : 'text-[#9CA3AF] hover:bg-[#222]'}`}><Italic size={14} /></button>
              <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded ${editor.isActive('underline') ? 'bg-[#333] text-white' : 'text-[#9CA3AF] hover:bg-[#222]'}`}><UnderlineIcon size={14} /></button>
              <div className="w-[1px] h-4 bg-[#333] mx-1" />
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-[#333] text-white' : 'text-[#9CA3AF] hover:bg-[#222]'}`}><Heading1 size={14} /></button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-[#333] text-white' : 'text-[#9CA3AF] hover:bg-[#222]'}`}><Heading2 size={14} /></button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-[#333] text-white' : 'text-[#9CA3AF] hover:bg-[#222]'}`}><Heading3 size={14} /></button>
              <div className="w-[1px] h-4 bg-[#333] mx-1" />
              <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-[#333] text-white' : 'text-[#9CA3AF] hover:bg-[#222]'}`}><Quote size={14} /></button>
              <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-[#333] text-white' : 'text-[#9CA3AF] hover:bg-[#222]'}`}><List size={14} /></button>
              <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={`p-2 rounded text-[#9CA3AF] hover:bg-[#222]`}><Minus size={14} /></button>
              <div className="w-[1px] h-4 bg-[#333] mx-1" />
              <button onClick={setLink} className={`p-2 rounded ${editor.isActive('link') ? 'bg-[#333] text-white' : 'text-[#9CA3AF] hover:bg-[#222]'}`}><LinkIcon size={14} /></button>
              
              <CldUploadWidget
                uploadPreset="owl_family_products"
                onSuccess={(result: any) => {
                  editor.chain().focus().setImage({ src: result.info.secure_url }).run();
                }}
              >
                {({ open }) => (
                  <button onClick={() => open()} className="p-2 rounded text-[#9CA3AF] hover:bg-[#222]">
                    <ImageIcon size={14} />
                  </button>
                )}
              </CldUploadWidget>
            </div>
            
            {/* Editor Area (Cream bg, ink text) */}
            <div className="bg-[#F5F0E8] p-6 min-h-[400px]">
              <EditorContent editor={editor} />
            </div>
            
            {/* Footer */}
            <div className="bg-[#141414] border-t border-[#1E1E1E] p-2 px-4 flex justify-end">
              <span className="font-mono text-[10px] text-[#9CA3AF]">
                {editor.storage.characterCount.words()} words | {editor.storage.characterCount.characters()} characters
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (35%) */}
        <div className="w-full lg:w-[35%]">
          <div className="sticky top-[88px] space-y-6 max-h-[calc(100vh-160px)] overflow-y-auto pb-4 custom-scrollbar">
            
            {/* General Settings */}
            <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] space-y-4">
              <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Settings</h2>
              
              <div>
                <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Category *</label>
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[16px] md:text-[11px]"
                >
                  {ALLOWED_CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Tags</label>
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type and press enter or comma..."
                  className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[16px] md:text-[11px]"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((t, idx) => (
                    <span key={idx} className="flex items-center gap-1 bg-[#1E1E1E] px-2 py-1 rounded font-mono text-[10px] text-[#C8C0B0]">
                      {t}
                      <button onClick={() => removeTag(t)} className="text-[#9CA3AF] hover:text-white"><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Read Time (mins)</label>
                <input 
                  type="number" 
                  value={readTime}
                  onChange={e => setReadTime(e.target.value)}
                  className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[16px] md:text-[11px]"
                />
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-[#1E1E1E]">
                <input 
                  type="checkbox" 
                  checked={featured} 
                  onChange={e => setFeatured(e.target.checked)} 
                  className="accent-[#C4622D] w-4 h-4" 
                />
                <label className="font-mono text-[11px] text-[#F5F0E8] uppercase tracking-wider cursor-pointer">
                  Featured Post
                </label>
              </div>
              
              <div>
                <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Published Date</label>
                <input 
                  type="datetime-local" 
                  value={publishedAt}
                  onChange={e => setPublishedAt(e.target.value)}
                  className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[16px] md:text-[11px] color-scheme-dark"
                />
              </div>
            </div>

            {/* Author */}
            <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] space-y-4">
              <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Author</h2>
              <div>
                <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Author Name</label>
                <input 
                  type="text" 
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-sans text-[16px] md:text-[13px]"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Author Avatar URL</label>
                <div className="flex gap-2">
                  {authorAvatar && (
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative shrink-0">
                      <NextImage src={getCloudinaryUrl(authorAvatar, { width: 80, height: 80, crop: "fill" })} alt="Avatar" fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <CldUploadWidget uploadPreset="owl_family_products" onSuccess={(result: any) => setAuthorAvatar(result.info.secure_url)}>
                    {({ open }) => (
                      <button type="button" onClick={() => open()} className="flex-1 h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] hover:border-[#C4622D] rounded text-[#9CA3AF] font-mono text-[10px] uppercase transition-colors">
                        {authorAvatar ? 'Change' : 'Upload'} Avatar
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            </div>

            {/* SEO Preview */}
            <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px]">
              <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Search Preview</h2>
              <div className="bg-white p-4 rounded text-left font-sans">
                <div className="text-[12px] text-[#202124] mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#f1f3f4] block"></span>
                  <div>
                    <p className="leading-tight">OWL FAMILY</p>
                    <p className="text-[#4d5156] text-[10px] leading-none">https://owlfamily.com/blogs/{slug}</p>
                  </div>
                </div>
                <h3 className="text-[16px] text-[#1a0dab] mb-1 line-clamp-1">{title || 'Post Title'} | OWL FAMILY</h3>
                <p className="text-[12px] text-[#4d5156] line-clamp-2">{excerpt || 'Post excerpt will appear here in search results...'}</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* STICKY ACTIONS BAR */}
      <div className="fixed bottom-0 left-0 md:left-[240px] right-0 h-[72px] bg-[#0D0D0D] border-t border-[#1E1E1E] px-8 flex items-center justify-between z-40">
        <button 
          type="button" 
          onClick={() => handleSave(false)}
          disabled={loading}
          className="font-mono text-[11px] text-[#9CA3AF] hover:text-[#F5F0E8] uppercase tracking-wider disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Draft'}
        </button>
        
        <div className="flex gap-4">
          <Link 
            href={`/blogs/${slug}`}
            target="_blank"
            className="flex items-center gap-2 h-[40px] px-6 border border-[#1E1E1E] hover:bg-[#1A1A1A] text-[#F5F0E8] rounded-[4px] font-mono text-[11px] uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <Eye size={14} /> Preview
          </Link>
          <button 
            type="button" 
            onClick={() => handleSave(true)}
            disabled={loading}
            className="flex items-center gap-2 h-[40px] px-6 bg-[#C4622D] hover:bg-[#A34E21] text-[#F5F0E8] rounded-[4px] font-mono text-[11px] uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <Check size={14} /> {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
