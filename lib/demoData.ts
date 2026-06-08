import { Server } from "./types";

export const initialServers: Server[] = [
  {
    id: "premium-server-1",
    serverName: "Premium Server 1",
    description: "Dein erster Premium Discord Server auf Asko Cafe.",
    category: "Community",
    language: "Deutsch",
    inviteLink: "https://discord.gg/dein-link-1",
    bannerUrl: "/asko-cafe-banner.png",
    logoUrl: "/asko-cafe-icon.png",
    approved: true,
    premiumStatus: true,
    partnerStatus: false,
  },
  {
    id: "premium-server-2",
    serverName: "Premium Server 2",
    description: "Dein zweiter Premium Discord Server auf Asko Cafe.",
    category: "Gaming",
    language: "Deutsch",
    inviteLink: "https://discord.gg/dein-link-2",
    bannerUrl: "/asko-cafe-banner.png",
    logoUrl: "/asko-cafe-icon.png",
    approved: true,
    premiumStatus: true,
    partnerStatus: false,
  },
];

export const categories = [
  "Gaming",
  "Community",
  "Anime",
  "Chill",
  "Roleplay",
  "Music",
  "Coding",
  "Support",
];

export const languages = [
  "Deutsch",
  "English",
  "Français",
  "Italiano",
  "Polski",
];
