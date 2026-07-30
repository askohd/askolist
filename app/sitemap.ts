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

function isUuidLike(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value.trim()
  );
}

/**
 * Für Google werden ausschließlich lesbare Slug-URLs ausgegeben.
 * Ein Fallback auf die Datenbank-ID ist absichtlich nicht erlaubt,
 * damit alte UUID-URLs nicht wieder in der Sitemap landen.
 */
function getServerPublicSlug(server: ServerSitemapRow) {
  return String(server.slug || "").trim();
}

function getValidDate(...values: Array<string | null | undefined>) {
  for (const value of values) {
    if (!value) continue;

    const date = new Date(value);

    if (Number.isFinite(date.getTime())) {
      return date;
    }
  }

  return undefined;
}

function getNewestDate(servers: ServerSitemapRow[]) {
  const times = servers
    .map((server) =>
      getValidDate(
        server.updated_at,
        server.last_bump,
        server.created_at
      )?.getTime()
    )
    .filter((time): time is number => Number.isFinite(time));

  if (times.length === 0) {
    return undefined;
  }

  return new Date(Math.max(...times));
}

function getServerLastModified(server: ServerSitemapRow) {
  return getValidDate(
    server.updated_at,
    server.last_bump,
    server.created_at
  );
}

async function getApprovedServers(): Promise<ServerSitemapRow[]> {
  const queries = [
    "servers?approved=eq.true&status=eq.approved&select=id,slug,updated_at,created_at,last_bump&order=created_at.desc&limit=5000",
    "servers?approved=eq.true&status=eq.approved&select=id,slug,created_at,last_bump&order=created_at.desc&limit=5000",
    "servers?approved=eq.true&status=eq.approved&select=id,slug&order=created_at.desc&limit=5000",
    "servers?approved=is.true&status=eq.approved&select=id,slug&limit=5000",
  ];

  for (const query of queries) {
    try {
      const result = await supabaseRequest(query);

      if (!Array.isArray(result)) {
        continue;
      }

      return result.filter((server: ServerSitemapRow) => {
        const slug = getServerPublicSlug(server);
        const normalizedSlug = slug.toLowerCase();

        return Boolean(
          server?.id &&
            slug &&
            !isUuidLike(slug) &&
            !RESERVED_SERVER_PATHS.has(normalizedSlug)
        );
      });
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
  changeFrequency?: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority?: number;
}): MetadataRoute.Sitemap[number] {
  return {
    url,
    ...(lastModified ? { lastModified } : {}),
    ...(changeFrequency ? { changeFrequency } : {}),
    ...(typeof priority === "number" ? { priority } : {}),
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

  const serverPages: MetadataRoute.Sitemap = servers.map((server) =>
    createSitemapEntry({
      url: `${baseUrl}/servers/${encodeURIComponent(
        getServerPublicSlug(server)
      )}`,
      lastModified: getServerLastModified(server),
      changeFrequency: "daily",
      priority: 0.84,
    })
  );

  return dedupeSitemap([...staticPages, ...serverPages]);
}
