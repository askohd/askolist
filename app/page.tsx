/* FINAL HOME FIX */

.home-hero.bigger-centered-hero {
  min-height: auto !important;
  padding-top: 64px !important;
  padding-bottom: 72px !important;
}

.home-hero-grid {
  width: 100% !important;
  max-width: 1500px !important;
  margin: 0 auto !important;
  padding-left: 36px !important;
  padding-right: 36px !important;
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 360px !important;
  gap: 54px !important;
  align-items: center !important;
}

.home-hero-left {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.home-hero-left-inner {
  width: 100% !important;
  max-width: 720px !important;
  margin: 0 auto !important;
  text-align: center !important;
}

.cool-badge,
.home-hero-left-inner .page-badge {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  margin: 0 auto 22px !important;
  padding: 10px 22px !important;
  border-radius: 999px !important;
  font-size: 18px !important;
  line-height: 1 !important;
  font-weight: 900 !important;
  color: #95e9ff !important;
  background:
    radial-gradient(circle at 20% 0%, rgba(126, 227, 255, 0.18), transparent 38%),
    linear-gradient(180deg, rgba(18, 29, 64, 0.92), rgba(9, 12, 36, 0.92)) !important;
  border: 1px solid rgba(107, 215, 255, 0.42) !important;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 0 24px rgba(92, 211, 255, 0.18),
    0 0 34px rgba(190, 92, 255, 0.14) !important;
  transform: none !important;
}

.hero-title-large,
.hero-title-smaller {
  max-width: 680px !important;
  margin: 0 auto !important;
  text-align: center !important;
  font-size: clamp(54px, 6vw, 82px) !important;
  line-height: 0.94 !important;
  letter-spacing: -0.055em !important;
  font-weight: 950 !important;
  color: #ffffff !important;
  text-shadow: 0 16px 42px rgba(0, 0, 0, 0.36) !important;
}

.hero-title-large span,
.hero-title-smaller span {
  display: block !important;
}

.hero-title-large span:last-child,
.hero-title-smaller span:last-child {
  background: linear-gradient(90deg, #f5e7ff 0%, #d58dff 48%, #86d8ff 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.hero-text-large {
  max-width: 620px !important;
  margin: 22px auto 0 !important;
  text-align: center !important;
  font-size: 15.5px !important;
  line-height: 1.6 !important;
  color: rgba(245, 241, 255, 0.92) !important;
}

.centered-search,
.home-hero-search.centered-search {
  width: 100% !important;
  max-width: 560px !important;
  margin: 26px auto 0 !important;
  padding: 9px !important;
  border-radius: 20px !important;
  display: flex !important;
  gap: 10px !important;
}

.centered-search .input,
.home-hero-search.centered-search .input {
  height: 46px !important;
  font-size: 14px !important;
  border-radius: 14px !important;
}

.centered-search .btn,
.home-hero-search.centered-search .btn {
  height: 46px !important;
  padding-left: 22px !important;
  padding-right: 22px !important;
  border-radius: 14px !important;
  font-size: 14px !important;
}

.centered-actions {
  margin-top: 20px !important;
  gap: 12px !important;
}

.centered-actions .btn {
  min-height: 44px !important;
  padding: 0 22px !important;
  border-radius: 14px !important;
  font-size: 14px !important;
}

.home-hero-right,
.home-hero-right-pushed {
  width: 100% !important;
  max-width: 360px !important;
  justify-self: end !important;
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
}

.anime-discord-card {
  width: 360px !important;
  max-width: 360px !important;
  min-height: 0 !important;
  height: auto !important;
  border-radius: 28px !important;
  overflow: hidden !important;
  transform: none !important;
}

.anime-card-banner {
  height: 118px !important;
  min-height: 118px !important;
  max-height: 118px !important;
  overflow: hidden !important;
}

.anime-card-banner img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}

.anime-card-body {
  padding: 0 16px 16px !important;
  text-align: center !important;
}

.anime-card-icon-wrap,
.bigger-icon-only {
  width: 92px !important;
  height: 92px !important;
  margin: -30px auto 12px !important;
  border-radius: 24px !important;
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: linear-gradient(180deg, #171027, #0b091a) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow:
    0 12px 26px rgba(0, 0, 0, 0.38),
    0 0 18px rgba(236, 89, 255, 0.18) !important;
  position: relative !important;
  z-index: 5 !important;
}

.anime-card-icon {
  width: 78px !important;
  height: 78px !important;
  object-fit: contain !important;
  object-position: center !important;
  display: block !important;
}

.anime-card-title-row {
  justify-content: center !important;
  align-items: center !important;
  gap: 8px !important;
  margin: 0 !important;
}

.anime-card-title-row h3 {
  font-size: 28px !important;
  line-height: 1 !important;
  margin: 0 !important;
  font-weight: 950 !important;
}

.anime-card-subtitle {
  margin: 6px 0 12px !important;
  font-size: 12.5px !important;
  line-height: 1.2 !important;
}

.anime-card-germany-flag {
  width: 30px !important;
  height: 22px !important;
  border-radius: 999px !important;
  overflow: hidden !important;
  display: inline-flex !important;
  flex-direction: column !important;
  flex-shrink: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  box-shadow: 0 0 14px rgba(255, 206, 70, 0.25) !important;
}

.anime-card-germany-flag span {
  display: block !important;
  flex: 1 !important;
  width: 100% !important;
}

.anime-card-germany-flag span:nth-child(1) {
  background: #000000 !important;
}

.anime-card-germany-flag span:nth-child(2) {
  background: #dd0000 !important;
}

.anime-card-germany-flag span:nth-child(3) {
  background: #ffce00 !important;
}

.anime-card-germany-flag.small {
  width: 28px !important;
  height: 20px !important;
  margin: 0 auto !important;
}

.anime-card-tags {
  gap: 7px !important;
  margin: 12px 0 14px !important;
  justify-content: center !important;
}

.anime-card-tag {
  min-height: 28px !important;
  padding: 0 10px !important;
  border-radius: 999px !important;
  font-size: 11.5px !important;
  line-height: 1 !important;
}

.anime-card-description {
  margin-top: 14px !important;
  padding: 15px 14px !important;
  border-radius: 18px !important;
}

.anime-card-description p {
  font-size: 12.5px !important;
  line-height: 1.55 !important;
  margin: 0 !important;
}

.anime-card-description p + p {
  margin-top: 10px !important;
}

.anime-card-stats {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 9px !important;
  margin-top: 14px !important;
}

.anime-card-stat {
  min-height: 72px !important;
  padding: 10px 8px !important;
  border-radius: 16px !important;
}

.anime-card-stat-icon {
  font-size: 12px !important;
  margin-bottom: 4px !important;
}

.anime-card-stat strong {
  font-size: 17px !important;
  line-height: 1 !important;
}

.anime-card-stat small {
  font-size: 10px !important;
  margin-top: 4px !important;
}

.anime-card-actions,
.single-button-only {
  display: block !important;
  margin-top: 14px !important;
}

.anime-card-main-button {
  width: 100% !important;
  min-height: 46px !important;
  border-radius: 15px !important;
  font-size: 13.5px !important;
}

.anime-card-secondary-button {
  display: none !important;
}

@media (max-width: 1100px) {
  .home-hero-grid {
    grid-template-columns: 1fr !important;
  }

  .home-hero-right,
  .home-hero-right-pushed {
    justify-self: center !important;
    justify-content: center !important;
  }
}

@media (max-width: 680px) {
  .hero-title-large,
  .hero-title-smaller {
    font-size: clamp(42px, 12vw, 58px) !important;
  }

  .anime-discord-card {
    width: 100% !important;
    max-width: 360px !important;
  }

  .centered-search {
    flex-direction: column !important;
  }

  .centered-search .input,
  .centered-search .btn {
    width: 100% !important;
  }
}
