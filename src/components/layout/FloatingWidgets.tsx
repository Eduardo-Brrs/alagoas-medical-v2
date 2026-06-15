"use client";

import { useEffect, useState } from "react";
import WhatsAppFloat from "@/components/sections/WhatsAppFloat";
import CookieBanner from "@/components/ui/CookieBanner";

/**
 * Coordena os elementos fixos do canto inferior.
 * Enquanto o banner de cookies está aberto, o botão flutuante do WhatsApp
 * fica oculto para não sobrepor os botões Aceitar/Recusar.
 */
export default function FloatingWidgets() {
  // "pending" = ainda não lemos o localStorage (evita mismatch de hidratação)
  const [consent, setConsent] = useState<"pending" | string | null>("pending");

  useEffect(() => {
    setConsent(localStorage.getItem("cookie_consent"));
  }, []);

  const bannerOpen = consent === null;

  const resolve = (value: "accepted" | "declined") => {
    localStorage.setItem("cookie_consent", value);
    setConsent(value);
    // Inicializar Google Analytics aqui quando value === "accepted".
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
