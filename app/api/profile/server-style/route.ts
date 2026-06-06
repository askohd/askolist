import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect(new URL("/profile?error=login", request.url));
  }

  const discordUserId =
    (session.user as any).discordId || (session.user as any).id;

  const formData = await request.formData();
  const premiumGlowColor = String(
    formData.get("premium_glow_color") ?? "#8b5cf6"
  );

  const servers = await supabaseRequest(
    `servers?owner_discord_user_id=eq.${discordUserId}&select=*`
  );

  const server = servers?.[0];

  if (!server) {
    return NextResponse.redirect(new URL("/profile?error=no_server", request.url));
  }

  await supabaseRequest(`servers?id=eq.${server.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      premium_glow_color: premiumGlowColor,
    }),
  });

  return NextResponse.redirect(new URL("/profile?saved=1", request.url));
}
