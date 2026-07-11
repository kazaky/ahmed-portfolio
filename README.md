# Ahmed Elshahawi — Bento Portfolio

A static recreation of the [bento.me/shahawi](https://web.archive.org/web/20240522205750/https://bento.me/shahawi) layout — left profile sidebar, sectioned bento grids, and link cards.

## Quick start

```bash
npm install
npm run dev
```

## Edit content

All content lives in [`content/site.ts`](content/site.ts):

- **Profile** — name, avatar, roles
- **Sections** — titled groups (`Apps I worked on`, `Artistic Side`, `Photographs I took`)
- **Items** — link cards, location cards, or photo placeholders

### Block sizes (6-column grid)

| Size | Layout |
|------|--------|
| `1x1` | Small |
| `2x1` | Wide (2/3 width) |
| `1x2` | Tall |
| `2x2` | Large |

## Add photos

Replace photo placeholders in the `photographs` section:

```ts
{ type: "photo", id: "p1", size: "1x1", image: "/photos/street-1.jpg", alt: "..." }
```

Drop images in `public/photos/`.

## Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy out --project-name ahmed-portfolio
```

Build settings: `npm run build`, output `out/`.
