import { useEffect } from "react";
import { brand } from "@/config/brand";
import { useLanguage } from "@/context/LanguageContext";

interface SeoOptions {
  title: string;
  description: string;
  /** Route path starting with "/" */
  path: string;
  /** Absolute or root-relative image path */
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

/** Page-specific metadata with Open Graph and Twitter cards. */
export function useSeo({ title, description, path, image, type = "website", noindex }: SeoOptions) {
  const { lang } = useLanguage();

  useEffect(() => {
    const url = `${brand.websiteUrl}${path}`;
    const imageUrl = image
      ? image.startsWith("http")
        ? image
        : `${brand.websiteUrl}${image}`
      : `${brand.websiteUrl}/favicon/og-image.png`;

    document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    setMeta('meta[property="og:locale"]', "property", "og:locale", lang === "hi" ? "hi_IN" : "en_IN");
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    setLink("canonical", url);
  }, [title, description, path, image, type, noindex, lang]);
}
