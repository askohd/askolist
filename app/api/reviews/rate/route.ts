import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function redirectToServer(request: Request, serverId: string, query: string) {
  return NextResponse.redirect(
    new URL(`/servers/${serverId}?${query}`, request.url),
    { status: 303 }
  );
}

function canRateFromJoinDate(joinedAt: string | null | undefined) {
  if (!joinedAt) return false;
  return Date.now() - new Date(joinedAt).getTime() >= TWO_DAYS_MS;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const formData = await request.formData();
  const serverId = String(formData.get("server_id") ?? "");
  const rating = Number(formData.get("rating") ?? 0);

  if (!serverId) {
    return NextResponse.redirect(new URL("/servers?error=no_server", request.url), {
      status: 303,
    });
  }

  if (!session?.user) {
    return redirectToServer(request, serverId, "error=login_required");
  }

  const discordUserId =
    (session.user as any).discordId || (session.user as any).id;

  if (!discordUserId) {
    return redirectToServer(request, serverId, "error=no_discord_id");
  }

  if (rating < 1 || rating > 5) {
    return redirectToServer(request, serverId, "error=invalid_rating");
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
      rating,
    }),
  });

  return redirectToServer(request, serverId, "rated=1");
}
