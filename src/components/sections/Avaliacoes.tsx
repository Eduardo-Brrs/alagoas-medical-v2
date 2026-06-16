import SectionHeader from "@/components/ui/SectionHeader";
import { DEPOIMENTOS, type Depoimento } from "@/lib/constants";

export default function Avaliacoes() {
  return (
    <section id="avaliacoes" className="py-[72px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeader
          label="Avaliações"
          title="O que dizem sobre nós"
          subtitle="Clientes reais, experiências reais"
          className="mb-10"
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEPOIMENTOS.map((depoimento) => (
            <li key={depoimento.nome}>
              <AvaliacaoCard depoimento={depoimento} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AvaliacaoCard({ depoimento }: { depoimento: Depoimento }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border border-l-[3px] border-l-brand-red bg-card p-5">
      <Stars />
      <span
        aria-hidden="true"
        className="font-serif text-3xl leading-none text-brand-red/40"
      >
        &ldquo;
      </span>
      <blockquote className="mt-1 flex-1 text-xs italic leading-relaxed text-foreground/80">
        {depoimento.texto}
      </blockquote>
      <figcaption className="mt-3.5 text-xs font-medium text-brand-blue dark:text-foreground">
        {depoimento.nome}
      </figcaption>
    </figure>
  );
}

function Stars() {
  return (
    <span
      role="img"
      className="mb-2 flex gap-0.5 text-brand-red"
      aria-label="5 de 5 estrelas"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}
