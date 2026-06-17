# Alagoas Medical — Site v2

Briefing completo para reconstrução do site institucional da Alagoas Medical.
Leia este arquivo inteiro antes de qualquer ação.

> O restante deste arquivo é o **briefing original** (spec de intenção). A seção
> abaixo registra o **estado real da implementação** e tem precedência onde divergir.

---

## ⏱️ Estado atual de execução (atualizado em 2026-06-16)

**Bloco 6 — SEO ✅ e GA+consentimento ✅ (código pronto). Falta deploy.**
Site completo de ponta a ponta (todas as seções buildando com `output: export`).
Os 3 cards de Produtos agora são produtos reais (ver "Decisões de conteúdo").

**Próximo passo combinado:** **deploy na Vercel** + migração de domínio (ver "Deploy
e domínio" abaixo). Bloco 6 inteiro fechado, inclusive o GA (ID já recebido).

### Google Analytics + consentimento — feito (2026-06-16)
GA4 carregado **só após "Aceitar"** no banner (LGPD). **ID recebido: `G-RFPJT3PMKR`.**
> ⚠️ O `.env.local` é gitignored (não sincroniza). **No outro PC**, recrie um
> `.env.local` com `NEXT_PUBLIC_GA_ID=G-RFPJT3PMKR` (ou copie do `.env.example`).
> **Na Vercel**, defina essa mesma var nas Environment Variables antes do deploy.
- `src/lib/gtag.ts`: lê `NEXT_PUBLIC_GA_ID` (embutido no build). Sem ID = no-op total.
  `loadGoogleAnalytics()` injeta o gtag.js de forma idempotente.
- `FloatingWidgets.tsx`: chama `loadGoogleAnalytics()` no "Aceitar" e no mount se o
  visitante já tinha aceitado (`localStorage cookie_consent === "accepted"`). "Recusar"
  nunca carrega nada.
- **CSP em `vercel.json`** já libera `googletagmanager.com` (script/connect) +
  `*.google-analytics.com`/`*.analytics.google.com` (connect/img). Inofensivo sem ID.
- **`.env.example`** (destravado no `.gitignore` com `!.env.example`) documenta a var.
  Definir `NEXT_PUBLIC_GA_ID` em `.env.local` (local) e nas Env Vars da Vercel (prod).

### Deploy e domínio (decidido com o cliente, 2026-06-16)
- **Hospedagem → Vercel (grátis).** O projeto já está pronto pra Vercel (`output: export`
  + `vercel.json`). Deploy via GitHub (cliente/Eduardo têm conta) = publica a cada push.
- **Domínio = `alagoasmedical.com.br`** (confirmado). Registrado/gerenciado na **UOL**;
  DNS hoje aponta pra UOL; **MX já migrados pro Google Workspace** (e-mail profissional).
- **"Domínio Google" NÃO é opção:** Google Domains foi descontinuado (vendido à
  Squarespace, 2023–24) E `.com.br` só existe no Registro.br. A economia vem de
  **cancelar a HOSPEDAGEM UOL** (cara) e ir pra Vercel grátis — o domínio fica.
- **Plano de migração (sem derrubar e-mail):** manter o DNS na UOL e editar **só** o
  registro do site (A/CNAME que aponta pro site v1) pra apontar pra Vercel. **Os MX do
  Google NÃO se tocam.** Depois cancelar só a hospedagem UOL (Opção A); se a UOL
  dificultar manter domínio-só, transferir o `.com.br` pro Registro.br (Opção B).
- **Ao publicar:** trocar o placeholder `SITE_URL` em `constants.ts` se o domínio final
  divergir, e setar `NEXT_PUBLIC_GA_ID` nas Env Vars da Vercel.

### SEO — feito (2026-06-16)
Criados `app/sitemap.ts`, `app/robots.ts` e `app/opengraph-image.tsx`. Build emite
`out/sitemap.xml`, `out/robots.txt` e `out/opengraph-image` (PNG 1200×630 válido).
- **`SITE_URL` centralizada em `constants.ts`** (era hardcoded no `layout.tsx`) — é
  o único lugar pra trocar o domínio quando confirmado. Ainda placeholder
  `https://alagoasmedical.com.br`.
- ⚠️ **Next 16 + `output: export` exige `export const dynamic = "force-static"`** em
  TODAS as três rotas de metadata (sitemap/robots/opengraph-image) — sem isso o build
  falha em "Collecting page data". A `opengraph-image.tsx` NÃO usa `runtime = 'edge'`
  (incompatível com export); no runtime nodejs a imagem é gerada no build.

### Revisão final (Lighthouse, 2026-06-16)
Build e `npm run lint` limpos. Scores (build estático servido localmente):
**Accessibility 100 · Best Practices 100 · SEO 100 · Performance 98 (desktop)**.
Performance mobile = 81 no preset throttled (4×CPU/4G) — limitada pela falta de
otimização de imagem inerente ao `output: export`; em desktop/CDN é ~98.
- **Lint:** o padrão "mounted gate" (setState em useEffect) reprovava no React 19.
  Trocado por `useSyncExternalStore` via `src/lib/useHydrated.ts` (DarkModeToggle +
  FloatingWidgets).
- **Acessibilidade (WCAG AA):** corrigidos `aria-prohibited-attr` (role nas
  estrelas), `label-content-name-mismatch` (removido aria-label redundante do Logo
  e dos cards de Parceiros) e ~26 falhas de contraste.

### Tokens de cor acessíveis (decisão do cliente, 2026-06-16)
O vermelho de marca `#ee3135` reprovava contraste como texto/fill (4.09 com branco)
e o verde WhatsApp `#25D366` (1.98). Cliente aprovou ajustar para passar AA, mas
**mantendo o vermelho o mais vivo possível** (1ª calibração ficou muito escura/rosada
e "matou" a identidade vermelha — recalibrada). Tokens em `globals.css` (`@theme`):
- `--color-brand-red-strong: #d62c30` → fills (botões/badge/cookie/skip-link) +
  texto vermelho em fundo CLARO (eyebrows, cargo da fundadora, "Conhecer").
  4.93:1 com branco / 4.67:1 na superfície cinza.
- `--color-brand-red-strong-hover: #b8252a` → hover dos fills.
- `--color-whatsapp: #075e54` / `--color-whatsapp-hover: #054b43` → verde escuro
  oficial do WhatsApp, texto branco (7.67:1). Usado em Button `whatsapp` e no float.
- `#ee3135` (`brand-red`) fica reservado a usos **decorativos/ícones** (ponto do
  logo, painel do hero, borda dos cards, estrelas) — regra 3:1 não-texto, que passa.

**Regra do vermelho em fundo ESCURO (azul):** NÃO se usa vermelho em TEXTO sobre o
azul — para passar contraste o vermelho teria que clarear (vira salmão), e misturar
salmão com o vermelho forte do botão ficava visualmente embaralhado (decisão cliente,
2026-06-16). Então, sobre fundo azul: o vermelho vivo aparece **só no botão** (fill);
as eyebrows (`SectionLabel onDark`) viram `text-white/70` e a palavra de destaque do
hero ("excelência") + os acentos das stats ficam **brancos**. Tokens salmão
(`brand-red-accent`, `brand-red-light`) foram removidos — não há mais texto vermelho
sobre escuro no site.

> ⚠️ **Tailwind v4 + dev server:** ao editar tokens `@theme` no `globals.css` com o
> `npm run dev` rodando, as classes de cor NOVAS podem não regenerar (saem vazias →
> botões/textos "somem" no claro). **Reinicie o `npm run dev`** após mexer no `@theme`.

> ⚠️ **Git no Windows/PowerShell:** (1) NÃO use aspas duplas DENTRO da mensagem do
> `git commit -m "..."` — uma `"` interna fecha a string e o git trata o resto como
> arquivos (`error: pathspec ... did not match`). Use aspas simples ou nenhuma. (2) O
> PowerShell 5.1 não aceita `&&` para encadear comandos — rode `git add`, `git commit`,
> `git push` em linhas separadas (ou separe com `;`).

### Navbar
Adicionado link **Contato** (`#contato`) entre Sobre e Avaliações, para a seção não
ficar órfã. Ordem: Parceiros · Produtos · Sobre · Contato · Avaliações + botão CTA.

### Stack real (difere do briefing)
- **Next 16 + React 19 + Tailwind CSS v4** (o briefing assumia Tailwind v3).
- **Sem `tailwind.config.ts`**: paleta definida como tokens `@theme` em `src/app/globals.css`.
  - Cores de marca (fixas): `brand-blue`, `brand-blue-mid`, `brand-blue-footer`, `brand-blue-light`, `brand-red`, `brand-red-hover`.
  - Cores semânticas (trocam no dark via `.dark`): `background`, `card`, `surface`, `foreground`, `muted`, `border`. Dark mode = classe (`next-themes`, `@custom-variant dark`).
- **Headers de segurança em `vercel.json`** (NÃO em `next.config.ts` — `headers()` é ignorado em `output: export`). `next.config.ts` = `output: 'export'` + `images.unoptimized`.
- **Fontes em `rem`** (passe de acessibilidade WCAG 1.4.4); piso de micro-texto = 11px.

### Decisões de conteúdo/design (cliente + mockup)
- **`mockup-referencia.html`** na raiz é a referência visual (não vai pro deploy; export só serve `public/` + app).
- **Navbar:** Parceiros · Produtos (`#produto`) · Sobre · Contato · Avaliações (sem "Início"; "Contato" adicionado em 2026-06-16).
- **Hero stats:** `7+ anos` · `Home Care / & linha hospitalar` · `100% suporte` (o "3 marcas" foi removido a pedido do cliente).
- **Parceiros:** logos grandes em chip branco + hover animado (estilo `featured-block` do v1). Logo da Flen é PNG paleta com **fundo branco** → sempre precisa de chip claro atrás.
- **Produtos em Destaque:** **grade de cards** via `PRODUTOS[]` em `constants.ts` —
  intercambiável: **adicionar produto = adicionar um objeto no array** (o `ProdutoCard`
  já é acessível, herda alt/contraste/botão). Hoje **3 produtos reais, sem badge** (a
  seção inteira já é "em destaque", então o badge "Em destaque" foi removido):
  - **Flaminal** (Flen Health) — copy curta do cliente já aplicada.
  - **Solução com PHMB + EDTA** e **Creme Barreira** (Curatec) — copy ainda
    **provisória** (confirmar com texto oficial do fabricante).
  - **Convenção de título:** nome do produto **sem o tamanho**; o tamanho vai na
    `descricao` (ex.: "Frasco de 350 ml", "Disponível em 60 g e 100 g (foto: 100 g)").
  - **Imagens:** salvar com nome **web-safe** kebab-case ASCII (sem espaço, `+`,
    acento ou maiúscula) — senão quebram em `output: export` + `next/image`.
- **Sobre:** foto do evento (`alagoas-medical-foto.jpeg`) **removida** (era com pessoal da Urgo, marca que saiu). Seção é coluna única agora; card da fundadora (Cleocina) mantido.
- **Contato:** card de Home Care usa **dois botões** (Cleocina + Mariana) em vez do dropdown.
- **`FloatingWidgets`** coordena o botão flutuante do WhatsApp + o `CookieBanner`: enquanto o banner está aberto, o float fica oculto (evita sobreposição no "Aceitar").

### Pendências (Bloco 6)
- ~~`app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`~~ ✅ feito (2026-06-16) — ver "SEO — feito" no topo.
- ~~**Google Analytics** + ativar o consentimento do CookieBanner~~ ✅ feito (2026-06-16) — código pronto, falta só o `NEXT_PUBLIC_GA_ID` real do cliente. Ver "Google Analytics + consentimento" no topo.
- ~~Revisão final: Lighthouse (>90), acessibilidade, dark mode, mobile.~~ ✅ feito
  (2026-06-16) — ver seção "Revisão final" acima. Falta só reconfirmar em mobile real
  após o deploy (o 81 é do preset throttled).
- **Domínio real não confirmado** — `alagoasmedical.com.br` é placeholder em `metadata`/sitemap/robots.
- Assets/copy aguardando cliente: **copy oficial da Curatec** (Solução + Creme Barreira — hoje provisória), indicações detalhadas do Flaminal se quiserem, e (ideal) logo da Flen em SVG/PNG transparente. O cliente ainda vai fazer escolhas de design e **adicionar mais produtos** na aba Produtos (ver convenção em "Produtos em Destaque").

### Segurança (revisão feita em 2026-06-15)
Site estático, sem back-end → SQL injection, CSRF, auth e vazamento de env **não se aplicam**.
Verificado: todo `target="_blank"` tem `rel="noopener noreferrer"`; sem `dangerouslySetInnerHTML`/`eval`/`http://`; React escapa o conteúdo. Headers + CSP em `vercel.json`. `npm audit` não rodou (erro de certificado/proxy local — reexecutar fora desse ambiente).

---

## Contexto do projeto

Refatoração completa (do zero) do site institucional da Alagoas Medical,
empresa de distribuição de materiais hospitalares sediada em Maceió - AL.

O v1 era Bootstrap + jQuery + CSS espaguete baseado em template de ONG.
O v2 é um site próprio, limpo, escalável e com identidade visual da empresa.

**Repositório de referência do v1:** github.com/Eduardo-Brrs (não reutilizar código, apenas consultar conteúdo)

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Estilização:** Tailwind CSS
- **Deploy:** Vercel (exportação estática `output: 'export'`)
- **DNS:** domínio Google apontado para Vercel
- **Sem back-end** por ora — site 100% estático

> Futuro: estrutura preparada para receber API Routes + Prisma + PostgreSQL
> quando o cliente quiser evoluir para marketplace/loja online.

---

## Identidade visual

### Paleta de cores

```
Azul principal:    #0d3c6e   (navbar, hero, seção contato, footer)
Azul médio:        #1a5fa0   (gradientes, hover states)
Azul claro:        #f0f5fb   (backgrounds de ícones, superfícies sutis)
Azul footer:       #07243f   (footer escuro)

Vermelho acento:   #ee3135   (CTAs, destaques, bordas, eyebrows, ícones ativos)
Vermelho hover:    #c9282c   (hover nos botões vermelhos)

Branco:            #ffffff
Cinza superfície:  #f7f9fc   (seção sobre, backgrounds alternados)
Cinza borda:       #e8e8e8
Cinza texto:       #555555
Cinza muted:       #888888
```

### Tipografia

- **Font:** Inter (Google Fonts) — sem-serif limpa e médica
- Headings: `font-weight: 500`, `letter-spacing: -0.02em`
- Body: `font-weight: 400`, `line-height: 1.7`
- Eyebrows (labels de seção): `font-size: 10px`, `font-weight: 500`,
  `letter-spacing: 0.1em`, `text-transform: uppercase`, `color: #ee3135`

### Referências de design

Sites que inspiraram o visual (consultar para decisões de layout):
- **Corza Medical** — corza.com (hero bold, azul escuro, stats lateral)
- **Smith+Nephew** — smith-nephew.com (espaço branco, tipografia premium)

---

## Modo escuro (dark mode)

Implementar dark mode via `next-themes` + Tailwind `darkMode: 'class'`.

Mapeamento de cores no dark mode:

```
Backgrounds brancos    → #0f1117 (página) / #1a1f2e (cards)
Superfície cinza       → #1a1f2e
Texto primário         → #f0f4f8
Texto muted            → #8a9ab0
Bordas                 → #2a3547
Azul principal         → manter #0d3c6e (já é escuro, funciona bem)
Vermelho acento        → #ee3135 (manter igual)
Hero/navbar/contato    → manter fundo azul escuro (já funciona em dark)
Footer                 → manter #07243f
```

Toggle de dark mode no canto da navbar (ícone sol/lua).

---

## Acessibilidade — WCAG 2.2 AA

Requisitos obrigatórios:

- **Contraste mínimo:** 4.5:1 para texto normal, 3:1 para texto grande — validar todas as combinações de cor
- **Focus visível:** outline customizado em todos os elementos interativos (`focus-visible:ring-2 focus-visible:ring-red-500`)
- **Navegação por teclado:** ordem de tab lógica, skip-to-content link no topo
- **Semântica HTML:** usar `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` corretamente
- **ARIA:** `aria-label` em todos os ícones standalone, `aria-current="page"` no item ativo do menu
- **Imagens:** `alt` descritivo em todas as imagens reais; `alt=""` em decorativas
- **Botões WhatsApp:** não usar só cor para distinguir — incluir texto + ícone
- **Motion:** respeitar `prefers-reduced-motion` nas animações
- **Lang:** `<html lang="pt-BR">`

---

## Responsividade

Mobile-first. Breakpoints Tailwind padrão:

| Breakpoint | Largura   | Comportamento                                      |
|------------|-----------|----------------------------------------------------|
| base       | < 640px   | Stack vertical, padding reduzido, fonte menor      |
| sm         | 640px+    | Pequenos ajustes                                   |
| md         | 768px+    | Dois cards lado a lado onde cabem                  |
| lg         | 1024px+   | Layout completo conforme mockup                    |
| xl         | 1280px+   | Max-width container, espaçamento aumentado         |

Navbar mobile: hamburger menu com drawer lateral ou dropdown.
Hero mobile: stats viram row horizontal abaixo do texto (não lateral).

---

## Estrutura de seções (ordem no site)

### 1. Navbar
- Logo (ponto vermelho + "Alagoas Medical" + subtítulo "Produtos Hospitalares")
- Links: Início · Sobre · Parceiros · Produtos · Avaliações
- CTA botão vermelho: "Falar com vendas" → ancora em #contato
- Toggle dark mode
- Mobile: hamburger

### 2. Hero
- Eyebrow: "Maceió · Alagoas · desde 2018"
- Título grande: "Materiais hospitalares com excelência e suporte técnico"
- Subtítulo descritivo
- Dois CTAs: "Falar com vendas" (vermelho) + "Conhecer a empresa" (ghost)
- Bloco de stats lateral (desktop) / abaixo (mobile):
  - 7+ anos de experiência
  - 3 marcas parceiras
  - Sempre suporte técnico
- Background: azul escuro #0d3c6e com shape geométrico vermelho sutil

### 3. Parceiros
- Label: "Parceiros"
- Título: "Marcas que representamos"
- Subtítulo: "Trabalhamos com as melhores marcas do mercado"
- 3 cards: Carilex Medical + Curatec + Flen Health — **Urgo foi removida, não incluir**
- Cada card: logo da marca + nome + descrição + badge "Parceiro"
- Links externos para os sites das marcas:
  - Carilex: `https://www.carilexmedical.com/`
  - Curatec: `https://www.curatec.com.br/`
  - Flen Health: `https://www.flenhealth.com/`
- Logo Flen Health: `/public/images/flenhealth-logo.png` (PLACEHOLDER — cliente enviará)

### 4. Produto em Destaque
- Label: "Produto em Destaque"
- Título: "Flaminal"
- Background: branco com superfície cinza `#f7f9fc`
- Layout duas colunas (desktop): imagem do produto à esquerda + conteúdo à direita
- Layout empilhado (mobile): imagem acima, conteúdo abaixo
- Imagem do produto: `/public/images/flaminal-produto.png` (PLACEHOLDER — cliente enviará)
- Badge vermelho #ee3135: "Em destaque"
- Marca: Flen Health — exibir logo pequena inline abaixo do título
- Descrição: PLACEHOLDER — aguardando texto do cliente
- Lista de indicações de uso: PLACEHOLDER — aguardando cliente (ícone check vermelho em cada item)
- CTA: botão vermelho "Solicitar pelo WhatsApp" → `LINKS.whatsappVendas`
- **Componente intercambiável:** todos os dados vêm de `PRODUTO_DESTAQUE` em `constants.ts`
  para que trocar o produto destacado no futuro seja só editar o arquivo, sem tocar no componente

### 5. Sobre
- Label: "Sobre"
- Título: "Alagoas Medical"
- Background cinza suave #f7f9fc
- Texto institucional (desde 2018, feridas complexas, Home Care, ética)
- Checklist com 3 itens (ícone check vermelho)
- Card da fundadora: foto (`images/proprietaria.jpeg`) + nome Cleocina Barros + cargo + bio
- Foto do evento (`images/alagoas-medical-foto.jpeg`) com legenda

### 6. Contato
- Label: "Contato"
- Título: "Fale com a nossa equipe"
- Background azul escuro #0d3c6e
- 2 cards brancos translúcidos:
  - **Vendas e produtos:** link WhatsApp `https://wa.me/message/PRTC3KC2G4JCD1`
  - **Curativos e Home Care:** dropdown com Cleocina `https://wa.me/558299245371`
    e Mariana `https://wa.me/558296777171`

### 7. Avaliações
- Label: "Avaliações"
- Título: "O que dizem sobre nós"
- 4 depoimentos em cards (não carousel — acessibilidade):
  1. Ana Carolina Beltrão Peixoto
  2. Meiga Menina Theotonio
  3. Tatiana Michaello
  4. Aline Viana
- Textos completos disponíveis no v1 (index.html do repositório)

### 8. Footer
- Logo texto (ponto vermelho + nome)
- Endereço: R. Srg. Nelmont, 76b - Gruta de Lourdes, Maceió - AL, 57052-815
- Telefone: (82) 3024-7070 → link `https://wa.me/558230247070`
- Email: alagoasmedical@gmail.com
- CNPJ: 30.788.967/0001-40
- Redes sociais: WhatsApp · Instagram (`https://instagram.com/alagoasmedical`) · Facebook (`https://facebook.com/alagoasmedical`)
- Copyright: © 2025 Alagoas Medical · Todos os direitos reservados
- Background: #07243f

---

## Assets disponíveis

Todos em `/public/images/` (copiar do v1):

| Arquivo                      | Uso                                           |
|------------------------------|-----------------------------------------------|
| `logo-empresa.png`           | Logo na navbar                                |
| `logo-empresa-footer.jpg`    | Logo no footer (alternativa)                  |
| `proprietaria.jpeg`          | Foto da fundadora Cleocina                    |
| `alagoas-medical-foto.jpeg`  | Foto do evento (seção sobre)                  |
| `carilex-logo.png`           | Card do parceiro Carilex                      |
| `curatec-logo.jpg`           | Card do parceiro Curatec                      |
| `flenhealth-logo.png`        | Card do parceiro Flen Health (PLACEHOLDER)    |
| `flaminal-produto.png`       | Seção produto em destaque (PLACEHOLDER)       |
| `favicon.ico`                | Favicon                                       |

> `urgo-logo.png` — NÃO incluir. Urgo foi removida do site.
> Arquivos marcados como PLACEHOLDER serão enviados pelo cliente.

---

## SEO

- `<title>`: "Alagoas Medical | Produtos Hospitalares em Maceió"
- `<meta name="description">`: "A Alagoas Medical oferece produtos hospitalares de qualidade para clínicas, hospitais e pacientes em Maceió. Atendimento especializado e entrega rápida."
- Open Graph tags para compartilhamento social
- `sitemap.xml` e `robots.txt` gerados na build

---

## Performance

- Imagens: usar `next/image` com `width`, `height` e `priority` no hero
- Fontes: `next/font/google` com `display: 'swap'`
- Sem jQuery, sem Bootstrap, sem libs desnecessárias
- Bundle deve passar no Lighthouse com score > 90 em todas as categorias

---

## Estrutura de pastas

Seguir essa organização obrigatoriamente — não improvisar:

```
src/
├── app/
│   ├── layout.tsx          # RootLayout com Providers, fonte, metadata
│   ├── page.tsx            # Página principal (importa as sections)
│   ├── sitemap.ts          # Geração do sitemap.xml
│   ├── robots.ts           # Geração do robots.txt
│   └── opengraph-image.tsx # Geração da og:image via next/og
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Parceiros.tsx
│   │   ├── ProdutoDestaque.tsx
│   │   ├── Sobre.tsx
│   │   ├── Contato.tsx
│   │   ├── Avaliacoes.tsx
│   │   └── WhatsAppFloat.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── SectionLabel.tsx  # eyebrow vermelho uppercase
│       └── DarkModeToggle.tsx
├── lib/
│   └── constants.ts        # links WhatsApp, endereço, redes sociais, produto destaque
└── styles/
    └── globals.css         # apenas reset e variáveis base — resto é Tailwind
```

### `lib/constants.ts` — centralizar todos os dados da empresa aqui

```ts
export const EMPRESA = {
  nome: 'Alagoas Medical',
  slogan: 'Produtos Hospitalares',
  cnpj: '30.788.967/0001-40',
  email: 'alagoasmedical@gmail.com',
  telefone: '(82) 3024-7070',
  endereco: 'R. Srg. Nelmont, 76b - Gruta de Lourdes, Maceió - AL, 57052-815',
  fundacao: '2018',
}

export const LINKS = {
  whatsappVendas: 'https://wa.me/message/PRTC3KC2G4JCD1',
  whatsappCleocina: 'https://wa.me/558299245371',
  whatsappMariana: 'https://wa.me/558296777171',
  whatsappTelefone: 'https://wa.me/558230247070',
  instagram: 'https://instagram.com/alagoasmedical',
  facebook: 'https://facebook.com/alagoasmedical',
  mapas: 'https://maps.app.goo.gl/fzEaUimbvkdFTwAn9',
  carilex: 'https://www.carilexmedical.com/',
  curatec: 'https://www.curatec.com.br/',
  flenHealth: 'https://www.flenhealth.com/',
}

export const PRODUTO_DESTAQUE = {
  nome: 'Flaminal',
  marca: 'Flen Health',
  badge: 'Em destaque',
  descricao: 'PLACEHOLDER — aguardando texto do cliente.',
  indicacoes: [
    'PLACEHOLDER indicação 1',
    'PLACEHOLDER indicação 2',
    'PLACEHOLDER indicação 3',
  ],
  imagem: '/images/flaminal-produto.png',
  logoMarca: '/images/flenhealth-logo.png',
  linkWhatsapp: 'https://wa.me/message/PRTC3KC2G4JCD1',
}
```

> Nunca hardcodar esses valores diretamente nos componentes — sempre importar de constants.ts.

---

## Sitemap e Robots

### `app/sitemap.ts`

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://alagoasmedical.com.br',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

### `app/robots.ts`

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://alagoasmedical.com.br/sitemap.xml',
  }
}
```

> Substituir o domínio quando o cliente confirmar a URL final.

---

## Open Graph Image

### `app/opengraph-image.tsx`

Gerar via `next/og` — aparece quando o link for compartilhado no WhatsApp,
Instagram, LinkedIn, etc.

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Alagoas Medical — Produtos Hospitalares em Maceió'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d3c6e',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ee3135' }} />
          <span style={{ color: '#ffffff', fontSize: '28px', fontWeight: 500 }}>Alagoas Medical</span>
        </div>
        <div style={{ color: '#ffffff', fontSize: '52px', fontWeight: 600, lineHeight: 1.2, marginBottom: '24px' }}>
          Materiais hospitalares com excelência e suporte técnico
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px' }}>
          Maceió · Alagoas · desde 2018
        </div>
      </div>
    ),
    size
  )
}
```

