import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { WorkEntry } from "@content/work";
import { workEntries } from "@content/work";
import { SiteFooter } from "@/components/SiteFooter";

interface WorkViewProps {
  work: WorkEntry;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2";

export function WorkView({ work }: WorkViewProps) {
  const others = workEntries
    .filter((w) => w.slug !== work.slug && w.kind === work.kind)
    .slice(0, 4);

  const backHref = work.kind === "role" ? "/#apps" : "/#products";
  const backLabel = work.kind === "role" ? "Back to apps" : "Back to products";
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

        <div className="mt-8 flex items-center gap-3">
          <span className="relative flex h-12 w-12 overflow-hidden rounded-xl bg-neutral-50 ring-1 ring-neutral-200">
            <Image
              src={work.icon}
              alt=""
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              {kindLabel}
              {work.roleTitle ? ` · ${work.roleTitle}` : ""}
              {work.comingSoon ? " · Coming Soon" : ""}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {work.title}
            </h1>
          </div>
        </div>

        <p className="mt-4 text-lg leading-relaxed text-neutral-600">
          {work.tagline}
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white shadow-sm">
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

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {(
            [
              ["Context", work.context],
              ["What I did", work.did],
              ["Impact", work.impact],
            ] as const
          ).map(([label, body]) => (
            <section key={label}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                {label}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
                {body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
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
          <section className="mt-16 border-t border-neutral-200/80 pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              More work
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
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
