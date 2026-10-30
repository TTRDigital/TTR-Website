"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Quote, Volume2 } from "lucide-react";
import type { TestimonialVideo } from "@/lib/content";

const ORIGIN = "https://www.youtube-nocookie.com";

/**
 * Client video testimonial. A still poster shows first; the YouTube player
 * loads only when the section comes near the screen (so it costs nothing on
 * page load), then plays muted on its own, as browsers only allow muted
 * autoplay. It pauses when scrolled away and resumes when back. "Play with
 * sound" restarts it from the beginning with sound. With reduced motion on,
 * nothing plays until the visitor presses play.
 */
export function ResultsVideo({ video }: { video: TestimonialVideo }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [sound, setSound] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const soundRef = useRef(false);
  const { youtubeId: id } = video;

  const command = (func: string, args: unknown[] = []) =>
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), ORIGIN);

  /* Load the player when the section is close, unless motion is reduced. */
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    // Reduced motion: stay on the poster until the visitor presses play.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Play while at least half on screen, pause when scrolled away. After the
     visitor turns the sound on, it no longer restarts by itself. */
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !ready || !autoplay) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) command("pauseVideo");
        else if (!soundRef.current) command("playVideo");
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready, autoplay]);

  const playWithSound = () => {
    soundRef.current = true;
    setSound(true);
    if (!load) {
      // Not loaded yet (reduced motion): the click allows sound from the start.
      setAutoplay(false);
      setLoad(true);
      return;
    }
    command("unMute");
    command("setVolume", [100]);
    command("seekTo", [0, true]);
    command("playVideo");
  };

  const params = new URLSearchParams({
    autoplay: "1",
    mute: autoplay ? "1" : "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    cc_load_policy: "1",
    enablejsapi: "1",
    loop: "1",
    playlist: id,
  });
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <figure data-reveal className="m-0">
      <div
        ref={boxRef}
        className="relative aspect-video overflow-hidden rounded-[24px] border border-line-strong bg-ink-900 shadow-[0_30px_80px_-30px_rgb(138_47_208/0.55)]"
      >
        {/* Poster: also a plain link to YouTube if scripts never run. */}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            playWithSound();
          }}
          aria-label={`Play video: ${video.title}`}
          className={`group absolute inset-0 transition-opacity duration-700 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube still; not worth the image optimizer */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[image:var(--grad-brand)] text-white shadow-[0_0_50px_-6px_rgb(166_107_255/0.9)] transition-transform duration-300 group-hover:scale-105"
          >
            <Play className="ml-1 h-6 w-6 fill-current" strokeWidth={1.5} />
          </span>
        </a>

        {load ? (
          <iframe
            ref={frameRef}
            src={`${ORIGIN}/embed/${id}?${params}`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setReady(true)}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        ) : null}

        {ready && autoplay && !sound ? (
          <button
            type="button"
            onClick={playWithSound}
            className="absolute bottom-4 left-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-ink-950/75 px-4 text-small font-medium text-hi shadow-lg backdrop-blur-md transition-colors hover:bg-ink-950/90 sm:bottom-5 sm:left-5"
          >
            <Volume2 className="h-4 w-4 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
            Play with sound
          </button>
        ) : null}
      </div>

      <figcaption className="mt-5 flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-400/15 text-violet-300">
          <Quote className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span>
          <span className="block font-medium text-hi">{video.title}</span>
          <span className="mt-0.5 block text-small text-meta">
            {[video.person, video.business].filter(Boolean).join(", ")}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
