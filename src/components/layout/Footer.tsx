import { Link } from "react-router-dom";
import {
  ArrowUp,
  Dribbble,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { brand } from "@/config/brand";
import { contact, isEmailConfigured, isWhatsAppConfigured } from "@/config/contact";
import { services } from "@/config/services";
import { configuredSocialLinks, type SocialLink } from "@/config/social";
import { useLanguage } from "@/context/LanguageContext";
import { buildGeneralMessage, buildWhatsAppUrl } from "@/utils/whatsapp";
import type { TranslationKey } from "@/config/translations";

const socialIcons: Record<SocialLink["id"], LucideIcon> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  linkedin: Linkedin,
  behance: Dribbble,
};

const exploreLinks: { to: string; key: TranslationKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/services", key: "nav.services" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/portfolio", key: "nav.portfolio" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
  { to: "/faq", key: "nav.faq" },
];

const fallbackSocials: SocialLink[] = [
  { id: "instagram", label: "Instagram", url: "" },
  { id: "youtube", label: "YouTube", url: "" },
  { id: "facebook", label: "Facebook", url: "" },
];

export function Footer() {
  const { t, localizeText } = useLanguage();
  const socials = configuredSocialLinks.length ? configuredSocialLinks : fallbackSocials;
  const hasSocials = configuredSocialLinks.length > 0;
  const waConfigured = isWhatsAppConfigured();
  const emailConfigured = isEmailConfigured();

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/10 bg-ink-850">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-brand-purple/10 blur-[110px]"
      />
      <div className="container-page relative z-10 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo markClassName="h-11 w-11" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {t("footer.description")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {socials.map((social) => {
                const Icon = socialIcons[social.id];
                const label = `${social.label}${social.url ? "" : " — coming soon"}`;
                return social.url ? (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all hover:border-brand-violet/40 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : (
                  <span
                    key={social.id}
                    role="img"
                    aria-label={label}
                    title={label}
                    className="flex h-9 w-9 cursor-default items-center justify-center rounded-full border border-white/[0.07] text-white/50"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                );
              })}
            </div>
            {!hasSocials && (
              <p className="mt-3 text-[11px] text-white/50">{t("footer.socialEmpty")}</p>
            )}
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
              {t("footer.explore")}
            </h2>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-muted transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
              {t("footer.services")}
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-[13px] text-muted transition-colors hover:text-white"
                  >
                    {localizeText(service.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
              {t("footer.contact")}
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                {waConfigured ? (
                  <a
                    href={buildWhatsAppUrl(buildGeneralMessage(t("whatsapp.general")))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-[13px] text-muted transition-colors hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                    {t("common.whatsappUs")}
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 text-[13px] text-muted transition-colors hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-emerald-400/60" />
                    {t("common.contactUs")}
                  </Link>
                )}
              </li>
              <li>
                {emailConfigured ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2.5 text-[13px] text-muted transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-violet-300" />
                    {contact.email}
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 text-[13px] text-muted transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-violet-300" />
                    {t("common.emailUs")}
                  </Link>
                )}
              </li>
            </ul>
            <Link
              to="/order"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-violet/40 bg-brand-violet/10 px-4 py-2 text-xs font-semibold text-violet-200 transition-colors hover:bg-brand-violet/20"
            >
              {t("common.startProject")}
              <span aria-hidden="true">â†’</span>
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.copyright", { year: brand.copyrightYear })}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">
              {t("privacy.title")}
            </Link>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-white">
              {t("terms.title")}
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              {t("footer.backToTop")}
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none relative -mb-6 select-none overflow-hidden">
        <div className="footer-watermark" />
      </div>
    </footer>
  );
}
