import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const options = [
  { value: "en", label: "EN", aria: "EN — English", title: "English" },
  { value: "hi", label: "हिन्दी", aria: "हिन्दी — Hindi", title: "Hindi" },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1",
        className
      )}
    >
      {options.map((option) => {
        const active = lang === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={active}
            aria-label={option.aria}
            title={option.title}
            className={cn(
              "rounded-full px-2.5 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-300",
              active
                ? "bg-brand-gradient text-white shadow-glow"
                : "text-muted hover:text-white"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
