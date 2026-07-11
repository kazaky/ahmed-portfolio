import type { CardSize, SiteConfig } from "@/lib/types";
import instagramPosts from "./instagram-posts.json";
import dribbbleShots from "./dribbble-shots.json";
import playStoreStats from "./play-store-stats.json";

const photographItems = instagramPosts.posts.map((post, index) => ({
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

export const site: SiteConfig = {
  profile: {
    name: "Ahmed Elshahawy",
    avatar: "/avatar.jpg",
    bio: "Staff engineer at eBay shipping marketplace products. Building Arabic & Islamic tools on the side — design, code, and street photography from Berlin.",
    cta: {
      label: "Connect on LinkedIn",
      url: "https://www.linkedin.com/in/shahawi",
    },
    ctaSecondary: {
      label: "GitHub",
      url: "https://github.com/kazaky",
    },
    roles: [
      {
        label: "Staff Software Engineer",
        detailParts: [
          "Currently ",
          { label: "@eBay", url: "https://www.ebayinc.com" },
          "\nPreviously ",
          { label: "@Adevinta", url: "https://www.adevinta.com" },
          " ",
          { label: "@Kleinanzeigen", url: "https://www.kleinanzeigen.de" },
          " ",
          { label: "@leboncoin", url: "https://www.leboncoin.fr" },
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
        {
          type: "link",
          id: "misho",
          title: "Misho.day",
          url: "https://misho.day",
          domain: "misho.day",
          size: "2x1",
          icon: "misho",
          blurb: "Prayer-centered daily planner",
          preview: "/previews/misho.jpg",
          caseStudy: "/work/misho",
        },
        {
          type: "link",
          id: "tawazun",
          title: "Tawazun.space",
          url: "https://tawazun.space",
          domain: "tawazun.space",
          size: "1x2",
          icon: "tawazun",
          blurb: "Wellness and balance space",
          preview: "/previews/tawazun.jpg",
        },
        {
          type: "link",
          id: "iqrar-dayn",
          title: "IqrarDayn.com",
          url: "https://iqrardayn.com",
          domain: "iqrardayn.com",
          size: "half",
          icon: "iqrar-dayn",
          blurb: "Halal lending agreements",
        },
        {
          type: "link",
          id: "loqmaan",
          title: "Loqmaan.com",
          url: "https://loqmaan.com",
          domain: "loqmaan.com",
          size: "half",
          icon: "loqmaan",
          blurb: "Arabic wisdom library",
        },
        {
          type: "link",
          id: "arabic-watch",
          title: "Arabic Watch",
          url: "https://arabic-watch.pages.dev",
          domain: "arabic-watch.pages.dev",
          size: "half",
          icon: "arabic-watch",
          blurb: "Traditional Arabic timekeeping",
        },
        {
          type: "link",
          id: "falah",
          title: "Falah.io",
          url: "https://falah.io",
          domain: "falah.io",
          size: "half",
          icon: "falah",
          blurb: "Islamic tools suite",
          comingSoon: true,
        },
        {
          type: "link",
          id: "basira",
          title: "Basira.io",
          url: "https://basira.io",
          domain: "basira.io",
          size: "half",
          icon: "basira",
          blurb: "Insight and clarity platform",
          comingSoon: true,
        },
      ],
    },
    {
      id: "apps",
      title: "Apps I worked on",
      items: [
        {
          type: "link",
          id: "kleinanzeigen",
          title: "Kleinanzeigen",
          url: "https://play.google.com/store/apps/details?id=com.ebay.kleinanzeigen",
          domain: "play.google.com",
          size: "2x1",
          icon: "kleinanzeigen",
          blurb: "Germany's classifieds marketplace",
          preview: "/previews/kleinanzeigen.jpg",
          ...appDownloads("kleinanzeigen"),
        },
        {
          type: "link",
          id: "leboncoin",
          title: "leboncoin",
          url: "https://play.google.com/store/apps/details?id=fr.leboncoin",
          domain: "play.google.com",
          size: "1x2",
          icon: "leboncoin",
          blurb: "France's classifieds marketplace",
          preview: "/previews/leboncoin.jpg",
          ...appDownloads("leboncoin"),
        },
        {
          type: "link",
          id: "yaoota",
          title: "Yaoota",
          url: "https://play.google.com/store/apps/details?id=com.flyingelephantlab.yaoota",
          domain: "play.google.com",
          size: "half",
          icon: "yaoota",
          blurb: "Middle East price comparison",
          ...appDownloads("yaoota"),
        },
        {
          type: "link",
          id: "zad",
          title: "Zad",
          url: "https://play.google.com/store/apps/details?id=com.app.zad",
          domain: "play.google.com",
          size: "half",
          icon: "zad",
          blurb: "Arabic mood quotes app",
          ...appDownloads("zad"),
        },
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
