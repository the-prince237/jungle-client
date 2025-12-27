import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { QueryProvider } from "@/presentation/components/providers";
import Link from "next/link";

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
            <nav className="border-b bg-white sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  {/* Logo */}
                  <Link href="/" className="text-2xl font-bold text-blue-600">
                    🏠 Jungle
                  </Link>

                  {/* Navigation principale */}
                  <div className="hidden md:flex text-gray-700 gap-6 items-center">
                    <Link href="/" className="hover:text-blue-600">
                      Accueil
                    </Link>
                    <Link href="/search" className="hover:text-blue-600">
                      Rechercher
                    </Link>
                    
                    <SignedIn>
                      <Link href="/new" className="hover:text-blue-600">
                        + Nouvelle annonce
                      </Link>
                      <Link href="/profile/me" className="hover:text-blue-600">
                        Mon profil
                      </Link>
                    </SignedIn>
                    
                    <Link href="/support" className="hover:text-blue-600">
                      Support
                    </Link>
                  </div>

                  {/* Actions utilisateur */}
                  <div className="flex items-center gap-4">
                    <SignedOut>
                      <Link
                        href="/auth/sign-in"
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        Connexion
                      </Link>
                      <Link 
                        href="/auth/sign-up"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        S'inscrire
                      </Link>
                    </SignedOut>

                    <SignedIn>
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10"
                          }
                        }}
                      />
                    </SignedIn>
                  </div>
                </div>

                {/* Navigation mobile */}
                <div className="md:hidden mt-4 flex gap-4 overflow-x-auto pb-2">
                  <Link href="/" className="text-sm whitespace-nowrap">
                    Accueil
                  </Link>
                  <Link href="/search" className="text-sm whitespace-nowrap">
                    Rechercher
                  </Link>
                  <SignedIn>
                    <Link href="/new" className="text-sm whitespace-nowrap">
                      + Nouvelle annonce
                    </Link>
                    <Link href="/profile/me" className="text-sm whitespace-nowrap">
                      Mon profil
                    </Link>
                  </SignedIn>
                  <Link href="/support" className="text-sm whitespace-nowrap">
                    Support
                  </Link>
                </div>
              </div>
            </nav>

            <main className="min-h-screen">{children}</main>

            <footer className="border-t bg-gray-50 py-12 mt-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Jungle</h3>
                    <p className="text-sm text-gray-600">
                      La plateforme immobilière de confiance au Cameroun
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Navigation</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><Link href="/" className="hover:text-blue-600">Accueil</Link></li>
                      <li><Link href="/search" className="hover:text-blue-600">Rechercher</Link></li>
                      <li><Link href="/new" className="hover:text-blue-600">Publier une annonce</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Aide</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><Link href="/support" className="hover:text-blue-600">Support</Link></li>
                      <li><Link href="/support#faq" className="hover:text-blue-600">FAQ</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Contact</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>📧 support@realestatepro.cm</li>
                      <li>📞 +237 6XX XX XX XX</li>
                      <li>📍 Yaoundé, Cameroun</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
                  <p>© {new Date().getFullYear()} Jungle - Tous droits réservés</p>
                </div>
              </div>
            </footer>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
