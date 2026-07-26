"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { AwardItem } from "@/lib/types";

interface AwardsSectionProps {
  items: AwardItem[];
  startIndex?: number;
}

const placeMeta: Record<
  AwardItem["place"],
  { label: string; ribbon: string; text: string }
> = {
  top100: {
    label: "Top 100",
    ribbon: "from-[#f5e6c0] to-[#d4af69]",
    text: "text-[#6b5320]",
  },
  "2nd": {
    label: "2nd place",
    ribbon: "from-[#e9ecf1] to-[#b9c0cc]",
    text: "text-[#4b5568]",
  },
  "3rd": {
    label: "3rd place",
    ribbon: "from-[#f0d8bd] to-[#cd9a67]",
    text: "text-[#6e4a29]",
  },
};

export function AwardsSection({ items, startIndex = 0 }: AwardsSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((award, index) => {
        const meta = placeMeta[award.place];

        return (
          <motion.article
            key={award.id}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: reduceMotion ? 0 : (startIndex + index) * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#d4af69]/60 to-transparent"
              aria-hidden
            />

            <div className="flex items-center justify-between">
              {award.logo ? (
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5">
                  <Image
                    src={award.logo}
                    alt={award.org}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </span>
              ) : null}
              <span
                className={[
                  "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b px-2.5 py-1 text-[11px] font-semibold shadow-sm ring-1 ring-black/5",
                  meta.ribbon,
                  meta.text,
                ].join(" ")}
              >
                {meta.label}
              </span>
            </div>

            <h3 className="font-award mt-4 text-[1.4rem] leading-[1.15] tracking-tight text-neutral-900">
              {award.title}
            </h3>

            <div className="mt-auto flex items-center justify-between pt-4">
              <p className="text-[12.5px] font-medium text-neutral-500">
                {award.org}
              </p>
              <time
                dateTime={award.year}
                className="text-[12px] font-semibold tabular-nums tracking-wide text-neutral-400"
              >
                {award.year}
              </time>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
