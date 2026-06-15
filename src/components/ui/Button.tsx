import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "ghostLight";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-red text-white hover:bg-brand-red-hover",
  ghost:
    "border border-border text-foreground hover:bg-surface focus-visible:ring-offset-background",
  // Para usar sobre fundos escuros (hero, contato)
  ghostLight:
    "border border-white/30 text-white hover:bg-white/10 focus-visible:ring-offset-brand-blue",
};

type ButtonAsButton = {
  variant?: Variant;
  href?: undefined;
  children: ReactNode;
} & ComponentProps<"button">;

type ButtonAsLink = {
  variant?: Variant;
  href: string;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href">;

export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", children } = props;
  const cls = `${base} ${variants[variant]}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external, className, ...rest } = props as ButtonAsLink & {
      className?: string;
    };
    const extraProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link
        href={href}
        className={`${cls} ${className ?? ""}`}
        {...extraProps}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { className, ...rest } = props as ButtonAsButton;
  return (
    <button className={`${cls} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
