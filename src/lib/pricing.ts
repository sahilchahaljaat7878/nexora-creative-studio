import { pricing, type PricingKey } from "@/config/pricing";
import type { ServicePackage } from "@/config/services";
import type { TranslationKey } from "@/config/translations";

/** Format an amount in Indian Rupees, e.g. 4999 → ₹4,999 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export type PriceDisplay =
  | { kind: "fixed"; amount: number; label: string }
  | { kind: "from"; amount: number; label: string }
  | { kind: "onwards"; amount: number; label: string }
  | { kind: "quote"; amount: null; labelKey: TranslationKey };

interface BuildPriceOptions {
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

/**
 * Build a localized price display for a package.
 * All amounts come from src/config/pricing.ts.
 */
export function getPriceDisplay(
  pricingKey: PricingKey,
  { t }: BuildPriceOptions
): PriceDisplay {
  const config = pricing[pricingKey];
  const amount = config.amount;

  if (amount === null) {
    return { kind: "quote", amount: null, labelKey: "pricing.contactForPrice" };
  }

  if (config.prefix === "starting") {
    return {
      kind: "from",
      amount,
      label: `${t("pricing.startingFrom")} ${formatINR(amount)}`,
    };
  }

  if (config.prefix === "onwards") {
    return {
      kind: "onwards",
      amount,
      label: `${formatINR(amount)} ${t("pricing.onwards")}`,
    };
  }

  return { kind: "fixed", amount, label: formatINR(amount) };
}

/** Render a package price label, honoring "Contact for Price" for unset prices. */
export function packagePriceLabel(
  pkg: ServicePackage,
  t: (key: TranslationKey) => string
): string {
  const display = getPriceDisplay(pkg.pricingKey, { t });
  return display.kind === "quote" ? t(display.labelKey) : display.label;
}

/** Lowest configured amount in a service, used for "starting from" labels. */
export function lowestServicePrice(pricingKeys: PricingKey[]): number | null {
  const amounts = pricingKeys
    .map((key) => pricing[key].amount)
    .filter((amount): amount is number => typeof amount === "number");
  return amounts.length ? Math.min(...amounts) : null;
}

/** Build the /order link with service and optionally package pre-filled. */
export function orderLink(serviceId?: string, pricingKey?: string): string {
  const params = new URLSearchParams();
  if (serviceId) params.set("service", serviceId);
  if (pricingKey) params.set("package", pricingKey);
  const query = params.toString();
  return query ? `/order?${query}` : "/order";
}

/** Human-readable date for the WhatsApp message. */
export function formatDateForMessage(value: string): string {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
