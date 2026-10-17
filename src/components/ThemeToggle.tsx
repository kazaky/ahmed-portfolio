"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  applyTheme,
  readStoredTheme,
  type ThemePreference,
} from "@/lib/theme";

const options: {
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}[] = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredTheme();
    setPreference(stored);
    applyTheme(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference, ready]);

  const select = (next: ThemePreference) => {
    setPreference(next);
    applyTheme(next);
  };

  return (
    <div className="mt-3">
      <h2 className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
        Appearance
      </h2>
      <div
        className="grid grid-cols-3 gap-1"
        role="radiogroup"
        aria-label="Color theme"
      >
        {options.map(({ value, label, icon: Icon }) => {
          const isActive = preference === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`${label} theme`}
              onClick={() => select(value)}
              className={[
                "inline-flex h-7 items-center justify-center gap-1 rounded-lg px-1.5 text-[11px] font-semibold leading-none transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-950",
                isActive
                  ? "bg-neutral-900 text-white shadow-sm dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100/80 text-neutral-600 ring-1 ring-neutral-200/80 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-neutral-800/60 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
              ].join(" ")}
            >
              <Icon className="h-3 w-3 shrink-0" strokeWidth={2.25} aria-hidden />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
