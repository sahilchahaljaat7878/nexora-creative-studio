import { Cpu, Gem, Sparkles, Wallet, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/config/translations";
import { cn } from "@/lib/utils";

const items: {
  icon: LucideIcon;
  title: TranslationKey;
  desc: TranslationKey;
  accent: string;
}[] = [
  {
    icon: Sparkles,
    title: "home.highlights.excellence.title",
    desc: "home.highlights.excellence.desc",
    accent: "text-fuchsia-300",
  },
  {
    icon: Wallet,
    title: "home.highlights.affordable.title",
    desc: "home.highlights.affordable.desc",
    accent: "text-violet-300",
  },
  {
    icon: Gem,
    title: "home.highlights.premium.title",
    desc: "home.highlights.premium.desc",
    accent: "text-indigo-300",
  },
  {
    icon: Cpu,
    title: "home.highlights.technology.title",
    desc: "home.highlights.technology.desc",
    accent: "text-cyan-300",
  },
];

export function HighlightStrip({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <section aria-label={t("home.highlights.excellence.title")} className={cn("relative", className)}>
      <div className="container-page">
        <div className="grid overflow-hidden rounded-[26px] border border-white/[0.09] bg-white/[0.02] sm:grid-cols-2 sm:divide-x sm:divide-white/[0.07] lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "group relative p-6 transition-colors duration-300 hover:bg-white/[0.025] lg:p-7",
                index > 0 && "border-t border-white/[0.07] sm:border-t-0",
                index === 2 && "sm:border-t lg:border-t-0",
                index === 3 && "sm:border-t lg:border-t-0"
              )}
            >
              <item.icon
                className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", item.accent)}
                aria-hidden="true"
              />
              <h2 className="mt-4 font-display text-[15px] font-semibold text-white">
                {t(item.title)}
              </h2>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">{t(item.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
