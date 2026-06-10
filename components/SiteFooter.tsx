import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <div className="site-footer-badge">Asko Cafe</div>
            <p className="site-footer-text">
              Discord-Server entdecken, verwalten und hervorheben – mit Fokus auf
              Community, Übersicht und Sicherheit.
            </p>
          </div>

          <div className="site-footer-nav-group">
            <span className="site-footer-heading">Bereiche</span>
            <div className="site-footer-links">
              <Link href="/shop" className="site-footer-link">
                Premium
              </Link>
              <Link href="/submit" className="site-footer-link">
                Server hinzufügen
              </Link>
              <a
                href="https://discord.gg/askocafe"
                target="_blank"
                rel="noreferrer"
                className="site-footer-link"
              >
                Support Discord
              </a>
            </div>
          </div>

          <div className="site-footer-nav-group">
            <span className="site-footer-heading">Rechtliches</span>
            <div className="site-footer-links">
              <Link href="/impressum" className="site-footer-link">
                Impressum
              </Link>
              <Link href="/datenschutz" className="site-footer-link">
                Datenschutzerklärung
              </Link>
              <Link href="/nutzungsbedingungen" className="site-footer-link">
                Nutzungsbedingungen
              </Link>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© 2026 Asko Cafe. Alle Rechte vorbehalten.</p>
          <p className="site-footer-bottom-note">
            Bei Fragen oder Problemen:{" "}
            <a
              href="https://discord.gg/askocafe"
              target="_blank"
              rel="noreferrer"
              className="site-footer-link muted"
            >
              Support auf Discord
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
