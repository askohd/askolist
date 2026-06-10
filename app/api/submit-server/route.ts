import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

const MAX_DESCRIPTION_WORDS = 1500;
const TERMS_VERSION = "2026-06-10";
const PRIVACY_VERSION = "2026-06-10";

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

function cleanTags(tagsText: string) {
  const tags = tagsText
    .split(",")
    .map((tag) =>
      tag
        .trim()
        .replace(/^#+/, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9äöüÄÖÜß_-]/g, "")
        .toLowerCase()
        .slice(0, 24)
    )
    .filter(Boolean);

  return Array.from(new Set(tags)).slice(0, 5);
}

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

function extractInviteCode(inviteLink: string) {
  const text = String(inviteLink ?? "").trim();

  const patterns = [
    /discord\.gg\/([a-zA-Z0-9-]+)/,
    /discord\.com\/invite\/([a-zA-Z0-9-]+)/,
    /discordapp\.com\/invite\/([a-zA-Z0-9-]+)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

function getUserDiscordId(user: any) {
  return String(
    user?.discordId ||
      user?.discord_id ||
      user?.discord_user_id ||
      user?.id ||
      ""
  ).trim();
}

function getUserDiscordName(user: any) {
  return String(
    user?.username ||
      user?.global_name ||
      user?.name ||
      user?.email ||
      ""
  ).trim();
}

function getLegalAcceptance(formData: FormData) {
  return String(formData.get("legal_acceptance_submit") ?? "") === "accepted";
}

function getVersionFromForm(
  formData: FormData,
  fieldName: string,
  fallback: string
) {
  const value = String(formData.get(fieldName) ?? "").trim();

  return value || fallback;
}

async function getDiscordGuildFromInvite(inviteLink: string) {
  const inviteCode = extractInviteCode(inviteLink);

  if (!inviteCode) {
    return null;
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/invites/${inviteCode}?with_counts=false&with_expiration=false`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const guild = data?.guild;

    if (!guild?.id) {
      return null;
    }

    const iconUrl = guild.icon
      ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${
          String(guild.icon).startsWith("a_") ? "gif" : "png"
        }?size=256`
      : null;

    return {
      id: String(guild.id),
      name: guild.name ? String(guild.name) : null,
      iconUrl,
    };
  } catch (error) {
    console.error("Could not fetch Discord guild from invite:", error);
    return null;
  }
}

async function redirectToBotInvite(request: Request, inviteLink: string) {
  const botClientId =
    process.env.DISCORD_BOT_CLIENT_ID || process.env.DISCORD_CLIENT_ID;

  if (!botClientId) {
    return redirectToProfile(request, "submitted=1&bot_invite=missing");
  }

  const guild = await getDiscordGuildFromInvite(inviteLink);

  const inviteUrl = new URL("https://discord.com/oauth2/authorize");

  inviteUrl.searchParams.set("client_id", botClientId);
  inviteUrl.searchParams.set("permissions", "2147568640");
  inviteUrl.searchParams.set("scope", "bot applications.commands");

  if (guild?.id) {
    inviteUrl.searchParams.set("guild_id", guild.id);
    inviteUrl.searchParams.set("disable_guild_select", "true");
  }

  return NextResponse.redirect(inviteUrl, { status: 303 });
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

async function saveLegalAcceptanceLog({
  discordUserId,
  discordUsername,
  type,
  termsVersion,
  privacyVersion,
}: {
  discordUserId: string;
  discordUsername: string;
  type: string;
  termsVersion: string;
  privacyVersion: string;
}) {
  try {
    await supabaseRequest("legal_acceptances", {
      method: "POST",
      body: JSON.stringify({
        discord_user_id: discordUserId,
        discord_username: discordUsername || null,
        type,
        terms_version: termsVersion,
        privacy_version: privacyVersion,
        accepted_at: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Could not save legal acceptance log:", error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return redirectToSubmit(request, "error=login");
    }

    const ownerDiscordUserId = getUserDiscordId(session.user);
    const ownerDiscordUsername = getUserDiscordName(session.user);

    if (!ownerDiscordUserId) {
      return redirectToSubmit(request, "error=user");
    }

    const formData = await request.formData();

    const legalAccepted = getLegalAcceptance(formData);

    if (!legalAccepted) {
      return redirectToSubmit(request, "error=legal_required");
    }

    const acceptedTermsVersion = getVersionFromForm(
      formData,
      "accepted_terms_version",
      TERMS_VERSION
    );

    const acceptedPrivacyVersion = getVersionFromForm(
      formData,
      "accepted_privacy_version",
      PRIVACY_VERSION
    );

    const acceptedAt = new Date().toISOString();

    const serverName = String(formData.get("server_name") ?? "").trim();

    const description = limitWords(
      String(formData.get("description") ?? ""),
      MAX_DESCRIPTION_WORDS
    );

    const inviteLink = String(formData.get("invite_link") ?? "").trim();
    const category = String(formData.get("category") ?? "Community").trim();
    const language = String(formData.get("language") ?? "English").trim();
    const tagsText = String(formData.get("tags") ?? "").trim();
    const nsfw = formData.get("nsfw") === "on";

    const bannerFile = formData.get("banner");

    if (!serverName || !inviteLink || !description) {
      return redirectToSubmit(request, "error=missing");
    }

    const existingServers = await supabaseRequest(
      `servers?owner_discord_user_id=eq.${ownerDiscordUserId}&select=*`
    );

    if (existingServers?.length > 0) {
      return redirectToSubmit(request, "error=only_one_server");
    }

    const discordGuild = await getDiscordGuildFromInvite(inviteLink);

    let bannerUrl: string | null = null;

    if (bannerFile instanceof File && bannerFile.size > 0) {
      bannerUrl = await uploadPublicFile(
        "server-banners",
        ownerDiscordUserId,
        bannerFile
      );
    }

    const tags = cleanTags(tagsText);

    await saveLegalAcceptanceLog({
      discordUserId: ownerDiscordUserId,
      discordUsername: ownerDiscordUsername,
      type: "server_submit",
      termsVersion: acceptedTermsVersion,
      privacyVersion: acceptedPrivacyVersion,
    });

    await supabaseRequest("servers", {
      method: "POST",
      body: JSON.stringify({
        owner_discord_user_id: ownerDiscordUserId,

        discord_server_id:
          discordGuild?.id || `manual-${ownerDiscordUserId}-${Date.now()}`,

        server_name: serverName,
        description,
        invite_link: inviteLink,

        logo_url: discordGuild?.iconUrl || null,
        discord_server_icon_url: discordGuild?.iconUrl || null,

        banner_url: bannerUrl,
        category,
        country: "International",
        language,
        tags,
        nsfw,

        accepted_terms: true,
        accepted_terms_at: acceptedAt,
        accepted_terms_version: acceptedTermsVersion,
        accepted_privacy: true,
        accepted_privacy_at: acceptedAt,
        accepted_privacy_version: acceptedPrivacyVersion,

        approved: false,
        status: "pending",
        bumps: 0,
        premium_status: false,
        partner_status: false,
        premium_glow_color: "#8b5cf6",
        server_name_color: "#ffffff",
        server_text_color: "#ddd9ef",
        premium_layout: "glow",
        banner_position_x: 50,
        banner_position_y: 50,
        banner_zoom: 1,
      }),
    });

    return await redirectToBotInvite(request, inviteLink);
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
