import {
  CheckCircle2,
  FileText,
  MousePointerClick,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/config/translations";
import { Reveal } from "@/components/ui/Reveal";

const steps: {
  icon: LucideIcon;
  title: TranslationKey;
  desc: TranslationKey;
}[] = [
  { icon: MousePointerClick, title: "home.process.step1.title", desc: "home.process.step1.desc" },
  { icon: FileText, title: "home.process.step2.title", desc: "home.process.step2.desc" },
  { icon: CheckCircle2, title: "home.process.step3.title", desc: "home.process.step3.desc" },
  { icon: PackageCheck, title: "home.process.step4.title", desc: "home.process.step4.desc" },
];

export function ProcessSteps() {
  const { t } = useLanguage();

  return (
    <div className="relative mt-14">
      <div
        aria-hidden="true"
        className="absolute left-[12%] right-[12%] top-[26px] hidden border-t border-dashed border-white/12 lg:block"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.08}>
            <article className="group relative h-full overflow-hidden rounded-[22px] border border-white/[0.09] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-violet/35">
              <div className="flex items-center justify-between">
                <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-white/10 bg-ink-800 text-violet-300 shadow-glow transition-colors duration-500 group-hover:border-brand-violet/40">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-4xl font-bold text-white/[0.07] transition-colors duration-500 group-hover:text-white/[0.12]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[15px] font-semibold text-white">
                {t(step.title)}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{t(step.desc)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
