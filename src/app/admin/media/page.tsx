import { Metadata } from 'next'
import { getMedia, getFolders } from './actions'
import MediaBrowserClient from '@/components/admin/MediaBrowserClient'

export const metadata: Metadata = {
  title: 'Media Browser | OWL FAMILY Admin',
  description: 'Manage Cloudinary media assets',
}

export default async function MediaPage() {
  // Fetch initial data from Cloudinary Admin API
  const [mediaRes, foldersRes] = await Promise.all([
    getMedia(),
    getFolders()
  ])

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-56px)] overflow-hidden">
      <MediaBrowserClient 
        initialMedia={mediaRes.success && mediaRes.resources ? mediaRes.resources : []} 
        initialFolders={foldersRes.success && foldersRes.folders ? foldersRes.folders : []} 
      />
    </div>
  )
}
