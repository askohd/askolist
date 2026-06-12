import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/supabase";

const BUMP_COOLDOWN_MS = 2 * 60 * 60 * 1000;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://www.askocafe.com";

function getRemainingCooldown(lastBump: string | null) {
  if (!lastBump) return 0;

  const last = new Date(lastBump).getTime();
  const now = Date.now();
  const remaining = BUMP_COOLDOWN_MS - (now - last);

  return Math.max(0, remaining);
}

function formatMs(ms: number) {
  const totalMinutes = Math.ceil(ms / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) {
    return `${minutes} Minute${minutes === 1 ? "" : "n"}`;
  }

  if (minutes <= 0) {
    return `${hours} Stunde${hours === 1 ? "" : "n"}`;
  }

  return `${hours} Stunde${hours === 1 ? "" : "n"} ${minutes} Minute${
    minutes === 1 ? "" : "n"
  }`;
}

function cleanUrl(value: unknown) {
  const text = String(value ?? "").trim();

  if (!text) return null;

  try {
    const url = new URL(text);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function cleanPositiveNumber(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return null;
  }

  return Math.floor(number);
}

function getDiscordServerIconUrl(body: any) {
  return (
    cleanUrl(body.serverIconUrl) ||
    cleanUrl(body.discordServerIconUrl) ||
    cleanUrl(body.guildIconUrl) ||
    cleanUrl(body.iconUrl)
  );
}

function getDiscordServerBannerUrl(body: any) {
  return (
    cleanUrl(body.serverBannerUrl) ||
    cleanUrl(body.discordServerBannerUrl) ||
    cleanUrl(body.guildBannerUrl) ||
    cleanUrl(body.bannerUrl)
  );
}

function isMissingOptionalColumnError(error: any) {
  const message = String(error?.message || error || "").toLowerCase();

  return (
    message.includes("column") ||
    message.includes("schema cache") ||
    message.includes("pgrst204") ||
    message.includes("42703")
  );
}

function getServerUrl(serverId: string) {
  return `${SITE_URL.replace(/\/$/, "")}/servers/${serverId}`;
}

function getListServerUrl() {
  return `${SITE_URL.replace(/\/$/, "")}/submit`;
}

function getBumpResponse({
  server,
  bumps,
  now,
  memberCount,
  onlineCount,
  serverIconUrl,
  serverBannerUrl,
}: {
  server: any;
  bumps: number;
  now: string;
  memberCount: number | null;
  onlineCount: number | null;
  serverIconUrl: string | null;
  serverBannerUrl: string | null;
}) {
  const nextBumpAt = new Date(Date.now() + BUMP_COOLDOWN_MS).toISOString();
  const serverUrl = getServerUrl(String(server.id));
  const listServerUrl = getListServerUrl();

  return {
    success: true,
    message: `${server.server_name} wurde erfolgreich gebumpt!`,
    serverName: server.server_name,
    serverId: String(server.id),
    discordServerId: String(server.discord_server_id ?? ""),
    bumps,
    lastBump: now,
    nextBumpAt,
    nextBumpIn: formatMs(BUMP_COOLDOWN_MS),
    memberCount: memberCount ?? server.member_count ?? null,
    onlineCount: onlineCount ?? server.online_count ?? null,
    serverIconUrl:
      serverIconUrl ||
      server.discord_server_icon_url ||
      server.logo_url ||
      null,
    serverBannerUrl: serverBannerUrl || server.banner_url || null,
    category: server.category || null,
    language: server.language || null,
    premium: Boolean(server.premium_status),
    partner: Boolean(server.partner_status),

    buttons: {
      viewServer: {
        label: "Server ansehen",
        url: serverUrl,
      },
      listServer: {
        label: "Server listen",
        url: listServerUrl,
      },
    },

    embed: {
      title: `🚀 ${server.server_name}`,
      description:
        "Dieser Server wurde gerade auf Asko Cafe gebumpt und ist jetzt wieder weiter oben sichtbar.",
      color: 0x9d4edd,
      footer: "Asko Cafe • Discord Server entdecken",
      fields: [
        {
          name: "👥 Mitglieder",
          value: String(memberCount ?? server.member_count ?? "Unbekannt"),
          inline: true,
        },
        {
          name: "⚡ Bumps",
          value: String(bumps),
          inline: true,
        },
        {
          name: "⏰ Nächster Bump",
          value: formatMs(BUMP_COOLDOWN_MS),
          inline: true,
        },
      ],
    },
  };
}

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (!process.env.BOT_API_KEY || apiKey !== process.env.BOT_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Invalid API key." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const discordServerId = String(body.discordServerId ?? "").trim();
    const discordUserId = String(body.discordUserId ?? "bot").trim();

    if (!discordServerId) {
      return NextResponse.json(
        { success: false, message: "Missing discordServerId." },
        { status: 400 }
      );
    }

    const servers = await supabaseRequest(
      `servers?discord_server_id=eq.${encodeURIComponent(
        discordServerId
      )}&select=*&limit=1`
    );

    const server = servers?.[0];

    if (!server) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Dieser Discord-Server ist noch nicht auf Asko Cafe eingetragen. Bitte trage ihn zuerst auf der Website ein.",
          buttons: {
            listServer: {
              label: "Server listen",
              url: getListServerUrl(),
            },
          },
        },
        { status: 404 }
      );
    }

    if (server.status === "banned") {
      return NextResponse.json(
        { success: false, message: "Dieser Server ist von Asko Cafe gebannt." },
        { status: 403 }
      );
    }

    if (server.status === "locked") {
      return NextResponse.json(
        { success: false, message: "Dieser Server ist aktuell gesperrt." },
        { status: 403 }
      );
    }

    if (!server.approved || server.status !== "approved") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Dieser Server ist noch nicht freigegeben und kann deshalb nicht gebumpt werden.",
        },
        { status: 403 }
      );
    }

    if (
      server.bump_banned_until &&
      new Date(server.bump_banned_until).getTime() > Date.now()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: `Dieser Server hat einen Bump-Ban bis ${new Date(
            server.bump_banned_until
          ).toLocaleString("de-DE")}.`,
        },
        { status: 403 }
      );
    }

    const remainingCooldown = getRemainingCooldown(server.last_bump);

    if (remainingCooldown > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Du kannst wieder in ${formatMs(
            remainingCooldown
          )} bumpen.`,
          remainingCooldownMs: remainingCooldown,
          remainingCooldownText: formatMs(remainingCooldown),
          nextBumpAt: new Date(Date.now() + remainingCooldown).toISOString(),
        },
        { status: 429 }
      );
    }

    const now = new Date().toISOString();
    const newBumps = (server.bumps ?? 0) + 1;

    const memberCount = cleanPositiveNumber(
      body.memberCount ?? body.guildMemberCount ?? body.members
    );

    const onlineCount = cleanPositiveNumber(
      body.onlineCount ?? body.guildOnlineCount ?? body.online
    );

    const serverIconUrl = getDiscordServerIconUrl(body);
    const serverBannerUrl = getDiscordServerBannerUrl(body);

    const basePatchBody: Record<string, any> = {
      last_bump: now,
      bumps: newBumps,
    };

    const fullPatchBody: Record<string, any> = {
      ...basePatchBody,
      stats_updated_at: now,
    };

    if (memberCount !== null) {
      fullPatchBody.member_count = memberCount;
    }

    if (onlineCount !== null) {
      fullPatchBody.online_count = onlineCount;
    }

    /*
      Serverbild automatisch aktualisieren:
      Dein Bot muss beim /bump serverIconUrl oder discordServerIconUrl mitsenden.
      Dann wird das Logo auf der Website beim Bump aktualisiert.
    */
    if (serverIconUrl) {
      fullPatchBody.logo_url = serverIconUrl;
      fullPatchBody.discord_server_icon_url = serverIconUrl;
    }

    /*
      Banner wird nur aktualisiert, wenn deine Tabelle discord_server_banner_url hat.
      Dein eigenes manuelles banner_url wird NICHT überschrieben.
    */
    if (serverBannerUrl) {
      fullPatchBody.discord_server_banner_url = serverBannerUrl;
    }

    try {
      await supabaseRequest(`servers?id=eq.${server.id}`, {
        method: "PATCH",
        body: JSON.stringify(fullPatchBody),
      });
    } catch (error) {
      if (isMissingOptionalColumnError(error)) {
        await supabaseRequest(`servers?id=eq.${server.id}`, {
          method: "PATCH",
          body: JSON.stringify(basePatchBody),
        });
      } else {
        throw error;
      }
    }

    await supabaseRequest("bump_logs", {
      method: "POST",
      body: JSON.stringify({
        server_id: server.id,
        discord_user_id: discordUserId || "bot",
      }),
    });

    return NextResponse.json(
      getBumpResponse({
        server,
        bumps: newBumps,
        now,
        memberCount,
        onlineCount,
        serverIconUrl,
        serverBannerUrl,
      })
    );
  } catch (error: any) {
    console.error("Bot bump route failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Bump failed.",
      },
      { status: 500 }
    );
  }
}
