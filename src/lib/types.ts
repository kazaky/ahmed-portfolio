export type CardSize =
  | "1x1"
  | "2x1"
  | "1x2"
  | "2x2"
  | "half"
  | "full"
  | "map"
  | "compact"
  | "heatmap"
  | "halfTall";

export type BrandIconId =
  | "linkedin"
  | "medium"
  | "x"
  | "github"
  | "instagram"
  | "dribbble"
  | "google-play"
  | "kleinanzeigen"
  | "leboncoin"
  | "yaoota"
  | "zad"
  | "hitchhiker"
  | "misho"
  | "tawazun"
  | "iqrar-dayn"
  | "loqmaan"
  | "arabic-watch"
  | "falah"
  | "basira"
  | "ebay"
  | "felucca"
  | "erupt"
  | "dysrupts"
  | "adevinta"
  | "flying-elephant"
  | "shahry"
  | "egypt-startups"
  | "focusmusic"
  | "flashwatch"
  | "todo-little"
  | "photo-compare"
  | "qnpick";

export interface ProfileRoleLink {
  label: string;
  url: string;
}

export interface ProfileRole {
  label: string;
  /** Plain text fallback */
  detail?: string;
  /** Mixed text + links, e.g. Currently @eBay · Previously … */
  detailParts?: Array<string | ProfileRoleLink>;
}

export interface ProfileCta {
  label: string;
  url: string;
}

export interface ProfileLanguage {
  name: string;
  level: string;
  /** Short badge, e.g. EN / AR / DE */
  code: string;
}

export interface Profile {
  name: string;
  avatar: string;
  /** Short one-line bio under the name */
  bio?: string;
  /** Spoken languages shown under roles */
  languages?: ProfileLanguage[];
  /** Primary call-to-action */
  cta?: ProfileCta;
  /** Secondary CTA (e.g. email) */
  ctaSecondary?: ProfileCta;
  /** Tertiary CTA (e.g. GitHub) */
  ctaTertiary?: ProfileCta;
  roles: ProfileRole[];
}

export interface AwardItem {
  type: "award";
  id: string;
  title: string;
  org: string;
  year: string;
  place: "top100" | "2nd" | "3rd";
  /** Company / event logo in /public */
  logo?: string;
  size: CardSize;
}

export interface LinkItem {
  type: "link";
  id: string;
  title: string;
  url: string;
  domain: string;
  size: CardSize;
  icon?: BrandIconId;
  follow?: boolean;
  /** Short outcome-led blurb */
  blurb?: string;
  /** Product/app screenshot preview */
  preview?: string;
  /** Internal work page, e.g. /work/misho */
  work?: string;
  /** e.g. Play Store download count */
  downloads?: string;
  downloadsLabel?: string;
  comingSoon?: boolean;
  /** Job title for experience timeline cards */
  roleTitle?: string;
  /** Display period, e.g. "May 2018 – Present" */
  period?: string;
  /** Nested brand / product roles under a parent company */
  children?: LinkItem[];
}

export interface ShotItem {
  type: "shot";
  id: string;
  size: CardSize;
  title: string;
  image: string;
  url: string;
  source?: "dribbble" | "instagram";
}

export interface PhotoItem {
  type: "photo";
  id: string;
  size: CardSize;
  image?: string;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface LocationItem {
  type: "location";
  id: string;
  title: string;
  size: CardSize;
  lat: number;
  lng: number;
  /** High-res static map image in /public */
  mapImage?: string;
}

export type SectionItem =
  | LinkItem
  | PhotoItem
  | LocationItem
  | ShotItem
  | AwardItem;

export interface Section {
  id: string;
  title?: string;
  items: SectionItem[];
}

export interface SiteConfig {
  profile: Profile;
  sections: Section[];
}
