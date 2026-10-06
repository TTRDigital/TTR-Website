import { ArrowRight, Layers, Phone, Star } from "lucide-react";
import type { HomeContent, SiteSettings } from "@/lib/content";
import { isPlaceholder, showPlaceholders } from "@/lib/placeholders";
import { Button } from "@/components/ui/Button";
import { MaskedWords, Eyebrow } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Placeholder";
import { HeroVisual } from "./hero3d/HeroVisual";

export function Hero({ hero, settings }: { hero: HomeContent["hero"]; settings: SiteSettings }) {
  const rating = settings.googleRating;
  const showRating = !!rating && (showPlaceholders || !isPlaceholder(rating));

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-[calc(88px+env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+24px)] md:pb-24 lg:min-h-[max(720px,100svh)] lg:items-center lg:pb-16"
    >
      {/* Backdrop: grid, light leaks, and the growth core */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(80%_70%_at_70%_40%,#000,transparent)]" />
      <div aria-hidden="true" className="leak -z-10 left-[55%] top-[10%] h-[50vw] max-h-[680px] w-[50vw] max-w-[680px] opacity-50" />
      <div aria-hidden="true" className="leak -z-10 -left-[15%] bottom-[-10%] h-[40vw] w-[40vw] opacity-25" />
      <div className="absolute inset-0 -z-10">
        <HeroVisual posterSrc="/hero/growth-core.webp" heroId="hero" />
      </div>
      {/* Scrim keeps text readable over the core on small screens */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-gradient-to-t from-ink-950 via-ink-950/85 to-transparent lg:hidden" />

      <div className="container-page">
        <div className="max-w-[46rem] lg:max-w-[50rem]">
          <div className="hero-fade" style={{ "--d": "0ms" } as React.CSSProperties}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>
          <h1 id="hero-title" className="hero-words mt-6 text-hero font-semibold text-hi">
            <MaskedWords text={hero.heading} />
          </h1>
          <p className="hero-fade mt-6 max-w-[36rem] text-lead text-body lg:mt-8" style={{ "--d": "380ms" } as React.CSSProperties}>
            {hero.text}
          </p>

          <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10" style={{ "--d": "480ms" } as React.CSSProperties}>
            <Button href="#audit" size="lg" magnetic track="audit_cta_click">
              Get a free growth audit
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
            </Button>
            <Button href={settings.phoneHref} size="lg" variant="secondary">
              <Phone className="h-4 w-4 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
              Call {settings.phone}
            </Button>
          </div>

          <ul
            className="hero-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-small text-meta lg:mt-10"
            style={{ "--d": "600ms" } as React.CSSProperties}
            aria-label="Why owners trust TTR"
          >
            <li className="flex items-center gap-2">
              <span className="font-display text-hi">Since {settings.foundedYear}</span>
              helping local businesses grow
            </li>
            <li className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
              8 services, one team
            </li>
            {showRating ? (
              <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <Star className="h-4 w-4 fill-violet-300 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                <Text value={rating} /> on Google
                {settings.reviewCount ? (
                  <span>
                    (<Text value={settings.reviewCount} /> reviews)
                  </span>
                ) : null}
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
