import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import { SOBRE } from "@/lib/constants";

export default function Sobre() {
  return (
    <section id="sobre" className="bg-surface py-[72px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionLabel>Sobre</SectionLabel>

        <div className="mt-6 max-w-3xl">
          <h2 className="text-[28px] font-medium tracking-tight text-brand-blue dark:text-foreground">
            {SOBRE.titulo}
          </h2>
          <p className="mt-1.5 text-sm text-muted">{SOBRE.subtitulo}</p>

          <p className="mt-5 text-sm leading-relaxed text-foreground/80">
            {SOBRE.texto}
          </p>

          <ul className="mt-6 flex flex-col gap-2.5">
            {SOBRE.checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[13px] text-foreground/80"
              >
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>

          {/* Card da fundadora */}
          <div className="mt-8 flex items-start gap-4 border-t border-border pt-6">
            <Image
              src={SOBRE.fundadora.foto}
              alt={`Foto de ${SOBRE.fundadora.nome}`}
              width={56}
              height={56}
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-brand-red">
                {SOBRE.fundadora.cargo}
              </p>
              <p className="mt-0.5 text-[15px] font-medium text-brand-blue dark:text-foreground">
                {SOBRE.fundadora.nome}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {SOBRE.fundadora.bio}
              </p>
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
