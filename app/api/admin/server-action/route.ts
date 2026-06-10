import { NextResponse } from "next/server";
import {
  getCurrentStaff,
  canApproveServers,
  canBumpBanServers,
  canModerateServers,
} from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

function redirectToAdmin(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/admin?${query}`, request.url), {
    status: 303,
  });
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function getStaffName(staff: any) {
  return staff?.username || staff?.name || staff?.email || "Staff";
}

function getStaffId(staff: any) {
  return staff?.discord_user_id || staff?.discordId || staff?.id || "";
}

function getDurationValue(formData: FormData, fallback = "3") {
  return String(formData.get("duration") || fallback).trim();
}

function getUntilFromDuration(duration: string) {
  if (duration === "permanent") {
    return null;
  }

  const days = Number(duration);

  if (!Number.isFinite(days) || days <= 0) {
    return addDays(3);
  }

  return addDays(days);
}

function getDurationText(duration: string, until: string | null) {
  if (duration === "permanent") {
    return "Permanent";
  }

  if (!until) {
    return "Permanent";
  }

  return `bis ${new Date(until).toLocaleString("de-DE")}`;
}

function getReason(formData: FormData) {
  return String(formData.get("reason") || "").trim().slice(0, 900);
}

function requireReason(request: Request, reason: string) {
  if (!reason || reason.length < 5) {
    return redirectToAdmin(request, "error=reason_required");
  }

  return null;
}

async function getServer(serverId: string) {
  const rows = await supabaseRequest(`servers?id=eq.${serverId}&select=*`);
  return Array.isArray(rows) ? rows[0] : null;
}

function getServerOwnerDiscordId(server: any) {
  return (
    server?.owner_discord_user_id ||
    server?.owner_discord_id ||
    server?.owner_id ||
    server?.discord_user_id ||
    server?.submitted_by_discord_user_id ||
    server?.created_by_discord_user_id ||
    server?.user_discord_id ||
    server?.user_id ||
    ""
  );
}

async function notifyServerOwner({
  server,
  type,
  title,
  message,
}: {
  server: any;
  type: string;
  title: string;
  message: string;
}) {
  const discordUserId = getServerOwnerDiscordId(server);

  if (!discordUserId) {
    console.warn("No server owner discord id found for notification", server?.id);
    return;
  }

  try {
    await supabaseRequest("user_notifications", {
      method: "POST",
      body: JSON.stringify({
        discord_user_id: String(discordUserId),
        server_id: server?.id || null,
        type,
        title,
        message,
        read: false,
        created_at: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Could not create user notification:", error);
  }
}

async function updateServer(serverId: string, data: Record<string, any>) {
  return supabaseRequest(`servers?id=eq.${serverId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function POST(request: Request) {
  const staff = await getCurrentStaff();

  if (!staff) {
    return redirectToAdmin(request, "error=no_staff_access");
  }

  const formData = await request.formData();

  const serverId = String(formData.get("server_id") || "").trim();
  const action = String(formData.get("action") || "").trim();
  const reason = getReason(formData);

  if (!serverId || !action) {
    return redirectToAdmin(request, "error=missing_server_action");
  }

  const server = await getServer(serverId);

  if (!server) {
    return redirectToAdmin(request, "error=server_not_found");
  }

  const staffId = getStaffId(staff);
  const staffName = getStaffName(staff);
  const now = new Date().toISOString();

  const baseUpdate = {
    moderated_by: staffId,
    moderated_at: now,
  };

  try {
    if (action === "approve") {
      if (!canApproveServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      await updateServer(serverId, {
        ...baseUpdate,
        approved: true,
        status: "approved",
        moderation_status: null,
        moderation_reason: null,
        moderation_until: null,
        moderation_action: "approved",
        moderation_by_username: staffName,
        moderation_created_at: now,
      });

      await notifyServerOwner({
        server,
        type: "server_approved",
        title: "Server wurde freigegeben",
        message: `Dein Server „${server.server_name}“ wurde freigegeben und ist jetzt öffentlich sichtbar.`,
      });

      return redirectToAdmin(request, "approved=1");
    }

    if (action === "reject") {
      if (!canApproveServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const reasonError = requireReason(request, reason);
      if (reasonError) return reasonError;

      await updateServer(serverId, {
        ...baseUpdate,
        approved: false,
        status: "rejected",
        moderation_status: "rejected",
        moderation_reason: reason,
        moderation_until: null,
        moderation_action: "rejected",
        moderation_by_username: staffName,
        moderation_created_at: now,
      });

      await notifyServerOwner({
        server,
        type: "server_rejected",
        title: "Server wurde abgelehnt",
        message: `Dein Server „${server.server_name}“ wurde abgelehnt. Grund: ${reason}`,
      });

      return redirectToAdmin(request, "rejected=1");
    }

    if (
      action === "bump_ban" ||
      action === "bump_ban_3d" ||
      action === "bump_ban_7d"
    ) {
      if (!canBumpBanServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const fallbackDuration =
        action === "bump_ban_7d" ? "7" : action === "bump_ban_3d" ? "3" : "3";

      const duration = getDurationValue(formData, fallbackDuration);
      const until = getUntilFromDuration(duration);

      const finalReason =
        reason || `Bump-Sperre für ${duration === "permanent" ? "Permanent" : `${duration} Tage`}`;

      const reasonError = requireReason(request, finalReason);
      if (reasonError) return reasonError;

      await updateServer(serverId, {
        ...baseUpdate,
        bump_banned_until: until,
        bump_ban_reason: finalReason,
        bump_ban_by_username: staffName,
      });

      await notifyServerOwner({
        server,
        type: "bump_ban",
        title: "Bump-Sperre erhalten",
        message: `Für deinen Server „${server.server_name}“ wurde eine Bump-Sperre verhängt. Dauer: ${getDurationText(
          duration,
          until
        )}. Grund: ${finalReason}`,
      });

      return redirectToAdmin(request, "bump_ban=1");
    }

    if (action === "remove_bump_ban") {
      if (!canBumpBanServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const reasonError = requireReason(request, reason);
      if (reasonError) return reasonError;

      await updateServer(serverId, {
        ...baseUpdate,
        bump_banned_until: null,
        bump_ban_reason: null,
        bump_ban_by_username: null,
      });

      await notifyServerOwner({
        server,
        type: "bump_ban_removed",
        title: "Bump-Sperre entfernt",
        message: `Die Bump-Sperre für deinen Server „${server.server_name}“ wurde entfernt. Grund: ${reason}`,
      });

      return redirectToAdmin(request, "bump_ban_removed=1");
    }

    if (action === "lock") {
      if (!canModerateServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const reasonError = requireReason(request, reason);
      if (reasonError) return reasonError;

      const duration = getDurationValue(formData, "7");
      const until = getUntilFromDuration(duration);

      await updateServer(serverId, {
        ...baseUpdate,
        approved: false,
        status: "locked",
        moderation_status: "locked",
        moderation_reason: reason,
        moderation_until: until,
        moderation_action: "locked",
        moderation_by_username: staffName,
        moderation_created_at: now,
      });

      await notifyServerOwner({
        server,
        type: "server_locked",
        title: "Server wurde gesperrt",
        message: `Dein Server „${server.server_name}“ wurde gesperrt. Dauer: ${getDurationText(
          duration,
          until
        )}. Grund: ${reason}`,
      });

      return redirectToAdmin(request, "server_locked=1");
    }

    if (action === "unlock") {
      if (!canModerateServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const reasonError = requireReason(request, reason);
      if (reasonError) return reasonError;

      await updateServer(serverId, {
        ...baseUpdate,
        approved: true,
        status: "approved",
        moderation_status: null,
        moderation_reason: null,
        moderation_until: null,
        moderation_action: "unlocked",
        moderation_by_username: staffName,
        moderation_created_at: now,
      });

      await notifyServerOwner({
        server,
        type: "server_unlocked",
        title: "Server wurde entsperrt",
        message: `Dein Server „${server.server_name}“ wurde entsperrt. Grund: ${reason}`,
      });

      return redirectToAdmin(request, "server_unlocked=1");
    }

    if (action === "ban") {
      if (!canModerateServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const reasonError = requireReason(request, reason);
      if (reasonError) return reasonError;

      const duration = getDurationValue(formData, "30");
      const until = getUntilFromDuration(duration);

      await updateServer(serverId, {
        ...baseUpdate,
        approved: false,
        status: "banned",
        moderation_status: "banned",
        moderation_reason: reason,
        moderation_until: until,
        moderation_action: "banned",
        moderation_by_username: staffName,
        moderation_created_at: now,
      });

      await notifyServerOwner({
        server,
        type: "server_banned",
        title: "Server wurde gebannt",
        message: `Dein Server „${server.server_name}“ wurde gebannt. Dauer: ${getDurationText(
          duration,
          until
        )}. Grund: ${reason}`,
      });

      return redirectToAdmin(request, "server_banned=1");
    }

    if (action === "unban") {
      if (!canModerateServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const reasonError = requireReason(request, reason);
      if (reasonError) return reasonError;

      await updateServer(serverId, {
        ...baseUpdate,
        approved: false,
        status: "pending",
        moderation_status: null,
        moderation_reason: null,
        moderation_until: null,
        moderation_action: "unbanned",
        moderation_by_username: staffName,
        moderation_created_at: now,
      });

      await notifyServerOwner({
        server,
        type: "server_unbanned",
        title: "Server wurde entbannt",
        message: `Dein Server „${server.server_name}“ wurde entbannt. Grund: ${reason}`,
      });

      return redirectToAdmin(request, "server_unbanned=1");
    }

    if (action === "premium_30d" || action === "premium_7d") {
      if (!canModerateServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const until = addDays(30);

      await updateServer(serverId, {
        ...baseUpdate,
        premium_status: true,
        premium_until: until,
      });

      await notifyServerOwner({
        server,
        type: "premium_activated",
        title: "Premium aktiviert",
        message: `Glückwunsch! Dein Server „${server.server_name}“ ist jetzt für 1 Monat Premium.`,
      });

      return redirectToAdmin(request, "premium_30d=1");
    }

    if (action === "remove_premium") {
      if (!canModerateServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const reasonError = requireReason(request, reason);
      if (reasonError) return reasonError;

      await updateServer(serverId, {
        ...baseUpdate,
        premium_status: false,
        premium_until: null,
      });

      await notifyServerOwner({
        server,
        type: "premium_removed",
        title: "Premium wurde entfernt",
        message: `Premium wurde für deinen Server „${server.server_name}“ entfernt. Grund: ${reason}`,
      });

      return redirectToAdmin(request, "premium_removed=1");
    }

    if (action === "partner_30d" || action === "partner_7d") {
      if (!canModerateServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const until = addDays(30);

      await updateServer(serverId, {
        ...baseUpdate,
        partner_status: true,
        partner_until: until,
      });

      await notifyServerOwner({
        server,
        type: "partner_activated",
        title: "Partner aktiviert",
        message: `Glückwunsch! Dein Server „${server.server_name}“ ist jetzt für 1 Monat Partner.`,
      });

      return redirectToAdmin(request, "partner_30d=1");
    }

    if (action === "remove_partner") {
      if (!canModerateServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const reasonError = requireReason(request, reason);
      if (reasonError) return reasonError;

      await updateServer(serverId, {
        ...baseUpdate,
        partner_status: false,
        partner_until: null,
      });

      await notifyServerOwner({
        server,
        type: "partner_removed",
        title: "Partner wurde entfernt",
        message: `Partner wurde für deinen Server „${server.server_name}“ entfernt. Grund: ${reason}`,
      });

      return redirectToAdmin(request, "partner_removed=1");
    }

    if (action === "delete") {
      if (!canModerateServers(staff.role)) {
        return redirectToAdmin(request, "error=no_permission");
      }

      const reasonError = requireReason(request, reason);
      if (reasonError) return reasonError;

      await notifyServerOwner({
        server,
        type: "server_deleted",
        title: "Server wurde gelöscht",
        message: `Dein Server „${server.server_name}“ wurde gelöscht. Grund: ${reason}`,
      });

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "DELETE",
      });

      return redirectToAdmin(request, "server_deleted=1");
    }

    return redirectToAdmin(request, "error=invalid_action");
  } catch (error: any) {
    console.error("Admin server action error:", error);

    return redirectToAdmin(request, "error=server_action_failed");
  }
}