---

## Google Analytics

Usar `next/script` com `strategy="afterInteractive"` para não bloquear render.

### `app/layout.tsx` — adicionar após `<body>`:

```tsx
import Script from 'next/script'

// dentro do RootLayout, após {children}:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

> Substituir `G-XXXXXXXXXX` pelo ID real quando o cliente criar a propriedade
> no Google Analytics 4. Até lá, deixar comentado no código.

> Se o cookie banner (LGPD) estiver ativo, só inicializar o Analytics após
> consentimento do usuário — ver seção LGPD abaixo.

---

## WhatsApp Flutuante

### `components/sections/WhatsAppFloat.tsx`

Botão fixo no canto inferior direito, visível em todas as seções.
Linka direto para o WhatsApp de vendas.

```tsx
'use client'
import Link from 'next/link'
import { LINKS } from '@/lib/constants'

export default function WhatsAppFloat() {
  return (
    <Link
      href={LINKS.whatsappVendas}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Alagoas Medical pelo WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2
        bg-[#25D366] text-white
        px-4 py-3 rounded-full
        shadow-lg
        hover:bg-[#1ebe5d] transition-colors
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]
      "
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.71-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.893 9.893 0 0 1-5.031-1.371l-.361-.214-3.733.97.999-3.62-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z"/>
      </svg>
      <span className="text-sm font-medium hidden sm:inline">Falar pelo WhatsApp</span>
    </Link>
  )
}
```

Adicionar `<WhatsAppFloat />` no `app/layout.tsx` dentro do `<body>`, após `{children}`.

---

## LGPD — Banner de Cookies

Implementar banner simples para quando Analytics estiver ativo.

### Comportamento:
- Aparece na primeira visita, fixo no rodapé da tela
- Dois botões: "Aceitar" e "Recusar"
- Salvar preferência em `localStorage` com chave `cookie_consent`
- Se "Aceitar": inicializar Google Analytics
- Se "Recusar": não carregar Analytics, banner some
- Não bloqueia uso do site — apenas informa

### `components/ui/CookieBanner.tsx`

```tsx
'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
    // inicializar Analytics aqui se necessário
  }

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="
        fixed bottom-0 left-0 right-0 z-40
        bg-[#07243f] border-t border-white/10
        px-6 py-4
        flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
      "
    >
      <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
        Usamos cookies para analisar o tráfego do site e melhorar sua experiência,
        em conformidade com a <strong className="text-white">LGPD</strong>.
      </p>
      <div className="flex gap-3 flex-shrink-0">
        <button
          onClick={handleDecline}
          className="text-white/50 text-sm hover:text-white transition-colors px-4 py-2"
        >
          Recusar
        </button>
        <button
          onClick={handleAccept}
          className="bg-[#ee3135] text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-[#c9282c] transition-colors focus-visible:ring-2 focus-visible:ring-[#ee3135] focus-visible:ring-offset-2"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
```

Adicionar `<CookieBanner />` no `app/layout.tsx` junto com `<WhatsAppFloat />`.

---

## Comandos úteis

```bash
# Iniciar projeto
npx create-next-app@latest alagoas-medical-v2 --typescript --tailwind --app --src-dir

# Instalar dependências extras
npm install next-themes

# Dev
npm run dev

# Build estático
npm run build

# Preview do build
npx serve out
```

---

## Segurança

### Headers HTTP — configurar em `next.config.ts` obrigatoriamente

```ts
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src 'self' fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
    ].join('; '),
  },
]

