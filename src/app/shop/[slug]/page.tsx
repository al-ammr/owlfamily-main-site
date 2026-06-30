import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '@/data/products';
import { Navbar } from '@/components/layout/Navbar';
import { ProductGallery } from '@/components/shop/ProductGallery';
import { ProductActions } from '@/components/shop/ProductActions';
import { ProductCard } from '@/components/shop/ProductCard';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | OWL FAMILY Store`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
      title: `${product.name} | OWL FAMILY Store`,
      description: product.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | OWL FAMILY Store`,
      description: product.description,
      images: [product.images[0]],
    }
  };
}

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Get 4 related products from the same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D]">
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: product.images,
          description: product.description,
          sku: product.id,
          offers: {
            "@type": "Offer",
            url: `https://owlfamily.com/shop/${product.slug}`,
            priceCurrency: "NGN",
            price: product.price,
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "OWL FAMILY"
            }
          }
        }}
      />
      <Navbar variant="shop" />

      {/* Main Product Section */}
      <section className="pt-28 md:pt-36 pb-16 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Gallery (60% on desktop) */}
          <div className="w-full lg:w-[60%]">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* RIGHT COLUMN: Info & Actions (40% on desktop) */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center">
            <div className="mb-6">
              <p className="font-mono text-[10px] uppercase text-[#C8C0B0] tracking-widest mb-2">
                Shop / {product.categoryLabel}
              </p>
              <h1 className="font-serif font-semibold text-4xl lg:text-[40px] leading-tight mb-2 text-[#0D0D0D]">
                {product.name}
              </h1>
              <div className="flex items-end gap-3 mb-4">
                <span className="font-display text-4xl tracking-wider text-[#C4622D]">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="font-mono text-lg text-[#8A9A9E] line-through mb-1">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-[#B8962E] text-[#0D0D0D] font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 mb-2">
                      Sale
                    </span>
                  </>
                )}
              </div>
              <p className="font-serif text-[17px] text-[#4A4A4A] leading-relaxed">
                {product.description}
              </p>
            </div>

            <ProductActions product={product} />
          </div>

        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="bg-[#E8E0D0] py-20 px-6 md:px-10 border-t border-[#D8D0C0]">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#D8D0C0]">
              <h2 className="font-display text-3xl md:text-4xl tracking-widest text-[#0D0D0D] uppercase">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} priority={index < 2} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
