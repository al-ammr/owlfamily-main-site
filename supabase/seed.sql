-- Clear existing data if necessary (optional during development)
-- TRUNCATE products CASCADE;

INSERT INTO products (name, slug, category, price, sizes, images, description, in_stock, stock_count, featured) VALUES
-- STREET WEAR
('OWL Signature Hoodie', 'owl-signature-hoodie', 'streetwear', 1850000, '{"S","M","L","XL","XXL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=OWL+Signature+Hoodie"}', 'Premium heavyweight hoodie with OWL signature branding.', true, 10, false),
('Graphic Tee OWL Print', 'graphic-tee-owl-print', 'streetwear', 850000, '{"S","M","L","XL","XXL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Graphic+Tee+OWL+Print"}', 'Classic graphic tee featuring the iconic OWL print.', true, 10, false),
('Oversized Drop Shoulder Shirt', 'oversized-drop-shoulder-shirt', 'streetwear', 1100000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Oversized+Drop+Shoulder+Shirt"}', 'Comfortable oversized fit for a relaxed streetwear look.', true, 10, false),
('Jogger Tracksuit Trousers', 'jogger-tracksuit-trousers', 'streetwear', 950000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Jogger+Tracksuit+Trousers"}', 'Everyday jogger tracksuit trousers for ultimate comfort.', true, 10, false),
('Bomber Jacket Black', 'bomber-jacket-black', 'streetwear', 2800000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Bomber+Jacket+Black"}', 'Classic black bomber jacket with minimal branding.', true, 10, false),

-- SMART CASUAL
('Classic Polo Shirt', 'classic-polo-shirt', 'smart_casual', 900000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Classic+Polo+Shirt"}', 'Timeless polo shirt perfect for any smart casual event.', true, 10, false),
('Linen Button-Down Shirt', 'linen-button-down-shirt', 'smart_casual', 1250000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Linen+Button-Down+Shirt"}', 'Lightweight linen shirt for warm weather sophistication.', true, 10, false),
('Slim-Fit Chinos', 'slim-fit-chinos', 'smart_casual', 1400000, '{"30","32","34","36"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Slim-Fit+Chinos"}', 'Tailored chinos that offer a sharp, versatile look.', true, 10, false),
('Slim-Fit Dark Jeans', 'slim-fit-dark-jeans', 'smart_casual', 1650000, '{"30","32","34","36"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Slim-Fit+Dark+Jeans"}', 'Premium dark wash jeans, an essential wardrobe staple.', true, 10, false),
('Smart Casual Blazer', 'smart-casual-blazer', 'smart_casual', 3200000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Smart+Casual+Blazer"}', 'Unstructured blazer for a polished yet relaxed silhouette.', true, 10, false),

-- CORPORATE WEAR
('Two-Piece Suit Charcoal', 'two-piece-suit-charcoal', 'corporate_wear', 6500000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Two-Piece+Suit+Charcoal"}', 'Professional charcoal two-piece suit for the modern executive.', true, 10, false),
('Formal Dress Shirt', 'formal-dress-shirt', 'corporate_wear', 1150000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Formal+Dress+Shirt"}', 'Crisp white dress shirt tailored for a flawless fit.', true, 10, false),
('Formal Trousers Navy', 'formal-trousers-navy', 'corporate_wear', 1800000, '{"30","32","34","36"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Formal+Trousers+Navy"}', 'Navy formal trousers with a sharp, clean break.', true, 10, false),
('Silk Tie Burgundy', 'silk-tie-burgundy', 'corporate_wear', 550000, '{"ONE SIZE"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Silk+Tie+Burgundy"}', '100% pure silk tie in a rich burgundy shade.', true, 10, false),

-- VINTAGE
('High-Waist Vintage Trousers', 'high-waist-vintage-trousers', 'vintage', 1500000, '{"28","30","32","34"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=High-Waist+Vintage+Trousers"}', 'Classic high-waisted wide-leg trousers.', true, 10, false),
('Classic Denim Jacket', 'classic-denim-jacket', 'vintage', 2200000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Classic+Denim+Jacket"}', 'Vintage washed denim jacket for effortless layering.', true, 10, false),
('Flannel Shirt Plaid', 'flannel-shirt-plaid', 'vintage', 1050000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Flannel+Shirt+Plaid"}', 'Soft and warm plaid flannel shirt.', true, 10, false),
('Vintage Washed Tee', 'vintage-washed-tee', 'vintage', 750000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Vintage+Washed+Tee"}', 'Garment-dyed tee with a faded vintage finish.', true, 10, false),

-- CASUAL WEAR
('OWL Comfort Tee', 'owl-comfort-tee', 'casual_wear', 650000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=OWL+Comfort+Tee"}', 'The softest everyday tee you will ever wear.', true, 10, false),
('Relaxed Fit Joggers', 'relaxed-fit-joggers', 'casual_wear', 800000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Relaxed+Fit+Joggers"}', 'Perfect joggers for lounging or running errands.', true, 10, false),

-- NATIVE WEAR
('Agbada Royal Blue', 'agbada-royal-blue', 'native_wear', 4500000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Agbada+Royal+Blue"}', 'Premium royal blue Agbada set with intricate embroidery.', true, 10, false),
('Kente Pattern Dashiki', 'kente-pattern-dashiki', 'native_wear', 2200000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Kente+Pattern+Dashiki"}', 'Vibrant Dashiki featuring authentic Kente patterns.', true, 10, false),

-- FORMAL WEAR
('Premium Tuxedo Set', 'premium-tuxedo-set', 'formal_wear', 8500000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Premium+Tuxedo+Set"}', 'The ultimate black-tie tuxedo set for special occasions.', true, 10, false),
('Executive Vest & Tie Set', 'executive-vest-tie-set', 'formal_wear', 3500000, '{"S","M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Executive+Vest+%26+Tie+Set"}', 'Complete your formal look with this premium vest and tie combo.', true, 10, false),

-- CEREMONIAL WEAR
('Wedding Anniversary Suit', 'wedding-anniversary-suit', 'ceremonial_wear', 5500000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Wedding+Anniversary+Suit"}', 'A celebratory suit designed to make a lasting impression.', true, 10, false),
('Traditional Ceremonial Gown', 'traditional-ceremonial-gown', 'ceremonial_wear', 4000000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Traditional+Ceremonial+Gown"}', 'Rich traditional gown featuring exquisite detailing.', true, 10, false),

-- LUXURY EDITIONS
('Limited Edition Gold Label Hoodie', 'limited-edition-gold-label-hoodie', 'luxury_editions', 4500000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Limited+Edition+Gold+Label+Hoodie"}', 'Exclusive gold label hoodie crafted from the finest materials.', true, 10, false),
('Premium Cashmere Blend Blazer', 'premium-cashmere-blend-blazer', 'luxury_editions', 9500000, '{"M","L","XL"}', '{"https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Premium+Cashmere+Blend+Blazer"}', 'Luxurious cashmere blend blazer for unparalleled elegance.', true, 10, false)
ON CONFLICT (slug) DO NOTHING;
