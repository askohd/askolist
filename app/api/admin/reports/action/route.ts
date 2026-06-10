import { NextResponse } from "next/server";
import { getCurrentStaff, canModerateServers } from "@/lib/admin";
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

function getStaffId(staff: any) {
  return staff?.discord_user_id || staff?.discordId || staff?.id || "";
}

function getStaffName(staff: any) {
  return staff?.username || staff?.name || staff?.email || "Staff";
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

function getDurationValue(formData: FormData, fallback = "3") {
  return String(formData.get("duration") || fallback).trim();
}

function getUntilFromDuration(duration: string, permanentAsFarFuture = false) {
  if (duration === "permanent") {
    return permanentAsFarFuture ? "9999-12-31T23:59:59.000Z" : null;
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

async function updateServerReport(reportId: string, data: Record<string, any>) {
  return supabaseRequest(`server_reports?id=eq.${reportId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function updateReviewReport(reportId: string, data: Record<string, any>) {
  return supabaseRequest(`review_reports?id=eq.${reportId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function updateServer(serverId: string, data: Record<string, any>) {
  return supabaseRequest(`servers?id=eq.${serverId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function updateReview(reviewId: string, data: Record<string, any>) {
  return supabaseRequest(`reviews?id=eq.${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function getServer(serverId: string) {
  const rows = await supabaseRequest(`servers?id=eq.${serverId}&select=*`);
  return Array.isArray(rows) ? rows[0] : null;
}

async function getReview(reviewId: string) {
  const rows = await supabaseRequest(`reviews?id=eq.${reviewId}&select=*`);
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

function getReviewOwnerDiscordId(review: any) {
  return review?.discord_user_id || review?.user_discord_id || review?.user_id || "";
}

async function notifyUser({
  discordUserId,
  serverId,
  type,
  title,
  message,
}: {
  discordUserId: string;
  serverId?: string | null;
  type: string;
  title: string;
  message: string;
}) {
  if (!discordUserId) {
    return;
  }

  try {
    await supabaseRequest("user_notifications", {
      method: "POST",
      body: JSON.stringify({
        discord_user_id: String(discordUserId),
        server_id: serverId || null,
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
  await notifyUser({
    discordUserId: getServerOwnerDiscordId(server),
    serverId: server?.id || null,
    type,
    title,
    message,
  });
}

export async function POST(request: Request) {
  try {
    const staff = await getCurrentStaff();

    if (!staff || !canModerateServers(staff.role)) {
      return redirectToAdmin(request, "error=no_access");
    }

    const isAdmin =
      staff.role === "admin" ||
      staff.role === "owner" ||
      staff.role === "administrator";

    const formData = await request.formData();

    const reportType = String(formData.get("report_type") || "").trim();
    const reportId = String(formData.get("report_id") || "").trim();
    const serverId = String(formData.get("server_id") || "").trim();
    const reviewId = String(formData.get("review_id") || "").trim();
    const action = String(formData.get("action") || "").trim();
    const reason = getReason(formData);

    if (!reportType || !reportId || !action) {
      return redirectToAdmin(request, "error=missing_action");
    }

    const now = new Date().toISOString();
    const staffId = getStaffId(staff);
    const staffName = getStaffName(staff);

    const handledData = {
      status: "resolved",
      action_taken: action,
      handled_by_discord_user_id: staffId,
      handled_by_username: staffName,
      handled_at: now,
    };

    if (reportType === "server") {
      const server = serverId ? await getServer(serverId) : null;

      if (
        [
          "lock_reported_server",
          "ban_reported_server",
          "delete_reported_server",
          "bump_ban_reported_server",
          "bump_ban_3d_reported_server",
          "bump_ban_7d_reported_server",
        ].includes(action)
      ) {
        if (!serverId || !server) {
          return redirectToAdmin(request, "error=no_server");
        }

        const reasonError = requireReason(request, reason);
        if (reasonError) return reasonError;
      }

      if (action === "dismiss_server_report") {
        await updateServerReport(reportId, {
          ...handledData,
          status: "dismissed",
          action_taken: "Server-Meldung abgelehnt",
        });

        return redirectToAdmin(request, "report_dismissed=1");
      }

      if (action === "mark_server_report_done") {
        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Server-Meldung erledigt",
        });

        return redirectToAdmin(request, "report_done=1");
      }

      if (action === "lock_reported_server") {
        const duration = getDurationValue(formData, "7");
        const until = getUntilFromDuration(duration);

        await updateServer(serverId, {
          approved: false,
          status: "locked",
          moderation_status: "locked",
          moderation_reason: reason,
          moderation_until: until,
          moderation_action: "locked",
          moderation_by_username: staffName,
          moderation_created_at: now,
          moderated_by: staffId,
          moderated_at: now,
        });

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: `Server gesperrt. Dauer: ${getDurationText(
            duration,
            until
          )}. Grund: ${reason}`,
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

      if (action === "ban_reported_server") {
        if (!isAdmin) {
          return redirectToAdmin(request, "error=admin_required");
        }

        const duration = getDurationValue(formData, "30");
        const until = getUntilFromDuration(duration);

        await updateServer(serverId, {
          approved: false,
          status: "banned",
          moderation_status: "banned",
          moderation_reason: reason,
          moderation_until: until,
          moderation_action: "banned",
          moderation_by_username: staffName,
          moderation_created_at: now,
          moderated_by: staffId,
          moderated_at: now,
        });

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: `Server gebannt. Dauer: ${getDurationText(
            duration,
            until
          )}. Grund: ${reason}`,
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

      if (
        action === "bump_ban_reported_server" ||
        action === "bump_ban_3d_reported_server" ||
        action === "bump_ban_7d_reported_server"
      ) {
        const fallbackDuration =
          action === "bump_ban_7d_reported_server"
            ? "7"
            : action === "bump_ban_3d_reported_server"
            ? "3"
            : "3";

        const duration = getDurationValue(formData, fallbackDuration);
        const until = getUntilFromDuration(duration, true);

        await updateServer(serverId, {
          bump_banned_until: until,
          bump_ban_reason: reason,
          bump_ban_by_username: staffName,
          moderated_by: staffId,
          moderated_at: now,
        });

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: `Bump-Sperre verhängt. Dauer: ${getDurationText(
            duration,
            until
          )}. Grund: ${reason}`,
        });

        await notifyServerOwner({
          server,
          type: "bump_ban",
          title: "Bump-Sperre erhalten",
          message: `Für deinen Server „${server.server_name}“ wurde eine Bump-Sperre verhängt. Dauer: ${getDurationText(
            duration,
            until
          )}. Grund: ${reason}`,
        });

        return redirectToAdmin(request, "bump_ban=1");
      }

      if (action === "remove_bump_ban_reported_server") {
        if (!serverId || !server) {
          return redirectToAdmin(request, "error=no_server");
        }

        await updateServer(serverId, {
          bump_banned_until: null,
          bump_ban_reason: null,
          bump_ban_by_username: null,
          moderated_by: staffId,
          moderated_at: now,
        });

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Bump-Sperre entfernt",
        });

        await notifyServerOwner({
          server,
          type: "bump_ban_removed",
          title: "Bump-Sperre entfernt",
          message: `Die Bump-Sperre für deinen Server „${server.server_name}“ wurde entfernt.`,
        });

        return redirectToAdmin(request, "bump_ban_removed=1");
      }

      if (action === "delete_reported_server") {
        if (!isAdmin) {
          return redirectToAdmin(request, "error=admin_required");
        }

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: `Server gelöscht. Grund: ${reason}`,
        });

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

      return redirectToAdmin(request, "error=unknown_server_action");
    }

    if (reportType === "review") {
      const review = reviewId ? await getReview(reviewId) : null;
      const server = serverId ? await getServer(serverId) : null;

      if (["hide_review", "delete_review"].includes(action)) {
        if (!reviewId || !review) {
          return redirectToAdmin(request, "error=no_review");
        }

        const reasonError = requireReason(request, reason);
        if (reasonError) return reasonError;
      }

      if (action === "dismiss_review_report") {
        await updateReviewReport(reportId, {
          ...handledData,
          status: "dismissed",
          action_taken: "Bewertungs-Meldung abgelehnt",
        });

        return redirectToAdmin(request, "review_report_dismissed=1");
      }

      if (action === "hide_review") {
        await updateReview(reviewId, {
          hidden: true,
          moderation_status: "hidden",
          moderation_note: reason,
          handled_by_discord_user_id: staffId,
          handled_at: now,
          updated_at: now,
        });

        await updateReviewReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: `Bewertung versteckt. Grund: ${reason}`,
        });

        await notifyUser({
          discordUserId: getReviewOwnerDiscordId(review),
          serverId: server?.id || review?.server_id || null,
          type: "review_hidden",
          title: "Bewertung wurde versteckt",
          message: `Deine Bewertung${
            server?.server_name ? ` für „${server.server_name}“` : ""
          } wurde versteckt. Grund: ${reason}`,
        });

        return redirectToAdmin(request, "review_hidden=1");
      }

      if (action === "delete_review") {
        if (!isAdmin) {
          return redirectToAdmin(request, "error=admin_required");
        }

        await updateReview(reviewId, {
          hidden: true,
          deleted_by_admin: true,
          moderation_status: "deleted",
          moderation_note: reason,
          handled_by_discord_user_id: staffId,
          handled_at: now,
          updated_at: now,
        });

        await updateReviewReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: `Bewertung gelöscht. Grund: ${reason}`,
        });

        await notifyUser({
          discordUserId: getReviewOwnerDiscordId(review),
          serverId: server?.id || review?.server_id || null,
          type: "review_deleted",
          title: "Bewertung wurde gelöscht",
          message: `Deine Bewertung${
            server?.server_name ? ` für „${server.server_name}“` : ""
          } wurde gelöscht. Grund: ${reason}`,
        });

        return redirectToAdmin(request, "review_deleted=1");
      }

      return redirectToAdmin(request, "error=unknown_review_action");
    }

    return redirectToAdmin(request, "error=unknown_report_type");
  } catch (error) {
    console.error("Admin report action error:", error);

    return redirectToAdmin(request, "error=report_action_failed");
  }
}
