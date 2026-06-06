import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

const MAX_DESCRIPTION_LENGTH = 3000;

function slugifyFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}

function redirectToSubmit(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/submit?${query}`, request.url), {
    status: 303,
  });
}

function redirectToProfile(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/profile?${query}`, request.url), {
    status: 303,
  });
}

async function uploadPublicFile(
  bucket: string,
  ownerDiscordUserId: string,
  file: File
) {
  const filePath = `${ownerDiscordUserId}/${Date.now()}-${slugifyFileName(
    file.name
  )}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, file, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return redirectToSubmit(request, "error=login");
    }

    const ownerDiscordUserId =
      (session.user as any).discordId || (session.user as any).id;

    if (!ownerDiscordUserId) {
      return redirectToSubmit(request, "error=user");
    }

    const formData = await request.formData();

    const serverName = String(formData.get("server_name") ?? "").trim();

    const description = String(formData.get("description") ?? "")
      .trim()
      .slice(0, MAX_DESCRIPTION_LENGTH);

    const inviteLink = String(formData.get("invite_link") ?? "").trim();
    const discordServerId = String(
      formData.get("discord_server_id") ?? ""
    ).trim();

    const category = String(formData.get("category") ?? "Community").trim();
    const country = String(formData.get("country") ?? "International").trim();
    const language = String(formData.get("language") ?? "English").trim();
    const tagsText = String(formData.get("tags") ?? "").trim();
    const nsfw = formData.get("nsfw") === "on";

    const logoFile = formData.get("logo");
    const bannerFile = formData.get("banner");

    if (!serverName || !inviteLink || !discordServerId) {
      return redirectToSubmit(request, "error=missing");
    }

    const existingServers = await supabaseRequest(
      `servers?owner_discord_user_id=eq.${ownerDiscordUserId}&select=*`
    );

    if (existingServers?.length > 0) {
      return redirectToSubmit(request, "error=only_one_server");
    }

    let logoUrl: string | null = null;
    let bannerUrl: string | null = null;

    if (logoFile instanceof File && logoFile.size > 0) {
      logoUrl = await uploadPublicFile(
        "server-logos",
        ownerDiscordUserId,
        logoFile
      );
    }

    if (bannerFile instanceof File && bannerFile.size > 0) {
      bannerUrl = await uploadPublicFile(
        "server-banners",
        ownerDiscordUserId,
        bannerFile
      );
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
        server_name_color: "#ffffff",
        server_text_color: "#ddd9ef",
        banner_position_x: 50,
        banner_position_y: 50,
        banner_zoom: 1,
      }),
    });

    return redirectToProfile(request, "submitted=1");
  } catch (error: any) {
    console.error("Submit server failed:", error);

    return NextResponse.json(
      {
        error: error.message ?? "Submit server failed",
      },
      { status: 500 }
    );
  }
}
