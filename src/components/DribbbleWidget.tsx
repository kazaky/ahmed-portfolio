"use client";

import Image from "next/image";

const PROFILE_URL = "https://dribbble.com/shahawi";

export function DribbbleWidget() {
  return (
    <a
      href={PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-neutral-200/80 bg-white px-3.5 py-3 shadow-sm transition-shadow hover:shadow-md sm:mt-4 sm:px-4"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ea4c89]/10 ring-1 ring-[#ea4c89]/15">
          <Image
            src="/icons/dribbble.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-neutral-900">
            @shahawi
          </span>
          <span className="block text-[11px] text-neutral-500">
            More shots on Dribbble
          </span>
        </span>
      </span>
      <span className="shrink-0 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity group-hover:opacity-90">
        Follow
      </span>
    </a>
  );
}
