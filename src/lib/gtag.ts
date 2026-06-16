/**
 * Google Analytics 4 — carregado SOMENTE após o consentimento do usuário (LGPD).
 *
 * O Measurement ID vem de `NEXT_PUBLIC_GA_ID` (ex.: "G-XXXXXXXXXX"), embutido no
 * build estático. Sem o ID definido, tudo aqui vira no-op — o site funciona normal
 * e nada de analytics é carregado. Defina o ID em `.env.local` (local) e nas
 * Environment Variables da Vercel (produção) quando o cliente criar a propriedade GA4.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let loaded = false;

/**
 * Injeta o gtag.js e inicializa o GA4. Idempotente (só carrega uma vez) e
 * no-op quando não há `GA_ID` ou quando roda fora do browser.
 * Chamar apenas após o usuário aceitar os cookies.
 */
export function loadGoogleAnalytics() {
  if (loaded || !GA_ID || typeof window === "undefined") return;
  loaded = true;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
}
