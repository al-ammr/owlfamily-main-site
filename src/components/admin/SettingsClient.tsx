'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CldUploadWidget } from 'next-cloudinary'
import { Save, Image as ImageIcon, MapPin, Plus, Trash2, ShieldAlert } from 'lucide-react'

type SettingsMap = Record<string, string>

type LocationPrice = {
  city: string
  price: string
}

export default function SettingsClient({ initialSettings }: { initialSettings: SettingsMap }) {
  const router = useRouter()
  
  // State for tabs
  const [activeTab, setActiveTab] = useState('general')
  
  // Form State
  const [settings, setSettings] = useState<SettingsMap>({
    store_name: '',
    tagline: '',
    contact_email: '',
    contact_phone: '',
    whatsapp_number: '',
    kaduna_address: '',
    london_address: '',
    timezone: 'Africa/Lagos',
    logo_url: '',
    instagram_url: '',
    facebook_url: '',
    tiktok_url: '',
    twitter_url: '',
    paystack_public: '',
    paystack_secret: '',
    stripe_public: '',
    stripe_secret: '',
    min_order_amount: '0',
    free_shipping_threshold: '0',
    shipping_standard_price: '2500',
    shipping_express_price: '5000',
    delivery_locations: '[]', // JSON string
    order_confirmation_email: 'true',
    admin_new_order_email: '',
    low_stock_threshold: '5',
    low_stock_alert_email: '',
    seo_title_suffix: ' — OWL FAMILY',
    seo_default_desc: '',
    seo_og_image: '',
    google_analytics_id: '',
    meta_pixel_id: '',
    ...initialSettings
  })

  // Parsed dynamic states
  const [locations, setLocations] = useState<LocationPrice[]>([])
  const [isSaving, setIsSaving] = useState(false)

  // Handle Hash URL changes
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setActiveTab(hash)
    }

    try {
      const parsed = JSON.parse(settings.delivery_locations || '[]')
      setLocations(parsed)
    } catch (e) {
      setLocations([])
    }
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    window.history.pushState(null, '', `#${tab}`)
  }

  const handleInputChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleLocationAdd = () => {
    setLocations(prev => [...prev, { city: '', price: '' }])
  }

  const handleLocationUpdate = (index: number, field: 'city' | 'price', value: string) => {
    const newLocations = [...locations]
    newLocations[index][field] = value
    setLocations(newLocations)
    handleInputChange('delivery_locations', JSON.stringify(newLocations))
  }

  const handleLocationRemove = (index: number) => {
    const newLocations = locations.filter((_, i) => i !== index)
    setLocations(newLocations)
    handleInputChange('delivery_locations', JSON.stringify(newLocations))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      })

      if (!response.ok) throw new Error('Failed to save settings')

      toast.success('Settings saved ✓')
      router.refresh()
    } catch (error) {
      toast.error('An error occurred while saving settings')
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'social', label: 'Social' },
    { id: 'payments', label: 'Payments' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'seo', label: 'SEO' }
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] overflow-hidden bg-transparent relative">
      {/* TABS HEADER */}
      <div className="bg-[#141414] border-b border-[#1E1E1E] px-8 pt-4 shrink-0">
        <h1 className="text-2xl font-cormorant font-semibold text-[#F5F0E8] mb-6">Store Settings</h1>
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`pb-3 px-1 text-sm font-space uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-[#C4622D] text-[#F5F0E8] font-semibold' 
                  : 'border-transparent text-[#9CA3AF] hover:text-[#F5F0E8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 pb-32">
        <div className="max-w-3xl space-y-8">
          
          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Store Name</label>
                  <input 
                    type="text" 
                    value={settings.store_name} 
                    onChange={e => handleInputChange('store_name', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md focus:border-[#C4622D] bg-[#1A1A1A] text-[#F5F0E8] outline-none font-cormorant text-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Tagline</label>
                  <input 
                    type="text" 
                    value={settings.tagline} 
                    onChange={e => handleInputChange('tagline', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md focus:border-[#C4622D] bg-[#1A1A1A] text-[#F5F0E8] outline-none font-cormorant text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Logo</label>
                <div className="flex items-center gap-6">
                  {settings.logo_url ? (
                    <div className="w-24 h-24 relative border border-[#1E1E1E] rounded-md bg-[#141414] flex items-center justify-center overflow-hidden">
                      <img src={settings.logo_url} alt="Logo" className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 border-2 border-dashed border-[#1E1E1E] rounded-md bg-[#141414] flex items-center justify-center text-[#9CA3AF]">
                      <ImageIcon size={24} />
                    </div>
                  )}
                  <CldUploadWidget 
                    uploadPreset="owl_family_products"
                    onSuccess={(res: any) => handleInputChange('logo_url', res.info.secure_url)}
                  >
                    {({ open }) => (
                      <button onClick={() => open()} className="px-4 py-2 bg-[#1A1A1A] text-[#F5F0E8] text-sm rounded-md hover:bg-[#1A1A1A]/80 transition">
                        Upload Logo
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Contact Email</label>
                  <input 
                    type="email" 
                    value={settings.contact_email} 
                    onChange={e => handleInputChange('contact_email', e.target.value)}
                    className="w-full px-3 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Phone</label>
                  <input 
                    type="text" 
                    value={settings.contact_phone} 
                    onChange={e => handleInputChange('contact_phone', e.target.value)}
                    className="w-full px-3 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">WhatsApp Number</label>
                  <input 
                    type="text" 
                    value={settings.whatsapp_number} 
                    onChange={e => handleInputChange('whatsapp_number', e.target.value)}
                    className="w-full px-3 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Kaduna Address</label>
                  <textarea 
                    rows={3}
                    value={settings.kaduna_address} 
                    onChange={e => handleInputChange('kaduna_address', e.target.value)}
                    className="w-full px-3 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">London Address</label>
                  <textarea 
                    rows={3}
                    value={settings.london_address} 
                    onChange={e => handleInputChange('london_address', e.target.value)}
                    className="w-full px-3 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Timezone</label>
                <select 
                  value={settings.timezone}
                  onChange={e => handleInputChange('timezone', e.target.value)}
                  className="w-full max-w-xs px-3 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                >
                  <option value="Africa/Lagos">Africa/Lagos</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          )}

          {/* SOCIAL TAB */}
          {activeTab === 'social' && (
            <div className="space-y-6 animate-in fade-in">
              {['instagram', 'facebook', 'tiktok', 'twitter'].map(platform => (
                <div key={platform}>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">{platform} URL</label>
                  <input 
                    type="url" 
                    value={settings[`${platform}_url`]} 
                    onChange={e => handleInputChange(`${platform}_url`, e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none focus:border-[#C4622D]"
                    placeholder={`https://${platform}.com/...`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="p-4 bg-[#1A1A1A]/30 rounded-md flex items-start gap-3">
                <ShieldAlert className="text-[#C4622D] shrink-0 mt-0.5" size={20} />
                <p className="text-sm font-space text-[#F5F0E8] leading-relaxed">
                  Secret keys are heavily masked. They will not display here once saved. If you need to change them, simply enter the new key and save.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-cormorant text-lg font-semibold border-b border-[#1E1E1E] pb-2">Paystack (Nigeria)</h3>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Public Key</label>
                  <input 
                    type="text" 
                    value={settings.paystack_public} 
                    onChange={e => handleInputChange('paystack_public', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                    placeholder="pk_live_..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Secret Key</label>
                  <input 
                    type="password" 
                    value={settings.paystack_secret} 
                    onChange={e => handleInputChange('paystack_secret', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none focus:border-[#C4622D]"
                    placeholder={settings.paystack_secret ? "••••••••••••••••" : "sk_live_..."}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-cormorant text-lg font-semibold border-b border-[#1E1E1E] pb-2">Stripe (International)</h3>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Publishable Key</label>
                  <input 
                    type="text" 
                    value={settings.stripe_public} 
                    onChange={e => handleInputChange('stripe_public', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                    placeholder="pk_live_..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Secret Key</label>
                  <input 
                    type="password" 
                    value={settings.stripe_secret} 
                    onChange={e => handleInputChange('stripe_secret', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none focus:border-[#C4622D]"
                    placeholder={settings.stripe_secret ? "••••••••••••••••" : "sk_live_..."}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#1E1E1E]">
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Minimum Order Amount (₦)</label>
                  <input 
                    type="number" 
                    value={settings.min_order_amount} 
                    onChange={e => handleInputChange('min_order_amount', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Free Shipping Threshold (₦)</label>
                  <input 
                    type="number" 
                    value={settings.free_shipping_threshold} 
                    onChange={e => handleInputChange('free_shipping_threshold', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SHIPPING TAB */}
          {activeTab === 'shipping' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Standard Delivery Price (₦)</label>
                  <input 
                    type="number" 
                    value={settings.shipping_standard_price} 
                    onChange={e => handleInputChange('shipping_standard_price', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Express Delivery Price (₦)</label>
                  <input 
                    type="number" 
                    value={settings.shipping_express_price} 
                    onChange={e => handleInputChange('shipping_express_price', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-2">
                  <h3 className="font-cormorant text-lg font-semibold">Delivery Locations Override</h3>
                  <button onClick={handleLocationAdd} className="text-[#C4622D] hover:text-[#C4622D]/80 flex items-center gap-1 text-sm font-space">
                    <Plus size={14} /> Add City
                  </button>
                </div>

                {locations.length === 0 ? (
                  <p className="text-sm text-[#9CA3AF] italic font-space">No custom city overrides. Standard prices apply globally.</p>
                ) : (
                  <div className="space-y-3">
                    {locations.map((loc, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-[#141414] p-3 rounded-md border border-[#1E1E1E]">
                        <MapPin size={18} className="text-[#9CA3AF]" />
                        <div className="flex-1">
                          <input 
                            type="text" 
                            placeholder="City Name (e.g. Abuja)"
                            value={loc.city}
                            onChange={e => handleLocationUpdate(idx, 'city', e.target.value)}
                            className="w-full bg-transparent border-b border-transparent focus:border-[#C4622D] bg-[#1A1A1A] text-[#F5F0E8] outline-none text-sm font-space"
                          />
                        </div>
                        <div className="w-32">
                          <input 
                            type="number" 
                            placeholder="Price (₦)"
                            value={loc.price}
                            onChange={e => handleLocationUpdate(idx, 'price', e.target.value)}
                            className="w-full bg-transparent border-b border-transparent focus:border-[#C4622D] bg-[#1A1A1A] text-[#F5F0E8] outline-none text-sm font-space"
                          />
                        </div>
                        <button onClick={() => handleLocationRemove(idx)} className="p-1 text-[#9CA3AF] hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between p-4 bg-[#141414] border border-[#1E1E1E] rounded-md">
                <div>
                  <h4 className="font-cormorant font-semibold text-lg">Order Confirmation Email</h4>
                  <p className="text-sm font-space text-[#9CA3AF]">Send automated receipt to customer after payment</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.order_confirmation_email === 'true'}
                    onChange={e => handleInputChange('order_confirmation_email', e.target.checked ? 'true' : 'false')}
                  />
                  <div className="w-11 h-6 bg-[#1A1A1A] peer-focus:bg-[#1A1A1A] text-[#F5F0E8] outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#141414] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C4622D]"></div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Admin New Order Notification Email</label>
                <input 
                  type="email" 
                  value={settings.admin_new_order_email} 
                  onChange={e => handleInputChange('admin_new_order_email', e.target.value)}
                  className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  placeholder="admin@owlfamily.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Low Stock Threshold</label>
                  <input 
                    type="number" 
                    value={settings.low_stock_threshold} 
                    onChange={e => handleInputChange('low_stock_threshold', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Low Stock Alert Email</label>
                  <input 
                    type="email" 
                    value={settings.low_stock_alert_email} 
                    onChange={e => handleInputChange('low_stock_alert_email', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO TAB */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Site Title Suffix</label>
                <input 
                  type="text" 
                  value={settings.seo_title_suffix} 
                  onChange={e => handleInputChange('seo_title_suffix', e.target.value)}
                  className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                />
                <p className="text-[10px] text-[#9CA3AF] mt-1 font-space">Appended to page titles: Page Name {settings.seo_title_suffix}</p>
              </div>

              <div>
                <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Default Meta Description</label>
                <textarea 
                  rows={3}
                  value={settings.seo_default_desc} 
                  onChange={e => handleInputChange('seo_default_desc', e.target.value)}
                  className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Default OpenGraph Image</label>
                <div className="flex items-center gap-6">
                  {settings.seo_og_image ? (
                    <div className="w-48 h-24 relative border border-[#1E1E1E] rounded-md bg-[#141414] flex items-center justify-center overflow-hidden">
                      <img src={settings.seo_og_image} alt="OG" className="max-w-full max-h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-48 h-24 border-2 border-dashed border-[#1E1E1E] rounded-md bg-[#141414] flex items-center justify-center text-[#9CA3AF] text-xs font-space">
                      1200 x 630 recommended
                    </div>
                  )}
                  <CldUploadWidget 
                    uploadPreset="owl_family_products"
                    onSuccess={(res: any) => handleInputChange('seo_og_image', res.info.secure_url)}
                  >
                    {({ open }) => (
                      <button onClick={() => open()} className="px-4 py-2 bg-[#1A1A1A] text-[#F5F0E8] text-sm rounded-md hover:bg-[#1A1A1A]/80 transition">
                        Upload OG Image
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#1E1E1E]">
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Google Analytics ID</label>
                  <input 
                    type="text" 
                    value={settings.google_analytics_id} 
                    onChange={e => handleInputChange('google_analytics_id', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase tracking-wider text-[#9CA3AF] mb-2">Meta Pixel ID</label>
                  <input 
                    type="text" 
                    value={settings.meta_pixel_id} 
                    onChange={e => handleInputChange('meta_pixel_id', e.target.value)}
                    className="w-full px-4 py-2 border border-[#1E1E1E] rounded-md text-[16px] md:text-sm bg-[#1A1A1A] text-[#F5F0E8] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* STICKY SAVE BUTTON */}
      <div className="absolute bottom-8 right-8 z-10">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-[#C4622D] text-cream rounded-full font-space tracking-wider shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
          <Save size={18} />
          {isSaving ? 'SAVING...' : 'SAVE SETTINGS'}
        </button>
      </div>
    </div>
  )
}
