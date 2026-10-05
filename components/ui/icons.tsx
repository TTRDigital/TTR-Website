import {
  Bot,
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  MousePointerClick,
  Search,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/** One icon per service, thin line set, 1.5px stroke everywhere. */
export const serviceIcons: Record<string, LucideIcon> = {
  seo: Search,
  "search-everywhere-optimization": Sparkles,
  "google-ads": MousePointerClick,
  "meta-ads": Megaphone,
  "website-design": MonitorSmartphone,
  "social-media-marketing": MessagesSquare,
  "gohighlevel-crm": Workflow,
  "ai-agents": Bot,
};

export function ServiceIcon({ slug, className = "h-5 w-5" }: { slug: string; className?: string }) {
  const Icon = serviceIcons[slug] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.5} aria-hidden="true" />;
}

/* lucide v1 ships no brand marks, so these are minimal inline glyphs. */
type SocialProps = { network: "facebook" | "instagram" | "linkedin"; className?: string };

export function SocialIcon({ network, className = "h-5 w-5" }: SocialProps) {
  const common = { className, viewBox: "0 0 24 24", "aria-hidden": true as const, fill: "currentColor" };
  if (network === "facebook")
    return (
      <svg {...common}>
        <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
      </svg>
    );
  if (network === "instagram")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M6.9 8.9H4V20h2.9V8.9ZM5.5 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 13.6c0-3-1.6-4.9-4.2-4.9-1.4 0-2.4.8-2.8 1.5V8.9h-2.8V20h2.9v-5.9c0-1.5.6-2.6 2-2.6s1.9 1 1.9 2.6V20H20v-6.4Z" />
    </svg>
  );
}
