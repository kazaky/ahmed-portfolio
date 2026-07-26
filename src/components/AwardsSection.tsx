"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { AwardItem } from "@/lib/types";

interface AwardsSectionProps {
  items: AwardItem[];
  startIndex?: number;
}

const placeCopy: Record<AwardItem["place"], string> = {
  top100: "I",
  "2nd": "II",
  "3rd": "III",
};

export function AwardsSection({ items, startIndex = 0 }: AwardsSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-[#12100e] shadow-[0_24px_60px_-28px_rgba(18,16,14,0.7)] ring-1 ring-black/40">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 12% 0%, rgba(212,175,105,0.18), transparent 55%), radial-gradient(ellipse 55% 45% at 100% 100%, rgba(212,175,105,0.08), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />

      <div className="relative px-5 py-6 sm:px-7 sm:py-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af69]/55 to-[#d4af69]/20" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#d4af69]/80" aria-hidden />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4af69]/55 to-[#d4af69]/20" />
        </div>

        <ul className="space-y-0">
          {items.map((award, index) => (
            <motion.li
              key={award.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : (startIndex + index) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                index > 0
                  ? "border-t border-[#d4af69]/15 pt-4 mt-4 sm:pt-5 sm:mt-5"
                  : ""
              }
            >
              <article className="grid grid-cols-[auto_1fr_auto] items-start gap-3.5 sm:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4af69]/35 bg-[#d4af69]/10 sm:h-14 sm:w-14">
                  <span
                    className="font-award text-xl leading-none text-[#e8d5a3] sm:text-2xl"
                    aria-hidden
                  >
                    {placeCopy[award.place]}
                  </span>
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-award text-[1.35rem] leading-tight tracking-tight text-[#f4efe6] sm:text-[1.55rem]">
                    {award.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-snug tracking-wide text-[#b8aea0] sm:text-[13px]">
                    {award.org}
                  </p>
                </div>
                <time
                  dateTime={award.year}
                  className="pt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[#d4af69]/85 sm:pt-2"
                >
                  {award.year}
                </time>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
