import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/supabase";

function getRemainingCooldown(lastBump: string | null) {
  if (!lastBump) return 0;

  const last = new Date(lastBump).getTime();
  const now = Date.now();
  const cooldownMs = 2 * 60 * 60 * 1000;
  const remaining = cooldownMs - (now - last);

  return Math.max(0, remaining);
}

function formatMs(ms: number) {
  const totalMinutes = Math.ceil(ms / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) return `${minutes} minute(s)`;
  return `${hours} hour(s) ${minutes} minute(s)`;
}

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  if (!process.env.BOT_API_KEY || apiKey !== process.env.BOT_API_KEY) {
    return NextResponse.json(
      { success: false, message: "Invalid API key." },
      { status: 401 }
    );
  }

  const body = await request.json();
  const discordServerId = String(body.discordServerId ?? "");

  if (!discordServerId) {
    return NextResponse.json(
      { success: false, message: "Missing discordServerId." },
      { status: 400 }
    );
  }

  const servers = await supabaseRequest(
    `servers?discord_server_id=eq.${discordServerId}&select=*`
  );

  const server = servers?.[0];

  if (!server) {
    return NextResponse.json(
      {
        success: false,
        message:
          "This Discord server is not registered on AskoList yet. Please submit it on the website first.",
      },
      { status: 404 }
    );
  }

  if (server.status === "banned") {
    return NextResponse.json(
      { success: false, message: "This server is banned from AskoList." },
      { status: 403 }
    );
  }

  if (server.status === "locked") {
    return NextResponse.json(
      { success: false, message: "This server is currently locked." },
      { status: 403 }
    );
  }

  if (!server.approved || server.status !== "approved") {
    return NextResponse.json(
      {
        success: false,
        message: "This server is not approved yet and cannot be bumped.",
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
        message: `This server has a bump ban until ${new Date(
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
        message: `You can bump again in ${formatMs(remainingCooldown)}.`,
      },
      { status: 429 }
    );
  }

  const now = new Date().toISOString();

  await supabaseRequest(`servers?id=eq.${server.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      last_bump: now,
      bumps: (server.bumps ?? 0) + 1,
    }),
  });

  await supabaseRequest("bump_logs", {
    method: "POST",
    body: JSON.stringify({
      server_id: server.id,
      discord_user_id: String(body.discordUserId ?? "bot"),
    }),
  });

  return NextResponse.json({
    success: true,
    message: `${server.server_name} was bumped successfully!`,
    serverName: server.server_name,
    bumps: (server.bumps ?? 0) + 1,
  });
}
