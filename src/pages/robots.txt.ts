import type { APIRoute } from "astro";

const SITE = import.meta.env.PUBLIC_SITE_URL || "https://example.com";

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
