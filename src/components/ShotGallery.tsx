"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ShotItem } from "@/lib/types";
import { MediaLightbox, type LightboxItem } from "@/components/MediaLightbox";

interface ShotGalleryProps {
  shots: ShotItem[];
  startIndex?: number;
}

export function ShotGallery({ shots, startIndex = 0 }: ShotGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const items: LightboxItem[] = useMemo(
    () =>
      shots.map((s) => ({
        id: s.id,
        image: s.image,
        title: s.title,
        url: s.url,
        sourceLabel: "Open on Dribbble",
      })),
    [shots],
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {shots.map((shot, index) => (
          <motion.button
            key={shot.id}
            type="button"
            onClick={() => setActive(index)}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              delay: reduceMotion ? 0 : (startIndex + index) * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200/70 bg-neutral-100 text-left shadow-sm transition-shadow hover:shadow-md"
            aria-label={shot.title}
          >
            <Image
              src={shot.image}
              alt={shot.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm">
              <Image
                src="/icons/dribbble.svg"
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5"
              />
            </div>
            <p className="absolute inset-x-0 bottom-0 px-3 pb-3 text-xs font-semibold leading-snug text-white line-clamp-2 sm:text-sm">
              {shot.title}
            </p>
          </motion.button>
        ))}
      </div>

      <MediaLightbox
        items={items}
        index={active}
        onClose={() => setActive(null)}
        onChange={setActive}
      />
    </>
  );
}
