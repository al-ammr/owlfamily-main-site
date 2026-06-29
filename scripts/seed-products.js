const { createClient } = require('@supabase/supabase-js');
require('@next/env').loadEnvConfig(process.cwd());

// Ensure keys are present
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables. Please check .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// We define the products data here again for the JS seeder so it can run independently
const productsData = [
  // STREET WEAR
  { name: 'OWL Signature Hoodie', slug: 'owl-signature-hoodie', category: 'streetwear', price: 1850000, sizes: ['S','M','L','XL','XXL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=OWL+Signature+Hoodie'], description: 'Premium heavyweight hoodie with OWL signature branding.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Graphic Tee OWL Print', slug: 'graphic-tee-owl-print', category: 'streetwear', price: 850000, sizes: ['S','M','L','XL','XXL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Graphic+Tee+OWL+Print'], description: 'Classic graphic tee featuring the iconic OWL print.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Oversized Drop Shoulder Shirt', slug: 'oversized-drop-shoulder-shirt', category: 'streetwear', price: 1100000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Oversized+Drop+Shoulder+Shirt'], description: 'Comfortable oversized fit for a relaxed streetwear look.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Jogger Tracksuit Trousers', slug: 'jogger-tracksuit-trousers', category: 'streetwear', price: 950000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Jogger+Tracksuit+Trousers'], description: 'Everyday jogger tracksuit trousers for ultimate comfort.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Bomber Jacket Black', slug: 'bomber-jacket-black', category: 'streetwear', price: 2800000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Bomber+Jacket+Black'], description: 'Classic black bomber jacket with minimal branding.', in_stock: true, stock_count: 10, featured: false },

  // SMART CASUAL
  { name: 'Classic Polo Shirt', slug: 'classic-polo-shirt', category: 'smart_casual', price: 900000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Classic+Polo+Shirt'], description: 'Timeless polo shirt perfect for any smart casual event.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Linen Button-Down Shirt', slug: 'linen-button-down-shirt', category: 'smart_casual', price: 1250000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Linen+Button-Down+Shirt'], description: 'Lightweight linen shirt for warm weather sophistication.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Slim-Fit Chinos', slug: 'slim-fit-chinos', category: 'smart_casual', price: 1400000, sizes: ['30','32','34','36'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Slim-Fit+Chinos'], description: 'Tailored chinos that offer a sharp, versatile look.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Slim-Fit Dark Jeans', slug: 'slim-fit-dark-jeans', category: 'smart_casual', price: 1650000, sizes: ['30','32','34','36'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Slim-Fit+Dark+Jeans'], description: 'Premium dark wash jeans, an essential wardrobe staple.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Smart Casual Blazer', slug: 'smart-casual-blazer', category: 'smart_casual', price: 3200000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Smart+Casual+Blazer'], description: 'Unstructured blazer for a polished yet relaxed silhouette.', in_stock: true, stock_count: 10, featured: false },

  // CORPORATE WEAR
  { name: 'Two-Piece Suit Charcoal', slug: 'two-piece-suit-charcoal', category: 'corporate_wear', price: 6500000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Two-Piece+Suit+Charcoal'], description: 'Professional charcoal two-piece suit for the modern executive.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Formal Dress Shirt', slug: 'formal-dress-shirt', category: 'corporate_wear', price: 1150000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Formal+Dress+Shirt'], description: 'Crisp white dress shirt tailored for a flawless fit.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Formal Trousers Navy', slug: 'formal-trousers-navy', category: 'corporate_wear', price: 1800000, sizes: ['30','32','34','36'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Formal+Trousers+Navy'], description: 'Navy trousers with a sharp, clean break.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Silk Tie Burgundy', slug: 'silk-tie-burgundy', category: 'corporate_wear', price: 550000, sizes: ['ONE SIZE'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Silk+Tie+Burgundy'], description: '100% pure silk tie in a rich burgundy shade.', in_stock: true, stock_count: 10, featured: false },

  // VINTAGE
  { name: 'High-Waist Vintage Trousers', slug: 'high-waist-vintage-trousers', category: 'vintage', price: 1500000, sizes: ['28','30','32','34'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=High-Waist+Vintage+Trousers'], description: 'Classic high-waisted wide-leg trousers.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Classic Denim Jacket', slug: 'classic-denim-jacket', category: 'vintage', price: 2200000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Classic+Denim+Jacket'], description: 'Vintage washed denim jacket for effortless layering.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Flannel Shirt Plaid', slug: 'flannel-shirt-plaid', category: 'vintage', price: 1050000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Flannel+Shirt+Plaid'], description: 'Soft and warm plaid flannel shirt.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Vintage Washed Tee', slug: 'vintage-washed-tee', category: 'vintage', price: 750000, sizes: ['S','M','L','XL','XXL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Vintage+Washed+Tee'], description: 'Garment-dyed tee with a faded vintage finish.', in_stock: true, stock_count: 10, featured: false },

  // CASUAL WEAR
  { name: 'OWL Comfort Tee', slug: 'owl-comfort-tee', category: 'casual_wear', price: 650000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=OWL+Comfort+Tee'], description: 'The softest everyday tee you will ever wear.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Relaxed Fit Joggers', slug: 'relaxed-fit-joggers', category: 'casual_wear', price: 800000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Relaxed+Fit+Joggers'], description: 'Perfect joggers for lounging or running errands.', in_stock: true, stock_count: 10, featured: false },

  // NATIVE WEAR
  { name: 'Agbada Royal Blue', slug: 'agbada-royal-blue', category: 'native_wear', price: 4500000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Agbada+Royal+Blue'], description: 'Premium royal blue Agbada set with intricate embroidery.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Kente Pattern Dashiki', slug: 'kente-pattern-dashiki', category: 'native_wear', price: 2200000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Kente+Pattern+Dashiki'], description: 'Vibrant Dashiki featuring authentic Kente patterns.', in_stock: true, stock_count: 10, featured: false },

  // FORMAL WEAR
  { name: 'Premium Tuxedo Set', slug: 'premium-tuxedo-set', category: 'formal_wear', price: 8500000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Premium+Tuxedo+Set'], description: 'The ultimate black-tie tuxedo set for special occasions.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Executive Vest & Tie Set', slug: 'executive-vest-tie-set', category: 'formal_wear', price: 3500000, sizes: ['S','M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Executive+Vest+%26+Tie+Set'], description: 'Complete your formal look with this premium vest and tie combo.', in_stock: true, stock_count: 10, featured: false },

  // CEREMONIAL WEAR
  { name: 'Wedding Anniversary Suit', slug: 'wedding-anniversary-suit', category: 'ceremonial_wear', price: 5500000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Wedding+Anniversary+Suit'], description: 'A celebratory suit designed to make a lasting impression.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Traditional Ceremonial Gown', slug: 'traditional-ceremonial-gown', category: 'ceremonial_wear', price: 4000000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Traditional+Ceremonial+Gown'], description: 'Rich traditional gown featuring exquisite detailing.', in_stock: true, stock_count: 10, featured: false },

  // LUXURY EDITIONS
  { name: 'Limited Edition Gold Label Hoodie', slug: 'limited-edition-gold-label-hoodie', category: 'luxury_editions', price: 4500000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Limited+Edition+Gold+Label+Hoodie'], description: 'Exclusive gold label hoodie crafted from the finest materials.', in_stock: true, stock_count: 10, featured: false },
  { name: 'Premium Cashmere Blend Blazer', slug: 'premium-cashmere-blend-blazer', category: 'luxury_editions', price: 9500000, sizes: ['M','L','XL'], images: ['https://via.placeholder.com/400x500/1a1a2e/ffffff?text=Premium+Cashmere+Blend+Blazer'], description: 'Luxurious cashmere blend blazer for unparalleled elegance.', in_stock: true, stock_count: 10, featured: false }
];

async function seedDatabase() {
  console.log('Seeding products...');
  
  let inserted = 0;
  let skipped = 0;

  for (const product of productsData) {
    // Check if product exists
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', product.slug)
      .single();

    if (existing) {
      console.log(`Skipping ${product.name} (already exists)`);
      skipped++;
      continue;
    }

    const { error } = await supabase.from('products').insert(product);
    if (error) {
      console.error(`Error inserting ${product.name}:`, error.message);
    } else {
      console.log(`Inserted ${product.name}`);
      inserted++;
    }
  }

  console.log(`Seed complete! Inserted: ${inserted}, Skipped: ${skipped}`);
}

seedDatabase().catch(console.error);
