import Link from "next/link";
import { supabaseRequest } from "@/lib/supabase";

function sortServers(servers: any[]) {
  return servers.sort((a, b) => {
    if (a.premium_status !== b.premium_status) {
      return a.premium_status ? -1 : 1;
    }

    const aBump = a.last_bump ? new Date(a.last_bump).getTime() : 0;
    const bBump = b.last_bump ? new Date(b.last_bump).getTime() : 0;

    return bBump - aBump;
  });
}

export default async function ServersPage() {
  const data = await supabaseRequest(
    "servers?approved=eq.true&status=eq.approved&select=*"
  );

  const servers = sortServers(data ?? []);

  return (
    <main className="container profile-page">
      <section className="section-title">
        <div>
          <h1>Discord Servers</h1>
          <p className="meta">Premium first, then latest bumps</p>
        </div>

        <Link href="/submit" className="btn">
          Submit Server
        </Link>
      </section>

      <section className="server-list-modern">
        {servers.length === 0 ? (
          <div className="card empty">
            <h3>No approved Discord servers yet</h3>
            <p>Noch keine freigegebenen Server vorhanden.</p>
          </div>
        ) : (
          servers.map((server: any) => (
            <article
              key={server.id}
              className={`server-modern-card ${
                server.premium_status ? "premium-server-card" : ""
              }`}
              style={
                server.premium_status
                  ? {
                      boxShadow: `0 0 30px ${
                        server.premium_glow_color || "#8b5cf6"
                      }55`,
                      borderColor: `${server.premium_glow_color || "#8b5cf6"}66`,
                    }
                  : undefined
              }
            >
              <div className="server-modern-banner">
                {server.banner_url && server.banner_url.startsWith("http") ? (
                  <img src={server.banner_url} alt={server.server_name} />
                ) : (
                  <div className="server-modern-banner-fallback" />
                )}

                {server.premium_status && (
                  <span className="server-premium-badge">Premium</span>
                )}
              </div>

              <div className="server-modern-body">
                <div className="server-modern-logo">
                  {server.logo_url && server.logo_url.startsWith("http") ? (
                    <img src={server.logo_url} alt={server.server_name} />
                  ) : (
                    <span>{server.server_name?.slice(0, 1) ?? "S"}</span>
                  )}
                </div>

                <div className="server-modern-content">
                  <div className="server-modern-header">
                    <div>
                      <h3>{server.server_name}</h3>
                      <p>
                        {server.category} • {server.country} • {server.language}
                      </p>
                    </div>

                    <div className="server-modern-badges">
                      {server.partner_status && (
                        <span className="badge partner">Partner</span>
                      )}
                      {server.premium_status && (
                        <span className="badge premium">Premium</span>
                      )}
                      {server.nsfw && <span className="badge">NSFW</span>}
                    </div>
                  </div>

                  <p className="server-modern-description">
                    {server.description}
                  </p>

                  <div className="server-modern-footer">
                    <span className="server-modern-bump-count">
                      Bumps: {server.bumps ?? 0}
                    </span>

                    <a
                      className="btn secondary"
                      href={server.invite_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join Server
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
