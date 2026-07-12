import type { CardSize, LinkItem, SiteConfig } from "@/lib/types";
import { contactEmail } from "./site-url";
import { getWork } from "./work";
import instagramPosts from "./instagram-posts.json";
import dribbbleShots from "./dribbble-shots.json";
import playStoreStats from "./play-store-stats.json";

const photographItems = instagramPosts.posts.map((post) => ({
  type: "photo" as const,
  id: post.id,
  size: "1x1" as const,
  image: post.image,
  url: post.url,
  alt: post.alt,
  width: post.width,
  height: post.height,
}));

const dribbbleSizes: CardSize[] = ["half", "half", "half", "half", "half", "half"];

const dribbbleItems = dribbbleShots.shots.map((shot, index) => ({
  type: "shot" as const,
  id: shot.id,
  size: dribbbleSizes[index] ?? "1x1",
  title: shot.title,
  image: shot.image,
  url: shot.url,
  source: "dribbble" as const,
}));

function appDownloads(id: keyof typeof playStoreStats) {
  const stat = playStoreStats[id];
  return {
    downloads: stat.downloads,
    downloadsLabel: stat.label,
  };
}

/** Home bento card fields derived from work entry + presentation overrides. */
function workLink(
  slug: string,
  overrides: Pick<LinkItem, "size" | "icon"> &
    Partial<Pick<LinkItem, "blurb" | "url" | "domain" | "title">> & {
      downloadsKey?: keyof typeof playStoreStats;
    },
): LinkItem {
  const w = getWork(slug);
  if (!w) throw new Error(`Missing work entry: ${slug}`);
  const downloads = overrides.downloadsKey
    ? appDownloads(overrides.downloadsKey)
    : {};
  return {
    type: "link",
    id: slug,
    title: overrides.title ?? w.title,
    url: overrides.url ?? w.url,
    domain: overrides.domain ?? w.domain,
    size: overrides.size,
    icon: overrides.icon,
    blurb: overrides.blurb ?? w.tagline,
    preview: w.preview,
    work: `/work/${slug}`,
    comingSoon: w.comingSoon,
    roleTitle: w.roleTitle,
    period: w.period,
    ...downloads,
  };
}

export const site: SiteConfig = {
  profile: {
    name: "Ahmed Elshahawy",
    avatar: "/avatar.jpg",
    bio: "Staff engineer at eBay. Building Arabic & Islamic tools on the side — from Berlin.",
    cta: {
      label: "Connect on LinkedIn",
      url: "https://www.linkedin.com/in/shahawi",
    },
    ctaSecondary: {
      label: "Email",
      url: `mailto:${contactEmail}`,
    },
    ctaTertiary: {
      label: "GitHub",
      url: "https://github.com/kazaky",
    },
    roles: [
      {
        label: "Staff Software Engineer",
        detailParts: [
          "Currently ",
          { label: "@eBay", url: "/work/ebay" },
          "\nPreviously ",
          { label: "@Adevinta", url: "https://www.adevinta.com" },
          " ",
          { label: "@Kleinanzeigen", url: "/work/kleinanzeigen" },
          " ",
          { label: "@leboncoin", url: "/work/leboncoin" },
          " ",
          { label: "@Yaoota", url: "/work/yaoota" },
          " ",
          { label: "@HitchHiker", url: "/work/hitchhiker" },
        ],
      },
      { label: "UI / UX Designer" },
      { label: "Street photographer" },
    ],
  },
  sections: [
    {
      id: "links",
      items: [
        {
          type: "link",
          id: "linkedin",
          title: "Linkedin profile",
          url: "https://www.linkedin.com/in/shahawi",
          domain: "linkedin.com",
          size: "half",
          icon: "linkedin",
        },
        {
          type: "link",
          id: "medium",
          title: "My Medium articles",
          url: "https://medium.com/@shahawi",
          domain: "medium.com",
          size: "half",
          icon: "medium",
        },
        {
          type: "link",
          id: "tweets",
          title: "My tweets on X",
          url: "https://x.com/shahawi_",
          domain: "x.com",
          size: "half",
          icon: "x",
        },
        {
          type: "link",
          id: "github",
          title: "Github projects",
          url: "https://github.com/kazaky",
          domain: "github.com",
          size: "half",
          icon: "github",
          follow: true,
        },
        {
          type: "location",
          id: "location",
          title: "Berlin, Germany",
          size: "map",
          lat: 52.52,
          lng: 13.405,
          mapImage: "/map-berlin.jpg",
        },
      ],
    },
    {
      id: "products",
      title: "Products I've built",
      items: [
        workLink("misho", {
          size: "2x1",
          icon: "misho",
          blurb: "Salah-first daily planner — live beta",
        }),
        workLink("tawazun", {
          size: "1x2",
          icon: "tawazun",
          blurb: "Calm wellness without the streaks",
        }),
        workLink("iqrar-dayn", {
          size: "half",
          icon: "iqrar-dayn",
          blurb: "Document interest-free loans clearly",
        }),
        workLink("loqmaan", {
          size: "half",
          icon: "loqmaan",
          blurb: "Browse Arabic wisdom in one place",
        }),
        workLink("arabic-watch", {
          size: "half",
          icon: "arabic-watch",
          blurb: "Heritage timekeeping, modern UI",
        }),
        workLink("falah", {
          size: "half",
          icon: "falah",
          blurb: "Islamic tools suite — in progress",
        }),
        workLink("basira", {
          size: "half",
          icon: "basira",
          blurb: "Clarity-first insight — in progress",
        }),
      ],
    },
    {
      id: "experience",
      title: "Work Experience",
      items: [
        workLink("ebay", {
          size: "full",
          icon: "ebay",
          blurb: "Marketplace product engineering at global scale",
        }),
        workLink("kleinanzeigen", {
          size: "full",
          icon: "kleinanzeigen",
          blurb: "Native Android for Germany’s top classifieds app",
          url: "https://play.google.com/store/apps/details?id=com.ebay.kleinanzeigen",
          domain: "play.google.com",
          downloadsKey: "kleinanzeigen",
        }),
        workLink("leboncoin", {
          size: "full",
          icon: "leboncoin",
          blurb: "Classifieds product within the Adevinta family",
          url: "https://play.google.com/store/apps/details?id=fr.leboncoin",
          domain: "play.google.com",
          downloadsKey: "leboncoin",
        }),
        workLink("yaoota", {
          size: "full",
          icon: "yaoota",
          blurb: "Installment payments app + search ~250K users",
          downloadsKey: "yaoota",
        }),
        workLink("hitchhiker", {
          size: "full",
          icon: "hitchhiker",
          blurb: "Stabilized travel/shipping Android architecture",
        }),
        workLink("zad", {
          size: "full",
          icon: "zad",
          blurb: "Arabic Emotion Assistant · ~250K MAU · 4.7★",
          downloadsKey: "zad",
        }),
      ],
    },
    {
      id: "dribbble",
      title: "Design work on Dribbble",
      items: dribbbleItems,
    },
    {
      id: "photographs",
      title: "Photographs I took",
      items: photographItems,
    },
  ],
};
