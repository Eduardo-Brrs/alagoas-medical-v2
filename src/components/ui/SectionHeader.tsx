import SectionLabel from "@/components/ui/SectionLabel";

/**
 * Cabeçalho padrão de seção: eyebrow vermelho + título + subtítulo opcional.
 * `onDark` ajusta as cores do texto para fundos escuros (ex.: Contato).
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  onDark = false,
  className = "",
}: {
  label: string;
  title?: string;
  subtitle?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <SectionLabel>{label}</SectionLabel>
      {title && (
        <h2
          className={`mt-2 text-[1.75rem] font-medium tracking-tight ${
            onDark ? "text-white" : "text-brand-blue dark:text-foreground"
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-1.5 text-sm ${
            onDark ? "text-white/50" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
