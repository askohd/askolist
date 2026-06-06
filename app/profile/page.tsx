import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";
import ProfileServerEditor from "@/components/ProfileServerEditor";

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
                  {server.banner_url && server.banner_url.startsWith("http") ? (
                    <img
                      src={server.banner_url}
                      alt={server.server_name}
                      style={{
                        objectPosition: `${server.banner_position_x ?? 50}% ${
                          server.banner_position_y ?? 50
                        }%`,
                        transform: `scale(${server.banner_zoom ?? 1})`,
                        transformOrigin: `${server.banner_position_x ?? 50}% ${
                          server.banner_position_y ?? 50
                        }%`,
                      }}
                    />
                  ) : (
                    <div className="profile-server-banner-fallback" />
                  )}
                </div>

                <div className="profile-server-top">
                  <div className="profile-server-logo">
                    {server.logo_url && server.logo_url.startsWith("http") ? (
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

                <ProfileServerEditor server={server} />

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
