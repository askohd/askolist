import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

function redirectToProfile(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/profile?${query}`, request.url), {
    status: 303,
  });
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return redirectToProfile(request, "error=login");
    }

    const discordUserId =
      (session.user as any).discordId || (session.user as any).id;

    if (!discordUserId) {
      return redirectToProfile(request, "error=no_user");
    }

    const formData = await request.formData();
    const serverId = String(formData.get("server_id") ?? "").trim();

    if (!serverId) {
      return redirectToProfile(request, "error=no_server_id");
    }

    const servers = await supabaseRequest(
      `servers?id=eq.${serverId}&owner_discord_user_id=eq.${discordUserId}&select=id`
    );

    const server = servers?.[0];

    if (!server) {
      return redirectToProfile(request, "error=not_owner");
    }

    await supabaseRequest(`reviews?server_id=eq.${serverId}`, {
      method: "DELETE",
    });

    await supabaseRequest(
      `servers?id=eq.${serverId}&owner_discord_user_id=eq.${discordUserId}`,
      {
        method: "DELETE",
      }
    );

    return redirectToProfile(request, "deleted=1");
  } catch (error: any) {
    console.error("Delete server failed:", error);

    return NextResponse.json(
      {
        error: error.message ?? "Delete server failed",
      },
      { status: 500 }
    );
  }
}
