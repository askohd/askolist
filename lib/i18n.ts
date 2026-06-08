export type LanguageCode = "de" | "en" | "fr" | "it" | "pl";

export const defaultLanguage: LanguageCode = "de";

export const translations = {
  de: {
    "nav.servers": "Server",
    "nav.submit": "Server eintragen",
    "nav.shop": "Shop",
    "nav.profile": "Profil",
    "nav.admin": "Admin",

    "home.title": "Finde Discord Server weltweit",
    "home.subtitle": "Entdecke, bewerte und bumpe Discord-Communitys auf Asko Cafe.",
    "home.discover": "Server entdecken",
    "home.submit": "Server eintragen",
    "home.featuredTitle": "Empfohlene Discord Server",
    "home.featuredMeta": "Premium & Partner",
    "home.noFeatured": "Noch keine empfohlenen Server.",
    "home.searchPlaceholder": "Discord Server suchen...",
    "home.allLanguages": "Alle Sprachen",
    "home.allCategories": "Alle Kategorien",
    "home.search": "Suchen",
    "home.popularCategories": "Beliebte Kategorien",
    "home.bumpedTitle": "Zuletzt gebumpte Server",
    "home.noServers1": "Noch keine Discord-Server eingetragen.",
    "home.noServers2": "Sei der Erste und registriere deinen Server.",
    "home.bestRatedTitle": "Bestbewertete Server",
    "home.noRated": "Noch keine Bewertungen vorhanden.",
  },

  en: {
    "nav.servers": "Servers",
    "nav.submit": "Submit Server",
    "nav.shop": "Shop",
    "nav.profile": "Profile",
    "nav.admin": "Admin",

    "home.title": "Find Discord Servers Worldwide",
    "home.subtitle": "Discover, rate and bump Discord communities on Asko Cafe.",
    "home.discover": "Discover servers",
    "home.submit": "Submit server",
    "home.featuredTitle": "Featured Discord Servers",
    "home.featuredMeta": "Premium & Partner",
    "home.noFeatured": "No featured servers yet.",
    "home.searchPlaceholder": "Search Discord servers...",
    "home.allLanguages": "All languages",
    "home.allCategories": "All categories",
    "home.search": "Search",
    "home.popularCategories": "Popular Categories",
    "home.bumpedTitle": "Recently bumped servers",
    "home.noServers1": "No Discord servers submitted yet.",
    "home.noServers2": "Be the first to register your server.",
    "home.bestRatedTitle": "Best rated servers",
    "home.noRated": "No rated servers yet.",
  },

  fr: {
    "nav.servers": "Serveurs",
    "nav.submit": "Ajouter un serveur",
    "nav.shop": "Boutique",
    "nav.profile": "Profil",
    "nav.admin": "Admin",

    "home.title": "Trouve des serveurs Discord dans le monde",
    "home.subtitle": "Découvre, note et bump des communautés Discord sur Asko Cafe.",
    "home.discover": "Découvrir des serveurs",
    "home.submit": "Ajouter un serveur",
    "home.featuredTitle": "Serveurs Discord recommandés",
    "home.featuredMeta": "Premium & Partenaire",
    "home.noFeatured": "Aucun serveur recommandé pour le moment.",
    "home.searchPlaceholder": "Rechercher des serveurs Discord...",
    "home.allLanguages": "Toutes les langues",
    "home.allCategories": "Toutes les catégories",
    "home.search": "Rechercher",
    "home.popularCategories": "Catégories populaires",
    "home.bumpedTitle": "Serveurs récemment bumpés",
    "home.noServers1": "Aucun serveur Discord ajouté pour le moment.",
    "home.noServers2": "Sois le premier à enregistrer ton serveur.",
    "home.bestRatedTitle": "Serveurs les mieux notés",
    "home.noRated": "Aucune note pour le moment.",
  },

  it: {
    "nav.servers": "Server",
    "nav.submit": "Aggiungi server",
    "nav.shop": "Negozio",
    "nav.profile": "Profilo",
    "nav.admin": "Admin",

    "home.title": "Trova server Discord in tutto il mondo",
    "home.subtitle": "Scopri, valuta e bumpa community Discord su Asko Cafe.",
    "home.discover": "Scopri server",
    "home.submit": "Aggiungi server",
    "home.featuredTitle": "Server Discord consigliati",
    "home.featuredMeta": "Premium & Partner",
    "home.noFeatured": "Nessun server consigliato al momento.",
    "home.searchPlaceholder": "Cerca server Discord...",
    "home.allLanguages": "Tutte le lingue",
    "home.allCategories": "Tutte le categorie",
    "home.search": "Cerca",
    "home.popularCategories": "Categorie popolari",
    "home.bumpedTitle": "Server bumpati di recente",
    "home.noServers1": "Nessun server Discord inserito al momento.",
    "home.noServers2": "Sii il primo a registrare il tuo server.",
    "home.bestRatedTitle": "Server più votati",
    "home.noRated": "Nessuna valutazione al momento.",
  },

  pl: {
    "nav.servers": "Serwery",
    "nav.submit": "Dodaj serwer",
    "nav.shop": "Sklep",
    "nav.profile": "Profil",
    "nav.admin": "Admin",

    "home.title": "Znajdź serwery Discord na całym świecie",
    "home.subtitle": "Odkrywaj, oceniaj i bumpuj społeczności Discord na Asko Cafe.",
    "home.discover": "Odkryj serwery",
    "home.submit": "Dodaj serwer",
    "home.featuredTitle": "Polecane serwery Discord",
    "home.featuredMeta": "Premium & Partner",
    "home.noFeatured": "Brak polecanych serwerów.",
    "home.searchPlaceholder": "Szukaj serwerów Discord...",
    "home.allLanguages": "Wszystkie języki",
    "home.allCategories": "Wszystkie kategorie",
    "home.search": "Szukaj",
    "home.popularCategories": "Popularne kategorie",
    "home.bumpedTitle": "Ostatnio bumpowane serwery",
    "home.noServers1": "Nie dodano jeszcze żadnych serwerów Discord.",
    "home.noServers2": "Bądź pierwszy i zarejestruj swój serwer.",
    "home.bestRatedTitle": "Najlepiej oceniane serwery",
    "home.noRated": "Brak ocenionych serwerów.",
  },
} as const;

export type TranslationKey = keyof typeof translations.de;

export function normalizeLanguageCode(value: string | null | undefined): LanguageCode {
  if (value === "de" || value === "en" || value === "fr" || value === "it" || value === "pl") {
    return value;
  }

  return defaultLanguage;
}

export function t(language: LanguageCode, key: TranslationKey) {
  return translations[language][key] || translations.de[key] || key;
}
