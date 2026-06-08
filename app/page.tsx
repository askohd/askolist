<section className="home-hero">
  <div className="container home-hero-grid">
    <div className="home-hero-left">
      <div className="home-hero-left-inner">
        <span className="page-badge">Asko Cafe Network</span>

        <h1>Entdecke Discord Server</h1>

        <p>
          Finde aktive Communities, bewerte Server und entdecke neue Discord
          Netzwerke auf Asko Cafe.
        </p>

        <div className="home-hero-search">
          <input
            type="text"
            className="input"
            placeholder="Server suchen"
          />
          <button className="btn" type="button">
            Suchen
          </button>
        </div>

        <div className="hero-actions">
          <a className="btn" href="/servers">
            Server entdecken
          </a>

          <a className="btn secondary" href="/submit">
            Server eintragen
          </a>
        </div>
      </div>
    </div>

    <div className="home-hero-right">
      <article className="discord-server-card">
        <div className="discord-server-banner">
          <img
            src="/asko-cafe-banner.png"
            alt="Asko Cafe Banner"
          />
        </div>

        <div className="discord-server-content">
          <div className="discord-server-top">
            <img
              className="discord-server-icon"
              src="/asko-cafe-icon.png"
              alt="Asko Cafe Icon"
            />

            <div className="discord-server-meta">
              <h3>Asko Cafe</h3>
              <span>Discord Community</span>
            </div>
          </div>

          <p className="discord-server-description">
            Offizieller Asko Cafe Discord Server. Tritt unserer Community bei,
            entdecke neue Server, tausche dich mit anderen aus und bleibe immer
            auf dem Laufenden.
          </p>

          <div className="discord-server-actions">
            <a
              href="https://discord.gg/askocafe"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              Discord beitreten
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
