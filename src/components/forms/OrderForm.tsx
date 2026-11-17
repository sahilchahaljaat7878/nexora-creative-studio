import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  FileImage,
  FileText,
  FileVideo,
  Info,
  Mail,
  RotateCcw,
  Send,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { contact, isEmailConfigured, isWhatsAppConfigured } from "@/config/contact";
import { pricing } from "@/config/pricing";
import { getServiceById, services } from "@/config/services";
import { useLanguage } from "@/context/LanguageContext";
import { saveRecord } from "@/lib/api";
import { copyText } from "@/lib/clipboard";
import { packagePriceLabel } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import {
  buildEmailLink,
  buildInquiryMessage,
  openWhatsApp,
} from "@/utils/whatsapp";
import type { TranslationKey } from "@/config/translations";

type Status = "idle" | "ready" | "fallback";

interface UploadedFile {
  file: File;
  url: string;
}

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const IMAGE_MAX = 5 * 1024 * 1024;
const VIDEO_MAX = 50 * 1024 * 1024;

const todayISO = (() => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
})();

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function emptyValues() {
  return {
    service: "",
    package: "",
    fullName: "",
    whatsapp: "",
    email: "",
    country: "",
    description: "",
    deliveryDate: "",
    instructions: "",
    agree: false,
  };
}

interface OrderFormProps {
  className?: string;
}

