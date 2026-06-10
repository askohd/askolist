export default function DatenschutzPage() {
  return (
    <main className="container" style={{ paddingTop: 90, paddingBottom: 90 }}>
      <section className="profile-card">
        <span className="page-badge">Datenschutz</span>
        <h1>Datenschutzerklärung</h1>

        <p>
          Diese Datenschutzerklärung informiert darüber, welche personenbezogenen
          Daten auf Asko Cafe verarbeitet werden, zu welchen Zwecken dies geschieht
          und welche Rechte betroffene Personen haben.
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          TODO: Vollständiger Name / Firmenname
          <br />
          TODO: Anschrift
          <br />
          E-Mail: TODO: deine E-Mail-Adresse
        </p>

        <h2>2. Hosting</h2>
        <p>
          Diese Website wird über Vercel gehostet. Beim Aufruf der Website können
          technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs,
          Browserinformationen und aufgerufene Seiten verarbeitet werden, damit die
          Website ausgeliefert und sicher betrieben werden kann.
        </p>

        <h2>3. Datenbank und Speicherung</h2>
        <p>
          Für die Speicherung von Servereinträgen, Bewertungen, Meldungen,
          Moderationsdaten und Nutzerinformationen kann Supabase verwendet werden.
          Dabei können insbesondere Discord-Nutzerkennungen, Serverdaten,
          Serverbeschreibungen, Bewertungsdaten und Moderationsinformationen
          verarbeitet werden.
        </p>

        <h2>4. Discord Login und Discord-Daten</h2>
        <p>
          Wenn du dich mit Discord anmeldest, können Daten aus deinem Discord-Konto
          verarbeitet werden, zum Beispiel deine Discord-ID, dein Benutzername,
          dein Avatar und weitere Daten, die für Login, Serververwaltung und
          Moderation notwendig sind.
        </p>

        <h2>5. Eingetragene Discord-Server</h2>
        <p>
          Wenn du einen Discord-Server einträgst, speichern wir die von dir
          angegebenen Serverinformationen. Dazu gehören zum Beispiel Servername,
          Beschreibung, Kategorie, Sprache, Tags, NSFW-Angabe, Invite-Link,
          Banner, Premium-/Partner-Status und Bump-Informationen.
        </p>

        <h2>6. Bewertungen und Meldungen</h2>
        <p>
          Wenn du Bewertungen schreibst oder Inhalte meldest, speichern wir die
          dafür notwendigen Angaben. Dazu können deine Discord-ID, dein Nutzername,
          der gemeldete Server, der Meldegrund, Bewertungstexte und
          Moderationsentscheidungen gehören.
        </p>

        <h2>7. Cookies und lokale Speicherung</h2>
        <p>
          Asko Cafe kann technisch notwendige Cookies oder lokale Speicherung
          verwenden, zum Beispiel für Login-Sitzungen, Spracheinstellungen und
          Sicherheitsfunktionen. Werden später Analyse-, Marketing- oder Tracking-
          Dienste eingebaut, muss vorher eine entsprechende Einwilligung eingeholt
          werden.
        </p>

        <h2>8. Rechtsgrundlagen</h2>
        <p>
          Die Verarbeitung erfolgt je nach Funktion auf Grundlage von Art. 6 Abs. 1
          lit. b DSGVO, soweit die Verarbeitung zur Nutzung der Plattform notwendig
          ist, auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO bei berechtigten
          Interessen wie Sicherheit, Missbrauchsvermeidung und Moderation sowie auf
          Grundlage von Art. 6 Abs. 1 lit. a DSGVO, soweit eine Einwilligung
          erforderlich ist.
        </p>

        <h2>9. Speicherdauer</h2>
        <p>
          Personenbezogene Daten werden nur so lange gespeichert, wie dies für die
          jeweiligen Zwecke notwendig ist. Servereinträge, Bewertungen und
          Moderationsdaten können gespeichert bleiben, solange der Server auf der
          Plattform geführt wird oder dies zur Missbrauchsvermeidung erforderlich
          ist.
        </p>

        <h2>10. Deine Rechte</h2>
        <p>
          Du hast nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung,
          Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
          Widerspruch gegen bestimmte Verarbeitungen. Außerdem kannst du eine
          erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>

        <h2>11. Kontakt bei Datenschutzfragen</h2>
        <p>
          Bei Fragen zum Datenschutz kannst du dich an folgende Adresse wenden:
          <br />
          E-Mail: TODO: deine Datenschutz-Kontakt-E-Mail
        </p>
      </section>
    </main>
  );
}
