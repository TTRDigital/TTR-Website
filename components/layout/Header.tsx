"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import type { ServiceSummary } from "@/lib/content";
import { lenisStore } from "@/lib/lenis-store";
import { ServiceIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/motion/Magnetic";

type NavLink = { label: string; href: string };

type Props = {
  services: ServiceSummary[];
  mainLinks: NavLink[];
  ctaLabel: string;
  phone: string;
  phoneHref: string;
};

const industries = [
  { href: "/dental-marketing", title: "Dental practices", text: "More new patients, fewer empty chairs." },
  { href: "/home-services-marketing", title: "Home services", text: "HVAC, plumbing, roofing and more." },
];

type MenuKey = "services" | "industries" | null;

export function Header({ services, mainLinks, ctaLabel, phone, phoneHref }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const auditHref = pathname === "/" ? "#audit" : "/contact";

  /* Transparent at top, glass after scrolling, hide on down, show on up. */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - lastY;
      if (y < 120) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close everything on route change. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  /* Escape and outside click close desktop menus. */
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        navRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${openMenu}"]`)?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openMenu]);

  const hoverOpen = (key: MenuKey) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const isHidden = hidden && !openMenu && !mobileOpen;
  const solid = scrolled || !!openMenu;

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out-expo ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
            solid
              ? "border-line bg-ink-950/72 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent"
          }`}
        />
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="relative z-10 flex min-h-11 shrink-0 items-center rounded-md" aria-label="TTR Digital Marketing, home">
            <Image
              src="/brand/ttr-logo-on-dark.svg"
              alt="TTR Digital Marketing"
              width={175}
              height={22}
              priority
              className="h-[20px] w-auto lg:h-[22px]"
            />
          </Link>

          <nav ref={navRef} aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li onPointerEnter={hoverOpen("services")} onPointerLeave={hoverClose}>
                <MenuTrigger
                  id="services"
                  label="Services"
                  open={openMenu === "services"}
                  onToggle={() => setOpenMenu((m) => (m === "services" ? null : "services"))}
                />
                <MegaMenu
                  open={openMenu === "services"}
                  services={services}
                  auditHref={auditHref}
                  onNavigate={() => setOpenMenu(null)}
                />
              </li>
              <li className="relative" onPointerEnter={hoverOpen("industries")} onPointerLeave={hoverClose}>
                <MenuTrigger
                  id="industries"
                  label="Industries"
                  open={openMenu === "industries"}
                  onToggle={() => setOpenMenu((m) => (m === "industries" ? null : "industries"))}
                />
                <div
                  id="menu-industries"
                  className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-out-expo ${
                    openMenu === "industries" ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <ul className="glass-dense rounded-[20px] p-2 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]">
                    {industries.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpenMenu(null)}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06]"
                        >
                          <span className="block font-medium text-hi">{item.title}</span>
                          <span className="block text-small text-meta">{item.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {mainLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] text-body transition-colors hover:text-hi"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={phoneHref}
              data-track="click_to_call"
              className="hidden min-h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] text-hi transition-colors hover:text-lavender-200 md:inline-flex"
            >
              <Phone className="h-4 w-4 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
              <span className="hidden xl:inline">{phone}</span>
              <span className="xl:hidden">Call</span>
            </a>
            <span className="hidden sm:inline-flex">
              <Magnetic>
                <Link
                  href={auditHref}
                  data-track="audit_cta_click"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[image:var(--grad-brand)] px-5 text-small font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_8px_24px_-10px_rgb(138_47_208/0.9)] transition-shadow duration-300 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_0_0_1px_rgb(196_155_255/0.45),0_12px_36px_-8px_rgb(166_107_255/0.9)]"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </Magnetic>
            </span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white/[0.04] text-hi lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              data-mobile-trigger
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        services={services}
        mainLinks={mainLinks}
        ctaLabel={ctaLabel}
        phone={phone}
        phoneHref={phoneHref}
        auditHref={auditHref}
      />

      <MobileActionBar hidden={mobileOpen} phoneHref={phoneHref} auditHref={auditHref} ctaLabel={ctaLabel} />
    </>
  );
}

function MenuTrigger({ id, label, open, onToggle }: { id: string; label: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      data-menu-trigger={id}
      aria-expanded={open}
      aria-controls={`menu-${id}`}
      onClick={onToggle}
      className={`inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-[0.9375rem] transition-colors hover:text-hi ${
        open ? "text-hi" : "text-body"
      }`}
    >
      {label}
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}

function MegaMenu({
  open,
  services,
  auditHref,
  onNavigate,
}: {
  open: boolean;
  services: ServiceSummary[];
  auditHref: string;
  onNavigate: () => void;
}) {
  return (
    <div
      id="menu-services"
      className={`absolute inset-x-0 top-full transition-[opacity,transform,visibility] duration-300 ease-out-expo ${
        open ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"
      }`}
    >
      <div className="container-page pt-2">
        <div className="glass-dense grid grid-cols-12 gap-2 rounded-[24px] p-2 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]">
          <ul className="col-span-9 grid grid-cols-2 gap-1 p-2 xl:grid-cols-4">
            {services.map((s, i) => (
              <li
                key={s.slug}
                style={{ transitionDelay: open ? `${i * 25}ms` : "0ms" }}
                className={`transition-[opacity,transform] duration-300 ease-out-expo ${open ? "opacity-100" : "translate-y-1 opacity-0"}`}
              >
                <Link
                  href={`/services/${s.slug}`}
                  onClick={onNavigate}
                  className="group/item flex h-full flex-col gap-3 rounded-2xl p-4 transition-colors hover:bg-white/[0.05]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-white/[0.03] text-violet-300 transition-colors group-hover/item:border-violet-400/50 group-hover/item:text-lavender-100">
                    <ServiceIcon slug={s.slug} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-medium text-hi">{s.title}</span>
                    <span className="mt-1 block text-small leading-snug text-meta">{s.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="col-span-3 p-2">
            <Link
              href={auditHref}
              onClick={onNavigate}
              data-track="audit_cta_click"
              className="group/feat relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-violet-400/25 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(138_47_208/0.45),transparent_60%),linear-gradient(180deg,var(--ink-800),var(--ink-900))] p-6"
            >
              <span className="text-micro font-medium uppercase tracking-[0.18em] text-lavender-200">Free growth audit</span>
              <span>
                <span className="block font-display text-h3 text-hi">See where your leads are slipping away.</span>
                <span className="mt-3 block text-small text-body">
                  A 30-minute review of your site, Google presence, ads and competitors.
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-small font-medium text-hi">
                  Get my free audit
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/feat:-translate-y-0.5 group-hover/feat:translate-x-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </span>
            </Link>
          </div>
          <div className="col-span-12 flex items-center justify-between border-t border-line px-6 py-4 text-small">
            <span className="text-meta">Not sure what you need? We will tell you honestly on the audit call.</span>
            <Link href="/services" onClick={onNavigate} className="link-underline text-hi">
              All services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
  services,
  mainLinks,
  ctaLabel,
  phone,
  phoneHref,
  auditHref,
}: {
  open: boolean;
  onClose: () => void;
  services: ServiceSummary[];
  mainLinks: NavLink[];
  ctaLabel: string;
  phone: string;
  phoneHref: string;
  auditHref: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    onClose();
    document.querySelector<HTMLButtonElement>("[data-mobile-trigger]")?.focus();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    lenisStore.stop();
    const panel = panelRef.current;
    // Next frame: the dialog is no longer inert and is visible, so it can take focus.
    const raf = requestAnimationFrame(() => panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus());

    /* Focus trap + Escape */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prev;
      lenisStore.start();
    };
  }, [open, close]);

  const links = [
    { href: "/services", label: "Services" },
    { href: "/dental-marketing", label: "Dental marketing" },
    { href: "/home-services-marketing", label: "Home services marketing" },
    ...mainLinks,
    ...(mainLinks.some((l) => l.href === "/contact") ? [] : [{ href: "/contact", label: "Contact" }]),
  ];

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      inert={!open}
      className={`fixed inset-0 z-[70] flex flex-col bg-ink-950/96 backdrop-blur-2xl transition-[opacity,visibility] duration-300 lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div aria-hidden="true" className="leak -right-24 -top-24 h-80 w-80" />
      <div className="container-page flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <h2 id={titleId} className="sr-only">
          Menu
        </h2>
        <Image src="/brand/ttr-logo-on-dark.svg" alt="" width={159} height={20} className="h-5 w-auto" />
        <button
          type="button"
          data-autofocus
          onClick={close}
          aria-label="Close menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white/[0.04] text-hi"
        >
          <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-page flex-1 overflow-y-auto pb-6 pt-4" data-lenis-prevent>
        <ul className="space-y-1">
          {links.map((l, i) => (
            <li
              key={l.href}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              className={`transition-[opacity,transform] duration-500 ease-out-expo ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <Link
                href={l.href}
                onClick={onClose}
                className="flex min-h-12 items-center justify-between border-b border-line py-3 font-display text-[1.625rem] tracking-[-0.02em] text-hi"
              >
                {l.label}
                <ArrowRight className="h-5 w-5 text-meta" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-micro uppercase tracking-[0.18em] text-meta">All services</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                onClick={onClose}
                className="flex min-h-11 items-center gap-2 text-small text-body hover:text-hi"
              >
                <ServiceIcon slug={s.slug} className="h-4 w-4 shrink-0 text-violet-300" />
                {s.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-page grid shrink-0 grid-cols-2 gap-3 border-t border-line pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        <a
          href={phoneHref}
          data-track="click_to_call"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-white/[0.05] text-[0.9375rem] font-medium text-hi"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Call </span>
          {phone}
        </a>
        <Link
          href={auditHref}
          onClick={onClose}
          data-track="audit_cta_click"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[image:var(--grad-brand)] text-[0.9375rem] font-medium text-white"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}

function MobileActionBar({ hidden, phoneHref, auditHref, ctaLabel }: { hidden: boolean; phoneHref: string; auditHref: string; ctaLabel: string }) {
  return (
    <div
      style={{ viewTransitionName: "mobile-bar" }}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink-950/80 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={phoneHref}
          data-track="click_to_call"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-white/[0.05] text-[0.9375rem] font-medium text-hi"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Call
        </a>
        <Link
          href={auditHref}
          data-track="audit_cta_click"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[image:var(--grad-brand)] text-[0.9375rem] font-medium text-white"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
