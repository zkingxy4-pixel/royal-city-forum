import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Cinzel, Outfit } from "next/font/google";
import { siteConfig } from "@/config/site";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { parsePortalSession, PORTAL_COOKIE } from "@/lib/portal-cookie";
import "@/styles/globals.css";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["700"], display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.SITE_URL),
  title: {
    default: `${siteConfig.shortName} RP — Uma nova história começa aqui`,
    template: `%s · ${siteConfig.shortName} RP`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.shortName} RP`,
    description: siteConfig.slogan,
    url: siteConfig.SITE_URL,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  icons: { icon: siteConfig.favicon, apple: siteConfig.favicon },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const user = parsePortalSession(jar.get(PORTAL_COOKIE)?.value);

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href={siteConfig.carousel[0].src} />
        <link rel="preload" as="image" href={siteConfig.logo} />
      </head>
      <body className={`${cinzel.variable} ${outfit.variable} font-sans antialiased`}>
        <AuthProvider initialUser={user}>
          <SiteChrome>{children}</SiteChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
