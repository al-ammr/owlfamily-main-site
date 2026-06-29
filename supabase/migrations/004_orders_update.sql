-- 1. Drop the existing CHECK constraint on the status column
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- 2. Add the new CHECK constraint including 'processing', 'cancelled', and 'pending'
ALTER TABLE orders ADD CONSTRAINT orders_status_check CHECK (status IN (
    'pending', 
    'paid', 
    'processing', 
    'shipped', 
    'delivered', 
    'refunded',
    'cancelled',
    'failed'
));

-- 3. Add the status_history column to track timeline events safely
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status_history JSONB DEFAULT '[]'::jsonb;
