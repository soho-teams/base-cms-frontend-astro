import type {
  Asset,
  MenuItem,
  PageDetail,
  PageList,
  Paginated,
  PostDetail,
  PostList,
  ProjectDetail,
  ProjectList,
  ServiceDetail,
  ServiceList,
  SiteSettings,
} from "./types";

const API_URL = import.meta.env.PUBLIC_CMS_API_URL ?? "http://localhost:8000";

async function get<T>(path: string): Promise<T> {
  const url = `${API_URL}/api/v1${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`CMS request failed: ${res.status} ${res.statusText} (${url})`);
  }
  return res.json() as Promise<T>;
}

/** Returns a default object if the CMS is unreachable or returns 404 — keeps SSG from breaking. */
async function safeGet<T>(path: string, fallback: T): Promise<T> {
  try {
    return await get<T>(path);
  } catch (err) {
    console.warn(`[CMS] ${path} → fallback (${(err as Error).message})`);
    return fallback;
  }
}

export const api = {
  siteSettings: () =>
    safeGet<SiteSettings>("/site-settings/", {
      site_name: "Base CMS Demo",
      tagline: "A digital agency starter",
      contact_email: "",
      logo: null,
      favicon: null,
      default_seo_title: "",
      default_seo_description: "",
      social_links: {},
    }),

  menuItems: (slug = "main") =>
    safeGet<MenuItem[]>(`/menus/${slug}/items/`, []),

  pages: () => safeGet<Paginated<PageList>>("/pages/", { count: 0, next: null, previous: null, results: [] }),
  page: (slug: string) => get<PageDetail>(`/pages/${slug}/`),

  posts: () => safeGet<Paginated<PostList>>("/posts/", { count: 0, next: null, previous: null, results: [] }),
  post: (slug: string) => get<PostDetail>(`/posts/${slug}/`),

  services: () => safeGet<Paginated<ServiceList>>("/services/", { count: 0, next: null, previous: null, results: [] }),
  service: (slug: string) => get<ServiceDetail>(`/services/${slug}/`),

  projects: (opts?: { featured?: boolean; category?: string }) => {
    const params = new URLSearchParams();
    if (opts?.featured) params.set("featured", "true");
    if (opts?.category) params.set("category", opts.category);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return safeGet<Paginated<ProjectList>>(`/projects/${qs}`, { count: 0, next: null, previous: null, results: [] });
  },
  project: (slug: string) => get<ProjectDetail>(`/projects/${slug}/`),
};

/** Get the best thumbnail URL from an asset, falling back to file_url. */
export function assetUrl(asset: Asset | null | undefined, size: "small" | "medium" | "large" = "medium"): string | null {
  if (!asset) return null;
  return asset.thumbnails_urls?.[size] ?? asset.file_url ?? null;
}

/** Absolute URL for relative asset paths (CMS sometimes returns /media/...). */
export function absoluteUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_URL}${path}`;
}
