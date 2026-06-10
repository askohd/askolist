import { getCurrentStaff, canModerateServers } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

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
  return `status-pill ${server.status || "pending"}`;
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
  children: React.ReactNode;
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

  const canModerate = canModerateServers(staff.role);
  const isAdmin = staff.role === "admin";

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

        <div className="admin-dashboard-grid">
          <div className="admin-stat-card">
            <strong>{openServerReports.length + openReviewReports.length}</strong>
            <span>Offene Meldungen</span>
          </div>

          <div className="admin-stat-card">
            <strong>{servers.length}</strong>
            <span>Server insgesamt</span>
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
        </div>

        <div className="admin-section-tabs">
          <a href="#reports">Meldungen</a>
          <a href="#servers">Server Moderation</a>
          <a href="#premium">Premium & Partner</a>
          <a href="#bump">Bump-Sperren</a>
        </div>
      </section>

      {adminNotice && (
        <section className="profile-card">
          <span className="page-badge">Info</span>
          <h3>{adminNotice}</h3>
        </section>
      )}

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

                        <div className="admin-warning-box">
                          Bei Server-Sperre, Ban oder Bump-Sperre ist ein Grund
                          Pflicht. Der Server-Besitzer soll danach automatisch eine
                          Nachricht erhalten.
                        </div>

                        <div className="admin-action-section">
                          <h4>Entscheidung</h4>
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
                              </>
                            )}

                            {isAdmin && server?.id && (
                              <>
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

                        <div className="admin-action-section">
                          <h4>Entscheidung</h4>
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

                            {isAdmin && (
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
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </AdminSection>
      )}

      <AdminSection title="Server Moderation" meta={`${servers.length} Server`}>
        <div id="servers" />

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
                        <span>NSFW: {server.nsfw ? "Yes" : "No"}</span>
                        <span>
                          Bump ban:{" "}
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

                      <div className="admin-action-section">
                        <h4>Review</h4>
                        <div className="admin-actions">
                          <ServerActionForm
                            serverId={String(server.id)}
                            action="approve"
                            label="Approve"
                            primary
                          />

                          <ServerActionForm
                            serverId={String(server.id)}
                            action="reject"
                            label="Reject"
                            danger
                            requireReason
                            reasonPlaceholder="Warum wird der Server abgelehnt?"
                          />
                        </div>
                      </div>

                      <div className="admin-action-section" id="bump">
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

                      {isAdmin && (
                        <>
                          <div className="admin-action-section" id="premium">
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
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </AdminSection>
    </main>
  );
}
