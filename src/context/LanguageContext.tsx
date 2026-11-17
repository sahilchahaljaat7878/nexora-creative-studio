import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type TranslationKey } from "@/config/translations";
import { localize, localizeList, type Language, type LocalizedList, type LocalizedText } from "@/config/types";
import { interpolate } from "@/lib/utils";

const STORAGE_KEY = "nexora-language";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  localizeText: (value: LocalizedText) => string;
  localizeList: (value: LocalizedList) => string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "hi") return stored;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* localStorage can be unavailable in private modes */
    }
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const dictionary = dictionaries[lang];
    return {
      lang,
      setLang,
      t: (key, vars) => interpolate(dictionary[key] ?? dictionaries.en[key] ?? key, vars),
      localizeText: (text) => localize(text, lang),
      localizeList: (list) => localizeList(list, lang),
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>.");
  }
  return context;
}
