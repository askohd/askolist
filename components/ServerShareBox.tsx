"use client";

import { useMemo, useState } from "react";

type ServerShareBoxProps = {
  serverName: string;
  serverUrl: string;
};

function getShareText(serverName: string, serverUrl: string) {
  return [
    `Bewerte ${serverName} auf Asko Cafe ⭐`,
    "",
    "Hier findest du unseren Discord Server:",
    serverUrl,
    "",
    "Tritt bei, schau vorbei und lass gerne eine Bewertung da!",
  ].join("\n");
}

export default function ServerShareBox({
  serverName,
  serverUrl,
}: ServerShareBoxProps) {
  const [status, setStatus] = useState("");

  const shareText = useMemo(
    () => getShareText(serverName, serverUrl),
    [serverName, serverUrl]
  );

  const xShareUrl = useMemo(() => {
    const text = `Bewerte ${serverName} auf Asko Cafe ⭐`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(serverUrl)}`;
  }, [serverName, serverUrl]);

  async function copyShareText(message = "Kopiert.") {
    try {
      await navigator.clipboard.writeText(shareText);
      setStatus(message);
    } catch {
      setStatus("Bitte Text manuell kopieren.");
    }
  }

  async function copyAndOpen(url: string, message: string) {
    await copyShareText(message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="server-detail-share-box">
      <style>{`
        .server-detail-share-box {
          padding: 22px;
          border-radius: 24px;
          background:
            radial-gradient(circle at 0% 0%, rgba(116,223,255,0.16), transparent 34%),
            linear-gradient(180deg, rgba(80,34,116,0.42), rgba(37,61,92,0.28));
          border: 1px solid rgba(116,223,255,0.22);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.025) inset,
            0 0 24px rgba(116,223,255,0.10);
        }

        .server-detail-share-box h3 {
          margin: 0 0 8px;
          font-size: 20px;
          font-weight: 950;
          letter-spacing: -0.025em;
        }

        .server-detail-share-box p {
          margin: 0;
          color: rgba(246,243,255,0.72);
          font-size: 13px;
          line-height: 1.55;
          font-weight: 700;
        }

        .server-detail-share-buttons {
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }

        .server-detail-share-button {
          min-height: 42px;
          padding: 0 12px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #ffffff;
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 950;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 0 18px rgba(116,223,255,0.10);
          cursor: pointer;
        }

        .server-detail-share-button.copy {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #b54cff 0%, #6fddff 100%);
        }

        .server-detail-share-button.discord {
          background: linear-gradient(135deg, #5865f2 0%, #8b5cf6 100%);
        }

        .server-detail-share-button.tiktok {
          background: linear-gradient(135deg, #111827 0%, #ef2d56 100%);
        }

        .server-detail-share-button.instagram {
          background: linear-gradient(135deg, #f58529 0%, #dd2a7b 48%, #8134af 100%);
        }

        .server-detail-share-button.x {
          background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
        }

        .server-detail-share-button:active {
          transform: translateY(1px);
        }

        .server-detail-share-text {
          margin-top: 14px;
          display: grid;
          gap: 8px;
        }

        .server-detail-share-text label {
          color: rgba(255,255,255,0.82);
          font-size: 12px;
          font-weight: 950;
        }

        .server-detail-share-text textarea {
          width: 100%;
          min-width: 0;
          min-height: 92px;
          resize: vertical;
          padding: 11px 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.90);
          outline: none;
          font-size: 12px;
          font-weight: 800;
          line-height: 1.45;
        }

        .server-detail-share-status {
          margin-top: 10px !important;
          color: #9deaff !important;
          font-size: 12px !important;
          line-height: 1.45 !important;
        }

        .server-detail-share-hint {
          margin-top: 10px !important;
          color: rgba(246,243,255,0.54) !important;
          font-size: 12px !important;
          line-height: 1.45 !important;
        }

        @media (max-width: 430px) {
          .server-detail-share-box {
            padding: 15px;
            border-radius: 22px;
          }

          .server-detail-share-buttons {
            grid-template-columns: 1fr;
          }

          .server-detail-share-button.copy {
            grid-column: auto;
          }
        }
      `}</style>

      <h3>Server teilen</h3>

      <p>
        Klicke auf einen Button. Der fertige Text mit Link wird vorbereitet.
        Bei TikTok, Instagram und Discord wird der Text kopiert und die Plattform
        geöffnet. Bei X wird der Post direkt vorbereitet.
      </p>

      <div className="server-detail-share-buttons">
        <button
          type="button"
          className="server-detail-share-button copy"
          onClick={() => copyShareText("Link und Text wurden kopiert.")}
        >
          🔗 Link kopieren
        </button>

        <button
          type="button"
          className="server-detail-share-button discord"
          onClick={() =>
            copyAndOpen(
              "https://discord.com/channels/@me",
              "Text kopiert. Wähle jetzt einen Discord-DM oder Server aus und füge ihn ein."
            )
          }
        >
          💬 Discord DM
        </button>

        <button
          type="button"
          className="server-detail-share-button tiktok"
          onClick={() =>
            copyAndOpen(
              "https://www.tiktok.com/upload?lang=de-DE",
              "Text kopiert. Lade dein TikTok hoch und füge den Text ein."
            )
          }
        >
          🎵 TikTok
        </button>

        <button
          type="button"
          className="server-detail-share-button instagram"
          onClick={() =>
            copyAndOpen(
              "https://www.instagram.com/",
              "Text kopiert. Öffne deinen Instagram-Post, deine Story oder Bio und füge den Text ein."
            )
          }
        >
          📸 Instagram
        </button>

        <button
          type="button"
          className="server-detail-share-button x"
          onClick={() => window.open(xShareUrl, "_blank", "noopener,noreferrer")}
        >
          𝕏 Posten
        </button>
      </div>

      <div className="server-detail-share-text">
        <label htmlFor="server-share-text">Vorbereiteter Text</label>
        <textarea id="server-share-text" readOnly value={shareText} />
      </div>

      {status && <p className="server-detail-share-status">{status}</p>}

      <p className="server-detail-share-hint">
        So können Serverbesitzer ihre Asko-Cafe-Seite schnell teilen und neue
        Mitglieder auf ihren Discord Server bringen.
      </p>
    </div>
  );
}
