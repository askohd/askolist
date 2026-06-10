import Link from "next/link";

const OWNER_NAME = "Tim Buschmann";
const OWNER_STREET = "Schlosstraße 1";
const OWNER_CITY = "23701 Eutin";
const OWNER_COUNTRY = "Deutschland";
const SUPPORT_EMAIL = "dcaskocafe@gmail.com";
const DISCORD_INVITE_URL = "https://discord.gg/askocafe";

export default function ImpressumPage() {
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
            radial-gradient(circle at 0% 0%, rgba(181, 76, 255, 0.22), transparent 35%),
            radial-gradient(circle at 100% 0%, rgba(116, 223, 255, 0.14), transparent 34%),
            linear-gradient(135deg, rgba(18, 16, 42, 0.98), rgba(9, 10, 26, 0.98));
          border: 1px solid rgba(170, 120, 255, 0.22);
          box-shadow: 0 0 48px rgba(130, 85, 255, 0.14);
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
          max-width: 760px;
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

        .legal-card p,
        .legal-card li,
        .legal-side-card p {
          color: rgba(236, 240, 255, 0.78);
          line-height: 1.75;
        }

        .legal-card p {
          margin: 0 0 14px;
        }

        .legal-contact-box {
          margin: 16px 0 24px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(157, 234, 255, 0.06);
          border: 1px solid rgba(157, 234, 255, 0.16);
        }

        .legal-contact-box strong {
          color: #ffffff;
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

        @media (max-width: 900px) {
          .legal-grid {
            grid-template-columns: 1fr;
          }

          .legal-side-card {
            position: static;
          }
        }
      `}</style>

      <section className="legal-hero">
        <span className="legal-badge">📄 Impressum</span>
        <h1>Impressum</h1>
        <p>
          Angaben gemäß § 5 Digitale-Dienste-Gesetz für Asko Cafe. Diese Seite
          enthält die verantwortliche Kontaktstelle für die Website und die
          Plattform.
        </p>
      </section>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>Diensteanbieter</h2>

          <div className="legal-contact-box">
            <p>
              <strong>{OWNER_NAME}</strong>
              <br />
              {OWNER_STREET}
              <br />
              {OWNER_CITY}
              <br />
              {OWNER_COUNTRY}
            </p>
          </div>

          <h2>Kontakt</h2>
          <p>
            E-Mail:{" "}
            <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
          </p>

          <p>
            Discord-Support:{" "}
            <a
              className="legal-button"
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
            >
              discord.gg/askocafe
            </a>
          </p>

          <h2>Verantwortlich für eigene Inhalte</h2>
          <p>
            Verantwortlich für eigene Inhalte auf dieser Website ist der oben
            genannte Diensteanbieter. Asko Cafe stellt eine Plattform zur
            Eintragung, Darstellung, Suche, Bewertung und Moderation von
            Discord-Servern bereit.
          </p>

          <h2>Haftung für eigene Inhalte</h2>
          <p>
            Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt
            erstellt und gepflegt. Eine Gewähr für Richtigkeit, Vollständigkeit,
            Aktualität oder dauerhafte Verfügbarkeit einzelner Inhalte kann
            dennoch nicht übernommen werden.
          </p>

          <h2>Haftung für Nutzerinhalte</h2>
          <p>
            Auf Asko Cafe können Inhalte von Nutzern erscheinen, insbesondere
            Servernamen, Beschreibungen, Banner, Logos, Tags, Bewertungen,
            Meldungen und sonstige Angaben zu Discord-Servern. Für diese Inhalte
            ist grundsätzlich der jeweilige Nutzer beziehungsweise Serverbetreiber
            verantwortlich.
          </p>

          <p>
            Eine dauerhafte inhaltliche Vorabkontrolle aller Nutzerinhalte findet
            nicht statt. Bei konkreten Hinweisen auf rechtswidrige,
            missbräuchliche oder regelwidrige Inhalte werden diese geprüft und
            gegebenenfalls entfernt, gesperrt oder eingeschränkt.
          </p>

          <h2>Haftung für externe Links</h2>
          <p>
            Diese Website enthält Links zu externen Websites und Discord-Servern.
            Auf deren Inhalte hat Asko Cafe keinen unmittelbaren Einfluss. Für
            externe Inhalte ist der jeweilige Anbieter oder Betreiber
            verantwortlich. Externe Links werden bei Bekanntwerden konkreter
            Rechtsverletzungen geprüft und gegebenenfalls entfernt.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Eigene Inhalte, Texte, Grafiken, Logos, Designs und Strukturen von
            Asko Cafe unterliegen dem deutschen Urheberrecht, soweit sie
            urheberrechtlich geschützt sind. Inhalte Dritter werden als solche
            behandelt. Nutzer versichern, dass sie nur Inhalte hochladen oder
            eintragen, für die sie die notwendigen Rechte besitzen.
          </p>

          <h2>Hinweis zu Discord</h2>
          <p>
            Asko Cafe ist kein offizielles Produkt von Discord Inc. und steht
            nicht in Verbindung mit Discord Inc. Discord, Discord-Server,
            Discord-Invite-Links und Discord-Profile unterliegen den jeweiligen
            Regeln und Bedingungen von Discord.
          </p>

          <h2>Streitbeilegung</h2>
          <p>
            Asko Cafe ist nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </article>

        <aside className="legal-side-card">
          <h2>Rechtliches</h2>
          <p>Weitere wichtige Seiten von Asko Cafe.</p>

          <div className="legal-link-list">
            <Link href="/datenschutz">Datenschutzerklärung</Link>
            <Link href="/nutzungsbedingungen">Nutzungsbedingungen</Link>
            <Link href="/support">Support kontaktieren</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
