import Link from "next/link";
import { supabaseRequest } from "@/lib/supabase";

function sortServers(servers: any[]) {
  return servers.sort((a, b) => {
    if (a.premium_status !== b.premium_status) {
      return a.premium_status ? -1 : 1;
    }

    const aBump = a.last_bump ? new Date(a.last_bump).getTime() : 0;
    const bBump = b.last_bump ? new Date(b.last_bump).getTime() : 0;

    if (aBump !== bBump) {
      return bBump - aBump;
    }

    const aCreated = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bCreated = b.created_at ? new Date(b.created_at).getTime() : 0;

    return bCreated - aCreated;
  });
}

export default async function ServersPage() {
  let servers: any[] = [];

  try {
    const data = await supabaseRequest(
      "servers?approved=eq.true&status=eq.approved&select=*"
    );

    servers = sortServers(data ?? []);
  } catch (error) {
    console.error("Failed to load servers:", error);
    servers = [];
  }

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

      <section className="card search-panel">
        <div className="search-box">
          <input
            className="input"
            placeholder="Search by name or tags..."
            disabled
          />

          <select disabled>
            <option>All countries</option>
          </select>

          <select disabled>
            <option>All languages</option>
          </select>

          <select disabled>
            <option>All categories</option>
          </select>

          <button className="btn" disabled>
            Search
          </button>
        </div>

        <p className="form-note">
          Search filters are prepared. Real filtering can be connected next.
        </p>
      </section>

      <section className="section">
        {servers.length === 0 ? (
          <div className="card empty">
            <h3>No approved Discord servers yet</h3>
            <p>
              Noch keine freigegebenen Discord-Server vorhanden. Sei der Erste
              und registriere deinen Server.
            </p>

            <Link href="/submit" className="btn">
              Server eintragen
            </Link>
          </div>
        ) : (
          <div className="grid">
            {servers.map((server) => (
              <article
                className={
                  server.premium_status
                    ? "card server-card premium"
                    : "card server-card"
                }
                key={server.id}
              >
                <div className="server-top">
                  <div className="avatar">
                    {server.logo_url ? (
                      <img src={server.logo_url} alt={server.server_name} />
                    ) : (
                      server.server_name?.slice(0, 1) ?? "S"
                    )}
                  </div>

                  <div>
                    <h3 className="server-name">{server.server_name}</h3>
                    <p className="meta">
                      {server.category} • {server.country} • {server.language}
                    </p>
                  </div>
                </div>

                <p className="meta">{server.description}</p>

                <div className="badges">
                  {server.premium_status && (
                    <span className="badge premium">Premium</span>
                  )}

                  {server.partner_status && (
                    <span className="badge partner">Partner</span>
                  )}

                  <span className="badge">Bumps: {server.bumps ?? 0}</span>

                  {server.nsfw && <span className="badge">NSFW</span>}
                </div>

                <a
                  className="btn secondary"
                  href={server.invite_link}
                  target="_blank"
                >
                  Join Server
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
