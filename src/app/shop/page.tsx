import { createClient } from "@/lib/supabase/server";
import ShopClient from "./ShopClient";
import { CATEGORY_LABELS } from "@/types";
import { PRODUCTS } from "@/data/products";

export const metadata = {
  title: "Shop | OWL FAMILY",
  description: "Browse the complete collection of OWL FAMILY premium apparel.",
};

export default async function ShopPage() {
  const supabase = await createClient();

  // Fetch Products
  const { data: dbProducts, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (productsError) {
    console.error("Error fetching products on shop page:", productsError);
  }

  // Map DB Products to UI Product interface
  const formattedProducts = dbProducts && dbProducts.length > 0 
    ? dbProducts.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        categoryLabel: CATEGORY_LABELS[p.category as keyof typeof CATEGORY_LABELS] || p.category,
        price: p.price / 100,
        originalPrice: p.original_price ? p.original_price / 100 : undefined,
        badge: p.badge,
        sizes: p.sizes || [],
        images: p.images || [],
        description: p.description || '',
        inStock: p.in_stock,
        stockCount: p.stock_count,
        featured: p.featured,
        createdAt: p.created_at
      }))
    : PRODUCTS;

  return <ShopClient initialProducts={formattedProducts} />;
}
