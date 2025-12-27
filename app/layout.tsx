import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/presentation/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <html lang="fr">
        <body>
          <QueryProvider>
            <nav className="border-b">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold">Jungle Estate</a>
                <div className="flex gap-4">
                  <a href="/search">Rechercher</a>
                  <a href="/new">Nouvelle annonce</a>
                  <a href="/profile/me">Mon profil</a>
                </div>
              </div>
            </nav>
            <main className="min-h-screen">{children}</main>
            <footer className="border-t py-8 mt-12">
              <div className="container mx-auto px-4 text-center text-gray-600">
                © 2024 Jungle Estate - Tous droits réservés
              </div>
            </footer>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
