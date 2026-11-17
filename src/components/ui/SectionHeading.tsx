import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow", align === "center" && "justify-center")}>
          <span className="eyebrow-dash" />
          {eyebrow}
          {align === "center" && <span className="eyebrow-dash rotate-180" />}
        </p>
      )}
      <h2
        id={id}
        className="mt-5 font-display text-3xl font-semibold uppercase leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
