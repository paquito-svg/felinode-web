import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Cat } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://felinode.com'),
  title: "FeliNode - Aprende inglés de forma inteligente",
  description: "Aprende inglés de forma eficiente, offline y con IA interactiva.",
  keywords: ["Aprender Inglés", "Offline", "AI", "FeliNode", "Gamification", "React Native", "Educación"],
  authors: [{ name: "Fabrizio Fernando Aguilar Coro" }],
  creator: "Fabrizio Fernando Aguilar Coro",
  openGraph: {
    type: "website",
    locale: "es_BO",
    url: "/",
    title: "FeliNode - Aprende inglés de forma inteligente",
    description: "Aprende inglés de forma eficiente, offline y con IA interactiva.",
    siteName: "FeliNode",
  },
  twitter: {
    card: "summary_large_image",
    title: "FeliNode - Aprende inglés de forma inteligente",
    description: "Aprende inglés de forma eficiente, offline y con IA interactiva.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="header">
          <div className="container nav">
            <Link href="/" className="logo">
              <Cat className="logo-icon" size={28} />
              FeliNode
            </Link>
            <nav className="nav-links">
              <Link href="/#features" className="nav-link">Características</Link>
              <Link href="/privacy" className="nav-link">Privacidad</Link>
              <Link href="/terms" className="nav-link">Términos</Link>
              <Link href="/eliminar-cuenta" className="nav-link">Eliminar Cuenta</Link>
              <a href="mailto:fernandoaguilarcoro@gmail.com" className="nav-link">Soporte</a>
            </nav>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>

        <footer className="footer">
          <div className="container footer-content">
            <div className="logo" style={{ justifyContent: "center" }}>
              <Cat className="logo-icon" size={24} />
              FeliNode
            </div>

            <div className="footer-links">
              <Link href="/privacy" className="footer-link">Política de Privacidad</Link>
              <Link href="/terms" className="footer-link">Términos y Condiciones</Link>
              <Link href="/eliminar-cuenta" className="footer-link">Eliminar Cuenta</Link>
              <a href="mailto:fernandoaguilarcoro@gmail.com" className="footer-link">Contacto: fernandoaguilarcoro@gmail.com</a>
            </div>

            <div className="footer-developer">
              &copy; {new Date().getFullYear()} FeliNode. Bolivia, Sucre.
              <br />
              Desarrollado por Fabrizio Fernando Aguilar Coro.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
