import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
const MAX_COMMENT_LENGTH = 800;

function redirectToServer(request: Request, serverId: string, query: string) {
  return NextResponse.redirect(
    new URL(`/servers/${serverId}?${query}`, request.url),
    { status: 303 }
  );
}

function canRateFromJoinDate(joinedAt: string | null | undefined) {
  if (!joinedAt) return false;

  const joinedTime = new Date(joinedAt).getTime();

  if (!Number.isFinite(joinedTime)) {
    return false;
  }

  return Date.now() - joinedTime >= TWO_DAYS_MS;
}

function cleanComment(value: FormDataEntryValue | null) {
  const comment = String(value ?? "")
    .replace(/\r\n/g, "\n")
    .trim();

  if (!comment) return "";

  return comment.slice(0, MAX_COMMENT_LENGTH);
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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    const formData = await request.formData();
    const serverId = String(formData.get("server_id") ?? "").trim();
    const rating = Number(formData.get("rating") ?? 0);
    const comment = cleanComment(formData.get("comment"));

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
    const discordUsername = getDiscordUsername(session.user);

    if (!discordUserId) {
      return redirectToServer(request, serverId, "error=no_discord_id");
    }

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return redirectToServer(request, serverId, "error=invalid_rating");
    }

    const serverRows = await supabaseRequest(
      `servers?id=eq.${serverId}&approved=eq.true&status=eq.approved&select=id`
    );

    if (!serverRows?.[0]) {
      return NextResponse.redirect(
        new URL("/servers?error=server_not_found", request.url),
        { status: 303 }
      );
    }

    const memberRows = await supabaseRequest(
      `server_members?server_id=eq.${serverId}&discord_user_id=eq.${discordUserId}&select=*`
    );

    const memberEntry = memberRows?.[0];

    if (!canRateFromJoinDate(memberEntry?.joined_at)) {
      return redirectToServer(request, serverId, "error=not_2_days_member");
    }

    const existingReviews = await supabaseRequest(
      `reviews?server_id=eq.${serverId}&discord_user_id=eq.${discordUserId}&select=*`
    );

    if (existingReviews?.length > 0) {
      return redirectToServer(request, serverId, "error=already_rated");
    }

    await supabaseRequest("reviews", {
      method: "POST",
      body: JSON.stringify({
        server_id: serverId,
        discord_user_id: discordUserId,
        discord_username: discordUsername,
        rating,
        comment,
        reported_count: 0,
        hidden: false,
        deleted_by_admin: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    });

    return redirectToServer(request, serverId, "rated=1");
  } catch (error) {
    console.error("Review rate error:", error);

    return NextResponse.redirect(
      new URL("/servers?error=review_failed", request.url),
      { status: 303 }
    );
  }
}
