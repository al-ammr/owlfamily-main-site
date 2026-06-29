-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==========================================
-- PRODUCTS TABLE
-- ==========================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT CHECK (category IN (
        'streetwear', 
        'smart_casual', 
        'casual_wear', 
        'corporate_wear', 
        'vintage', 
        'native_wear', 
        'formal_wear', 
        'ceremonial_wear', 
        'luxury_editions'
    )),
    price INTEGER NOT NULL, -- Stored in kobo
    original_price INTEGER,
    badge TEXT,
    sizes TEXT[] NOT NULL DEFAULT '{}',
    images TEXT[] NOT NULL DEFAULT '{}',
    description TEXT,
    in_stock BOOLEAN DEFAULT true,
    stock_count INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products Indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Products Trigger
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ORDERS TABLE
-- ==========================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    customer_address TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal INTEGER NOT NULL, -- Stored in kobo
    shipping INTEGER NOT NULL DEFAULT 0,
    total INTEGER NOT NULL,
    status TEXT CHECK (status IN (
        'pending', 
        'paid', 
        'failed', 
        'shipped', 
        'delivered', 
        'refunded'
    )) DEFAULT 'pending',
    payment_method TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders Indexes
CREATE INDEX idx_orders_reference ON orders(reference);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Orders Trigger
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products Policies
-- 1. Public can read products
CREATE POLICY "Public read access for products" 
    ON products FOR SELECT 
    USING (true);

-- 2. Admin can insert/update/delete products
CREATE POLICY "Admin full access for products" 
    ON products 
    USING (auth.role() = 'authenticated');

-- Orders Policies
-- 1. Users can read their own orders
CREATE POLICY "Users can view their own orders" 
    ON orders FOR SELECT 
    USING (customer_email = auth.jwt() ->> 'email');

-- 2. Anyone can create an order (during checkout)
CREATE POLICY "Anyone can create orders" 
    ON orders FOR INSERT 
    WITH CHECK (true);

-- 3. Admin can do everything on orders
CREATE POLICY "Admin full access for orders" 
    ON orders 
    USING (auth.role() = 'authenticated');
