/** Eyebrow vermelho uppercase usado como label de seção. */
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-red">
      {children}
    </p>
  );
}
