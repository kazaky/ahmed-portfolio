"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { PhotoItem } from "@/lib/types";
import { MediaLightbox, type LightboxItem } from "@/components/MediaLightbox";

interface PhotoGalleryProps {
  photos: PhotoItem[];
  startIndex?: number;
}

export function PhotoGallery({ photos, startIndex = 0 }: PhotoGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const items: LightboxItem[] = useMemo(
    () =>
      photos
        .filter((p): p is PhotoItem & { image: string } => Boolean(p.image))
        .map((p) => ({
          id: p.id,
          image: p.image,
          title: p.alt ?? "Photograph",
          url: p.url,
          sourceLabel: "Open on Instagram",
        })),
    [photos],
  );

  return (
    <>
      <div className="columns-2 gap-2.5 sm:columns-3 sm:gap-3">
        {photos.map((photo, index) => {
          if (!photo.image) return null;
          const aspect =
            photo.width && photo.height ? photo.width / photo.height : 0.8;
          const lightboxIndex = items.findIndex((i) => i.id === photo.id);

          return (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setActive(lightboxIndex)}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: reduceMotion ? 0 : (startIndex + index) * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative mb-2.5 block w-full break-inside-avoid overflow-hidden rounded-3xl border border-neutral-200/70 bg-neutral-100 text-left shadow-sm transition-shadow hover:shadow-md sm:mb-3"
              style={{ aspectRatio: `${aspect}` }}
              aria-label={photo.alt ?? "View photograph"}
            >
              <Image
                src={photo.image}
                alt={photo.alt ?? "Photograph"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm">
                <Image
                  src="/icons/instagram.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 brightness-0 invert"
                />
              </div>
              {photo.alt && (
                <p className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 px-3 pb-3 text-xs font-medium leading-snug text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 line-clamp-2">
                  {photo.alt}
                </p>
              )}
            </motion.button>
          );
        })}
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
