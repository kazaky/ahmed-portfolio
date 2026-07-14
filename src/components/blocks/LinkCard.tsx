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
    (isFeatured || item.size === "1x2" || item.size === "1x1");
  const isApp = Boolean(item.downloads);
  const isDelisted =
    item.downloadsLabel?.toLowerCase().includes("delisted") ||
    item.downloads === "Delisted";

  if (showHeatmap) {
    return <GithubProjectsCard item={item} />;
  }

  if (hasPreview && item.preview) {
    const isTall = item.size === "1x2" || item.size === "1x1";
    return (
      <div
        className={[
          "flex h-full min-h-0 flex-col gap-3 p-3.5",
          isTall ? "" : "sm:flex-row sm:items-stretch sm:gap-4 sm:p-4",
          item.comingSoon ? "opacity-90" : "",
        ].join(" ")}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
          <div className="flex shrink-0 items-start justify-between gap-2">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-50 ring-1 ring-neutral-200/80">
              {src ? (
                <Image
                  src={src}
                  alt=""
                  width={40}
                  height={40}
                  className={
                    fullBleed
                      ? "h-full w-full object-cover"
                      : "h-5 w-5 object-contain"
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
            <div className="pointer-events-none flex flex-wrap items-center justify-end gap-1.5">
              {item.comingSoon && (
                <span className="rounded-full bg-neutral-200/70 px-2 py-0.5 text-[10px] font-medium text-neutral-500">
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
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold leading-snug text-neutral-900 line-clamp-2 sm:text-lg">
              {item.title}
            </p>
            <p className="mt-1 text-xs leading-snug text-neutral-500 line-clamp-2 sm:text-sm">
              {item.blurb ?? item.domain}
            </p>
            <ActionRow item={item} />
          </div>
        </div>
        <div
          className={[
            "relative w-full shrink-0 overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/60",
            isTall
              ? "min-h-0 flex-1"
              : "h-28 sm:h-auto sm:w-[42%] sm:min-h-[140px]",
          ].join(" ")}
        >
          <Image
            src={item.preview}
            alt={`${item.title} preview`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 280px"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "flex h-full min-h-0 flex-col justify-between",
        isCompact
          ? "gap-1 p-2.5 sm:p-3"
          : isFeatured
            ? "gap-2 p-4 sm:p-5"
            : "gap-2 p-3.5 sm:p-4",
        item.comingSoon ? "opacity-90" : "",
      ].join(" ")}
    >
      <div className="flex shrink-0 items-start justify-between gap-2">
        <div
          className={[
            "relative flex shrink-0 items-center justify-center overflow-hidden bg-neutral-50 ring-1 ring-neutral-200/80",
            isCompact
              ? "h-7 w-7 rounded-lg"
              : isFeatured
                ? "h-11 w-11 rounded-xl"
                : "h-9 w-9 rounded-xl",
          ].join(" ")}
        >
          {src ? (
            <Image
              src={src}
              alt=""
              width={isFeatured ? 44 : isCompact ? 28 : 36}
              height={isFeatured ? 44 : isCompact ? 28 : 36}
              className={
                fullBleed
                  ? "h-full w-full object-cover"
                  : isCompact
                    ? "h-3.5 w-3.5 object-contain"
                    : "h-5 w-5 object-contain"
              }
            />
          ) : (
            <Link2
              className={
                isCompact
                  ? "h-3 w-3 text-neutral-500"
                  : "h-4 w-4 text-neutral-500"
              }
              strokeWidth={2}
              aria-hidden
            />
          )}
        </div>
        <div className="pointer-events-none flex max-w-[55%] flex-wrap items-center justify-end gap-1.5">
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
      </div>
      <div className="min-w-0">
        <p
          className={[
            "font-semibold leading-snug text-neutral-900 line-clamp-2",
            isCompact
              ? "text-xs sm:text-[13px]"
              : isFeatured
                ? "text-base sm:text-lg"
                : "text-sm sm:text-[15px]",
          ].join(" ")}
        >
          {item.title}
        </p>
        <p
          className={[
            "mt-0.5 leading-snug line-clamp-2",
            isCompact
              ? "text-[10px] text-neutral-400"
              : isFeatured
                ? "text-xs text-neutral-500 sm:text-sm"
                : "text-[11px] text-neutral-500 sm:text-xs",
            isSocial && !item.blurb && !isCompact ? "text-neutral-400" : "",
          ].join(" ")}
        >
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
