"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createTestimonial(data: any) {
  const supabase = await createClient()

  const { error } = await supabase.from('testimonials').insert([
    {
      name: data.name,
      label: data.label || 'Verified Buyer',
      avatar: data.avatar,
      headline: data.headline,
      quote: data.quote,
      rating: parseInt(data.rating) || 5,
      is_published: data.is_published,
    }
  ])

  if (error) {
    console.error('Error creating testimonial:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/reviews')
  revalidatePath('/')
  return { success: true }
}

export async function updateTestimonial(id: string, data: any) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('testimonials')
    .update({
      name: data.name,
      label: data.label || 'Verified Buyer',
      avatar: data.avatar,
      headline: data.headline,
      quote: data.quote,
      rating: parseInt(data.rating) || 5,
      is_published: data.is_published,
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating testimonial:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/reviews')
  revalidatePath('/')
  return { success: true }
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting testimonial:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/reviews')
  revalidatePath('/')
  return { success: true }
}

export async function toggleTestimonialStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('testimonials')
    .update({ is_published: !currentStatus })
    .eq('id', id)

  if (error) {
    console.error('Error toggling testimonial status:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/reviews')
  revalidatePath('/')
  return { success: true }
}
