"use client";

import Image from "next/image";
import instagramPosts from "@content/instagram-posts.json";

const PROFILE_URL = "https://www.instagram.com/discover.streets/";

export function InstagramWidget() {
  return (
    <a
      href={PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-neutral-200/80 bg-white px-3.5 py-3 shadow-sm transition-shadow hover:shadow-md sm:mt-4 sm:px-4"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-[#f9ce34]/20 via-[#ee2a7b]/15 to-[#6228d7]/20 ring-1 ring-neutral-200/80">
          <Image
            src="/icons/instagram.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-neutral-900">
            @{instagramPosts.username}
          </span>
          <span className="block text-[11px] text-neutral-500">
            More photos on Instagram
          </span>
        </span>
      </span>
      <span className="shrink-0 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-white">
        Follow
      </span>
    </a>
  );
}
