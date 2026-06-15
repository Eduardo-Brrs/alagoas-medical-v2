import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { HERO_STATS } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-blue text-white"
    >
      {/* Shape geométrico vermelho sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rotate-12 rounded-[4rem] bg-brand-red/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-brand-blue-mid/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16 lg:py-28">
        {/* Coluna de texto */}
        <div>
          <SectionLabel>Maceió · Alagoas · desde 2018</SectionLabel>
          <h1 className="mt-4 text-4xl font-medium leading-[1.1] sm:text-5xl lg:text-6xl">
            Materiais hospitalares com excelência e suporte técnico
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Distribuição de produtos hospitalares e soluções para o tratamento
            de feridas complexas, com atendimento especializado para clínicas,
            hospitais e Home Care.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contato" variant="primary">
              Falar com vendas
            </Button>
            <Button href="#sobre" variant="ghostLight">
              Conhecer a empresa
            </Button>
          </div>
        </div>

        {/* Bloco de stats — lateral no desktop, row abaixo no mobile */}
        <ul className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-white/10 lg:rounded-2xl lg:border lg:border-white/10 lg:bg-white/5">
          {HERO_STATS.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-6 lg:text-left"
            >
              <span className="block text-3xl font-semibold text-white lg:text-4xl">
                {stat.valor}
              </span>
              <span className="mt-1 block text-xs text-white/60 lg:text-sm">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
