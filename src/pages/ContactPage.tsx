import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Dribbble,
  Facebook,
  Info,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { contact, isEmailConfigured, isWhatsAppConfigured, formatWhatsAppNumber } from "@/config/contact";
import { configuredSocialLinks, socialLinks, type SocialLink } from "@/config/social";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";
import { buildGeneralMessage, buildWhatsAppUrl } from "@/utils/whatsapp";

const socialIcons: Record<SocialLink["id"], LucideIcon> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  linkedin: Linkedin,
  behance: Dribbble,
};

const fallbackSocials = socialLinks.slice(0, 3);

export default function ContactPage() {
  const { t, localizeText } = useLanguage();
  const waConfigured = isWhatsAppConfigured();
  const emailConfigured = isEmailConfigured();
  const socials = configuredSocialLinks.length ? configuredSocialLinks : fallbackSocials;
  const hasSocials = configuredSocialLinks.length > 0;

  useSeo({
    title: t("seo.contact.title"),
    description: t("seo.contact.desc"),
    path: "/contact",
  });

  return (
    <>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        breadcrumb={t("nav.contact")}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/[0.08] px-4 py-2 text-[11px] font-medium text-emerald-200">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t("contact.available")}
        </span>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
            <Reveal>
              <div className="space-y-5">
                <div className="rounded-[26px] border border-white/10 bg-ink-800/70 p-6 shadow-card sm:p-7">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-white">
                    {t("contact.info.title")}
                  </h2>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                    {t("contact.info.desc")}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                        {t("contact.info.whatsapp")}
                      </p>
                      {waConfigured ? (
                        <>
                          <a
                            href={buildWhatsAppUrl(buildGeneralMessage(t("whatsapp.general")))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-2 text-[13px] font-semibold text-white transition-colors hover:text-emerald-300"
                          >
                            <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                            {t("common.whatsappUs")}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                          <p className="mt-1.5 pl-6 font-mono text-[11px] tracking-wide text-muted">
                            {formatWhatsAppNumber()}
                          </p>
                        </>
                      ) : (
                        <p className="mt-2 flex items-start gap-2 text-[11px] leading-relaxed text-amber-100/60">
                          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          {t("contact.setup.whatsapp")}
                        </p>
                      )}
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                        {t("contact.info.email")}
                      </p>
                      {emailConfigured ? (
                        <a
                          href={`mailto:${contact.email}`}
                          className="mt-2 inline-flex items-center gap-2 break-all text-[13px] font-semibold text-white transition-colors hover:text-violet-300"
                        >
                          <Mail className="h-4 w-4 shrink-0 text-violet-300" />
                          {contact.email}
                        </a>
                      ) : (
                        <p className="mt-2 flex items-start gap-2 text-[11px] leading-relaxed text-amber-100/60">
                          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          {t("contact.setup.email")}
                        </p>
                      )}
                    </div>

                    {contact.workingHours && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                          {t("contact.info.hours")}
                        </p>
                        <p className="mt-2 flex items-start gap-2 text-[12.5px] text-white/70">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
                          {contact.workingHours}
                        </p>
                      </div>
                    )}

                    {contact.location && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                          {t("contact.info.location")}
                        </p>
                        <p className="mt-2 flex items-start gap-2 text-[12.5px] text-white/70">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
                          {contact.location}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 border-t border-white/[0.08] pt-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                      {t("contact.info.social")}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                      {socials.map((social) => {
                        const Icon = socialIcons[social.id];
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
                            aria-label={`${social.label} — coming soon`}
                            title={`${social.label} — coming soon`}
                            className="flex h-9 w-9 cursor-default items-center justify-center rounded-full border border-white/[0.07] text-white/50"
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                        );
                      })}
                    </div>
                    {!hasSocials && (
                      <p className="mt-3 text-[10.5px] leading-relaxed text-white/50">
                        {t("contact.info.socialEmpty")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.02] p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                    {t("contact.info.responseNote")}
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-muted">
                    {localizeText(contact.responseNote)}
                  </p>
                </div>

                <div className="rounded-[22px] border border-brand-violet/25 bg-brand-violet/[0.07] p-5">
                  <h3 className="font-display text-base font-semibold text-white">
                    {t("contact.form.directTitle")}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                    {t("contact.form.directDesc")}
                  </p>
                  <ButtonLink to="/order" size="sm" className="mt-4" withArrow>
                    {t("contact.form.directButton")}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-ink-850/40 py-14">
        <div className="container-page">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-lg font-semibold text-white">
                {t("pricing.customTitle")}
              </p>
              <p className="mt-1 text-[12.5px] text-muted">{t("pricing.customDesc")}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              <Link
                to="/faq"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                {t("nav.faq")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                {t("nav.pricing")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
