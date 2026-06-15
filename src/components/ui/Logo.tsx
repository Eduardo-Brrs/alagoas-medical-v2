import Link from "next/link";
import { EMPRESA } from "@/lib/constants";

/**
 * Wordmark da marca: ponto vermelho + nome + subtítulo.
 * `variant` controla a cor do texto para fundos claros ou escuros.
 */
export default function Logo({
  variant = "dark",
  href = "#inicio",
}: {
  variant?: "dark" | "light";
  href?: string;
}) {
  const nameColor = variant === "light" ? "text-white" : "text-foreground";
  const subColor = variant === "light" ? "text-white/60" : "text-muted";

  return (
    <Link
      href={href}
      className="group flex items-center gap-2.5 rounded-sm"
      aria-label={`${EMPRESA.nome} — ${EMPRESA.slogan}`}
    >
      <span
        className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-red"
        aria-hidden="true"
      />
      <span className="flex flex-col leading-none">
        <span className={`text-base font-semibold tracking-tight ${nameColor}`}>
          {EMPRESA.nome}
        </span>
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.12em] ${subColor}`}
        >
          {EMPRESA.slogan}
        </span>
      </span>
    </Link>
  );
}
