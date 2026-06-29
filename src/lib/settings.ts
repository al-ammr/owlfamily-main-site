import { createClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

export const getSiteSettings = unstable_cache(
  async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      
      if (!supabaseUrl || !supabaseServiceKey) {
        console.error('[Settings] Missing Supabase credentials in environment.');
        return {};
      }

      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false }
      });

      const { data, error } = await supabaseAdmin
        .from('site_settings')
        .select('key, value')
      
      if (error) {
        console.error('[Settings] Error fetching site settings:', JSON.stringify(error, null, 2))
        return {}
      }

      const settings: Record<string, string> = {}
      if (data) {
        for (const row of data) {
          settings[row.key] = row.value
        }
      }
      return settings
    } catch (e) {
      console.error('[Settings] Exception fetching site settings:', e)
      return {}
    }
  },
  ['site_settings'],
  { tags: ['site_settings'], revalidate: 3600 }
)
