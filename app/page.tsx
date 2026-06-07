"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ServerCard from "@/components/ServerCard";
import { categories, initialServers, languages } from "@/lib/demoData";
import { Server } from "@/lib/types";

export default function HomePage() {
const [servers, setServers] = useState<Server[]>(initialServers);

const approved = servers.filter((server) => server.approved);
const featured = approved.filter(
(server) => server.premiumStatus || server.partnerStatus
);

const bumped = [...approved].sort(
(a, b) =>
new Date(b.lastBump || 0).getTime() -
new Date(a.lastBump || 0).getTime()
);

const bestRated = [...approved].sort(
(a, b) => b.ratingAverage - a.ratingAverage
);

const shownCategories = useMemo(() => categories.slice(0, 8), []);

function bumpServer(id: string) {
setServers((current) =>
current.map((server) =>
server.id === id
? {
...server,
bumps: server.bumps + 1,
lastBump: new Date().toISOString(),
}
: server
)
);
}

return ( <main> <section className="container hero"> <h1>Find Discord Servers Worldwide</h1> <p>
Discover, rate and bump Discord communities on Asko Cafe. </p>

```
    <div className="hero-actions">
      <Link className="btn" href="/servers">
        Server entdecken
      </Link>

      <Link className="btn secondary" href="/submit">
        Server eintragen
      </Link>
    </div>
  </section>

  <section className="container section">
    <div className="section-title">
      <h2>Featured Discord Servers</h2>
      <span className="meta">Premium & Partner</span>
    </div>

    {featured.length === 0 ? (
      <div className="card empty">No featured servers yet.</div>
    ) : (
      <div className="grid">
        {featured.slice(0, 3).map((server) => (
          <ServerCard
            key={server.id}
            server={server}
            onBump={bumpServer}
          />
        ))}
      </div>
    )}
  </section>

  <section className="container section">
    <div className="card search-box">
      <input className="input" placeholder="Search Discord servers..." />

      <select>
        <option>Alle Sprachen</option>
        {languages.map((language) => (
          <option key={language}>{language}</option>
        ))}
      </select>

      <select>
        <option>Alle Kategorien</option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>

      <Link className="btn" href="/servers">
        Search
      </Link>
    </div>
  </section>

  <section className="container section">
    <div className="section-title">
      <h2>Popular Categories</h2>
    </div>

    <div className="badges">
      {shownCategories.map((category) => (
        <Link
          className="badge"
          href={`/servers?category=${category}`}
          key={category}
        >
          {category}
        </Link>
      ))}
    </div>
  </section>

  <section className="container section">
    <div className="section-title">
      <h2>Zuletzt gebumpte Server</h2>
    </div>

    {bumped.length === 0 ? (
      <div className="card empty">
        Noch keine Discord-Server eingetragen.
        <br />
        Sei der Erste und registriere deinen Server.
        <br />
        <br />
        <Link className="btn" href="/submit">
          Server eintragen
        </Link>
      </div>
    ) : (
      <div className="grid">
        {bumped.slice(0, 6).map((server) => (
          <ServerCard
            key={server.id}
            server={server}
            onBump={bumpServer}
          />
        ))}
      </div>
    )}
  </section>

  <section className="container section">
    <div className="section-title">
      <h2>Bestbewertete Server</h2>
    </div>

    {bestRated.length === 0 ? (
      <div className="card empty">No rated servers yet.</div>
    ) : (
      <div className="grid">
        {bestRated.slice(0, 6).map((server) => (
          <ServerCard
            key={server.id}
            server={server}
            onBump={bumpServer}
          />
        ))}
      </div>
    )}
  </section>
</main>
```

);
}
