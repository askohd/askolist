import type { MetadataRoute } from "next";
import { supabaseRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://www.askocafe.com";

type ServerSitemapRow = {
  id: string;
  slug?: string | null;
  created_at?: string | null;
  last_bump?: string | null;
  updated_at?: string | null;
};

const RESERVED_SERVER_PATHS = new Set([
  "deutsch",
  "gaming",
  "anime",
  "community",
  "minecraft",
  "valorant",
]);

function getBaseUrl() {
  return SITE_URL.replace(/\/$/, "");
}

function getServerPublicPath(server: ServerSitemapRow) {
  return String(server.slug || server.id || "").trim();
}

function getValidDate(...values: Array<string | null | undefined>) {
  for (const value of values) {
    if (!value) continue;

    const date = new Date(value);

    if (Number.isFinite(date.getTime())) {
      return date;
    }
  }

  return new Date();
}

function getNewestDate(servers: ServerSitemapRow[]) {
  if (servers.length === 0) {
    return new Date();
  }

  const times = servers
    .map((server) =>
      getValidDate(server.updated_at, server.last_bump, server.created_at).getTime()
    )
    .filter((time) => Number.isFinite(time));

  if (times.length === 0) {
    return new Date();
  }

  return new Date(Math.max(...times));
}

function getServerLastModified(server: ServerSitemapRow) {
  return getValidDate(server.updated_at, server.last_bump, server.created_at);
}

async function getApprovedServers(): Promise<ServerSitemapRow[]> {
  const queries = [
    "servers?approved=eq.true&status=eq.approved&select=id,slug,updated_at,created_at,last_bump&order=created_at.desc&limit=5000",
    "servers?approved=eq.true&status=eq.approved&select=id,slug,created_at,last_bump&order=created_at.desc&limit=5000",
    "servers?approved=eq.true&status=eq.approved&select=id,slug&limit=5000",
    "servers?approved=is.true&status=eq.approved&select=id,slug&limit=5000",
  ];

  for (const query of queries) {
    try {
      const servers = await supabaseRequest(query);

      if (Array.isArray(servers) && servers.length > 0) {
        return servers.filter((server) => {
          const publicPath = getServerPublicPath(server);
          return Boolean(server?.id && publicPath);
        });
      }
    } catch (error) {
      console.error("Sitemap server query failed:", query, error);
    }
  }

  return [];
}

function createSitemapEntry({
  url,
  lastModified,
  changeFrequency,
  priority,
}: {
  url: string;
  lastModified?: Date;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}): MetadataRoute.Sitemap[number] {
  return {
    url,
    lastModified,
    changeFrequency,
    priority,
  };
}

function dedupeSitemap(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (seen.has(entry.url)) {
      return false;
    }

    seen.add(entry.url);
    return true;
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const servers = await getApprovedServers();
  const latestServerUpdate = getNewestDate(servers);

  const staticPages: MetadataRoute.Sitemap = [
    createSitemapEntry({
      url: baseUrl,
      lastModified: latestServerUpdate,
      changeFrequency: "daily",
      priority: 1,
    }),
    createSitemapEntry({
      url: `${baseUrl}/servers`,
      lastModified: latestServerUpdate,
      changeFrequency: "hourly",
      priority: 0.98,
    }),
    createSitemapEntry({
      url: `${baseUrl}/servers/deutsch`,
      lastModified: latestServerUpdate,
      changeFrequency: "daily",
      priority: 0.94,
    }),
    createSitemapEntry({
      url: `${baseUrl}/servers/gaming`,
      lastModified: latestServerUpdate,
      changeFrequency: "daily",
      priority: 0.9,
    }),
    createSitemapEntry({
      url: `${baseUrl}/servers/anime`,
      lastModified: latestServerUpdate,
      changeFrequency: "daily",
      priority: 0.9,
    }),
    createSitemapEntry({
      url: `${baseUrl}/servers/community`,
      lastModified: latestServerUpdate,
      changeFrequency: "daily",
      priority: 0.9,
    }),
    createSitemapEntry({
      url: `${baseUrl}/servers/minecraft`,
      lastModified: latestServerUpdate,
      changeFrequency: "daily",
      priority: 0.88,
    }),
    createSitemapEntry({
      url: `${baseUrl}/servers/valorant`,
      lastModified: latestServerUpdate,
      changeFrequency: "daily",
      priority: 0.88,
    }),
    createSitemapEntry({
      url: `${baseUrl}/submit`,
      lastModified: latestServerUpdate,
      changeFrequency: "weekly",
      priority: 0.78,
    }),
    createSitemapEntry({
      url: `${baseUrl}/shop`,
      changeFrequency: "weekly",
      priority: 0.58,
    }),
    createSitemapEntry({
      url: `${baseUrl}/support`,
      changeFrequency: "monthly",
      priority: 0.58,
    }),
    createSitemapEntry({
      url: `${baseUrl}/info`,
      changeFrequency: "monthly",
      priority: 0.58,
    }),
    createSitemapEntry({
      url: `${baseUrl}/datenschutz`,
      changeFrequency: "yearly",
      priority: 0.25,
    }),
    createSitemapEntry({
      url: `${baseUrl}/nutzungsbedingungen`,
      changeFrequency: "yearly",
      priority: 0.25,
    }),
    createSitemapEntry({
      url: `${baseUrl}/impressum`,
      changeFrequency: "yearly",
      priority: 0.25,
    }),
  ];

  const serverPages: MetadataRoute.Sitemap = servers
    .map((server) => {
      const publicPath = getServerPublicPath(server);
      const normalizedPath = publicPath.toLowerCase();

      if (!publicPath || RESERVED_SERVER_PATHS.has(normalizedPath)) {
        return null;
      }

      return createSitemapEntry({
        url: `${baseUrl}/servers/${encodeURIComponent(publicPath)}`,
        lastModified: getServerLastModified(server),
        changeFrequency: "daily",
        priority: 0.84,
      });
    })
    .filter((entry): entry is MetadataRoute.Sitemap[number] => Boolean(entry));

  return dedupeSitemap([...staticPages, ...serverPages]);
}
