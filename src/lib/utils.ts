type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Join conditional class names into a single string. */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity as 1)
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .join(" ");
}

/** Simple template interpolation for translated strings: "Hello {name}". */
export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  );
}
