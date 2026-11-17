import { Link } from "react-router-dom";
import { ArrowRight, Compass, Home } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

export default function NotFoundPage() {
  const { t } = useLanguage();

  useSeo({
    title: t("seo.notFound.title"),
    description: t("seo.notFound.desc"),
    path: "/404",
    noindex: true,
  });

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pb-20 pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/20 blur-[120px]"
      />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[clamp(5rem,18vw,11rem)] font-bold leading-none tracking-[-0.04em] text-white/[0.08]">
            404
          </p>
          <p className="eyebrow justify-center">
            <span className="eyebrow-dash" />
            {t("notFound.eyebrow")}
            <span className="eyebrow-dash rotate-180" />
          </p>
          <h1 className="mt-5 font-display text-3xl font-semibold uppercase leading-[1.06] tracking-[-0.02em] text-white sm:text-4xl">
            {t("notFound.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            {t("notFound.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink to="/" size="lg">
              <Home className="h-4 w-4" />
              {t("notFound.button")}
            </ButtonLink>
            <ButtonLink to="/services" variant="secondary" size="lg" withArrow>
              {t("common.exploreServices")}
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-2.5 text-left sm:grid-cols-3">
            {[
              { to: "/services", label: t("nav.services") },
              { to: "/portfolio", label: t("nav.portfolio") },
              { to: "/contact", label: t("nav.contact") },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3.5 text-[12px] font-semibold text-white/70 transition-all hover:border-brand-violet/35 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Compass className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                  {link.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-white/50 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
