'use client';

import { Server } from '@/lib/types';

function nextBumpText(lastBump: string | null) {
  if (!lastBump) return null;
  const diffMs = Date.now() - new Date(lastBump).getTime();
  const cooldownMs = 2 * 60 * 60 * 1000;
  const remaining = cooldownMs - diffMs;
  if (remaining <= 0) return null;
  const minutes = Math.ceil(remaining / 60000);
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours > 0 ? `${hours}h ${rest}m` : `${rest}m`;
}

export default function ServerCard({ server, onBump }: { server: Server; onBump?: (id: string) => void }) {
  const cooldown = nextBumpText(server.lastBump);
  const isPremium = server.premiumStatus && (!server.premiumUntil || new Date(server.premiumUntil) > new Date());
  const isPartner = server.partnerStatus && (!server.partnerUntil || new Date(server.partnerUntil) > new Date());

  return (
    <article className={`card server-card ${isPremium ? 'premium' : ''}`}>
      <div className="server-top">
        <div className="avatar">{server.serverName.slice(0, 1).toUpperCase()}</div>
        <div>
          <h3 className="server-name">{server.serverName}</h3>
          <div className="meta">{server.country} · {server.language} · {server.category}</div>
        </div>
      </div>

      <p className="meta">{server.description}</p>

      <div className="badges">
        {isPremium && <span className="badge premium">Premium</span>}
        {isPartner && <span className="badge partner">Partner</span>}
        {server.tags.map((tag) => <span className="badge" key={tag}>{tag}</span>)}
      </div>

      <div className="meta">⭐ {server.ratingAverage.toFixed(1)} ({server.ratingCount}) · 🚀 {server.bumps} bumps</div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <a className="btn secondary" href={server.inviteLink} target="_blank">Join Server</a>
        {onBump && (
          <button className="btn" disabled={Boolean(cooldown)} onClick={() => onBump(server.id)}>
            {cooldown ? `Bump in ${cooldown}` : 'Bump'}
          </button>
        )}
      </div>
    </article>
  );
}
