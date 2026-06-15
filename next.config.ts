import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático — exportado para a Vercel.
  output: "export",
  // Image Optimization API não existe em export estático: servir as imagens como estão.
  images: { unoptimized: true },
  // Headers de segurança NÃO funcionam com output: 'export' (Next ignora async headers()).
  // Eles são aplicados pela Vercel via vercel.json na raiz do projeto.
};

export default nextConfig;
