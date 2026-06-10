import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <div className="site-footer-logo-row">
              <span className="site-footer-logo">☕</span>
              <div>
                <strong>Asko Cafe</strong>
                <p>Discord Server Directory</p>
              </div>
            </div>

            <p className="site-footer-text">
              Finde neue Discord-Communitys, trage deinen eigenen Server ein und
              nutze Premium-Features für mehr Sichtbarkeit.
            </p>
          </div>

          <nav className="site-footer-column" aria-label="Plattform">
            <span className="site-footer-heading">Plattform</span>

            <Link href="/servers" className="site-footer-link">
              Serverliste
            </Link>

            <Link href="/submit" className="site-footer-link">
              Server eintragen
            </Link>

            <Link href="/shop" className="site-footer-link">
              Premium
            </Link>

            <Link href="/support" className="site-footer-link">
              Support
            </Link>
          </nav>

          <nav className="site-footer-column" aria-label="Rechtliches">
            <span className="site-footer-heading">Rechtliches</span>

            <Link href="/impressum" className="site-footer-link">
              Impressum
            </Link>

            <Link href="/datenschutz" className="site-footer-link">
              Datenschutzerklärung
            </Link>

            <Link href="/nutzungsbedingungen" className="site-footer-link">
              Nutzungsbedingungen
            </Link>
          </nav>
        </div>

        <div className="site-footer-bottom">
          <span>© 2026 Asko Cafe</span>

          <span>
            Support über{" "}
            <a
              href="https://discord.gg/asko"
              target="_blank"
              rel="noreferrer"
              className="site-footer-link muted"
            >
              Discord-Ticket
            </a>{" "}
            oder{" "}
            <a
              href="mailto:dcaskocafe@gmail.com"
              className="site-footer-link muted"
            >
              E-Mail
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
