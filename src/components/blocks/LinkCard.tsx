import Image from "next/image";
import { Download, Link2 } from "lucide-react";
import type { LinkItem } from "@/lib/types";
import { iconSrc } from "@/lib/icons";

/** App / product marks that already include a full square background */
const FULL_BLEED_ICONS = new Set([
  "kleinanzeigen",
  "leboncoin",
  "yaoota",
  "zad",
  "misho",
  "tawazun",
  "iqrar-dayn",
  "loqmaan",
  "arabic-watch",
  "falah",
  "basira",
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

export function LinkCard({ item }: LinkCardProps) {
  const src = item.icon ? iconSrc[item.icon] : undefined;
  const fullBleed = item.icon ? FULL_BLEED_ICONS.has(item.icon) : false;
  const isSocial = item.icon ? SOCIAL_ICONS.has(item.icon) : false;
  const isFeatured =
    item.size === "2x1" || item.size === "2x2" || item.size === "full";
  const hasPreview =
    Boolean(item.preview) &&
    (isFeatured || item.size === "1x2" || item.size === "1x1");
  const isApp = Boolean(item.downloads);
  const isDelisted =
    item.downloadsLabel?.toLowerCase().includes("delisted") ||
    item.downloads === "Delisted";

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
                <Link2 className="h-4 w-4 text-neutral-500" strokeWidth={2} />
              )}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              {item.comingSoon && (
                <span className="relative z-20 rounded-full bg-neutral-200/70 px-2 py-0.5 text-[10px] font-medium text-neutral-500">
                  Coming Soon
                </span>
              )}
              {isApp && item.downloads && !item.comingSoon && (
                <span
                  className={[
                    "relative z-20 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-[11px]",
                    isDelisted
                      ? "bg-neutral-100 text-neutral-500"
                      : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
                  ].join(" ")}
                  title={item.downloadsLabel ?? item.downloads}
                >
                  {!isDelisted && (
                    <Download className="h-3 w-3" strokeWidth={2.5} />
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
            {item.caseStudy && (
              <span className="relative z-20 mt-2 inline-block text-xs font-semibold text-neutral-800 underline decoration-neutral-300 underline-offset-2">
                View case study
              </span>
            )}
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
            alt=""
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
        "flex h-full min-h-0 flex-col justify-between gap-2",
        isFeatured ? "p-4 sm:p-5" : "p-3.5 sm:p-4",
        item.comingSoon ? "opacity-90" : "",
      ].join(" ")}
    >
      <div className="flex shrink-0 items-start justify-between gap-2">
        <div
          className={[
            "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-50 ring-1 ring-neutral-200/80",
            isFeatured ? "h-11 w-11" : "h-9 w-9",
          ].join(" ")}
        >
          {src ? (
            <Image
              src={src}
              alt=""
              width={isFeatured ? 44 : 36}
              height={isFeatured ? 44 : 36}
              className={
                fullBleed
                  ? "h-full w-full object-cover"
                  : "h-5 w-5 object-contain"
              }
            />
          ) : (
            <Link2 className="h-4 w-4 text-neutral-500" strokeWidth={2} />
          )}
        </div>
        <div className="flex max-w-[55%] flex-wrap items-center justify-end gap-1.5">
          {item.comingSoon && (
            <span className="relative z-20 rounded-full bg-neutral-200/70 px-2 py-0.5 text-[10px] font-medium text-neutral-500 sm:text-[11px]">
              Coming Soon
            </span>
          )}
          {isApp && item.downloads && !item.comingSoon && (
            <span
              className={[
                "relative z-20 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-[11px]",
                isDelisted
                  ? "bg-neutral-100 text-neutral-500"
                  : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
              ].join(" ")}
              title={item.downloadsLabel ?? item.downloads}
            >
              {!isDelisted && <Download className="h-3 w-3" strokeWidth={2.5} />}
              {item.downloads}
            </span>
          )}
          {item.follow && !item.comingSoon && (
            <span className="relative z-20 rounded-full border border-neutral-200 bg-white px-2 py-0.5 text-[10px] font-medium text-neutral-700 sm:text-[11px]">
              Follow
            </span>
          )}
        </div>
      </div>
      <div className="min-w-0">
        <p
          className={[
            "font-semibold leading-snug text-neutral-900 line-clamp-2",
            isFeatured ? "text-base sm:text-lg" : "text-sm sm:text-[15px]",
          ].join(" ")}
        >
          {item.title}
        </p>
        <p
          className={[
            "mt-0.5 leading-snug text-neutral-500 line-clamp-2",
            isFeatured ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs",
            isSocial && !item.blurb ? "text-neutral-400" : "",
          ].join(" ")}
        >
          {item.blurb ??
            (item.comingSoon
              ? "Coming soon"
              : (item.downloadsLabel ?? item.domain))}
        </p>
      </div>
    </div>
  );
}
