import Image from "next/image";
import Link from "next/link";
import { Download, Link2 } from "lucide-react";
import type { LinkItem } from "@/lib/types";
import { iconSrc } from "@/lib/icons";
import { GithubProjectsCard } from "@/components/blocks/GithubProjectsCard";

/** App / product marks that already include a full square background */
const FULL_BLEED_ICONS = new Set([
  "kleinanzeigen",
  "leboncoin",
  "yaoota",
  "zad",
  "hitchhiker",
  "misho",
  "tawazun",
  "iqrar-dayn",
  "loqmaan",
  "arabic-watch",
  "falah",
  "basira",
  "ebay",
  "felucca",
  "erupt",
  "dysrupts",
  "adevinta",
  "flying-elephant",
  "shahry",
  "egypt-startups",
  "focusmusic",
  "flashwatch",
]);

const SOCIAL_ICONS = new Set([
  "linkedin",
  "medium",
  "x",
  "github",
  "instagram",
  "dribbble",
]);

interface LinkCardProps {
  item: LinkItem;
}

function ActionRow({ item }: { item: LinkItem }) {
  if (!item.work) return null;
  return (
    <span className="relative z-20 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
      <Link
        href={item.work}
        className="text-xs font-semibold text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition-colors hover:decoration-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        View work
      </Link>
      {!item.comingSoon && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-neutral-500 underline decoration-neutral-200 underline-offset-2 transition-colors hover:text-neutral-800 hover:decoration-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Visit site
        </a>
      )}
    </span>
  );
}

