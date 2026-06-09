"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

const DISCORD_URL = "https://discord.gg/askocafe";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const SHOP_TEXT = {
  de: {
    badge: "Shop",
    title: "Asko Cafe Shop",
    subtitle:
      "Hier findest du Premium-Funktionen für deinen Discord Server. Der Shop ist noch im Aufbau.",
    productBadge: "Premium",
    statusBadge: "Noch nicht verfügbar",
    productTitle: "Premium Server Paket – 1 Monat",
    productText:
      "Mach deinen Discord Server sichtbarer: Premium gibt dir ein besonderes Design, Startseiten-Anzeige und bessere Bump-Vorteile für 1 Monat.",
    includedTitle: "Was enthalten ist",
    included1: "Hervorgehobene Anzeige auf der Startseite",
    included2: "Premium-Markierung auf deinem Serverprofil",
    included3: "Eigene Premium-Layouts für deine Serverkarte",
    included4: "Eigene Farben für Servername, Text und Glow",
    included5: "Besser sichtbare Serverkarte in der Serverliste",
    included6: "Bump alle 2 Stunden statt alle 4 Stunden",
    included7: "Gültig für 1 Monat nach Aktivierung",
    priceLabel: "Preis",
    priceValue: "Kommt bald",
    unavailableTitle: "Der Shop ist noch nicht verfügbar",
    unavailableText:
      "Käufe sind aktuell noch deaktiviert. Bei Fragen zu Premium, Partner, Startseiten-Anzeige oder Bump-Vorteilen melde dich bitte auf unserem Discord im Support.",
    comingSoon: "Coming soon",
    supportButton: "Support auf Discord öffnen",
    backServers: "Zur Serverliste",
    noteTitle: "Hinweis",
    noteText:
      "Sobald der Shop aktiviert wird, kannst du Premium direkt hier auswählen und für deinen Server 1 Monat lang nutzen.",
  },

  en: {
    badge: "Shop",
    title: "Asko Cafe Shop",
    subtitle:
      "Here you will find premium features for your Discord server. The shop is still being built.",
    productBadge: "Premium",
    statusBadge: "Not available yet",
    productTitle: "Premium Server Package – 1 Month",
    productText:
      "Make your Discord server more visible: Premium gives you a special design, homepage placement and better bump benefits for 1 month.",
    includedTitle: "What is included",
    included1: "Highlighted placement on the homepage",
    included2: "Premium badge on your server profile",
    included3: "Custom premium layouts for your server card",
    included4: "Custom colors for server name, text and glow",
    included5: "More visible server card in the server list",
    included6: "Bump every 2 hours instead of every 4 hours",
    included7: "Valid for 1 month after activation",
    priceLabel: "Price",
    priceValue: "Coming soon",
    unavailableTitle: "The shop is not available yet",
    unavailableText:
      "Purchases are currently disabled. For questions about Premium, Partner, homepage placement or bump benefits, please contact us on Discord support.",
    comingSoon: "Coming soon",
    supportButton: "Open Discord support",
    backServers: "Back to server list",
    noteTitle: "Note",
    noteText:
      "Once the shop is activated, you will be able to select Premium directly here and use it for your server for 1 month.",
  },

  fr: {
    badge: "Shop",
    title: "Boutique Asko Cafe",
    subtitle:
      "Ici, tu trouveras des fonctions premium pour ton serveur Discord. La boutique est encore en construction.",
    productBadge: "Premium",
    statusBadge: "Pas encore disponible",
    productTitle: "Pack serveur Premium – 1 mois",
    productText:
      "Rends ton serveur Discord plus visible : Premium offre un design spécial, une mise en avant sur la page d’accueil et de meilleurs avantages de bump pendant 1 mois.",
    includedTitle: "Ce qui est inclus",
    included1: "Mise en avant sur la page d’accueil",
    included2: "Badge Premium sur le profil de ton serveur",
    included3: "Layouts premium personnalisés pour ta carte serveur",
    included4: "Couleurs personnalisées pour le nom, le texte et le glow",
    included5: "Carte serveur plus visible dans la liste des serveurs",
    included6: "Bump toutes les 2 heures au lieu de 4 heures",
    included7: "Valable 1 mois après activation",
    priceLabel: "Prix",
    priceValue: "Bientôt disponible",
    unavailableTitle: "La boutique n’est pas encore disponible",
    unavailableText:
      "Les achats sont actuellement désactivés. Pour toute question sur Premium, Partenaire, la mise en avant ou les avantages de bump, contacte-nous sur le support Discord.",
    comingSoon: "Bientôt",
    supportButton: "Ouvrir le support Discord",
    backServers: "Retour à la liste des serveurs",
    noteTitle: "Remarque",
    noteText:
      "Dès que la boutique sera activée, tu pourras choisir Premium directement ici et l’utiliser pour ton serveur pendant 1 mois.",
  },

  it: {
    badge: "Shop",
    title: "Shop Asko Cafe",
    subtitle:
      "Qui trovi funzioni premium per il tuo server Discord. Lo shop è ancora in sviluppo.",
    productBadge: "Premium",
    statusBadge: "Non ancora disponibile",
    productTitle: "Pacchetto server Premium – 1 mese",
    productText:
      "Rendi il tuo server Discord più visibile: Premium offre design speciale, posizione in homepage e vantaggi bump migliori per 1 mese.",
    includedTitle: "Cosa include",
    included1: "Posizionamento evidenziato in homepage",
    included2: "Badge Premium sul profilo del server",
    included3: "Layout premium personalizzati per la card del server",
    included4: "Colori personalizzati per nome server, testo e glow",
    included5: "Card server più visibile nella lista server",
    included6: "Bump ogni 2 ore invece di ogni 4 ore",
    included7: "Valido per 1 mese dopo l’attivazione",
    priceLabel: "Prezzo",
    priceValue: "Prossimamente",
    unavailableTitle: "Lo shop non è ancora disponibile",
    unavailableText:
      "Gli acquisti sono attualmente disattivati. Per domande su Premium, Partner, homepage o vantaggi bump, contattaci nel supporto Discord.",
    comingSoon: "Coming soon",
    supportButton: "Apri supporto Discord",
    backServers: "Torna alla lista server",
    noteTitle: "Nota",
    noteText:
      "Quando lo shop sarà attivo, potrai scegliere Premium direttamente qui e usarlo per il tuo server per 1 mese.",
  },

  pl: {
    badge: "Sklep",
    title: "Sklep Asko Cafe",
    subtitle:
      "Tutaj znajdziesz funkcje premium dla swojego serwera Discord. Sklep jest jeszcze w budowie.",
    productBadge: "Premium",
    statusBadge: "Jeszcze niedostępne",
    productTitle: "Pakiet serwera Premium – 1 miesiąc",
    productText:
      "Zwiększ widoczność swojego serwera Discord: Premium daje specjalny design, wyróżnienie na stronie głównej i lepsze korzyści z bumpowania przez 1 miesiąc.",
    includedTitle: "Co zawiera",
    included1: "Wyróżnienie na stronie głównej",
    included2: "Odznaka Premium na profilu serwera",
    included3: "Własne layouty premium dla karty serwera",
    included4: "Własne kolory nazwy serwera, tekstu i glow",
    included5: "Bardziej widoczna karta serwera na liście",
    included6: "Bump co 2 godziny zamiast co 4 godziny",
    included7: "Ważne przez 1 miesiąc po aktywacji",
    priceLabel: "Cena",
    priceValue: "Wkrótce",
    unavailableTitle: "Sklep nie jest jeszcze dostępny",
    unavailableText:
      "Zakupy są obecnie wyłączone. W sprawie pytań o Premium, Partner, wyróżnienie na stronie głównej lub korzyści z bumpowania skontaktuj się z nami na Discordzie w support.",
    comingSoon: "Wkrótce",
    supportButton: "Otwórz support Discord",
    backServers: "Powrót do listy serwerów",
    noteTitle: "Informacja",
    noteText:
      "Gdy sklep zostanie aktywowany, będzie można wybrać Premium bezpośrednio tutaj i używać go dla swojego serwera przez 1 miesiąc.",
  },
} as const;

