import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  breadcrumb: string;
  children?: ReactNode;
  className?: string;
  /** Optional faint background image (path under /public). */
  backgroundImage?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  children,
  className,
  backgroundImage,
}: PageHeroProps) {
  const { t } = useLanguage();

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-white/[0.06] pb-16 pt-32 sm:pt-36 md:pb-20 md:pt-40",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-brand-purple/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[360px] w-[360px] rounded-full bg-brand-indigo/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      {backgroundImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="container-page relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[11px] text-muted">
          <Link to="/" className="transition-colors hover:text-white">
            {t("nav.home")}
          </Link>
          <ChevronRight className="h-3 w-3 text-white/50" aria-hidden="true" />
          <span className="text-violet-300">{breadcrumb}</span>
        </nav>

        <p className="eyebrow">
          <span className="eyebrow-dash" />
          {eyebrow}
        </p>

        <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold uppercase leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
