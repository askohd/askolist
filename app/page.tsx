"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLanguage } from "@/components/useLanguage";
import { initialServers } from "@/lib/demoData";
import type { Server } from "@/lib/types";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const HOME_TEXT = {
  de: {
    badge: "Asko Cafe Network",
    title: "Entdecke Discord Server",
    text: "Finde aktive Communities, bewerte Server und entdecke neue Discord Netzwerke auf Asko Cafe.",
    searchPlaceholder: "Server suchen",
    search: "Suchen",
    discover: "Server entdecken",
    submit: "Server eintragen",
    cardBadge: "Offizieller Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Tritt unserem offiziellen Discord bei, entdecke neue Communities, chatte mit anderen Mitgliedern und bleibe immer auf dem Laufenden.",
    cardExtra:
      "Chillige Gaming- und Anime-Community, Support bei Fragen und regelmäßig neue Updates.",
    join: "Discord beitreten",
    serverList: "Serverliste öffnen",
    premiumBadge: "Premium Bereich",
    premiumTitle: "Premium Server",
    premiumText:
      "Hier erscheinen Premium- und Partner-Server. Sie werden nach und nach elegant eingeblendet.",
    noPremiumTitle: "Noch keine Premium Server",
    noPremiumText:
      "Sobald Premium- oder Partner-Server vorhanden sind, werden sie hier automatisch angezeigt.",
    community: "Community",
    support: "Support",
    language: "Sprache",
    active: "Aktiv",
    features: "Features",
  },

  en: {
    badge: "Asko Cafe Network",
    title: "Discover Discord Servers",
    text: "Find active communities, rate servers and discover new Discord networks on Asko Cafe.",
    searchPlaceholder: "Search servers",
    search: "Search",
    discover: "Discover servers",
    submit: "Submit server",
    cardBadge: "Official Discord",
    cardTitle: "Asko Cafe",
    cardText:
      "Join our official Discord, discover new communities, chat with others and stay up to date.",
    cardExtra:
      "Chill gaming and anime community, support for questions and regular new updates.",
    join: "Join Discord",
    serverList: "Open server list",
    premiumBadge: "Premium Area",
    premiumTitle: "Premium Servers",
    premiumText:
      "Premium and partner servers appear here and fade in one after another.",
    noPremiumTitle: "No premium servers yet",
    noPremiumText:
      "As soon as premium or partner servers exist, they will appear here automatically.",
    community: "Community",
    support: "Support",
    language: "Language",
    active: "Active",
    features: "Features",
  },

  fr: {
    badge: "Réseau Asko Cafe",
    title: "Découvre des serveurs Discord",
    text: "Trouve des communautés actives, note des serveurs et découvre de nouveaux réseaux Discord sur Asko Cafe.",
    searchPlaceholder: "Rechercher des serveurs",
    search: "Rechercher",
    discover: "Découvrir les serveurs",
    submit: "Ajouter un serveur",
    cardBadge: "Discord officiel",
    cardTitle: "Asko Cafe",
    cardText:
      "Rejoins notre Discord officiel, découvre de nouvelles communautés, discute avec les autres et reste informé.",
    cardExtra:
      "Communauté gaming et anime chill, support pour les questions et mises à jour régulières.",
    join: "Rejoindre Discord",
    serverList: "Ouvrir la liste",
    premiumBadge: "Zone Premium",
    premiumTitle: "Serveurs Premium",
    premiumText:
      "Les serveurs premium et partenaires apparaissent ici avec une animation élégante.",
    noPremiumTitle: "Aucun serveur premium",
    noPremiumText:
      "Dès qu'il y aura des serveurs premium ou partenaires, ils seront affichés ici automatiquement.",
    community: "Communauté",
    support: "Support",
    language: "Langue",
    active: "Actif",
    features: "Fonctions",
  },

  it: {
    badge: "Asko Cafe Network",
    title: "Scopri server Discord",
    text: "Tro
