import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

const MAX_DESCRIPTION_WORDS = 1500;

const ALLOWED_PREMIUM_LAYOUTS = [
  "glow",
  "starborder",
  "sunset",
  "aurora",
  "neon",
  "galaxy",
  "flame",
  "ocean",
];

function limitWords(text: string, maxWords: number) {
  const cleanText = text.trim();
  const matches = [...cleanText.matchAll(/\S+/g)];

  if (matches.length <= maxWords) {
    return cleanText;
  }

  const lastAllowedWord = matches[maxWords - 1];

  if (lastAllowedWord.index === undefined) {
    return cleanText;
  }

  const endIndex = lastAllowedWord.index + lastAllowedWord[0].length;

  return cleanText.slice(0, endIndex);
}

function slugifyFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}

function redirectToProfile(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/profile?${query}`, request.url), {
    status: 303,
  });
}

function clampNumber(value: number, min: number, max: number, fallback: number) {
  if (Number.isNaN(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function safeColor(value: string, fallback: string) {
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    return value;
  }

  return fallback;
}

function safePremiumLayout(value: string) {
  if (ALLOWED_PREMIUM_LAYOUTS.includes(value)) {
    return value;
  }

  return "glow";
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
      return redirectToProfile(request, "error=login");
    }

    const discordUserId =
      (session.user as any).discordId || (session.user as any).id;

    if (!discordUserId) {
      return redirectToProfile(request, "error=no_user");
    }

    const formData = await request.formData();

    const serverName = String(formData.get("server_name") ?? "").trim();

    const description = limitWords(
      String(formData.get("description") ?? ""),
      MAX_DESCRIPTION_WORDS
    );

    const premiumGlowColor = safeColor(
      String(formData.get("premium_glow_color") ?? "#ff4fd8").trim(),
      "#ff4fd8"
    );

    const serverNameColor = safeColor(
      String(formData.get("server_name_color") ?? "#ffffff").trim(),
      "#ffffff"
    );

    const serverTextColor = safeColor(
      String(formData.get("server_text_color") ?? "#ddd9ef").trim(),
      "#ddd9ef"
    );

    const premiumLayout = safePremiumLayout(
      String(formData.get("premium_layout") ?? "glow").trim()
    );

    const bannerPositionX = clampNumber(
      Number(formData.get("banner_position_x") ?? 50),
      0,
      100,
      50
    );

    const bannerPositionY = clampNumber(
      Number(formData.get("banner_position_y") ?? 50),
      0,
      100,
      50
    );

    const bannerZoom = clampNumber(
      Number(formData.get("banner_zoom") ?? 1),
      1,
      2.5,
      1
    );

    const logoFile = formData.get("logo");
    const bannerFile = formData.get("banner");

    const servers = await supabaseRequest(
      `servers?owner_discord_user_id=eq.${discordUserId}&select=*`
    );

    const server = servers?.[0];

    if (!server) {
      return redirectToProfile(request, "error=no_server");
    }

    const isPremiumOrPartner = Boolean(
      server.premium_status || server.partner_status
    );

    const updateData: any = {
      server_name: serverName || server.server_name,
      description: description || server.description,
      banner_position_x: bannerPositionX,
      banner_position_y: bannerPositionY,
      banner_zoom: bannerZoom,
    };

    if (isPremiumOrPartner) {
      updateData.premium_glow_color = premiumGlowColor;
      updateData.server_name_color = serverNameColor;
      updateData.server_text_color = serverTextColor;
      updateData.premium_layout = premiumLayout;
    }

    if (logoFile instanceof File && logoFile.size > 0) {
      updateData.logo_url = await uploadPublicFile(
        "server-logos",
        discordUserId,
        logoFile
      );
    }

    if (bannerFile instanceof File && bannerFile.size > 0) {
      updateData.banner_url = await uploadPublicFile(
        "server-banners",
        discordUserId,
        bannerFile
      );
    }

    await supabaseRequest(`servers?id=eq.${server.id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
    });

    return redirectToProfile(request, "saved=1");
  } catch (error: any) {
    console.error("Profile update failed:", error);

    return NextResponse.json(
      {
        error: error.message ?? "Profile update failed",
      },
      { status: 500 }
    );
  }
}
