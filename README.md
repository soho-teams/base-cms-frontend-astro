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
