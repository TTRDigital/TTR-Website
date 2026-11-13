import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// Hidden test page for the page editor (Feedback Studio). Not linked anywhere, not in the sitemap.
export const metadata: Metadata = {
  title: { absolute: "Feedback Studio test page | TTR Digital Marketing" },
  description: "Sample page for testing the page editor.",
  robots: { index: false, follow: false },
};

const points = [
  "A clear, up-to-date Google Business Profile",
  "Service pages that say plainly what you do and where",
  "Honest answers to the questions customers ask most",
  "Reviews and details that match across the web",
];

export default function FeedbackStudioTestPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-[calc(var(--header-h)+64px)] lg:pb-32">
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-h2 font-semibold">Helping local service businesses get found</h1>
          <p className="measure mt-6 text-lead text-body">
            Sample page for testing the page editor. Change any of this text or swap the picture to see how edits and approvals work.
          </p>
          <p className="measure mt-4 text-body">
            At TTR we help local service businesses show up when people search in Google and when they ask AI tools like ChatGPT for a recommendation.
          </p>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[20px]">
            <Image src="/hero/growth-core.webp" alt="Abstract glowing graphic for the TTR growth core" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>

          <h2 className="mt-14 text-h3 font-semibold">What helps a business get found</h2>
          <p className="measure mt-4 text-body">
            Search tools look for clear, consistent information about who you are and what you do. We work on the basics that make that easy.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-6 text-body">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <p className="measure mt-14 text-body">Curious how this could look for your business? Say hello and we will talk it through with you.</p>
          <div className="mt-6">
            <Button href="/contact" size="lg">
              Talk with us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
