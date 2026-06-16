"use client";

import { useTheme } from "next-themes";
import { useHydrated } from "@/lib/useHydrated";

export default function DarkModeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-current transition-colors hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 ${className}`}
    >
      {/* Evita mismatch de hidratação: só renderiza o ícone após montar */}
      {mounted ? (
        isDark ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )
      ) : (
        <span className="h-5 w-5" />
      )}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
