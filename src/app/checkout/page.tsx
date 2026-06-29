import { getSiteSettings } from '@/lib/settings'
import CheckoutClient from './CheckoutClient'

export default async function CheckoutPage() {
  const settings = await getSiteSettings()

  return (
    <CheckoutClient
      paystackPublicKey={settings.paystack_public || process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''}
      shippingStandardPrice={Number(settings.shipping_standard_price) || 2500}
      shippingExpressPrice={Number(settings.shipping_express_price) || 5000}
      freeShippingThreshold={Number(settings.free_shipping_threshold) || 0}
    />
  )
}
