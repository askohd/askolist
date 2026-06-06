import { NextResponse } from "next/server";
import {
  getCurrentStaff,
  canApproveServers,
  canBumpBanServers,
  canModerateServers,
} from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export async function POST(request: Request) {
  const staff = await getCurrentStaff();

  if (!staff) {
    return NextResponse.json({ error: "No staff access" }, { status: 403 });
  }

  const formData = await request.formData();

  const serverId = String(formData.get("server_id") ?? "");
  const action = String(formData.get("action") ?? "");

  if (!serverId || !action) {
    return NextResponse.json(
      { error: "Missing server_id or action" },
      { status: 400 }
    );
  }

  const baseUpdate = {
    moderated_by: staff.discord_user_id,
    moderated_at: new Date().toISOString(),
  };

  try {
    if (action === "approve") {
      if (!canApproveServers(staff.role)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          approved: true,
          status: "approved",
        }),
      });
    }

    else if (action === "reject") {
      if (!canApproveServers(staff.role)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          approved: false,
          status: "rejected",
        }),
      });
    }

    else if (action === "bump_ban_3d") {
      if (!canBumpBanServers(staff.role)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          bump_banned_until: addDays(3),
          bump_ban_reason: "Bump ban for 3 days",
          bump_banned_by: staff.discord_user_id,
          bump_banned_at: new Date().toISOString(),
        }),
      });
    }

    else if (action === "remove_bump_ban") {
      if (!canBumpBanServers(staff.role)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          bump_banned_until: null,
          bump_ban_reason: null,
          bump_banned_by: null,
          bump_banned_at: null,
        }),
      });
    }

    else if (action === "lock") {
      if (!canModerateServers(staff.role)) {
        return NextResponse.json({ error: "Only admins can lock servers" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          approved: false,
          status: "locked",
          locked_at: new Date().toISOString(),
          locked_reason: "Locked by admin",
        }),
      });
    }

    else if (action === "unlock") {
      if (!canModerateServers(staff.role)) {
        return NextResponse.json({ error: "Only admins can unlock servers" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          approved: true,
          status: "approved",
          locked_at: null,
          locked_reason: null,
        }),
      });
    }

    else if (action === "ban") {
      if (!canModerateServers(staff.role)) {
        return NextResponse.json({ error: "Only admins can ban servers" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          approved: false,
          status: "banned",
          banned_at: new Date().toISOString(),
          banned_reason: "Banned by admin",
        }),
      });
    }

    else if (action === "unban") {
      if (!canModerateServers(staff.role)) {
        return NextResponse.json({ error: "Only admins can unban servers" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          approved: false,
          status: "pending",
          banned_at: null,
          banned_reason: null,
        }),
      });
    }

    else if (action === "premium_7d") {
      if (!canModerateServers(staff.role)) {
        return NextResponse.json({ error: "Only admins can give premium" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          premium_status: true,
          premium_until: addDays(7),
        }),
      });
    }

    else if (action === "remove_premium") {
      if (!canModerateServers(staff.role)) {
        return NextResponse.json({ error: "Only admins can remove premium" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          premium_status: false,
          premium_until: null,
        }),
      });
    }

    else if (action === "partner_7d") {
      if (!canModerateServers(staff.role)) {
        return NextResponse.json({ error: "Only admins can give partner" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          partner_status: true,
          partner_until: addDays(7),
        }),
      });
    }

    else if (action === "remove_partner") {
      if (!canModerateServers(staff.role)) {
        return NextResponse.json({ error: "Only admins can remove partner" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...baseUpdate,
          partner_status: false,
          partner_until: null,
        }),
      });
    }

    else if (action === "delete") {
      if (!canModerateServers(staff.role)) {
        return NextResponse.json({ error: "Only admins can delete servers" }, { status: 403 });
      }

      await supabaseRequest(`servers?id=eq.${serverId}`, {
        method: "DELETE",
      });
    }

    else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.redirect(new URL("/admin", request.url));
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Admin action failed" },
      { status: 500 }
    );
  }
}
