"use client";

import type { PhotoItem, Section, SectionItem } from "@/lib/types";
import { BentoCard } from "@/components/BentoCard";
import { LinkCard } from "@/components/blocks/LinkCard";
import { LocationCard } from "@/components/blocks/LocationCard";
import { PhotoCard } from "@/components/blocks/PhotoCard";
import { ShotCard } from "@/components/blocks/ShotCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ShotGallery } from "@/components/ShotGallery";
import { DribbbleWidget } from "@/components/DribbbleWidget";
import { InstagramWidget } from "@/components/InstagramWidget";
import type { ShotItem } from "@/lib/types";

interface BentoSectionProps {
  section: Section;
  startIndex?: number;
}

function renderItem(item: SectionItem) {
  switch (item.type) {
    case "link":
      return <LinkCard item={item} />;
    case "location":
      return <LocationCard item={item} />;
    case "photo":
      return <PhotoCard item={item} />;
    case "shot":
      return <ShotCard item={item} />;
    default:
      return null;
  }
}

function getItemHref(item: SectionItem): string | undefined {
  if (item.type === "link") {
    if (item.comingSoon) return undefined;
    if (item.caseStudy) return item.caseStudy;
    return item.url;
  }
  if (item.type === "photo" && item.url) return item.url;
  if (item.type === "shot") return item.url;
  return undefined;
}

function getVariant(item: SectionItem): "content" | "photo" | "map" {
  if (item.type === "photo" || item.type === "shot") return "photo";
  if (item.type === "location") return "map";
  return "content";
}

export function BentoSection({ section, startIndex = 0 }: BentoSectionProps) {
  const isPhotoGallery = section.id === "photographs";
  const isDribbble = section.id === "dribbble";
  const photos = isPhotoGallery
    ? (section.items.filter((i) => i.type === "photo") as PhotoItem[])
    : [];
  const shots = isDribbble
    ? (section.items.filter((i) => i.type === "shot") as ShotItem[])
    : [];

  return (
    <section className={section.title ? "mt-8 sm:mt-10" : ""}>
      {section.title && (
        <h2
          id={section.id}
          className="mb-3 scroll-mt-8 text-lg font-bold tracking-tight text-neutral-900 sm:mb-4 sm:text-xl"
        >
          {section.title}
        </h2>
      )}
      {isPhotoGallery ? (
        <>
          <PhotoGallery photos={photos} startIndex={startIndex} />
          <InstagramWidget />
        </>
      ) : isDribbble ? (
        <>
          <ShotGallery shots={shots} startIndex={startIndex} />
          <DribbbleWidget />
        </>
      ) : (
        <div className="grid auto-rows-[152px] grid-cols-6 grid-flow-dense gap-2.5 sm:auto-rows-[164px] sm:gap-3">
          {section.items.map((item, index) => (
            <BentoCard
              key={item.id}
              size={item.size}
              index={startIndex + index}
              href={getItemHref(item)}
              ariaLabel={
                item.type === "link"
                  ? item.title
                  : item.type === "shot"
                    ? item.title
                    : undefined
              }
              variant={getVariant(item)}
            >
              {renderItem(item)}
            </BentoCard>
          ))}
        </div>
      )}
    </section>
  );
}
