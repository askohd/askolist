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
  primary = false,
}: {
  serverId: string;
  action: string;
  label: string;
  danger?: boolean;
  primary?: boolean;
}) {
  let className = "admin-action-btn";

  if (danger) className += " danger";
  if (primary) className += " primary";

  return (
    <form action="/api/admin/server-action" method="POST">
      <input type="hidden" name="server_id" value={serverId} />
      <input type="hidden" name="action" value={action} />
      <button className={className} type="submit">
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
          <div className="admin-server-list">
            {servers.map((server: any) => {
              const bumpBanned = isBumpBanned(server);

              return (
                <article className="admin-server-card" key={server.id}>
                  <div className="admin-server-main">
                    <div className="admin-avatar">
                      {server.server_name?.slice(0, 1) ?? "S"}
                    </div>

                    <div className="admin-server-content">
                      <div className="admin-server-heading">
                        <div>
                          <h3>{server.server_name}</h3>
                          <p>
                            {server.category} • {server.country} •{" "}
                            {server.language}
                          </p>
                        </div>

                        <div className="admin-status-group">
                          <span className={`status-pill ${server.status}`}>
                            {server.status ?? "pending"}
                          </span>

                          <span
                            className={
                              server.approved
                                ? "status-pill approved"
                                : "status-pill not-approved"
                            }
                          >
                            {server.approved ? "Approved" : "Not approved"}
                          </span>
                        </div>
                      </div>

                      <p className="admin-description">{server.description}</p>

                      <div className="admin-meta-grid">
                        <span>Bumps: {server.bumps ?? 0}</span>
                        <span>NSFW: {server.nsfw ? "Yes" : "No"}</span>
                        <span>
                          Bump ban:{" "}
                          {bumpBanned
                            ? `until ${formatDate(server.bump_banned_until)}`
                            : "No"}
                        </span>
                        <span>
                          Premium:{" "}
                          {server.premium_status
                            ? `until ${formatDate(server.premium_until)}`
                            : "No"}
                        </span>
                        <span>
                          Partner:{" "}
                          {server.partner_status
                            ? `until ${formatDate(server.partner_until)}`
                            : "No"}
                        </span>
                      </div>

                      <div className="admin-link-row">
                        <a
                          className="admin-link-btn"
                          href={server.invite_link}
                          target="_blank"
                        >
                          Open Discord Invite
                        </a>
                      </div>

                      <div className="admin-action-section">
                        <h4>Review</h4>
                        <div className="admin-actions">
                          <ActionForm
                            serverId={server.id}
                            action="approve"
                            label="Approve"
                            primary
                          />
                          <ActionForm
                            serverId={server.id}
                            action="reject"
                            label="Reject"
                            danger
                          />
                        </div>
                      </div>

                      <div className="admin-action-section">
                        <h4>Bump Moderation</h4>
                        <div className="admin-actions">
                          <ActionForm
                            serverId={server.id}
                            action="bump_ban_3d"
                            label="Bump Ban 3 Days"
                          />
                          <ActionForm
                            serverId={server.id}
                            action="remove_bump_ban"
                            label="Remove Bump Ban"
                          />
                        </div>
                      </div>

                      {isAdmin && (
                        <div className="admin-action-section admin-only-section">
                          <h4>Admin Actions</h4>
                          <div className="admin-actions">
                            <ActionForm
                              serverId={server.id}
                              action="premium_7d"
                              label="Premium 7 Days"
                            />
                            <ActionForm
                              serverId={server.id}
                              action="remove_premium"
                              label="Remove Premium"
                            />
                            <ActionForm
                              serverId={server.id}
                              action="partner_7d"
                              label="Partner 7 Days"
                            />
                            <ActionForm
                              serverId={server.id}
                              action="remove_partner"
                              label="Remove Partner"
                            />
                            <ActionForm
                              serverId={server.id}
                              action="lock"
                              label="Lock"
                            />
                            <ActionForm
                              serverId={server.id}
                              action="unlock"
                              label="Unlock"
                            />
                            <ActionForm
                              serverId={server.id}
                              action="ban"
                              label="Ban"
                              danger
                            />
                            <ActionForm
                              serverId={server.id}
                              action="unban"
                              label="Unban"
                            />
                            <ActionForm
                              serverId={server.id}
                              action="delete"
                              label="Delete"
                              danger
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
