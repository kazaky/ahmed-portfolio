"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import type { LinkItem } from "@/lib/types";
import { iconSrc } from "@/lib/icons";

interface ExperienceTimelineProps {
  items: LinkItem[];
  startIndex?: number;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2";

function splitPeriod(period?: string): { start: string; end: string } | null {
  if (!period) return null;
  const parts = period.split(/\s*[–—-]\s*/);
  if (parts.length < 2) return { start: period, end: "" };
  return { start: parts[0].trim(), end: parts.slice(1).join(" – ").trim() };
}

export function ExperienceTimeline({
  items,
  startIndex = 0,
}: ExperienceTimelineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ol className="relative">
      {/* Continuous spine — mobile + desktop aligned to marker column */}
      <div
        className="pointer-events-none absolute bottom-8 start-[0.85rem] top-6 w-px bg-neutral-200 sm:start-[calc(7.5rem+0.5rem+0.375rem)] sm:bottom-10 sm:top-8"
        aria-hidden
      />

      {items.map((item, index) => {
        const src = item.icon ? iconSrc[item.icon] : undefined;
        const isEbay = item.icon === "ebay";
        const dates = splitPeriod(item.period);
        const isCurrent = dates?.end.toLowerCase() === "present";
        const isDelisted =
          item.downloadsLabel?.toLowerCase().includes("delisted") ||
          item.downloads === "Delisted";

        return (
          <motion.li
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              delay: reduceMotion ? 0 : (startIndex + index) * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 pb-6 last:pb-0 sm:grid-cols-[7.5rem_1.75rem_minmax(0,1fr)] sm:gap-x-4 sm:pb-8"
          >
            {/* Dates — desktop left */}
            <div className="hidden sm:block sm:pt-4 sm:text-right">
              {dates && (
                <time dateTime={item.period} className="leading-tight">
                  <span
                    className={[
                      "block text-[15px] font-semibold tracking-tight",
                      isCurrent ? "text-neutral-900" : "text-neutral-800",
                    ].join(" ")}
                  >
                    {dates.end || dates.start}
                  </span>
                  {dates.end ? (
                    <span className="mt-1 block text-xs font-medium text-neutral-400">
                      {dates.start}
                    </span>
                  ) : null}
                </time>
              )}
            </div>

            {/* Marker */}
            <div className="relative flex justify-center pt-[1.15rem] sm:pt-[1.15rem]">
              <span
                className={[
                  "relative z-[1] h-3.5 w-3.5 rounded-full border-[2.5px] bg-[var(--background)]",
                  isCurrent
                    ? "border-neutral-900 ring-4 ring-neutral-900/10"
                    : "border-neutral-400",
                ].join(" ")}
                aria-hidden
              />
            </div>

            {/* Content */}
            <div className="min-w-0">
              {dates && (
                <time
                  dateTime={item.period}
                  className="mb-2 flex items-baseline gap-1.5 text-xs font-semibold text-neutral-500 sm:hidden"
                >
                  <span>{dates.start}</span>
                  <span className="font-normal text-neutral-300">→</span>
                  <span className={isCurrent ? "text-neutral-900" : undefined}>
                    {dates.end || dates.start}
                  </span>
                </time>
              )}

              <article
                className={[
                  "group overflow-hidden rounded-3xl border bg-white transition-shadow hover:shadow-md",
                  isEbay
                    ? "border-[#0064D2]/25 shadow-[inset_3px_0_0_0_#E53238]"
                    : "border-neutral-200/80",
                ].join(" ")}
              >
                <div className="flex flex-col lg:flex-row lg:items-stretch">
                  <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                    <div className="flex items-start gap-3.5">
                      {isEbay ? (
                        <div className="flex h-11 w-[6.75rem] shrink-0 items-center">
                          <Image
                            src="/icons/ebay.svg"
                            alt="eBay"
                            width={108}
                            height={43}
                            className="h-8 w-auto object-contain object-left"
                            priority={index === 0}
                          />
                        </div>
                      ) : (
                        src && (
                          <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-neutral-50 ring-1 ring-neutral-200/80">
                            <Image
                              src={src}
                              alt=""
                              width={44}
                              height={44}
                              className="h-full w-full object-cover"
                            />
                          </span>
                        )
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          {isEbay ? (
                            <h3 className="sr-only">eBay</h3>
                          ) : (
                            <h3 className="text-base font-semibold tracking-tight text-neutral-900 sm:text-lg">
                              {item.title}
                            </h3>
                          )}
                          {isCurrent && (
                            <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white">
                              Now
                            </span>
                          )}
                          {item.downloads && (
                            <span
                              className={[
                                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                                isDelisted
                                  ? "bg-neutral-100 text-neutral-500"
                                  : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
                              ].join(" ")}
                              title={item.downloadsLabel ?? item.downloads}
                            >
                              {!isDelisted && (
                                <Download
                                  className="h-3 w-3"
                                  strokeWidth={2.5}
                                  aria-hidden
                                />
                              )}
                              {item.downloads}
                            </span>
                          )}
                        </div>

                        {item.roleTitle && (
                          <p
                            className={[
                              "text-sm font-medium text-neutral-600",
                              isEbay ? "mt-0" : "mt-0.5",
                            ].join(" ")}
                          >
                            {item.roleTitle}
                          </p>
                        )}

                        {item.blurb && (
                          <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
                            {item.blurb}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                          {item.work && (
                            <Link
                              href={item.work}
                              className={`text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-600 ${focusRing} rounded-sm`}
                            >
                              View work
                            </Link>
                          )}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-800 ${focusRing} rounded-sm`}
                          >
                            Visit
                            <ArrowUpRight
                              className="h-3.5 w-3.5"
                              strokeWidth={2.25}
                              aria-hidden
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {item.preview && (
                    <div
                      className={[
                        "relative mx-4 mb-4 h-36 overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/50 lg:mx-0 lg:mb-0 lg:h-auto lg:w-[38%] lg:min-h-[140px] lg:rounded-none lg:border-s lg:border-neutral-100 lg:ring-0",
                        isEbay ? "bg-[#f7f7f7]" : "",
                      ].join(" ")}
                    >
                      <Image
                        src={item.preview}
                        alt={`${item.title} preview`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 280px"
                      />
                    </div>
                  )}
                </div>
              </article>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
