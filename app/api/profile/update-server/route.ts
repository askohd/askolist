import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

function slugifyFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}

async function uploadPublicFile(
  bucket: string,
  ownerDiscordUserId: string,
  file: File
) {
  const filePath = `${ownerDiscordUserId}/${Date.now()}-${slugifyFileName(
    file.name
  )}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect(new URL("/profile?error=login", request.url));
  }

  const discordUserId =
    (session.user as any).discordId || (session.user as any).id;

  if (!discordUserId) {
    return NextResponse.redirect(
      new URL("/profile?error=no_user", request.url)
    );
  }

  const formData = await request.formData();

  const serverName = String(formData.get("server_name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const premiumGlowColor = String(
    formData.get("premium_glow_color") ?? "#8b5cf6"
  ).trim();

  const logoFile = formData.get("logo");
  const bannerFile = formData.get("banner");

  const servers = await supabaseRequest(
    `servers?owner_discord_user_id=eq.${discordUserId}&select=*`
  );

  const server = servers?.[0];

  if (!server) {
    return NextResponse.redirect(
      new URL("/profile?error=no_server", request.url)
    );
  }

  const updateData: any = {
    server_name: serverName || server.server_name,
    description: description || server.description,
    premium_glow_color: premiumGlowColor || "#8b5cf6",
  };

  if (logoFile instanceof File && logoFile.size > 0) {
    updateData.logo_url = await uploadPublicFile(
      "server-logos",
      discordUserId,
      logoFile
    );
  }

  if (bannerFile instanceof File && bannerFile.size > 0) {
    updateData.banner_url = await uploadPublicFile(
      "server-banners",
      discordUserId,
      bannerFile
    );
  }

  await supabaseRequest(`servers?id=eq.${server.id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  });

  return NextResponse.redirect(new URL("/profile?saved=1", request.url));
}
