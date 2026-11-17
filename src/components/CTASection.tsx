import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/utils/whatsapp";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function CTASection({ eyebrow, title, subtitle, className }: CTASectionProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    if (!openWhatsApp(t("whatsapp.general"))) navigate("/contact");
  };

  return (
    <section className={cn("section-pad", className)}>
      <div className="container-page">
        <div className="noise relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#1A0F2E] via-[#120C22] to-[#0A0814] px-6 py-16 text-center sm:px-10 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-purple/30 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-brand-indigo/20 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-white/[0.06]"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="eyebrow justify-center">
              <span className="eyebrow-dash" />
              {eyebrow ?? t("home.cta.eyebrow")}
              <span className="eyebrow-dash rotate-180" />
            </p>
            <h2 className="mt-6 font-display text-3xl font-semibold uppercase leading-[1.06] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
              {title ?? t("home.cta.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
              {subtitle ?? t("home.cta.subtitle")}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink to="/order" size="lg" withArrow>
                {t("common.startProject")}
              </ButtonLink>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 text-[15px] font-semibold text-white transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.07]"
              >
                <WhatsAppIcon className="h-5 w-5 text-emerald-400" />
                {t("home.cta.secondary")}
              </button>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-white/55">
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-violet-400" />
                {t("brand.tagline")}
              </span>
              <ButtonLink
                to="/contact"
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-[10px] uppercase tracking-[0.16em] text-white/55 hover:text-white"
              >
                {t("common.contactUs")}
                <ArrowRight className="h-3 w-3" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
