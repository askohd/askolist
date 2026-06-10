import { NextResponse } from "next/server";
import { getCurrentStaff, canManageStaff } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

function redirectToAdmin(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/admin?${query}`, request.url), {
    status: 303,
  });
}

function clean(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function cleanUsername(value: string) {
  return value.replace(/^@+/, "").trim();
}

function isAllowedRole(role: string) {
  return role === "admin" || role === "supporter";
}

async function findStaffByUsername(username: string) {
  try {
    const rows = await supabaseRequest(
      `staff_members?discord_username=ilike.${encodeURIComponent(
        username
      )}&select=*`
    );

    return Array.isArray(rows) ? rows[0] : null;
  } catch {
    return null;
  }
}

async function findStaffByDiscordId(discordUserId: string) {
  if (!discordUserId) return null;

  try {
    const rows = await supabaseRequest(
      `staff_members?discord_user_id=eq.${encodeURIComponent(
        discordUserId
      )}&select=*`
    );

    return Array.isArray(rows) ? rows[0] : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const staff = await getCurrentStaff();

  if (!canManageStaff(staff)) {
    return redirectToAdmin(request, "error=owner_only");
  }

  const formData = await request.formData();

  const action = clean(formData.get("action"));
  const staffMemberId = clean(formData.get("staff_member_id"));
  const discordUsername = cleanUsername(clean(formData.get("discord_username")));
  const discordUserId = clean(formData.get("discord_user_id"));
  const role = clean(formData.get("role")).toLowerCase();

  try {
    if (action === "remove_staff") {
      if (!staffMemberId) {
        return redirectToAdmin(request, "error=missing_staff_member");
      }

      const rows = await supabaseRequest(
        `staff_members?id=eq.${staffMemberId}&select=*`
      );

      const target = Array.isArray(rows) ? rows[0] : null;

      if (!target) {
        return redirectToAdmin(request, "error=staff_not_found");
      }

      if (target.role === "owner") {
        return redirectToAdmin(request, "error=cannot_remove_owner");
      }

      await supabaseRequest(`staff_members?id=eq.${staffMemberId}`, {
        method: "DELETE",
      });

      return redirectToAdmin(request, "staff_removed=1");
    }

    if (!discordUsername) {
      return redirectToAdmin(request, "error=missing_discord_username");
    }

    if (!isAllowedRole(role)) {
      return redirectToAdmin(request, "error=invalid_staff_role");
    }

    const now = new Date().toISOString();

    const existingById = discordUserId
      ? await findStaffByDiscordId(discordUserId)
      : null;

    const existingByUsername = await findStaffByUsername(discordUsername);

    const existing = existingById || existingByUsername;

    const payload = {
      discord_user_id: discordUserId || existing?.discord_user_id || null,
      discord_username: discordUsername,
      role,
      created_by_discord_user_id: staff?.discord_user_id || null,
      created_by_username: staff?.username || null,
      updated_at: now,
    };

    if (existing?.id) {
      if (existing.role === "owner") {
        return redirectToAdmin(request, "error=cannot_edit_owner");
      }

      await supabaseRequest(`staff_members?id=eq.${existing.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      return redirectToAdmin(request, "staff_saved=1");
    }

    await supabaseRequest("staff_members", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        created_at: now,
      }),
    });

    return redirectToAdmin(request, "staff_saved=1");
  } catch (error) {
    console.error("Staff admin action failed:", error);
    return redirectToAdmin(request, "error=staff_action_failed");
  }
}
