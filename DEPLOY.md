# Deploy — Alagoas Medical v2 (Vercel + domínio UOL)

Roteiro de publicação. Objetivo: subir o v2 na Vercel (grátis), apontar
`alagoasmedical.com.br` pra ela **sem derrubar o e-mail do Google Workspace**, e
depois cancelar só a hospedagem da UOL.

> Regra de ouro do DNS: **nunca trocar os nameservers** e **nunca tocar nos
> registros MX / TXT (SPF, DKIM, verificação Google)**. A gente edita só o
> registro do *site* (A / CNAME). Assim o e-mail continua intacto.

---

## Fase 1 — Publicar na Vercel (deploy de teste)

1. Acesse **vercel.com** → **Sign Up / Log In** → **Continue with GitHub** (use a
   conta `Eduardo-Brrs`).
2. **Add New… → Project** → **Import** o repositório `alagoas-medical-v2`.
3. Configurações do projeto (a Vercel detecta Next.js sozinha):
   - **Framework Preset:** Next.js (automático).
   - **Root Directory:** `./` (a raiz do repo já tem o `package.json`).
   - **Build / Output:** deixar o padrão (`next build`).
4. Abra **Environment Variables** e adicione, **antes de fazer o deploy**:
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: `G-RFPJT3PMKR`
   - Aplicar a **Production, Preview e Development** (todas).
5. Clique em **Deploy**. Em ~1–2 min sai um endereço tipo
   `alagoas-medical-v2.vercel.app`.

✅ **A partir daqui, todo `git push` na branch `main` redeploya sozinho.**

---

## Fase 2 — Testar no `.vercel.app` (antes de mexer no domínio)

Abra o endereço `.vercel.app` e confira:
- [ ] Todas as seções carregam; imagens aparecem.
- [ ] Dark mode liga/desliga.
- [ ] Links de WhatsApp / parceiros abrem.
- [ ] Banner de cookies aparece → clicar **Aceitar**.
- [ ] No **Google Analytics → Tempo real** aparece 1 usuário ativo (confirma o GA).
- [ ] Abrir `/sitemap.xml`, `/robots.txt` e `/opengraph-image` — todos respondem.

Se algo estiver errado, corrige no código, `git push`, e a Vercel reconstrói.

---

## Fase 3 — Apontar o domínio (mantendo o e-mail vivo)

### 3a. Adicionar o domínio na Vercel
1. No projeto: **Settings → Domains**.
2. Adicione `alagoasmedical.com.br` e também `www.alagoasmedical.com.br`.
3. A Vercel vai **mostrar os registros DNS exatos** que você precisa criar:
   - Domínio raiz (`@`) → um registro **A** com um IP (ex.: algo como `76.76.21.21`
     — **use EXATAMENTE o que a Vercel mostrar**, não copie IP de tutorial).
   - `www` → um registro **CNAME** apontando pra `cname.vercel-dns.com`.

### 3b. Editar o DNS no painel da UOL
1. Entre na **Área do Cliente UOL Host** → domínio `alagoasmedical.com.br` →
   **Zona DNS / Editor de DNS**.
2. Localize o registro **A** do raiz (`@`, hoje apontando pro IP da hospedagem UOL
   v1) e **troque o valor** pelo IP que a Vercel mostrou.
3. Crie/edite o **CNAME** do `www` → `cname.vercel-dns.com`.
4. **NÃO MEXER** em: registros **MX** (Google Workspace), **TXT** de SPF/DKIM, e
   qualquer TXT de verificação do Google. Deixar exatamente como estão.
5. Salvar. Propagação costuma levar de minutos a algumas horas (até 48h no pior caso).

### 3c. Confirmar
- Na Vercel, **Settings → Domains**, os domínios passam de "Invalid Configuration"
  para **válido** (✓) quando o DNS propaga.
- A Vercel emite o **HTTPS (SSL) automaticamente** — não precisa fazer nada.
- Acesse `https://alagoasmedical.com.br` → deve servir o **v2**.
- (Opcional) Definir o canônico: redirecionar `www` → raiz (ou vice-versa) em
  **Settings → Domains**.

---

## Fase 4 — Desligar a hospedagem antiga

1. Confirmado o v2 no ar em `alagoasmedical.com.br` **e** o e-mail funcionando
   (mande um teste pra/de uma conta `@alagoasmedical...`):
2. Na UOL, **cancelar SÓ o plano de hospedagem** — **manter o registro do domínio**.
   - Se a UOL só vender domínio+hospedagem em pacote e dificultar, a alternativa é
     transferir o `.com.br` pro **Registro.br** (mais barato, ~R$40/ano). Fazer isso
     **depois** que o site novo já estiver estável, e novamente sem tocar nos MX.

---

## Checklist relâmpago
- [ ] Repo importado na Vercel + env `NEXT_PUBLIC_GA_ID` setada
- [ ] Deploy de teste no `.vercel.app` aprovado (incl. GA no Tempo Real)
- [ ] Domínio adicionado na Vercel (raiz + www)
- [ ] A/CNAME editados na UOL · **MX/TXT intocados**
- [ ] HTTPS válido + v2 servindo em `alagoasmedical.com.br`
- [ ] E-mail testado e funcionando
- [ ] Hospedagem UOL cancelada (domínio mantido)
