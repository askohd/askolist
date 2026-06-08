import { Server } from "./types";

// Keine Fake-/Demo-Server.
// Premium-Server werden automatisch über /api/premium-servers aus Supabase geladen.
export const initialServers: Server[] = [];

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
