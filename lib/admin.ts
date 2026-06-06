import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

export async function getCurrentStaff() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const user = session.user as any;
  const discordUserId = user.id;

  if (!discordUserId) {
    return null;
  }

  const users = await supabaseRequest(
    `users?discord_user_id=eq.${discordUserId}&select=*`
  );

  const currentUser = users?.[0];

  if (!currentUser) {
    return null;
  }

  if (currentUser.role !== "admin" && currentUser.role !== "supporter") {
    return null;
  }

  return currentUser;
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
