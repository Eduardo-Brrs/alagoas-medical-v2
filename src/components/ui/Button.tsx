import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "ghostLight" | "whatsapp";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[13px]",
  sm: "px-[18px] py-2 text-xs",
};

const variants: Record<Variant, string> = {
  primary: "bg-brand-red text-white hover:bg-brand-red-hover",
  ghost:
    "border border-border text-foreground hover:bg-surface focus-visible:ring-offset-background",
  // Sobre fundos escuros (hero, contato)
  ghostLight:
    "border border-white/30 text-white/80 hover:border-white/60 hover:text-white focus-visible:ring-offset-brand-blue",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe5d]",
};

type ButtonAsButton = {
  variant?: Variant;
  size?: Size;
  href?: undefined;
  children: ReactNode;
} & ComponentProps<"button">;

type ButtonAsLink = {
  variant?: Variant;
  size?: Size;
  href: string;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href">;

export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", children } = props;
  const cls = `${base} ${sizes[size]} ${variants[variant]}`;

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
