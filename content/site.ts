import type { BrandIconId, CardSize, LinkItem, SiteConfig } from "@/lib/types";
import me from "./me.json";
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

type HomeCardRef = {
  slug: string;
  size: CardSize;
  icon: BrandIconId;
};

function workLink(ref: HomeCardRef): LinkItem {
  const w = getWork(ref.slug);
  if (!w) throw new Error(`Missing work entry: ${ref.slug}`);
  const downloads =
    w.playStoreId && w.playStoreId in playStoreStats
      ? appDownloads(w.playStoreId as keyof typeof playStoreStats)
      : {};
  return {
    type: "link",
    id: ref.slug,
    title: w.title,
    url: w.homeUrl ?? w.url,
    domain: w.homeDomain ?? w.domain,
    size: ref.size,
    icon: ref.icon,
    blurb: w.homeBlurb ?? w.tagline,
    preview: w.preview,
    work: `/work/${ref.slug}`,
    comingSoon: w.comingSoon,
    roleTitle: w.roleTitle,
    period: w.period,
    ...downloads,
  };
}

function buildSidebarRoles(): SiteConfig["profile"]["roles"] {
  return me.sidebarRoles.map((role) => {
    if (!("currently" in role) && !("previously" in role)) {
      return { label: role.label };
    }

    const detailParts: Array<string | { label: string; url: string }> = [];
    if (role.currently?.length) {
      detailParts.push("Currently ");
      role.currently.forEach((link, i) => {
        if (i > 0) detailParts.push(" ");
        detailParts.push(link);
      });
    }
    if (role.previously?.length) {
      detailParts.push("\nPreviously ");
      role.previously.forEach((link, i) => {
        if (i > 0) detailParts.push(" ");
        detailParts.push(link);
      });
    }
    return { label: role.label, detailParts };
  });
}

export const site: SiteConfig = {
  profile: {
    name: me.name,
    avatar: me.avatar,
    bio: me.bio,
    cta: me.cta,
    ctaSecondary: {
      label: me.ctaSecondary.label,
      url: me.ctaSecondary.url.startsWith("mailto:")
        ? me.ctaSecondary.url
        : `mailto:${me.email}`,
    },
    ctaTertiary: me.ctaTertiary,
    roles: buildSidebarRoles(),
  },
  sections: [
    {
      id: "links",
      items: [
        ...me.links.map((link) => ({
          type: "link" as const,
          id: link.id,
          title: link.title,
          url: link.url,
          domain: link.domain,
          size: "half" as const,
          icon: link.icon as BrandIconId,
          follow: "follow" in link ? Boolean(link.follow) : undefined,
        })),
        {
          type: "location",
          id: "location",
          title: me.locationTitle,
          size: "map",
          lat: me.location.lat,
          lng: me.location.lng,
          mapImage: me.location.mapImage,
        },
      ],
    },
    {
      id: "products",
      title: me.sections.products.title,
      items: me.sections.products.order.map((ref) =>
        workLink(ref as HomeCardRef),
      ),
    },
    {
      id: "experience",
      title: me.sections.experience.title,
      items: me.sections.experience.order.map((ref) =>
        workLink(ref as HomeCardRef),
      ),
    },
    {
      id: "dribbble",
      title: me.sections.dribbble.title,
      items: dribbbleItems,
    },
    {
      id: "photographs",
      title: me.sections.photographs.title,
      items: photographItems,
    },
  ],
};
