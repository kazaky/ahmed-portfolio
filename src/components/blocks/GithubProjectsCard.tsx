"use client";

import Image from "next/image";
import { Link2 } from "lucide-react";
import { useCallback, useState } from "react";
import type { LinkItem } from "@/lib/types";
import { iconSrc } from "@/lib/icons";
import { GithubActivity } from "@/components/blocks/GithubActivity";

interface GithubProjectsCardProps {
  item: LinkItem;
}

export function GithubProjectsCard({ item }: GithubProjectsCardProps) {
  const src = item.icon ? iconSrc[item.icon] : undefined;
  const [total, setTotal] = useState<number | null>(null);
  const onTotal = useCallback((value: number | null) => {
    setTotal(value);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col gap-1.5 p-2.5 sm:gap-2 sm:p-3">
      <div className="flex shrink-0 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-50 dark:bg-neutral-800/80 ring-1 ring-neutral-200/80 dark:ring-neutral-700/80">
            {src ? (
              <Image
                src={src}
                alt=""
                width={24}
                height={24}
                className="h-3.5 w-3.5 object-contain"
              />
            ) : (
              <Link2
                className="h-3 w-3 text-neutral-500 dark:text-neutral-400"
                strokeWidth={2}
                aria-hidden
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold leading-none text-neutral-900 dark:text-neutral-50 sm:text-[13px]">
              {item.title}
            </p>
            <p className="mt-0.5 truncate text-[10px] leading-none text-neutral-400 dark:text-neutral-500">
              {total != null
                ? `${total.toLocaleString()} contributions this year`
                : "Loading activity…"}
            </p>
          </div>
        </div>
        <div className="pointer-events-none flex shrink-0 items-center gap-1.5">
          {item.follow && (
            <span className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-1.5 py-0.5 text-[9px] font-medium text-neutral-700 dark:text-neutral-300 sm:text-[10px]">
              Follow
            </span>
          )}
        </div>
      </div>
      <GithubActivity profileUrl={item.url} onTotal={onTotal} />
    </div>
  );
}
