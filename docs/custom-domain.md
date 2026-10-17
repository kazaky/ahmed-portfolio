# Custom domain (Cloudflare Pages)

Canonical domain: **https://ahmed-elshahawy.com** (Cloudflare Registrar + Pages).

## Already done

- Pages project: **ahmed-portfolio** (`ahmed-portfolio-mmi.pages.dev`)
- Custom hostnames added: `ahmed-elshahawy.com`, `www.ahmed-elshahawy.com`
- `siteUrl` in [`content/me.json`](../content/me.json) → `https://ahmed-elshahawy.com`

## Live DNS (configured)

| Type  | Name | Target                         | Proxy |
|-------|------|--------------------------------|-------|
| CNAME | `@`  | `ahmed-portfolio-mmi.pages.dev` | Proxied |
| CNAME | `www`| `ahmed-portfolio-mmi.pages.dev` | Proxied |

Both custom domains are **Active** on Pages.

## Redeploy

```bash
npm run build
npx wrangler pages deploy out --project-name ahmed-portfolio
```
