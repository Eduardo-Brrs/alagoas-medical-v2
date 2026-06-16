import Link from "next/link";
import { EMPRESA } from "@/lib/constants";

/**
 * Wordmark da marca: ponto vermelho + nome + subtítulo.
 * - `navbar`: nome azul (claro) / branco (dark)
 * - `footer`: nome branco, sem subtítulo
 */
export default function Logo({
  variant = "navbar",
  href = "#inicio",
}: {
  variant?: "navbar" | "footer";
  href?: string;
}) {
  if (variant === "footer") {
    return (
      <Link
        href={href}
        className="flex items-center gap-2 rounded-sm"
        aria-label={EMPRESA.nome}
      >
        <span
          className="h-2 w-2 flex-shrink-0 rounded-full bg-brand-red"
          aria-hidden="true"
        />
        <span className="text-[0.9375rem] font-medium text-white">
          {EMPRESA.nome}
        </span>
      </Link>
    );
  }

  return (
    <Link href={href} className="flex items-center gap-2.5 rounded-sm">
      <span
        className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-red"
        aria-hidden="true"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-[0.9375rem] font-medium tracking-tight text-brand-blue dark:text-white">
          {EMPRESA.nome}
        </span>
        <span className="text-[0.6875rem] font-normal text-muted">
          {EMPRESA.slogan}
        </span>
      </span>
    </Link>
  );
}