function tx(language: UiLanguage, key: keyof typeof SHOP_TEXT.de) {
  return SHOP_TEXT[language]?.[key] || SHOP_TEXT.de[key];
}

export default function ShopPage() {
  const language = useLanguage() as UiLanguage;

  const includedItems = [
    tx(language, "included1"),
    tx(language, "included2"),
    tx(language, "included3"),
    tx(language, "included4"),
    tx(language, "included5"),
    tx(language, "included6"),
    tx(language, "included7"),
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "86px 24px 96px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at 0% 20%, rgba(137,32,191,0.38), transparent 34%), radial-gradient(circle at 100% 16%, rgba(56,151,202,0.30), transparent 34%), linear-gradient(135deg, #07000f 0%, #11051f 48%, #10243d 100%)",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
            alignItems: "flex-start",
            flexWrap: "wrap",
            marginBottom: "34px",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "999px",
                background:
                  "linear-gradient(180deg, rgba(29,45,91,0.82), rgba(16,14,52,0.9))",
                border: "1px solid rgba(112,219,255,0.42)",
                color: "#9deaff",
                fontSize: "13px",
                fontWeight: 950,
                boxShadow:
                  "0 0 24px rgba(92,211,255,0.18), 0 0 42px rgba(192,91,255,0.12)",
              }}
            >
              🛒 {tx(language, "badge")}
            </span>

            <h1
              style={{
                margin: "22px 0 0",
                fontSize: "clamp(42px, 5vw, 70px)",
                lineHeight: 1,
                letterSpacing: "-0.055em",
                fontWeight: 950,
              }}
            >
              {tx(language, "title")}
            </h1>

            <p
              style={{
                maxWidth: "680px",
                margin: "18px 0 0",
                color: "rgba(246,243,255,0.80)",
                fontSize: "17px",
                lineHeight: 1.7,
              }}
            >
              {tx(language, "subtitle")}
            </p>
          </div>

          <div
            style={{
              minHeight: "48px",
              padding: "0 18px",
              borderRadius: "999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#ffffff",
              fontWeight: 900,
            }}
          >
            <span style={{ color: "#ffe68a" }}>👑</span>
            {tx(language, "productTitle")}
          </div>
        </div>

        <article
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "34px",
            background:
              "radial-gradient(circle at 0% 0%, rgba(255,207,64,0.16), transparent 30%), radial-gradient(circle at 100% 0%, rgba(116,223,255,0.16), transparent 32%), linear-gradient(180deg, rgba(20,17,39,0.96), rgba(12,10,28,0.96))",
            border: "1px solid rgba(202,115,255,0.24)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.035) inset, 0 0 38px rgba(139,92,246,0.18), 0 0 70px rgba(116,223,255,0.10)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              opacity: 0.16,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "34px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(320px, 0.8fr)",
              gap: "28px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "22px",
                }}
              >
                <span
                  style={{
                    minHeight: "34px",
                    padding: "0 14px",
                    borderRadius: "999px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    color: "#ffe68a",
                    fontSize: "13px",
                    fontWeight: 950,
                    background: "rgba(255,207,64,0.12)",
                    border: "1px solid rgba(255,207,64,0.34)",
                  }}
                >
                  👑 {tx(language, "productBadge")}
                </span>

                <span
                  style={{
                    minHeight: "34px",
                    padding: "0 14px",
                    borderRadius: "999px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    color: "#ffb4d8",
                    fontSize: "13px",
                    fontWeight: 950,
                    background: "rgba(255,88,160,0.10)",
                    border: "1px solid rgba(255,88,160,0.26)",
                  }}
                >
                  ⏳ {tx(language, "statusBadge")}
                </span>
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(30px, 4vw, 52px)",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  fontWeight: 950,
                }}
              >
                {tx(language, "productTitle")}
              </h2>

              <p
                style={{
                  margin: "18px 0 0",
                  maxWidth: "720px",
                  color: "rgba(246,243,255,0.84)",
                  fontSize: "17px",
                  lineHeight: 1.7,
                  fontWeight: 750,
                }}
              >
                {tx(language, "productText")}
              </p>

              <div
                style={{
                  marginTop: "28px",
                  padding: "22px",
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 16px",
                    fontSize: "24px",
                    fontWeight: 950,
                    letterSpacing: "-0.035em",
                  }}
                >
                  {tx(language, "includedTitle")}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gap: "12px",
                  }}
                >
                  {includedItems.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "13px 14px",
                        borderRadius: "18px",
                        background: "rgba(255,255,255,0.055)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(246,243,255,0.88)",
                        fontWeight: 850,
                      }}
                    >
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "999px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            "linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%)",
                          color: "#ffffff",
                          fontSize: "13px",
                          flex: "0 0 auto",
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside
              style={{
                padding: "24px",
                borderRadius: "28px",
                background:
                  "linear-gradient(180deg, rgba(44,35,78,0.76), rgba(23,20,48,0.90))",
                border: "1px solid rgba(116,223,255,0.18)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.035) inset, 0 0 30px rgba(116,223,255,0.10)",
                alignSelf: "start",
              }}
            >
              <div
                style={{
                  width: "74px",
                  height: "74px",
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #67e8f9 100%)",
                  boxShadow: "0 0 34px rgba(217,70,239,0.22)",
                  fontSize: "34px",
                  marginBottom: "20px",
                }}
              >
                👑
              </div>

              <span
                style={{
                  display: "block",
                  color: "rgba(246,243,255,0.62)",
                  fontSize: "13px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                {tx(language, "priceLabel")}
              </span>

              <strong
                style={{
                  display: "block",
                  fontSize: "36px",
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: "-0.04em",
                  marginBottom: "22px",
                }}
              >
                {tx(language, "priceValue")}
              </strong>

              <button
                type="button"
                disabled
                style={{
                  minHeight: "52px",
                  width: "100%",
                  border: 0,
                  borderRadius: "17px",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 950,
                  background:
                    "linear-gradient(90deg, #d14cff 0%, #f35ad6 45%, #74dfff 100%)",
                  opacity: 0.64,
                  cursor: "not-allowed",
                  boxShadow:
                    "0 0 25px rgba(208,85,255,0.24), 0 0 28px rgba(112,221,255,0.14)",
                }}
              >
                {tx(language, "comingSoon")}
              </button>

              <div
                style={{
                  marginTop: "18px",
                  padding: "16px",
                  borderRadius: "20px",
                  background: "rgba(255,207,64,0.08)",
                  border: "1px solid rgba(255,207,64,0.20)",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "#ffe68a",
                    marginBottom: "7px",
                  }}
                >
                  {tx(language, "noteTitle")}
                </strong>

                <p
                  style={{
                    margin: 0,
                    color: "rgba(246,243,255,0.76)",
                    lineHeight: 1.55,
                    fontSize: "14px",
                  }}
                >
                  {tx(language, "noteText")}
                </p>
              </div>
            </aside>
          </div>
        </article>

        <section
          style={{
            marginTop: "30px",
            padding: "28px",
            borderRadius: "28px",
            textAlign: "center",
            background:
              "linear-gradient(180deg, rgba(24,18,50,0.92), rgba(13,13,32,0.92))",
            border: "1px solid rgba(158,105,255,0.22)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.035) inset, 0 0 30px rgba(160,84,255,0.12)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "30px",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              fontWeight: 950,
            }}
          >
            {tx(language, "unavailableTitle")}
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "14px auto 0",
              color: "rgba(246,243,255,0.78)",
              lineHeight: 1.7,
              fontSize: "16px",
            }}
          >
            {tx(language, "unavailableText")}
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                minHeight: "48px",
                padding: "0 24px",
                borderRadius: "16px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "#ffffff",
                fontWeight: 950,
                background:
                  "linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%)",
                boxShadow:
                  "0 0 24px rgba(211,85,255,0.28), 0 0 28px rgba(103,218,255,0.16)",
              }}
            >
              💬 {tx(language, "supportButton")}
            </a>

            <Link
              href="/servers"
              style={{
                minHeight: "48px",
                padding: "0 24px",
                borderRadius: "16px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "#ffffff",
                fontWeight: 900,
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              {tx(language, "backServers")}
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
