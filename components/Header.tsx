import HeaderClient from "./HeaderClient";
import { getCurrentStaff } from "@/lib/admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

function isEnabled(value: unknown) {
  const normalized = String(value ?? "").trim().toLowerCase();

  return (
    value === true ||
    value === 1 ||
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes" ||
    normalized === "on"
  );
}

function serverNeedsAttention(server: any) {
  const status = String(server.status ?? "").trim().toLowerCase();
  const approved = isEnabled(server.approved);
  const botInGuild = isEnabled(server.bot_in_guild);

  if (!botInGuild) return true;
  if (!approved) return true;

  if (
    status === "banned" ||
    status === "locked" ||
    status === "rejected" ||
    status === "blocked"
  ) {
    return true;
  }

  /*
    Für spätere echte "ungelesen"-Meldungen aus dem Admin-Panel.
    Wenn wir später owner_notification_seen oder notification_seen einbauen,
    funktioniert der rote Punkt damit direkt weiter.
  */
  if (server.owner_notification_seen === false) return true;
  if (server.notification_seen === false) return true;

  return false;
}

export default async function Header() {
  const staff = await getCurrentStaff();
  const session = await getServerSession(authOptions);

  const user = session?.user as any;
  const discordUserId = user?.id || user?.discordId;

  let hasDashboardAlert = false;

  if (discordUserId) {
    try {
      const myServers = await supabaseRequest(
        "servers?owner_discord_user_id=eq." +
          encodeURIComponent(discordUserId) +
          "&select=*"
      );

      hasDashboardAlert =
        Array.isArray(myServers) && myServers.some(serverNeedsAttention);
    } catch (error) {
      console.error("Header dashboard alert check failed:", error);
    }
  }

  return (
    <HeaderClient
      isAdmin={Boolean(staff)}
      hasDashboardAlert={hasDashboardAlert}
    />
  );
}
