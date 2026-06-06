import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="container profile-page">
        <section className="profile-card">
          <h1>Login required</h1>
          <p>You need to login with Discord to view your profile.</p>

          <Link className="btn" href="/api/auth/signin">
            Login with Discord
          </Link>
        </section>
      </main>
    );
  }

  const user = session.user as any;
  const discordUserId = user.id || user.discordId;

  let myServers: any[] = [];

  if (discordUserId) {
    myServers = await supabaseRequest(
      `servers?owner_discord_user_id=eq.${discordUserId}&select=*&order=created_at.desc`
    );
  }

  return (
    <main className="container profile-page">
      <section className="profile-header-card">
        <div className="profile-user">
          {session.user?.image ? (
            <img src={session.user.image} alt="Discord Avatar" />
          ) : (
            <div className="profile-avatar-fallback">?</div>
          )}

          <div>
            <span className="page-badge">Discord Profile</span>
            <h1>{session.user?.name}</h1>
            <p>Discord User ID: {discordUserId ?? "Not available"}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>My Server</h2>

          {myServers.length === 0 && (
            <Link href="/submit" className="btn">
              Add Server
            </Link>
          )}
        </div>

        {myServers.length === 0 ? (
          <div className="card empty">
            <h3>No server added yet</h3>
            <p>
              You have not submitted a Discord server yet. Each user can add one
              server.
            </p>

            <Link href="/submit" className="btn">
              Submit your server
            </Link>
          </div>
        ) : (
          <div className="profile-server-list">
            {myServers.map((server) => (
              <article className="profile-server-card" key={server.id}>
                <div className="profile-server-banner">
                  {server.banner_url ? (
                    <img src={server.banner_url} alt={server.server_name} />
                  ) : (
                    <div className="profile-server-banner-fallback" />
                  )}
                </div>

                <div className="profile-server-top">
                  <div className="profile-server-logo">
                    {server.logo_url ? (
                      <img src={server.logo_url} alt={server.server_name} />
                    ) : (
                      <span>{server.server_name?.slice(0, 1) ?? "S"}</span>
                    )}
                  </div>

                  <div>
                    <h3>{server.server_name}</h3>
                    <p>
                      {server.category} • {server.country} • {server.language}
                    </p>
                  </div>
                </div>

                <p className="profile-server-description">
                  {server.description}
                </p>

                <div className="badges separated-badges">
                  <span className="badge">
                    {server.approved ? "Approved" : "Waiting for approval"}
                  </span>

                  {server.premium_status && (
                    <span className="badge premium">Premium</span>
                  )}

                  {server.partner_status && (
                    <span className="badge partner">Partner</span>
                  )}

                  <span className="badge">Bumps: {server.bumps ?? 0}</span>
                </div>

                <form
                  action="/api/profile/update-server"
                  method="POST"
                  encType="multipart/form-data"
                  className="profile-edit-card"
                >
                  <h3>Server bearbeiten</h3>

                  <label className="field">
                    <span>Servername</span>
                    <input
                      className="input"
                      name="server_name"
                      defaultValue={server.server_name ?? ""}
                      placeholder="Servername"
                    />
                  </label>

                  <label className="field full">
                    <span>Beschreibung</span>
                    <textarea
                      name="description"
                      defaultValue={server.description ?? ""}
                      placeholder="Beschreibung deines Servers"
                    />
                  </label>

                  <div className="profile-upload-grid">
                    <label className="field">
                      <span>Server-Logo ändern</span>
                      <input type="file" name="logo" accept="image/*" />
                    </label>

                    <label className="field">
                      <span>Server-Banner ändern</span>
                      <input type="file" name="banner" accept="image/*" />
                    </label>
                  </div>

                  <div className="profile-style-card inner-style-card">
                    <div>
                      <h3>Premium Glow Color</h3>
                      <p>
                        Diese Farbe wird für den Premium-Leuchteffekt deines
                        Servers verwendet.
                      </p>
                    </div>

                    <div className="color-row">
                      <input
                        type="color"
                        name="premium_glow_color"
                        defaultValue={server.premium_glow_color ?? "#8b5cf6"}
                      />

                      <button className="btn" type="submit">
                        Änderungen speichern
                      </button>
                    </div>
                  </div>

                  {!server.premium_status && (
                    <p className="form-note">
                      Hinweis: Der Glow ist erst sichtbar, wenn dein Server
                      Premium hat.
                    </p>
                  )}
                </form>

                <a
                  className="btn secondary"
                  href={server.invite_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Discord Invite
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
