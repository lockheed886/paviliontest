import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ViewportNormalizer from "@/components/layout/ViewportNormalizer";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#040906",
};

export const metadata: Metadata = {
  title: "Pavilion Damansara Heights | Luxury Freehold Residences in Damansara Heights",
  description:
    "Pavilion Damansara Heights — 1,314 luxury freehold residences across 3 towers (Windsor, Regent, Crown) atop a 1 million sq.ft. Pavilion Lifestyle Mall. MRT-connected, semi-furnished. The Beverly Hills of Kuala Lumpur.",
  keywords: [
    "luxury residences Damansara Heights",
    "Pavilion Damansara Heights",
    "freehold condo KL",
    "Damansara Heights luxury condo",
    "Windsor Suites PDH",
    "Regent Suites PDH",
    "Crown Residences PDH",
    "Pavilion Group development",
    "luxury property Malaysia",
    "MRT connected residence",
    "Pavilion Lifestyle Mall",
    "Damansara Heights freehold",
  ],
  openGraph: {
    title: "Pavilion Damansara Heights | The Beverly Hills of Kuala Lumpur",
    description:
      "1,314 luxury freehold residences, 9 corporate towers, and 1 million sq.ft. Pavilion Lifestyle Mall. MRT-connected living in Malaysia's most affluent address.",
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "/pdh/pdh_overview_(luxury_fullpage_p2.jpeg",
        width: 1200,
        height: 630,
        alt: "Pavilion Damansara Heights",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Render-blocking: detect browser zoom + normalize font-size BEFORE any paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement,w=window.innerWidth,s=screen.availWidth||screen.width,o=window.outerWidth;if(w<=640){d.style.setProperty("font-size","14px","important");return}var m=o>=s-60;if(m){var e=s-20,z=e/w;if(z>1.08&&z<2.5){d.style.zoom=(1/z).toFixed(4);d.style.setProperty("font-size","14px","important");return}}var f=Math.min(14,Math.max(11.5,8+0.003125*w));d.style.setProperty("font-size",f+"px","important")})();`,
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${playfair.variable} ${cormorant.variable} antialiased bg-dark-bg text-champagne`}
      >
        <ViewportNormalizer />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
