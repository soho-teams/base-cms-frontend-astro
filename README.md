# Base CMS — Astro Frontend Starter

Astro 5 frontend starter that consumes the [Base CMS](https://github.com/soho-teams/base-cms) headless API. Built as a digital-agency style site with Pages, Blog, Services, and Projects sections.

## Stack

- **Astro 5** — static site generator, TypeScript strict
- **Tailwind CSS 3** — styling
- **No client-side framework** — pure Astro components, minimal JavaScript shipped

## Quickstart

```bash
# Install
npm install

# Set the CMS API URL
cp .env.example .env
# edit .env: PUBLIC_CMS_API_URL=http://localhost:8000  (or your production URL)

# Run dev server
npm run dev
# → http://localhost:4321

# Build for production
npm run build
# Output: dist/
```

## Project structure

```
src/
├── lib/
│   ├── api.ts          # Typed fetch helpers (api.posts(), api.services(), …)
│   └── types.ts        # TS interfaces matching CMS responses
├── layouts/
│   └── BaseLayout.astro
├── components/
│   ├── Header.astro    # Top nav (uses CMS menu)
│   ├── Footer.astro    # Footer (uses Site Settings)
│   ├── Hero.astro
│   ├── ServiceCard.astro
│   ├── ProjectCard.astro
│   ├── PostCard.astro
│   ├── Section.astro
│   └── Container.astro
└── pages/
    ├── index.astro                    # Home
    ├── about.astro
    ├── contact.astro
    ├── pages/[slug].astro              # Dynamic CMS pages
    ├── blog/index.astro
    ├── blog/[slug].astro
    ├── services/index.astro
    ├── services/[slug].astro
    ├── projects/index.astro
    └── projects/[slug].astro
```

## CMS API endpoints consumed

| Endpoint | Used in |
|---|---|
| `GET /api/v1/site-settings/` | Header logo, Footer, SEO defaults |
| `GET /api/v1/menus/main/items/` | Header navigation |
| `GET /api/v1/pages/` | Dynamic page generation |
| `GET /api/v1/pages/<slug>/` | Page detail |
| `GET /api/v1/posts/` | Blog list, Home recent posts |
| `GET /api/v1/posts/<slug>/` | Post detail |
| `GET /api/v1/services/` | Services list, Home services grid |
| `GET /api/v1/services/<slug>/` | Service detail |
| `GET /api/v1/projects/` | Projects list, Home featured projects (`?featured=true`) |
| `GET /api/v1/projects/<slug>/` | Project detail (gallery, tech stack) |

All endpoints are fetched at build time → fully static output, no API calls at runtime.

## Customization

- **Colors:** edit `brand.*` palette in `tailwind.config.mjs`
- **Fonts:** swap the Google Fonts `<link>` in `BaseLayout.astro` and update `fontFamily` in Tailwind config
- **Layout:** all reusable bits live in `src/components/` and `src/layouts/`

## SEO

The starter ships with production-ready SEO baked in:

- **Sitemap** — `GET /sitemap.xml` is generated at build time and includes the home page, blog/services/projects index pages, contact, and every Page/Post/Service/Project pulled from the CMS.
- **Robots** — `GET /robots.txt` allows all crawlers and points at the sitemap.
- **Canonical + OG + Twitter cards** — every page rendered through `BaseLayout` emits `<link rel="canonical">`, full Open Graph tags (`og:type`, `og:url`, `og:site_name`, `og:locale`, `og:image`), and Twitter card tags (`summary` / `summary_large_image`).
- **JSON-LD** — detail pages include schema.org structured data:
  - `BlogPosting` on `/blog/[slug]`
  - `CreativeWork` on `/projects/[slug]`
  - `Service` on `/services/[slug]`
  - `WebSite` on `/` (home)

Set `PUBLIC_SITE_URL` in your environment (e.g. `https://www.mysite.com`) so canonicals and the sitemap emit absolute URLs. This is also picked up by `astro.config.mjs` as the `site` value.

```bash
# .env
PUBLIC_SITE_URL=https://www.mysite.com
```

## Deployment

Build outputs static files in `dist/`. Deploy to:

- **Vercel** — connect repo, set `PUBLIC_CMS_API_URL` env var, deploy
- **Netlify** — same
- **Cloudflare Pages** — same
- **GitHub Pages** — push `dist/` to `gh-pages` branch
- **Any static host** — drop `dist/` onto the server

When you update content in the CMS, trigger a rebuild on your host (webhooks supported by Vercel/Netlify).

## License

MIT
