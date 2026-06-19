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
};

function getBaseUrl() {
  return SITE_URL.replace(/\/$/, "");
}

function getServerPublicPath(server: ServerSitemapRow) {
  return String(server.slug || server.id).trim();
}

async function getApprovedServers(): Promise<ServerSitemapRow[]> {
  try {
    const servers = await supabaseRequest(
      "servers?approved=is.true&status=eq.approved&select=id,slug&order=created_at.desc&limit=5000"
    );

    if (!Array.isArray(servers)) {
      return [];
    }

    return servers.filter((server) => Boolean(server?.id));
  } catch (error) {
    console.error("Sitemap server loading failed:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();
  const servers = await getApprovedServers();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/servers`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/servers/deutsch`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servers/gaming`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.86,
    },
    {
      url: `${baseUrl}/servers/anime`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.86,
    },
    {
      url: `${baseUrl}/servers/community`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.86,
    },
    {
      url: `${baseUrl}/servers/minecraft`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.82,
    },
    {
      url: `${baseUrl}/servers/valorant`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.82,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/info`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/nutzungsbedingungen`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serverPages: MetadataRoute.Sitemap = servers.map((server) => ({
    url: `${baseUrl}/servers/${encodeURIComponent(getServerPublicPath(server))}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.82,
  }));

  return [...staticPages, ...serverPages];
}
