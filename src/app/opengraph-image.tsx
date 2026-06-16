import { ImageResponse } from "next/og";

/**
 * og:image gerada via next/og — aparece ao compartilhar o link no WhatsApp,
 * Instagram, LinkedIn etc. SEM `runtime = 'edge'`: o runtime edge é incompatível
 * com `output: export`; no runtime padrão (nodejs) a imagem é gerada no build.
 */
// Necessário com output: export — gera a imagem no build em vez de sob demanda.
export const dynamic = "force-static";

export const alt = "Alagoas Medical — Produtos Hospitalares em Maceió";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d3c6e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#ee3135",
            }}
          />
          <span style={{ color: "#ffffff", fontSize: "28px", fontWeight: 500 }}>
            Alagoas Medical
          </span>
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: "52px",
            fontWeight: 600,
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          Materiais hospitalares com excelência e suporte técnico
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "24px" }}>
          Maceió · Alagoas · desde 2018
        </div>
      </div>
    ),
    size,
  );
}
