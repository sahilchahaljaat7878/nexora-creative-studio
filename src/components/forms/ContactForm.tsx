import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Copy, FileText, Info, Mail, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { contact, isEmailConfigured, isWhatsAppConfigured } from "@/config/contact";
import { services } from "@/config/services";
import { useLanguage } from "@/context/LanguageContext";
import { saveRecord } from "@/lib/api";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import {
  buildContactMessage,
  buildEmailLink,
  openWhatsApp,
  type ContactMessageDetails,
} from "@/utils/whatsapp";

type Status = "idle" | "opened" | "fallback";

export function ContactForm() {
  const { t, localizeText, lang } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [savedToRecords, setSavedToRecords] = useState<boolean | null>(null);

  const schema = useMemo(
    () =>
      z.object({
        fullName: z
          .string()
          .trim()
          .min(1, { message: t("contact.validation.nameRequired") })
          .min(2, { message: t("contact.validation.nameMin") }),
        whatsapp: z
          .string()
          .trim()
          .min(1, { message: t("contact.validation.whatsappRequired") })
          .refine((value) => {
            const digits = value.replace(/\D/g, "");
            return digits.length >= 8 && digits.length <= 15;
          }, { message: t("contact.validation.whatsappInvalid") }),
        email: z
          .string()
          .trim()
          .optional()
          .refine(
            (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            { message: t("contact.validation.emailInvalid") }
          ),
        service: z.string().min(1, { message: t("contact.validation.serviceRequired") }),
        message: z
          .string()
          .trim()
          .min(1, { message: t("contact.validation.messageRequired") })
          .min(10, { message: t("contact.validation.messageMin") }),
      }),
    [t]
  );

  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      whatsapp: "",
      email: "",
      service: "",
      message: "",
    },
  });

  useEffect(() => {
    setCopied(false);
  }, [message]);

  const onSubmit = async (values: Values) => {
    const service = services.find((item) => item.id === values.service);
    const details: ContactMessageDetails = {
      fullName: values.fullName,
      whatsapp: values.whatsapp,
      email: values.email,
      service: service ? localizeText(service.name) : values.service,
      message: values.message,
    };
    const prepared = buildContactMessage(details, lang);
    setMessage(prepared);

    // Keep a copy in the studio records so enquiries are never missed.
    const saved = await saveRecord({
      type: "enquiry",
      name: values.fullName,
      whatsapp: values.whatsapp,
      email: values.email,
      service: details.service,
      description: values.message,
      locale: lang,
    });
    setSavedToRecords(saved.ok);

    setStatus(openWhatsApp(prepared) ? "opened" : "fallback");
  };

  const handleCopy = async () => {
    const success = await copyText(message);
    if (success) setCopied(true);
  };

  const handleReset = () => {
    reset();
    setMessage("");
    setStatus("idle");
    setCopied(false);
    setSavedToRecords(null);
  };

  if (status !== "idle") {
    return (
      <div className="rounded-[26px] border border-white/10 bg-ink-800/70 p-6 shadow-card sm:p-8">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl border",
            status === "opened"
              ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
              : "border-amber-300/25 bg-amber-400/10 text-amber-200"
          )}
        >
          {status === "opened" ? (
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          ) : (
            <FileText className="h-6 w-6" aria-hidden="true" />
          )}
        </span>

        <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
          {status === "opened"
            ? t("contact.success.title")
            : t("contact.fallback.title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {status === "opened"
            ? t("contact.success.intro")
            : isWhatsAppConfigured()
              ? t("contact.fallback.body")
              : t("contact.fallback.setupBody")}
        </p>

        <div className="mt-5 rounded-2xl border border-white/10 bg-ink/60 p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
            {t("order.previewTitle")}
          </p>
          <pre className="mt-3 max-h-72 overflow-y-auto whitespace-pre-wrap break-words font-sans text-[11.5px] leading-relaxed text-white/65">
            {message}
          </pre>
        </div>

        {savedToRecords !== null && (
          <p className="mt-4 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[10.5px] leading-relaxed text-white/60">
            {savedToRecords ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
            ) : (
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-200" aria-hidden="true" />
            )}
            {savedToRecords ? t("order.success.savedToRecords") : t("order.success.notSaved")}
          </p>
        )}

        <p className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/[0.04] px-3.5 py-3 text-[10.5px] leading-relaxed text-amber-100/65">
          {status === "opened" ? t("contact.success.notConfirmed") : t("order.success.notConfirmed")}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {status === "opened" ? (
            <Button type="button" size="sm" onClick={() => openWhatsApp(message)}>
              <WhatsAppIcon className="h-4 w-4" />
              {t("contact.success.openAgain")}
            </Button>
          ) : (
            <Button type="button" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              {copied ? t("contact.success.copied") : t("contact.success.copy")}
            </Button>
          )}

          {isEmailConfigured() ? (
            <a
              href={
                buildEmailLink(
                  lang === "hi" ? "à¤¨à¤ˆ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤ªà¥‚à¤›à¤¤à¤¾à¤›" : "New website enquiry",
                  message
                ) ?? `mailto:${contact.email}`
              }
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >
              <Mail className="h-4 w-4 text-violet-300" />
              {t("contact.fallback.email")}
            </a>
          ) : (
            <span className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-[11px] text-white/55">
              <Mail className="h-4 w-4" />
              {t("contact.fallback.emailUnavailable")}
            </span>
          )}

          <Button type="button" size="sm" variant="secondary" onClick={handleReset}>
            <RotateCcw className="h-3.5 w-3.5" />
            {t("contact.success.new")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[26px] border border-white/10 bg-ink-800/70 p-6 shadow-card sm:p-8"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-500/10 text-violet-300">
          <Send className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight text-white">
            {t("contact.form.title")}
          </h2>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
            {t("contact.form.desc")}
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor="contact-name" className="field-label">
            {t("contact.form.name")} <span className="text-rose-300">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder={t("contact.form.namePlaceholder")}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "contact-name-error" : undefined}
            className="field-input"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="contact-name-error" className="field-error">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-whatsapp" className="field-label">
              {t("contact.form.whatsapp")} <span className="text-rose-300">*</span>
            </label>
            <input
              id="contact-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t("contact.form.whatsappPlaceholder")}
              aria-invalid={Boolean(errors.whatsapp)}
              aria-describedby={errors.whatsapp ? "contact-whatsapp-error" : undefined}
              className="field-input"
              {...register("whatsapp")}
            />
            {errors.whatsapp && (
              <p id="contact-whatsapp-error" className="field-error">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="field-label">
              {t("contact.form.email")}{" "}
              <span className="font-normal normal-case tracking-normal text-white/50">
                ({t("common.optional")})
              </span>
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder={t("contact.form.emailPlaceholder")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className="field-input"
              {...register("email")}
            />
            {errors.email && (
              <p id="contact-email-error" className="field-error">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="contact-service" className="field-label">
            {t("contact.form.service")} <span className="text-rose-300">*</span>
          </label>
          <select
            id="contact-service"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "contact-service-error" : undefined}
            className="field-input"
            {...register("service")}
          >
            <option value="">{t("contact.form.servicePlaceholder")}</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {localizeText(service.name)}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="contact-service-error" className="field-error">
              {errors.service.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className="field-label">
            {t("contact.form.message")} <span className="text-rose-300">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder={t("contact.form.messagePlaceholder")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className="field-input resize-y"
            {...register("message")}
          />
          {errors.message && (
            <p id="contact-message-error" className="field-error">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-6 w-full" withArrow>
        <WhatsAppIcon className="h-4 w-4" />
        {t("contact.form.submit")}
      </Button>

      <p className="mt-3 text-center text-[10.5px] leading-relaxed text-white/55">
        {t("contact.form.note")}
      </p>
    </form>
  );
}
