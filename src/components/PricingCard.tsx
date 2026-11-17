import { Check, Clock, Repeat, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import type { Service, ServicePackage } from "@/config/services";
import { getPriceDisplay, formatINR, orderLink } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  service: Service;
  pkg: ServicePackage;
  className?: string;
}

export function PricingCard({ service, pkg, className }: PricingCardProps) {
  const { t, localizeText, localizeList } = useLanguage();
  const display = getPriceDisplay(pkg.pricingKey, { t });

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[26px] border p-6 transition-all duration-500 hover:-translate-y-1",
        pkg.popular
          ? "border-brand-violet/45 bg-gradient-to-b from-brand-violet/[0.13] via-ink-800/90 to-ink-800/90 shadow-glow"
          : "border-white/10 bg-white/[0.028] hover:border-white/20",
        className
      )}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-glow">
          <Sparkles className="h-2.5 w-2.5" />
          {t("common.mostPopular")}
        </span>
      )}

      <h3 className="font-display text-lg font-semibold text-white">{localizeText(pkg.name)}</h3>
      <p className="mt-2 min-h-[2.75rem] text-[12.5px] leading-relaxed text-muted">
        {localizeText(pkg.description)}
      </p>

      <div className="mt-6 border-y border-white/[0.08] py-5">
        {display.kind === "quote" ? (
          <p className="font-display text-xl font-semibold text-white">
            {t(display.labelKey)}
          </p>
        ) : (
          <>
            {display.kind === "from" && (
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-violet-300">
                {t("pricing.startingFrom")}
              </p>
            )}
            <p className="flex items-baseline gap-2">
              <span className="font-display text-[32px] font-semibold leading-none tracking-tight text-white">
                {formatINR(display.amount)}
              </span>
              {display.kind === "onwards" && (
                <span className="text-[11px] text-muted">{t("pricing.onwards")}</span>
              )}
            </p>
          </>
        )}
        <p className="mt-2 text-[10px] leading-relaxed text-white/55">
          {t("order.summaryNote")}
        </p>
      </div>

      <ul className="mt-5 space-y-2.5">
        {localizeList(pkg.features).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[12.5px] text-white/70">
              <Check
                className={cn(
                  "mt-0.5 h-3.5 w-3.5 shrink-0",
                  pkg.popular ? "text-violet-300" : "text-white/55"
                )}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
      </ul>

      {pkg.samples && pkg.samples.length > 0 && (
        <div className="mt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
            {t("pricing.sampleOutput")}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {pkg.samples.map((sample) => (
              <figure key={sample.src} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                {sample.kind === "video" ? (
                  <video
                    src={sample.src}
                    aria-label={localizeText(sample.alt)}
                    preload="metadata"
                    muted
                    playsInline
                    controls
                    className="aspect-video w-full bg-ink object-cover"
                  />
                ) : (
                  <img
                    src={sample.src}
                    alt={localizeText(sample.alt)}
                    width={640}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover"
                  />
                )}
              </figure>
            ))}
          </div>
          <p className="mt-2.5 text-[10px] leading-relaxed text-white/50">
            {t("pricing.sampleNote")}
          </p>
        </div>
      )}

      <div className="mt-5 space-y-2 border-t border-white/[0.08] pt-4 text-[11px] text-muted">
        <p className="flex items-start gap-2">
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/50" aria-hidden="true" />
          {t("common.timelineNote")}
        </p>
        <p className="flex items-start gap-2">
          <Repeat className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/50" aria-hidden="true" />
          {t("pricing.revisionsValue")}
        </p>
      </div>

      <div className="mt-auto pt-6">
        <ButtonLink
          to={orderLink(service.id, pkg.pricingKey)}
          variant={pkg.popular ? "primary" : "secondary"}
          className="w-full"
          size="sm"
        >
          {t("common.orderNow")}
        </ButtonLink>
      </div>
    </article>
  );
}
