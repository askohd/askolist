import {
  getCurrentStaff,
  canModerateServers,
  canApproveServers,
  canManageStaff,
} from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";
import type { ReactNode } from "react";

type PageSearchParams = Record<string, string | string[] | undefined>;

const DURATION_OPTIONS = [
  { value: "1", label: "1 Tag" },
  { value: "3", label: "3 Tage" },
  { value: "7", label: "7 Tage" },
  { value: "14", label: "14 Tage" },
  { value: "30", label: "30 Tage" },
  { value: "permanent", label: "Permanent" },
];

function getSearchValue(searchParams: PageSearchParams, key: string) {
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
}

function getAdminNotice(searchParams: PageSearchParams) {
  if (getSearchValue(searchParams, "approved") === "1") {
    return "Server wurde angenommen.";
  }

  if (getSearchValue(searchParams, "rejected") === "1") {
    return "Server wurde abgelehnt.";
  }

  if (getSearchValue(searchParams, "staff_saved") === "1") {
    return "Teammitglied wurde gespeichert.";
  }

  if (getSearchValue(searchParams, "staff_removed") === "1") {
    return "Teammitglied wurde entfernt.";
  }

  if (getSearchValue(searchParams, "report_done") === "1") {
    return "Meldung wurde als erledigt markiert.";
  }

  if (getSearchValue(searchParams, "report_dismissed") === "1") {
    return "Meldung wurde abgelehnt.";
  }

  if (getSearchValue(searchParams, "server_locked") === "1") {
    return "Server wurde gesperrt.";
  }

  if (getSearchValue(searchParams, "server_banned") === "1") {
    return "Server wurde gebannt.";
  }

  if (getSearchValue(searchParams, "server_deleted") === "1") {
    return "Server wurde gelöscht.";
  }

  if (getSearchValue(searchParams, "bump_ban") === "1") {
    return "Bump-Sperre wurde verhängt.";
  }

  if (getSearchValue(searchParams, "bump_ban_removed") === "1") {
    return "Bump-Sperre wurde entfernt.";
  }

  if (getSearchValue(searchParams, "premium_30d") === "1") {
    return "Premium wurde für 1 Monat aktiviert.";
  }

  if (getSearchValue(searchParams, "partner_30d") === "1") {
    return "Partner wurde für 1 Monat aktiviert.";
  }

  if (getSearchValue(searchParams, "premium_removed") === "1") {
    return "Premium wurde entfernt.";
  }

  if (getSearchValue(searchParams, "partner_removed") === "1") {
    return "Partner wurde entfernt.";
  }

  if (getSearchValue(searchParams, "review_hidden") === "1") {
    return "Bewertung wurde versteckt.";
  }

  if (getSearchValue(searchParams, "review_deleted") === "1") {
    return "Bewertung wurde gelöscht.";
  }

  if (getSearchValue(searchParams, "review_report_dismissed") === "1") {
    return "Bewertungs-Meldung wurde abgelehnt.";
  }

  const error = getSearchValue(searchParams, "error");

  if (error) {
    return `Fehler: ${error}`;
  }

  return "";
}

function formatDate(value: string | null | undefined) {
  if (!value) return "Nicht gesetzt";
  return new Date(value).toLocaleString("de-DE");
}

function getTimeValue(value: string | null | undefined) {
  if (!value) return 0;
  return new Date(value).getTime();
}

function isBumpBanned(server: any) {
  if (!server.bump_banned_until) return false;
  return new Date(server.bump_banned_until).getTime() > Date.now();
}

function getServerName(server: any) {
  return server?.server_name || "Unbekannter Server";
}

function getReviewText(review: any) {
  return (
    review?.comment ||
    review?.review_comment ||
    review?.text ||
    review?.message ||
    "Keine Kommentar-Bewertung vorhanden."
  );
}

function getReviewAuthor(review: any) {
  return (
    review?.discord_username ||
    review?.user_name ||
    review?.username ||
    review?.discord_user_id ||
    "Unbekannter Nutzer"
  );
}

function getStatusLabel(server: any) {
  if (server.status === "banned") return "Gebannt";
  if (server.status === "locked") return "Gesperrt";
  if (server.status === "approved") return "Freigegeben";
  if (server.status === "rejected") return "Abgelehnt";
  return server.status || "pending";
}

function getStatusClass(server: any) {
  if (server.status === "banned") return "status-pill danger";
  if (server.status === "locked") return "status-pill warning";
  if (server.status === "approved") return "status-pill approved";
  if (server.status === "rejected") return "status-pill not-approved";
  return `status-pill ${server.status || "pending"}`;
}