const nextConfig = {
  output: 'export',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
```

### Links externos

Todos os `<a target="_blank">` devem ter `rel="noopener noreferrer"`:
```tsx
<a href="https://..." target="_blank" rel="noopener noreferrer">
```

### Variáveis de ambiente

Não há segredos nesse projeto por ora. Se futuramente houver (ex: chave de API),
usar `.env.local` e nunca prefixar com `NEXT_PUBLIC_` variáveis sensíveis.

### O que NÃO é risco nesse projeto

- SQL injection — sem banco de dados
- CSRF — sem formulários com estado servidor
- Auth/session — sem sistema de login
- Vazamento de env — sem variáveis sensíveis

---

## Ordem de execução recomendada

Executar uma tarefa por vez, revisar no browser antes de avançar:

1. `create-next-app` + `tailwind.config.ts` com cores customizadas + `next.config.ts` com headers de segurança
2. `lib/constants.ts` com todos os dados da empresa
3. Navbar + DarkModeToggle
4. Hero
5. Parceiros (3 cards: Carilex + Curatec + Flen Health)
6. Produto em Destaque (Flaminal)
7. Sobre
8. Contato
9. Avaliações
10. WhatsAppFloat + CookieBanner
11. Footer
12. `sitemap.ts` + `robots.ts` + `opengraph-image.tsx`
13. Revisão final — acessibilidade, mobile, dark mode, Lighthouse

---

## O que NÃO fazer

- Não usar jQuery
- Não usar Bootstrap
- Não incluir a Urgo em nenhuma seção
- Não usar carousels para depoimentos (acessibilidade)
- Não hardcodar cores fora do tema Tailwind (`tailwind.config.ts`)
- Não hardcodar dados da empresa fora de `constants.ts`
- Não usar `<div>` onde existe elemento semântico adequado
- Não ignorar estados de foco (`:focus-visible`)
- Não criar arquivos CSS separados — tudo via Tailwind
