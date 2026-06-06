import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

export async function getCurrentAdmin() {
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

  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  return currentUser;
}
