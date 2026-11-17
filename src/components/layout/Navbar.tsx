import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useLanguage } from "@/context/LanguageContext";
import { useEscapeKey, useLockBodyScroll } from "@/hooks/useUi";
import { cn } from "@/lib/utils";
import { openWhatsApp } from "@/utils/whatsapp";
import type { TranslationKey } from "@/config/translations";

const navItems: { to: string; key: TranslationKey; end?: boolean }[] = [
  { to: "/", key: "nav.home", end: true },
  { to: "/services", key: "nav.services" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/portfolio", key: "nav.portfolio" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useLockBodyScroll(open);
  useEscapeKey(open, () => setOpen(false));

  const handleWhatsApp = () => {
    if (!openWhatsApp(t("whatsapp.general"))) {
      navigate("/contact");
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-white/10 bg-ink/85 backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-page">
          <div className="flex h-[76px] items-center justify-between gap-3">
            <Logo markClassName="h-9 w-9 sm:h-10 sm:w-10" />

            <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "group relative py-2 font-sans text-[13px] font-medium tracking-wide transition-colors duration-300",
                      isActive ? "text-white" : "text-muted hover:text-white"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t(item.key)}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r from-violet-400 via-brand-violet to-transparent transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                        )}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-2.5 lg:flex">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={handleWhatsApp}
                aria-label={t("whatsapp.aria")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-all hover:border-emerald-400/40 hover:text-emerald-300"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </button>
              <ButtonLink to="/order" size="sm" className="px-5">
                {t("nav.getStarted")}
              </ButtonLink>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? t("nav.close") : t("nav.openMenu")}
                className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="h-[2px] origin-left bg-gradient-to-r from-brand-violet via-brand-purple to-brand-indigo"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label={t("nav.close")}
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-sm"
            />
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-ink-850 px-6 pb-8 pt-24"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">{t("nav.menu")}</span>
                <LanguageSwitcher />
              </div>

              <div className="mt-8 flex flex-col">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.04, duration: 0.35 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center justify-between border-b border-white/[0.07] py-4 font-display text-xl font-medium tracking-tight transition-colors",
                          isActive ? "text-violet-300" : "text-white/85 hover:text-white"
                        )
                      }
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] tracking-widest text-white/50">
                          0{index + 1}
                        </span>
                        {t(item.key)}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </NavLink>
                  </motion.div>
                ))}
                <NavLink
                  to="/faq"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/[0.07] py-4 font-display text-xl font-medium tracking-tight text-white/85 transition-colors hover:text-white"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] tracking-widest text-white/50">07</span>
                    {t("nav.faq")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/50" />
                </NavLink>
              </div>

              <div className="mt-8 space-y-3">
                <ButtonLink to="/order" className="w-full" onClick={() => setOpen(false)} withArrow>
                  {t("nav.getStarted")}
                </ButtonLink>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
                >
                  <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                  {t("common.whatsappUs")}
                </button>
              </div>

              <div className="mt-auto pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {t("brand.tagline")}
                </p>
                <Link
                  to="/faq"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex items-center gap-2 text-xs text-muted hover:text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  {t("nav.faq")}
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
