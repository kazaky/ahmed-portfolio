"use client";

import { useEffect, useState } from "react";

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionsResponse = {
  total: { lastYear: number };
  contributions: ContributionDay[];
};

function githubUsername(url: string): string | null {
  try {
    const path = new URL(url).pathname.split("/").filter(Boolean);
    return path[0] ?? null;
  } catch {
    return null;
  }
}

/** Sum each GitHub calendar week into a single activity value. */
function weeklyTotals(days: ContributionDay[]): number[] {
  const weeks: number[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(
      days.slice(i, i + 7).reduce((sum, day) => sum + day.count, 0),
    );
  }
  return weeks;
}

interface GithubActivityProps {
  profileUrl: string;
  onTotal?: (total: number | null) => void;
}

export function GithubActivity({ profileUrl, onTotal }: GithubActivityProps) {
  const username = githubUsername(profileUrl);
  const [weeks, setWeeks] = useState<number[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!username) {
      setFailed(true);
      onTotal?.(null);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { signal: controller.signal },
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ContributionsResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        setWeeks(weeklyTotals(data.contributions));
        onTotal?.(data.total.lastYear);
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          onTotal?.(null);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username, onTotal]);

  if (failed) {
    return (
      <p className="self-end text-[11px] text-neutral-400">
        Activity unavailable
      </p>
    );
  }

  if (!weeks) {
    return (
      <div className="flex min-h-0 flex-1 items-end gap-px">
        {Array.from({ length: 52 }, (_, i) => (
          <div
            key={i}
            className="min-w-0 flex-1 animate-pulse rounded-sm bg-neutral-100"
            style={{ height: `${20 + ((i * 17) % 60)}%` }}
          />
        ))}
      </div>
    );
  }

  const peak = Math.max(...weeks, 1);

  return (
    <div
      className="flex min-h-0 flex-1 items-end gap-px sm:gap-[2px]"
      role="img"
      aria-label="Weekly GitHub contribution activity for the last year"
    >
      {weeks.map((count, i) => {
        const ratio = count / peak;
        const height = count === 0 ? 8 : Math.max(14, Math.round(ratio * 100));
        return (
          <div
            key={i}
            title={`Week ${i + 1}: ${count} contribution${count === 1 ? "" : "s"}`}
            className={[
              "min-w-0 flex-1 rounded-[2px] sm:rounded-[3px]",
              count === 0
                ? "bg-neutral-100"
                : "bg-neutral-800/85",
            ].join(" ")}
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
}
