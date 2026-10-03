import type { Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { personJsonLd, siteMetadata } from "@/lib/seo";
import { THEME_COLORS, themeScript } from "@/lib/theme";

// The whole site is set in one monospace face: it's the brand, so it's preloaded.
const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
        className={`${mono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="relative isolate min-h-svh w-full bg-background text-foreground font-mono selection:bg-highlight selection:text-highlight-foreground flex flex-col">
          <div aria-hidden className="bg-texture pointer-events-none fixed inset-0 -z-10" />
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
