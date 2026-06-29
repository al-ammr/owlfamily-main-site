const fs = require('fs');
const path = require('path');

const files = [
  'src/app/shop/page.tsx',
  'src/app/shop/[category]/page.tsx',
  'src/app/shop/[slug]/page.tsx',
  'src/app/cart/page.tsx',
  'src/app/checkout/page.tsx',
  'src/app/account/page.tsx',
  'src/app/api/paystack/initialize/route.ts',
  'src/app/api/paystack/verify/route.ts',
  'src/app/api/orders/route.ts',
  'src/components/layout/Navbar.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/layout/CartDrawer.tsx',
  'src/components/layout/MobileMenu.tsx',
  'src/components/landing/GalleryHero.tsx',
  'src/components/landing/GalleryCell.tsx',
  'src/components/landing/HeroOverlay.tsx',
  'src/components/landing/MarqueeStrip.tsx',
  'src/components/shop/ProductGrid.tsx',
  'src/components/shop/ProductCard.tsx',
  'src/components/shop/FilterBar.tsx',
  'src/components/shop/QuickAdd.tsx',
  'src/components/shop/SizeSelector.tsx',
  'src/components/product/ProductGallery.tsx',
  'src/components/product/ProductInfo.tsx',
  'src/components/product/RelatedProducts.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/Badge.tsx',
  'src/components/ui/Toast.tsx',
  'src/components/ui/Modal.tsx',
  'src/components/ui/Cursor.tsx',
  'src/lib/supabase.ts',
  'src/lib/paystack.ts',
  'src/lib/cloudinary.ts'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  
  let content = '';
  if (file.endsWith('page.tsx')) {
    content = `export default function Page() {\n  return (\n    <div>\n      <h1>Page</h1>\n    </div>\n  );\n}\n`;
  } else if (file.endsWith('route.ts')) {
    content = `import { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ message: 'Success' });\n}\n`;
  } else if (file.includes('components/')) {
    const name = path.basename(file, '.tsx');
    content = `export default function ${name}() {\n  return (\n    <div>\n      {/* ${name} Component */}\n    </div>\n  );\n}\n`;
  } else if (file.endsWith('.ts')) {
    content = `// ${path.basename(file)}\n\nexport {};\n`;
  }

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
  }
});
console.log('Skeletons created');
