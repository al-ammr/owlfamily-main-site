<div align="center">

```
 ██████╗ ██╗    ██╗██╗         ███████╗ █████╗ ███╗   ███╗██╗██╗  ██╗   ██╗
██╔═══██╗██║    ██║██║         ██╔════╝██╔══██╗████╗ ████║██║██║  ╚██╗ ██╔╝
██║   ██║██║ █╗ ██║██║         █████╗  ███████║██╔████╔██║██║██║   ╚████╔╝ 
██║   ██║██║███╗██║██║         ██╔══╝  ██╔══██║██║╚██╔╝██║██║██║    ╚██╔╝  
╚██████╔╝╚███╔███╔╝███████╗    ██║     ██║  ██║██║ ╚═╝ ██║██║███████╗██║   
 ╚═════╝  ╚══╝╚══╝ ╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚══════╝╚═╝   
```

### *Wear The Culture.*

**Production-grade e-commerce platform for OWL FAMILY — a streetwear and lifestyle brand  
built in Kaduna, Nigeria. Web + Mobile. Full-stack. Built to scale.**

---

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20CDN-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=flat-square&logo=pwa&logoColor=white)

[Live Site](#) · [Admin Portal](#) · [Report Bug](https://github.com/al-ammr/owlfamily-main-site/issues) · [Request Feature](https://github.com/al-ammr/owlfamily-main-site/issues)

</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [Pages & Routes](#pages--routes)
- [Admin Dashboard](#admin-dashboard)
- [Design System](#design-system)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Brand & Contact](#brand--contact)

---

## About The Project

OWL FAMILY is a premium clothing brand born in Kaduna, Nigeria — with a UK legal presence in London. This repository is the full-stack e-commerce system powering the brand across both web and mobile platforms.

The store is built around four clothing categories — **Streetwear, Smart Casual, Corporate Wear,** and **Vintage Style** — and delivers a dark editorial luxury experience designed to match the brand's identity: *"We are not just a brand. We are a culture."*

The platform ships with a complete **Admin Dashboard** for managing products, blog posts, orders, media, and site settings — all protected by Supabase Auth.

---

## Features

### Storefront
- **Gallery Landing Page** — immersive 5-cell editorial grid with animated hero text, parallax scroll, and custom cursor before entering the shop
- **Product Catalogue** — 18+ products across 4 categories with client-side filtering and shareable filtered URLs
- **Product Detail Pages** — multi-image gallery, size selector, quantity control, related products, "Shop the Look"
- **Cart System** — slide-in drawer with real-time totals, quantity controls, and persistent state via Zustand + localStorage
- **Checkout** — full customer form with Nigerian state selector, delivery method options, and Paystack payment modal
- **WhatsApp Fallback** — order summary routed to WhatsApp for quick-launch before full payment integration

### Blog
- **Blog Listing** — featured post, category filter tabs, 3-column grid with pagination
- **Blog Detail** — rich article layout with sticky sidebar (table of contents, share buttons, related posts), parallax hero image
- **"Shop the Look"** — relevant products embedded within blog posts
- **Newsletter Strip** — email capture integrated into blog pages

### Admin Dashboard (`/admin`)
- **Secure Sign-In** — Supabase Auth with email whitelist and brute force protection
- **Dashboard Overview** — revenue charts (Recharts), orders summary, top products, low stock alerts
- **Product Management** — full CRUD with Cloudinary image upload, size toggles, stock tracking, SEO fields
- **Blog Management** — TipTap rich text editor, cover image upload, category/tag management, publish controls
- **Orders Management** — status pipeline, order timeline, customer detail view, internal notes
- **Media Library** — Cloudinary asset browser with folder navigation and direct URL copy
- **Site Settings** — 6-tab settings panel (General, Social, Payments, Shipping, Notifications, SEO)

### Technical
- **PWA** — installable on mobile via `@ducanh2912/next-pwa`, service worker, offline shell
- **Smooth Scroll** — Lenis for buttery smooth page scroll
- **GSAP Animations** — production-grade scroll-triggered reveals, entrance sequences, parallax
- **Skeleton Loading** — shimmer placeholders for all images and data while loading
- **SEO** — per-page `generateMetadata()`, Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt
- **Form Validation** — React Hook Form + Zod schemas on all forms
- **Image CDN** — Cloudinary via `next-cloudinary`, WebP/AVIF auto-conversion, responsive `sizes`
- **Email** — Resend for order confirmations and notifications
- **Data Fetching** — TanStack Query for client-side caching and server state synchronisation

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 |
| Language | TypeScript | ^5 |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS | ^4 |
| Class Utility | clsx + tailwind-merge | — |
| Global State | Zustand + Immer | ^5 / ^11 |
| Server State | TanStack React Query | ^5 |
| Forms | React Hook Form + Zod | ^7 / ^4 |
| Animations | GSAP + @gsap/react | ^3.15 |
| Smooth Scroll | Lenis | ^1.3 |
| Rich Text Editor | TipTap | ^3 |
| Database | Supabase (PostgreSQL) | ^2 |
| Auth | Supabase Auth + SSR | ^0.12 |
| Image CDN | Cloudinary + next-cloudinary | ^6 |
| Charts | Recharts | ^3 |
| Toast Notifications | Sonner | ^2 |
| Icons | Lucide React | ^1 |
| Markdown Rendering | react-markdown + remark-gfm + rehype-raw | — |
| Email | Resend | ^6 |
| PWA | @ducanh2912/next-pwa | ^10 |
| Image Processing | Sharp | ^0.35 |
| CSS Critical | Critters | ^0.0.23 |
| Linting | ESLint + eslint-config-next | ^9 |
| Formatting | Prettier | ^3 |
| Deployment | Vercel | — |

---

## Project Structure

```
owlfamily-main-site/
├── public/                         # Static assets
│   └── images/, icons/, manifest
├── scripts/
│   ├── setup-db.sh                 # Supabase DB init script
│   └── seed-products.js            # Seeds all 18 OWL FAMILY products
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, global providers)
│   │   ├── page.tsx                # Landing gallery page (/)
│   │   ├── globals.css             # Design tokens, keyframes, base styles
│   │   ├── shop/
│   │   │   ├── page.tsx            # Shop listing + category filter
│   │   │   ├── [category]/page.tsx # Pre-filtered category page
│   │   │   └── [slug]/page.tsx     # Product detail page
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── order-success/page.tsx
│   │   ├── blogs/
│   │   │   ├── page.tsx            # Blog listing
│   │   │   ├── [slug]/page.tsx     # Blog article
│   │   │   └── category/[category]/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx          # Admin shell (sidebar + topbar)
│   │   │   ├── page.tsx            # Dashboard overview
│   │   │   ├── sign-in/page.tsx    # Admin login
│   │   │   ├── products/           # Product CRUD
│   │   │   ├── blogs/              # Blog CRUD + TipTap editor
│   │   │   ├── orders/             # Orders management
│   │   │   ├── categories/         # Category management
│   │   │   ├── media/              # Cloudinary media library
│   │   │   ├── customers/          # Customer list
│   │   │   └── settings/           # Site settings (6 tabs)
│   │   └── api/
│   │       ├── paystack/
│   │       │   ├── initialize/route.ts
│   │       │   └── verify/route.ts
│   │       └── orders/route.ts
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer, CartDrawer, MobileMenu
│   │   ├── landing/                # GalleryHero, GalleryCell, MarqueeStrip
│   │   ├── shop/                   # ProductGrid, ProductCard, FilterBar
│   │   ├── product/                # ProductGallery, ProductInfo, Related
│   │   ├── blog/                   # BlogCard, BlogGrid, ArticleBody
│   │   ├── admin/                  # AdminSidebar, AdminTopbar, DataTable
│   │   └── ui/                     # Button, Badge, Toast, Modal, Cursor
│   ├── hooks/
│   │   ├── useInView.ts            # IntersectionObserver scroll reveal
│   │   └── useParallax.ts          # requestAnimationFrame parallax
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client (client + server)
│   │   ├── paystack.ts             # Paystack helpers + reference generator
│   │   ├── blog.ts                 # Blog data access functions
│   │   ├── cloudinary.ts           # Cloudinary config + helpers
│   │   └── utils.ts                # cn(), formatPrice(), generateSlug()
│   ├── store/
│   │   └── cartStore.ts            # Zustand + Immer + persist cart store
│   ├── types/
│   │   └── index.ts                # Product, CartItem, Order, BlogPost types
│   └── data/
│       └── products.ts             # Static product catalogue (18 items)
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql  # products + orders tables + RLS
│   │   └── 002_blog_schema.sql     # blog_posts table + RLS
│   └── seed.sql                    # Full product seed data
├── AGENTS.md                       # AI agent instructions for this repo
├── CLAUDE.md                       # Claude Code instructions
├── scaffold.js                     # Project scaffolding helper
├── next.config.ts
├── tailwind.config.ts (or mjs)
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── package.json
```

---

## Getting Started

### Prerequisites

Ensure you have these installed before proceeding:

```bash
node  >= 20.0.0
npm   >= 10.0.0
git   >= 2.40.0
```

You will also need free accounts on:
- [Supabase](https://supabase.com) — database and auth
- [Cloudinary](https://cloudinary.com) — image CDN (cloud name: `owlfamily`)
- [Paystack](https://paystack.com) — Nigerian payment gateway
- [Resend](https://resend.com) — transactional email

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/al-ammr/owlfamily-main-site.git

# 2. Navigate into the project
cd owlfamily-main-site

# 3. Install all dependencies
npm install

# 4. Copy the environment template and fill in your values
cp .env.example .env.local

# 5. Set up the database (runs Supabase migrations)
npm run setup:db

# 6. Seed the product catalogue (all 18 OWL FAMILY products)
npm run seed:products

# 7. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the storefront.
Open [http://localhost:3001](http://localhost:3001) for the admin portal (`npm run admin`).

---

### Environment Variables

Create a `.env.local` file in the project root. **Never commit this file.**

```env
# ─── SUPABASE ──────────────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ─── PAYSTACK ──────────────────────────────────────────────────────────────
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxx

# ─── CLOUDINARY ────────────────────────────────────────────────────────────
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=owlfamily
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ─── EMAIL (RESEND) ────────────────────────────────────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=orders@owlfamily.com

# ─── BRAND CONFIG ──────────────────────────────────────────────────────────
NEXT_PUBLIC_WHATSAPP_NUMBER=2347067415318
NEXT_PUBLIC_SITE_URL=https://owlfamily.com

# ─── ADMIN ─────────────────────────────────────────────────────────────────
# Comma-separated list of emails allowed to access /admin
ADMIN_EMAILS=info.owlfamily@gmail.com
```

> **Tip:** Use Paystack test keys (`pk_test_` / `sk_test_`) during development.
> Switch to live keys only before going to production.

---

### Database Setup

The project uses Supabase (PostgreSQL) with Row Level Security enabled.

```bash
# Automated setup (runs migrations + configures RLS)
npm run setup:db

# Seed all 18 products into the database
npm run seed:products
```

Or run migrations manually via the Supabase Dashboard:

1. Go to **Supabase → SQL Editor**
2. Run `supabase/migrations/001_initial_schema.sql`
3. Run `supabase/migrations/002_blog_schema.sql`
4. Run `supabase/seed.sql` to populate products

**Schema overview:**

```
products      — id, name, slug, category, price, sizes[], images[], badge,
                description, in_stock, stock_count, featured, created_at

orders        — id, reference, customer_name, customer_email, customer_phone,
                customer_address, items (jsonb), subtotal, shipping, total,
                status, payment_method, created_at

blog_posts    — id, title, slug, excerpt, content, cover_image, category,
                tags[], author_name, published, featured, views,
                read_time, published_at, created_at

site_settings — key (text PK), value (text), updated_at
```

---

## Available Scripts

```bash
# Development
npm run dev           # Start dev server on http://localhost:3000
npm run admin         # Start admin dev server on http://localhost:3001
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint

# Database
npm run setup:db      # Run Supabase migrations via setup-db.sh
npm run seed:products # Seed all 18 OWL FAMILY products into Supabase
```

---

## Pages & Routes

### Public Storefront

| Route | Description |
|---|---|
| `/` | Gallery landing page — editorial 5-cell hero + marquee |
| `/shop` | Full product catalogue with category filter tabs |
| `/shop/[category]` | Pre-filtered by category (streetwear, smart, corporate, vintage) |
| `/shop/[slug]` | Product detail page — gallery, size selector, add to cart |
| `/cart` | Cart page (also available as slide-in drawer on all pages) |
| `/checkout` | Customer form + delivery options + Paystack payment |
| `/order-success` | Order confirmation page (post-payment) |
| `/blogs` | Blog listing — featured post + 3-column grid |
| `/blogs/[slug]` | Blog article — full rich text with sticky sidebar |
| `/blogs/category/[category]` | Pre-filtered blog posts by category |

### Admin Dashboard

| Route | Description |
|---|---|
| `/admin/sign-in` | Admin login (Supabase Auth, email whitelist) |
| `/admin` | Dashboard overview — stats, revenue chart, recent orders |
| `/admin/products` | Product list table with search + filter |
| `/admin/products/new` | Add new product form |
| `/admin/products/[id]` | Edit existing product |
| `/admin/categories` | Manage clothing categories |
| `/admin/orders` | Orders list with status filter |
| `/admin/orders/[id]` | Order detail — items, customer, status timeline |
| `/admin/blogs` | Blog posts list |
| `/admin/blogs/new` | Write new blog post (TipTap editor) |
| `/admin/blogs/[id]` | Edit existing blog post |
| `/admin/media` | Cloudinary media library browser |
| `/admin/customers` | Customer list from order history |
| `/admin/settings` | Site settings — 6 tabs |

---

## Admin Dashboard

Access the admin at `/admin/sign-in`. Only emails listed in `ADMIN_EMAILS` env variable can authenticate.

### Sign-In Security
- Supabase Auth with email + password
- Admin email whitelist enforced server-side
- Max 5 failed attempts → 15-minute lockout
- Session stored in httpOnly cookie
- All `/admin/*` routes protected via `src/middleware.ts`

### What You Can Manage

**Products** — Add/edit/delete products with Cloudinary image upload (up to 6 images per product), size toggles, pricing, stock levels, badges, and SEO fields.

**Blog Posts** — Full rich text editor (TipTap) with heading styles, blockquotes, image embeds, links, and character count. Publish/draft toggle. Per-post SEO fields.

**Orders** — View all orders with real-time status updates (Pending → Paid → Processing → Shipped → Delivered). Full order detail with customer info and Paystack reference.

**Media Library** — Browse, upload, and organise all Cloudinary assets by folder. Copy direct URLs. Delete assets with confirmation.

**Settings** — Configure store name, social links, Paystack/Stripe keys, shipping prices, notification emails, and Google Analytics/Meta Pixel IDs — all without touching code.

---

## Design System

OWL FAMILY uses a dark editorial luxury aesthetic — high-fashion magazine meets Nigerian streetwear.

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--cream` | `#F5F0E8` | Primary background (shop), text on dark |
| `--ink` | `#0D0D0D` | Primary background (landing), text on light |
| `--bone` | `#E8E0D0` | Secondary backgrounds, alternating sections |
| `--rust` | `#C4622D` | Primary accent — CTAs, prices, badges, active states |
| `--gold` | `#B8962E` | Secondary accent — italic headings, sale indicators |
| `--mist` | `#C8C0B0` | Muted body text, labels, placeholders |
| `--dark-surface` | `#141414` | Elevated cards on dark backgrounds |
| `--card-bg` | `#1A1A1A` | Card surfaces in dark mode |

### Typography

| Role | Font | Weights |
|---|---|---|
| Display / Logo | Bebas Neue | 400 |
| Body / Editorial | Cormorant Garamond | 300, 400, 600 (+ italic) |
| UI / Labels / Code | Space Mono | 400, 700 |

All fonts loaded via `next/font/google` — no external network requests at runtime.

### Animation Principles
- Scroll reveals: `IntersectionObserver` via `useInView` hook, threshold 15%, fire once
- Entrance animations: staggered `fadeUp` per card (60ms delay × index)
- Image hover: `scale(1.06)`, 600ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Parallax: `useParallax` hook, `requestAnimationFrame`, 10–20% scroll speed
- Smooth scroll: Lenis, applied globally via root layout
- GSAP: used for complex timeline animations and scroll-trigger sequences

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

Or connect the GitHub repository directly in the [Vercel Dashboard](https://vercel.com/new).

**Required steps in Vercel:**
1. Import `al-ammr/owlfamily-main-site` from GitHub
2. Framework: **Next.js** (auto-detected)
3. Add all environment variables from `.env.local`
4. Deploy

### Custom Domain Setup

1. Purchase `owlfamily.com` on [Namecheap](https://namecheap.com) or [Google Domains](https://domains.google)
2. In Vercel: **Project → Settings → Domains → Add `owlfamily.com`**
3. Update DNS at your registrar:
   ```
   A     @      76.76.19.61
   CNAME www    cname.vercel-dns.com
   ```
4. SSL auto-provisioned by Vercel (Let's Encrypt). Wait 24–48h for propagation.

### Pre-Deploy Checklist

```
[ ] npm run build completes with 0 errors
[ ] npm run lint passes
[ ] All .env.local variables added to Vercel
[ ] Paystack LIVE keys tested with a real transaction
[ ] Product images uploaded to Cloudinary
[ ] Admin email whitelist set correctly in ADMIN_EMAILS
[ ] Google Analytics ID set in site settings
[ ] Meta Pixel ID set in site setting