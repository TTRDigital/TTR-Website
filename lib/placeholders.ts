/**
 * Placeholders look like [CLIENT RESULT]. They render as clearly marked
 * tags so nobody mistakes them for real content. Set
 * NEXT_PUBLIC_HIDE_PLACEHOLDERS=true to hide any block that still has one.
 */
export const showPlaceholders = process.env.NEXT_PUBLIC_HIDE_PLACEHOLDERS !== "true";

export function isPlaceholder(value: string | null | undefined): boolean {
  return !!value && /\[[A-Z0-9][A-Z0-9 /&'-]+\]/.test(value);
}
