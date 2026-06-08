"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ServerCard from "@/components/ServerCard";
import { categories, initialServers, languages } from "@/lib/demoData";
import { Server } from "@/lib/types";
import { t } from "@/lib/i18n";
import { useLanguage } from "@/components/useLanguage";

export default function HomePage() {
  const language = useLanguage();
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

  return (
    <main>
      <section className="container hero">
        <h1>{t(language, "home.title")}</h1>

        <p>{t(language, "home.subtitle")}</p>

        <div className="hero-actions">
          <Link className="btn" href="/servers">
            {t(language, "home.discover")}
          </Link>

          <Link className="btn secondary" href="/submit">
            {t(language, "home.submit")}
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-title">
          <h2>{t(language, "home.featuredTitle")}</h2>
          <span className="meta">{t(language, "home.featuredMeta")}</span>
        </div>

        {featured.length === 0 ? (
          <div className="card empty">{t(language, "home.noFeatured")}</div>
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
          <input
            className="input"
            placeholder={t(language, "home.searchPlaceholder")}
          />

          <select>
            <option>{t(language, "home.allLanguages")}</option>
            {languages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select>
            <option>{t(language, "home.allCategories")}</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <Link className="btn" href="/servers">
            {t(language, "home.search")}
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-title">
          <h2>{t(language, "home.popularCategories")}</h2>
        </div>

        <div className="badges">
          {shownCategories.map((category) => (
            <Link
              className="badge"
              href={"/servers?category=" + encodeURIComponent(category)}
              key={category}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-title">
          <h2>{t(language, "home.bumpedTitle")}</h2>
        </div>

        {bumped.length === 0 ? (
          <div className="card empty">
            {t(language, "home.noServers1")}
            <br />
            {t(language, "home.noServers2")}
            <br />
            <br />
            <Link className="btn" href="/submit">
              {t(language, "home.submit")}
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
          <h2>{t(language, "home.bestRatedTitle")}</h2>
        </div>

        {bestRated.length === 0 ? (
          <div className="card empty">{t(language, "home.noRated")}</div>
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
  );
}
