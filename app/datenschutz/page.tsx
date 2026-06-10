import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <section className="legal-card">
        <h1>Datenschutzerklärung</h1>

        <p>
          Diese Datenschutzerklärung informiert darüber, welche personenbezogenen
          Daten bei der Nutzung von Asko Cafe verarbeitet werden, zu welchen
          Zwecken dies geschieht und welche Rechte betroffene Personen haben.
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist der
          Betreiber von Asko Cafe. Die vollständigen Anbieter- und Kontaktdaten
          findest du im <Link href="/impressum">Impressum</Link>.
        </p>

        <h2>2. Kontakt für Datenschutzfragen</h2>
        <p>
          Datenschutzanfragen, Auskunftsanfragen, Löschanfragen oder sonstige
          Anliegen können per E-Mail an{" "}
          <a href="mailto:dcaskocafe@gmail.com">dcaskocafe@gmail.com</a> oder
          über das Discord-Ticketsystem gestellt werden.
        </p>

        <h2>3. Allgemeine Datenverarbeitung</h2>
        <p>
          Personenbezogene Daten werden verarbeitet, soweit dies zur
          Bereitstellung der Website, zur Nutzung der Plattformfunktionen, zur
          Verwaltung von Discord-Servereinträgen, zur Durchführung von Login- und
          Sicherheitsfunktionen, zur Moderation, zur Bearbeitung von Meldungen
          oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.
        </p>

        <h2>4. Rechtsgrundlagen</h2>
        <p>
          Die Verarbeitung personenbezogener Daten erfolgt je nach Funktion auf
          Grundlage folgender Rechtsgrundlagen:
        </p>
        <ul>
          <li>Art. 6 Abs. 1 lit. a DSGVO – Einwilligung</li>
          <li>
            Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung oder vorvertragliche
            Maßnahmen
          </li>
          <li>
            Art. 6 Abs. 1 lit. c DSGVO – Erfüllung rechtlicher Verpflichtungen
          </li>
          <li>
            Art. 6 Abs. 1 lit. f DSGVO – berechtigte Interessen, insbesondere
            Sicherheit, Missbrauchsvermeidung, Moderation und stabiler Betrieb
          </li>
        </ul>

        <h2>5. Hosting und technische Zugriffsdaten</h2>
        <p>
          Beim Aufruf der Website werden technisch notwendige Daten verarbeitet,
          damit die Website ausgeliefert und sicher betrieben werden kann. Dazu
          können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
          Browserinformationen, Referrer, angeforderte Seiten, Systemdaten und
          Logdaten gehören.
        </p>

        <h2>6. Discord-Login und Nutzerkonto</h2>
        <p>
          Soweit eine Anmeldung über Discord angeboten wird, werden die von
          Discord bereitgestellten Daten verarbeitet, soweit dies für Login,
          Account-Zuordnung und Plattformfunktionen erforderlich ist. Dazu können
          Discord-ID, Benutzername, Avatar, öffentliche Profildaten und weitere
          für die Authentifizierung notwendige Daten gehören.
        </p>
        <p>
          Mit der Registrierung oder Anmeldung auf Asko Cafe akzeptiert der Nutzer
          die Nutzungsbedingungen in ihrer jeweils gültigen Fassung.
        </p>

        <h2>7. Servereinträge</h2>
        <p>
          Wenn ein Discord-Server eingetragen oder bearbeitet wird, können
          insbesondere folgende Daten verarbeitet werden:
        </p>
        <ul>
          <li>Servername</li>
          <li>Serverbeschreibung</li>
          <li>Kategorie, Sprache, Land und Tags</li>
          <li>Discord-Invite-Link</li>
          <li>Banner, Logo oder Serverbild</li>
          <li>NSFW-Angabe</li>
          <li>Premium- oder Partner-Status</li>
          <li>Bump-Zeitpunkte und Bump-Sperren</li>
          <li>Moderationsstatus, Gründe und Bearbeiter</li>
        </ul>

        <h2>8. Bewertungen, Kommentare und Meldungen</h2>
        <p>
          Nutzer können Bewertungen, Kommentare und Meldungen abgeben. Dabei
          können Discord-ID, Nutzername, Bewertung, Kommentartext, Meldegrund,
          gemeldeter Server, gemeldete Bewertung, Zeitstempel und
          Moderationsentscheidungen verarbeitet werden.
        </p>

        <h2>9. Moderation und Sicherheit</h2>
        <p>
          Zur Sicherheit der Plattform und zur Durchsetzung von Regeln können
          Inhalte geprüft, Server gesperrt, gebannt, entfernt, Bewertungen
          versteckt oder gelöscht und Bump-Sperren verhängt werden. Dabei werden
          Moderationsgründe, Zeitpunkte, Dauer und verantwortliche Staff-Accounts
          gespeichert.
        </p>

        <h2>10. Benachrichtigungen</h2>
        <p>
          Nutzer können Benachrichtigungen erhalten, etwa wenn ein Server
          angenommen, abgelehnt, gesperrt, gebannt, gelöscht, Premium aktiviert,
          Partner aktiviert oder eine Bewertung moderiert wurde.
        </p>

        <h2>11. Cookies, Local Storage und ähnliche Technologien</h2>
        <p>
          Asko Cafe kann technisch notwendige Cookies, Local Storage oder ähnliche
          Technologien verwenden, zum Beispiel für Login-Sitzungen,
          Spracheinstellungen, Sicherheitsfunktionen oder die Bereitstellung
          ausdrücklich gewünschter Funktionen.
        </p>
        <p>
          Soweit nicht notwendige Cookies oder vergleichbare Technologien
          eingesetzt werden, erfolgt dies nur auf Grundlage einer Einwilligung,
          sofern eine solche gesetzlich erforderlich ist.
        </p>

        <h2>12. Empfänger und technische Dienstleister</h2>
        <p>
          Zur Bereitstellung der Plattform können technische Dienstleister
          eingesetzt werden, insbesondere für Hosting, Datenbank,
          Authentifizierung, Speicherung, Sicherheit und Infrastruktur. Dazu
          können insbesondere Vercel, Supabase, Discord OAuth und NextAuth
          gehören, sofern diese Dienste tatsächlich eingesetzt werden.
        </p>

        <h2>13. Speicherdauer</h2>
        <p>
          Personenbezogene Daten werden nur so lange gespeichert, wie dies für die
          jeweiligen Zwecke erforderlich ist. Servereinträge, Bewertungen,
          Meldungen und Moderationsdaten können gespeichert bleiben, solange dies
          zur Plattformverwaltung, Missbrauchsvermeidung, Nachvollziehbarkeit von
          Moderationsentscheidungen oder zur Erfüllung gesetzlicher Pflichten
          erforderlich ist.
        </p>

        <h2>14. Rechte betroffener Personen</h2>
        <p>Betroffene Personen haben nach Maßgabe der DSGVO insbesondere:</p>
        <ul>
          <li>Recht auf Auskunft</li>
          <li>Recht auf Berichtigung</li>
          <li>Recht auf Löschung</li>
          <li>Recht auf Einschränkung der Verarbeitung</li>
          <li>Recht auf Datenübertragbarkeit</li>
          <li>Recht auf Widerspruch</li>
          <li>Recht auf Widerruf erteilter Einwilligungen</li>
          <li>Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde</li>
        </ul>

        <h2>15. Datensicherheit</h2>
        <p>
          Es werden angemessene technische und organisatorische Maßnahmen
          getroffen, um Daten vor Verlust, Missbrauch, unberechtigtem Zugriff,
          unbefugter Offenlegung und Veränderung zu schützen. Eine vollständig
          risikofreie Datenübertragung im Internet kann jedoch nicht garantiert
          werden.
        </p>

        <h2>16. Änderungen dieser Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung kann angepasst werden, wenn sich technische,
          rechtliche oder organisatorische Umstände ändern.
        </p>
      </section>
    </main>
  );
}
