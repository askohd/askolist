import Link from "next/link";

const DISCORD_URL = "https://discord.gg/askocafe";

export default function SupportPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "90px 24px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at 0% 20%, rgba(137,32,191,0.35), transparent 34%), radial-gradient(circle at 100% 20%, rgba(56,151,202,0.28), transparent 36%), linear-gradient(135deg, #07000f 0%, #10051f 45%, #10243d 100%)",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 22px",
            borderRadius: "999px",
            background:
              "linear-gradient(180deg, rgba(29,45,91,0.82), rgba(16,14,52,0.9))",
            border: "1px solid rgba(112,219,255,0.42)",
            color: "#9deaff",
            fontSize: "14px",
            fontWeight: 900,
            boxShadow:
              "0 0 24px rgba(92,211,255,0.18), 0 0 42px rgba(192,91,255,0.12)",
          }}
        >
          Support
        </span>

        <h1
          style={{
            margin: "34px 0 0",
            fontSize: "clamp(44px, 5vw, 72px)",
            lineHeight: 1,
            letterSpacing: "-0.055em",
            fontWeight: 950,
          }}
        >
          Brauchst du Hilfe?
        </h1>

        <p
          style={{
            maxWidth: "720px",
            margin: "22px auto 0",
            color: "rgba(246,243,255,0.82)",
            fontSize: "17px",
            lineHeight: 1.7,
          }}
        >
          Bei Problemen mit Servern, Premium, Freigaben, Bot-Verbindung oder
          deinem Account helfen wir dir direkt auf unserem Discord.
        </p>

        <div
          style={{
            marginTop: "34px",
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
              minHeight: "50px",
              minWidth: "240px",
              padding: "0 26px",
              borderRadius: "16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 950,
              background:
                "linear-gradient(135deg, #b54cff 0%, #f35acd 45%, #6fddff 100%)",
              boxShadow:
                "0 0 25px rgba(208,85,255,0.34), 0 0 28px rgba(112,221,255,0.18)",
            }}
          >
            💬 Support auf Discord öffnen
          </a>

          <Link
            href="/submit"
            style={{
              minHeight: "50px",
              minWidth: "190px",
              padding: "0 24px",
              borderRadius: "16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 900,
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            Server eintragen
          </Link>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1180px",
          margin: "58px auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "22px",
        }}
      >
        <SupportCard
          icon="🚀"
          title="Server Hilfe"
          text="Probleme beim Server eintragen, Banner hochladen, Bot einladen oder Bumpen."
        />

        <SupportCard
          icon="👑"
          title="Premium Hilfe"
          text="Fragen zu Premium Layouts, Farben, Effekten, Partner Funktionen oder Anzeige auf der Startseite."
        />

        <SupportCard
          icon="👤"
          title="Account Hilfe"
          text="Probleme beim Login, Discord Account, Server Dashboard oder fehlenden Berechtigungen."
        />
      </section>

      <section
        style={{
          maxWidth: "880px",
          margin: "42px auto 0",
          padding: "28px",
          borderRadius: "28px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(24,18,50,0.92), rgba(13,13,32,0.92))",
          border: "1px solid rgba(158,105,255,0.22)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.035) inset, 0 0 30px rgba(160,84,255,0.16)",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
          }}
        >
          Schnellste Hilfe bekommst du auf Discord
        </h2>

        <p
          style={{
            margin: "12px auto 0",
            maxWidth: "620px",
            color: "rgba(246,243,255,0.76)",
            lineHeight: 1.65,
          }}
        >
          Öffne einfach ein Ticket oder schreibe in den Support-Bereich. Unser
          Team schaut sich dein Problem dort an.
        </p>

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            marginTop: "20px",
            minHeight: "48px",
            padding: "0 26px",
            borderRadius: "16px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "#ffffff",
            fontWeight: 950,
            background:
              "linear-gradient(135deg, #f149d1 0%, #a456ff 45%, #75ddff 100%)",
          }}
        >
          Zum Asko Cafe Discord
        </a>
      </section>
    </main>
  );
}

function SupportCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <a
      href={DISCORD_URL}
      target="_blank"
      rel="noreferrer"
      style={{
        minHeight: "210px",
        padding: "24px",
        borderRadius: "26px",
        textDecoration: "none",
        color: "#ffffff",
        background:
          "linear-gradient(180deg, rgba(20,17,39,0.94), rgba(13,11,30,0.94))",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025) inset, 0 0 28px rgba(120,80,255,0.10)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #67e8f9 100%)",
          boxShadow: "0 0 20px rgba(112,221,255,0.2)",
          fontSize: "22px",
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          style={{
            margin: "22px 0 10px",
            fontSize: "22px",
            lineHeight: 1,
            fontWeight: 950,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            color: "rgba(246,243,255,0.78)",
            lineHeight: 1.5,
            fontSize: "15px",
          }}
        >
          {text}
        </p>
      </div>

      <span
        style={{
          marginTop: "18px",
          color: "#9deaff",
          fontSize: "14px",
          fontWeight: 900,
        }}
      >
        Auf Discord Hilfe bekommen →
      </span>
    </a>
  );
}
