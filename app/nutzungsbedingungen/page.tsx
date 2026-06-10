import Link from "next/link";

const SUPPORT_EMAIL = "dcaskocafe@gmail.com";
const DISCORD_INVITE_URL = "https://discord.gg/askocafe";

export default function NutzungsbedingungenPage() {
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
            radial-gradient(circle at 100% 0%, rgba(255, 207, 64, 0.12), transparent 34%),
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
        <span className="legal-badge">📜 Regeln</span>
        <h1>Nutzungsbedingungen</h1>
        <p>
          Diese Nutzungsbedingungen regeln die Nutzung von Asko Cafe. Mit der
          Registrierung, Anmeldung, dem Einreichen eines Servers oder der weiteren
          Nutzung der Plattform akzeptierst du diese Bedingungen.
        </p>
      </section>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>1. Anbieter</h2>
          <p>
            Anbieter der Plattform Asko Cafe ist der im Impressum genannte
            Diensteanbieter.
          </p>

          <h2>2. Gegenstand der Plattform</h2>
          <p>
            Asko Cafe ist eine Plattform zur Darstellung, Suche, Eintragung,
            Verwaltung, Bewertung und Moderation von Discord-Servern. Nutzer
            können Server einreichen, Serverprofile ansehen, Bewertungen abgeben,
            Server melden und, sofern verfügbar, Premium- oder Partnerfunktionen
            nutzen.
          </p>

          <h2>3. Registrierung und Anmeldung</h2>
          <p>
            Bestimmte Funktionen setzen eine Anmeldung voraus, insbesondere über
            Discord. Mit der Anmeldung bestätigst du, dass die angegebenen Daten
            richtig sind und du dein Konto nicht missbräuchlich nutzt.
          </p>
          <p>
            Du bist dafür verantwortlich, dass dein Discord-Konto sicher bleibt.
            Wenn du den Verdacht hast, dass dein Konto missbraucht wurde, solltest
            du uns schnellstmöglich kontaktieren.
          </p>

          <h2>4. Einreichen von Servern</h2>
          <p>
            Wenn du einen Server einreichst, bestätigst du, dass du berechtigt
            bist, diesen Server auf Asko Cafe einzutragen, und dass die
            angegebenen Inhalte korrekt sind.
          </p>
          <ul>
            <li>Der Invite-Link muss funktionieren und darf nicht irreführend sein.</li>
            <li>Servername, Beschreibung, Tags, Banner und Logo müssen wahrheitsgemäß sein.</li>
            <li>NSFW- oder sensible Inhalte müssen korrekt gekennzeichnet werden.</li>
            <li>Du darfst keine fremden Rechte verletzen.</li>
            <li>Du darfst keine Inhalte eintragen, die gegen Gesetze oder Discord-Regeln verstoßen.</li>
          </ul>

          <h2>5. Freigabe und Moderation</h2>
          <p>
            Eingereichte Server können durch das Team geprüft, angenommen,
            abgelehnt, eingeschränkt, gesperrt, gebannt oder gelöscht werden.
            Ein Anspruch auf Aufnahme, Sichtbarkeit, Premium-Platzierung oder
            dauerhafte Veröffentlichung besteht nicht.
          </p>
          <p>
            Asko Cafe kann Maßnahmen ergreifen, wenn Inhalte gegen diese
            Bedingungen, gesetzliche Vorgaben, Discord-Regeln oder die Sicherheit
            der Plattform verstoßen.
          </p>

          <h2>6. Bewertungen und Meldungen</h2>
          <p>
            Bewertungen sollen ehrlich, sachlich und fair sein. Es ist verboten,
            Bewertungen zu manipulieren, Fake-Bewertungen abzugeben, andere
            Nutzer zu beleidigen oder Bewertungen für Spam, Werbung oder
            Schädigung anderer Server zu missbrauchen.
          </p>
          <p>
            Meldungen dürfen nur für echte Probleme genutzt werden. Missbräuchliche
            oder falsche Meldungen können zur Einschränkung deines Kontos führen.
          </p>

          <h2>7. Verbotene Inhalte und Handlungen</h2>
          <p>Untersagt sind insbesondere:</p>
          <ul>
            <li>rechtswidrige Inhalte,</li>
            <li>Hassrede, Drohungen, Beleidigungen oder Diskriminierung,</li>
            <li>extremistische, terroristische oder gewaltverherrlichende Inhalte,</li>
            <li>sexuelle Inhalte mit Minderjährigen oder sonstige illegale sexuelle Inhalte,</li>
            <li>Betrug, Phishing, Scam, Malware, Token-Grabber oder Schadsoftware,</li>
            <li>Spam, Fake-Server, irreführende Angaben oder manipulierte Bewertungen,</li>
            <li>Verletzung von Marken-, Urheber-, Namens- oder Persönlichkeitsrechten,</li>
            <li>Umgehung von Sperren, Banns, Bump-Sperren oder Sicherheitsmaßnahmen,</li>
            <li>automatisierte Nutzung, Scraping oder Angriffe auf die Plattform ohne Erlaubnis.</li>
          </ul>

          <h2>8. Bump-System</h2>
          <p>
            Das Bump-System dient dazu, aktive Server sichtbarer zu machen. Es
            darf nicht manipuliert, automatisiert missbraucht oder durch mehrere
            Konten unfair ausgenutzt werden. Bei Missbrauch können Bump-Sperren
            oder weitere Moderationsmaßnahmen verhängt werden.
          </p>

          <h2>9. Premium- und Partnerfunktionen</h2>
          <p>
            Premium- und Partnerfunktionen können zusätzliche Sichtbarkeit,
            Designoptionen, besondere Layouts, kürzere Bump-Zeiten oder
            Hervorhebungen bieten. Der genaue Leistungsumfang kann sich ändern,
            insbesondere solange Asko Cafe weiterentwickelt wird.
          </p>
          <p>
            Ein Premium- oder Partnerstatus berechtigt nicht dazu, gegen Regeln
            zu verstoßen. Auch Premium- und Partner-Server können moderiert,
            eingeschränkt oder entfernt werden.
          </p>

          <h2>10. Verfügbarkeit</h2>
          <p>
            Wir bemühen uns um einen stabilen Betrieb. Eine jederzeitige
            Verfügbarkeit der Website, Datenbank, Bot-Funktionen, Discord-API,
            Invite-Links oder Premium-Funktionen kann jedoch nicht garantiert
            werden.
          </p>

          <h2>11. Nutzerinhalte und Rechte</h2>
          <p>
            Du behältst grundsätzlich deine Rechte an deinen eigenen Inhalten.
            Du räumst Asko Cafe jedoch das Recht ein, die von dir eingereichten
            Inhalte auf der Plattform darzustellen, technisch zu verarbeiten, zu
            speichern, zu prüfen, zu moderieren und für die Serverdarstellung zu
            nutzen.
          </p>

          <h2>12. Löschung und Einschränkung</h2>
          <p>
            Du kannst die Löschung oder Änderung deiner Inhalte anfragen. Wir
            können Inhalte außerdem entfernen, wenn sie nicht mehr aktuell sind,
            gegen Regeln verstoßen, Rechte verletzen oder die Sicherheit der
            Plattform gefährden.
          </p>

          <h2>13. Haftung</h2>
          <p>
            Asko Cafe haftet nur nach den gesetzlichen Vorschriften. Für Inhalte
            von Nutzern und für externe Discord-Server sind grundsätzlich die
            jeweiligen Nutzer oder Serverbetreiber verantwortlich. Für externe
            Links übernehmen wir keine Verantwortung.
          </p>

          <h2>14. Änderungen der Plattform und Bedingungen</h2>
          <p>
            Asko Cafe befindet sich im Aufbau und kann Funktionen ändern,
            erweitern oder entfernen. Diese Nutzungsbedingungen können angepasst
            werden, wenn sich Funktionen, rechtliche Anforderungen oder Abläufe
            ändern. Es gilt die jeweils veröffentlichte Fassung.
          </p>

          <h2>15. Kontakt</h2>
          <p>
            Fragen, Beschwerden, Partnerschaften, Eventideen oder Hinweise auf
            Regelverstöße können über den Discord-Support oder per E-Mail
            eingereicht werden.
          </p>

          <p>
            <a
              className="legal-button"
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Discord-Support öffnen
            </a>{" "}
            <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
          </p>

          <h2>16. Anwendbares Recht</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland, soweit dem keine
            zwingenden Verbraucherschutzvorschriften entgegenstehen.
          </p>
        </article>

        <aside className="legal-side-card">
          <h2>Wichtig</h2>
          <p>
            Wer einen Server einträgt, Bewertungen schreibt oder Meldungen
            erstellt, muss sich an diese Regeln halten.
          </p>

          <div className="legal-link-list">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutzerklärung</Link>
            <Link href="/support">Support kontaktieren</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
