import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Misho.day — Case study | Ahmed Elshahawy",
  description:
    "Prayer-centered daily planner: problem, role, and outcomes for Misho.day.",
  openGraph: {
    title: "Misho.day — Case study",
    description:
      "Building a prayer-centered daily planner for Muslim users.",
    images: [{ url: "/previews/misho.jpg" }],
  },
};

export default function MishoCaseStudyPage() {
  return (
    <div className="page-atmosphere relative min-h-screen">
      <main className="relative z-[1] mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
          Back to portfolio
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="relative flex h-12 w-12 overflow-hidden rounded-xl ring-1 ring-neutral-200">
            <Image
              src="/icons/misho.svg"
              alt=""
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Case study
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Misho.day
            </h1>
          </div>
        </div>

        <p className="mt-4 text-lg leading-relaxed text-neutral-600">
          A prayer-centered daily planner that helps Muslims structure their day
          around salah — not the other way around.
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white shadow-sm">
          <div className="relative aspect-[16/10] w-full bg-neutral-100">
            <Image
              src="/previews/misho.jpg"
              alt="Misho.day product preview"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Problem
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
              Generic planners ignore prayer times and spiritual rhythm.
              Muslims often juggle calendars, adhan apps, and notes with no
              single place that respects both work and worship.
            </p>
          </section>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Role
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
              Solo founder — product, design, and engineering. Defined the
              experience around prayer windows, built the web app, and shipped
              the public beta at misho.day.
            </p>
          </section>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Outcome
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
              A live product that frames the day with salah-first planning,
              clear daily focus, and a calm UI suited to intentional use —
              part of a broader suite of Arabic & Islamic tools.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href="https://misho.day"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Visit misho.day
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
          </a>
          <Link
            href="/#products"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800"
          >
            More products
          </Link>
        </div>
      </main>
    </div>
  );
}
