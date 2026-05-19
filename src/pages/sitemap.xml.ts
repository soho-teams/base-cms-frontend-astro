import type { APIRoute } from "astro";
import { api } from "~/lib/api";

const SITE = import.meta.env.PUBLIC_SITE_URL || "https://example.com";

function url(path: string, lastmod?: string | null, priority = "0.7", changefreq = "weekly") {
  return `<url><loc>${SITE}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export const GET: APIRoute = async () => {
  const [pages, posts, services, projects] = await Promise.all([
    api.pages(),
    api.posts(),
    api.services(),
    api.projects(),
  ]);

  const entries: string[] = [
    url("/", undefined, "1.0", "daily"),
    url("/blog", undefined, "0.9", "daily"),
    url("/services", undefined, "0.9", "weekly"),
    url("/projects", undefined, "0.9", "weekly"),
    url("/contact", undefined, "0.6", "monthly"),
  ];

  for (const p of pages.results) entries.push(url(`/${p.slug}`, p.published_at, "0.7", "monthly"));
  for (const p of posts.results) entries.push(url(`/blog/${p.slug}`, p.published_at, "0.7", "weekly"));
  for (const s of services.results) entries.push(url(`/services/${s.slug}`, undefined, "0.7", "weekly"));
  for (const p of projects.results) entries.push(url(`/projects/${p.slug}`, undefined, "0.7", "weekly"));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
