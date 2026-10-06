/**
 * Placeholders look like [CLIENT RESULT]. Any block that still contains one
 * is hidden on the site, so the live site only shows real content. Fill the
 * field in /cms and the block appears. To review placeholders on a preview,
 * set NEXT_PUBLIC_SHOW_PLACEHOLDERS=true.
 */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export function isPlaceholder(value: string | null | undefined): boolean {
  return !!value && /\[[A-Z0-9][A-Z0-9 /&'-]+\]/.test(value);
}
