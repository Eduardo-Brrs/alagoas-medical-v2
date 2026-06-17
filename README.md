# Alagoas Medical — Corporate Website

A complete, ground-up rebuild of the institutional website for **Alagoas Medical**,
a hospital-supplies distributor based in Maceió, Brazil.

🔗 **Live:** [alagoasmedical.com.br](https://alagoasmedical.com.br)

---

## The story: v1 → v2

The original site (v1) was an NGO template patched together with **Bootstrap, jQuery
and spaghetti CSS** — slow, inaccessible, hard to maintain, and carrying none of the
company's own identity.

The v2 is a **clean, custom build from scratch**: a fast static site with the brand's
real visual identity, engineered to pass accessibility, performance and SEO audits —
and structured so the client can add products or evolve it into a store later without
touching the components.

| | v1 (before) | v2 (after) |
|--------|-------------|------------|
| Stack | Bootstrap + jQuery template | Next.js 16 · React 19 · Tailwind v4 |
| Identity | Generic NGO template | Custom brand design system |
| Accessibility | None | WCAG 2.2 AA (Lighthouse a11y **100**) |
| Performance | Heavy, render-blocking | Static export on CDN (Lighthouse **98**) |
| SEO | Minimal | sitemap · robots · Open Graph · structured metadata |
| Maintainability | Hardcoded everywhere | Data-driven, single source of truth |

> Delivered end to end with a focus on **speed of delivery and reliability** — shipped
> fast, but built to hold up: lint-clean, audited, and documented.

---

## ✨ Highlights

- **WCAG 2.2 AA accessibility** — keyboard navigation, skip-link, visible focus,
  semantic HTML, `prefers-reduced-motion`, validated contrast, and a brand palette
  recalibrated to pass AA while keeping the identity intact.
- **Performance** — static export served from a CDN. Lighthouse (desktop):
  **Performance 98 · Accessibility 100 · Best Practices 100 · SEO 100**.
- **Dark mode** — via `next-themes`, with semantic color tokens that swap per theme.
- **Full SEO** — `sitemap.xml`, `robots.txt` and an Open Graph image generated at build time.
- **LGPD compliant** — Google Analytics loads **only after consent** in the cookie banner.
- **Security** — strict HTTP headers and Content-Security-Policy via `vercel.json`.
- **Responsive** — mobile-first, adapting cleanly from phone to desktop.

---

## 🛠️ Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | Next.js 16 (App Router)             |
| UI           | React 19                            |
| Styling      | Tailwind CSS v4 (`@theme` tokens)   |
| Theming      | next-themes (class-based dark mode) |
| Deploy       | Vercel (`output: export` — static)  |
| Analytics    | Google Analytics 4 (consent-gated)  |

No back-end — a fully static site, structured to grow into API Routes + a database
(marketplace / store) when the client is ready.

---

## 🚀 Running locally

```bash
npm install
npm run dev     # http://localhost:3000
```

Other commands:

```bash
npm run build   # static build into /out
npm run lint    # ESLint
npx serve out   # preview the static build
```

### Environment variables

Create a `.env.local` (see `.env.example`):

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # optional — without it, Analytics stays off
```

---

## 📁 Structure

```
src/
├── app/                  # layout, page, sitemap, robots, opengraph-image
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, Partners, Products, About, Contact, Reviews
│   └── ui/               # Button, Card, SectionLabel, DarkModeToggle, CookieBanner
├── lib/                  # constants (company data), gtag, hooks
└── app/globals.css       # color tokens (@theme) and base styles
```

All company data (contacts, links, products) lives in `src/lib/constants.ts` —
adding a product is just adding an object to an array.

---

## 📝 Architecture notes

- **Tailwind v4** — palette defined as `@theme` tokens in `globals.css` (no `tailwind.config`):
  fixed brand colors + semantic colors that swap in dark mode.
- **`output: export`** — Next's `headers()` is ignored in static export, so security
  headers and the CSP live in `vercel.json`.
- **Metadata routes** (sitemap/robots/opengraph-image) require
  `export const dynamic = "force-static"` to build under static export.

---

## 📄 License

Built for Alagoas Medical. Code shared publicly as a portfolio reference.

---
---

<br>

# 🇧🇷 Versão em Português

# Alagoas Medical — Site Institucional

Reconstrução completa, do zero, do site institucional da **Alagoas Medical**,
distribuidora de materiais hospitalares sediada em Maceió (AL).

🔗 **Ao vivo:** [alagoasmedical.com.br](https://alagoasmedical.com.br)

---

## A história: v1 → v2

O site original (v1) era um template de ONG remendado com **Bootstrap, jQuery e
CSS espaguete** — lento, inacessível, difícil de manter e sem nenhuma identidade
própria da empresa.

O v2 é uma **reconstrução limpa e sob medida**: um site estático rápido, com a
identidade visual real da marca, projetado para passar em auditorias de
acessibilidade, performance e SEO — e estruturado para o cliente adicionar produtos
ou evoluir para uma loja no futuro sem tocar nos componentes.

| | v1 (antes) | v2 (depois) |
|--------|-------------|------------|
| Stack | Template Bootstrap + jQuery | Next.js 16 · React 19 · Tailwind v4 |
| Identidade | Template genérico de ONG | Design system próprio da marca |
| Acessibilidade | Nenhuma | WCAG 2.2 AA (Lighthouse a11y **100**) |
| Performance | Pesado, bloqueante | Export estático em CDN (Lighthouse **98**) |
| SEO | Mínimo | sitemap · robots · Open Graph · metadata |
| Manutenção | Tudo hardcoded | Orientado a dados, fonte única de verdade |

> Entregue de ponta a ponta com foco em **velocidade de entrega e confiabilidade** —
> rápido, mas feito para durar: lint limpo, auditado e documentado.

---

## ✨ Destaques

- **Acessibilidade WCAG 2.2 AA** — navegação por teclado, skip-link, foco visível,
  semântica HTML, `prefers-reduced-motion`, contraste validado e paleta de marca
  recalibrada para passar AA mantendo a identidade.
- **Performance** — export estático servido por CDN. Lighthouse (desktop):
  **Performance 98 · Acessibilidade 100 · Boas Práticas 100 · SEO 100**.
- **Dark mode** — via `next-themes`, com tokens de cor semânticos que trocam por tema.
- **SEO completo** — `sitemap.xml`, `robots.txt` e Open Graph image gerados no build.
- **LGPD** — Google Analytics carregado **somente após consentimento** no banner de cookies.
- **Segurança** — headers HTTP e Content-Security-Policy estritos via `vercel.json`.
- **Responsivo** — mobile-first, adaptando do celular ao desktop.

---

## 🛠️ Stack

| Camada       | Tecnologia                          |
|--------------|-------------------------------------|
| Framework    | Next.js 16 (App Router)             |
| UI           | React 19                            |
| Estilização  | Tailwind CSS v4 (tokens `@theme`)   |
| Tema         | next-themes (dark mode por classe)  |
| Deploy       | Vercel (`output: export` — estático)|
| Analytics    | Google Analytics 4 (com consent)    |

Sem back-end — site 100% estático, estruturado para crescer com API Routes + banco
de dados (marketplace / loja) quando o cliente quiser.

---

## 🚀 Rodando localmente

```bash
npm install
npm run dev     # http://localhost:3000
```

Outros comandos:

```bash
npm run build   # build estático em /out
npm run lint    # ESLint
npx serve out   # preview do build estático
```

### Variáveis de ambiente

Crie um `.env.local` (veja `.env.example`):

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # opcional — sem ele, o Analytics fica desligado
```

---

## 📁 Estrutura

```
src/
├── app/                  # layout, página, sitemap, robots, opengraph-image
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, Parceiros, Produtos, Sobre, Contato, Avaliações
│   └── ui/               # Button, Card, SectionLabel, DarkModeToggle, CookieBanner
├── lib/                  # constants (dados da empresa), gtag, hooks
└── app/globals.css       # tokens de cor (@theme) e estilos base
```

Todos os dados da empresa (contatos, links, produtos) ficam em `src/lib/constants.ts` —
adicionar um produto é só adicionar um objeto no array.

---

## 📝 Notas de arquitetura

- **Tailwind v4** — paleta definida como tokens `@theme` em `globals.css` (sem
  `tailwind.config`): cores de marca fixas + cores semânticas que trocam no dark mode.
- **`output: export`** — o `headers()` do Next é ignorado em export estático, então os
  headers de segurança e a CSP ficam em `vercel.json`.
- **Rotas de metadata** (sitemap/robots/opengraph-image) exigem
  `export const dynamic = "force-static"` para buildar com export estático.

---

## 📄 Licença

Desenvolvido para a Alagoas Medical. Código público como referência de portfólio.
