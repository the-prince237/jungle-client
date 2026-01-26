import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { QueryProvider } from "@/presentation/components/providers";
import Link from "next/link";
import { degular } from "./fonts"
import NextTopLoader from "nextjs-toploader";
import { Footer, Header, MobileNavigator } from "@/presentation";

export const metadata: Metadata = {
  title: "Jungle Immo",
  description: "Trouve. Valide. Entre.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" className={`${degular.variable} font-sans`}>
        <body>
          <NextTopLoader color='oklch(60% 0.118 184.704)' height={5} showSpinner={false} />
          <QueryProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
