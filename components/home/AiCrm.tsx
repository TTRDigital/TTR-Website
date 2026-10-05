import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck, MessageSquareText, PhoneMissed, Star } from "lucide-react";
import type { HomeContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pointIcons = [PhoneMissed, Bot, CalendarCheck, Star];

/* Example pipeline. Names are fictional and shown as an illustration. */
const columns = [
  { title: "New lead", tone: "border-line-strong", cards: [{ name: "Maria G.", meta: "Website form · Implants" }, { name: "Chris L.", meta: "Facebook ad · Roof check" }] },
  { title: "Contacted", tone: "border-violet-400/40", cards: [{ name: "Alex P.", meta: "AI agent replied" }] },
  { title: "Booked", tone: "border-violet-300/70", cards: [{ name: "Sam T.", meta: "Tue 10:30 AM · Estimate" }] },
];

export function AiCrm({ data }: { data: HomeContent["aiCrm"] }) {
  return (
    <section aria-labelledby="aicrm-title" className="section-pad relative overflow-hidden">
      <div aria-hidden="true" className="leak -left-40 top-1/3 h-[520px] w-[520px] opacity-35" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="aicrm-title" eyebrow={data.eyebrow} title={data.heading} intro={data.text} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {data.points.map((p, i) => {
              const Icon = pointIcons[i % pointIcons.length];
              return (
                <li key={p.title} data-reveal style={{ "--i": i } as React.CSSProperties}>
                  <Icon className="h-5 w-5 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-3 font-sans text-base font-medium text-hi">{p.title}</h3>
                  <p className="mt-1 text-small text-body">{p.text}</p>
                </li>
              );
            })}
          </ul>
          <div data-reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/services/gohighlevel-crm" className="group inline-flex min-h-11 items-center gap-2 font-medium text-hi">
              <span className="link-underline">GoHighLevel CRM</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <Link href="/services/ai-agents" className="group inline-flex min-h-11 items-center gap-2 font-medium text-hi">
              <span className="link-underline">AI agents</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div data-reveal aria-hidden="true" className="pipeline glass rounded-[24px] p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_2px_rgb(166_107_255/0.7)]" />
                <span className="text-small font-medium text-hi">Lead pipeline</span>
              </div>
              <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.6875rem] text-meta">Example view</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
              {columns.map((col, ci) => (
                <div key={col.title} className="min-w-0">
                  <div className="flex items-center justify-between px-1">
                    <span className="truncate text-micro font-medium text-body">{col.title}</span>
                    <span className="text-micro text-meta">{col.cards.length + (ci === 2 ? 1 : 0)}</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {col.cards.map((card, i) => (
                      <div
                        key={card.name}
                        className={`pipe-card rounded-xl border ${col.tone} bg-ink-950/80 p-2.5 sm:p-3`}
                        style={{ "--c": ci * 2 + i } as React.CSSProperties}
                      >
                        <p className="truncate text-micro font-medium text-hi sm:text-small">{card.name}</p>
                        <p className="mt-0.5 truncate text-[0.6875rem] text-meta">{card.meta}</p>
                      </div>
                    ))}
                    {ci === 2 ? (
                      <div className="pipe-move rounded-xl border border-violet-300/80 bg-[linear-gradient(135deg,rgb(110_31_168/0.5),rgb(18_16_28/0.9))] p-2.5 shadow-[0_0_30px_-6px_rgb(166_107_255/0.8)] sm:p-3">
                        <p className="truncate text-micro font-medium text-hi sm:text-small">Dan R.</p>
                        <p className="mt-0.5 truncate text-[0.6875rem] text-lavender-200">Booked by AI agent</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-line bg-ink-950/70 p-3 sm:p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[image:var(--grad-brand)] text-white">
                <MessageSquareText className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <div className="pipe-msg min-w-0">
                <p className="text-micro text-meta">AI agent · text message</p>
                <p className="mt-1 text-small text-hi">
                  Hi Dan, sorry we missed your call. I can get a tech out for your AC today. Does 2 PM or 4 PM work better?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
