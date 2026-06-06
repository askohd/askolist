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

  const serverName = String(formData.get("server_name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const inviteLink = String(formData.get("invite_link") ?? "").trim();
  const discordServerId = String(formData.get("discord_server_id") ?? "").trim();
  const category = String(formData.get("category") ?? "Community").trim();
  const country = String(formData.get("country") ?? "International").trim();
  const language = String(formData.get("language") ?? "English").trim();
  const tagsText = String(formData.get("tags") ?? "").trim();
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

  const tags = tagsText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

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
