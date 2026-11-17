import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, Play, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useLockBodyScroll } from "@/hooks/useUi";
import type { PortfolioItem } from "@/data/portfolio";
import type { PortfolioCategory } from "@/types";
import { orderLink } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/config/translations";

const filters: { id: PortfolioCategory | "all"; key: TranslationKey }[] = [
  { id: "all", key: "portfolio.filters.all" },
  { id: "ai-photos", key: "portfolio.filters.aiPhotos" },
  { id: "ai-videos", key: "portfolio.filters.aiVideos" },
  { id: "banners", key: "portfolio.filters.banners" },
  { id: "youtube", key: "portfolio.filters.youtube" },
  { id: "websites", key: "portfolio.filters.websites" },
  { id: "graphics", key: "portfolio.filters.graphics" },
];

const categoryLabels: Record<PortfolioCategory, TranslationKey> = {
  "ai-photos": "portfolio.filters.aiPhotos",
  "ai-videos": "portfolio.filters.aiVideos",
  banners: "portfolio.filters.banners",
  youtube: "portfolio.filters.youtube",
  websites: "portfolio.filters.websites",
  graphics: "portfolio.filters.graphics",
};

const categoryService: Record<PortfolioCategory, string> = {
  "ai-photos": "ai-photo",
  "ai-videos": "ai-video",
  banners: "banner",
  youtube: "youtube",
  websites: "website",
  graphics: "graphic",
};

const aspectClass: Record<PortfolioItem["aspect"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  wide: "aspect-video",
};

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  showFilters?: boolean;
  className?: string;
}

export function PortfolioGallery({ items, showFilters = true, className }: PortfolioGalleryProps) {
  const { t, localizeText, localizeList } = useLanguage();
  const [active, setActive] = useState<PortfolioCategory | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((item) => item.category === active)),
    [active, items]
  );

  const selectedIndex = filtered.findIndex((item) => item.id === selectedId);
  const selected = selectedIndex >= 0 ? filtered[selectedIndex] : null;

  const openItem = (id: string) => setSelectedId(id);
  const close = () => setSelectedId(null);
  const goTo = (direction: 1 | -1) => {
    if (!filtered.length) return;
    const nextIndex = (selectedIndex + direction + filtered.length) % filtered.length;
    setSelectedId(filtered[nextIndex].id);
  };

  return (
    <div className={className}>
      {showFilters && (
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("common.filters")}
        >
          {filters.map((filter) => {
            const isActive = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-4 py-2 text-[11px] font-semibold tracking-wide transition-all duration-300",
                  isActive
                    ? "border-brand-violet/60 bg-brand-violet/15 text-white shadow-glow"
                    : "border-white/10 bg-white/[0.03] text-muted hover:border-white/25 hover:text-white"
                )}
              >
                {t(filter.key)}
              </button>
            );
          })}
          <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 md:inline">
            {t("portfolio.showing", { count: filtered.length, total: items.length })}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3"
        >
          {filtered.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => openItem(item.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
              aria-label={`${t("portfolio.openLightbox")}: ${localizeText(item.title)}`}
              className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[22px] border border-white/10 bg-ink-800 text-left transition-all duration-500 hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-glow"
            >
              <div className={cn("relative overflow-hidden", aspectClass[item.aspect])}>
                <img
                  src={item.image}
                  alt={localizeText(item.alt)}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                <span className="absolute left-3.5 top-3.5 rounded-full border border-white/15 bg-ink/60 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                  {t(categoryLabels[item.category])}
                </span>
                <span className="absolute right-3.5 top-3.5 rounded-full border border-violet-300/25 bg-violet-500/15 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-violet-100 backdrop-blur-md">
                  {t("portfolio.sampleBadge")}
                </span>

                {item.category === "ai-videos" && (
                  <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/50 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-violet-300/90">
                        {localizeList(item.tags).join(" · ")}
                      </p>
                      <h2 className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-white sm:text-base">
                        {localizeText(item.title)}
                      </h2>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-sm text-muted">
          {t("portfolio.empty")}
        </p>
      )}

      <PortfolioLightbox
        items={filtered}
        selected={selected}
        index={selectedIndex}
        onClose={close}
        onPrev={() => goTo(-1)}
        onNext={() => goTo(1)}
      />
    </div>
  );
}

interface LightboxProps {
  items: PortfolioItem[];
  selected: PortfolioItem | null;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function PortfolioLightbox({ items, selected, index, onClose, onPrev, onNext }: LightboxProps) {
  const { t, localizeText, localizeList } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const handlers = useRef({ onClose, onPrev, onNext });
  handlers.current = { onClose, onPrev, onNext };
  const open = Boolean(selected);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handlers.current.onClose();
      if (event.key === "ArrowLeft") handlers.current.onPrev();
      if (event.key === "ArrowRight") handlers.current.onNext();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={t("portfolio.projectDetails")}
        >
          <button
            type="button"
            aria-label={t("common.close")}
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative z-10 grid max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[24px] border border-white/12 bg-ink-850 shadow-card md:grid-cols-[1.4fr_1fr] md:overflow-hidden"
          >
            <div className="relative flex min-h-[240px] items-center justify-center bg-[#05050A] md:min-h-[560px]">
              {selected.video ? (
                <video
                  src={selected.video}
                  poster={selected.image}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="max-h-[48vh] w-full object-contain md:max-h-[80vh]"
                />
              ) : (
                <img
                  src={selected.image}
                  alt={localizeText(selected.alt)}
                  className="max-h-[48vh] w-full object-contain md:max-h-[86vh]"
                />
              )}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 md:hidden">
                <span className="rounded-full bg-ink/70 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white/70 backdrop-blur">
                  {t(categoryLabels[selected.category])}
                </span>
              </div>
            </div>

            <div className="flex flex-col p-5 sm:p-7">
              <div className="hidden items-center gap-2 md:flex">
                <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-violet-200">
                  {t(categoryLabels[selected.category])}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
                  {t("portfolio.sampleBadge")}
                </span>
              </div>

              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white">
                {localizeText(selected.title)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {localizeText(selected.description)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {localizeList(selected.tags).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] px-3.5 py-3 text-[10.5px] leading-relaxed text-amber-100/70">
                {t("portfolio.sampleNotice")}
              </p>

              <div className="mt-5 flex items-center gap-2 text-[10px] text-white/55">
                <span>{t("portfolio.lightboxHint")}</span>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                <ButtonLink
                  to={orderLink(categoryService[selected.category])}
                  size="sm"
                  onClick={onClose}
                  withArrow
                >
                  {t("common.startProject")}
                </ButtonLink>
                <a
                  href={selected.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 px-4 text-xs font-semibold text-white/70 transition-colors hover:text-white"
                >
                  {t("common.viewDetails")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t("common.close")}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-white backdrop-blur transition-colors hover:bg-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center pl-3 md:flex">
              <button
                type="button"
                onClick={onPrev}
                aria-label={t("common.previous")}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-white backdrop-blur transition-colors hover:bg-ink"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3 md:flex">
              <button
                type="button"
                onClick={onNext}
                aria-label={t("common.next")}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-white backdrop-blur transition-colors hover:bg-ink"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 md:hidden">
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex items-center gap-1.5 text-xs text-white/70"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("common.previous")}
              </button>
              <span className="font-mono text-[10px] text-white/50">
                {index + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center gap-1.5 text-xs text-white/70"
              >
                {t("common.next")}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
