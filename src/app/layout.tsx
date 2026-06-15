import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import FloatingWidgets from "@/components/layout/FloatingWidgets";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://alagoasmedical.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Alagoas Medical | Produtos Hospitalares em Maceió",
  description:
    "A Alagoas Medical oferece produtos hospitalares de qualidade para clínicas, hospitais e pacientes em Maceió. Atendimento especializado e entrega rápida.",
  keywords: [
    "produtos hospitalares",
    "materiais hospitalares",
    "Maceió",
    "Alagoas",
    "curativos",
    "feridas complexas",
    "home care",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Alagoas Medical",
    title: "Alagoas Medical | Produtos Hospitalares em Maceió",
    description:
      "Materiais hospitalares com excelência e suporte técnico. Maceió · Alagoas · desde 2018.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alagoas Medical | Produtos Hospitalares em Maceió",
    description:
      "Materiais hospitalares com excelência e suporte técnico. Maceió · Alagoas · desde 2018.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
          >
            Pular para o conteúdo
          </a>
          {children}
          <FloatingWidgets />
        </ThemeProvider>
      </body>
    </html>
  );
}
