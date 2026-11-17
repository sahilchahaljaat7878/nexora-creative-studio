import { Link } from "react-router-dom";
import { ArrowRight, Info, ShieldCheck, Timer } from "lucide-react";
import { OrderForm } from "@/components/forms/OrderForm";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { isWhatsAppConfigured } from "@/config/contact";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

export default function OrderPage() {
  const { t } = useLanguage();
  const waConfigured = isWhatsAppConfigured();

  useSeo({
    title: t("seo.order.title"),
    description: t("seo.order.desc"),
    path: "/order",
  });

  return (
    <>
      <PageHero
        eyebrow={t("order.eyebrow")}
        title={t("order.title")}
        subtitle={t("order.subtitle")}
        breadcrumb={t("nav.getStarted")}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] text-white/55">
          <ShieldCheck className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
          {t("order.secureNote")}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] text-white/55">
          <Timer className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
          {t("common.timelineNote")}
        </span>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          {!waConfigured && (
            <Reveal>
              <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-4 sm:p-5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-200/80" aria-hidden="true" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200/80">
                    {t("order.fallback.setupTitle")}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-amber-100/55">
                    {t("order.fallback.setupBody")}
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal>
            <OrderForm />
          </Reveal>

          <Reveal>
            <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[22px] border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-base font-semibold text-white">
                  {t("services.talkToUs")}
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
                  {t("faq.notFound")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  to="/faq"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
                >
                  {t("nav.faq")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
                >
                  {t("common.contactUs")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
