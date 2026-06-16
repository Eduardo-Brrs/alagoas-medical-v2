"use client";

import { useEffect, useState } from "react";
import WhatsAppFloat from "@/components/sections/WhatsAppFloat";
import CookieBanner from "@/components/ui/CookieBanner";
import { useHydrated } from "@/lib/useHydrated";
import { loadGoogleAnalytics } from "@/lib/gtag";

/**
 * Coordena os elementos fixos do canto inferior.
 * Enquanto o banner de cookies está aberto, o botão flutuante do WhatsApp
 * fica oculto para não sobrepor os botões Aceitar/Recusar.
 */
export default function FloatingWidgets() {
  const hydrated = useHydrated();
  // Decisão tomada nesta sessão (sobrepõe o valor lido do localStorage).
  const [choice, setChoice] = useState<string | null>(null);

  // Só lemos o localStorage após hidratar (evita mismatch). Antes disso
  // tratamos como "pendente" e não renderizamos nem o banner nem o float.
  const consent = hydrated
    ? (choice ?? localStorage.getItem("cookie_consent"))
    : "pending";

  const bannerOpen = consent === null;

  // Visitante que já aceitou numa sessão anterior: inicializa o GA ao montar.
  useEffect(() => {
    if (hydrated && localStorage.getItem("cookie_consent") === "accepted") {
      loadGoogleAnalytics();
    }
  }, [hydrated]);

  const resolve = (value: "accepted" | "declined") => {
    localStorage.setItem("cookie_consent", value);
    setChoice(value);
    if (value === "accepted") loadGoogleAnalytics();
  };

  return (
    <>
      {!bannerOpen && <WhatsAppFloat />}
      {bannerOpen && (
        <CookieBanner
          onAccept={() => resolve("accepted")}
          onDecline={() => resolve("declined")}
        />
      )}
    </>
  );
}
