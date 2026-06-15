import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { PRODUTO_DESTAQUE } from "@/lib/constants";

const p = PRODUTO_DESTAQUE;

export default function ProdutoDestaque() {
  return (
    <section id="produto" className="bg-surface py-[72px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionLabel>Produto em Destaque</SectionLabel>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Imagem */}
          <div className="relative flex min-h-[320px] items-center justify-center rounded-xl border border-border bg-card p-10">
            <span className="absolute left-4 top-4 rounded-sm bg-brand-red px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
              {p.badge}
            </span>
            {p.imagemPlaceholder ? (
              <div className="flex flex-col items-center gap-3 text-muted">
                <PillIcon />
                <span className="text-xs">Imagem em breve</span>
              </div>
            ) : (
              <Image
                src={p.imagem}
                alt={`${p.nome} — ${p.marca}`}
                width={360}
                height={360}
                className="max-h-72 w-auto object-contain"
              />
            )}
          </div>

          {/* Conteúdo */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              {p.logoMarcaPlaceholder ? (
                <span className="rounded bg-brand-blue-light px-2.5 py-1 text-[11px] font-medium text-brand-blue">
                  {p.marca}
                </span>
              ) : (
                <Image
                  src={p.logoMarca}
                  alt={p.marca}
                  width={80}
                  height={24}
                  className="h-6 w-auto object-contain"
                />
              )}
            </div>

            <h2 className="text-4xl font-medium tracking-tight text-brand-blue dark:text-foreground">
              {p.nome}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              {p.descricao}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {p.indicacoes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[13px] text-foreground/80"
                >
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href={p.linkWhatsapp} variant="primary" external>
                Solicitar pelo WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 text-brand-red"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="opacity-30"
      aria-hidden="true"
    >
      <path d="M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}
