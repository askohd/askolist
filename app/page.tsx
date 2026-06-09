<style>{`
  @keyframes premiumServerFadeIn {
    from {
      opacity: 0;
      transform: translateX(-24px) scale(0.96);
      filter: blur(8px);
    }

    to {
      opacity: 1;
      transform: translateX(0) scale(1);
      filter: blur(0);
    }
  }

  .hero-premium-showcase {
    position: absolute;
    left: 22px;
    top: 36px;
    transform: none;
    width: 320px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .hero-premium-heading {
    padding: 14px 16px;
    border-radius: 22px;
    background:
      radial-gradient(circle at 0% 0%, rgba(210, 78, 255, 0.20), transparent 38%),
      linear-gradient(180deg, rgba(24, 18, 50, 0.92), rgba(13, 13, 32, 0.92));
    border: 1px solid rgba(158, 105, 255, 0.22);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.035) inset,
      0 0 24px rgba(160, 84, 255, 0.16);
  }

  .hero-premium-heading span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #9deaff;
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .hero-premium-heading h3 {
    margin: 8px 0 0;
    color: #fff;
    font-size: 21px;
    line-height: 1;
    font-weight: 950;
    letter-spacing: -0.04em;
  }

  .hero-premium-card {
    position: relative;
    min-height: 252px;
    overflow: hidden;
    border-radius: 26px;
    text-decoration: none;
    color: #fff;
    isolation: isolate;
    background: rgba(15, 15, 34, 0.88);
    border: 1px solid rgba(197, 140, 255, 0.28);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.025) inset,
      0 0 26px rgba(180, 90, 255, 0.22),
      0 0 34px rgba(112, 219, 255, 0.12);
    opacity: 0;
    animation: premiumServerFadeIn 0.75s ease forwards;
  }

  .hero-premium-card-bg {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    filter: brightness(0.74) saturate(1.18);
  }

  .hero-premium-card-overlay {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(
        180deg,
        rgba(8, 8, 22, 0.28) 0%,
        rgba(9, 9, 24, 0.58) 40%,
        rgba(11, 13, 28, 0.92) 100%
      ),
      radial-gradient(circle at 100% 0%, rgba(105, 217, 255, 0.18), transparent 34%),
      radial-gradient(circle at 0% 100%, rgba(218, 77, 255, 0.18), transparent 36%);
  }

  .hero-premium-card-content {
    position: relative;
    z-index: 2;
    min-height: 252px;
    padding: 16px;
    display: flex;
    flex-direction: column;
  }

  .hero-premium-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 18px;
  }

  .hero-premium-badges {
    display: flex;
    align-items: center;
    gap: 7px;
    flex-wrap: wrap;
  }

  .hero-premium-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-height: 27px;
    padding: 0 11px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 950;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    background: rgba(255, 255, 255, 0.075);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(12px);
  }

  .hero-premium-badge.premium {
    color: #ffe68a;
    background: rgba(255, 207, 64, 0.13);
    border-color: rgba(255, 207, 64, 0.34);
  }

  .hero-premium-badge.partner {
    color: #9deaff;
    background: rgba(86, 209, 255, 0.13);
    border-color: rgba(86, 209, 255, 0.34);
  }

  .hero-premium-card-main {
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 13px;
    align-items: center;
    margin-top: auto;
  }

  .hero-premium-icon {
    width: 58px;
    height: 58px;
    border-radius: 17px;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 0 20px rgba(195, 78, 255, 0.24);
  }

  .hero-premium-card h4 {
    margin: 0;
    color: #fff;
    font-size: 19px;
    line-height: 1.1;
    font-weight: 950;
    letter-spacing: -0.035em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .hero-premium-card p {
    margin: 6px 0 0;
    color: rgba(246, 243, 255, 0.84);
    font-size: 12px;
    line-height: 1.45;
    font-weight: 700;
  }

  .hero-premium-card-bottom {
    margin-top: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .hero-premium-mini-info {
    display: flex;
    align-items: center;
    gap: 7px;
    color: rgba(246, 243, 255, 0.84);
    font-size: 12px;
    font-weight: 900;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .hero-premium-actions {
    margin-top: 14px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 9px;
  }

  .hero-premium-view,
  .hero-premium-join {
    min-height: 36px;
    padding: 0 13px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #ffffff;
    font-size: 12px;
    font-weight: 950;
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .hero-premium-view {
    background: linear-gradient(90deg, #c84dff 0%, #f35ad6 45%, #74dfff 100%);
    box-shadow: 0 0 18px rgba(211, 85, 255, 0.24);
  }

  .hero-premium-join {
    background: rgba(19, 26, 46, 0.76);
    box-shadow: 0 0 14px rgba(116, 223, 255, 0.12);
    backdrop-filter: blur(12px);
  }

  @media (max-width: 1150px) {
    .hero-premium-showcase {
      display: none;
    }
  }

  @media (max-width: 1250px) {
    .right-discord-card {
      position: relative !important;
      right: auto !important;
      top: auto !important;
      transform: none !important;
      margin: 44px auto 0 !important;
    }
  }
`}</style>
