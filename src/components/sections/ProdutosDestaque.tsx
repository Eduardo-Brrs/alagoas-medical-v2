import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { PRODUTOS, type Produto } from "@/lib/constants";

export default function ProdutosDestaque() {
  return (
    <section id="produto" className="bg-surface py-[72px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeader
          label="Produtos"
          title="Produtos em Destaque"
          subtitle="Tecnologias de referência no cuidado de feridas complexas e no Home Care"
          className="mb-10 max-w-2xl"
        />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUTOS.map((produto, i) => (
            <li key={produto.placeholder ? `placeholder-${i}` : produto.nome}>
              <ProdutoCard produto={produto} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProdutoCard({ produto }: { produto: Produto }) {
  if (produto.placeholder) {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-dashed border-border bg-card">
        <div className="flex h-56 items-center justify-center bg-surface">
          <div className="flex flex-col items-center gap-2 text-muted">
            <PlusIcon />
            <span className="text-xs">Em breve</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="text-xl font-medium text-muted">{produto.nome}</h3>
          <p className="mt-1.5 text-sm text-muted">{produto.descricao}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-[0_4px_20px_rgba(13,60,110,0.08)]">
      {/* Imagem */}
      <div className="relative flex h-56 items-center justify-center bg-white p-6">
        {produto.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-sm bg-brand-red-strong px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-wider text-white">
            {produto.badge}
          </span>
        )}
        {produto.imagem && (
          <Image
            src={produto.imagem}
            alt={`${produto.nome}${produto.marca ? ` — ${produto.marca}` : ""}`}
            width={300}
            height={200}
            className="max-h-44 w-auto object-contain"
          />
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-7">
        {produto.logoMarca && (
          <span className="mb-3 inline-flex w-fit items-center rounded-md bg-white px-2.5 py-1 ring-1 ring-border">
            <Image
              src={produto.logoMarca}
              alt={produto.marca ?? ""}
              width={84}
              height={23}
              className="h-5 w-auto object-contain"
            />
          </span>
        )}
        <h3 className="text-xl font-medium text-brand-blue dark:text-foreground">
          {produto.nome}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
          {produto.descricao}
        </p>
        <div className="mt-5">
          <Button
            href={produto.linkWhatsapp}
            variant="primary"
            size="sm"
            external
          >
            Solicitar pelo WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="opacity-40"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
