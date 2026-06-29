import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Cormorant_Garamond, Space_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import QueryProvider from "@/components/providers/QueryProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { getSiteSettings } from "@/lib/settings";

import { SplashScreen } from "@/components/layout/SplashScreen";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { AmbientBackground } from "@/components/layout/AmbientBackground";

import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  const titleSuffix = settings.seo_title_suffix || " — OWL FAMILY";
  const defaultDesc = settings.seo_default_desc || "Premium streetwear, smart casual, corporate and vintage clothing. Based in Abuja, Nigeria. Shop hoodies, suits, denim & more.";
  const ogImage = settings.seo_og_image || "/images/og-image.jpg";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://owlfamily.com"),
    title: {
      default: `OWL FAMILY${titleSuffix}`,
      template: `%s | OWL FAMILY Store`,
    },
    description: defaultDesc,
    keywords: [
      "owl family", "streetwear Nigeria", "Abuja fashion", "buy clothes online Nigeria", 
      "hoodies Nigeria", "suits Abuja", "fashion", "streetwear"
    ],
    authors: [{ name: "OWL FAMILY" }],
    creator: "OWL FAMILY",
    publisher: "OWL FAMILY",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: `OWL FAMILY${titleSuffix}`,
      description: defaultDesc,
      url: "https://owlfamily.com",
      siteName: "OWL FAMILY",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "OWL FAMILY Store",
        },
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `OWL FAMILY${titleSuffix}`,
      description: defaultDesc,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: "/manifest.json",
    appleWebApp: {
      title: "OWL FAMILY",
      statusBarStyle: "black-translucent",
      capable: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#C4622D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Accessibility
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const GA_TRACKING_ID = settings.google_analytics_id || "G-02HGQDL418";
  const META_PIXEL_ID = settings.meta_pixel_id || process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${cormorant.variable} ${spaceMono.variable}`}
    >
      <head>
        <JsonLd 
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "OWL FAMILY",
            url: "https://owlfamily.com",
            logo: "https://owlfamily.com/images/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+234-800-000-0000",
              contactType: "customer service",
              areaServed: "NG",
              availableLanguage: "en"
            },
            sameAs: [
              "https://instagram.com/owlfamily",
              "https://twitter.com/owlfamily"
            ]
          }} 
        />
        <JsonLd 
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "OWL FAMILY Store",
            url: "https://owlfamily.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://owlfamily.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }}
        />

        {/* Meta Pixel Code */}
        {META_PIXEL_ID && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className="font-serif bg-ink text-[#E0D8CC] antialiased selection:bg-[#C4622D] selection:text-[#F5F0E8] overflow-x-hidden min-h-screen flex flex-col">
        <SmoothScroller />
        <AmbientBackground />
        
        <QueryProvider>
          <ToastProvider>

            <SplashScreen />
            <CartDrawer />
            
            <GlobalHeader />
            
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            
            <ScrollToTop />
            <Footer />
          </ToastProvider>
        </QueryProvider>

        <GoogleAnalytics gaId={GA_TRACKING_ID} />
      </body>
    </html>
  );
}
