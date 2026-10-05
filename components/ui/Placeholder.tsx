import { isPlaceholder } from "@/lib/placeholders";

/**
 * Renders text, or a clearly marked tag when the text is a placeholder
 * like [CLIENT RESULT] that still needs real client info.
 */
export function Text({ value, className = "" }: { value: string; className?: string }) {
  if (!isPlaceholder(value)) return <span className={className}>{value}</span>;
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md border border-dashed border-cyan-400/60 bg-cyan-400/10 px-2 py-0.5 font-mono text-[0.8em] font-medium tracking-tight text-cyan-400 ${className}`}
      title="Placeholder: replace with real client information in /cms"
    >
      {value}
    </span>
  );
}
