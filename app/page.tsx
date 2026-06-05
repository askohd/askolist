'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import ServerCard from '@/components/ServerCard';
import { categories, countries, initialServers, languages } from '@/lib/demoData';
import { Server } from '@/lib/types';

export default function HomePage() {
  const [servers, setServers] = useState<Server[]>(initialServers);
  const approved = servers.filter((server) => server.approved);
  const featured = approved.filter((s) => s.premiumStatus || s.partnerStatus);
  const bumped = [...approved].sort((a, b) => new Date(b.lastBump || 0).getTime() - new Date(a.lastBump || 0).getTime());
  const bestRated = [...approved].sort((a, b) => b.ratingAverage - a.ratingAverage);

  const shownCategories = useMemo(() => categories.slice(0, 8), []);

  function bumpServer(id: string) {
    setServers((current) => current.map((server) => server.id === id ? {
      ...server,
      bumps: server.bumps + 1,
      lastBump: new Date().toISOString()
    } : server));
  }

  return (
    <main>
      <section className="container hero">
        <h1>Find Discord Servers Worldwide</h1>
        <p>Discover, rate and bump international Discord communities on AskoList.</p>
        <div className="hero-actions">
          <Link className="btn" href="/servers">Server entdecken</Link>
          <Link className="btn secondary" href="/submit">Server eintragen</Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-title"><h2>Featured Discord Servers</h2><span className="meta">Premium & Partner</span></div>
        {featured.length === 0 ? <div className="card empty">No featured servers yet.</div> : <div className="grid">{featured.slice(0,3).map((s) => <ServerCard key={s.id} server={s} onBump={bumpServer} />)}</div>}
      </section>

      <section className="container section">
        <div className="card search-box">
          <input className="input" placeholder="Search Discord servers..." />
          <select>{countries.map(c => <option key={c}>{c}</option>)}</select>
          <select>{languages.map(l => <option key={l}>{l}</option>)}</select>
          <select>{categories.map(c => <option key={c}>{c}</option>)}</select>
          <button className="btn">Search</button>
        </div>
      </section>

      <section className="container section">
        <div className="section-title"><h2>Popular Categories</h2></div>
        <div className="badges">{shownCategories.map((c) => <Link className="badge" href={`/servers?category=${c}`} key={c}>{c}</Link>)}</div>
      </section>

      <section className="container section">
        <div className="section-title"><h2>Zuletzt gebumpte Server</h2></div>
        {bumped.length === 0 ? <div className="card empty">Noch keine Discord-Server eingetragen.<br />Sei der Erste und registriere deinen Server.<br /><br /><Link className="btn" href="/submit">Server eintragen</Link></div> : <div className="grid">{bumped.slice(0, 6).map((s) => <ServerCard key={s.id} server={s} onBump={bumpServer} />)}</div>}
      </section>

      <section className="container section">
        <div className="section-title"><h2>Bestbewertete Server</h2></div>
        {bestRated.length === 0 ? <div className="card empty">No rated servers yet.</div> : <div className="grid">{bestRated.slice(0, 6).map((s) => <ServerCard key={s.id} server={s} onBump={bumpServer} />)}</div>}
      </section>
    </main>
  );
}
