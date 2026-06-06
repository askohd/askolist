import { getCurrentAdmin } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

export default async function AdminPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return (
      <main className="container profile-page">
        <section className="profile-card">
          <span className="page-badge">Access denied</span>
          <h1>No admin access</h1>
          <p>
            You are logged in, but your Discord account is not marked as an
            admin for AskoList.
          </p>
        </section>
      </main>
    );
  }

  const pendingServers = await supabaseRequest(
    "servers?approved=eq.false&select=*&order=created_at.desc"
  );

  return (
    <main className="container profile-page">
      <section className="profile-header-card">
        <span className="page-badge">Admin Dashboard</span>
        <h1>Admin Panel</h1>
        <p>Welcome, {admin.username}. Here you can review submitted servers.</p>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Pending Servers</h2>
          <span className="meta">{pendingServers.length} waiting</span>
        </div>

        {pendingServers.length === 0 ? (
          <div className="card empty">
            <h3>No pending servers</h3>
            <p>There are currently no servers waiting for approval.</p>
          </div>
        ) : (
          <div className="grid">
            {pendingServers.map((server: any) => (
              <div className="card server-card" key={server.id}>
                <div className="server-top">
                  <div className="avatar">
                    {server.server_name?.slice(0, 1) ?? "S"}
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
                  <span className="badge">Waiting for approval</span>
                  {server.nsfw && <span className="badge">NSFW</span>}
                </div>

                <a className="btn secondary" href={server.invite_link}>
                  Open Discord Invite
                </a>

                <p className="form-note">
                  Approval buttons will be connected in the next step.
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
