/**
 * Cloudinary configuration and utilities for OWL FAMILY
 *
 * Cloud name: owlfamily
 * Upload preset: owlfamily_admin (unsigned, for client-side admin uploads)
 *
 * Folder structure in Cloudinary Media Library:
 *   owlfamily/products/streetwear/
 *   owlfamily/products/smart-casual/
 *   owlfamily/products/corporate/
 *   owlfamily/products/vintage/
 *   owlfamily/lookbook/
 *   owlfamily/blog/
 *   owlfamily/categories/
 *   owlfamily/team/
 *   owlfamily/brand/
 */

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'owlfamily';

export const CLOUDINARY_UPLOAD_PRESET = 'owlfamily_admin';

/**
 * Cloudinary folder paths — maps to the Media Library structure.
 * Use these when uploading or referencing assets.
 */
export const CLOUDINARY_FOLDERS = {
  PRODUCTS_STREETWEAR: 'owlfamily/products/streetwear',
  PRODUCTS_SMART_CASUAL: 'owlfamily/products/smart-casual',
  PRODUCTS_CORPORATE: 'owlfamily/products/corporate',
  PRODUCTS_VINTAGE: 'owlfamily/products/vintage',
  LOOKBOOK: 'owlfamily/lookbook',
  BLOG: 'owlfamily/blog',
  CATEGORIES: 'owlfamily/categories',
  TEAM: 'owlfamily/team',
  BRAND: 'owlfamily/brand',
} as const;

/**
 * Build a Cloudinary delivery URL for a given public ID.
 * Includes automatic format (f_auto) and quality (q_auto) for optimal delivery.
 *
 * @param publicId - The Cloudinary public_id (e.g. "owlfamily/products/streetwear/hoodie-001")
 * @param options  - Optional width/height/crop overrides
 */
export function getCloudinaryUrl(
  publicId: string | null | undefined,
  options?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
  }
): string {
  if (!publicId) return "";

  const { width, height, crop = 'fill', quality = 'auto' } = options || {};
  const transforms: string[] = ['f_auto', `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);

  // If it's already a Cloudinary URL, inject our transforms
  if (publicId.startsWith('https://res.cloudinary.com/')) {
    const uploadIndex = publicId.indexOf('/upload/');
    if (uploadIndex !== -1) {
      const before = publicId.slice(0, uploadIndex + 8);
      const after = publicId.slice(uploadIndex + 8);
      // Remove any existing duplicate transforms if needed, but simply prepending usually works
      // Cloudinary handles chained transforms like /upload/w_500/v1234/
      return `${before}${transforms.join(',')}/${after}`;
    }
    return publicId;
  }

  // If it's an Unsplash URL or other external URL, return as is
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    return publicId;
  }

  // If it's a local absolute path (e.g. seeded images like /images/...), return as is
  if (publicId.startsWith('/')) {
    return publicId;
  }

  // Otherwise, assume it's a raw Cloudinary public ID
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms.join(',')}/${publicId}`;
}

/**
 * Upload an image to Cloudinary (client-side, unsigned).
 * Uses the owlfamily_admin unsigned upload preset.
 *
 * @param file   - File or Blob to upload
 * @param folder - Target folder in Cloudinary (use CLOUDINARY_FOLDERS constants)
 * @returns      - The Cloudinary upload response (includes public_id, secure_url, etc.)
 */
export async function uploadToCloudinary(
  file: File | Blob,
  folder: string
): Promise<{
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Cloudinary upload failed: ${err}`);
  }

  return res.json();
}
