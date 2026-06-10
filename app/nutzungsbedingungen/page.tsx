"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

type TermsText = {
  badge: string;
  title: string;
  intro: string;
  legalNote: string;

  providerTitle: string;
  providerText: string;
  imprint: string;

  platformTitle: string;
  platformText: string;

  registrationTitle: string;
  registrationText: string;

  dutiesTitle: string;
  dutiesText: string;

  responsibilityTitle: string;
  responsibilityText: string;

  forbiddenTitle: string;
  forbiddenIntro: string;
  forbiddenItems: string[];

  serverEntriesTitle: string;
  serverEntriesText: string;

  reviewsTitle: string;
  reviewsText: string;

  bumpTitle: string;
  bumpText: string;

  premiumTitle: string;
  premiumText1: string;
  premiumText2: string;

  moderationTitle: string;
  moderationIntro: string;
  moderationItems: string[];

  noClaimTitle: string;
  noClaimText: string;

  availabilityTitle: string;
  availabilityText: string;

  liabilityTitle: string;
  liabilityText1: string;
  liabilityText2: string;

  indemnityTitle: string;
  indemnityText: string;

  changesTitle: string;
  changesText: string;

  contactTitle: string;
  contactText: string;
  discordTicket: string;

  lawTitle: string;
  lawText: string;

  severabilityTitle: string;
  severabilityText: string;
};

