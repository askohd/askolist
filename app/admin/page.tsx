import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

export type StaffRole = "owner" | "admin" | "supporter";

export type CurrentStaff = {
  discord_user_id: string;
  username: string;
  role: StaffRole;
};

const OWNER_DISCORD_ID = "779668785216880683";
const OWNER_USERNAME = "asko_pizza";

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeRole(value: unknown): StaffRole | null {
  const role = clean(value).toLowerCase();

  if (role === "owner") return "owner";
  if (role === "admin" || role === "administrator") return "admin";
  if (role === "supporter") return "supporter";

  return null;
}

function getSessionDiscordId(user: any) {
  return clean(
    user?.discordId ||
      user?.discord_id ||
      user?.discord_user_id ||
      user?.id ||
      ""
  );
}

function getSessionUsername(user: any) {
  return clean(
    user?.username ||
      user?.global_name ||
      user?.name ||
      user?.email ||
      ""
  );
}

function isOwnerIdentity(discordUserId: string, username: string) {
  return (
    discordUserId === OWNER_DISCORD_ID ||
    username.toLowerCase() === OWNER_USERNAME
  );
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

async function findStaffByUsername(username: string) {
  if (!username) return null;

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

export async function getCurrentStaff(): Promise<CurrentStaff | null> {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!user) {
    return null;
  }

  const discordUserId = getSessionDiscordId(user);
  const username = getSessionUsername(user);

  if (isOwnerIdentity(discordUserId, username)) {
    return {
      discord_user_id: OWNER_DISCORD_ID,
      username: OWNER_USERNAME,
      role: "owner",
    };
  }

  const staffById = await findStaffByDiscordId(discordUserId);

  if (staffById) {
    const role = normalizeRole(staffById.role);

    if (!role) return null;

    return {
      discord_user_id: clean(staffById.discord_user_id || discordUserId),
      username: clean(staffById.discord_username || username),
      role,
    };
  }

  const staffByName = await findStaffByUsername(username);

  if (staffByName) {
    const role = normalizeRole(staffByName.role);

    if (!role) return null;

    return {
      discord_user_id: clean(staffByName.discord_user_id || discordUserId),
      username: clean(staffByName.discord_username || username),
      role,
    };
  }

  return null;
}

/**
 * Alte Header-Kompatibilität:
 * Header.tsx importiert noch getCurrentAdmin.
 * Diese Funktion gibt alle Staff-Rollen zurück: owner, admin, supporter.
 */
export async function getCurrentAdmin(): Promise<CurrentStaff | null> {
  return getCurrentStaff();
}

export function canApproveServers(role?: string | null) {
  const normalizedRole = normalizeRole(role);

  return (
    normalizedRole === "owner" ||
    normalizedRole === "admin" ||
    normalizedRole === "supporter"
  );
}

export function canModerateServers(role?: string | null) {
  const normalizedRole = normalizeRole(role);

  return normalizedRole === "owner" || normalizedRole === "admin";
}

export function canBumpBanServers(role?: string | null) {
  const normalizedRole = normalizeRole(role);

  return normalizedRole === "owner" || normalizedRole === "admin";
}

export function canManageStaff(staff?: CurrentStaff | null) {
  if (!staff) return false;

  return (
    staff.role === "owner" ||
    staff.discord_user_id === OWNER_DISCORD_ID ||
    staff.username.toLowerCase() === OWNER_USERNAME
  );
}
