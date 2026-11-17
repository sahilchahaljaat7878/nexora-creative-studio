import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import type { Service } from "@/config/services";
import { formatINR, lowestServicePrice, orderLink } from "@/lib/pricing";
import { serviceIconMap } from "@/lib/serviceIcons";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  index?: number;
  className?: string;
}

export function ServiceCard({ service, index, className }: ServiceCardProps) {
  const { t, localizeText } = useLanguage();
  const Icon = serviceIconMap[service.icon];
  const startingPrice = lowestServicePrice(service.packages.map((pkg) => pkg.pricingKey));
  const detailPath = `/services/${service.slug}`;
  /** Sample outputs of the first package that has them (first two on the card), so visitors see what the price buys. */
  const entrySamples =
    service.packages.find((pkg) => pkg.samples?.length)?.samples?.slice(0, 2) ?? [];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-ink-800/70 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-violet/40 hover:shadow-glow",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={localizeText(service.imageAlt)}
          width={1000}
          height={750}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/10 to-transparent" />
        <div
          className={cn(
            "pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full blur-[60px] transition-opacity duration-500 group-hover:opacity-100",
            service.accent.glow,
            "opacity-50"
          )}
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
          {String((index ?? 0) + 1).padStart(2, "0")} / {t("nav.services")}
        </span>
        <span
          className={cn(
            "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink/50 text-white backdrop-blur-md",
            "transition-transform duration-500 group-hover:scale-110"
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
            <Link to={detailPath} className="transition-colors hover:text-violet-200">
              {localizeText(service.name)}
            </Link>
          </h3>
          <Link
            to={detailPath}
            aria-label={`${t("common.viewDetails")} — ${localizeText(service.name)}`}
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all group-hover:border-brand-violet/50 group-hover:text-white"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-muted">{localizeText(service.short)}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
              {t("services.startingAt")}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-white">
              {startingPrice !== null ? formatINR(startingPrice) : t("pricing.contactForPrice")}
            </p>
          </div>
          <span className={cn("mb-1.5 h-2 w-2 rounded-full", service.accent.dot)} aria-hidden="true" />
        </div>

        {entrySamples.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
              {t("pricing.sampleOutput")}
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {entrySamples.map((sample) => (
                <figure
                  key={sample.src}
                  className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                >
                  {sample.kind === "video" ? (
                    <video
                      src={sample.src}
                      aria-label={localizeText(sample.alt)}
                      preload="metadata"
                      muted
                      playsInline
                      loop
                      onMouseEnter={(event) => event.currentTarget.play().catch(() => {})}
                      onMouseLeave={(event) => { event.currentTarget.pause(); event.currentTarget.currentTime = 0; }}
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
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {sample.kind === "video" && (
                    <>
                      <span className="pointer-events-none absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-ink/70 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
                        ▶ video
                      </span>
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-ink/60 text-white/90 backdrop-blur">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-0.5" fill="currentColor" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                    </>
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <ButtonLink to={detailPath} variant="secondary" size="sm" className="px-2 text-xs">
            {t("common.viewDetails")}
          </ButtonLink>
          <ButtonLink to={orderLink(service.id)} size="sm" className="px-2 text-xs">
            {t("common.orderNow")}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
