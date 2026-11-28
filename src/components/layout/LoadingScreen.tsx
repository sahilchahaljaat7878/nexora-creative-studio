import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";
import { useLanguage } from "@/context/LanguageContext";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    const duration = reduceMotion ? 250 : 1150;
    const timer = window.setTimeout(() => setVisible(false), duration);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
          aria-label={t("common.loading")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/20 blur-[120px]"
          />
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[74px] w-[132px] items-center justify-center rounded-[20px] border border-white/15 bg-ink-800"
            >
              <img
                src="/favicon/logo.png"
                alt="Haryana Creative"
                className="h-10 w-auto object-contain"
                decoding="async"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="font-display text-xl font-bold tracking-[0.3em] text-white">
                {brand.name}
              </p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.42em] text-muted">
                CREATIVE STUDIO
              </p>
            </motion.div>

            <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-violet to-brand-indigo"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduceMotion ? 0.2 : 1.05, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-white/55">
              {t("common.loading")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
