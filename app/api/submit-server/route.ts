import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

function getValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  const user = session.user as any;
  const discordUserId = user.id;

  if (!discordUserId) {
    return NextResponse.json(
      { error: "Discord User ID fehlt. Bitte neu einloggen." },
      { status: 400 }
    );
  }

  const formData = await request.formData();

  const tagsText = getValue(formData, "tags");
  const tags = tagsText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const serverPayload = {
    owner_discord_user_id: discordUserId,
    discord_server_id: getValue(formData, "discord_server_id"),
    server_name: getValue(formData, "server_name"),
    description: getValue(formData, "description"),
    invite_link: getValue(formData, "invite_link"),
    logo_url: getValue(formData, "logo_url") || null,
    category: getValue(formData, "category") || "Community",
    tags,
    country: getValue(formData, "country") || "International",
    language: getValue(formData, "language") || "English",
    nsfw: formData.get("nsfw") === "on",
    approved: false,
    bumps: 0,
  };

  try {
    await supabaseRequest("users?on_conflict=discord_user_id", {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({
        discord_user_id: discordUserId,
        username: session.user?.name ?? "Discord User",
        avatar_url: session.user?.image ?? null,
      }),
    });

    await supabaseRequest("servers", {
      method: "POST",
      body: JSON.stringify(serverPayload),
    });

    return NextResponse.redirect(new URL("/profile?submitted=1", request.url));
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message ?? "Server konnte nicht gespeichert werden.",
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

function slugifyFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect(new URL("/submit?error=login", request.url));
  }

  const ownerDiscordUserId =
    (session.user as any).discordId || (session.user as any).id;

  if (!ownerDiscordUserId) {
    return NextResponse.redirect(new URL("/submit?error=user", request.url));
  }

  const formData = await request.formData();

  const serverName = String(formData.get("server_name") ?? "");
  const description = String(formData.get("description") ?? "");
  const inviteLink = String(formData.get("invite_link") ?? "");
  const discordServerId = String(formData.get("discord_server_id") ?? "");
  const category = String(formData.get("category") ?? "Community");
  const country = String(formData.get("country") ?? "International");
  const language = String(formData.get("language") ?? "English");
  const tags = String(formData.get("tags") ?? "");
  const nsfw = formData.get("nsfw") === "on";

  const logoFile = formData.get("logo");
  const bannerFile = formData.get("banner");

  if (!serverName || !inviteLink || !discordServerId) {
    return NextResponse.redirect(new URL("/submit?error=missing", request.url));
  }

  const existingServers = await supabaseRequest(
    `servers?owner_discord_user_id=eq.${ownerDiscordUserId}&select=*`
  );

  if (existingServers?.length > 0) {
    return NextResponse.redirect(
      new URL("/submit?error=only_one_server", request.url)
    );
  }

  let logoUrl: string | null = null;
  let bannerUrl: string | null = null;

  if (logoFile instanceof File && logoFile.size > 0) {
    const logoPath = `${ownerDiscordUserId}/${Date.now()}-${slugifyFileName(
      logoFile.name
    )}`;

    const { error } = await supabaseAdmin.storage
      .from("server-logos")
      .upload(logoPath, logoFile, {
        contentType: logoFile.type,
        upsert: true,
      });

    if (!error) {
      const { data } = supabaseAdmin.storage
        .from("server-logos")
        .getPublicUrl(logoPath);

      logoUrl = data.publicUrl;
    }
  }

  if (bannerFile instanceof File && bannerFile.size > 0) {
    const bannerPath = `${ownerDiscordUserId}/${Date.now()}-${slugifyFileName(
      bannerFile.name
    )}`;

    const { error } = await supabaseAdmin.storage
      .from("server-banners")
      .upload(bannerPath, bannerFile, {
        contentType: bannerFile.type,
        upsert: true,
      });

    if (!error) {
      const { data } = supabaseAdmin.storage
        .from("server-banners")
        .getPublicUrl(bannerPath);

      bannerUrl = data.publicUrl;
    }
  }

  await supabaseRequest("servers", {
    method: "POST",
    body: JSON.stringify({
      owner_discord_user_id: ownerDiscordUserId,
      discord_server_id: discordServerId,
      server_name: serverName,
      description,
      invite_link: inviteLink,
      logo_url: logoUrl,
      banner_url: bannerUrl,
      category,
      country,
      language,
      tags,
      nsfw,
      approved: false,
      status: "pending",
      bumps: 0,
      premium_status: false,
      partner_status: false,
      premium_glow_color: "#8b5cf6",
    }),
  });

  return NextResponse.redirect(new URL("/profile?submitted=1", request.url));
}
