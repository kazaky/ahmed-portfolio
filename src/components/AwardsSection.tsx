"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Medal, Trophy } from "lucide-react";
import type { AwardItem } from "@/lib/types";

interface AwardsSectionProps {
  items: AwardItem[];
  startIndex?: number;
}

const placeStyles: Record<
  AwardItem["place"],
  { label: string; badge: string; icon: "trophy" | "medal" }
> = {
  top100: {
    label: "Top 100",
    badge: "bg-neutral-900 text-white",
    icon: "trophy",
  },
  "2nd": {
    label: "2nd",
    badge: "bg-neutral-700 text-white",
    icon: "medal",
  },
  "3rd": {
    label: "3rd",
    badge: "bg-neutral-500 text-white",
    icon: "medal",
  },
};

export function AwardsSection({ items, startIndex = 0 }: AwardsSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="space-y-2.5">
      {items.map((award, index) => {
        const style = placeStyles[award.place];
        const Icon = style.icon === "trophy" ? Trophy : Medal;

        return (
          <motion.li
            key={award.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.35,
              delay: reduceMotion ? 0 : (startIndex + index) * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <article className="flex items-center gap-3.5 rounded-2xl border border-neutral-200/80 bg-white px-3.5 py-3.5 sm:gap-4 sm:px-4 sm:py-4">
              <span
                className={[
                  "inline-flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl",
                  style.badge,
                ].join(" ")}
                aria-hidden
              >
                <Icon className="h-4 w-4" strokeWidth={2.25} />
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide">
                  {style.label}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-neutral-900">
                  {award.title}
                </h3>
                <p className="mt-0.5 text-[13px] leading-snug text-neutral-500">
                  {award.org}
                </p>
              </div>
              <time
                dateTime={award.year}
                className="shrink-0 self-start rounded-full bg-neutral-100 px-2.5 py-1 text-[12px] font-medium tabular-nums text-neutral-600 sm:self-center"
              >
                {award.year}
              </time>
            </article>
          </motion.li>
        );
      })}
    </ul>
  );
}
