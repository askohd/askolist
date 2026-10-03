type ExistingServerInvite = {
  invite_link?: unknown;
  inviteLink?: unknown;
  discord_server_id?: unknown;
  discordServerId?: unknown;
  guild_id?: unknown;
  guildId?: unknown;
};

export type InviteUpdateError =
  | "invalid_invite"
  | "invite_unavailable"
  | "invite_different_server";

type InviteUpdateResult =
  | {
      ok: true;
      update: { invite_link?: string; discord_server_id?: string };
    }
  | { ok: false; error: InviteUpdateError };

export function getDiscordInviteCode(inviteLink: string): string | null {
  try {
    const url = new URL(inviteLink);

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username ||
      url.password ||
      url.port
    ) {
      return null;
    }

    const host = url.hostname.toLowerCase();
    const path = url.pathname;
    const match =
      host === "discord.gg" || host === "www.discord.gg"
        ? path.match(/^\/([a-zA-Z0-9-]+)\/?$/)
        : [
            "discord.com",
            "www.discord.com",
            "discordapp.com",
            "www.discordapp.com",
          ].includes(host)
        ? path.match(/^\/invite\/([a-zA-Z0-9-]+)\/?$/)
        : null;

    return match?.[1] || null;
  } catch {
    return null;
  }
}

export async function validateServerInviteUpdate(
  formData: Pick<FormData, "get">,
  server: ExistingServerInvite,
  fetchInvite: typeof fetch = fetch
): Promise<InviteUpdateResult> {
  const submittedInvite = formData.get("invite_link") ?? formData.get("inviteLink");

  // Older clients can update other settings without submitting an invite.
  if (submittedInvite === null) return { ok: true, update: {} };
  if (typeof submittedInvite !== "string") {
    return { ok: false, error: "invalid_invite" };
  }

  const inviteLink = submittedInvite.trim();
  const previousInvite = String(
    server.invite_link || server.inviteLink || ""
  ).trim();

  // An expired, unchanged invite must not prevent unrelated profile edits.
  if (inviteLink === previousInvite) return { ok: true, update: {} };

  const inviteCode = getDiscordInviteCode(inviteLink);
  if (!inviteCode) return { ok: false, error: "invalid_invite" };

  try {
    const response = await fetchInvite(
      `https://discord.com/api/v10/invites/${encodeURIComponent(inviteCode)}?with_counts=false`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      return {
        ok: false,
        error:
          response.status >= 400 && response.status < 500 && response.status !== 429
            ? "invalid_invite"
            : "invite_unavailable",
      };
    }

    const invite = await response.json();
    const guildId = invite?.guild?.id;

    if (typeof guildId !== "string" || !/^\d{1,20}$/.test(guildId)) {
      return { ok: false, error: "invalid_invite" };
    }

    if (invite.expires_at) {
      const expiresAt = new Date(invite.expires_at).getTime();
      if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
        return { ok: false, error: "invalid_invite" };
      }
    }

    const previousGuildIds = [
      server.discord_server_id,
      server.discordServerId,
      server.guild_id,
      server.guildId,
    ]
      .map((value) => String(value || "").trim())
      .filter((value) => value && !value.startsWith("manual-"));

    if (previousGuildIds.some((previousGuildId) => previousGuildId !== guildId)) {
      return { ok: false, error: "invite_different_server" };
    }

    const update: { invite_link: string; discord_server_id?: string } = {
      invite_link: `https://discord.gg/${inviteCode}`,
    };

    // Submissions whose invite could not be resolved used a synthetic ID.
    if (String(server.discord_server_id || "").trim() !== guildId) {
      update.discord_server_id = guildId;
    }

    return { ok: true, update };
  } catch {
    return { ok: false, error: "invite_unavailable" };
  }
}
