import { useId } from "react";
import { Link } from "react-router-dom";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

/** Abstract N mark, unique to Haryana Creative. */
export function LogoMark({
  className,
  plain = false,
}: {
  className?: string;
  plain?: boolean;
}) {
  const rawId = useId().replace(/[:]/g, "");
  const gradientId = `haryana-mark-${rawId}`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Haryana Creative logo"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C4B5FD" />
          <stop offset="0.45" stopColor="#A855F7" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      {!plain && (
        <>
          <rect width="64" height="64" rx="15" fill="#11111B" />
          <rect
            x="1"
            y="1"
            width="62"
            height="62"
            rx="14"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
          />
        </>
      )}
      <path
        d="M17 46 V19 L47 46 V19"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="15" r="3.4" fill="#E9D5FF" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName = "h-10 w-10",
  showTagline = true,
}: {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <LogoMark className={cn("transition-transform duration-500 group-hover:rotate-3", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-[0.22em] text-white">
          {brand.name}
        </span>
        {showTagline && (
          <span className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.36em] text-muted transition-colors duration-300 group-hover:text-violet-300">
            Creative Studio
          </span>
        )}
      </span>
      <span className="sr-only">— home</span>
    </Link>
  );
}
