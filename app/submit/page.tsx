import { categories, countries, languages } from '@/lib/demoData';

export default function SubmitPage() {
  return (
    <main className="container section">
      <div className="section-title"><h1>Server eintragen</h1><span className="meta">One server per Discord user</span></div>
      <form className="card form">
        <input className="input" placeholder="Servername" />
        <textarea placeholder="Beschreibung" />
        <input className="input" placeholder="Discord Invite Link" />
        <input className="input" placeholder="Discord Server ID" />
        <input className="input" placeholder="Owner Discord User ID" />
        <select>{categories.map((c) => <option key={c}>{c}</option>)}</select>
        <input className="input" placeholder="Eigene Tags, z. B. #chill, #gaming" />
        <select>{countries.map((c) => <option key={c}>{c}</option>)}</select>
        <select>{languages.map((l) => <option key={l}>{l}</option>)}</select>
        <label className="meta"><input type="checkbox" /> NSFW server</label>
        <button className="btn" type="button">Einreichen zur Admin-Freigabe</button>
        <p className="meta">Hinweis: In diesem Starter ist das Formular optisch vorbereitet. Für echte Speicherung wird als nächster Schritt Supabase oder eine Datenbank angeschlossen.</p>
      </form>
    </main>
  );
}
