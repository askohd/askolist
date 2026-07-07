import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

const MAX_DESCRIPTION_WORDS = 1500;
const TERMS_VERSION = "2026-06-10";
const PRIVACY_VERSION = "2026-06-10";
const REFERRAL_FIRST_REWARD_COUNT = 2;
const REFERRAL_SECOND_REWARD_COUNT = 4;
const REFERRAL_FIRST_REWARD_MONTHS = 1;
const REFERRAL_SECOND_REWARD_MONTHS = 2;

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

function normalizeReferralCode(value: unknown) {
  return String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 32);
}

function createReferralCodeCandidate() {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  const timePart = Date.now().toString(36).slice(-3).toUpperCase();

  return `ASKO-${randomPart}${timePart}`;
}

function addMonths(date: Date, months: number) {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + months);
  return nextDate;
}

function slugifyFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}

function slugifyServerName(name: string) {
  const normalized = String(name ?? "")
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 64);

  return normalized || "discord-server";
}

async function slugAlreadyExists(slug: string) {
  const rows = await supabaseRequest(
    `servers?slug=eq.${encodeURIComponent(slug)}&select=id&limit=1`
  );

  return Array.isArray(rows) && rows.length > 0;
}

async function createUniqueServerSlug(serverName: string) {
  const baseSlug = slugifyServerName(serverName);
  let candidate = baseSlug;

  for (let counter = 2; counter <= 100; counter += 1) {
    if (!(await slugAlreadyExists(candidate))) {
      return candidate;
    }

    candidate = `${baseSlug}-${counter}`;
  }

  return `${baseSlug}-${Date.now()}`;
}