function isPendingApplication(server: any) {
  const status = String(server.status || "pending").toLowerCase();

  if (server.approved) return false;

  return !["approved", "rejected", "locked", "banned"].includes(status);
}

function isRejectedApplication(server: any) {
  return String(server.status || "").toLowerCase() === "rejected";
}

function isAcceptedApplication(server: any) {
  return (
    Boolean(server.approved) ||
    String(server.status || "").toLowerCase() === "approved"
  );
}

function isManagedServer(server: any) {
  if (isPendingApplication(server)) return false;
  if (isRejectedApplication(server)) return false;
  return true;
}

function matchesServerSearch(server: any, query: string) {
  const search = query.trim().toLowerCase();

  if (!search) return true;

  const text = [
    server.server_name,
    server.description,
    server.category,
    server.language,
    server.country,
    server.id,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return text.includes(search);
}

function getHistoryStatus(server: any) {
  if (isAcceptedApplication(server)) return "accepted";
  if (isRejectedApplication(server)) return "rejected";
  return "";
}

function getHistoryLabel(server: any) {
  const status = getHistoryStatus(server);

  if (status === "accepted") return "Angenommen";
  if (status === "rejected") return "Abgelehnt";

  return "Unbekannt";
}

function getHistoryColor(server: any) {
  const status = getHistoryStatus(server);

  if (status === "accepted") {
    return {
      background: "rgba(34, 197, 94, 0.16)",
      border: "1px solid rgba(34, 197, 94, 0.34)",
      color: "#7CFFB2",
    };
  }

  if (status === "rejected") {
    return {
      background: "rgba(255, 61, 113, 0.16)",
      border: "1px solid rgba(255, 61, 113, 0.34)",
      color: "#FF8AAA",
    };
  }

  return {};
}

function getModeratorName(server: any) {
  return (
    server.moderation_by_username ||
    server.moderated_by_username ||
    server.moderated_by ||
    "Unbekannt"
  );
}

function DurationSelect({ defaultValue = "3" }: { defaultValue?: string }) {
  return (
    <label className="field">
      <span>Dauer</span>
      <select name="duration" defaultValue={defaultValue} required>
        {DURATION_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ReasonField({
  placeholder = "Grund eingeben...",
}: {
  placeholder?: string;
}) {
  return (
    <label className="field full">
      <span>Grund</span>
      <textarea
        name="reason"
        required
        minLength={5}
        maxLength={900}
        placeholder={placeholder}
        style={{ minHeight: "90px" }}
      />
    </label>
  );
}

function ServerActionForm({
  serverId,
  action,
  label,
  danger = false,
  primary = false,
  requireReason = false,
  showDuration = false,
  defaultDuration = "3",
  reasonPlaceholder,
}: {
  serverId: string;
  action: string;
  label: string;
  danger?: boolean;
  primary?: boolean;
  requireReason?: boolean;
  showDuration?: boolean;
  defaultDuration?: string;
  reasonPlaceholder?: string;
}) {
  let className = "admin-action-btn";

  if (danger) className += " danger";
  if (primary) className += " primary";

  if (!requireReason && !showDuration) {
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

  return (
    <details className="admin-action-details">
      <summary className={className}>{label}</summary>

      <form
        action="/api/admin/server-action"
        method="POST"
        className="admin-inline-form"
      >
        <input type="hidden" name="server_id" value={serverId} />
        <input type="hidden" name="action" value={action} />

        {showDuration && <DurationSelect defaultValue={defaultDuration} />}

        {requireReason && (
          <ReasonField
            placeholder={
              reasonPlaceholder || "Warum wird diese Aktion ausgeführt?"
            }
          />
        )}

        <button className={className} type="submit">
          Bestätigen
        </button>
      </form>
    </details>
  );
}

function ReportActionForm({
  reportType,
  reportId,
  serverId,
  reviewId,
  action,
  label,
  danger = false,
  primary = false,
  requireReason = false,
  showDuration = false,
  defaultDuration = "3",
  reasonPlaceholder,
}: {
  reportType: "server" | "review";
  reportId: string;
  serverId?: string;
  reviewId?: string;
  action: string;
  label: string;
  danger?: boolean;
  primary?: boolean;
  requireReason?: boolean;
  showDuration?: boolean;
  defaultDuration?: string;
  reasonPlaceholder?: string;
}) {
  let className = "admin-action-btn";

  if (danger) className += " danger";
  if (primary) className += " primary";

  if (!requireReason && !showDuration) {
    return (
      <form action="/api/admin/reports/action" method="POST">
        <input type="hidden" name="report_type" value={reportType} />
        <input type="hidden" name="report_id" value={reportId} />
        {serverId && <input type="hidden" name="server_id" value={serverId} />}
        {reviewId && <input type="hidden" name="review_id" value={reviewId} />}
        <input type="hidden" name="action" value={action} />
        <button className={className} type="submit">
          {label}
        </button>
      </form>
    );
  }

  return (
    <details className="admin-action-details">
      <summary className={className}>{label}</summary>

      <form
        action="/api/admin/reports/action"
        method="POST"
        className="admin-inline-form"
      >
        <input type="hidden" name="report_type" value={reportType} />
        <input type="hidden" name="report_id" value={reportId} />
        {serverId && <input type="hidden" name="server_id" value={serverId} />}
        {reviewId && <input type="hidden" name="review_id" value={reviewId} />}
        <input type="hidden" name="action" value={action} />

        {showDuration && <DurationSelect defaultValue={defaultDuration} />}

        {requireReason && (
          <ReasonField
            placeholder={
              reasonPlaceholder || "Warum wird diese Aktion ausgeführt?"
            }
          />
        )}

        <button className={className} type="submit">
          Bestätigen
        </button>
      </form>
    </details>
  );
}

function AdminSection({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <div className="section-title">
        <h2>{title}</h2>
        {meta && <span className="meta">{meta}</span>}
      </div>

      {children}
    </section>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const adminNotice = getAdminNotice(resolvedSearchParams);
  const adminSearch = getSearchValue(resolvedSearchParams, "admin_q");

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

  const canApprove = canApproveServers(staff.role);
  const canModerate = canModerateServers(staff.role);
  const isAdmin =
    staff.role === "admin" ||
    staff.role === "owner" ||
    staff.role === "administrator";

  const isOwner = canManageStaff(staff);

  let staffMembers: any[] = [];

  if (isOwner) {
    try {
      const staffMembersResponse = await supabaseRequest(
        "staff_members?select=*&order=created_at.desc"
      );

      staffMembers = Array.isArray(staffMembersResponse)
        ? staffMembersResponse
        : [];
    } catch (error) {
      console.error("Could not load staff members:", error);
    }
  }

  const serversResponse = await supabaseRequest(
    "servers?select=*&order=created_at.desc"
  );

  const servers: any[] = Array.isArray(serversResponse)
    ? serversResponse
    : [];

  let serverReports: any[] = [];
  let reviewReports: any[] = [];
  let reportedReviews: any[] = [];

  try {
    const serverReportsResponse = await supabaseRequest(
      "server_reports?select=*&order=created_at.desc"
    );

    serverReports = Array.isArray(serverReportsResponse)
      ? serverReportsResponse
      : [];
  } catch (error) {
    console.error("Could not load server reports:", error);
  }

  try {
    const reviewReportsResponse = await supabaseRequest(
      "review_reports?select=*&order=created_at.desc"
    );

    reviewReports = Array.isArray(reviewReportsResponse)
      ? reviewReportsResponse
      : [];
  } catch (error) {
    console.error("Could not load review reports:", error);
  }

  const reviewIds = Array.from(
    new Set(
      reviewReports.map((report: any) => report.review_id).filter(Boolean)
    )
  );

  if (reviewIds.length > 0) {
    try {
      const reportedReviewsResponse = await supabaseRequest(
        `reviews?id=in.(${reviewIds.join(",")})&select=*`
      );

      reportedReviews = Array.isArray(reportedReviewsResponse)
        ? reportedReviewsResponse
        : [];
    } catch (error) {
      console.error("Could not load reported reviews:", error);
    }
  }

  const serverById = new Map<string, any>(
    servers.map((server: any) => [String(server.id), server])
  );

  const reviewById = new Map<string, any>(
    reportedReviews.map((review: any) => [String(review.id), review])
  );

  const pendingApplications = servers.filter(isPendingApplication);

  const applicationHistory = servers
    .filter(
      (server: any) =>
        isAcceptedApplication(server) || isRejectedApplication(server)
    )
    .sort((a: any, b: any) => {
      const aTime = getTimeValue(
        a.moderated_at || a.moderation_created_at || a.created_at
      );
      const bTime = getTimeValue(
        b.moderated_at || b.moderation_created_at || b.created_at
      );
      return bTime - aTime;
    });

  const managedServers = servers
    .filter(isManagedServer)
    .filter((server: any) => matchesServerSearch(server, adminSearch));

  const openServerReports = serverReports.filter(
    (report: any) => (report.status || "open") === "open"
  );

  const openReviewReports = reviewReports.filter(
    (report: any) => (report.status || "open") === "open"
  );

  const activeBumpBans = servers.filter((server: any) => isBumpBanned(server));

  const activePremiumServers = servers.filter(
    (server: any) => server.premium_status
  );

  const activePartnerServers = servers.filter(
    (server: any) => server.partner_status
  );

  return (
    <main className="container profile-page">
      <style>{`
        .admin-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          margin-top: 18px;
        }

        .admin-stat-card {
          padding: 18px;
          border-radius: 20px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .admin-stat-card strong {
          display: block;
          font-size: 28px;
          line-height: 1;
          margin-bottom: 7px;
        }

        .admin-stat-card span {
          color: rgba(246,243,255,0.72);
          font-weight: 800;
          font-size: 13px;
        }

        .admin-action-details {
          display: inline-block;
        }

        .admin-action-details summary {
          list-style: none;
        }

        .admin-action-details summary::-webkit-details-marker {
          display: none;
        }

        .admin-inline-form {
          margin-top: 12px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.10);
          display: grid;
          gap: 12px;
          min-width: min(420px, 100%);
        }

        .admin-inline-form .field {
          margin: 0;
        }

        .admin-inline-form textarea,
        .admin-inline-form select {
          width: 100%;
        }

        .admin-section-tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .admin-section-tabs a {
          min-height: 38px;
          padding: 0 14px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          font-weight: 900;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .admin-warning-box {
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255,207,64,0.08);
          border: 1px solid rgba(255,207,64,0.22);
          color: rgba(246,243,255,0.84);
          line-height: 1.55;
        }

        .admin-search-form {
          display: grid;
          grid-template-columns: minmax(220px, 1fr) auto auto;
          gap: 12px;
          margin-bottom: 18px;
        }

        .admin-history-list {
          display: grid;
          gap: 12px;
        }

        .admin-history-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 16px;
          border-radius: 18px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .admin-history-item h3 {
          margin: 0 0 5px;
        }

        .admin-history-item p {
          margin: 0;
          color: rgba(246,243,255,0.72);
        }

        .admin-history-badge {
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 950;
          white-space: nowrap;
        }

        @media (max-width: 720px) {
          .admin-search-form {
            grid-template-columns: 1fr;
          }

          .admin-history-item {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <section className="profile-header-card">
        <span className="page-badge">
          {isAdmin ? "Admin Dashboard" : "Supporter Dashboard"}
        </span>

        <h1>Moderation Panel</h1>

        <p>
          Eingeloggt als <strong>{staff.username}</strong>. Rolle:{" "}
          <strong>{staff.role}</strong>
        </p>

        {!isAdmin && (
          <div className="admin-warning-box" style={{ marginTop: 16 }}>
            Supporter können Server-Bewerbungen annehmen oder ablehnen. Server
            bestrafen, bannen, sperren, Premium vergeben und Bump-Sperren dürfen
            nur Admins.
          </div>
        )}

        <div className="admin-dashboard-grid">
          <div className="admin-stat-card">
            <strong>{pendingApplications.length}</strong>
            <span>Offene Bewerbungen</span>
          </div>

          <div className="admin-stat-card">
            <strong>
              {openServerReports.length + openReviewReports.length}
            </strong>
            <span>Offene Meldungen</span>
          </div>

          <div className="admin-stat-card">
            <strong>{managedServers.length}</strong>
            <span>Admin Serverliste</span>
          </div>

          <div className="admin-stat-card">
            <strong>{activeBumpBans.length}</strong>
            <span>Aktive Bump-Sperren</span>
          </div>

          <div className="admin-stat-card">
            <strong>{activePremiumServers.length}</strong>
            <span>Premium aktiv</span>
          </div>

          <div className="admin-stat-card">
            <strong>{activePartnerServers.length}</strong>
            <span>Partner aktiv</span>
          </div>

          {isOwner && (
            <div className="admin-stat-card">
              <strong>{staffMembers.length}</strong>
              <span>Teammitglieder</span>
            </div>
          )}
        </div>

        <div className="admin-section-tabs">
          {isOwner && <a href="#team">Team</a>}
          <a href="#applications">Bewerbungen</a>
          <a href="#reports">Meldungen</a>
          <a href="#servers">Serverliste</a>
          <a href="#history">History</a>
        </div>
      </section>

      {adminNotice && (
        <section className="profile-card">
          <span className="page-badge">Info</span>
          <h3>{adminNotice}</h3>
        </section>
      )}

      {isOwner && (
        <AdminSection
          title="Team verwalten"
          meta={`${staffMembers.length} Mitglieder`}
        >
          <div id="team" />

          <div className="admin-warning-box">
            Nur du als Owner kannst Supporter und Admins setzen. Supporter dürfen
            Server-Bewerbungen annehmen oder ablehnen. Admins dürfen zusätzlich
            Server bestrafen, Premium vergeben, Partner setzen und Bump-Sperren
            verwalten.
          </div>

          <form
            action="/api/admin/staff"
            method="POST"
            className="admin-inline-form"
            style={{ marginTop: 16, maxWidth: 620 }}
          >
            <input type="hidden" name="action" value="save_staff" />

            <label className="field">
              <span>Discord Name</span>
              <input
                className="input"
                name="discord_username"
                placeholder="z. B. asko_pizza"
                required
              />
            </label>

            <label className="field">
              <span>Discord ID optional</span>
              <input
                className="input"
                name="discord_user_id"
                placeholder="z. B. 779668785216880683"
              />
            </label>

            <label className="field">
              <span>Rolle</span>
              <select name="role" defaultValue="supporter" required>
                <option value="supporter">Supporter</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <button className="admin-action-btn primary" type="submit">
              Speichern
            </button>
          </form>

          <div className="admin-history-list" style={{ marginTop: 20 }}>
            {staffMembers.length === 0 ? (
              <div className="card empty">
                <h3>Keine Teammitglieder eingetragen</h3>
                <p>Gespeicherte Supporter und Admins erscheinen hier.</p>
              </div>
            ) : (
              staffMembers.map((member: any) => (
                <div className="admin-history-item" key={member.id}>
                  <div>
                    <h3>{member.discord_username}</h3>
                    <p>
                      Discord ID: {member.discord_user_id || "Nicht gesetzt"} ·
                      Erstellt: {formatDate(member.created_at)}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      className="admin-history-badge"
                      style={{
                        background:
                          member.role === "owner"
                            ? "rgba(255, 207, 64, 0.14)"
                            : member.role === "admin"
                            ? "rgba(255, 61, 113, 0.14)"
                            : "rgba(34, 197, 94, 0.14)",
                        border:
                          member.role === "owner"
                            ? "1px solid rgba(255, 207, 64, 0.32)"
                            : member.role === "admin"
                            ? "1px solid rgba(255, 61, 113, 0.32)"
                            : "1px solid rgba(34, 197, 94, 0.32)",
                        color:
                          member.role === "owner"
                            ? "#ffe68a"
                            : member.role === "admin"
                            ? "#ff8aaa"
                            : "#7cffb2",
                      }}
                    >
                      {member.role}
                    </span>

                    {member.role !== "owner" && (
                      <form action="/api/admin/staff" method="POST">
                        <input
                          type="hidden"
                          name="action"
                          value="remove_staff"
                        />
                        <input
                          type="hidden"
                          name="staff_member_id"
                          value={member.id}
                        />
                        <button className="admin-action-btn danger" type="submit">
                          Entfernen
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </AdminSection>
      )}

      <AdminSection
        title="Server-Bewerbungen"
        meta={`${pendingApplications.length} offen`}
      >
        <div id="applications" />

        {pendingApplications.length === 0 ? (
          <div className="card empty">
            <h3>Keine offenen Bewerbungen</h3>
            <p>Neue Server-Bewerbungen erscheinen hier.</p>
          </div>
        ) : (
          <div className="admin-server-list">
            {pendingApplications.map((server: any) => (
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
                        <span className="status-pill pending">
                          Bewerbung offen
                        </span>
                      </div>
                    </div>

                    <p className="admin-description">{server.description}</p>

                    <div className="admin-meta-grid">
                      <span>Server-ID: {server.id}</span>
                      <span>NSFW: {server.nsfw ? "Ja" : "Nein"}</span>
                      <span>Eingereicht: {formatDate(server.created_at)}</span>
                      <span>Status: {server.status || "pending"}</span>
                    </div>

                    <div className="admin-link-row">
                      {server.invite_link && (
                        <a
                          className="admin-link-btn"
                          href={server.invite_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Discord Invite öffnen
                        </a>
                      )}
                    </div>

                    {canApprove ? (
                      <div className="admin-action-section">
                        <h4>Bewerbung entscheiden</h4>
                        <div className="admin-actions">
                          <ServerActionForm
                            serverId={String(server.id)}
                            action="approve"
                            label="Annehmen"
                            primary
                          />

                          <ServerActionForm
                            serverId={String(server.id)}
                            action="reject"
                            label="Ablehnen"
                            danger
                            requireReason
                            reasonPlaceholder="Warum wird die Bewerbung abgelehnt?"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="admin-warning-box">
                        Du hast keine Berechtigung, Bewerbungen zu entscheiden.
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </AdminSection>

      {canModerate && (
        <AdminSection
          title="Offene Meldungen"
          meta={`${openServerReports.length + openReviewReports.length} offen`}
        >
          <div id="reports" />

          {openServerReports.length === 0 && openReviewReports.length === 0 ? (
            <div className="card empty">
              <h3>Keine offenen Meldungen</h3>
              <p>Gemeldete Server und Bewertungen erscheinen hier.</p>
            </div>
          ) : (
            <div className="admin-server-list">
              {openServerReports.map((report: any) => {
                const server = serverById.get(String(report.server_id || ""));
                const status = report.status || "open";

                return (
                  <article className="admin-server-card" key={report.id}>
                    <div className="admin-server-main">
                      <div className="admin-avatar">!</div>

                      <div className="admin-server-content">
                        <div className="admin-server-heading">
                          <div>
                            <h3>Server-Meldung: {getServerName(server)}</h3>
                            <p>
                              Gemeldet von{" "}
                              <strong>
                                {report.reporter_username ||
                                  report.reporter_discord_user_id ||
                                  "Unbekannt"}
                              </strong>{" "}
                              • {formatDate(report.created_at)}
                            </p>
                          </div>

                          <div className="admin-status-group">
                            <span className={`status-pill ${status}`}>
                              {status}
                            </span>
                          </div>
                        </div>

                        <p className="admin-description">
                          <strong>Gemeldeter Grund:</strong>{" "}
                          {report.reason || "Kein Grund angegeben"}
                        </p>

                        {report.details && (
                          <p className="admin-description">
                            <strong>Details:</strong> {report.details}
                          </p>
                        )}

                        <div className="admin-link-row">
                          {server?.id && (
                            <a
                              className="admin-link-btn"
                              href={`/servers/${server.id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Server ansehen
                            </a>
                          )}

                          {server?.invite_link && (
                            <a
                              className="admin-link-btn"
                              href={server.invite_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Discord Invite öffnen
                            </a>
                          )}
                        </div>

                        {isAdmin ? (
                          <div className="admin-action-section">
                            <h4>Admin Entscheidung</h4>
                            <div className="admin-actions">
                              <ReportActionForm
                                reportType="server"
                                reportId={String(report.id)}
                                serverId={String(report.server_id || "")}
                                action="dismiss_server_report"
                                label="Ablehnen / Kein Problem"
                              />

                              <ReportActionForm
                                reportType="server"
                                reportId={String(report.id)}
                                serverId={String(report.server_id || "")}
                                action="mark_server_report_done"
                                label="Als erledigt markieren"
                                primary
                              />

                              {server?.id && (
                                <>
                                  <ReportActionForm
                                    reportType="server"
                                    reportId={String(report.id)}
                                    serverId={String(server.id)}
                                    action="lock_reported_server"
                                    label="Server sperren"
                                    danger
                                    requireReason
                                    showDuration
                                    defaultDuration="7"
                                    reasonPlaceholder="Warum wird der Server gesperrt?"
                                  />

                                  <ReportActionForm
                                    reportType="server"
                                    reportId={String(report.id)}
                                    serverId={String(server.id)}
                                    action="bump_ban_reported_server"
                                    label="Bump-Sperre verhängen"
                                    danger
                                    requireReason
                                    showDuration
                                    defaultDuration="3"
                                    reasonPlaceholder="Warum bekommt der Server eine Bump-Sperre?"
                                  />

                                  <ReportActionForm
                                    reportType="server"
                                    reportId={String(report.id)}
                                    serverId={String(server.id)}
                                    action="ban_reported_server"
                                    label="Server bannen"
                                    danger
                                    requireReason
                                    showDuration
                                    defaultDuration="30"
                                    reasonPlaceholder="Warum wird der Server gebannt?"
                                  />

                                  <ReportActionForm
                                    reportType="server"
                                    reportId={String(report.id)}
                                    serverId={String(server.id)}
                                    action="delete_reported_server"
                                    label="Server löschen"
                                    danger
                                    requireReason
                                    reasonPlaceholder="Warum wird der Server gelöscht?"
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="admin-warning-box">
                            Supporter können Meldungen sehen, aber keine Server
                            bestrafen. Strafen dürfen nur Admins.
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}

              {openReviewReports.map((report: any) => {
                const review = reviewById.get(String(report.review_id || ""));
                const server = serverById.get(String(report.server_id || ""));
                const status = report.status || "open";

                return (
                  <article className="admin-server-card" key={report.id}>
                    <div className="admin-server-main">
                      <div className="admin-avatar">★</div>

                      <div className="admin-server-content">
                        <div className="admin-server-heading">
                          <div>
                            <h3>
                              Bewertungs-Meldung: {getServerName(server)}
                            </h3>
                            <p>
                              Gemeldet von{" "}
                              <strong>
                                {report.reporter_username ||
                                  report.reporter_discord_user_id ||
                                  "Unbekannt"}
                              </strong>{" "}
                              • {formatDate(report.created_at)}
                            </p>
                          </div>

                          <div className="admin-status-group">
                            <span className={`status-pill ${status}`}>
                              {status}
                            </span>
                          </div>
                        </div>

                        <p className="admin-description">
                          <strong>Grund:</strong>{" "}
                          {report.reason || "Kein Grund angegeben"}
                        </p>

                        <div className="admin-meta-grid">
                          <span>Bewertung von: {getReviewAuthor(review)}</span>
                          <span>Sterne: {review?.rating ?? "?"}/5</span>
                          <span>Review-ID: {report.review_id}</span>
                          <span>Server-ID: {report.server_id}</span>
                        </div>

                        <p className="admin-description">
                          <strong>Bewertung:</strong> {getReviewText(review)}
                        </p>

                        <div className="admin-link-row">
                          {server?.id && (
                            <a
                              className="admin-link-btn"
                              href={`/servers/${server.id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Server ansehen
                            </a>
                          )}
                        </div>

                        {isAdmin ? (
                          <div className="admin-action-section">
                            <h4>Admin Entscheidung</h4>
                            <div className="admin-actions">
                              <ReportActionForm
                                reportType="review"
                                reportId={String(report.id)}
                                serverId={String(report.server_id || "")}
                                reviewId={String(report.review_id || "")}
                                action="dismiss_review_report"
                                label="Ablehnen / Kein Problem"
                              />

                              <ReportActionForm
                                reportType="review"
                                reportId={String(report.id)}
                                serverId={String(report.server_id || "")}
                                reviewId={String(report.review_id || "")}
                                action="hide_review"
                                label="Bewertung verstecken"
                                danger
                                requireReason
                                reasonPlaceholder="Warum wird die Bewertung versteckt?"
                              />

                              <ReportActionForm
                                reportType="review"
                                reportId={String(report.id)}
                                serverId={String(report.server_id || "")}
                                reviewId={String(report.review_id || "")}
                                action="delete_review"
                                label="Bewertung löschen"
                                danger
                                requireReason
                                reasonPlaceholder="Warum wird die Bewertung gelöscht?"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="admin-warning-box">
                            Supporter können Bewertungs-Meldungen sehen, aber
                            keine Bewertungen löschen oder verstecken.
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </AdminSection>
      )}

      <AdminSection
        title="Admin Serverliste"
        meta={`${managedServers.length} Server`}
      >
        <div id="servers" />

        <form className="admin-search-form" action="/admin">
          <input
            className="input"
            name="admin_q"
            defaultValue={adminSearch}
            placeholder="Server suchen..."
          />

          <button className="btn" type="submit">
            Suchen
          </button>

          {adminSearch && (
            <a className="btn secondary" href="/admin#servers">
              Zurücksetzen
            </a>
          )}
        </form>

        {managedServers.length === 0 ? (
          <div className="card empty">
            <h3>Keine Server gefunden</h3>
            <p>Für diese Suche gibt es keinen passenden Server.</p>
          </div>
        ) : (
          <div className="admin-server-list">
            {managedServers.map((server: any) => {
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
                          <span className={getStatusClass(server)}>
                            {getStatusLabel(server)}
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
                        <span>NSFW: {server.nsfw ? "Ja" : "Nein"}</span>
                        <span>
                          Bump-Sperre:{" "}
                          {bumpBanned
                            ? `bis ${formatDate(server.bump_banned_until)}`
                            : "Nein"}
                        </span>
                        <span>
                          Premium:{" "}
                          {server.premium_status
                            ? `bis ${formatDate(server.premium_until)}`
                            : "Nein"}
                        </span>
                        <span>
                          Partner:{" "}
                          {server.partner_status
                            ? `bis ${formatDate(server.partner_until)}`
                            : "Nein"}
                        </span>
                        {server.moderation_reason && (
                          <span>Grund: {server.moderation_reason}</span>
                        )}
                      </div>

                      <div className="admin-link-row">
                        {server.invite_link && (
                          <a
                            className="admin-link-btn"
                            href={server.invite_link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Discord Invite öffnen
                          </a>
                        )}

                        <a
                          className="admin-link-btn"
                          href={`/servers/${server.id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Server ansehen
                        </a>
                      </div>

                      {isAdmin ? (
                        <>
                          <div className="admin-action-section">
                            <h4>Bump Moderation</h4>
                            <div className="admin-actions">
                              <ServerActionForm
                                serverId={String(server.id)}
                                action="bump_ban"
                                label="Bump-Sperre verhängen"
                                danger
                                requireReason
                                showDuration
                                defaultDuration="3"
                                reasonPlaceholder="Warum bekommt der Server eine Bump-Sperre?"
                              />

                              <ServerActionForm
                                serverId={String(server.id)}
                                action="remove_bump_ban"
                                label="Bump-Sperre entfernen"
                                requireReason
                                reasonPlaceholder="Warum wird die Bump-Sperre entfernt?"
                              />
                            </div>
                          </div>

                          <div className="admin-action-section">
                            <h4>Premium & Partner</h4>
                            <div className="admin-actions">
                              <ServerActionForm
                                serverId={String(server.id)}
                                action="premium_30d"
                                label="Premium 1 Monat"
                                primary
                              />

                              <ServerActionForm
                                serverId={String(server.id)}
                                action="remove_premium"
                                label="Premium entfernen"
                                requireReason
                                reasonPlaceholder="Warum wird Premium entfernt?"
                              />

                              <ServerActionForm
                                serverId={String(server.id)}
                                action="partner_30d"
                                label="Partner 1 Monat"
                                primary
                              />

                              <ServerActionForm
                                serverId={String(server.id)}
                                action="remove_partner"
                                label="Partner entfernen"
                                requireReason
                                reasonPlaceholder="Warum wird Partner entfernt?"
                              />
                            </div>
                          </div>

                          <div className="admin-action-section admin-only-section">
                            <h4>Admin Aktionen</h4>
                            <div className="admin-actions">
                              <ServerActionForm
                                serverId={String(server.id)}
                                action="lock"
                                label="Server sperren"
                                danger
                                requireReason
                                showDuration
                                defaultDuration="7"
                                reasonPlaceholder="Warum wird der Server gesperrt?"
                              />

                              <ServerActionForm
                                serverId={String(server.id)}
                                action="unlock"
                                label="Server entsperren"
                                requireReason
                                reasonPlaceholder="Warum wird der Server entsperrt?"
                              />

                              <ServerActionForm
                                serverId={String(server.id)}
                                action="ban"
                                label="Server bannen"
                                danger
                                requireReason
                                showDuration
                                defaultDuration="30"
                                reasonPlaceholder="Warum wird der Server gebannt?"
                              />

                              <ServerActionForm
                                serverId={String(server.id)}
                                action="unban"
                                label="Server entbannen"
                                requireReason
                                reasonPlaceholder="Warum wird der Server entbannt?"
                              />

                              <ServerActionForm
                                serverId={String(server.id)}
                                action="delete"
                                label="Server löschen"
                                danger
                                requireReason
                                reasonPlaceholder="Warum wird der Server gelöscht?"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="admin-warning-box">
                          Supporter können diese Liste einsehen. Strafen,
                          Premium, Partner und Bump-Sperren sind nur für Admins.
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </AdminSection>

      <AdminSection
        title="Bewerbungs-History"
        meta={`${applicationHistory.length} Einträge`}
      >
        <div id="history" />

        {applicationHistory.length === 0 ? (
          <div className="card empty">
            <h3>Keine History vorhanden</h3>
            <p>Angenommene und abgelehnte Bewerbungen erscheinen hier.</p>
          </div>
        ) : (
          <div className="admin-history-list">
            {applicationHistory.slice(0, 40).map((server: any) => (
              <div className="admin-history-item" key={`history-${server.id}`}>
                <div>
                  <h3>{server.server_name}</h3>
                  <p>
                    {server.category} • {server.language} •{" "}
                    {formatDate(
                      server.moderated_at ||
                        server.moderation_created_at ||
                        server.created_at
                    )}
                  </p>

                  <p>
                    Bearbeitet von: <strong>{getModeratorName(server)}</strong>
                  </p>

                  {server.moderation_reason && (
                    <p>
                      Grund: <strong>{server.moderation_reason}</strong>
                    </p>
                  )}
                </div>

                <span
                  className="admin-history-badge"
                  style={getHistoryColor(server)}
                >
                  {getHistoryLabel(server)}
                </span>
              </div>
            ))}
          </div>
        )}
      </AdminSection>
    </main>
  );
}
