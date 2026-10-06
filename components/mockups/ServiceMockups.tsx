/* Small HTML UI mockups for service page heroes. Decorative only: hidden
   from assistive tech, labelled "Example view", made-up data. */
import type { ReactNode } from "react";
import { AdsMockup, RankingMockup } from "@/components/home/Mockups";

export type MockupKind = "ranking" | "ads" | "ai-answer" | "meta" | "website" | "social" | "crm" | "agent";

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className="mock glass rounded-[24px] p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_2px_rgb(166_107_255/0.7)]" />
          <span className="text-micro font-medium text-hi">{title}</span>
        </div>
        <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.6875rem] text-meta">Example view</span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function AiAnswerMockup() {
  return (
    <Frame title="AI answer">
      <div className="flex gap-1.5">
        {["ChatGPT", "Gemini", "AI Overview"].map((t, i) => (
          <span key={t} className={`rounded-full px-2.5 py-1 text-[0.6875rem] ${i === 0 ? "bg-violet-400/20 text-lavender-100" : "border border-line text-meta"}`}>
            {t}
          </span>
        ))}
      </div>
      <p className="mock-row ml-auto mt-4 w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.07] px-3.5 py-2.5 text-small text-hi" style={{ "--r": 0 } as React.CSSProperties}>
        Who is a good emergency dentist near me?
      </p>
      <div className="mock-row mt-3 rounded-2xl rounded-bl-md border border-line bg-ink-950/70 p-3.5" style={{ "--r": 1 } as React.CSSProperties}>
        <p className="text-small text-body">Based on reviews and up-to-date business info, a few options:</p>
        <ol className="mt-3 space-y-2">
          <li className="rounded-xl border border-violet-400/50 bg-violet-400/10 px-3 py-2">
            <span className="block text-small font-medium text-hi">1. Your Practice</span>
            <span className="block text-[0.6875rem] text-lavender-200">Highly reviewed · Same-day visits · Open today</span>
          </li>
          {["2. Another practice", "3. Another practice"].map((t) => (
            <li key={t} className="rounded-xl border border-line px-3 py-2 text-small text-meta">
              {t}
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

function MetaAdMockup() {
  return (
    <Frame title="Facebook and Instagram ad">
      <div className="mock-row overflow-hidden rounded-2xl border border-line bg-ink-950/70" style={{ "--r": 0 } as React.CSSProperties}>
        <div className="flex items-center gap-2.5 p-3">
          <span className="h-8 w-8 rounded-full bg-[image:var(--grad-brand)]" />
          <span>
            <span className="block text-small font-medium text-hi">Your Business</span>
            <span className="block text-[0.6875rem] text-meta">Sponsored</span>
          </span>
        </div>
        <div className="relative flex aspect-[16/9] items-end bg-[radial-gradient(80%_100%_at_70%_20%,rgb(166_107_255/0.55),transparent_60%),linear-gradient(135deg,#2a1745,#0c0a13)] p-4">
          <p className="font-display text-[1.25rem] font-semibold leading-tight text-white">
            Fall AC tune-up.
            <br />
            Book this week.
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-line p-3">
          <span className="text-[0.6875rem] text-meta">yourbusiness.com</span>
          <span className="rounded-md bg-white/10 px-3 py-1 text-[0.6875rem] font-medium text-hi">Get offer</span>
        </div>
      </div>
      <div className="mock-row mt-3 rounded-2xl border border-violet-400/30 bg-ink-950/70 p-3" style={{ "--r": 1 } as React.CSSProperties}>
        <p className="text-[0.6875rem] text-meta">Instant form</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["Name", "Phone", "Best time"].map((f) => (
            <span key={f} className="rounded-lg border border-line px-2 py-1.5 text-[0.6875rem] text-body">
              {f}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function WebsiteMockup() {
  return (
    <Frame title="Mobile-first website">
      <div className="mock-row overflow-hidden rounded-2xl border border-line bg-ink-950/70" style={{ "--r": 0 } as React.CSSProperties}>
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/15" />
          ))}
          <span className="ml-2 flex-1 rounded-full bg-white/[0.05] px-3 py-1 text-[0.6875rem] text-meta">yourbusiness.com</span>
        </div>
        <div className="grid grid-cols-5 gap-3 p-4">
          <div className="col-span-3 space-y-2">
            <span className="block h-3 w-4/5 rounded bg-white/20" />
            <span className="block h-3 w-3/5 rounded bg-white/20" />
            <span className="block h-2 w-full rounded bg-white/[0.07]" />
            <span className="block h-2 w-5/6 rounded bg-white/[0.07]" />
            <span className="mt-3 inline-flex rounded-full bg-[image:var(--grad-brand)] px-3 py-1 text-[0.6875rem] font-medium text-white">Call now</span>
          </div>
          <div className="col-span-2 rounded-xl bg-[radial-gradient(80%_80%_at_50%_30%,rgb(166_107_255/0.4),transparent_70%)]" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["Fast load", "Click to call", "CRM forms"].map((t, i) => (
          <span key={t} className="mock-row rounded-xl border border-line bg-ink-950/70 px-2 py-2 text-center text-[0.6875rem] text-lavender-200" style={{ "--r": i + 1 } as React.CSSProperties}>
            {t}
          </span>
        ))}
      </div>
    </Frame>
  );
}

function SocialMockup() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const posts: Record<number, string> = { 0: "Team intro", 1: "Quick tip", 2: "Review", 3: "Before / after", 4: "Offer" };
  return (
    <Frame title="Monthly content plan">
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d) => (
          <span key={d} className="text-center text-[0.6875rem] text-meta">
            {d}
          </span>
        ))}
        {Array.from({ length: 15 }, (_, i) => {
          const label = i % 3 === 0 ? posts[(i / 3) % 5] : null;
          return (
            <span
              key={i}
              className={`mock-row flex aspect-square items-end rounded-lg border p-1 text-[0.5625rem] leading-tight ${
                label ? "border-violet-400/40 bg-violet-400/10 text-lavender-100" : "border-line bg-ink-950/60 text-transparent"
              }`}
              style={{ "--r": i % 5 } as React.CSSProperties}
            >
              {label ?? "."}
            </span>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-ink-950/70 px-3 py-2">
        <span className="text-[0.6875rem] text-body">Facebook · Instagram · Google</span>
        <span className="rounded-full bg-violet-400/20 px-2 py-0.5 text-[0.6875rem] text-lavender-100">Approved</span>
      </div>
    </Frame>
  );
}

function CrmMockup() {
  const cols = [
    { t: "New", n: ["Maria G.", "Chris L."] },
    { t: "Contacted", n: ["Alex P."] },
    { t: "Booked", n: ["Sam T.", "Dan R."] },
  ];
  return (
    <Frame title="GoHighLevel pipeline">
      <div className="grid grid-cols-3 gap-2">
        {cols.map((c, ci) => (
          <div key={c.t} className="min-w-0">
            <p className="px-1 text-[0.6875rem] text-meta">{c.t}</p>
            <div className="mt-2 space-y-1.5">
              {c.n.map((n, i) => (
                <span
                  key={n}
                  className={`mock-row block truncate rounded-lg border px-2 py-1.5 text-[0.6875rem] ${ci === 2 ? "border-violet-300/60 text-hi" : "border-line text-body"} bg-ink-950/70`}
                  style={{ "--r": ci * 2 + i } as React.CSSProperties}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-1.5 border-t border-line pt-3 text-[0.6875rem]">
        {[
          ["Missed call", "Text sent automatically"],
          ["Form lead", "Added to pipeline, owner notified"],
          ["Visit done", "Review request sent"],
        ].map(([a, b], i) => (
          <li key={a} className="mock-row flex justify-between gap-3" style={{ "--r": i + 3 } as React.CSSProperties}>
            <span className="text-hi">{a}</span>
            <span className="truncate text-meta">{b}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function AgentMockup() {
  const msgs: [boolean, string][] = [
    [false, "Hi, do you have anything open tomorrow for a cleaning?"],
    [true, "Yes. I have 10:30 AM or 2:00 PM tomorrow. Which works better for you?"],
    [false, "2 works."],
    [true, "Done. You are booked for 2:00 PM. You will get a reminder the day before."],
  ];
  return (
    <Frame title="AI agent · website chat">
      <div className="space-y-2">
        {msgs.map(([agent, text], i) => (
          <p
            key={i}
            className={`mock-row w-fit max-w-[85%] rounded-2xl px-3.5 py-2 text-small ${
              agent ? "rounded-bl-md border border-line bg-ink-950/70 text-hi" : "ml-auto rounded-br-md bg-white/[0.07] text-body"
            }`}
            style={{ "--r": i } as React.CSSProperties}
          >
            {text}
          </p>
        ))}
      </div>
      <p className="mock-row mt-3 flex items-center gap-2 rounded-xl border border-violet-400/40 bg-violet-400/10 px-3 py-2 text-[0.6875rem] text-lavender-100" style={{ "--r": 4 } as React.CSSProperties}>
        <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
        Booked · added to calendar and CRM
      </p>
    </Frame>
  );
}

export function ServiceMockup({ kind }: { kind: MockupKind }) {
  switch (kind) {
    case "ranking":
      return <RankingMockup />;
    case "ads":
      return <AdsMockup />;
    case "ai-answer":
      return <AiAnswerMockup />;
    case "meta":
      return <MetaAdMockup />;
    case "website":
      return <WebsiteMockup />;
    case "social":
      return <SocialMockup />;
    case "crm":
      return <CrmMockup />;
    case "agent":
      return <AgentMockup />;
  }
}
