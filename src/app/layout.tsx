
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ProvidersLayout from "./Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Santu Express | Envoi de colis – Livraison nationale et internationale",
  description:
    "Service de livraison rapide, sécurisé et fiable. Envoyez vos colis en toute simplicité, suivez-les en temps réel. Tarifs compétitifs, assurance incluse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ProvidersLayout>
          
          {children}
         </ProvidersLayout>
      </body>
    </html>
  );
}