const TERMS_TEXT: Record<UiLanguage, TermsText> = {
  de: {
    badge: "Regeln",
    title: "Nutzungsbedingungen",
    intro:
      "Diese Nutzungsbedingungen regeln die Nutzung von Asko Cafe. Mit der Registrierung, Anmeldung oder weiteren Nutzung der Website akzeptiert der Nutzer diese Nutzungsbedingungen in ihrer jeweils gültigen Fassung.",
    legalNote:
      "Die deutsche Fassung dieser Nutzungsbedingungen ist rechtlich maßgeblich. Übersetzungen dienen nur der besseren Verständlichkeit.",

    providerTitle: "1. Anbieter",
    providerText: "Anbieter und Kontaktmöglichkeiten ergeben sich aus dem",
    imprint: "Impressum",

    platformTitle: "2. Gegenstand der Plattform",
    platformText:
      "Asko Cafe ist eine Plattform zur Darstellung, Suche, Eintragung, Verwaltung, Bewertung und Moderation von Discord-Servern. Nutzer können Server einreichen, Serverprofile pflegen, Bewertungen abgeben, Meldungen einreichen und, sofern freigeschaltet, Premium- oder Partner-Funktionen nutzen.",

    registrationTitle: "3. Registrierung und Anmeldung",
    registrationText:
      "Bestimmte Funktionen setzen eine Registrierung oder Anmeldung voraus, insbesondere über Discord. Mit Registrierung oder Login bestätigt der Nutzer, diese Nutzungsbedingungen gelesen zu haben und ihnen zuzustimmen.",

    dutiesTitle: "4. Pflichten der Nutzer",
    dutiesText:
      "Nutzer sind verpflichtet, wahrheitsgemäße Angaben zu machen, keine fremden Rechte zu verletzen und keine Inhalte einzustellen, die gegen Gesetze, Discord-Regeln, Rechte Dritter oder diese Nutzungsbedingungen verstoßen.",

    responsibilityTitle: "5. Verantwortung für Serverinhalte",
    responsibilityText:
      "Für Inhalte, Regeln, Verhalten, Moderation und Rechtmäßigkeit eines eingetragenen Discord-Servers ist der jeweilige Serverbetreiber verantwortlich. Asko Cafe stellt lediglich eine Plattform zur Darstellung und Auffindbarkeit bereit.",

    forbiddenTitle: "6. Verbotene Inhalte und Handlungen",
    forbiddenIntro: "Untersagt sind insbesondere:",
    forbiddenItems: [
      "rechtswidrige Inhalte",
      "Hassrede, Drohungen, Beleidigungen oder Diskriminierung",
      "Spam, Scam, Phishing, Malware oder Betrugsversuche",
      "extremistische oder gewaltverherrlichende Inhalte",
      "sexuelle Inhalte ohne korrekte NSFW-Kennzeichnung",
      "Fake-Server, irreführende Angaben oder ablaufende Fake-Invites",
      "Missbrauch von Bewertungen, Meldungen oder Bump-Funktionen",
      "Umgehung von Sperren, Bans oder Moderationsmaßnahmen",
      "Verletzungen von Urheber-, Marken-, Persönlichkeits- oder Datenschutzrechten",
    ],

    serverEntriesTitle: "7. Servereinträge",
    serverEntriesText:
      "Servereinträge müssen korrekt und aktuell sein. Dazu gehören insbesondere Servername, Beschreibung, Kategorie, Sprache, Tags, NSFW-Angabe und Discord-Invite-Link. Der Serverbetreiber ist dafür verantwortlich, dass der Invite-Link funktionsfähig ist und keine rechtswidrigen oder irreführenden Inhalte beworben werden.",

    reviewsTitle: "8. Bewertungen und Meldungen",
    reviewsText:
      "Bewertungen müssen sachlich, fair und wahrheitsgemäß sein. Fake-Bewertungen, Beleidigungen, Spam oder Missbrauch des Meldesystems sind untersagt. Meldungen dürfen nur für echte Regelverstöße oder berechtigte Anliegen genutzt werden.",

    bumpTitle: "9. Bump-System",
    bumpText:
      "Das Bump-System darf nicht missbraucht werden. Automatisierter Missbrauch, Manipulationen, Spam oder Umgehungsversuche können zu Bump-Sperren, Einschränkungen oder weiteren Moderationsmaßnahmen führen.",

    premiumTitle: "10. Premium- und Partner-Funktionen",
    premiumText1:
      "Premium- und Partner-Funktionen können besondere Designs, Startseiten-Anzeigen, bessere Sichtbarkeit, verkürzte Bump-Zeiten oder andere Vorteile enthalten. Es besteht kein Anspruch auf bestimmte Reichweite, Mitgliederzahlen, Platzierungen oder wirtschaftlichen Erfolg.",
    premiumText2:
      "Solange der Shop nicht verfügbar ist, besteht kein Anspruch auf Kauf, Aktivierung oder dauerhafte Verfügbarkeit von Premium-Funktionen.",

    moderationTitle: "11. Moderationsrechte",
    moderationIntro:
      "Asko Cafe kann Servereinträge, Bewertungen, Meldungen und sonstige Inhalte prüfen und bei Verstößen Maßnahmen ergreifen. Dazu gehören insbesondere:",
    moderationItems: [
      "Annahme oder Ablehnung von Serverbewerbungen",
      "Bearbeitung oder Entfernung von Servereinträgen",
      "Verstecken oder Löschen von Bewertungen",
      "Bump-Sperren",
      "temporäre oder dauerhafte Sperrung eines Servers",
      "Ban oder Löschung eines Servereintrags",
      "Entzug von Premium- oder Partner-Status",
      "Weitergabe an zuständige Stellen, soweit rechtlich erforderlich",
    ],

    noClaimTitle: "12. Kein Anspruch auf Veröffentlichung",
    noClaimText:
      "Es besteht kein Anspruch darauf, dass eingereichte Server, Bewertungen oder sonstige Inhalte veröffentlicht, freigeschaltet oder dauerhaft angezeigt werden. Asko Cafe kann Inhalte aus Sicherheits-, Qualitäts-, Moderations- oder Rechtsgründen ablehnen, entfernen oder einschränken.",

    availabilityTitle: "13. Verfügbarkeit",
    availabilityText:
      "Es besteht kein Anspruch auf ununterbrochene Verfügbarkeit der Website oder einzelner Funktionen. Wartungen, Updates, technische Störungen, externe Ausfälle oder Sicherheitsmaßnahmen können die Nutzung einschränken.",

    liabilityTitle: "14. Haftung",
    liabilityText1:
      "Asko Cafe haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Bei leichter Fahrlässigkeit wird nur bei Verletzung wesentlicher Vertragspflichten gehaftet und nur in Höhe des vorhersehbaren, vertragstypischen Schadens. Eine weitergehende Haftung ist ausgeschlossen, soweit gesetzlich zulässig.",
    liabilityText2:
      "Für von Nutzern eingestellte Inhalte, externe Discord-Server, Discord-Invite-Links und externe Websites übernimmt Asko Cafe keine inhaltliche Verantwortung, solange keine konkrete Kenntnis von Rechtsverstößen besteht.",

    indemnityTitle: "15. Freistellung",
    indemnityText:
      "Nutzer stellen Asko Cafe von Ansprüchen Dritter frei, die aufgrund von rechtswidrigen, falschen oder vertragswidrigen Inhalten oder Handlungen des Nutzers entstehen, soweit der Nutzer den Verstoß zu vertreten hat. Dies umfasst auch angemessene Kosten der Rechtsverteidigung.",

    changesTitle: "16. Änderungen der Nutzungsbedingungen",
    changesText:
      "Asko Cafe kann diese Nutzungsbedingungen mit Wirkung für die Zukunft ändern, wenn technische, rechtliche oder organisatorische Gründe dies erforderlich machen. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar.",

    contactTitle: "17. Kontakt",
    contactText:
      "Bei Fragen zu diesen Nutzungsbedingungen, Sperren, Meldungen oder rechtlichen Anliegen kann Asko Cafe über das Discord-Ticketsystem oder per E-Mail kontaktiert werden.",
    discordTicket: "Discord-Ticketsystem",

    lawTitle: "18. Anwendbares Recht",
    lawText:
      "Es gilt das Recht der Bundesrepublik Deutschland, soweit dem keine zwingenden Verbraucherschutzvorschriften entgegenstehen.",

    severabilityTitle: "19. Salvatorische Klausel",
    severabilityText:
      "Sollte eine Bestimmung dieser Nutzungsbedingungen ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
  },

  en: {
    badge: "Rules",
    title: "Terms of Use",
    intro:
      "These Terms of Use govern the use of Asko Cafe. By registering, logging in or continuing to use the website, the user accepts these Terms of Use in their current version.",
    legalNote:
      "The German version of these Terms of Use is legally authoritative. Translations are provided for better understanding only.",

    providerTitle: "1. Provider",
    providerText: "Provider and contact details are available in the",
    imprint: "Imprint",

    platformTitle: "2. Purpose of the platform",
    platformText:
      "Asko Cafe is a platform for displaying, searching, submitting, managing, reviewing and moderating Discord servers. Users may submit servers, maintain server profiles, submit reviews, send reports and, where enabled, use premium or partner features.",

    registrationTitle: "3. Registration and login",
    registrationText:
      "Certain features require registration or login, especially via Discord. By registering or logging in, the user confirms that they have read and accepted these Terms of Use.",

    dutiesTitle: "4. User obligations",
    dutiesText:
      "Users must provide truthful information, respect third-party rights and must not submit content that violates laws, Discord rules, third-party rights or these Terms of Use.",

    responsibilityTitle: "5. Responsibility for server content",
    responsibilityText:
      "The respective server operator is responsible for the content, rules, behavior, moderation and legality of a listed Discord server. Asko Cafe only provides a platform for display and discoverability.",

    forbiddenTitle: "6. Prohibited content and actions",
    forbiddenIntro: "In particular, the following are prohibited:",
    forbiddenItems: [
      "illegal content",
      "hate speech, threats, insults or discrimination",
      "spam, scam, phishing, malware or fraud attempts",
      "extremist or glorifying violence content",
      "sexual content without correct NSFW labeling",
      "fake servers, misleading information or fake expiring invites",
      "abuse of reviews, reports or bump functions",
      "circumvention of locks, bans or moderation measures",
      "violations of copyright, trademark, personality or data protection rights",
    ],

    serverEntriesTitle: "7. Server entries",
    serverEntriesText:
      "Server entries must be correct and up to date. This includes server name, description, category, language, tags, NSFW status and Discord invite link. The server operator is responsible for ensuring that the invite link works and that no illegal or misleading content is promoted.",

    reviewsTitle: "8. Reviews and reports",
    reviewsText:
      "Reviews must be factual, fair and truthful. Fake reviews, insults, spam or abuse of the reporting system are prohibited. Reports may only be used for genuine rule violations or justified concerns.",

    bumpTitle: "9. Bump system",
    bumpText:
      "The bump system must not be abused. Automated abuse, manipulation, spam or circumvention attempts may result in bump bans, restrictions or further moderation measures.",

    premiumTitle: "10. Premium and partner features",
    premiumText1:
      "Premium and partner features may include special designs, homepage placement, better visibility, shorter bump times or other benefits. There is no entitlement to a specific reach, member count, placement or commercial success.",
    premiumText2:
      "As long as the shop is unavailable, there is no entitlement to purchase, activation or permanent availability of premium features.",

    moderationTitle: "11. Moderation rights",
    moderationIntro:
      "Asko Cafe may review server entries, reviews, reports and other content and take measures in case of violations. These include in particular:",
    moderationItems: [
      "approval or rejection of server applications",
      "editing or removal of server entries",
      "hiding or deleting reviews",
      "bump bans",
      "temporary or permanent locking of a server",
      "ban or deletion of a server entry",
      "removal of premium or partner status",
      "forwarding to competent authorities where legally required",
    ],

    noClaimTitle: "12. No entitlement to publication",
    noClaimText:
      "There is no entitlement for submitted servers, reviews or other content to be published, approved or permanently displayed. Asko Cafe may reject, remove or restrict content for security, quality, moderation or legal reasons.",

    availabilityTitle: "13. Availability",
    availabilityText:
      "There is no entitlement to uninterrupted availability of the website or individual functions. Maintenance, updates, technical issues, external outages or security measures may restrict use.",

    liabilityTitle: "14. Liability",
    liabilityText1:
      "Asko Cafe is fully liable for intent and gross negligence as well as for damages resulting from injury to life, body or health. In cases of slight negligence, liability exists only for breach of essential contractual obligations and is limited to the foreseeable, typical damage. Further liability is excluded to the extent permitted by law.",
    liabilityText2:
      "Asko Cafe assumes no responsibility for user-generated content, external Discord servers, Discord invite links and external websites as long as there is no concrete knowledge of legal violations.",

    indemnityTitle: "15. Indemnification",
    indemnityText:
      "Users indemnify Asko Cafe against third-party claims arising from illegal, false or contract-violating content or actions by the user, to the extent the user is responsible for the violation. This also includes reasonable legal defense costs.",

    changesTitle: "16. Changes to the Terms of Use",
    changesText:
      "Asko Cafe may amend these Terms of Use with future effect where technical, legal or organizational reasons require this. The current version is available on this page.",

    contactTitle: "17. Contact",
    contactText:
      "For questions about these Terms of Use, locks, reports or legal matters, Asko Cafe can be contacted via the Discord ticket system or by email.",
    discordTicket: "Discord ticket system",

    lawTitle: "18. Applicable law",
    lawText:
      "The law of the Federal Republic of Germany applies unless mandatory consumer protection provisions conflict with it.",

    severabilityTitle: "19. Severability clause",
    severabilityText:
      "If any provision of these Terms of Use is or becomes invalid in whole or in part, the validity of the remaining provisions remains unaffected.",
  },

  fr: {
    badge: "Règles",
    title: "Conditions d’utilisation",
    intro:
      "Ces conditions d’utilisation régissent l’utilisation d’Asko Cafe. En s’inscrivant, en se connectant ou en continuant à utiliser le site, l’utilisateur accepte ces conditions dans leur version actuelle.",
    legalNote:
      "La version allemande de ces conditions d’utilisation fait foi juridiquement. Les traductions servent uniquement à une meilleure compréhension.",

    providerTitle: "1. Fournisseur",
    providerText: "Les informations du fournisseur et les moyens de contact se trouvent dans les",
    imprint: "mentions légales",

    platformTitle: "2. Objet de la plateforme",
    platformText:
      "Asko Cafe est une plateforme permettant d’afficher, rechercher, soumettre, gérer, évaluer et modérer des serveurs Discord. Les utilisateurs peuvent soumettre des serveurs, gérer des profils, publier des avis, envoyer des signalements et, si activé, utiliser des fonctions Premium ou Partenaire.",

    registrationTitle: "3. Inscription et connexion",
    registrationText:
      "Certaines fonctions nécessitent une inscription ou une connexion, notamment via Discord. En s’inscrivant ou en se connectant, l’utilisateur confirme avoir lu et accepté ces conditions.",

    dutiesTitle: "4. Obligations des utilisateurs",
    dutiesText:
      "Les utilisateurs doivent fournir des informations véridiques, respecter les droits de tiers et ne pas publier de contenus contraires à la loi, aux règles de Discord, aux droits de tiers ou aux présentes conditions.",

    responsibilityTitle: "5. Responsabilité des contenus des serveurs",
    responsibilityText:
      "L’exploitant du serveur concerné est responsable des contenus, règles, comportements, modération et légalité d’un serveur Discord listé. Asko Cafe fournit uniquement une plateforme d’affichage et de recherche.",

    forbiddenTitle: "6. Contenus et actions interdits",
    forbiddenIntro: "Sont notamment interdits :",
    forbiddenItems: [
      "les contenus illégaux",
      "discours haineux, menaces, insultes ou discrimination",
      "spam, arnaques, phishing, malware ou tentatives de fraude",
      "contenus extrémistes ou glorifiant la violence",
      "contenus sexuels sans marquage NSFW correct",
      "faux serveurs, informations trompeuses ou faux liens d’invitation expirables",
      "abus des avis, signalements ou fonctions bump",
      "contournement des blocages, bans ou mesures de modération",
      "atteintes aux droits d’auteur, marques, personnalité ou protection des données",
    ],

    serverEntriesTitle: "7. Entrées de serveurs",
    serverEntriesText:
      "Les entrées de serveurs doivent être correctes et à jour. Cela inclut le nom, la description, la catégorie, la langue, les tags, l’indication NSFW et le lien d’invitation Discord. L’exploitant du serveur est responsable du bon fonctionnement du lien et de l’absence de contenu illégal ou trompeur.",

    reviewsTitle: "8. Avis et signalements",
    reviewsText:
      "Les avis doivent être factuels, équitables et véridiques. Les faux avis, insultes, spams ou abus du système de signalement sont interdits. Les signalements ne doivent être utilisés que pour de réelles violations ou demandes justifiées.",

    bumpTitle: "9. Système de bump",
    bumpText:
      "Le système de bump ne doit pas être abusé. L’abus automatisé, la manipulation, le spam ou les tentatives de contournement peuvent entraîner des blocages de bump, restrictions ou autres mesures de modération.",

    premiumTitle: "10. Fonctions Premium et Partenaire",
    premiumText1:
      "Les fonctions Premium et Partenaire peuvent inclure des designs spéciaux, une mise en avant sur la page d’accueil, une meilleure visibilité, des temps de bump réduits ou d’autres avantages. Aucun droit à une portée, un nombre de membres, un placement ou un succès économique déterminé n’existe.",
    premiumText2:
      "Tant que la boutique n’est pas disponible, aucun droit à l’achat, l’activation ou la disponibilité permanente de fonctions Premium n’existe.",

    moderationTitle: "11. Droits de modération",
    moderationIntro:
      "Asko Cafe peut vérifier les entrées de serveurs, avis, signalements et autres contenus et prendre des mesures en cas de violation. Cela comprend notamment :",
    moderationItems: [
      "acceptation ou refus des candidatures de serveurs",
      "modification ou suppression d’entrées de serveurs",
      "masquage ou suppression d’avis",
      "blocages de bump",
      "blocage temporaire ou permanent d’un serveur",
      "ban ou suppression d’une entrée de serveur",
      "retrait du statut Premium ou Partenaire",
      "transmission aux autorités compétentes si légalement nécessaire",
    ],

    noClaimTitle: "12. Aucun droit à la publication",
    noClaimText:
      "Il n’existe aucun droit à ce que des serveurs, avis ou autres contenus soumis soient publiés, approuvés ou affichés durablement. Asko Cafe peut refuser, supprimer ou restreindre des contenus pour des raisons de sécurité, qualité, modération ou droit.",

    availabilityTitle: "13. Disponibilité",
    availabilityText:
      "Il n’existe aucun droit à une disponibilité ininterrompue du site ou de certaines fonctions. Maintenance, mises à jour, problèmes techniques, pannes externes ou mesures de sécurité peuvent limiter l’utilisation.",

    liabilityTitle: "14. Responsabilité",
    liabilityText1:
      "Asko Cafe est pleinement responsable en cas d’intention ou de négligence grave ainsi qu’en cas d’atteinte à la vie, au corps ou à la santé. En cas de négligence légère, la responsabilité n’existe qu’en cas de violation d’obligations contractuelles essentielles et est limitée au dommage prévisible et typique. Toute responsabilité supplémentaire est exclue dans la mesure permise par la loi.",
    liabilityText2:
      "Asko Cafe n’assume aucune responsabilité de contenu pour les contenus utilisateurs, serveurs Discord externes, liens d’invitation Discord et sites externes tant qu’aucune connaissance concrète de violation juridique n’existe.",

    indemnityTitle: "15. Indemnisation",
    indemnityText:
      "Les utilisateurs indemnisent Asko Cafe contre les réclamations de tiers résultant de contenus ou actions illégaux, faux ou contraires au contrat, dans la mesure où l’utilisateur est responsable de la violation. Cela inclut les frais raisonnables de défense juridique.",

    changesTitle: "16. Modifications des conditions",
    changesText:
      "Asko Cafe peut modifier ces conditions avec effet futur si des raisons techniques, juridiques ou organisationnelles l’exigent. La version actuelle est disponible sur cette page.",

    contactTitle: "17. Contact",
    contactText:
      "Pour toute question concernant ces conditions, blocages, signalements ou sujets juridiques, Asko Cafe peut être contacté via le système de tickets Discord ou par e-mail.",
    discordTicket: "système de tickets Discord",

    lawTitle: "18. Droit applicable",
    lawText:
      "Le droit de la République fédérale d’Allemagne s’applique, sauf dispositions impératives de protection des consommateurs contraires.",

    severabilityTitle: "19. Clause de sauvegarde",
    severabilityText:
      "Si une disposition de ces conditions est ou devient invalide en tout ou partie, la validité des autres dispositions reste inchangée.",
  },

  it: {
    badge: "Regole",
    title: "Condizioni d’uso",
    intro:
      "Queste condizioni d’uso regolano l’utilizzo di Asko Cafe. Registrandosi, accedendo o continuando a usare il sito, l’utente accetta queste condizioni nella versione vigente.",
    legalNote:
      "La versione tedesca di queste condizioni d’uso è giuridicamente vincolante. Le traduzioni servono solo per una migliore comprensione.",

    providerTitle: "1. Fornitore",
    providerText: "I dati del fornitore e i contatti sono disponibili nell",
    imprint: "Impressum",

    platformTitle: "2. Oggetto della piattaforma",
    platformText:
      "Asko Cafe è una piattaforma per mostrare, cercare, inserire, gestire, recensire e moderare server Discord. Gli utenti possono inserire server, gestire profili, scrivere recensioni, inviare segnalazioni e, se abilitato, usare funzioni Premium o Partner.",

    registrationTitle: "3. Registrazione e login",
    registrationText:
      "Alcune funzioni richiedono registrazione o login, in particolare tramite Discord. Registrandosi o accedendo, l’utente conferma di aver letto e accettato queste condizioni.",

    dutiesTitle: "4. Obblighi degli utenti",
    dutiesText:
      "Gli utenti devono fornire informazioni veritiere, rispettare i diritti di terzi e non pubblicare contenuti contrari alla legge, alle regole di Discord, ai diritti di terzi o a queste condizioni.",

    responsibilityTitle: "5. Responsabilità per i contenuti dei server",
    responsibilityText:
      "Il rispettivo gestore del server è responsabile dei contenuti, regole, comportamento, moderazione e legalità di un server Discord inserito. Asko Cafe fornisce solo una piattaforma di visualizzazione e ricerca.",

    forbiddenTitle: "6. Contenuti e azioni vietati",
    forbiddenIntro: "Sono in particolare vietati:",
    forbiddenItems: [
      "contenuti illegali",
      "odio, minacce, insulti o discriminazione",
      "spam, scam, phishing, malware o tentativi di frode",
      "contenuti estremisti o che glorificano la violenza",
      "contenuti sessuali senza corretta indicazione NSFW",
      "server falsi, informazioni fuorvianti o falsi invite in scadenza",
      "abuso di recensioni, segnalazioni o funzioni bump",
      "aggiramento di blocchi, ban o misure di moderazione",
      "violazioni di copyright, marchi, diritti della personalità o protezione dati",
    ],

    serverEntriesTitle: "7. Inserimenti dei server",
    serverEntriesText:
      "Gli inserimenti dei server devono essere corretti e aggiornati. Ciò include nome, descrizione, categoria, lingua, tag, indicazione NSFW e link invito Discord. Il gestore del server è responsabile del funzionamento del link e dell’assenza di contenuti illegali o fuorvianti.",

    reviewsTitle: "8. Recensioni e segnalazioni",
    reviewsText:
      "Le recensioni devono essere oggettive, corrette e veritiere. Recensioni false, insulti, spam o abuso del sistema di segnalazione sono vietati. Le segnalazioni devono essere usate solo per reali violazioni o richieste giustificate.",

    bumpTitle: "9. Sistema bump",
    bumpText:
      "Il sistema bump non deve essere abusato. Abuso automatizzato, manipolazione, spam o tentativi di aggiramento possono comportare blocchi bump, restrizioni o ulteriori misure di moderazione.",

    premiumTitle: "10. Funzioni Premium e Partner",
    premiumText1:
      "Le funzioni Premium e Partner possono includere design speciali, visibilità in homepage, maggiore visibilità, tempi bump ridotti o altri vantaggi. Non esiste diritto a una determinata portata, numero di membri, posizione o successo economico.",
    premiumText2:
      "Finché lo shop non è disponibile, non esiste diritto all’acquisto, attivazione o disponibilità permanente delle funzioni Premium.",

    moderationTitle: "11. Diritti di moderazione",
    moderationIntro:
      "Asko Cafe può controllare server, recensioni, segnalazioni e altri contenuti e prendere misure in caso di violazioni. Ciò include in particolare:",
    moderationItems: [
      "approvazione o rifiuto delle candidature dei server",
      "modifica o rimozione di server",
      "nascondere o eliminare recensioni",
      "blocchi bump",
      "blocco temporaneo o permanente di un server",
      "ban o eliminazione di un server",
      "rimozione dello stato Premium o Partner",
      "inoltro alle autorità competenti se legalmente necessario",
    ],

    noClaimTitle: "12. Nessun diritto alla pubblicazione",
    noClaimText:
      "Non esiste diritto alla pubblicazione, approvazione o visualizzazione permanente di server, recensioni o altri contenuti inviati. Asko Cafe può rifiutare, rimuovere o limitare contenuti per ragioni di sicurezza, qualità, moderazione o legge.",

    availabilityTitle: "13. Disponibilità",
    availabilityText:
      "Non esiste diritto alla disponibilità ininterrotta del sito o di singole funzioni. Manutenzione, aggiornamenti, problemi tecnici, guasti esterni o misure di sicurezza possono limitare l’uso.",

    liabilityTitle: "14. Responsabilità",
    liabilityText1:
      "Asko Cafe risponde pienamente in caso di dolo e colpa grave nonché per danni alla vita, al corpo o alla salute. In caso di colpa lieve, la responsabilità sussiste solo per violazione di obblighi contrattuali essenziali ed è limitata al danno prevedibile e tipico. Ulteriore responsabilità è esclusa nella misura consentita dalla legge.",
    liabilityText2:
      "Asko Cafe non assume responsabilità per contenuti degli utenti, server Discord esterni, link invito Discord e siti esterni finché non vi è conoscenza concreta di violazioni legali.",

    indemnityTitle: "15. Manleva",
    indemnityText:
      "Gli utenti manlevano Asko Cafe da pretese di terzi derivanti da contenuti o azioni illegali, false o contrarie al contratto, nella misura in cui l’utente sia responsabile della violazione. Ciò include anche costi ragionevoli di difesa legale.",

    changesTitle: "16. Modifiche delle condizioni",
    changesText:
      "Asko Cafe può modificare queste condizioni con effetto futuro se motivi tecnici, legali o organizzativi lo richiedono. La versione attuale è disponibile su questa pagina.",

    contactTitle: "17. Contatto",
    contactText:
      "Per domande su queste condizioni, blocchi, segnalazioni o questioni legali, Asko Cafe può essere contattato tramite sistema ticket Discord o e-mail.",
    discordTicket: "sistema ticket Discord",

    lawTitle: "18. Legge applicabile",
    lawText:
      "Si applica il diritto della Repubblica Federale di Germania, salvo norme obbligatorie di tutela dei consumatori.",

    severabilityTitle: "19. Clausola salvatoria",
    severabilityText:
      "Se una disposizione di queste condizioni è o diventa invalida in tutto o in parte, la validità delle restanti disposizioni rimane invariata.",
  },

  pl: {
    badge: "Zasady",
    title: "Warunki korzystania",
    intro:
      "Niniejsze warunki korzystania regulują korzystanie z Asko Cafe. Rejestrując się, logując lub dalej korzystając ze strony, użytkownik akceptuje aktualną wersję tych warunków.",
    legalNote:
      "Niemiecka wersja tych warunków korzystania jest prawnie wiążąca. Tłumaczenia służą wyłącznie lepszemu zrozumieniu.",

    providerTitle: "1. Dostawca",
    providerText: "Dane dostawcy i możliwości kontaktu znajdują się w",
    imprint: "Impressum",

    platformTitle: "2. Cel platformy",
    platformText:
      "Asko Cafe to platforma do wyświetlania, wyszukiwania, dodawania, zarządzania, oceniania i moderowania serwerów Discord. Użytkownicy mogą dodawać serwery, zarządzać profilami, dodawać oceny, wysyłać zgłoszenia oraz, jeśli aktywne, korzystać z funkcji Premium lub Partner.",

    registrationTitle: "3. Rejestracja i logowanie",
    registrationText:
      "Niektóre funkcje wymagają rejestracji lub logowania, zwłaszcza przez Discord. Rejestrując się lub logując, użytkownik potwierdza, że przeczytał i zaakceptował te warunki.",

    dutiesTitle: "4. Obowiązki użytkowników",
    dutiesText:
      "Użytkownicy muszą podawać prawdziwe informacje, respektować prawa osób trzecich i nie publikować treści sprzecznych z prawem, zasadami Discord, prawami osób trzecich lub tymi warunkami.",

    responsibilityTitle: "5. Odpowiedzialność za treści serwerów",
    responsibilityText:
      "Za treści, zasady, zachowanie, moderację i legalność dodanego serwera Discord odpowiada operator danego serwera. Asko Cafe udostępnia jedynie platformę do prezentacji i wyszukiwania.",

    forbiddenTitle: "6. Zabronione treści i działania",
    forbiddenIntro: "Zabronione są w szczególności:",
    forbiddenItems: [
      "treści nielegalne",
      "mowa nienawiści, groźby, obrażanie lub dyskryminacja",
      "spam, scam, phishing, malware lub próby oszustwa",
      "treści ekstremistyczne lub gloryfikujące przemoc",
      "treści seksualne bez prawidłowego oznaczenia NSFW",
      "fałszywe serwery, mylące informacje lub fałszywe wygasające zaproszenia",
      "nadużywanie ocen, zgłoszeń lub funkcji bump",
      "omijanie blokad, banów lub środków moderacyjnych",
      "naruszenia praw autorskich, znaków towarowych, dóbr osobistych lub ochrony danych",
    ],

    serverEntriesTitle: "7. Wpisy serwerów",
    serverEntriesText:
      "Wpisy serwerów muszą być poprawne i aktualne. Dotyczy to nazwy, opisu, kategorii, języka, tagów, oznaczenia NSFW i linku zaproszenia Discord. Operator serwera odpowiada za działanie linku oraz brak nielegalnych lub wprowadzających w błąd treści.",

    reviewsTitle: "8. Oceny i zgłoszenia",
    reviewsText:
      "Oceny muszą być rzeczowe, uczciwe i prawdziwe. Fałszywe oceny, obrażanie, spam lub nadużywanie systemu zgłoszeń są zabronione. Zgłoszenia mogą być używane tylko przy rzeczywistych naruszeniach lub uzasadnionych sprawach.",

    bumpTitle: "9. System bump",
    bumpText:
      "System bump nie może być nadużywany. Automatyczne nadużycia, manipulacje, spam lub próby obejścia mogą skutkować blokadami bump, ograniczeniami lub dalszymi środkami moderacyjnymi.",

    premiumTitle: "10. Funkcje Premium i Partner",
    premiumText1:
      "Funkcje Premium i Partner mogą obejmować specjalne designy, widoczność na stronie głównej, lepszą widoczność, krótsze czasy bump lub inne korzyści. Nie ma prawa do określonego zasięgu, liczby członków, pozycji lub sukcesu ekonomicznego.",
    premiumText2:
      "Dopóki sklep nie jest dostępny, nie istnieje prawo do zakupu, aktywacji lub trwałej dostępności funkcji Premium.",

    moderationTitle: "11. Prawa moderacyjne",
    moderationIntro:
      "Asko Cafe może sprawdzać wpisy serwerów, oceny, zgłoszenia i inne treści oraz podejmować działania w przypadku naruszeń. Obejmuje to w szczególności:",
    moderationItems: [
      "akceptację lub odrzucenie zgłoszeń serwerów",
      "edycję lub usunięcie wpisów serwerów",
      "ukrywanie lub usuwanie ocen",
      "blokady bump",
      "tymczasowe lub trwałe zablokowanie serwera",
      "ban lub usunięcie wpisu serwera",
      "odebranie statusu Premium lub Partner",
      "przekazanie właściwym organom, jeśli jest to prawnie wymagane",
    ],

    noClaimTitle: "12. Brak prawa do publikacji",
    noClaimText:
      "Nie istnieje prawo do publikacji, akceptacji lub trwałego wyświetlania dodanych serwerów, ocen lub innych treści. Asko Cafe może odrzucać, usuwać lub ograniczać treści ze względów bezpieczeństwa, jakości, moderacji lub prawa.",

    availabilityTitle: "13. Dostępność",
    availabilityText:
      "Nie istnieje prawo do nieprzerwanej dostępności strony lub poszczególnych funkcji. Prace techniczne, aktualizacje, problemy techniczne, awarie zewnętrzne lub środki bezpieczeństwa mogą ograniczać korzystanie.",

    liabilityTitle: "14. Odpowiedzialność",
    liabilityText1:
      "Asko Cafe ponosi pełną odpowiedzialność za umyślne działanie i rażące niedbalstwo oraz za szkody dotyczące życia, ciała lub zdrowia. Przy lekkim niedbalstwie odpowiedzialność istnieje tylko przy naruszeniu istotnych obowiązków umownych i jest ograniczona do przewidywalnej, typowej szkody. Dalsza odpowiedzialność jest wyłączona w zakresie dopuszczalnym przez prawo.",
    liabilityText2:
      "Asko Cafe nie ponosi odpowiedzialności za treści użytkowników, zewnętrzne serwery Discord, linki zaproszeń Discord i strony zewnętrzne, dopóki nie ma konkretnej wiedzy o naruszeniach prawa.",

    indemnityTitle: "15. Zwolnienie z roszczeń",
    indemnityText:
      "Użytkownicy zwalniają Asko Cafe z roszczeń osób trzecich wynikających z nielegalnych, fałszywych lub sprzecznych z umową treści lub działań użytkownika, o ile użytkownik odpowiada za naruszenie. Obejmuje to również uzasadnione koszty obrony prawnej.",

    changesTitle: "16. Zmiany warunków",
    changesText:
      "Asko Cafe może zmieniać te warunki ze skutkiem na przyszłość, jeśli wymagają tego względy techniczne, prawne lub organizacyjne. Aktualna wersja jest dostępna na tej stronie.",

    contactTitle: "17. Kontakt",
    contactText:
      "W przypadku pytań dotyczących tych warunków, blokad, zgłoszeń lub spraw prawnych można skontaktować się z Asko Cafe przez system ticketów Discord lub e-mail.",
    discordTicket: "system ticketów Discord",

    lawTitle: "18. Prawo właściwe",
    lawText:
      "Obowiązuje prawo Republiki Federalnej Niemiec, o ile nie sprzeciwiają się temu bezwzględnie obowiązujące przepisy ochrony konsumentów.",

    severabilityTitle: "19. Klauzula salwatoryjna",
    severabilityText:
      "Jeśli jakiekolwiek postanowienie tych warunków jest lub stanie się nieważne w całości lub części, ważność pozostałych postanowień pozostaje nienaruszona.",
  },
};

