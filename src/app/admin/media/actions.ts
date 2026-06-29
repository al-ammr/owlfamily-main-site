'use server'

import { revalidatePath } from 'next/cache'

const getCloudinaryAuth = () => {
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!apiKey || !apiSecret || !cloudName) {
    throw new Error('Cloudinary credentials are not properly configured.')
  }

  const authHeader = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
  return { authHeader, cloudName }
}

export type CloudinaryResource = {
  public_id: string
  format: string
  version: number
  resource_type: string
  type: string
  created_at: string
  bytes: number
  width: number
  height: number
  url: string
  secure_url: string
  folder: string
}

export async function getFolders() {
  try {
    const { authHeader, cloudName } = getCloudinaryAuth()
    
    // Cloudinary returns root folders
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/folders`,
      {
        headers: {
          Authorization: authHeader,
        },
        // Don't cache admin API heavily as it changes
        next: { revalidate: 0 }
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Cloudinary API Error:', error)
      return { success: false, folders: [] }
    }

    const data = await response.json()
    return { success: true, folders: data.folders || [] }
  } catch (error) {
    console.error('getFolders error:', error)
    return { success: false, folders: [] }
  }
}

export async function getMedia(folder?: string, search?: string) {
  try {
    const { authHeader, cloudName } = getCloudinaryAuth()

    let url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?max_results=500`

    if (folder && folder !== 'root') {
      // Use prefix for folder filtering
      url += `&type=upload&prefix=${encodeURIComponent(folder)}/`
    }

    const response = await fetch(url, {
      headers: {
        Authorization: authHeader,
      },
      next: { revalidate: 0 }
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Cloudinary API Error:', error)
      return { success: false, resources: [] }
    }

    const data = await response.json()
    let resources: CloudinaryResource[] = data.resources || []

    // If searching, we do a basic client-side filter because the Admin API's native 
    // search requires the advanced Search API which might not be enabled on free tiers.
    if (search) {
      const lowerSearch = search.toLowerCase()
      resources = resources.filter(r => 
        r.public_id.toLowerCase().includes(lowerSearch)
      )
    }

    return { success: true, resources }
  } catch (error) {
    console.error('getMedia error:', error)
    return { success: false, resources: [] }
  }
}

export async function deleteMedia(publicId: string) {
  try {
    const { authHeader, cloudName } = getCloudinaryAuth()

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `public_ids[]=${encodeURIComponent(publicId)}`
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Cloudinary Delete Error:', error)
      return { success: false, error: 'Failed to delete' }
    }

    revalidatePath('/admin/media')
    return { success: true }
  } catch (error) {
    console.error('deleteMedia error:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}

export async function createFolder(folderPath: string) {
  try {
    const { authHeader, cloudName } = getCloudinaryAuth()

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/folders/${encodeURIComponent(folderPath)}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
      }
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Cloudinary Create Folder Error:', error)
      return { success: false, error: 'Failed to create folder' }
    }

    revalidatePath('/admin/media')
    return { success: true }
  } catch (error) {
    console.error('createFolder error:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}
