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

const BLOG_POSTS = [
  {
    title: "The Evolution of African Streetwear in 2026",
    excerpt: "How traditional prints and modern oversized silhouettes are merging to create a new global standard in fashion.",
    content: "<p>African streetwear is evolving rapidly...</p>", // placeholder content
    cover_image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=450&fit=crop&q=80",
    slug: "evolution-african-streetwear-2026",
    category: "culture",
    published: true,
    published_at: new Date("2026-06-12").toISOString()
  },
  {
    title: "Mastering Smart Casual for the Abuja Boardroom",
    excerpt: "Striking the perfect balance between professional respect and personal style in the corporate world.",
    content: "<p>Smart casual is an art form...</p>",
    cover_image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=450&fit=crop&q=80",
    slug: "mastering-smart-casual",
    category: "tips",
    published: true,
    published_at: new Date("2026-05-28").toISOString()
  },
  {
    title: "Why Vintage Will Never Go Out of Style",
    excerpt: "A deep dive into the sustainability and timeless aesthetic of reviving classic garments for the modern wardrobe.",
    content: "<p>Vintage clothing holds a special place in fashion history...</p>",
    cover_image: "https://images.unsplash.com/photo-1550614000-4b95d466f16b?w=800&h=450&fit=crop&q=80",
    slug: "vintage-never-out-of-style",
    category: "style-guide",
    published: true,
    published_at: new Date("2026-04-15").toISOString()
  }
];

async function seedDatabase() {
  console.log('Seeding blogs...');
  
  let inserted = 0;
  let skipped = 0;

  for (const post of BLOG_POSTS) {
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', post.slug)
      .single();

    if (existing) {
      console.log(`Skipping ${post.title} (already exists)`);
      skipped++;
      continue;
    }

    const { error } = await supabase.from('blog_posts').insert(post);
    if (error) {
      console.error(`Error inserting ${post.title}:`, error.message);
    } else {
      console.log(`Inserted ${post.title}`);
      inserted++;
    }
  }

  console.log(`Seed complete! Inserted: ${inserted}, Skipped: ${skipped}`);
}

seedDatabase().catch(console.error);
