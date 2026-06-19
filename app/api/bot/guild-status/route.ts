import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/supabase";

function isMissingOptionalColumnError(error: any) {
  const message = String(error?.message || error || "").toLowerCase();

  return (
    message.includes("column") ||
    message.includes("schema cache") ||
    message.includes("pgrst204") ||
    message.includes("42703")
  );
}

async function updateBotStatus(serverId: string, botInGuild: boolean) {
  const now = new Date().toISOString();

  const fullPatchBody = botInGuild
    ? {
        bot_in_guild: true,
        bot_added_at: now,
        bot_removed_at: null,
      }
    : {
        bot_in_guild: false,
        bot_removed_at: now,
      };

  const fallbackPatchBody = {
    bot_in_guild: botInGuild,
  };

  try {
    await supabaseRequest(`servers?id=eq.${serverId}`, {
      method: "PATCH",
      body: JSON.stringify(fullPatchBody),
    });
  } catch (error) {
    if (!isMissingOptionalColumnError(error)) {
      throw error;
    }

    await supabaseRequest(`servers?id=eq.${serverId}`, {
      method: "PATCH",
      body: JSON.stringify(fallbackPatchBody),
    });
  }
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

    if (!discordServerId) {
      return NextResponse.json(
        { success: false, message: "Missing discordServerId." },
        { status: 400 }
      );
    }

    if (typeof body.botInGuild !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Missing botInGuild boolean." },
        { status: 400 }
      );
    }

    const servers = await supabaseRequest(
      `servers?discord_server_id=eq.${encodeURIComponent(
        discordServerId
      )}&select=id,server_name,discord_server_id&limit=1`
    );

    const server = servers?.[0];

    if (!server) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Dieser Discord-Server ist noch nicht auf Asko Cafe eingetragen.",
        },
        { status: 404 }
      );
    }

    await updateBotStatus(String(server.id), body.botInGuild);

    return NextResponse.json({
      success: true,
      message: body.botInGuild
        ? "Bot-Status wurde auf verbunden gesetzt."
        : "Bot-Status wurde auf entfernt gesetzt.",
      serverId: String(server.id),
      serverName: server.server_name,
      discordServerId: String(server.discord_server_id ?? ""),
      botInGuild: body.botInGuild,
    });
  } catch (error: any) {
    console.error("Bot guild-status route failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Guild status update failed.",
      },
      { status: 500 }
    );
  }
}
