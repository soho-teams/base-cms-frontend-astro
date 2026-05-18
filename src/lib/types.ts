export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Asset {
  id: number;
  file_url: string;
  thumbnails_urls?: { small?: string; medium?: string; large?: string };
  alt_text?: string;
  caption?: string;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  contact_email: string;
  logo: Asset | null;
  favicon: Asset | null;
  default_seo_title: string;
  default_seo_description: string;
  social_links: Record<string, string>;
}

export interface MenuItem {
  id: number;
  label: string;
  resolved_url: string;
  link_type: string;
  order: number;
  open_in_new_tab: boolean;
  children?: MenuItem[];
}

export interface PageList {
  id: number;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
}

export interface PageDetail extends PageList {
  body: string;
  featured_image: Asset | null;
  seo_title: string;
  seo_description: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface PostList {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  status: string;
  published_at: string | null;
}

export interface PostDetail extends PostList {
  body: string;
  featured_image: Asset | null;
  categories: Category[];
  tags: Tag[];
  seo_title: string;
  seo_description: string;
  author: number | null;
}

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ServiceList {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  icon: Asset | null;
  category: ServiceCategory | null;
  price_range: string;
  order: number;
}

export interface ServiceDetail extends ServiceList {
  description: string;
  featured_image: Asset | null;
  seo_title: string;
  seo_description: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProjectList {
  id: number;
  title: string;
  slug: string;
  client_name: string;
  year: number | null;
  short_description: string;
  hero_image: Asset | null;
  category: ProjectCategory | null;
  featured: boolean;
}

export interface ProjectDetail extends ProjectList {
  body: string;
  gallery: Asset[];
  tech_stack: string;
  tech_stack_list: string[];
  live_url: string;
  github_url: string;
  seo_title: string;
  seo_description: string;
}
