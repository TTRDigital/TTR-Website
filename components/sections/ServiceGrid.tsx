import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceSummary } from "@/lib/content";
import { ServiceIcon } from "@/components/ui/icons";
import { Spotlight } from "@/components/motion/Spotlight";

/** Grid of service cards with the cursor spotlight. */
export function ServiceGrid({ services, columns = 4 }: { services: ServiceSummary[]; columns?: 3 | 4 }) {
  return (
    <Spotlight className={`grid gap-4 sm:grid-cols-2 lg:gap-5 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {services.map((s, i) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          data-spotlight
          data-reveal
          style={{ "--i": i % 4 } as React.CSSProperties}
          className="spotlight group/tile relative flex min-h-[260px] flex-col overflow-hidden rounded-[20px] border border-line bg-[linear-gradient(180deg,var(--ink-850),var(--ink-900))] p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_24px_60px_-30px_rgb(138_47_208/0.7)]"
        >
          <div className="relative z-[1] flex items-start justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-white/[0.03] text-violet-300 transition-colors duration-300 group-hover/tile:border-violet-400/50 group-hover/tile:text-lavender-100">
              <ServiceIcon slug={s.slug} className="h-5 w-5" />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-meta transition-[color,border-color,transform] duration-300 group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5 group-hover/tile:border-violet-400/50 group-hover/tile:text-hi">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </div>
          <h3 className="relative z-[1] mt-auto pt-10 text-[1.375rem] font-semibold leading-tight tracking-[-0.02em]">{s.title}</h3>
          <p className="relative z-[1] mt-2 text-small text-body">{s.summary}</p>
        </Link>
      ))}
    </Spotlight>
  );
}
