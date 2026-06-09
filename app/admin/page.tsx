import { getCurrentStaff, canModerateServers } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

type PageSearchParams = Record<string, string | string[] | undefined>;

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

  if (getSearchValue(searchParams, "bump_ban_3d") === "1") {
    return "Bump-Sperre für 3 Tage wurde verhängt.";
  }

  if (getSearchValue(searchParams, "bump_ban_7d") === "1") {
    return "Bump-Sperre für 7 Tage wurde verhängt.";
  }

  if (getSearchValue(searchParams, "bump_ban_removed") === "1") {
    return "Bump-Sperre wurde entfernt.";
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

function formatDate(value: string | null) {
  if (!value) return "Not set";
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

function ReportActionForm({
  reportType,
  reportId,
  serverId,
  reviewId,
  action,
  label,
  danger = false,
  primary = false,
}: {
  reportType: "server" | "review";
  reportId: string;
  serverId?: string;
  reviewId?: string;
  action: string;
  label: string;
  danger?: boolean;
  primary?: boolean;
}) {
  let className = "admin-action-btn";

  if (danger) className += " danger";
  if (primary) className += " primary";

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

      {adminNotice && (
        <section className="profile-card">
          <span className="page-badge">Info</span>
          <h3>{adminNotice}</h3>
        </section>
      )}

      {canModerate && (
        <section className="section">
          <div className="section-title">
            <h2>Meldungen</h2>
            <span className="meta">
              {openServerReports.length + openReviewReports.length} offen
            </span>
          </div>

          {serverReports.length === 0 && reviewReports.length === 0 ? (
            <div className="card empty">
              <h3>Keine Meldungen</h3>
              <p>Gemeldete Server und Bewertungen erscheinen hier.</p>
            </div>
          ) : (
            <div className="admin-server-list">
              {serverReports.map((report: any) => {
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
                          <strong>Grund:</strong>{" "}
                          {report.reason || "Kein Grund angegeben"}
                        </p>

                        {report.details && (
                          <p className="admin-description">
                            <strong>Details:</strong> {report.details}
                          </p>
                        )}

                        {report.action_taken && (
                          <p className="admin-description">
                            <strong>Aktion:</strong> {report.action_taken}
                            {report.handled_by_username
                              ? ` von ${report.handled_by_username}`
                              : ""}
                            {report.handled_at
                              ? ` am ${formatDate(report.handled_at)}`
                              : ""}
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

                        {status === "open" && (
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
                                  />

                                  <ReportActionForm
                                    reportType="server"
                                    reportId={String(report.id)}
                                    serverId={String(server.id)}
                                    action="bump_ban_3d_reported_server"
                                    label="Bump-Sperre 3 Tage"
                                  />

                                  <ReportActionForm
                                    reportType="server"
                                    reportId={String(report.id)}
                                    serverId={String(server.id)}
                                    action="bump_ban_7d_reported_server"
                                    label="Bump-Sperre 7 Tage"
                                  />

                                  <ReportActionForm
                                    reportType="server"
                                    reportId={String(report.id)}
                                    serverId={String(server.id)}
                                    action="remove_bump_ban_reported_server"
                                    label="Bump-Sperre entfernen"
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
                                  />

                                  <ReportActionForm
                                    reportType="server"
                                    reportId={String(report.id)}
                                    serverId={String(server.id)}
                                    action="delete_reported_server"
                                    label="Server löschen"
                                    danger
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}

              {reviewReports.map((report: any) => {
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

                        {report.action_taken && (
                          <p className="admin-description">
                            <strong>Aktion:</strong> {report.action_taken}
                            {report.handled_by_username
                              ? ` von ${report.handled_by_username}`
                              : ""}
                            {report.handled_at
                              ? ` am ${formatDate(report.handled_at)}`
                              : ""}
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
                        </div>

                        {status === "open" && (
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
                                />
                              )}
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
      )}

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
                          rel="noreferrer"
                        >
                          Open Discord Invite
                        </a>
                      </div>

                      <div className="admin-action-section">
                        <h4>Review</h4>
                        <div className="admin-actions">
                          <ActionForm
                            serverId={String(server.id)}
                            action="approve"
                            label="Approve"
                            primary
                          />
                          <ActionForm
                            serverId={String(server.id)}
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
                            serverId={String(server.id)}
                            action="bump_ban_3d"
                            label="Bump Ban 3 Days"
                          />
                          <ActionForm
                            serverId={String(server.id)}
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
                              serverId={String(server.id)}
                              action="premium_7d"
                              label="Premium 7 Days"
                            />
                            <ActionForm
                              serverId={String(server.id)}
                              action="remove_premium"
                              label="Remove Premium"
                            />
                            <ActionForm
                              serverId={String(server.id)}
                              action="partner_7d"
                              label="Partner 7 Days"
                            />
                            <ActionForm
                              serverId={String(server.id)}
                              action="remove_partner"
                              label="Remove Partner"
                            />
                            <ActionForm
                              serverId={String(server.id)}
                              action="lock"
                              label="Lock"
                            />
                            <ActionForm
                              serverId={String(server.id)}
                              action="unlock"
                              label="Unlock"
                            />
                            <ActionForm
                              serverId={String(server.id)}
                              action="ban"
                              label="Ban"
                              danger
                            />
                            <ActionForm
                              serverId={String(server.id)}
                              action="unban"
                              label="Unban"
                            />
                            <ActionForm
                              serverId={String(server.id)}
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
