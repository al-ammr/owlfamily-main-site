import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Validate session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { settings } = body

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // Enterprise Settings Audit: Validation Rules
    if (settings.min_order_amount && Number(settings.min_order_amount) < 0) {
      return NextResponse.json({ error: 'Minimum order amount cannot be negative.' }, { status: 400 })
    }
    if (settings.free_shipping_threshold && Number(settings.free_shipping_threshold) < 0) {
      return NextResponse.json({ error: 'Free shipping threshold cannot be negative.' }, { status: 400 })
    }

    // Format for Supabase upsert
    const upsertData = Object.keys(settings).map(key => ({
      key,
      value: String(settings[key]),
      updated_at: new Date().toISOString()
    }))

    const { error } = await supabase
      .from('site_settings')
      .upsert(upsertData, { onConflict: 'key' })

    if (error) {
      console.error('Error saving settings:', error)
      return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
    }

    // Enterprise Settings Audit: Structured JSON Logging
    console.log(JSON.stringify({
      event: 'settings_updated',
      timestamp: new Date().toISOString(),
      user: session.user.email,
      keys_updated: Object.keys(settings)
    }))

    // Invalidate edge/next cache
    // @ts-expect-error - Next.js 16 typing mismatch
    revalidateTag('site_settings')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Settings POST error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
