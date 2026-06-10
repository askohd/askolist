import Link from "next/link";

const RESPONSIBLE_NAME = "Tim Buschmann";
const RESPONSIBLE_STREET = "Schlosstraße 1";
const RESPONSIBLE_CITY = "[PLZ] Eutin";
const RESPONSIBLE_COUNTRY = "Deutschland";
const SUPPORT_EMAIL = "dcaskocafe@gmail.com";
const DISCORD_INVITE_URL = "https://discord.gg/askocafe";

export default function DatenschutzPage() {
  return (
    <main className="legal-shell">
      <style>{`
        .legal-shell {
          width: min(1120px, calc(100% - 32px));
          margin: 0 auto;
          padding: 72px 0 90px;
        }

        .legal-hero {
          position: relative;
          overflow: hidden;
          padding: clamp(28px, 5vw, 54px);
          border-radius: 34px;
          background:
            radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.18), transparent 35%),
            radial-gradient(circle at 100% 0%, rgba(181, 76, 255, 0.18), transparent 34%),
            linear-gradient(135deg, rgba(18, 16, 42, 0.98), rgba(9, 10, 26, 0.98));
          border: 1px solid rgba(157, 234, 255, 0.18);
          box-shadow: 0 0 48px rgba(80, 190, 255, 0.10);
        }

        .legal-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          color: #9deaff;
          background: rgba(157, 234, 255, 0.08);
          border: 1px solid rgba(157, 234, 255, 0.20);
          font-weight: 950;
          font-size: 0.85rem;
        }

        .legal-hero h1 {
          margin: 22px 0 0;
          color: #ffffff;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          line-height: 0.92;
          letter-spacing: -0.07em;
        }

        .legal-hero p {
          max-width: 820px;
          margin: 20px 0 0;
          color: rgba(236, 240, 255, 0.76);
          line-height: 1.75;
          font-size: 1.05rem;
        }

        .legal-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 22px;
          align-items: start;
          margin-top: 24px;
        }

        .legal-card,
        .legal-side-card {
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)),
            rgba(12, 12, 30, 0.86);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow: 0 0 32px rgba(100, 80, 255, 0.08);
        }

        .legal-card {
          padding: clamp(22px, 4vw, 34px);
        }

        .legal-side-card {
          padding: 22px;
          position: sticky;
          top: 110px;
        }

        .legal-card h2,
        .legal-side-card h2 {
          margin: 0 0 12px;
          color: #ffffff;
          font-size: clamp(1.35rem, 3vw, 2rem);
          letter-spacing: -0.04em;
        }

        .legal-card h3 {
          margin: 24px 0 8px;
          color: #ffffff;
          font-size: 1.12rem;
        }

        .legal-card p,
        .legal-card li,
        .legal-side-card p {
          color: rgba(236, 240, 255, 0.78);
          line-height: 1.75;
        }

        .legal-card p {
          margin: 0 0 14px;
        }

        .legal-card ul {
          margin: 10px 0 18px;
          padding-left: 22px;
        }

        .data-table {
          overflow: hidden;
          margin: 18px 0 26px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.10);
        }

        .data-row {
          display: grid;
          grid-template-columns: 230px 1fr;
          gap: 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .data-row:last-child {
          border-bottom: 0;
        }

        .data-row strong {
          padding: 14px 16px;
          color: #ffffff;
          background: rgba(157, 234, 255, 0.06);
        }

        .data-row span {
          padding: 14px 16px;
          color: rgba(236, 240, 255, 0.78);
          line-height: 1.6;
        }

        .legal-contact-box {
          margin: 16px 0 24px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(157, 234, 255, 0.06);
          border: 1px solid rgba(157, 234, 255, 0.16);
        }

        .legal-link-list {
          display: grid;
          gap: 10px;
          margin-top: 14px;
        }

        .legal-link-list a,
        .legal-button {
          min-height: 42px;
          padding: 0 14px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          color: rgba(236, 240, 255, 0.82);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.10);
          font-weight: 850;
        }

        .legal-link-list a:hover,
        .legal-button:hover {
          color: #ffffff;
          border-color: rgba(157, 234, 255, 0.28);
        }

        .legal-note {
          margin-top: 22px;
          padding: 16px;
          border-radius: 18px;
          color: #ffe9a6;
          background: rgba(255, 207, 64, 0.08);
          border: 1px solid rgba(255, 207, 64, 0.20);
          line-height: 1.65;
        }

        @media (max-width: 900px) {
          .legal-grid {
            grid-template-columns: 1fr;
          }

          .legal-side-card {
            position: static;
          }

          .data-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="legal-hero">
        <span className="legal-badge">🔐 Datenschutz</span>
        <h1>Datenschutzerklärung</h1>
        <p>
          Hier erklären wir, welche personenbezogenen Daten auf Asko Cafe
          verarbeitet werden, warum sie verarbeitet werden, wo sie gespeichert
          werden können und welche Rechte Nutzer haben.
        </p>
      </section>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>1. Verantwortlicher</h2>

          <div className="legal-contact-box">
            <p>
              <strong>{RESPONSIBLE_NAME}</strong>
              <br />
              {RESPONSIBLE_STREET}
              <br />
              {RESPONSIBLE_CITY}
              <br />
              {RESPONSIBLE_COUNTRY}
            </p>
            <p>
              E-Mail:{" "}
              <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>

          <h2>2. Grundsatz</h2>
          <p>
            Wir verarbeiten personenbezogene Daten nur, soweit dies für den
            Betrieb von Asko Cafe, die Bereitstellung von Nutzerfunktionen, die
            Anmeldung über Discord, die Verwaltung von Servereinträgen, die
            Moderation, die Sicherheit der Plattform oder zur Erfüllung
            gesetzlicher Pflichten erforderlich ist.
          </p>

          <h2>3. Hosting und technische Bereitstellung</h2>
          <p>
            Beim Aufruf der Website werden technisch notwendige Daten
            verarbeitet, damit die Website ausgeliefert und geschützt werden
            kann. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des
            Zugriffs, Browsertyp, Betriebssystem, Referrer, aufgerufene Seiten,
            technische Fehlerdaten und Sicherheitsereignisse gehören.
          </p>
          <p>
            Diese Daten können durch den Hostinganbieter, CDN-Anbieter oder
            technische Dienstleister verarbeitet werden, damit die Website
            erreichbar, schnell und sicher bleibt.
          </p>

          <h2>4. Daten bei Discord-Login</h2>
          <p>
            Wenn du dich über Discord anmeldest, verarbeiten wir Daten, die zur
            Anmeldung und Kontozuordnung erforderlich sind.
          </p>

          <div className="data-table">
            <div className="data-row">
              <strong>Daten</strong>
              <span>
                Discord-ID, Discord-Username, Anzeigename, Avatar/Profilbild,
                gegebenenfalls E-Mail-Adresse, Session-ID, Login-Zeitpunkt.
              </span>
            </div>
            <div className="data-row">
              <strong>Zweck</strong>
              <span>
                Anmeldung, Wiedererkennung des Nutzers, Zuordnung von
                Servereinträgen, Moderationsentscheidungen, Missbrauchsschutz.
              </span>
            </div>
            <div className="data-row">
              <strong>Rechtsgrundlage</strong>
              <span>
                Art. 6 Abs. 1 lit. b DSGVO für Nutzerfunktionen und Art. 6 Abs.
                1 lit. f DSGVO für Sicherheit, Nachweis und Missbrauchsschutz.
              </span>
            </div>
          </div>

          <h2>5. Daten bei Servereinträgen</h2>
          <p>
            Wenn du einen Discord-Server einträgst, speichern und verarbeiten
            wir die Daten, die für die Darstellung, Prüfung und Verwaltung des
            Servereintrags notwendig sind.
          </p>

          <div className="data-table">
            <div className="data-row">
              <strong>Serverdaten</strong>
              <span>
                Servername, Beschreibung, Discord-Invite-Link, Kategorie,
                Sprache, Land, Tags, NSFW-Angabe, Banner, Logo, Premium-Design,
                Partner-/Premium-Status, Bump-Zeitpunkte, Erstellungs- und
                Änderungszeitpunkte.
              </span>
            </div>
            <div className="data-row">
              <strong>Nutzerdaten</strong>
              <span>
                Discord-ID und Discord-Username des Einreichers oder
                Serverbetreibers, soweit sie zur Zuordnung und Verwaltung
                notwendig sind.
              </span>
            </div>
            <div className="data-row">
              <strong>Moderationsdaten</strong>
              <span>
                Freigabe, Ablehnung, Sperren, Banns, Bump-Sperren, Gründe,
                Bearbeiter, Zeitpunkte und interne Prüfnotizen.
              </span>
            </div>
          </div>

          <h2>6. Bewertungen und Meldungen</h2>
          <p>
            Wenn Nutzer Bewertungen schreiben oder Inhalte melden, können wir
            folgende Daten speichern: Bewertung, Sterne, Kommentar, Meldungsgrund,
            Details, Serverbezug, Review-Bezug, Discord-ID, Discord-Username,
            Zeitpunkt und Bearbeitungsstatus.
          </p>
          <p>
            Diese Daten dienen dazu, Server transparenter zu machen, Missbrauch
            zu verhindern und gemeldete Inhalte prüfen zu können.
          </p>

          <h2>7. Premium, Partner und Shop</h2>
          <p>
            Wenn Premium-, Partner- oder Shop-Funktionen genutzt werden,
            verarbeiten wir Daten zur gebuchten Funktion, Laufzeit, Status,
            ausgewähltem Design, zugehörigem Server und gegebenenfalls zur
            Zahlungsabwicklung. Zahlungsdaten werden, sofern externe
            Zahlungsanbieter genutzt werden, grundsätzlich durch den jeweiligen
            Zahlungsdienstleister verarbeitet.
          </p>

          <h2>8. Bot- und Discord-API-Daten</h2>
          <p>
            Der Asko-Cafe-Bot kann technische Serverinformationen abrufen oder
            aktualisieren, soweit dies für die Plattformfunktionen erforderlich
            ist. Dazu können Server-ID, Servername, Icon, Invite-Status,
            Mitgliederanzahl, Online-Anzahl und Zeitpunkte der Aktualisierung
            gehören.
          </p>

          <h2>9. Cookies, lokale Speicherung und Sessions</h2>
          <p>
            Asko Cafe kann technisch notwendige Cookies oder ähnliche
            Speichertechniken verwenden, zum Beispiel für Login-Sessions,
            Spracheinstellungen, Sicherheitsfunktionen oder die
            Funktionsfähigkeit der Website. Nicht notwendige Cookies oder
            Tracking-Funktionen sollen nur eingesetzt werden, wenn eine
            entsprechende Einwilligung vorliegt.
          </p>

          <h2>10. Rechtsgrundlagen</h2>
          <ul>
            <li>
              Art. 6 Abs. 1 lit. b DSGVO: Vertragliche oder vorvertragliche
              Leistungen, zum Beispiel Login, Servereintrag, Profilverwaltung.
            </li>
            <li>
              Art. 6 Abs. 1 lit. f DSGVO: Berechtigtes Interesse am sicheren
              Betrieb, Missbrauchsschutz, Moderation, Nachweis und
              Plattformschutz.
            </li>
            <li>
              Art. 6 Abs. 1 lit. c DSGVO: Gesetzliche Pflichten, soweit solche
              bestehen.
            </li>
            <li>
              Art. 6 Abs. 1 lit. a DSGVO: Einwilligung, wenn freiwillige
              Funktionen oder nicht notwendige Cookies eingesetzt werden.
            </li>
          </ul>

          <h2>11. Speicherdauer</h2>
          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie sie für
            den jeweiligen Zweck benötigt werden. Account- und Serverdaten können
            bis zur Löschung des Accounts oder Servereintrags gespeichert
            bleiben. Moderations-, Sperr-, Melde- und Sicherheitsdaten können
            länger gespeichert werden, soweit dies zur Nachvollziehbarkeit, zum
            Schutz der Plattform, zur Abwehr von Missbrauch oder zur Erfüllung
            rechtlicher Pflichten erforderlich ist.
          </p>

          <h2>12. Empfänger und Dienstleister</h2>
          <p>
            Daten können durch technische Dienstleister verarbeitet werden, die
            für Betrieb, Hosting, Datenbank, Authentifizierung, E-Mail,
            Sicherheit, Deployment oder Zahlungsabwicklung eingesetzt werden.
            Dazu können insbesondere Hostinganbieter, Datenbankanbieter,
            Discord als Login- und Plattformanbieter sowie gegebenenfalls
            Zahlungsanbieter gehören.
          </p>

          <h2>13. Drittlandübermittlung</h2>
          <p>
            Bei der Nutzung von Discord, Hosting-, Cloud- oder Zahlungsdiensten
            kann eine Verarbeitung außerhalb der Europäischen Union nicht
            ausgeschlossen werden. Soweit erforderlich, soll die Verarbeitung auf
            geeignete Garantien, Standardvertragsklauseln oder andere zulässige
            Mechanismen nach der DSGVO gestützt werden.
          </p>

          <h2>14. Rechte der betroffenen Personen</h2>
          <p>Du hast nach Maßgabe der DSGVO insbesondere folgende Rechte:</p>
          <ul>
            <li>Auskunft über gespeicherte personenbezogene Daten,</li>
            <li>Berichtigung unrichtiger Daten,</li>
            <li>Löschung personenbezogener Daten,</li>
            <li>Einschränkung der Verarbeitung,</li>
            <li>Datenübertragbarkeit,</li>
            <li>Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen,</li>
            <li>Widerruf erteilter Einwilligungen für die Zukunft.</li>
          </ul>

          <h2>15. Beschwerderecht</h2>
          <p>
            Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde zu
            beschweren, wenn du der Ansicht bist, dass die Verarbeitung deiner
            personenbezogenen Daten gegen Datenschutzrecht verstößt.
          </p>

          <h2>16. Sicherheit</h2>
          <p>
            Wir treffen technische und organisatorische Maßnahmen, um die
            Plattform und gespeicherte Daten vor Missbrauch, unbefugtem Zugriff,
            Verlust oder Manipulation zu schützen. Ein vollständiger Schutz bei
            Datenübertragung im Internet kann jedoch nicht garantiert werden.
          </p>

          <h2>17. Änderung dieser Datenschutzerklärung</h2>
          <p>
            Diese Datenschutzerklärung kann angepasst werden, wenn sich
            Funktionen, Dienstleister, Rechtslage oder technische Abläufe ändern.
            Es gilt die jeweils auf der Website veröffentlichte Fassung.
          </p>

          <div className="legal-note">
            Diese Datenschutzerklärung ist umfangreicher als vorher. Prüfe später
            noch genau, welche Dienstleister du wirklich nutzt, zum Beispiel
            Vercel, Supabase, Discord OAuth, E-Mail und Zahlungsanbieter.
          </div>
        </article>

        <aside className="legal-side-card">
          <h2>Kontakt</h2>
          <p>
            Datenschutzanfragen kannst du per E-Mail oder über den Discord-Support
            stellen.
          </p>

          <div className="legal-link-list">
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            <a href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
              Discord-Support
            </a>
            <Link href="/impressum">Impressum</Link>
            <Link href="/nutzungsbedingungen">Nutzungsbedingungen</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
