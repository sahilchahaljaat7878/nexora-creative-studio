import { Link } from "react-router-dom";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

/** Abstract N mark, unique to Haryana Creative. */
export function LogoMark({
  className,
}: {
  className?: string;
  plain?: boolean;
}) {
  return (
    <img
      src="/favicon/logo.png"
      alt="Haryana Creative logo"
      className={cn("shrink-0 object-contain", className)}
      decoding="async"
      loading="eager"
    />
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
