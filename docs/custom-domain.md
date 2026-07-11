# Custom domain (Cloudflare Pages)

1. In Cloudflare Dashboard → Pages → **ahmed-portfolio** → Custom domains
2. Add your domain (e.g. `ahmed.elshahawy.com` or `www.…`)
3. Follow DNS instructions (CNAME to `ahmed-portfolio-mmi.pages.dev`)
4. Update `siteUrl` in `src/app/layout.tsx` `metadataBase` to the new domain
