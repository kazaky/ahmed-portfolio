export type WorkKind = "project" | "role";

export interface WorkEntry {
  slug: string;
  kind: WorkKind;
  title: string;
  roleTitle?: string;
  tagline: string;
  url: string;
  domain: string;
  icon: string;
  preview: string;
  comingSoon?: boolean;
  period?: string;
  /** Short line on the home page (falls back to tagline) */
  homeBlurb?: string;
  /** Optional home-card URL override (e.g. Play Store) */
  homeUrl?: string;
  homeDomain?: string;
  /** Key in play-store-stats.json */
  playStoreId?: string;
  context: string;
  did: string;
  impact: string;
}

import workData from "./work.json";

export const workEntries = workData as WorkEntry[];

export function getWork(slug: string): WorkEntry | undefined {
  return workEntries.find((w) => w.slug === slug);
}

export function getWorkByKind(kind: WorkKind): WorkEntry[] {
  return workEntries.filter((w) => w.kind === kind);
}
