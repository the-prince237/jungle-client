import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { QueryProvider } from "@/presentation/components/providers";
import { degular } from "./fonts"
import NextTopLoader from "nextjs-toploader";
import { Footer, Header } from "@/presentation";
import { smPp2DarkBg } from "@/public/logos";
import BottomNavBar from "@/presentation/components/ui/bottom-nav-bar";

export const metadata: Metadata = {
  title: "Jungle Immo",
  description: "L'immobilier, Autrement.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png" },
    ],
    apple: [
      { url: smPp2DarkBg.src },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" className={`${degular.variable} font-sans`}>
        <body className="flex flex-col">
          <NextTopLoader color='oklch(60% 0.118 184.704)' height={5} showSpinner={false} />
          <QueryProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <div className="fixed z-50 bottom-5 w-full md:hidden padded-x">
              <BottomNavBar />
            </div>
            <Footer />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
