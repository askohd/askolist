'use client';

import { useState } from 'react';
import ServerCard from '@/components/ServerCard';
import { categories, countries, initialServers, languages } from '@/lib/demoData';
import { Server } from '@/lib/types';

export default function ServersPage() {
  const [servers, setServers] = useState<Server[]>(initialServers);
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('All');
  const [language, setLanguage] = useState('All');
  const [category, setCategory] = useState('All');

  const filtered = servers
    .filter((s) => s.approved)
    .filter((s) => s.serverName.toLowerCase().includes(query.toLowerCase()) || s.tags.join(' ').toLowerCase().includes(query.toLowerCase()))
    .filter((s) => country === 'All' || s.country === country)
    .filter((s) => language === 'All' || s.language === language)
    .filter((s) => category === 'All' || s.category === category)
    .sort((a, b) => Number(b.premiumStatus) - Number(a.premiumStatus) || new Date(b.lastBump || 0).getTime() - new Date(a.lastBump || 0).getTime());

  function bumpServer(id: string) {
    setServers((current) => current.map((server) => server.id === id ? {
      ...server,
      bumps: server.bumps + 1,
      lastBump: new Date().toISOString()
    } : server));
  }

  return (
    <main className="container section">
      <div className="section-title"><h1>Discord Servers</h1><span className="meta">Premium first, then latest bumps</span></div>
      <div className="card search-box">
        <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or tags..." />
        <select value={country} onChange={(e) => setCountry(e.target.value)}><option>All</option>{countries.map(c => <option key={c}>{c}</option>)}</select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}><option>All</option>{languages.map(l => <option key={l}>{l}</option>)}</select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}><option>All</option>{categories.map(c => <option key={c}>{c}</option>)}</select>
        <button className="btn">Search</button>
      </div>
      <br />
      {filtered.length === 0 ? <div className="card empty">Noch keine Discord-Server eingetragen.<br />Sei der Erste und registriere deinen Server.</div> : <div className="grid">{filtered.map((server) => <ServerCard key={server.id} server={server} onBump={bumpServer} />)}</div>}
    </main>
  );
}
