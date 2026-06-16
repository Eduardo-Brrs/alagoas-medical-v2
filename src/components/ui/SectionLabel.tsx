/** Eyebrow vermelho uppercase usado como label de seção. */
export default function SectionLabel({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  /** Em fundos escuros (azul) usa um vermelho claro p/ manter contraste AA. */
  onDark?: boolean;
}) {
  return (
    <p
      className={`text-[0.6875rem] font-medium uppercase tracking-[0.1em] ${
        onDark ? "text-brand-red-light" : "text-brand-red-strong"
      }`}
    >
      {children}
    </p>
  );
}
