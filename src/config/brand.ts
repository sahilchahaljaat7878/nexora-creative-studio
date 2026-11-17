/**
 * Brand identity — change the studio name, founder and tagline here.
 * The logo component reads directly from this file.
 */
export const brand = {
  name: "NEXORA",
  fullName: "Nexora Creative Studio",
  founder: "Sahil",
  tagline: "CREATE. DESIGN. INSPIRE.",
  taglineParts: ["CREATE", "DESIGN", "INSPIRE"],
  /** Used for page titles, social cards and structured data. */
  description:
    "Nexora Creative Studio is a digital creative service brand founded by Sahil. We turn ideas into premium AI visuals, cinematic videos, striking design and modern websites.",
  shortDescription:
    "Premium AI visuals, cinematic videos, creative design and modern websites for brands that want to stand out.",
  /** Update this to your live domain once deployed (no trailing slash). */
  websiteUrl: "https://nexora-creative-studio.web.app",
  copyrightYear: 2026,
  logo: {
    /** Abstract N mark — unique to Nexora. */
    markViewBox: "0 0 64 64",
  },
} as const;

export type Brand = typeof brand;
