import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import SettingsClient from '@/components/admin/SettingsClient'

export const metadata: Metadata = {
  title: 'Store Settings | OWL FAMILY Admin',
  description: 'Manage global store configurations',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  
  // Fetch all settings
  const { data: settingsData } = await supabase
    .from('site_settings')
    .select('key, value')
  
  // Convert array of {key, value} to a flat object map
  const settingsMap: Record<string, string> = {}
  if (settingsData) {
    settingsData.forEach(item => {
      settingsMap[item.key] = item.value
    })
  }

  return (
    <div className="flex-1">
      <SettingsClient initialSettings={settingsMap} />
    </div>
  )
}
