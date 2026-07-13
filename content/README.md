# Edit your portfolio text here

All copy lives in **JSON** — open the file, change the string, save.
No TypeScript needed for normal edits.

## Files to edit

| File | What it controls |
|------|------------------|
| **[`me.json`](me.json)** | Name, bio, email, site URL, CTAs, sidebar roles, social link titles, section titles, **card order** |
| **[`work.json`](work.json)** | Every job & product: dates, titles, Context / What I did / Impact, homepage blurbs |
| `play-store-stats.json` | Download badges (optional) |
| `dribbble-shots.json` / `instagram-posts.json` | Usually filled by fetch scripts |

## Quick recipes

### Change a job date or description
Open **`work.json`**, find the entry by `"slug"` (e.g. `"ebay"`), edit:

- `period` — timeline dates (`"Dec 2024 – Present"`)
- `roleTitle` — e.g. Staff Software Engineer
- `tagline` — one-liner under the title on the work page
- `homeBlurb` — short line on the homepage card
- `context` / `did` / `impact` — the three work-page paragraphs

### Change your bio or email
Open **`me.json`**:

- `bio`, `email`, `siteUrl`
- `cta` / `ctaSecondary` / `ctaTertiary` — button labels & URLs

### Reorder Work Experience or Products
In **`me.json`** → `sections.experience.order` or `sections.products.order` — move the `{ "slug", "size", "icon" }` objects.

### Add a new role or product
1. Add a full object to **`work.json`** (copy an existing one and change fields).
2. Add its slug to the matching `order` array in **`me.json`**.
3. Put icons/previews in `/public/icons` and `/public/previews` if needed.

## Tips

- Keep JSON valid: commas between fields, double quotes, no trailing comma on the last item.
- After edits: `npm run build` (or your usual deploy).
- Don’t edit `work.ts` / `site.ts` for text — those only load the JSON.
