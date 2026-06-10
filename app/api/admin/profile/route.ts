import { NextResponse } from "next/server";
import { getCurrentStaff } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

const STAFF_LANGUAGE_OPTIONS = [
  "Deutsch",
  "English",
  "Français",
  "Italiano",
  "Polski",
];

function redirectToAdmin(request: Request, query: string) {
  return NextResponse.redirect(new URL(`/admin?${query}`, request.url), {
    status: 303,
  });
}

function clean(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function normalizeLanguage(value: string) {
  const language = clean(value);

  if (STAFF_LANGUAGE_OPTIONS.includes(language)) {
    return language;
  }

  return "Deutsch";
}

function cleanAvatarUrl(value: string) {
  const avatarUrl = clean(value);

  if (!avatarUrl) return null;

  if (!avatarUrl.startsWith("https://")) {
    return null;
  }

  return avatarUrl.slice(0, 700);
}

async function findStaffProfile(staff: any) {
  const discordUserId = clean(staff?.discord_user_id);
  const username = clean(staff?.username);

  if (discordUserId) {
    const byId = await supabaseRequest(
      `staff_members?discord_user_id=eq.${encodeURIComponent(
        discordUserId
      )}&select=*&limit=1`
    );

    const row = Array.isArray(byId) ? byId[0] : null;
    if (row) return row;
  }

  if (username) {
    const byName = await supabaseRequest(
      `staff_members?discord_username=ilike.${encodeURIComponent(
        username
      )}&select=*&limit=1`
    );

    const row = Array.isArray(byName) ? byName[0] : null;
    if (row) return row;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const staff = await getCurrentStaff();

    if (!staff) {
      return redirectToAdmin(request, "error=no_access");
    }

    const formData = await request.formData();
    const staffLanguage = normalizeLanguage(clean(formData.get("staff_language")));
    const avatarUrl = cleanAvatarUrl(clean(formData.get("avatar_url")));
    const now = new Date().toISOString();

    const profile = await findStaffProfile(staff);

    const payload = {
      staff_language: staffLanguage,
      avatar_url: avatarUrl,
      updated_at: now,
    };

    if (profile?.id) {
      await supabaseRequest(`staff_members?id=eq.${profile.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      return redirectToAdmin(request, "profile_saved=1");
    }

    await supabaseRequest("staff_members", {
      method: "POST",
      body: JSON.stringify({
        discord_user_id: staff.discord_user_id || null,
        discord_username: staff.username || "Staff",
        role: staff.role,
        ...payload,
        created_at: now,
      }),
    });

    return redirectToAdmin(request, "profile_saved=1");
  } catch (error) {
    console.error("Admin profile update failed:", error);
    return redirectToAdmin(request, "error=profile_update_failed");
  }
}
