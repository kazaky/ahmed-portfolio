export type WorkKind = "project" | "role";

export interface WorkEntry {
  slug: string;
  kind: WorkKind;
  title: string;
  /** Job title for roles, e.g. Senior Android Engineer */
  roleTitle?: string;
  tagline: string;
  url: string;
  domain: string;
  icon: string;
  preview: string;
  comingSoon?: boolean;
  /** Display period, e.g. "May 2018 – Present" */
  period?: string;
  /** Context / challenge */
  context: string;
  /** What you did */
  did: string;
  /** Impact / result */
  impact: string;
}

/** Personal portfolio write-ups — products built & roles held. */
export const workEntries: WorkEntry[] = [
  // —— Roles (XING + GitHub; LinkedIn is private) ——
  {
    slug: "ebay",
    kind: "role",
    title: "eBay",
    roleTitle: "Staff Software Engineer",
    tagline:
      "Staff Software Engineer on marketplace product surfaces used by millions of buyers and sellers.",
    url: "https://www.ebayinc.com",
    domain: "ebayinc.com",
    icon: "/icons/ebay.svg",
    preview: "/previews/ebay.jpg",
    period: "2022 – Present",
    context:
      "eBay’s marketplace spans discovery, listing, trust, and checkout at global scale. Shipping features here means coordinating across platforms, careful rollout, and deep product sense from years in classifieds.",
    did: "Staff Software Engineer on marketplace product engineering. Partner with design and product on reliability and experience improvements across the eBay ecosystem — continuing from Senior Android work on eBay Kleinanzeigen (Kotlin, Jetpack, CI).",
    impact:
      "Contributing to core marketplace flows used worldwide, on top of classifieds craft from Kleinanzeigen, leboncoin / Adevinta, and earlier Android consumer apps.",
  },
  {
    slug: "kleinanzeigen",
    kind: "role",
    title: "Kleinanzeigen",
    roleTitle: "Senior Android Engineer",
    tagline:
      "Senior Android Engineer at eBay Kleinanzeigen GmbH — Germany’s leading classifieds marketplace.",
    url: "https://www.kleinanzeigen.de",
    domain: "kleinanzeigen.de",
    icon: "/icons/kleinanzeigen.png",
    preview: "/previews/kleinanzeigen.jpg",
    period: "May 2018 – 2022",
    context:
      "Kleinanzeigen is how millions of people in Germany buy and sell locally. The Android app must feel fast and trustworthy under huge catalog and traffic load.",
    did: "Senior Android Engineer at eBay Kleinanzeigen GmbH (from May 2018). Shipped native Android with Kotlin, MVVM / Jetpack, automated tests, and CI through the Adevinta / eBay Kleinanzeigen era.",
    impact:
      "Part of the team behind Germany’s go-to classifieds app — tens of millions of downloads and everyday local commerce nationwide.",
  },
  {
    slug: "leboncoin",
    kind: "role",
    title: "leboncoin",
    roleTitle: "Software Engineer",
    tagline:
      "Classifieds engineering in the Adevinta family — France’s default local commerce product.",
    url: "https://www.leboncoin.fr",
    domain: "leboncoin.fr",
    icon: "/icons/leboncoin.png",
    preview: "/previews/leboncoin.jpg",
    period: "2019 – 2022",
    context:
      "leboncoin sets the bar for second-hand UX in France. Reliability and craft on mobile and web are non-negotiable at that scale.",
    did: "Software engineering within Adevinta’s classifieds group on leboncoin product surfaces — buyer/seller journeys alongside related Kleinanzeigen work in the same organization.",
    impact:
      "Hands-on experience on one of Europe’s most used classifieds products — patterns that carried into Kleinanzeigen and later eBay marketplace work.",
  },
  {
    slug: "yaoota",
    kind: "role",
    title: "Yaoota",
    roleTitle: "Senior Android Developer",
    tagline:
      "Built an installment-payments app from scratch and scaled Yaoota’s shopping search toward ~250K users.",
    url: "https://play.google.com/store/apps/details?id=com.flyingelephantlab.yaoota",
    domain: "play.google.com",
    icon: "/icons/yaoota.png",
    preview: "/previews/yaoota.jpg",
    period: "Sep 2017 – Aug 2018",
    context:
      "Shopping across stores was fragmented. Shoppers needed clear price comparison; merchants needed modern mobile tools like installment payments.",
    did: "Senior Android Developer (Sep 2017 – Aug 2018). Built a secure payment-by-installment app from scratch — MVVM, Espresso & JUnit, Kotlin, Agile. Maintained and scaled Yaoota’s shopping search Android app.",
    impact:
      "Installment product shipped for the local market; shopping search grew toward ~250K users.",
  },
  {
    slug: "zad",
    kind: "role",
    title: "Zad",
    roleTitle: "Junior Android Developer",
    tagline:
      "Junior Android on Zad — Arabic Emotion Assistant that reached ~250K MAU at 4.7★.",
    url: "https://play.google.com/store/apps/details?id=com.app.zad",
    domain: "play.google.com",
    icon: "/icons/zad.png",
    preview: "/previews/zad.jpg",
    period: "Jan 2014 – Jan 2016",
    context:
      "Arabic audiences wanted culturally native mood content — not a thin localization of a Western quotes app.",
    did: "Junior Android Developer (Jan 2014 – Jan 2016). Learned Android core components with seniors. Shipped on Zad (Emotion Assistant), FocusMusic.fm streaming, a context-aware TODO app, and the Eleven FlashWatch widget for Egypt.",
    impact:
      "Zad hit ~250K MAU with a 4.7 rating — early proof of shipping culturally native Android products at scale.",
  },
  {
    slug: "hitchhiker",
    kind: "role",
    title: "HitchHiker",
    roleTitle: "Senior Android Developer",
    tagline:
      "Stabilized a travel/shipping marketplace app and rebuilt it toward offline-first MVVM.",
    url: "https://hitchhiker.app",
    domain: "hitchhiker.app",
    icon: "/icons/hitchhiker.png",
    preview: "/previews/hitchhiker.jpg",
    period: "Jun 2016 – Aug 2017",
    context:
      "Travel and shipping apps lose trust fast when memory leaks, threading bugs, and weak architecture surface under real use.",
    did: "Senior Android Developer (Jun 2016 – Aug 2017). Fixed leaks and threading with LeakCanary and RxJava; tightened MVP separation of concerns. Built an offline-first, Dagger2-modularized reactive MVVM stack with Data Binding, Kotlin, tests, and automated deployment.",
    impact:
      "Moved the app from firefighting to a sustainable architecture — offline-first MVVM with DI and CI.",
  },

  // —— Projects ——
  {
    slug: "misho",
    kind: "project",
    title: "Misho.day",
    tagline:
      "A prayer-centered daily planner — structure the day around salah, not the other way around.",
    url: "https://misho.day",
    domain: "misho.day",
    icon: "/icons/misho.svg",
    preview: "/previews/misho.jpg",
    context:
      "Generic planners ignore prayer times. Muslims juggle calendars, adhan apps, and notes with no salah-first day view.",
    did: "Designed and engineered the web app end-to-end (Next.js-style product surface). Centered the UX on prayer windows, daily focus, and a calm UI; shipped public beta at misho.day.",
    impact:
      "Live product in the Arabic & Islamic tools suite — salah-first planning people can use today.",
  },
  {
    slug: "tawazun",
    kind: "project",
    title: "Tawazun.space",
    tagline:
      "A calm wellness space for reflection and healthier daily rhythm — without gamified noise.",
    url: "https://tawazun.space",
    domain: "tawazun.space",
    icon: "/icons/tawazun.svg",
    preview: "/previews/tawazun.jpg",
    context:
      "Most wellness apps push engagement loops. People seeking balance need a quieter, intentional surface.",
    did: "Owned concept, visual identity, and full-stack implementation. Shipped the public experience at tawazun.space with a distinctive calm aesthetic.",
    impact:
      "A live wellness product that reads as intentional rest — not another streak counter.",
  },
  {
    slug: "iqrar-dayn",
    kind: "project",
    title: "IqrarDayn.com",
    tagline:
      "Clear digital agreements for interest-free (dayn) lending between people.",
    url: "https://iqrardayn.com",
    domain: "iqrardayn.com",
    icon: "/icons/iqrar-dayn.svg",
    preview: "/previews/iqrar-dayn.jpg",
    context:
      "Informal loans strain relationships when terms stay vague. Muslim communities need documentation that respects Islamic principles.",
    did: "Defined product, UX, and engineering for a focused tool that formalizes dayn agreements — structure without interest-based framing.",
    impact:
      "A dedicated workflow that reduces ambiguity around debt while staying culturally aligned.",
  },
  {
    slug: "loqmaan",
    kind: "project",
    title: "Loqmaan.com",
    tagline:
      "A modern Arabic wisdom library — browse timeless quotes without hunting PDFs and feeds.",
    url: "https://loqmaan.com",
    domain: "loqmaan.com",
    icon: "/icons/loqmaan.png",
    preview: "/previews/loqmaan.jpg",
    context:
      "Arabic wisdom is scattered across social posts and scans. Readers lack a calm, browsable home.",
    did: "Built product, content architecture, and engineering for a bilingual-friendly wisdom platform at loqmaan.com.",
    impact:
      "A live library for casual browsing and deeper reading of Arabic wisdom.",
  },
  {
    slug: "arabic-watch",
    kind: "project",
    title: "Arabic Watch",
    tagline:
      "Traditional Arabic timekeeping as a modern, educational web utility.",
    url: "https://arabic-watch.pages.dev",
    domain: "arabic-watch.pages.dev",
    icon: "/icons/arabic-watch.svg",
    preview: "/previews/arabic-watch.jpg",
    context:
      "Arabic temporal systems are rich culturally but rare in everyday digital clocks.",
    did: "Researched the model, designed the interaction, and implemented a focused web experiment on Cloudflare Pages.",
    impact:
      "A working bridge between heritage timekeeping and modern UI craft.",
  },
  {
    slug: "falah",
    kind: "project",
    title: "Falah.io",
    tagline:
      "An Islamic tools suite — one calm surface for utilities that are usually scattered.",
    url: "https://falah.io",
    domain: "falah.io",
    icon: "/icons/falah.png",
    preview: "/previews/falah.jpg",
    comingSoon: true,
    context:
      "Prayer tools, references, and helpers live in different apps with inconsistent design.",
    did: "Defining suite architecture, brand, and roadmap; early builds in progress toward falah.io.",
    impact:
      "In progress — aim is one coherent Islamic tools experience. Coming soon.",
  },
  {
    slug: "basira",
    kind: "project",
    title: "Basira.io",
    tagline:
      "Clarity-first insight — help people see patterns and decide with more intention.",
    url: "https://basira.io",
    domain: "basira.io",
    icon: "/icons/basira.svg",
    preview: "/previews/basira.jpg",
    comingSoon: true,
    context:
      "Insight products drown people in dashboards. Clarity beats chart noise for personal decisions.",
    did: "Early concept, brand direction, and product framing for a clarity-first experience in the tools portfolio.",
    impact:
      "In progress — Basira is being shaped alongside the wider suite. Coming soon.",
  },
];

export function getWork(slug: string): WorkEntry | undefined {
  return workEntries.find((w) => w.slug === slug);
}

export function getWorkByKind(kind: WorkKind): WorkEntry[] {
  return workEntries.filter((w) => w.kind === kind);
}
