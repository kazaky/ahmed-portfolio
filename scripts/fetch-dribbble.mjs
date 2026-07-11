#!/usr/bin/env node
/**
 * Refresh Dribbble shot previews from dribbble.com/shahawi
 * Usage: node scripts/fetch-dribbble.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const USERNAME = "shahawi";
const LIMIT = 6;
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "dribbble");
const outJson = join(root, "content", "dribbble-shots.json");

mkdirSync(outDir, { recursive: true });

const res = await fetch(`https://dribbble.com/${USERNAME}`, {
  headers: { "User-Agent": "Mozilla/5.0" },
});
if (!res.ok) {
  console.error(`Failed: ${res.status}`);
  process.exit(1);
}
const page = await res.text();

const linkRe =
  /data-shot-thumbnail-link="(\d+)" href="(\/shots\/[^"]+)"/g;
const shots = [];
let m;
while ((m = linkRe.exec(page)) && shots.length < LIMIT) {
  const id = m[1];
  const path = m[2].split("?")[0];
  if (shots.some((s) => s.id === id)) continue;
  const idx = m.index;
  const window = page.slice(Math.max(0, idx - 2500), idx);
  const imgM = window.match(
    /data-src="(https:\/\/cdn\.dribbble\.com\/userupload\/[^"]+)"/,
  );
  const titleM = page
    .slice(idx, idx + 800)
    .match(/View ([^<]+)<\/span>/);
  const title =
    titleM?.[1]?.trim() ||
    path.split("-").slice(1).join(" ").replace(/-/g, " ");
  const imageBase = imgM
    ? imgM[1].replace(/&amp;/g, "&").split("?")[0]
    : null;
  if (!imageBase) continue;
  shots.push({ id, path, title, imageBase });
}

const posts = [];
for (const s of shots) {
  const imgRes = await fetch(s.imageBase, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!imgRes.ok) {
    console.warn(`Skip ${s.id}: ${imgRes.status}`);
    continue;
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const filename = `shot-${s.id}.png`;
  writeFileSync(join(outDir, filename), buf);
  console.log(`✓ ${filename}`);
  posts.push({
    id: `dribbble-${s.id}`,
    title: s.title,
    image: `/dribbble/${filename}`,
    url: `https://dribbble.com${s.path}`,
  });
}

writeFileSync(
  outJson,
  JSON.stringify({ username: USERNAME, shots: posts }, null, 2) + "\n",
);
console.log(`Wrote ${posts.length} shots → content/dribbble-shots.json`);