export function LinkCard({ item }: LinkCardProps) {
  const src = item.icon ? iconSrc[item.icon] : undefined;
  const fullBleed = item.icon ? FULL_BLEED_ICONS.has(item.icon) : false;
  const isSocial = item.icon ? SOCIAL_ICONS.has(item.icon) : false;
  const isFeatured =
    item.size === "2x1" || item.size === "2x2" || item.size === "full";
  const isCompact = item.size === "compact";
  const showHeatmap = item.size === "heatmap" && item.icon === "github";
  const hasPreview =
    Boolean(item.preview) &&
    (isFeatured ||
      item.size === "1x2" ||
      item.size === "1x1" ||
      item.size === "halfTall");
  const isApp = Boolean(item.downloads);
  const isDelisted =
    item.downloadsLabel?.toLowerCase().includes("delisted") ||
    item.downloads === "Delisted";

  if (showHeatmap) {
    return <GithubProjectsCard item={item} />;
  }

  const badges = (
    <div className="pointer-events-none flex shrink-0 flex-wrap items-center justify-end gap-1.5">
      {item.comingSoon && (
        <span className="rounded-full bg-neutral-200/70 px-2 py-0.5 text-[10px] font-medium text-neutral-500 sm:text-[11px]">
          Coming Soon
        </span>
      )}
      {isApp && item.downloads && !item.comingSoon && (
        <span
          className={[
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-[11px]",
            isDelisted
              ? "bg-neutral-100 text-neutral-500"
              : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
          ].join(" ")}
          title={item.downloadsLabel ?? item.downloads}
        >
          {!isDelisted && (
            <Download className="h-3 w-3" strokeWidth={2.5} aria-hidden />
          )}
          {item.downloads}
        </span>
      )}
      {item.follow && !item.comingSoon && (
        <span className="rounded-full border border-neutral-200 bg-white px-2 py-0.5 text-[10px] font-medium text-neutral-700 sm:text-[11px]">
          Follow
        </span>
      )}
    </div>
  );

  if (hasPreview && item.preview) {
    const iconBox = isFeatured
      ? "h-14 w-14 rounded-2xl sm:h-16 sm:w-16"
      : "h-12 w-12 rounded-xl sm:h-14 sm:w-14";
    const iconPx = isFeatured ? 64 : 56;

    return (
      <div
        className={[
          "flex h-full min-h-0 flex-col gap-2.5 p-3 sm:gap-3 sm:p-3.5",
          item.comingSoon ? "opacity-90" : "",
        ].join(" ")}
      >
        <div className="flex shrink-0 items-start gap-3">
          <div
            className={[
              "relative flex shrink-0 items-center justify-center overflow-hidden bg-neutral-50 ring-1 ring-neutral-200/80",
              iconBox,
            ].join(" ")}
          >
            {src ? (
              <Image
                src={src}
                alt=""
                width={iconPx}
                height={iconPx}
                className={
                  fullBleed
                    ? "h-full w-full object-cover"
                    : "h-7 w-7 object-contain sm:h-8 sm:w-8"
                }
              />
            ) : (
              <Link2
                className="h-5 w-5 text-neutral-500"
                strokeWidth={2}
                aria-hidden
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p
                  className={[
                    "font-semibold leading-snug text-neutral-900 line-clamp-2",
                    isFeatured
                      ? "text-base sm:text-lg"
                      : "text-sm sm:text-[15px]",
                  ].join(" ")}
                >
                  {item.title}
                </p>
                <p
                  className={[
                    "mt-0.5 leading-snug text-neutral-500 line-clamp-2",
                    isFeatured
                      ? "text-xs sm:text-sm"
                      : "text-[11px] sm:text-xs",
                  ].join(" ")}
                >
                  {item.blurb ??
                    (item.comingSoon
                      ? "Coming soon"
                      : (item.downloadsLabel ?? item.domain))}
                </p>
              </div>
              {badges}
            </div>
            <ActionRow item={item} />
          </div>
        </div>
        <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/60">
          <Image
            src={item.preview}
            alt={`${item.title} preview`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 420px"
          />
        </div>
      </div>
    );
  }

  if (isCompact) {
    return (
      <div
        className={[
          "flex h-full min-h-0 flex-col justify-between gap-1 p-2.5 sm:p-3",
          item.comingSoon ? "opacity-90" : "",
        ].join(" ")}
      >
        <div className="flex shrink-0 items-start justify-between gap-2">
          <div className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-50 ring-1 ring-neutral-200/80">
            {src ? (
              <Image
                src={src}
                alt=""
                width={28}
                height={28}
                className={
                  fullBleed
                    ? "h-full w-full object-cover"
                    : "h-3.5 w-3.5 object-contain"
                }
              />
            ) : (
              <Link2
                className="h-3 w-3 text-neutral-500"
                strokeWidth={2}
                aria-hidden
              />
            )}
          </div>
          {badges}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold leading-snug text-neutral-900 line-clamp-2 sm:text-[13px]">
            {item.title}
          </p>
          <p className="mt-0.5 text-[10px] leading-snug text-neutral-400 line-clamp-2">
            {item.blurb ??
              (item.comingSoon
                ? "Coming soon"
                : (item.downloadsLabel ?? item.domain))}
          </p>
          <ActionRow item={item} />
        </div>
      </div>
    );
  }

  const defaultIconBox = isFeatured
    ? "h-12 w-12 rounded-2xl sm:h-14 sm:w-14"
    : "h-11 w-11 rounded-xl sm:h-12 sm:w-12";
  const defaultIconPx = isFeatured ? 56 : 48;

  return (
    <div
      className={[
        "flex h-full min-h-0 flex-col justify-center gap-2 p-3 sm:p-3.5",
        item.comingSoon ? "opacity-90" : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "relative flex shrink-0 items-center justify-center overflow-hidden bg-neutral-50 ring-1 ring-neutral-200/80",
            defaultIconBox,
          ].join(" ")}
        >
          {src ? (
            <Image
              src={src}
              alt=""
              width={defaultIconPx}
              height={defaultIconPx}
              className={
                fullBleed
                  ? "h-full w-full object-cover"
                  : "h-6 w-6 object-contain sm:h-7 sm:w-7"
              }
            />
          ) : (
            <Link2
              className="h-4 w-4 text-neutral-500"
              strokeWidth={2}
              aria-hidden
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p
                className={[
                  "font-semibold leading-snug text-neutral-900 line-clamp-2",
                  isFeatured
                    ? "text-base sm:text-lg"
                    : "text-sm sm:text-[15px]",
                ].join(" ")}
              >
                {item.title}
              </p>
              <p
                className={[
                  "mt-0.5 leading-snug line-clamp-2",
                  isFeatured
                    ? "text-xs text-neutral-500 sm:text-sm"
                    : "text-[11px] text-neutral-500 sm:text-xs",
                  isSocial && !item.blurb ? "text-neutral-400" : "",
                ].join(" ")}
              >
                {item.blurb ??
                  (item.comingSoon
                    ? "Coming soon"
                    : (item.downloadsLabel ?? item.domain))}
              </p>
            </div>
            {badges}
          </div>
          <ActionRow item={item} />
        </div>
      </div>
    </div>
  );
}