function redirectToSubmit(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/submit?${query}`, request.url), {
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
  const possibleFields = [
    "legal_acceptance_submit",
    "legal_acceptance",
    "accepted_terms",
    "accepted_privacy",
    "terms_accepted",
    "privacy_accepted",
  ];

  return possibleFields.some((fieldName) => {
    const value = String(formData.get(fieldName) ?? "").trim().toLowerCase();

    return (
      value === "accepted" ||
      value === "on" ||
      value === "true" ||
      value === "1" ||
      value === "yes"
    );
  });
}

function getVersionFromForm(
  formData: FormData,
  fieldName: string,
  fallback: string
) {
  const value = String(formData.get(fieldName) ?? "").trim();

  return value || fallback;
}

function isDuplicateDatabaseError(error: any) {
  const message = String(error?.message || error || "").toLowerCase();

  return (
    message.includes("duplicate key") ||
    message.includes("23505") ||
    message.includes("unique constraint") ||
    message.includes("servers_one_server_per_owner") ||
    message.includes("servers_one_entry_per_discord_server")
  );
}

function isSlugDuplicateDatabaseError(error: any) {
  const message = String(error?.message || error || "").toLowerCase();

  return (
    message.includes("servers_slug_unique") ||
    (message.includes("duplicate key") && message.includes("slug"))
  );
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

async function ownerAlreadyHasServer(ownerDiscordUserId: string) {
  const rows = await supabaseRequest(
    `servers?owner_discord_user_id=eq.${encodeURIComponent(
      ownerDiscordUserId
    )}&select=id&limit=1`
  );

  return Array.isArray(rows) && rows.length > 0;
}

async function discordServerAlreadyExists(discordServerId: string | null) {
  if (!discordServerId) {
    return false;
  }

  const rows = await supabaseRequest(
    `servers?discord_server_id=eq.${encodeURIComponent(
      discordServerId
    )}&select=id&limit=1`
  );

  return Array.isArray(rows) && rows.length > 0;
}

async function buildBotInviteUrl(inviteLink: string) {
  const botClientId =
    process.env.DISCORD_BOT_CLIENT_ID || process.env.DISCORD_CLIENT_ID;

  if (!botClientId) {
    return "";
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

  return inviteUrl.toString();
}

function redirectToSubmitSuccess({
  request,
  botInviteUrl,
  referralCode,
}: {
  request: Request;
  botInviteUrl: string;
  referralCode: string;
}) {
  const successUrl = new URL("/submit/success", request.url);

  successUrl.searchParams.set("submitted", "1");

  if (botInviteUrl) {
    successUrl.searchParams.set("bot_invite_url", botInviteUrl);
  } else {
    successUrl.searchParams.set("bot_invite", "missing");
  }

  if (referralCode) {
    successUrl.searchParams.set("referral_code", referralCode);
  }

  return NextResponse.redirect(successUrl, { status: 303 });
}

async function getServerBySlug(slug: string) {
  const rows = await supabaseRequest(
    `servers?slug=eq.${encodeURIComponent(
      slug
    )}&select=id,owner_discord_user_id,premium_until&limit=1`
  );

  return Array.isArray(rows) ? rows[0] ?? null : null;
}

async function getOrCreateReferralCode(ownerDiscordUserId: string) {
  const existingRows = await supabaseRequest(
    `server_referral_codes?owner_discord_user_id=eq.${encodeURIComponent(
      ownerDiscordUserId
    )}&select=code&limit=1`
  );

  if (Array.isArray(existingRows) && existingRows[0]?.code) {
    return normalizeReferralCode(existingRows[0].code);
  }

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = createReferralCodeCandidate();

    try {
      await supabaseRequest("server_referral_codes", {
        method: "POST",
        body: JSON.stringify({
          owner_discord_user_id: ownerDiscordUserId,
          code,
          successful_referrals: 0,
          rewarded_months: 0,
        }),
      });

      return code;
    } catch (error) {
      console.error("Could not create referral code, retrying:", error);
    }
  }

  return "";
}

async function updateReferrerPremium(
  referrerDiscordUserId: string,
  additionalMonths: number
) {
  if (additionalMonths <= 0) {
    return;
  }

  const rows = await supabaseRequest(
    `servers?owner_discord_user_id=eq.${encodeURIComponent(
      referrerDiscordUserId
    )}&select=id,premium_until&limit=1`
  );

  const server = Array.isArray(rows) ? rows[0] : null;

  if (!server?.id) {
    return;
  }

  const now = new Date();
  const currentPremiumUntil = server.premium_until
    ? new Date(server.premium_until)
    : null;

  const premiumStart =
    currentPremiumUntil && currentPremiumUntil.getTime() > now.getTime()
      ? currentPremiumUntil
      : now;

  const premiumUntil = addMonths(premiumStart, additionalMonths);

  try {
    await supabaseRequest(`servers?id=eq.${encodeURIComponent(server.id)}`, {
      method: "PATCH",
      body: JSON.stringify({
        premium_status: true,
        premium_until: premiumUntil.toISOString(),
      }),
    });
  } catch (error) {
    console.error(
      "Could not update premium_until, trying premium_status only:",
      error
    );

    await supabaseRequest(`servers?id=eq.${encodeURIComponent(server.id)}`, {
      method: "PATCH",
      body: JSON.stringify({
        premium_status: true,
      }),
    });
  }
}

async function processReferralRegistration({
  referralCode,
  referredDiscordUserId,
  referredServerId,
}: {
  referralCode: string;
  referredDiscordUserId: string;
  referredServerId: string;
}) {
  const normalizedCode = normalizeReferralCode(referralCode);

  if (!normalizedCode || !referredDiscordUserId || !referredServerId) {
    return;
  }

  const codeRows = await supabaseRequest(
    `server_referral_codes?code=eq.${encodeURIComponent(
      normalizedCode
    )}&select=*&limit=1`
  );

  const referralOwner = Array.isArray(codeRows) ? codeRows[0] : null;

  if (!referralOwner?.owner_discord_user_id) {
    return;
  }

  const referrerDiscordUserId = String(referralOwner.owner_discord_user_id);

  if (referrerDiscordUserId === referredDiscordUserId) {
    return;
  }

  try {
    await supabaseRequest("server_referrals", {
      method: "POST",
      body: JSON.stringify({
        referral_code: normalizedCode,
        referrer_discord_user_id: referrerDiscordUserId,
        referred_discord_user_id: referredDiscordUserId,
        referred_server_id: referredServerId,
        status: "completed",
        completed_at: new Date().toISOString(),
      }),
    });
  } catch (error) {
    if (!isDuplicateDatabaseError(error)) {
      console.error("Could not save server referral:", error);
    }
  }

  const referrals = await supabaseRequest(
    `server_referrals?referrer_discord_user_id=eq.${encodeURIComponent(
      referrerDiscordUserId
    )}&status=eq.completed&select=id`
  );

  const successfulReferrals = Array.isArray(referrals) ? referrals.length : 0;
  const alreadyRewardedMonths = Number(referralOwner.rewarded_months ?? 0);

  const targetRewardMonths =
    successfulReferrals >= REFERRAL_SECOND_REWARD_COUNT
      ? REFERRAL_SECOND_REWARD_MONTHS
      : successfulReferrals >= REFERRAL_FIRST_REWARD_COUNT
      ? REFERRAL_FIRST_REWARD_MONTHS
      : 0;

  const additionalMonths = Math.max(
    0,
    targetRewardMonths - alreadyRewardedMonths
  );

  if (additionalMonths > 0) {
    await updateReferrerPremium(referrerDiscordUserId, additionalMonths);
  }

  await supabaseRequest(
    `server_referral_codes?owner_discord_user_id=eq.${encodeURIComponent(
      referrerDiscordUserId
    )}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        successful_referrals: successfulReferrals,
        rewarded_months: Math.max(alreadyRewardedMonths, targetRewardMonths),
        last_rewarded_at:
          additionalMonths > 0
            ? new Date().toISOString()
            : referralOwner.last_rewarded_at,
      }),
    }
  );
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
    const referralCodeFromForm = normalizeReferralCode(
      formData.get("referral_code")
    );

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

    if (await ownerAlreadyHasServer(ownerDiscordUserId)) {
      return redirectToSubmit(request, "error=only_one_server");
    }

    const discordGuild = await getDiscordGuildFromInvite(inviteLink);

    if (await discordServerAlreadyExists(discordGuild?.id || null)) {
      return redirectToSubmit(request, "error=server_already_exists");
    }

    let bannerUrl: string | null = null;

    if (bannerFile instanceof File && bannerFile.size > 0) {
      bannerUrl = await uploadPublicFile(
        "server-banners",
        ownerDiscordUserId,
        bannerFile
      );
    }

    const tags = cleanTags(tagsText);
    const slug = await createUniqueServerSlug(serverName);

    await saveLegalAcceptanceLog({
      discordUserId: ownerDiscordUserId,
      discordUsername: ownerDiscordUsername,
      type: "server_submit",
      termsVersion: acceptedTermsVersion,
      privacyVersion: acceptedPrivacyVersion,
    });

    try {
      await supabaseRequest("servers", {
        method: "POST",
        body: JSON.stringify({
          owner_discord_user_id: ownerDiscordUserId,

          discord_server_id:
            discordGuild?.id || `manual-${ownerDiscordUserId}-${Date.now()}`,

          server_name: serverName,
          slug,
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
    } catch (error) {
      if (isSlugDuplicateDatabaseError(error)) {
        return redirectToSubmit(request, "error=slug_exists");
      }

      if (isDuplicateDatabaseError(error)) {
        return redirectToSubmit(request, "error=only_one_server");
      }

      throw error;
    }

    const createdServer = await getServerBySlug(slug);
    const ownReferralCode = await getOrCreateReferralCode(ownerDiscordUserId);

    if (createdServer?.id) {
      await processReferralRegistration({
        referralCode: referralCodeFromForm,
        referredDiscordUserId: ownerDiscordUserId,
        referredServerId: String(createdServer.id),
      });
    }

    const botInviteUrl = await buildBotInviteUrl(inviteLink);

    return redirectToSubmitSuccess({
      request,
      botInviteUrl,
      referralCode: ownReferralCode,
    });
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
