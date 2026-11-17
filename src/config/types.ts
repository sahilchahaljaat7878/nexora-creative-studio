/**
 * Shared configuration types.
 * Keeping these here avoids circular imports between config files.
 */

export type Language = "en" | "hi";

export interface Localized {
  en: string;
  hi: string;
}

export interface LocalizedList {
  en: string[];
  hi: string[];
}

export type LocalizedText = Localized | string;

/** Resolve a localized value for the active language. */
export function localize(value: LocalizedText, lang: Language): string {
  return typeof value === "string" ? value : value[lang];
}

/** Resolve a localized list for the active language. */
export function localizeList(value: LocalizedList, lang: Language): string[] {
  return value[lang];
}
