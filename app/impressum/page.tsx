export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <section className="legal-card">
        <h1>Impressum</h1>

        <p>
          Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
        </p>

        <h2>Diensteanbieter</h2>
        <p>
          <strong>[Vollständiger Name oder Unternehmensname]</strong>
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ] [Ort]
          <br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: [deine-e-mail@example.com]
          <br />
          Discord Support:{" "}
          <a
            href="https://discord.gg/askocafe"
            target="_blank"
            rel="noreferrer"
          >
            https://discord.gg/askocafe
          </a>
        </p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          <strong>[Vollständiger Name]</strong>
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ] [Ort]
        </p>

        <h2>Plattformbeschreibung</h2>
        <p>
          Asko Cafe ist eine Online-Plattform zur Darstellung, Verwaltung und
          Bewerbung von Discord-Servern. Nutzer können Server einreichen,
          Serverprofile aufrufen, Bewertungen abgeben, Meldungen senden und
          gegebenenfalls Zusatzfunktionen wie Premium- oder Partner-Features
          nutzen.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt.
          Dennoch wird keine Gewähr für die Richtigkeit, Vollständigkeit und
          Aktualität der bereitgestellten Inhalte übernommen. Als Diensteanbieter
          bin ich nach den allgemeinen Gesetzen für eigene Inhalte auf diesen
          Seiten verantwortlich. Ich bin jedoch nicht verpflichtet, übermittelte
          oder gespeicherte fremde Informationen dauerhaft zu überwachen oder nach
          Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Diese Website enthält Links zu externen Websites Dritter, auf deren
          Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden
          Inhalte keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten
          ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden derartige
          Links umgehend entfernt.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser
          Website unterliegen dem deutschen Urheberrecht. Beiträge Dritter werden
          als solche gekennzeichnet, soweit dies möglich ist. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechts bedürfen der vorherigen schriftlichen
          Zustimmung des jeweiligen Rechteinhabers.
        </p>

        <div className="legal-note">
          Bitte ersetze die Platzhalter unbedingt durch deine echten Daten. Ein
          Impressum mit falschen oder unvollständigen Angaben schützt dich nicht.
        </div>
      </section>
    </main>
  );
}