function normalizeLanguage(value: unknown): UiLanguage {
  const language = String(value ?? "").trim().toLowerCase();

  if (language === "en") return "en";
  if (language === "fr") return "fr";
  if (language === "it") return "it";
  if (language === "pl") return "pl";

  return "de";
}

export default function NutzungsbedingungenPage() {
  const language = normalizeLanguage(useLanguage());
  const text = TERMS_TEXT[language];

  return (
    <main className="legal-page">
      <section className="legal-card">
        <span className="page-badge">📜 {text.badge}</span>
        <h1>{text.title}</h1>

        <p>{text.intro}</p>
        <p className="legal-small">{text.legalNote}</p>

        <h2>{text.providerTitle}</h2>
        <p>
          {text.providerText}{" "}
          <Link href="/impressum">{text.imprint}</Link>.
        </p>

        <h2>{text.platformTitle}</h2>
        <p>{text.platformText}</p>

        <h2>{text.registrationTitle}</h2>
        <p>{text.registrationText}</p>

        <h2>{text.dutiesTitle}</h2>
        <p>{text.dutiesText}</p>

        <h2>{text.responsibilityTitle}</h2>
        <p>{text.responsibilityText}</p>

        <h2>{text.forbiddenTitle}</h2>
        <p>{text.forbiddenIntro}</p>
        <ul>
          {text.forbiddenItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{text.serverEntriesTitle}</h2>
        <p>{text.serverEntriesText}</p>

        <h2>{text.reviewsTitle}</h2>
        <p>{text.reviewsText}</p>

        <h2>{text.bumpTitle}</h2>
        <p>{text.bumpText}</p>

        <h2>{text.premiumTitle}</h2>
        <p>{text.premiumText1}</p>
        <p>{text.premiumText2}</p>

        <h2>{text.moderationTitle}</h2>
        <p>{text.moderationIntro}</p>
        <ul>
          {text.moderationItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{text.noClaimTitle}</h2>
        <p>{text.noClaimText}</p>

        <h2>{text.availabilityTitle}</h2>
        <p>{text.availabilityText}</p>

        <h2>{text.liabilityTitle}</h2>
        <p>{text.liabilityText1}</p>
        <p>{text.liabilityText2}</p>

        <h2>{text.indemnityTitle}</h2>
        <p>{text.indemnityText}</p>

        <h2>{text.changesTitle}</h2>
        <p>{text.changesText}</p>

        <h2>{text.contactTitle}</h2>
        <p>
          {text.contactText}{" "}
          <a href="https://discord.gg/asko" target="_blank" rel="noreferrer">
            {text.discordTicket}
          </a>{" "}
          · <a href="mailto:dcaskocafe@gmail.com">dcaskocafe@gmail.com</a>
        </p>

        <h2>{text.lawTitle}</h2>
        <p>{text.lawText}</p>

        <h2>{text.severabilityTitle}</h2>
        <p>{text.severabilityText}</p>
      </section>
    </main>
  );
}
