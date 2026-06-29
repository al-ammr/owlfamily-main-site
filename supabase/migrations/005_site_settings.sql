-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Allow public read access to settings" 
ON public.site_settings FOR SELECT 
USING (true);

-- Allow authenticated users (admins) to manage settings
CREATE POLICY "Allow admins to insert settings" 
ON public.site_settings FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow admins to update settings" 
ON public.site_settings FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Allow admins to delete settings" 
ON public.site_settings FOR DELETE 
TO authenticated 
USING (true);

-- Insert default initial settings
INSERT INTO public.site_settings (key, value) VALUES 
('store_name', 'OWL FAMILY'),
('tagline', 'Wear The Culture'),
('timezone', 'Africa/Lagos'),
('shipping_standard_price', '2500'),
('shipping_express_price', '5000'),
('low_stock_threshold', '5'),
('seo_title_suffix', ' — OWL FAMILY')
ON CONFLICT (key) DO NOTHING;
