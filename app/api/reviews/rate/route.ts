import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

function redirectToServers(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/servers?${query}`, request.url), {
    status: 303,
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirectToServers(request, "error=login_required");
  }

  const discordUserId =
    (session.user as any).discordId || (session.user as any).id;

  if (!discordUserId) {
    return redirectToServers(request, "error=no_discord_id");
  }

  const formData = await request.formData();

  const serverId = String(formData.get("server_id") ?? "");
  const rating = Number(formData.get("rating") ?? 0);

  if (!serverId || rating < 1 || rating > 5) {
    return redirectToServers(request, "error=invalid_rating");
  }

  const existingReviews = await supabaseRequest(
    `reviews?server_id=eq.${serverId}&discord_user_id=eq.${discordUserId}&select=*`
  );

  if (existingReviews?.length > 0) {
    return redirectToServers(request, "error=already_rated");
  }

  const servers = await supabaseRequest(
    `servers?id=eq.${serverId}&approved=eq.true&status=eq.approved&select=*`
  );

  if (!servers?.[0]) {
    return redirectToServers(request, "error=server_not_found");
  }

  await supabaseRequest("reviews", {
    method: "POST",
    body: JSON.stringify({
      server_id: serverId,
      discord_user_id: discordUserId,
      rating,
    }),
  });

  return redirectToServers(request, "rated=1");
}
