-- ==========================================
-- COLLECTIONS TABLE
-- ==========================================
CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    status TEXT CHECK (status IN ('active', 'draft')) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_collections_status ON collections(status);
CREATE INDEX idx_collections_featured ON collections(featured);

CREATE TRIGGER update_collections_updated_at
    BEFORE UPDATE ON collections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ALTER PRODUCTS TABLE
-- ==========================================
ALTER TABLE products
ADD COLUMN collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
ADD COLUMN trending BOOLEAN DEFAULT false,
ADD COLUMN tags TEXT[] DEFAULT '{}',
ADD COLUMN sku TEXT UNIQUE,
ADD COLUMN status TEXT CHECK (status IN ('in_stock', 'out_of_stock', 'draft')) DEFAULT 'draft';

CREATE INDEX idx_products_collection ON products(collection_id);
CREATE INDEX idx_products_trending ON products(trending);
CREATE INDEX idx_products_status ON products(status);

-- Migrate old in_stock boolean to status
UPDATE products SET status = CASE WHEN in_stock THEN 'in_stock' ELSE 'out_of_stock' END;

-- ==========================================
-- REVIEWS TABLE
-- ==========================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    avatar TEXT,
    text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_featured ON reviews(featured);
CREATE INDEX idx_reviews_product ON reviews(product_id);

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ADMIN ACTIVITY LOGS TABLE
-- ==========================================
CREATE TABLE admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    ip_address TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_logs_user ON admin_activity_logs(user_email);
CREATE INDEX idx_admin_logs_timestamp ON admin_activity_logs(timestamp);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Collections Policies
CREATE POLICY "Public read access for active collections" 
    ON collections FOR SELECT 
    USING (status = 'active');

CREATE POLICY "Admin full access for collections" 
    ON collections 
    USING (auth.role() = 'authenticated');

-- Reviews Policies
CREATE POLICY "Public read access for approved reviews" 
    ON reviews FOR SELECT 
    USING (status = 'approved');

CREATE POLICY "Admin full access for reviews" 
    ON reviews 
    USING (auth.role() = 'authenticated');

-- Admin Logs Policies
CREATE POLICY "Admin full access for logs" 
    ON admin_activity_logs 
    USING (auth.role() = 'authenticated');
