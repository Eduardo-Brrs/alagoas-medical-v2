"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { useHydrated } from "@/lib/useHydrated";
import { PROMO } from "@/lib/constants";

const STORAGE_KEY = "promo_dismissed";

/**
 * Pop-up de promoção por tempo limitado. Mostra a imagem da campanha uma única
 * vez por visitante (guarda o `PROMO.id` no localStorage). Para desligar a
 * promoção, basta `PROMO.ativa = false` em constants.ts — este componente nem
 * chega a renderizar. Coordenado pelo FloatingWidgets para abrir só depois do
 * banner de cookies (evita sobreposição).
 */
export default function PromoPopup() {
  const hydrated = useHydrated();
  // Decisão de fechar tomada nesta sessão (sobrepõe o valor lido do localStorage).
  const [dismissed, setDismissed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Estado derivado (sem setState em efeito): só abre após hidratar, se ainda
  // não foi fechado nesta sessão nem em visita anterior (localStorage).
  const open =
    hydrated && !dismissed && localStorage.getItem(STORAGE_KEY) !== PROMO.id;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, PROMO.id);
    setDismissed(true);
  };

  // Fecha com Esc, trava o scroll do fundo e foca o botão de fechar ao abrir.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        localStorage.setItem(STORAGE_KEY, PROMO.id);
        setDismissed(true);
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Promoção por tempo limitado"
      onClick={dismiss}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-[min(90vw,380px)] overflow-hidden rounded-2xl bg-card shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Fechar promoção"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <Image
          src={PROMO.imagem}
          alt={PROMO.alt}
          width={1024}
          height={1536}
          priority
          className="h-auto w-full"
        />

        <div className="p-4">
          <Button
            href={PROMO.linkWhatsapp}
            external
            variant="whatsapp"
            className="w-full"
          >
            <WhatsAppIcon size={18} />
            Garantir pelo WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
