import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { WorkEntry } from "@content/work";
import { workEntries } from "@content/work";
import { SiteFooter } from "@/components/SiteFooter";
import { renderBoldText } from "@/lib/richText";

interface WorkViewProps {
  work: WorkEntry;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2";

const summarySections = [
  ["01", "Context", "context"],
  ["02", "What I did", "did"],
  ["03", "Impact", "impact"],
] as const;

export function WorkView({ work }: WorkViewProps) {
  const others = workEntries
    .filter((w) => w.slug !== work.slug && w.kind === work.kind)
    .slice(0, 4);

  const backHref = work.kind === "role" ? "/#experience" : "/#products";
  const backLabel =
    work.kind === "role" ? "Back to experience" : "Back to products";
  const kindLabel = work.kind === "role" ? "Role" : "Project";

  return (
    <div className="page-atmosphere relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <main
        id="main"
        className="relative z-[1] mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        <Link
          href={backHref}
          className={`inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 ${focusRing} rounded-sm`}
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          {backLabel}
        </Link>

        <header className="mt-8 sm:mt-10">
          <div className="flex items-start gap-4 sm:gap-5">
            <span className="relative mt-1 flex h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-neutral-50 ring-1 ring-neutral-200/80 sm:h-16 sm:w-16">
              <Image
                src={work.icon}
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {kindLabel}
                {work.comingSoon ? " · Coming Soon" : ""}
              </p>
              <h1 className="mt-1.5 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                {work.title}
              </h1>
              {work.roleTitle && (
                <p className="mt-2 text-lg font-semibold leading-snug text-neutral-800 sm:text-xl">
                  {work.roleTitle}
                </p>
              )}
              {work.period && (
                <p className="mt-2 inline-flex items-center rounded-full border border-neutral-200/90 bg-white/70 px-3 py-1 text-xs font-medium text-neutral-600 sm:text-[13px]">
                  {work.period}
                </p>
              )}
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-600 sm:mt-7 sm:text-[1.35rem] sm:leading-relaxed">
            {work.tagline}
          </p>
        </header>

        <div className="mt-7 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white shadow-sm sm:mt-8">
          <div className="relative aspect-[16/10] w-full bg-neutral-100">
            <Image
              src={work.preview}
              alt={`${work.title} preview`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-neutral-200/80 pt-10 sm:mt-14 sm:grid-cols-3 sm:gap-0 sm:pt-12">
          {summarySections.map(([num, label, key], index) => (
            <section
              key={key}
              className={[
                "sm:px-5",
                index === 0 ? "sm:ps-0" : "sm:border-s sm:border-neutral-200/70",
                index === summarySections.length - 1 ? "sm:pe-0" : "",
              ].join(" ")}
            >
              <p className="text-[11px] font-semibold tabular-nums tracking-[0.14em] text-neutral-400">
                {num}
              </p>
              <h2 className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                {label}
              </h2>
              <p className="mt-3 text-base leading-[1.7] text-neutral-700">
                {work[key]}
              </p>
            </section>
          ))}
        </div>

        {work.highlights && work.highlights.length > 0 && (
          <section className="mt-14 sm:mt-16">
            <h2 className="text-base font-bold tracking-tight text-neutral-900 sm:text-lg">
              Highlights
            </h2>
            <ul className="mt-5 space-y-0 divide-y divide-neutral-200/80 border-y border-neutral-200/80">
              {work.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3.5 py-3.5 text-[15px] leading-relaxed text-neutral-600 sm:gap-4 sm:py-4 sm:text-base sm:leading-relaxed"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900"
                    aria-hidden
                  />
                  <span className="min-w-0">{renderBoldText(item)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 flex flex-wrap gap-3 sm:mt-14">
          {!work.comingSoon && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white ${focusRing}`}
            >
              Visit {work.domain}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </a>
          )}
          <Link
            href={backHref}
            className={`inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 ${focusRing}`}
          >
            More {work.kind === "role" ? "roles" : "projects"}
          </Link>
        </div>

        {others.length > 0 && (
          <section className="mt-16 border-t border-neutral-200/80 pt-10 sm:mt-20 sm:pt-12">
            <h2 className="text-base font-bold tracking-tight text-neutral-900 sm:text-lg">
              More work
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {others.map((w) => (
                <li key={w.slug}>
                  <Link
                    href={`/work/${w.slug}`}
                    className={`flex items-center gap-3 rounded-2xl border border-neutral-200/80 bg-white px-3 py-3 transition-shadow hover:shadow-md ${focusRing}`}
                  >
                    <span className="relative flex h-9 w-9 overflow-hidden rounded-lg bg-neutral-50 ring-1 ring-neutral-200">
                      <Image
                        src={w.icon}
                        alt=""
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-neutral-900">
                        {w.title}
                      </span>
                      <span className="block truncate text-xs text-neutral-500">
                        {w.comingSoon
                          ? "Coming Soon"
                          : (w.roleTitle ??
                            (w.kind === "role" ? "Role" : w.domain))}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
