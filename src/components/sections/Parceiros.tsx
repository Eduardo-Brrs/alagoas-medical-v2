import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { PARCEIROS, type Parceiro } from "@/lib/constants";

export default function Parceiros() {
  return (
    <section id="parceiros" className="py-[72px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeader
          label="Parceiros"
          title="Marcas que representamos"
          subtitle="Conheça alguns dos nossos principais parceiros no fornecimento de produtos hospitalares"
          className="mb-10 max-w-2xl"
        />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PARCEIROS.map((parceiro) => (
            <li key={parceiro.nome}>
              <ParceiroCard parceiro={parceiro} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ParceiroCard({ parceiro }: { parceiro: Parceiro }) {
  return (
    <a
      href={parceiro.site}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col items-center rounded-xl border border-border bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[0_1rem_3rem_rgba(13,60,110,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
    >
      {/* Chip branco para uniformizar logos (transparentes e com fundo branco) */}
      <div className="flex h-24 w-full items-center justify-center rounded-lg bg-white px-6">
        {parceiro.placeholder ? (
          <span className="text-2xl font-semibold tracking-tight text-brand-blue">
            {parceiro.nome}
          </span>
        ) : (
          <Image
            src={parceiro.logo}
            alt={`Logo ${parceiro.nome}`}
            width={180}
            height={64}
            className="max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <h3 className="mt-5 text-base font-medium text-brand-blue dark:text-foreground">
        {parceiro.nome}
      </h3>
      <p className="mt-1 text-xs text-muted">{parceiro.descricao}</p>

      <span className="mt-4 inline-flex items-center gap-1 text-[0.6875rem] font-medium text-brand-red-strong opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Conhecer
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
      <span className="sr-only">(abre o site em nova aba)</span>
    </a>
  );
}
