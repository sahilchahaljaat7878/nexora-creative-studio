import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-violet disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-white/15 bg-white/[0.045] text-white hover:border-white/30 hover:bg-white/[0.08] hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-brand-violet/45 text-violet-200 hover:border-brand-violet/80 hover:bg-brand-violet/10",
  ghost: "text-muted hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-[15px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {withArrow && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </button>
  );
}

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    to?: string;
    href?: string;
    external?: boolean;
  };

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow,
  to,
  href,
  external,
  ...props
}: LinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...(props as Record<string, unknown>)}>
        {children}
        {withArrow && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {withArrow && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </a>
  );
}
