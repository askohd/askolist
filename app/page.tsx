<main>
  <section className="home-hero">
    <div className="home-hero-overlay" />
    <div className="container home-hero-inner">
      <span className="page-badge">Asko Cafe Network</span>

      <h1>Entdecke Discord Server</h1>

      <p>
        Finde aktive Communities, bewerte Server und entdecke neue Discord
        Netzwerke auf Asko Cafe.
      </p>

      <div className="home-hero-search">
        <input type="text" placeholder="Server suchen" />
        <button className="btn">Suchen</button>
      </div>

      <div className="hero-actions">
        <Link href="/servers" className="btn">
          Server entdecken
        </Link>

        <Link href="/submit" className="btn secondary">
          Server eintragen
        </Link>
      </div>
    </div>
  </section>

  <section className="container home-featured-slider">
    <div className="featured-slider-card">
      <button className="slider-arrow left">‹</button>

      <div className="featured-slider-content">
        <div className="featured-server-avatar" />
        <div className="featured-server-info">
          <h2>~ Sakura 🌸</h2>
          <p>
            Bienvenue sur Sakura 🌸 Une communauté chill et conviviale pour
            discuter, partager et rencontrer du monde.
          </p>

          <div className="featured-server-actions">
            <button className="btn secondary">Server beitreten</button>
            <button className="btn tertiary">Details</button>
          </div>
        </div>
      </div>

      <button className="slider-arrow right">›</button>
    </div>
  </section>

  <section className="container home-filter-box">
    <div className="filter-card">
      <div className="filter-top-row">
        <input type="text" placeholder="Server suchen..." />
        <Link href="/submit" className="btn">
          Server hinzufügen
        </Link>
      </div>

      <div className="filter-bottom-row">
        <select>
          <option>Alle Sprachen</option>
        </select>

        <select>
          <option>Alle Kategorien</option>
        </select>

        <select>
          <option>Alle Tags</option>
        </select>

        <select>
          <option>Kürzlich gepusht</option>
        </select>
      </div>
    </div>
  </section>
</main>
