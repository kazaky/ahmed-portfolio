# Ahmed Elshahawi — Bento Portfolio

A static recreation of the [bento.me/shahawi](https://web.archive.org/web/20240522205750/https://bento.me/shahawi) layout — left profile sidebar, sectioned bento grids, and link cards.

## Quick start

```bash
npm install
npm run dev
```

## Edit content

**Edit plain JSON — see [`content/README.md`](content/README.md).**

| File | Edit this for… |
|------|----------------|
| [`content/me.json`](content/me.json) | Bio, email, CTAs, section titles, card order |
| [`content/work.json`](content/work.json) | Jobs & products: dates, Context / Did / Impact, blurbs |

Do not edit `content/work.ts` or `content/site.ts` for copy — they only load the JSON.

### Block sizes (6-column grid)

| Size | Layout |
|------|--------|
| `compact` | Narrow (1/3 width) — social links |
| `1x1` | Small |
| `2x1` | Wide (2/3 width) |
| `1x2` | Tall |
| `2x2` | Large |
| `half` | Half width |
| `full` | Full width (experience cards) |
| `heatmap` | Full-width GitHub activity chart |

## Add photos

Photos come from Instagram fetch into `content/instagram-posts.json`, or add files under `public/photos/`.

## Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy out --project-name ahmed-portfolio
```

Build settings: `npm run build`, output `out/`.

Live: https://ahmed-portfolio-mmi.pages.dev  
Repo: https://github.com/kazaky/ahmed-portfolio

To attach a personal domain, see [docs/custom-domain.md](docs/custom-domain.md) and update `metadataBase` in `src/app/layout.tsx`.
