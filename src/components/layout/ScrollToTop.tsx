import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Reset scroll on route changes, or scroll to an in-page anchor. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector<HTMLElement>(hash);
      if (target) {
        window.setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
