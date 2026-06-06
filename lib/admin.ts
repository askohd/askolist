import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

function getDiscordUserIdFromSession(session: any) {
  return (
    session?.user?.id ||
    session?.user?.discordId ||
    session?.user?.discord_user_id ||
    null
  );
}

export async function getCurrentStaff() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    const discordUserId = getDiscordUserIdFromSession(session);

    if (!discordUserId) {
      console.error("No Discord User ID found in session:", session);
      return null;
    }

    const users = await supabaseRequest(
      `users?discord_user_id=eq.${discordUserId}&select=*`
    );

    const currentUser = users?.[0];

    if (!currentUser) {
      console.error("No user found in Supabase for Discord ID:", discordUserId);
      return null;
    }

    if (currentUser.role !== "admin" && currentUser.role !== "supporter") {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.error("Staff check failed:", error);
    return null;
  }
}

export async function getCurrentAdmin() {
  const staff = await getCurrentStaff();

  if (!staff || staff.role !== "admin") {
    return null;
  }

  return staff;
}

export function canApproveServers(role: string) {
  return role === "admin" || role === "supporter";
}

export function canBumpBanServers(role: string) {
  return role === "admin" || role === "supporter";
}

export function canModerateServers(role: string) {
  return role === "admin";
}
