import { getCurrentStaff, canModerateServers } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

function formatDate(value: string | null) {
  if (!value) return "Not set";
  return new Date(value).toLocaleString("de-DE");
}

function isBumpBanned(server: any) {
  if (!server.bump_banned_until) return false;
  return new Date(server.bump_banned_until).getTime() > Date.now();
}

function ActionForm({
  serverId,
  action,
  label,
  danger = false,
}: {
  serverId: string;
  action: string;
  label: string;
  danger?: boolean;
}) {
  return (
    <form action="/api/admin/server-action" method="POST">
      <input type="hidden" name="server_id" value={serverId} />
      <input type="hidden" name="action" value={action} />
      <button className={danger ? "btn danger" : "btn secondary"} type="submit">
        {label}
      </button>
    </form>
  );
}

export default async function AdminPage() {
  const staff = await getCurrentStaff();

  if (!staff) {
    return (
      <main className="container profile-page">
        <section className="profile-card">
          <span className="page-badge">Access denied</span>
          <h1>No staff access</h1>
          <p>You need to be an admin or supporter to access this dashboard.</p>
        </section>
      </main>
    );
  }

  const isAdmin = canModerateServers(staff.role);

  const servers = await supabaseRequest(
    "servers?select=*&order=created_at.desc"
  );

  return (
    <main className="container profile-page">
      <section className="profile-header-card">
        <span className="page-badge">
          {isAdmin ? "Admin Dashboard" : "Supporter Dashboard"}
        </span>

        <h1>Moderation Panel</h1>

        <p>
          Logged in as <strong>{staff.username}</strong>. Role:{" "}
          <strong>{staff.role}</strong>
        </p>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>All Servers</h2>
          <span className="meta">{servers.length} total</span>
        </div>

        {servers.length === 0 ? (
          <div className="card empty">
            <h3>No servers yet</h3>
            <p>Submitted servers will appear here.</p>
          </div>
        ) : (
          <div className="grid">
            {servers.map((server: any) => {
              const bumpBanned = isBumpBanned(server);

              return (
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
                    <span className="badge">
                      Status: {server.status ?? "pending"}
                    </span>

                    <span className="badge">
                      Approved: {server.approved ? "yes" : "no"}
                    </span>

                    {server.nsfw && <span className="badge danger-badge">NSFW</span>}

                    {bumpBanned && (
                      <span className="badge danger-badge">
                        Bump banned until {formatDate(server.bump_banned_until)}
                      </span>
                    )}

                    {server.premium_status && (
                      <span className="badge premium">
                        Premium until {formatDate(server.premium_until)}
                      </span>
                    )}

                    {server.partner_status && (
                      <span className="badge partner">
                        Partner until {formatDate(server.partner_until)}
                      </span>
                    )}
                  </div>

                  <p className="meta">Bumps: {server.bumps ?? 0}</p>

                  <a className="btn secondary" href={server.invite_link}>
                    Open Invite
                  </a>

                  <div className="admin-actions">
                    <ActionForm serverId={server.id} action="approve" label="Approve" />
                    <ActionForm serverId={server.id} action="reject" label="Reject" danger />
                    <ActionForm serverId={server.id} action="bump_ban_3d" label="Bump ban 3 days" />
                    <ActionForm serverId={server.id} action="remove_bump_ban" label="Remove bump ban" />

                    {isAdmin && (
                      <>
                        <ActionForm serverId={server.id} action="premium_7d" label="Premium 7 days" />
                        <ActionForm serverId={server.id} action="remove_premium" label="Remove Premium" />
                        <ActionForm serverId={server.id} action="partner_7d" label="Partner 7 days" />
                        <ActionForm serverId={server.id} action="remove_partner" label="Remove Partner" />
                        <ActionForm serverId={server.id} action="lock" label="Lock" />
                        <ActionForm serverId={server.id} action="unlock" label="Unlock" />
                        <ActionForm serverId={server.id} action="ban" label="Ban" danger />
                        <ActionForm serverId={server.id} action="unban" label="Unban" />
                        <ActionForm serverId={server.id} action="delete" label="Delete" danger />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
