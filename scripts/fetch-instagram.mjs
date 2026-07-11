#!/usr/bin/env node
/**
 * Refresh Instagram post previews from @discover.streets
 * Usage: node scripts/fetch-instagram.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const USERNAME = "discover.streets";
const LIMIT = 9;
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const photosDir = join(root, "public", "photos");
const outJson = join(root, "content", "instagram-posts.json");

mkdirSync(photosDir, { recursive: true });

const res = await fetch(
  `https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "X-IG-App-ID": "936619743392459",
      Accept: "application/json",
    },
  },
);

if (!res.ok) {
  console.error(`Failed to fetch profile: ${res.status}`);
  process.exit(1);
}

const data = await res.json();
const user = data.data.user;
const edges = user.edge_owner_to_timeline_media.edges.slice(0, LIMIT);
const posts = [];

for (let i = 0; i < edges.length; i++) {
  const node = edges[i].node;
  const shortcode = node.shortcode;
  const imageUrl = node.display_url || node.thumbnail_src;
  const caption =
    node.edge_media_to_caption?.edges?.[0]?.node?.text?.split("\n")[0]?.slice(0, 80) ||
    `Instagram post ${shortcode}`;
  const filename = `ig-${i + 1}-${shortcode}.jpg`;
  const dest = join(photosDir, filename);

  const imgRes = await fetch(imageUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!imgRes.ok) {
    console.warn(`Skip ${shortcode}: image ${imgRes.status}`);
    continue;
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  writeFileSync(dest, buf);
  console.log(`✓ ${filename}`);

  const width = node.dimensions?.width ?? null;
  const height = node.dimensions?.height ?? null;

  posts.push({
    id: `ig-${shortcode}`,
    shortcode,
    image: `/photos/${filename}`,
    url: `https://www.instagram.com/p/${shortcode}/`,
    alt: caption,
    ...(width && height
      ? { width, height, aspect: Math.round((width / height) * 10000) / 10000 }
      : {}),
  });
}

writeFileSync(
  outJson,
  JSON.stringify({ username: user.username, posts }, null, 2) + "\n",
);
console.log(`Wrote ${posts.length} posts → content/instagram-posts.json`);
