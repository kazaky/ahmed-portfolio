"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { CardSize } from "@/lib/types";
import { getSizeClasses } from "@/lib/grid";

interface BentoCardProps {
  size: CardSize;
  index: number;
  children: ReactNode;
  href?: string;
  ariaLabel?: string;
  variant?: "content" | "photo" | "map";
}

export function BentoCard({
  size,
  index,
  children,
  href,
  ariaLabel,
  variant = "content",
}: BentoCardProps) {
  const isMedia = variant === "photo" || variant === "map";
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        delay: reduceMotion ? 0 : index * 0.03,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={[
        getSizeClasses(size),
        "group relative h-full overflow-hidden rounded-3xl border border-neutral-200/70 bg-white",
        isMedia ? "" : "min-h-0",
        variant === "map" ? "max-h-[140px] sm:max-h-[148px]" : "",
        href
          ? "cursor-pointer transition-shadow hover:shadow-md focus-within:shadow-md"
          : "",
      ].join(" ")}
    >
      {href && (
        <a
          href={href}
          target={
            href.startsWith("mailto:") || href.startsWith("/")
              ? undefined
              : "_blank"
          }
          rel={
            href.startsWith("mailto:") || href.startsWith("/")
              ? undefined
              : "noopener noreferrer"
          }
          aria-label={ariaLabel}
          className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        />
      )}
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
