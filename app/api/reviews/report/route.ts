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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const formData = await request.formData();

    const reviewId = String(formData.get("review_id") ?? "").trim();
    const serverId = String(formData.get("server_id") ?? "").trim();
    const reason = String(formData.get("reason") ?? "Unpassende Bewertung")
      .trim()
      .slice(0, 300);

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

    if (!discordUserId) {
      return redirectToServer(request, serverId, "error=no_discord_id");
    }

    if (!reviewId) {
      return redirectToServer(request, serverId, "error=no_review");
    }

    const reviewRows = await supabaseRequest(
      `reviews?id=eq.${reviewId}&server_id=eq.${serverId}&select=*`
    );

    const review = reviewRows?.[0];

    if (!review) {
      return redirectToServer(request, serverId, "error=review_not_found");
    }

    if (review.discord_user_id === discordUserId) {
      return redirectToServer(request, serverId, "error=cannot_report_own_review");
    }

    const existingReports = await supabaseRequest(
      `review_reports?review_id=eq.${reviewId}&reporter_discord_user_id=eq.${discordUserId}&select=*`
    );

    if (existingReports?.length > 0) {
      return redirectToServer(request, serverId, "error=already_reported");
    }

    await supabaseRequest("review_reports", {
      method: "POST",
      body: JSON.stringify({
        review_id: reviewId,
        server_id: serverId,
        reporter_discord_user_id: discordUserId,
        reason,
        created_at: new Date().toISOString(),
      }),
    });

    const nextReportedCount = Number(review.reported_count ?? 0) + 1;

    await supabaseRequest(`reviews?id=eq.${reviewId}`, {
      method: "PATCH",
      body: JSON.stringify({
        reported_count: nextReportedCount,
        updated_at: new Date().toISOString(),
      }),
    });

    return redirectToServer(request, serverId, "reported=1");
  } catch (error) {
    console.error("Review report error:", error);

    return NextResponse.redirect(
      new URL("/servers?error=report_failed", request.url),
      { status: 303 }
    );
  }
}
