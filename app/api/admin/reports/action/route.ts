import { NextResponse } from "next/server";
import { getCurrentStaff, canModerateServers } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

function redirectToAdmin(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/admin?${query}`, request.url), {
    status: 303,
  });
}

function getStaffId(staff: any) {
  return staff?.discord_user_id || staff?.discordId || staff?.id || "";
}

function getStaffName(staff: any) {
  return staff?.username || staff?.name || staff?.email || "Staff";
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
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

    if (!reportType || !reportId || !action) {
      return redirectToAdmin(request, "error=missing_action");
    }

    const now = new Date().toISOString();

    const handledData = {
      status: "resolved",
      action_taken: action,
      handled_by_discord_user_id: getStaffId(staff),
      handled_by_username: getStaffName(staff),
      handled_at: now,
    };

    if (reportType === "server") {
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
        if (!serverId) {
          return redirectToAdmin(request, "error=no_server");
        }

        await updateServer(serverId, {
          status: "locked",
          approved: false,
        });

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Server gesperrt",
        });

        return redirectToAdmin(request, "server_locked=1");
      }

      if (action === "ban_reported_server") {
        if (!isAdmin) {
          return redirectToAdmin(request, "error=admin_required");
        }

        if (!serverId) {
          return redirectToAdmin(request, "error=no_server");
        }

        await updateServer(serverId, {
          status: "banned",
          approved: false,
        });

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Server gebannt",
        });

        return redirectToAdmin(request, "server_banned=1");
      }

      if (action === "bump_ban_3d_reported_server") {
        if (!serverId) {
          return redirectToAdmin(request, "error=no_server");
        }

        await updateServer(serverId, {
          bump_banned_until: addDays(3),
        });

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Bump-Sperre 3 Tage verhängt",
        });

        return redirectToAdmin(request, "bump_ban_3d=1");
      }

      if (action === "bump_ban_7d_reported_server") {
        if (!serverId) {
          return redirectToAdmin(request, "error=no_server");
        }

        await updateServer(serverId, {
          bump_banned_until: addDays(7),
        });

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Bump-Sperre 7 Tage verhängt",
        });

        return redirectToAdmin(request, "bump_ban_7d=1");
      }

      if (action === "remove_bump_ban_reported_server") {
        if (!serverId) {
          return redirectToAdmin(request, "error=no_server");
        }

        await updateServer(serverId, {
          bump_banned_until: null,
        });

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Bump-Sperre entfernt",
        });

        return redirectToAdmin(request, "bump_ban_removed=1");
      }

      if (action === "delete_reported_server") {
        if (!isAdmin) {
          return redirectToAdmin(request, "error=admin_required");
        }

        if (!serverId) {
          return redirectToAdmin(request, "error=no_server");
        }

        await updateServerReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Server gelöscht",
        });

        await supabaseRequest(`servers?id=eq.${serverId}`, {
          method: "DELETE",
        });

        return redirectToAdmin(request, "server_deleted=1");
      }

      return redirectToAdmin(request, "error=unknown_server_action");
    }

    if (reportType === "review") {
      if (action === "dismiss_review_report") {
        await updateReviewReport(reportId, {
          ...handledData,
          status: "dismissed",
          action_taken: "Bewertungs-Meldung abgelehnt",
        });

        return redirectToAdmin(request, "review_report_dismissed=1");
      }

      if (action === "hide_review") {
        if (!reviewId) {
          return redirectToAdmin(request, "error=no_review");
        }

        await updateReview(reviewId, {
          hidden: true,
          moderation_status: "hidden",
          moderation_note: "Durch Staff nach Meldung versteckt",
          handled_by_discord_user_id: getStaffId(staff),
          handled_at: now,
          updated_at: now,
        });

        await updateReviewReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Bewertung versteckt",
        });

        return redirectToAdmin(request, "review_hidden=1");
      }

      if (action === "delete_review") {
        if (!isAdmin) {
          return redirectToAdmin(request, "error=admin_required");
        }

        if (!reviewId) {
          return redirectToAdmin(request, "error=no_review");
        }

        await updateReview(reviewId, {
          hidden: true,
          deleted_by_admin: true,
          moderation_status: "deleted",
          moderation_note: "Durch Admin nach Meldung gelöscht",
          handled_by_discord_user_id: getStaffId(staff),
          handled_at: now,
          updated_at: now,
        });

        await updateReviewReport(reportId, {
          ...handledData,
          status: "resolved",
          action_taken: "Bewertung gelöscht",
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
