"use client";

export default function CookieBanner({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-40 flex flex-col items-start justify-between gap-4 border-t border-white/10 bg-brand-blue-footer px-6 py-4 sm:flex-row sm:items-center"
    >
      <p className="max-w-2xl text-sm leading-relaxed text-white/70">
        Usamos cookies para analisar o tráfego do site e melhorar sua
        experiência, em conformidade com a{" "}
        <strong className="text-white">LGPD</strong>.
      </p>
      <div className="flex flex-shrink-0 gap-3">
        <button
          type="button"
          onClick={onDecline}
          className="rounded-md px-4 py-2 text-sm text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={onAccept}
          className="rounded-md bg-brand-red-strong px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red-strong-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue-footer"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