export function OrderForm({ className }: OrderFormProps) {
  const { t, lang, localizeText } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const appliedParams = useRef(searchParams.toString());

  const defaultValues = useMemo(() => {
    const base = emptyValues();
    const service = getServiceById(initialParams.get("service") ?? "");
    if (!service) return base;
    const requestedPackage = initialParams.get("package") ?? "";
    const pkg = service.packages.find((item) => item.pricingKey === requestedPackage);
    return {
      ...base,
      service: service.id,
      package: pkg?.pricingKey ?? "",
    };
  }, [initialParams]);

  const schema = useMemo(
    () =>
      z.object({
        service: z.string().min(1, { message: t("order.validation.serviceRequired") }),
        package: z.string().min(1, { message: t("order.validation.packageRequired") }),
        fullName: z
          .string()
          .trim()
          .min(1, { message: t("order.validation.nameRequired") })
          .min(2, { message: t("order.validation.nameMin") }),
        whatsapp: z
          .string()
          .trim()
          .min(1, { message: t("order.validation.whatsappRequired") })
          .refine((value) => {
            const digits = value.replace(/\D/g, "");
            return digits.length >= 8 && digits.length <= 15;
          }, { message: t("order.validation.whatsappInvalid") }),
        email: z
          .string()
          .trim()
          .optional()
          .refine(
            (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            { message: t("order.validation.emailInvalid") }
          ),
        country: z.string().trim().min(2, { message: t("order.validation.countryRequired") }),
        description: z
          .string()
          .trim()
          .min(1, { message: t("order.validation.descriptionRequired") })
          .min(20, { message: t("order.validation.descriptionMin") }),
        deliveryDate: z
          .string()
          .optional()
          .refine((value) => {
            if (!value) return true;
            const date = new Date(`${value}T00:00:00`);
            if (Number.isNaN(date.getTime())) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today;
          }, { message: t("order.validation.dateInvalid") }),
        instructions: z.string().optional(),
        agree: z.boolean().refine((value) => value, {
          message: t("order.validation.agreeRequired"),
        }),
      }),
    [t]
  );

  type FormValues = z.infer<typeof schema>;

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [savedToRecords, setSavedToRecords] = useState<boolean | null>(null);
  const [imageFile, setImageFile] = useState<UploadedFile | null>(null);
  const [videoFile, setVideoFile] = useState<UploadedFile | null>(null);
  const [uploadError, setUploadError] = useState<{ field: "image" | "video"; message: string } | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues,
  });

  const values = watch();
  const selectedServiceId = values.service;
  const selectedPackageKey = values.package;
  const selectedService = getServiceById(selectedServiceId);
  const selectedPackage = selectedService?.packages.find(
    (pkg) => pkg.pricingKey === selectedPackageKey
  );
  const priceLabel = selectedPackage ? packagePriceLabel(selectedPackage, t) : null;
  const packages = selectedService?.packages ?? [];

  useEffect(() => {
    if (!selectedService) return;
    if (
      selectedPackageKey &&
      !selectedService.packages.some((pkg) => pkg.pricingKey === selectedPackageKey)
    ) {
      setValue("package", "");
    }
  }, [selectedService, selectedPackageKey, setValue]);

  useEffect(() => {
    const raw = searchParams.toString();
    if (raw === appliedParams.current) return;
    appliedParams.current = raw;
    const service = getServiceById(searchParams.get("service") ?? "");
    if (!service) return;
    const requestedPackage = searchParams.get("package") ?? "";
    const pkg = service.packages.find((item) => item.pricingKey === requestedPackage);
    setValue("service", service.id);
    setValue("package", pkg?.pricingKey ?? "");
  }, [searchParams, setValue]);

  useEffect(() => {
    return () => {
      if (imageFile) URL.revokeObjectURL(imageFile.url);
    };
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (videoFile) URL.revokeObjectURL(videoFile.url);
    };
  }, [videoFile]);

  useEffect(() => {
    setCopied(false);
  }, [message]);

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [status]);

  const buildMessage = (data: FormValues): string => {
    const service = getServiceById(data.service);
    const pkg = service?.packages.find((item) => item.pricingKey === data.package);
    return buildInquiryMessage(
      {
        fullName: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email,
        country: data.country,
        service: service ? localizeText(service.name) : data.service,
        packageName: pkg ? localizeText(pkg.name) : undefined,
        priceLabel: pkg ? packagePriceLabel(pkg, t) : undefined,
        description: data.description,
        deliveryDate: data.deliveryDate,
        instructions: data.instructions,
        imageName: imageFile?.file.name,
        videoName: videoFile?.file.name,
      },
      lang
    );
  };

  const previewMessage = selectedService && selectedPackage ? buildMessage(values) : "";

  const handleFile = (
    kind: "image" | "video",
    fileList: FileList | null
  ) => {
    const file = fileList?.[0];
    if (!file) return;

    if (kind === "image") {
      if (!IMAGE_TYPES.includes(file.type)) {
        setUploadError({ field: "image", message: t("order.validation.imageType") });
        if (imageInputRef.current) imageInputRef.current.value = "";
        return;
      }
      if (file.size > IMAGE_MAX) {
        setUploadError({ field: "image", message: t("order.validation.imageSize") });
        if (imageInputRef.current) imageInputRef.current.value = "";
        return;
      }
      setImageFile({ file, url: URL.createObjectURL(file) });
    } else {
      if (!VIDEO_TYPES.includes(file.type)) {
        setUploadError({ field: "video", message: t("order.validation.videoType") });
        if (videoInputRef.current) videoInputRef.current.value = "";
        return;
      }
      if (file.size > VIDEO_MAX) {
        setUploadError({ field: "video", message: t("order.validation.videoSize") });
        if (videoInputRef.current) videoInputRef.current.value = "";
        return;
      }
      setVideoFile({ file, url: URL.createObjectURL(file) });
    }

    setUploadError(null);
  };

  const removeFile = (kind: "image" | "video") => {
    if (kind === "image") {
      setImageFile(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
    } else {
      setVideoFile(null);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
    setUploadError(null);
  };

  const nextStep = async () => {
    const fields: (keyof FormValues)[] =
      step === 0 ? ["service", "package"] : ["description", "deliveryDate"];
    const valid = await trigger(fields);
    if (!valid) return;
    if (step === 1 && uploadError) return;
    setStep((current) => Math.min(current + 1, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  const onSubmit = async (data: FormValues) => {
    const prepared = buildMessage(data);
    setMessage(prepared);
    setPreviewOpen(false);

    // Save a copy in the studio records (admin panel) before opening WhatsApp.
    const service = getServiceById(data.service);
    const pkg = service?.packages.find((item) => item.pricingKey === data.package);
    const saved = await saveRecord({
      type: "order",
      name: data.fullName,
      whatsapp: data.whatsapp,
      email: data.email,
      country: data.country,
      service: service ? localizeText(service.name) : data.service,
      package: pkg ? localizeText(pkg.name) : undefined,
      price: pkg ? (pricing[pkg.pricingKey].amount ?? null) : null,
      description: data.description,
      deliveryDate: data.deliveryDate,
      instructions: data.instructions,
      hasReferenceImage: Boolean(imageFile),
      hasReferenceVideo: Boolean(videoFile),
      locale: lang,
    });
    setSavedToRecords(saved.ok);

    setStatus(openWhatsApp(prepared) ? "ready" : "fallback");
  };

  const handleCopy = async () => {
    if (await copyText(message)) setCopied(true);
  };

  const handleReset = () => {
    reset(emptyValues());
    setImageFile(null);
    setVideoFile(null);
    setUploadError(null);
    setStep(0);
    setStatus("idle");
    setMessage("");
    setCopied(false);
    setPreviewOpen(false);
    setSavedToRecords(null);
    appliedParams.current = "";
    setSearchParams({}, { replace: true });
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const steps: { key: TranslationKey }[] = [
    { key: "order.step.service" },
    { key: "order.step.details" },
    { key: "order.step.contact" },
  ];

  return (
    <div className={cn("grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10", className)}>
      <div ref={resultRef} className="scroll-mt-24">
        {status !== "idle" ? (
          <div className="rounded-[26px] border border-white/10 bg-ink-800/70 p-6 shadow-card sm:p-8">
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl border",
                status === "ready"
                  ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-300/25 bg-amber-400/10 text-amber-200"
              )}
            >
              {status === "ready" ? (
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FileText className="h-6 w-6" aria-hidden="true" />
              )}
            </span>

            <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
              {status === "ready"
                ? t("order.success.title")
                : isWhatsAppConfigured()
                  ? t("order.fallback.title")
                  : t("order.fallback.readyTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {status === "ready"
                ? t("order.success.intro")
                : isWhatsAppConfigured()
                  ? t("order.fallback.body")
                  : t("order.fallback.readyBody")}
            </p>

            {status === "ready" && (
              <ol className="mt-5 space-y-2.5">
                {[t("order.success.step1"), t("order.success.step2"), t("order.success.step3")].map(
                  (item, index) => (
                    <li key={item} className="flex items-start gap-3 text-[12.5px] text-white/65">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-[9px] text-white/50">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ol>
            )}

            <p className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.04] px-3.5 py-3 text-[10.5px] leading-relaxed text-amber-100/65">
              {t("order.success.notConfirmed")}
            </p>

            {savedToRecords !== null && (
              <p className="mt-3 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[10.5px] leading-relaxed text-white/60">
                {savedToRecords ? (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
                ) : (
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-200" aria-hidden="true" />
                )}
                {savedToRecords ? t("order.success.savedToRecords") : t("order.success.notSaved")}
              </p>
            )}

            <div className="mt-5 rounded-2xl border border-white/10 bg-ink/60 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                {t("order.previewTitle")}
              </p>
              <pre className="mt-3 max-h-80 overflow-y-auto whitespace-pre-wrap break-words font-sans text-[11.5px] leading-relaxed text-white/65">
                {message}
              </pre>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {isWhatsAppConfigured() && (
                <Button type="button" size="sm" onClick={() => openWhatsApp(message)}>
                  <WhatsAppIcon className="h-4 w-4" />
                  {t("order.success.openAgain")}
                </Button>
              )}
              <Button type="button" size="sm" variant="secondary" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
                {copied ? t("order.success.copied") : t("order.fallback.copy")}
              </Button>
              {isEmailConfigured() ? (
                <a
                  href={
                    buildEmailLink(
                      lang === "hi" ? "à¤¨à¤ˆ à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤ªà¥‚à¤›à¤¤à¤¾à¤›" : "New project enquiry",
                      message
                    ) ?? `mailto:${contact.email}`
                  }
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
                >
                  <Mail className="h-4 w-4 text-violet-300" />
                  {t("order.fallback.email")}
                </a>
              ) : (
                <span className="inline-flex h-auto items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[10.5px] leading-relaxed text-white/55">
                  <Mail className="h-4 w-4 shrink-0" />
                  {t("contact.fallback.emailUnavailable")}
                </span>
              )}
              <Button type="button" size="sm" variant="ghost" onClick={handleReset}>
                <RotateCcw className="h-3.5 w-3.5" />
                {t("order.success.newOrder")}
              </Button>
            </div>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-[26px] border border-white/10 bg-ink-800/70 shadow-card"
          >
            <div className="border-b border-white/[0.08] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300">
                  {t("order.stepOf", { current: step + 1, total: 3 })}
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
                  {t("brand.tagline")}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {steps.map((item, index) => {
                  const complete = index < step;
                  const active = index === step;
                  return (
                    <div
                      key={item.key}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors",
                        active
                          ? "border-brand-violet/45 bg-brand-violet/10"
                          : complete
                            ? "border-emerald-400/25 bg-emerald-500/[0.06]"
                            : "border-white/[0.07] bg-white/[0.02]"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
                          active
                            ? "bg-brand-gradient text-white"
                            : complete
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-white/[0.06] text-white/55"
                        )}
                      >
                        {complete ? <Check className="h-3 w-3" /> : index + 1}
                      </span>
                      <span
                        className={cn(
                          "truncate text-[10.5px] font-semibold",
                          active ? "text-white" : "text-white/45"
                        )}
                      >
                        {t(item.key)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 sm:p-7">
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="order-service" className="field-label">
                      {t("order.service")} <span className="text-rose-300">*</span>
                    </label>
                    <select
                      id="order-service"
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? "order-service-error" : undefined}
                      className="field-input"
                      {...register("service")}
                    >
                      <option value="">{t("order.servicePlaceholder")}</option>
                      {services.map((option) => (
                        <option key={option.id} value={option.id}>
                          {localizeText(option.name)}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id="order-service-error" className="field-error">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order-package" className="field-label">
                      {t("order.package")} <span className="text-rose-300">*</span>
                    </label>
                    <select
                      id="order-package"
                      disabled={!selectedService}
                      aria-invalid={Boolean(errors.package)}
                      aria-describedby={errors.package ? "order-package-error" : "order-package-hint"}
                      className="field-input disabled:cursor-not-allowed disabled:opacity-45"
                      {...register("package")}
                    >
                      <option value="">
                        {selectedService ? t("order.packagePlaceholder") : t("order.packageHint")}
                      </option>
                      {packages.map((pkg) => (
                        <option key={pkg.pricingKey} value={pkg.pricingKey}>
                          {localizeText(pkg.name)} — {packagePriceLabel(pkg, t)}
                        </option>
                      ))}
                    </select>
                    {errors.package ? (
                      <p id="order-package-error" className="field-error">
                        {errors.package.message}
                      </p>
                    ) : (
                      <p id="order-package-hint" className="field-hint">
                        {selectedService ? t("order.summaryNote") : t("order.packageHint")}
                      </p>
                    )}
                  </div>

                  {selectedPackage && (
                    <div className="rounded-2xl border border-brand-violet/25 bg-brand-violet/[0.07] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-violet-300/80">
                            {t("order.summaryPrice")}
                          </p>
                          <p className="mt-1 font-display text-lg font-semibold text-white">
                            {priceLabel}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-ink/40 px-3 py-1 text-[10px] text-white/45">
                          {localizeText(selectedPackage.name)}
                        </span>
                      </div>
                      <p className="mt-2 text-[10.5px] leading-relaxed text-white/55">
                        {t("order.summaryNote")}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end pt-1">
                    <Button type="button" onClick={nextStep} withArrow>
                      {t("order.next")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="order-description" className="field-label">
                      {t("order.description")} <span className="text-rose-300">*</span>
                    </label>
                    <textarea
                      id="order-description"
                      rows={5}
                      placeholder={t("order.descriptionPlaceholder")}
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={errors.description ? "order-description-error" : undefined}
                      className="field-input resize-y"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p id="order-description-error" className="field-error">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="order-date" className="field-label">
                        {t("order.deliveryDate")}{" "}
                        <span className="font-normal normal-case tracking-normal text-white/50">
                          ({t("common.optional")})
                        </span>
                      </label>
                      <input
                        id="order-date"
                        type="date"
                        min={todayISO}
                        aria-invalid={Boolean(errors.deliveryDate)}
                        aria-describedby={errors.deliveryDate ? "order-date-error" : "order-date-hint"}
                        className="field-input"
                        {...register("deliveryDate")}
                      />
                      {errors.deliveryDate ? (
                        <p id="order-date-error" className="field-error">
                          {errors.deliveryDate.message}
                        </p>
                      ) : (
                        <p id="order-date-hint" className="field-hint">
                          {t("order.deliveryDateHint")}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="order-instructions" className="field-label">
                        {t("order.instructions")}{" "}
                        <span className="font-normal normal-case tracking-normal text-white/50">
                          ({t("common.optional")})
                        </span>
                      </label>
                      <input
                        id="order-instructions"
                        type="text"
                        placeholder={t("order.instructionsPlaceholder")}
                        className="field-input"
                        {...register("instructions")}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
                    <div className="flex items-start gap-2">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" aria-hidden="true" />
                      <p className="text-[10.5px] leading-relaxed text-white/55">
                        {t("order.upload.note")}
                      </p>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="field-label">{t("order.upload.imageLabel")}</p>
                        <input
                          ref={imageInputRef}
                          id="order-image"
                          type="file"
                          accept={IMAGE_TYPES.join(",")}
                          className="sr-only"
                          onChange={(event) => handleFile("image", event.target.files)}
                        />
                        {imageFile ? (
                          <div className="rounded-xl border border-white/10 bg-ink/50 p-3">
                            <div className="flex items-start gap-3">
                              <img
                                src={imageFile.url}
                                alt={t("order.upload.selected")}
                                className="h-16 w-16 shrink-0 rounded-lg border border-white/10 object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[11px] font-medium text-white/80">
                                  {imageFile.file.name}
                                </p>
                                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/55">
                                  <FileImage className="h-3 w-3" aria-hidden="true" />
                                  {formatBytes(imageFile.file.size)}
                                </p>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                  <label
                                    htmlFor="order-image"
                                    className="cursor-pointer text-[10px] font-semibold text-violet-300 hover:text-white"
                                  >
                                    {t("order.upload.replace")}
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => removeFile("image")}
                                    className="inline-flex items-center gap-1 text-[10px] text-rose-300/80 hover:text-rose-200"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                    {t("order.upload.remove")}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <label
                            htmlFor="order-image"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-ink/30 px-4 py-6 text-center transition-colors hover:border-brand-violet/40 hover:bg-ink/50"
                          >
                            <Upload className="h-5 w-5 text-white/50" aria-hidden="true" />
                            <span className="text-[11px] font-semibold text-white/60">
                              {t("order.upload.choose")}
                            </span>
                            <span className="text-[9.5px] text-white/50">
                              {t("order.upload.imageHint")}
                            </span>
                          </label>
                        )}
                        {uploadError?.field === "image" && (
                          <p className="field-error">{uploadError.message}</p>
                        )}
                      </div>

                      <div>
                        <p className="field-label">{t("order.upload.videoLabel")}</p>
                        <input
                          ref={videoInputRef}
                          id="order-video"
                          type="file"
                          accept={VIDEO_TYPES.join(",")}
                          className="sr-only"
                          onChange={(event) => handleFile("video", event.target.files)}
                        />
                        {videoFile ? (
                          <div className="rounded-xl border border-white/10 bg-ink/50 p-3">
                            <video
                              src={videoFile.url}
                              controls
                              muted
                              playsInline
                              className="h-24 w-full rounded-lg border border-white/10 object-cover"
                            />
                            <div className="mt-2 flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-[11px] font-medium text-white/80">
                                  {videoFile.file.name}
                                </p>
                                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/55">
                                  <FileVideo className="h-3 w-3" aria-hidden="true" />
                                  {formatBytes(videoFile.file.size)}
                                </p>
                              </div>
                              <div className="flex shrink-0 flex-col items-end gap-1.5">
                                <label
                                  htmlFor="order-video"
                                  className="cursor-pointer text-[10px] font-semibold text-violet-300 hover:text-white"
                                >
                                  {t("order.upload.replace")}
                                </label>
                                <button
                                  type="button"
                                  onClick={() => removeFile("video")}
                                  className="inline-flex items-center gap-1 text-[10px] text-rose-300/80 hover:text-rose-200"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  {t("order.upload.remove")}
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <label
                            htmlFor="order-video"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-ink/30 px-4 py-6 text-center transition-colors hover:border-brand-violet/40 hover:bg-ink/50"
                          >
                            <Upload className="h-5 w-5 text-white/50" aria-hidden="true" />
                            <span className="text-[11px] font-semibold text-white/60">
                              {t("order.upload.choose")}
                            </span>
                            <span className="text-[9.5px] text-white/50">
                              {t("order.upload.videoHint")}
                            </span>
                          </label>
                        )}
                        {uploadError?.field === "video" && (
                          <p className="field-error">{uploadError.message}</p>
                        )}
                      </div>
                    </div>

                    <p className="mt-4 text-[10px] leading-relaxed text-white/50">
                      {t("order.upload.attachNote")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <Button type="button" variant="secondary" onClick={previousStep}>
                      <ArrowLeft className="h-4 w-4" />
                      {t("order.back")}
                    </Button>
                    <Button type="button" onClick={nextStep} withArrow>
                      {t("order.next")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="order-name" className="field-label">
                      {t("order.fullName")} <span className="text-rose-300">*</span>
                    </label>
                    <input
                      id="order-name"
                      type="text"
                      autoComplete="name"
                      placeholder={t("order.namePlaceholder")}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? "order-name-error" : undefined}
                      className="field-input"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p id="order-name-error" className="field-error">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="order-whatsapp" className="field-label">
                        {t("order.whatsapp")} <span className="text-rose-300">*</span>
                      </label>
                      <input
                        id="order-whatsapp"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder={t("order.whatsappPlaceholder")}
                        aria-invalid={Boolean(errors.whatsapp)}
                        aria-describedby={errors.whatsapp ? "order-whatsapp-error" : "order-whatsapp-hint"}
                        className="field-input"
                        {...register("whatsapp")}
                      />
                      {errors.whatsapp ? (
                        <p id="order-whatsapp-error" className="field-error">
                          {errors.whatsapp.message}
                        </p>
                      ) : (
                        <p id="order-whatsapp-hint" className="field-hint">
                          {t("order.whatsappHint")}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="order-email" className="field-label">
                        {t("order.email")}{" "}
                        <span className="font-normal normal-case tracking-normal text-white/50">
                          ({t("common.optional")})
                        </span>
                      </label>
                      <input
                        id="order-email"
                        type="email"
                        autoComplete="email"
                        placeholder={t("order.emailPlaceholder")}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "order-email-error" : undefined}
                        className="field-input"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p id="order-email-error" className="field-error">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="order-country" className="field-label">
                      {t("order.country")} <span className="text-rose-300">*</span>
                    </label>
                    <input
                      id="order-country"
                      type="text"
                      autoComplete="country-name"
                      placeholder={t("order.countryPlaceholder")}
                      aria-invalid={Boolean(errors.country)}
                      aria-describedby={errors.country ? "order-country-error" : undefined}
                      className="field-input"
                      {...register("country")}
                    />
                    {errors.country && (
                      <p id="order-country-error" className="field-error">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-[11.5px] leading-relaxed text-white/55">
                      <input
                        type="checkbox"
                        aria-invalid={Boolean(errors.agree)}
                        aria-describedby={errors.agree ? "order-agree-error" : undefined}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-ink-800 accent-brand-violet"
                        {...register("agree")}
                      />
                      <span>
                        {t("order.agree.before")}{" "}
                        <a
                          href="/terms-and-conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-violet-300 underline decoration-violet-300/30 underline-offset-2 hover:text-white"
                        >
                          {t("order.agree.terms")}
                        </a>{" "}
                        {t("order.agree.and")}{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-violet-300 underline decoration-violet-300/30 underline-offset-2 hover:text-white"
                        >
                          {t("order.agree.privacy")}
                        </a>
                        {t("order.agree.after")}
                      </span>
                    </label>
                    {errors.agree && (
                      <p id="order-agree-error" className="field-error">
                        {errors.agree.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <Button type="button" variant="secondary" onClick={previousStep}>
                      <ArrowLeft className="h-4 w-4" />
                      {t("order.back")}
                    </Button>
                    <Button type="submit" withArrow>
                      <Send className="h-4 w-4" />
                      {t("order.submit")}
                    </Button>
                  </div>

                  <p className="text-center text-[10.5px] leading-relaxed text-white/55">
                    {t("order.secureNote")}
                  </p>
                </div>
              )}
            </div>
          </form>
        )}
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[26px] border border-white/10 bg-ink-800/70 p-6 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-white">
              {t("order.summaryTitle")}
            </h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
              NEXORA
            </span>
          </div>

          {selectedService ? (
            <div className="mt-5 space-y-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                  {t("order.serviceLabel")}
                </p>
                <p className="mt-1 text-[13px] font-semibold text-white">
                  {localizeText(selectedService.name)}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                  {t("order.packageLabel")}
                </p>
                <p className="mt-1 text-[13px] font-semibold text-white/80">
                  {selectedPackage ? localizeText(selectedPackage.name) : t("order.packagePlaceholder")}
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                  {t("order.summaryPrice")}
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-white">
                  {priceLabel ?? t("order.packagePlaceholder")}
                </p>
                <p className="mt-2 text-[10.5px] leading-relaxed text-white/55">
                  {t("order.summaryNote")}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-[11px] leading-relaxed text-white/55">
              {t("order.summaryEmpty")}
            </p>
          )}

          <div className="mt-5 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setPreviewOpen((value) => !value)}
              disabled={!previewMessage}
              className="inline-flex items-center gap-2 text-[11px] font-semibold text-violet-300 transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-white/20"
            >
              {previewOpen ? t("order.previewHide") : t("order.previewToggle")}
            </button>
            {previewOpen && previewMessage && (
              <pre className="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-ink/60 p-3.5 font-sans text-[10.5px] leading-relaxed text-white/55">
                {previewMessage}
              </pre>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-[22px] border border-white/10 bg-white/[0.02] p-4">
          <p className="flex items-start gap-2 text-[10px] leading-relaxed text-white/55">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" aria-hidden="true" />
            {t("order.secureNote")}
          </p>
          <p className="flex items-start gap-2 text-[10px] leading-relaxed text-white/50">
            <FileImage className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t("order.upload.note")}
          </p>
        </div>
      </aside>
    </div>
  );
}
