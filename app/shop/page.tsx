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
    productTitle: "Premium Placement – 7 Tage",
    productText:
      "Dein Discord Server wird für 7 Tage oben in der Serverliste hervorgehoben.",
    includedTitle: "Was enthalten ist",
    included1: "Hervorgehobene Platzierung in der Serverliste",
    included2: "Premium-Markierung auf deinem Serverprofil",
    included3: "Schönere Sichtbarkeit für neue Mitglieder",
    included4: "Gültig für 7 Tage nach Aktivierung",
    priceLabel: "Preis",
    priceValue: "Kommt bald",
    unavailableTitle: "Der Shop ist noch nicht verfügbar",
    unavailableText:
      "Käufe sind aktuell noch deaktiviert. Bei Fragen zu Premium, Partner oder Server-Platzierungen melde dich bitte auf unserem Discord im Support.",
    comingSoon: "Coming soon",
    supportButton: "Support auf Discord öffnen",
    backServers: "Zur Serverliste",
    noteTitle: "Hinweis",
    noteText:
      "Sobald der Shop aktiviert wird, kannst du Premium direkt hier auswählen und für deinen Server nutzen.",
  },

  en: {
    badge: "Shop",
    title: "Asko Cafe Shop",
    subtitle:
      "Here you will find premium features for your Discord server. The shop is still being built.",
    productBadge: "Premium",
    statusBadge: "Not available yet",
    productTitle: "Premium Placement – 7 Days",
    productText:
      "Your Discord server will be highlighted at the top of the server list for 7 days.",
    includedTitle: "What is included",
    included1: "Highlighted placement in the server list",
    included2: "Premium badge on your server profile",
    included3: "Better visibility for new members",
    included4: "Valid for 7 days after activation",
    priceLabel: "Price",
    priceValue: "Coming soon",
    unavailableTitle: "The shop is not available yet",
    unavailableText:
      "Purchases are currently disabled. For questions about premium, partner or server placements, please contact us on Discord support.",
    comingSoon: "Coming soon",
    supportButton: "Open Discord support",
    backServers: "Back to server list",
    noteTitle: "Note",
    noteText:
      "Once the shop is activated, you will be able to select premium directly here and use it for your server.",
  },

  fr: {
    badge: "Shop",
    title: "Boutique Asko Cafe",
    subtitle:
      "Ici, tu trouveras des fonctions premium pour ton serveur Discord. La boutique est encore en construction.",
    productBadge: "Premium",
    statusBadge: "Pas encore disponible",
    productTitle: "Placement Premium – 7 jours",
    productText:
      "Ton serveur Discord sera mis en avant en haut de la liste des serveurs pendant 7 jours.",
    includedTitle: "Ce qui est inclus",
    included1: "Placement mis en avant dans la liste des serveurs",
    included2: "Badge Premium sur le profil de ton serveur",
    included3: "Meilleure visibilité pour les nouveaux membres",
    included4: "Valable 7 jours après activation",
    priceLabel: "Prix",
    priceValue: "Bientôt disponible",
    unavailableTitle: "La boutique n’est pas encore disponible",
    unavailableText:
      "Les achats sont actuellement désactivés. Pour toute question sur Premium, Partenaire ou les placements de serveur, contacte-nous sur le support Discord.",
    comingSoon: "Bientôt",
    supportButton: "Ouvrir le support Discord",
    backServers: "Retour à la liste des serveurs",
    noteTitle: "Remarque",
    noteText:
      "Dès que la boutique sera activée, tu pourras choisir Premium directement ici et l’utiliser pour ton serveur.",
  },

  it: {
    badge: "Shop",
    title: "Shop Asko Cafe",
    subtitle:
      "Qui trovi funzioni premium per il tuo server Discord. Lo shop è ancora in sviluppo.",
    productBadge: "Premium",
    statusBadge: "Non ancora disponibile",
    productTitle: "Premium Placement – 7 giorni",
    productText:
      "Il tuo server Discord verrà evidenziato in cima alla lista dei server per 7 giorni.",
    includedTitle: "Cosa include",
    included1: "Posizionamento evidenziato nella lista server",
    included2: "Badge Premium sul profilo del server",
    included3: "Maggiore visibilità per nuovi membri",
    included4: "Valido per 7 giorni dopo l’attivazione",
    priceLabel: "Prezzo",
    priceValue: "Prossimamente",
    unavailableTitle: "Lo shop non è ancora disponibile",
    unavailableText:
      "Gli acquisti sono attualmente disattivati. Per domande su premium, partner o posizionamenti server, contattaci nel supporto Discord.",
    comingSoon: "Coming soon",
    supportButton: "Apri supporto Discord",
    backServers: "Torna alla lista server",
    noteTitle: "Nota",
    noteText:
      "Quando lo shop sarà attivo, potrai scegliere Premium direttamente qui e usarlo per il tuo server.",
  },

  pl: {
    badge: "Sklep",
    title: "Sklep Asko Cafe",
    subtitle:
      "Tutaj znajdziesz funkcje premium dla swojego serwera Discord. Sklep jest jeszcze w budowie.",
    productBadge: "Premium",
    statusBadge: "Jeszcze niedostępne",
    productTitle: "Premium Placement – 7 dni",
    productText:
      "Twój serwer Discord będzie wyróżniony na górze listy serwerów przez 7 dni.",
    includedTitle: "Co zawiera",
    included1: "Wyróżnione miejsce na liście serwerów",
    included2: "Odznaka Premium na profilu serwera",
    included3: "Lepsza widoczność dla nowych członków",
    included4: "Ważne przez 7 dni po aktywacji",
    priceLabel: "Cena",
    priceValue: "Wkrótce",
    unavailableTitle: "Sklep nie jest jeszcze dostępny",
    unavailableText:
      "Zakupy są obecnie wyłączone. W sprawie pytań o Premium, Partner lub wyróżnienia serwerów skontaktuj się z nami na Discordzie w support.",
    comingSoon: "Wkrótce",
    supportButton: "Otwórz support Discord",
    backServers: "Powrót do listy serwerów",
    noteTitle: "Informacja",
    noteText:
      "Gdy sklep zostanie aktywowany, będzie można wybrać Premium bezpośrednio tutaj i użyć go dla swojego serwera.",
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
