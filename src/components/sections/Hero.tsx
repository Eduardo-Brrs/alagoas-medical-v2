import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { HERO_STATS } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-blue text-white"
    >
      {/* Painel vermelho angulado (decorativo) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 hidden w-[35%] bg-brand-red opacity-[0.07] [clip-path:polygon(20%_0%,100%_0%,100%_100%,0%_100%)] md:block"
      />

      <div className="relative mx-auto flex max-w-[1100px] flex-col px-6 md:flex-row md:items-stretch">
        {/* Conteúdo */}
        <div className="flex-1 pt-16 pb-10 md:py-[72px] md:pr-12">
          <SectionLabel onDark>Maceió · Alagoas · desde 2018</SectionLabel>
          <h1 className="mt-5 max-w-[500px] text-[2rem] font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-[2.375rem]">
            Materiais hospitalares com{" "}
            <span className="text-brand-red-light">excelência</span> e suporte
            técnico
          </h1>
          <p className="mt-4 max-w-[420px] text-[0.9375rem] leading-relaxed text-white/65">
            Distribuição de produtos de alta complexidade para clínicas,
            hospitais e atendimentos Home Care em Alagoas.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#contato" variant="primary">
              Falar com vendas
            </Button>
            <Button href="#sobre" variant="ghostLight">
              Conhecer a empresa
            </Button>
          </div>
        </div>

        {/* Stats — lista vertical no desktop, row no mobile */}
        <ul className="grid grid-cols-3 gap-4 pb-16 md:flex md:min-w-[220px] md:flex-col md:justify-center md:gap-0 md:border-l md:border-white/10 md:pb-0 md:pl-12">
          {HERO_STATS.map((stat) => (
            <li
              key={stat.label}
              className="md:border-b md:border-white/[0.08] md:py-5 md:last:border-b-0"
            >
              <span
                className={`block font-medium leading-tight tracking-tight ${
                  stat.num.length > 3
                    ? "text-xl md:text-2xl"
                    : "text-3xl md:text-4xl"
                }`}
              >
                {stat.num}
                {stat.accent && (
                  <span className="text-brand-red-light">{stat.accent}</span>
                )}
              </span>
              <span className="mt-1 block text-[0.6875rem] text-white/70">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
