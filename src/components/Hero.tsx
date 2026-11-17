import {
  Camera,
  Clapperboard,
  Globe2,
  PenTool,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { services } from "@/config/services";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/utils/whatsapp";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/config/translations";

const floatingCards: {
  key: TranslationKey;
  icon: LucideIcon;
  accent: string;
  className: string;
  animation: string;
  delay: string;
}[] = [
  {
    key: "home.card.aiPhoto",
    icon: Camera,
    accent: "bg-fuchsia-500/15 text-fuchsia-300",
    className: "-left-1 top-10 sm:left-0 lg:-left-8",
    animation: "animate-float",
    delay: "0s",
  },
  {
    key: "home.card.aiVideo",
    icon: Clapperboard,
    accent: "bg-indigo-500/15 text-indigo-300",
    className: "-right-1 top-24 sm:right-0 lg:-right-6",
    animation: "animate-float-slow",
    delay: "0.8s",
  },
  {
    key: "home.card.website",
    icon: Globe2,
    accent: "bg-cyan-500/15 text-cyan-300",
    className: "-left-1 bottom-28 sm:left-0 lg:-left-6",
    animation: "animate-float-slow",
    delay: "1.4s",
  },
  {
    key: "home.card.graphics",
    icon: PenTool,
    accent: "bg-emerald-500/15 text-emerald-300",
    className: "-right-1 bottom-12 sm:right-0 lg:-right-4",
    animation: "animate-float",
    delay: "0.4s",
  },
];

export function Hero() {
  const { t, lang, localizeText } = useLanguage();
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    if (!openWhatsApp(t("whatsapp.general"))) navigate("/contact");
  };

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-[0.55] [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-[380px] w-[380px] rounded-full bg-brand-purple/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-brand-indigo/10 blur-[130px]"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-300/20 bg-violet-500/[0.08] px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
              </span>
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-violet-200">
                {t("home.badge")}
              </span>
            </div>

            <h1
              className={cn(
                "mt-7 font-display font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white",
                lang === "hi"
                  ? "text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.16] tracking-[-0.01em]"
                  : "text-[clamp(2.5rem,5.7vw,4.85rem)]"
              )}
            >
              <span className="block">{t("home.titleLine1")}</span>
              <span className="block">{t("home.titleLine2")}</span>
              <span className="gradient-text-violet block text-glow">{t("home.titleAccent")}</span>
            </h1>

            <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {t("home.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink to="/services" size="lg" withArrow>
                {t("common.exploreServices")}
              </ButtonLink>
              <ButtonLink to="/order" variant="secondary" size="lg">
                {t("common.startProject")}
              </ButtonLink>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-1 py-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                {t("common.whatsappUs")}
              </button>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.08] pt-5">
              {services.slice(0, 4).map((service) => (
                <span
                  key={service.id}
                  className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55"
                >
                  <span className={cn("h-1 w-1 rounded-full", service.accent.dot)} />
                  {localizeText(service.shortName)}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[110%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-brand-purple/20 blur-[90px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 animate-spin-slow rounded-[50%] border border-dashed border-violet-300/[0.12]"
            />

            <div className="relative mx-auto w-full max-w-[430px] lg:max-w-[470px]">
              <div className="ring-gradient relative rounded-[30px] p-[1px]">
                <div className="noise relative overflow-hidden rounded-[29px] bg-ink-800">
                  <img
                    src="/images/hero-art.svg"
                    alt={t("home.visualCaption")}
                    width={900}
                    height={1100}
                    decoding="async"
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-ink/55 px-4 py-2.5 backdrop-blur-md">
                    <span className="flex items-center gap-2 text-[10px] font-medium text-white/75">
                      <Sparkles className="h-3 w-3 text-violet-300" aria-hidden="true" />
                      {t("home.visualCaption")}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/55">
                      NEXORA / 26
                    </span>
                  </div>
                </div>
              </div>

              {floatingCards.map((card) => (
                <div
                  key={card.key}
                  style={{ animationDelay: card.delay }}
                  className={cn(
                    "absolute z-20 flex items-center gap-2.5 rounded-2xl border border-white/12 bg-ink-800/80 p-2.5 shadow-card backdrop-blur-xl sm:p-3",
                    card.className,
                    card.animation
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9",
                      card.accent
                    )}
                  >
                    <card.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="pr-1">
                    <p className="text-[10px] font-semibold leading-none text-white sm:text-[11px]">
                      {t(card.key)}
                    </p>
                    <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.18em] text-white/55">
                      Nexora Studio
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
