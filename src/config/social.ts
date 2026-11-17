/**
 * Social media links.
 * Leave a URL empty ("") to hide that icon across the site.
 * Only configured links are rendered, so there are no dead links.
 */
export interface SocialLink {
  id: "instagram" | "youtube" | "facebook" | "linkedin" | "behance";
  label: string;
  url: string;
}

export const socialLinks: SocialLink[] = [
  { id: "instagram", label: "Instagram", url: "" },
  { id: "youtube", label: "YouTube", url: "" },
  { id: "facebook", label: "Facebook", url: "" },
  { id: "linkedin", label: "LinkedIn", url: "" },
  { id: "behance", label: "Behance", url: "" },
];

export const configuredSocialLinks = socialLinks.filter((link) => link.url.trim().length > 0);
