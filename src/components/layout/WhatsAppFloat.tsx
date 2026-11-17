import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { contact, isEmailConfigured, isWhatsAppConfigured } from "@/config/contact";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/utils/whatsapp";

export function WhatsAppFloat() {
  const { t } = useLanguage();
  const [showFallback, setShowFallback] = useState(false);
  const configured = isWhatsAppConfigured();

  const handleClick = () => {
    if (openWhatsApp(t("whatsapp.general"))) {
      setShowFallback(false);
      return;
    }
    setShowFallback((value) => !value);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showFallback && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-label={t("whatsapp.notConfiguredTitle")}
            className="w-[min(320px,calc(100vw-2.5rem))] rounded-2xl border border-white/12 bg-ink-800 p-5 shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="h-5 w-5 text-emerald-400" />
                <h2 className="font-display text-sm font-semibold text-white">
                  {t("whatsapp.notConfiguredTitle")}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowFallback(false)}
                aria-label={t("whatsapp.close")}
                className="text-muted transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {t("whatsapp.notConfiguredBody")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-[11px] font-semibold text-white"
              >
                {t("common.contactUs")}
              </Link>
              {isEmailConfigured() && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold text-white/80 hover:text-white"
                >
                  <Mail className="h-3 w-3" />
                  {t("common.emailUs")}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleClick}
        aria-label={t("whatsapp.aria")}
        aria-expanded={showFallback}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#25D366] text-[#07130B] shadow-[0_12px_40px_-10px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {!configured && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/25" />
        )}
        <WhatsAppIcon className="h-6 w-6" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-white/10 bg-ink-800 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:block">
          {t("whatsapp.label")}
        </span>
      </button>
    </div>
  );
}
