export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <section className="legal-card">
        <h1>Impressum</h1>

        <p className="legal-small">
          Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).
        </p>

        <h2>Diensteanbieter</h2>
        <p>
          <strong>[Dein vollständiger Name]</strong>
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ] [Ort]
          <br />
          Deutschland
        </p>

        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          Verantwortlich für eigene Inhalte auf dieser Website ist der oben
          genannte Diensteanbieter.
        </p>

        <h2>Projektbeschreibung</h2>
        <p>
          Asko Cafe ist eine Plattform zur Eintragung, Darstellung, Suche,
          Bewertung und Moderation von Discord-Servern. Nutzer können Server
          einreichen, Serverinformationen pflegen, Bewertungen abgeben, Inhalte
          melden und – sofern freigeschaltet – Premium- oder Partner-Funktionen
          nutzen.
        </p>

        <h2>Haftung für eigene Inhalte</h2>
        <p>
          Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt.
          Eine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der Inhalte
          wird jedoch nicht übernommen. Als Diensteanbieter bin ich für eigene
          Inhalte nach den allgemeinen gesetzlichen Vorschriften verantwortlich.
        </p>

        <h2>Haftung für fremde Inhalte und Nutzerinhalte</h2>
        <p>
          Auf Asko Cafe können Inhalte von Nutzern erscheinen, insbesondere
          Servernamen, Beschreibungen, Banner, Tags, Bewertungen, Meldungen und
          sonstige Angaben zu Discord-Servern. Für diese von Nutzern
          bereitgestellten Inhalte sind grundsätzlich die jeweiligen Nutzer oder
          Serverbetreiber verantwortlich.
        </p>
        <p>
          Eine dauerhafte inhaltliche Vorabkontrolle sämtlicher Nutzerinhalte
          findet nicht statt. Bei Bekanntwerden konkreter Rechtsverletzungen oder
          Regelverstöße werden die betreffenden Inhalte geprüft und, soweit
          erforderlich, entfernt, gesperrt oder anderweitig moderiert.
        </p>

        <h2>Haftung für externe Links</h2>
        <p>
          Diese Website enthält Links zu externen Websites und Discord-Servern.
          Auf deren Inhalte habe ich keinen unmittelbaren Einfluss. Für Inhalte,
          Regeln, Moderation, Verfügbarkeit und Rechtmäßigkeit externer Angebote
          sind ausschließlich die jeweiligen Betreiber verantwortlich. Bei
          Bekanntwerden konkreter Rechtsverletzungen werden entsprechende Links
          geprüft und gegebenenfalls entfernt.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Eigene Inhalte dieser Website unterliegen dem deutschen Urheberrecht.
          Beiträge Dritter werden als solche behandelt. Nutzer versichern, dass
          sie über die notwendigen Rechte an von ihnen hochgeladenen oder
          eingereichten Inhalten verfügen oder zur Nutzung berechtigt sind.
        </p>

        <h2>Hinweis zu Discord</h2>
        <p>
          Asko Cafe ist kein offizielles Angebot von Discord Inc. Discord,
          Discord-Server, Discord-Accounts und Discord-Invite-Links unterliegen
          den jeweiligen Bedingungen und Regeln von Discord.
        </p>

        <div className="legal-contact-box">
          <h2>Kontakt und Support</h2>
          <p>
            Bei rechtlichen Anfragen, Support-Fällen, Löschanfragen,
            Datenschutzfragen oder Meldungen erreichst du Asko Cafe über:
          </p>

          <p>
            E-Mail:{" "}
            <a href="mailto:dcaskocafe@gmail.com">dcaskocafe@gmail.com</a>
            <br />
            Discord-Ticketsystem:{" "}
            <a
              href="https://discord.gg/asko"
              target="_blank"
              rel="noreferrer"
            >
              https://discord.gg/asko
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
