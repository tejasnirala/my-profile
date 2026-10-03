import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { personJsonLd, siteMetadata } from "@/lib/seo";
import { THEME_COLORS, themeScript } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Mono is for small labels only, so it isn't preloaded: it must not compete
// with the first paint, and swapping it in late is barely visible.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

// `viewport-fit=cover` lets the page paint under the notch; `gutter` and the
// safe-area paddings keep content clear of it in landscape. The theme-color tags
// follow the OS by default; the inline theme script then overrides them with the
// site's actual theme (dark unless the visitor picked light).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="relative isolate min-h-svh w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground flex flex-col">
          {/* Decoration: a hairline grid behind the top of the page, and the two
              rails that frame the content column from header to footer. */}
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]" />
          <div aria-hidden className="frame pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden -translate-x-1/2 border-x md:block" />
          <Header />
          <main id="main" tabIndex={-1} className="frame flex-1 outline-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
