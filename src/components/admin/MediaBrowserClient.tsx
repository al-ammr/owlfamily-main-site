'use client'

import { useState, useTransition } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { Folder, Image as ImageIcon, Search, Plus, Trash2, X, Copy, Check, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'
import { deleteMedia, createFolder, CloudinaryResource } from '@/app/admin/media/actions'
import { useRouter } from 'next/navigation'

type MediaBrowserClientProps = {
  initialMedia: CloudinaryResource[]
  initialFolders: { name: string; path: string }[]
}

export default function MediaBrowserClient({ initialMedia, initialFolders }: MediaBrowserClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  // State
  const [media, setMedia] = useState<CloudinaryResource[]>(initialMedia)
  const [folders, setFolders] = useState(initialFolders)
  const [selectedFolder, setSelectedFolder] = useState<string>('root')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<CloudinaryResource | null>(null)
  const [copied, setCopied] = useState(false)

  // Filter media based on folder and search
  const filteredMedia = media.filter(item => {
    const matchesFolder = selectedFolder === 'root' || item.folder === selectedFolder
    const matchesSearch = item.public_id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  // Handlers
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('URL copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = async (publicId: string) => {
    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) return
    
    startTransition(async () => {
      const result = await deleteMedia(publicId)
      if (result.success) {
        toast.success('Media deleted successfully')
        setMedia(prev => prev.filter(m => m.public_id !== publicId))
        setSelectedMedia(null)
      } else {
        toast.error(result.error || 'Failed to delete media')
      }
    })
  }

  const handleCreateFolder = async () => {
    const name = prompt('Enter new folder name:')
    if (!name) return
    
    startTransition(async () => {
      const result = await createFolder(name)
      if (result.success) {
        toast.success(`Folder "${name}" created`)
        // Optimistic update
        setFolders(prev => [...prev, { name, path: name }])
      } else {
        toast.error(result.error || 'Failed to create folder')
      }
    })
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="flex h-[calc(100vh-56px)] bg-cream">
      {/* SIDEBAR - FOLDERS */}
      <div className="w-64 bg-white border-r border-bone flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-bone flex justify-between items-center">
          <h2 className="font-cormorant font-semibold text-lg text-ink">Folders</h2>
          <button 
            onClick={handleCreateFolder}
            disabled={isPending}
            className="p-1.5 hover:bg-bone rounded-md text-ink transition-colors"
            title="New Folder"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <button
            onClick={() => setSelectedFolder('root')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              selectedFolder === 'root' ? 'bg-ink text-cream' : 'text-ink hover:bg-bone'
            }`}
          >
            <Folder size={16} />
            All Media
          </button>
          {folders.map(folder => (
            <button
              key={folder.path}
              onClick={() => setSelectedFolder(folder.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                selectedFolder === folder.path ? 'bg-ink text-cream' : 'text-ink hover:bg-bone'
              }`}
            >
              <Folder size={16} />
              {folder.name}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* TOPBAR */}
        <div className="h-16 bg-white border-b border-bone px-6 flex items-center justify-between shrink-0">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" size={16} />
            <input 
              type="text"
              placeholder="Search by filename..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-bone/50 border border-transparent focus:border-rust rounded-md text-sm font-space text-ink outline-none transition-all"
            />
          </div>
          
          <CldUploadWidget 
            uploadPreset="owl_family_products"
            options={{
              multiple: true,
              folder: selectedFolder === 'root' ? undefined : selectedFolder,
            }}
            onSuccess={(result) => {
              toast.success('Upload complete!')
              // Simple refresh by routing - could be optimized by appending to state
              router.refresh()
            }}
            onError={(error: any) => {
              console.error("Cloudinary Upload Error:", error);
              toast.error("Upload failed. Make sure your upload preset is configured correctly.");
            }}
          >
            {({ open }) => (
              <button 
                onClick={() => open()}
                className="flex items-center gap-2 px-4 py-2 bg-rust text-cream font-space text-xs tracking-wider rounded-md hover:bg-rust/90 transition-colors"
              >
                <UploadCloud size={16} />
                UPLOAD MEDIA
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* MEDIA GRID */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredMedia.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-mist space-y-4">
              <ImageIcon size={48} className="opacity-20" />
              <p className="font-space text-sm">No media found in this view.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div 
                  key={item.public_id}
                  onClick={() => setSelectedMedia(item)}
                  className={`group relative aspect-square rounded-lg border-2 cursor-pointer overflow-hidden transition-all ${
                    selectedMedia?.public_id === item.public_id ? 'border-rust' : 'border-bone hover:border-rust/50'
                  }`}
                >
                  <div className="absolute inset-0 bg-bone/20 flex items-center justify-center">
                    <CldImage
                      src={item.public_id}
                      alt={item.public_id}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-cream text-xs font-space truncate">{item.public_id.split('/').pop()}</p>
                    <p className="text-mist text-[10px] font-space">{formatBytes(item.bytes)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SLIDE-IN DETAIL PANEL */}
        <div 
          className={`absolute top-0 right-0 h-full w-80 bg-white border-l border-bone shadow-2xl transition-transform duration-300 ease-in-out ${
            selectedMedia ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {selectedMedia && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-bone flex items-center justify-between">
                <h3 className="font-cormorant font-semibold text-lg text-ink">Media Details</h3>
                <button 
                  onClick={() => setSelectedMedia(null)}
                  className="p-1 text-mist hover:text-ink transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="aspect-square relative rounded-lg border border-bone overflow-hidden bg-bone/20">
                  <CldImage
                    src={selectedMedia.public_id}
                    alt={selectedMedia.public_id}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-space text-mist uppercase tracking-wider">Filename</label>
                    <p className="text-sm text-ink font-medium truncate">{selectedMedia.public_id.split('/').pop()}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-space text-mist uppercase tracking-wider">Size</label>
                      <p className="text-sm text-ink">{formatBytes(selectedMedia.bytes)}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-space text-mist uppercase tracking-wider">Dimensions</label>
                      <p className="text-sm text-ink">{selectedMedia.width} x {selectedMedia.height}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-space text-mist uppercase tracking-wider">Format</label>
                      <p className="text-sm text-ink uppercase">{selectedMedia.format}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-space text-mist uppercase tracking-wider">Uploaded</label>
                      <p className="text-sm text-ink">{new Date(selectedMedia.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-bone space-y-3">
                    <button
                      onClick={() => handleCopyUrl(selectedMedia.secure_url)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-bone text-ink rounded-md hover:bg-bone transition-colors font-space text-xs"
                    >
                      {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      {copied ? 'COPIED!' : 'COPY URL'}
                    </button>

                    <button
                      onClick={() => handleDelete(selectedMedia.public_id)}
                      disabled={isPending}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors font-space text-xs"
                    >
                      <Trash2 size={14} />
                      {isPending ? 'DELETING...' : 'DELETE MEDIA'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
