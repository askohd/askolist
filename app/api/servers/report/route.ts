import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

function redirectToServer(request: Request, serverId: string, query: string) {
  return NextResponse.redirect(
    new URL(`/servers/${serverId}?${query}`, request.url),
    { status: 303 }
  );
}

function getDiscordUserId(user: any) {
  return user?.discordId || user?.id || "";
}

function getDiscordUsername(user: any) {
  return (
    user?.global_name ||
    user?.name ||
    user?.username ||
    user?.email ||
    "Discord Nutzer"
  );
}

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const formData = await request.formData();

    const serverId = cleanText(formData.get("server_id"), 120);
    const reason = cleanText(formData.get("reason"), 200);
    const details = cleanText(formData.get("details"), 900);

    if (!serverId) {
      return NextResponse.redirect(
        new URL("/servers?error=no_server", request.url),
        { status: 303 }
      );
    }

    if (!session?.user) {
      return redirectToServer(request, serverId, "error=login_required");
    }

    const discordUserId = getDiscordUserId(session.user);
    const reporterUsername = getDiscordUsername(session.user);

    if (!discordUserId) {
      return redirectToServer(request, serverId, "error=no_discord_id");
    }

    if (!reason) {
      return redirectToServer(request, serverId, "error=no_report_reason");
    }

    const serverRows = await supabaseRequest(
      `servers?id=eq.${serverId}&select=id,server_name`
    );

    const server = serverRows?.[0];

    if (!server) {
      return NextResponse.redirect(
        new URL("/servers?error=server_not_found", request.url),
        { status: 303 }
      );
    }

    const existingReports = await supabaseRequest(
      `server_reports?server_id=eq.${serverId}&reporter_discord_user_id=eq.${discordUserId}&status=eq.open&select=*`
    );

    if (existingReports?.length > 0) {
      return redirectToServer(
        request,
        serverId,
        "error=server_already_reported"
      );
    }

    await supabaseRequest("server_reports", {
      method: "POST",
      body: JSON.stringify({
        server_id: serverId,
        reporter_discord_user_id: discordUserId,
        reporter_username: reporterUsername,
        reason,
        details,
        status: "open",
        created_at: new Date().toISOString(),
      }),
    });

    return redirectToServer(request, serverId, "server_reported=1");
  } catch (error) {
    console.error("Server report error:", error);

    return NextResponse.redirect(
      new URL("/servers?error=server_report_failed", request.url),
      { status: 303 }
    );
  }
}
