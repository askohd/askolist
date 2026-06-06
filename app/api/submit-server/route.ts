import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

function getValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  const user = session.user as any;
  const discordUserId = user.id;

  if (!discordUserId) {
    return NextResponse.json(
      { error: "Discord User ID fehlt. Bitte neu einloggen." },
      { status: 400 }
    );
  }

  const formData = await request.formData();

  const tagsText = getValue(formData, "tags");
  const tags = tagsText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const serverPayload = {
    owner_discord_user_id: discordUserId,
    discord_server_id: getValue(formData, "discord_server_id"),
    server_name: getValue(formData, "server_name"),
    description: getValue(formData, "description"),
    invite_link: getValue(formData, "invite_link"),
    logo_url: getValue(formData, "logo_url") || null,
    category: getValue(formData, "category") || "Community",
    tags,
    country: getValue(formData, "country") || "International",
    language: getValue(formData, "language") || "English",
    nsfw: formData.get("nsfw") === "on",
    approved: false,
    bumps: 0,
  };

  try {
    await supabaseRequest("users?on_conflict=discord_user_id", {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({
        discord_user_id: discordUserId,
        username: session.user?.name ?? "Discord User",
        avatar_url: session.user?.image ?? null,
      }),
    });

    await supabaseRequest("servers", {
      method: "POST",
      body: JSON.stringify(serverPayload),
    });

    return NextResponse.redirect(new URL("/profile?submitted=1", request.url));
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message ?? "Server konnte nicht gespeichert werden.",
      },
      { status: 500 }
    );
  }
}
