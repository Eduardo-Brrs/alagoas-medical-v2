"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3.5"
      >
        <Logo />

        {/* Links desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.8125rem] text-muted transition-colors hover:text-brand-blue dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Ações desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <DarkModeToggle className="text-muted" />
          <Button href="#contato" variant="primary" size="sm">
            Falar com vendas
          </Button>
        </div>

        {/* Ações mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <DarkModeToggle className="text-muted" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-[1100px] flex-col px-6 py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-foreground transition-colors hover:text-brand-red"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <Button
                href="#contato"
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Falar com vendas
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
