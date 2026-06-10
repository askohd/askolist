"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const SUPPORT_EMAIL = "dcaskocafe@gmail.com";
const DISCORD_INVITE_URL = "https://discord.gg/askocafe";

const TERMS_TEXT = {
  de: {
    badge: "📜 Regeln",
    title: "Nutzungsbedingungen",
    intro:
      "Diese Nutzungsbedingungen regeln die Nutzung von Asko Cafe. Mit der Registrierung, Anmeldung, dem Einreichen eines Servers oder der weiteren Nutzung der Plattform akzeptierst du diese Bedingungen.",
    sideTitle: "Wichtig",
    sideText:
      "Wer einen Server einträgt, Bewertungen schreibt oder Meldungen erstellt, muss sich an diese Regeln halten.",
    impressum: "Impressum",
    privacy: "Datenschutzerklärung",
    support: "Support kontaktieren",
    discordSupport: "Discord-Support öffnen",
    emailLabel: SUPPORT_EMAIL,
    sections: [
      {
        title: "1. Anbieter",
        paragraphs: [
          "Anbieter der Plattform Asko Cafe ist der im Impressum genannte Diensteanbieter.",
        ],
      },
      {
        title: "2. Gegenstand der Plattform",
        paragraphs: [
          "Asko Cafe ist eine Plattform zur Darstellung, Suche, Eintragung, Verwaltung, Bewertung und Moderation von Discord-Servern. Nutzer können Server einreichen, Serverprofile ansehen, Bewertungen abgeben, Server melden und, sofern verfügbar, Premium- oder Partnerfunktionen nutzen.",
        ],
      },
      {
        title: "3. Registrierung und Anmeldung",
        paragraphs: [
          "Bestimmte Funktionen setzen eine Anmeldung voraus, insbesondere über Discord. Mit der Anmeldung bestätigst du, dass die angegebenen Daten richtig sind und du dein Konto nicht missbräuchlich nutzt.",
          "Du bist dafür verantwortlich, dass dein Discord-Konto sicher bleibt. Wenn du den Verdacht hast, dass dein Konto missbraucht wurde, solltest du uns schnellstmöglich kontaktieren.",
        ],
      },
      {
        title: "4. Einreichen von Servern",
        paragraphs: [
          "Wenn du einen Server einreichst, bestätigst du, dass du berechtigt bist, diesen Server auf Asko Cafe einzutragen, und dass die angegebenen Inhalte korrekt sind.",
        ],
        items: [
          "Der Invite-Link muss funktionieren und darf nicht irreführend sein.",
          "Servername, Beschreibung, Tags, Banner und Logo müssen wahrheitsgemäß sein.",
          "NSFW- oder sensible Inhalte müssen korrekt gekennzeichnet werden.",
          "Du darfst keine fremden Rechte verletzen.",
          "Du darfst keine Inhalte eintragen, die gegen Gesetze oder Discord-Regeln verstoßen.",
        ],
      },
      {
        title: "5. Freigabe und Moderation",
        paragraphs: [
          "Eingereichte Server können durch das Team geprüft, angenommen, abgelehnt, eingeschränkt, gesperrt, gebannt oder gelöscht werden. Ein Anspruch auf Aufnahme, Sichtbarkeit, Premium-Platzierung oder dauerhafte Veröffentlichung besteht nicht.",
          "Asko Cafe kann Maßnahmen ergreifen, wenn Inhalte gegen diese Bedingungen, gesetzliche Vorgaben, Discord-Regeln oder die Sicherheit der Plattform verstoßen.",
        ],
      },
      {
        title: "6. Bewertungen und Meldungen",
        paragraphs: [
          "Bewertungen sollen ehrlich, sachlich und fair sein. Es ist verboten, Bewertungen zu manipulieren, Fake-Bewertungen abzugeben, andere Nutzer zu beleidigen oder Bewertungen für Spam, Werbung oder Schädigung anderer Server zu missbrauchen.",
          "Meldungen dürfen nur für echte Probleme genutzt werden. Missbräuchliche oder falsche Meldungen können zur Einschränkung deines Kontos führen.",
        ],
      },
      {
        title: "7. Verbotene Inhalte und Handlungen",
        paragraphs: ["Untersagt sind insbesondere:"],
        items: [
          "rechtswidrige Inhalte,",
          "Hassrede, Drohungen, Beleidigungen oder Diskriminierung,",
          "extremistische, terroristische oder gewaltverherrlichende Inhalte,",
          "sexuelle Inhalte mit Minderjährigen oder sonstige illegale sexuelle Inhalte,",
          "Betrug, Phishing, Scam, Malware, Token-Grabber oder Schadsoftware,",
          "Spam, Fake-Server, irreführende Angaben oder manipulierte Bewertungen,",
          "Verletzung von Marken-, Urheber-, Namens- oder Persönlichkeitsrechten,",
          "Umgehung von Sperren, Banns, Bump-Sperren oder Sicherheitsmaßnahmen,",
          "automatisierte Nutzung, Scraping oder Angriffe auf die Plattform ohne Erlaubnis.",
        ],
      },
      {
        title: "8. Bump-System",
        paragraphs: [
          "Das Bump-System dient dazu, aktive Server sichtbarer zu machen. Es darf nicht manipuliert, automatisiert missbraucht oder durch mehrere Konten unfair ausgenutzt werden. Bei Missbrauch können Bump-Sperren oder weitere Moderationsmaßnahmen verhängt werden.",
        ],
      },
      {
        title: "9. Premium- und Partnerfunktionen",
        paragraphs: [
          "Premium- und Partnerfunktionen können zusätzliche Sichtbarkeit, Designoptionen, besondere Layouts, kürzere Bump-Zeiten oder Hervorhebungen bieten. Der genaue Leistungsumfang kann sich ändern, insbesondere solange Asko Cafe weiterentwickelt wird.",
          "Ein Premium- oder Partnerstatus berechtigt nicht dazu, gegen Regeln zu verstoßen. Auch Premium- und Partner-Server können moderiert, eingeschränkt oder entfernt werden.",
        ],
      },
      {
        title: "10. Verfügbarkeit",
        paragraphs: [
          "Wir bemühen uns um einen stabilen Betrieb. Eine jederzeitige Verfügbarkeit der Website, Datenbank, Bot-Funktionen, Discord-API, Invite-Links oder Premium-Funktionen kann jedoch nicht garantiert werden.",
        ],
      },
      {
        title: "11. Nutzerinhalte und Rechte",
        paragraphs: [
          "Du behältst grundsätzlich deine Rechte an deinen eigenen Inhalten. Du räumst Asko Cafe jedoch das Recht ein, die von dir eingereichten Inhalte auf der Plattform darzustellen, technisch zu verarbeiten, zu speichern, zu prüfen, zu moderieren und für die Serverdarstellung zu nutzen.",
        ],
      },
      {
        title: "12. Löschung und Einschränkung",
        paragraphs: [
          "Du kannst die Löschung oder Änderung deiner Inhalte anfragen. Wir können Inhalte außerdem entfernen, wenn sie nicht mehr aktuell sind, gegen Regeln verstoßen, Rechte verletzen oder die Sicherheit der Plattform gefährden.",
        ],
      },
      {
        title: "13. Haftung",
        paragraphs: [
          "Asko Cafe haftet nur nach den gesetzlichen Vorschriften. Für Inhalte von Nutzern und für externe Discord-Server sind grundsätzlich die jeweiligen Nutzer oder Serverbetreiber verantwortlich. Für externe Links übernehmen wir keine Verantwortung.",
        ],
      },
      {
        title: "14. Änderungen der Plattform und Bedingungen",
        paragraphs: [
          "Asko Cafe befindet sich im Aufbau und kann Funktionen ändern, erweitern oder entfernen. Diese Nutzungsbedingungen können angepasst werden, wenn sich Funktionen, rechtliche Anforderungen oder Abläufe ändern. Es gilt die jeweils veröffentlichte Fassung.",
        ],
      },
      {
        title: "15. Kontakt",
        paragraphs: [
          "Fragen, Beschwerden, Partnerschaften, Eventideen oder Hinweise auf Regelverstöße können über den Discord-Support oder per E-Mail eingereicht werden.",
        ],
      },
      {
        title: "16. Anwendbares Recht",
        paragraphs: [
          "Es gilt das Recht der Bundesrepublik Deutschland, soweit dem keine zwingenden Verbraucherschutzvorschriften entgegenstehen.",
        ],
      },
    ],
  },

  en: {
    badge: "📜 Rules",
    title: "Terms of Use",
    intro:
      "These Terms of Use govern the use of Asko Cafe. By registering, logging in, submitting a server or continuing to use the platform, you accept these terms.",
    sideTitle: "Important",
    sideText:
      "Anyone who submits a server, writes reviews or creates reports must follow these rules.",
    impressum: "Legal Notice",
    privacy: "Privacy Policy",
    support: "Contact support",
    discordSupport: "Open Discord support",
    emailLabel: SUPPORT_EMAIL,
    sections: [
      {
        title: "1. Provider",
        paragraphs: [
          "The provider of the Asko Cafe platform is the service provider named in the legal notice.",
        ],
      },
      {
        title: "2. Purpose of the platform",
        paragraphs: [
          "Asko Cafe is a platform for displaying, searching, submitting, managing, reviewing and moderating Discord servers. Users can submit servers, view server profiles, write reviews, report servers and, where available, use premium or partner features.",
        ],
      },
      {
        title: "3. Registration and login",
        paragraphs: [
          "Certain features require login, especially through Discord. By logging in, you confirm that the provided data is correct and that you will not misuse your account.",
          "You are responsible for keeping your Discord account secure. If you suspect misuse of your account, you should contact us as soon as possible.",
        ],
      },
      {
        title: "4. Submitting servers",
        paragraphs: [
          "When submitting a server, you confirm that you are authorized to list that server on Asko Cafe and that the submitted information is accurate.",
        ],
        items: [
          "The invite link must work and must not be misleading.",
          "Server name, description, tags, banner and logo must be truthful.",
          "NSFW or sensitive content must be correctly marked.",
          "You must not violate third-party rights.",
          "You must not submit content that violates laws or Discord rules.",
        ],
      },
      {
        title: "5. Approval and moderation",
        paragraphs: [
          "Submitted servers may be reviewed, accepted, rejected, restricted, locked, banned or deleted by the team. There is no entitlement to listing, visibility, premium placement or permanent publication.",
          "Asko Cafe may take action when content violates these terms, legal requirements, Discord rules or the security of the platform.",
        ],
      },
      {
        title: "6. Reviews and reports",
        paragraphs: [
          "Reviews should be honest, factual and fair. It is forbidden to manipulate reviews, create fake reviews, insult other users or misuse reviews for spam, advertising or harming other servers.",
          "Reports may only be used for genuine issues. Abusive or false reports may lead to restrictions on your account.",
        ],
      },
      {
        title: "7. Prohibited content and actions",
        paragraphs: ["In particular, the following are prohibited:"],
        items: [
          "illegal content,",
          "hate speech, threats, insults or discrimination,",
          "extremist, terrorist or glorifying violent content,",
          "sexual content involving minors or other illegal sexual content,",
          "fraud, phishing, scams, malware, token grabbers or harmful software,",
          "spam, fake servers, misleading information or manipulated reviews,",
          "violations of trademark, copyright, name or personality rights,",
          "circumvention of locks, bans, bump bans or security measures,",
          "automated use, scraping or attacks on the platform without permission.",
        ],
      },
      {
        title: "8. Bump system",
        paragraphs: [
          "The bump system is intended to make active servers more visible. It must not be manipulated, automated, abused or unfairly exploited through multiple accounts. Abuse may result in bump bans or further moderation actions.",
        ],
      },
      {
        title: "9. Premium and partner features",
        paragraphs: [
          "Premium and partner features may offer additional visibility, design options, special layouts, shorter bump times or highlights. The exact scope of features may change, especially while Asko Cafe is still being developed.",
          "Premium or partner status does not allow rule violations. Premium and partner servers may also be moderated, restricted or removed.",
        ],
      },
      {
        title: "10. Availability",
        paragraphs: [
          "We try to operate the platform reliably. However, constant availability of the website, database, bot functions, Discord API, invite links or premium features cannot be guaranteed.",
        ],
      },
      {
        title: "11. User content and rights",
        paragraphs: [
          "You generally retain your rights to your own content. However, you grant Asko Cafe the right to display, technically process, store, review, moderate and use the content you submit for server presentation on the platform.",
        ],
      },
      {
        title: "12. Deletion and restriction",
        paragraphs: [
          "You may request deletion or modification of your content. We may also remove content if it is outdated, violates rules, infringes rights or endangers the security of the platform.",
        ],
      },
      {
        title: "13. Liability",
        paragraphs: [
          "Asko Cafe is liable only according to statutory provisions. Users or server operators are generally responsible for user content and external Discord servers. We are not responsible for external links.",
        ],
      },
      {
        title: "14. Changes to the platform and terms",
        paragraphs: [
          "Asko Cafe is under development and may change, expand or remove features. These Terms of Use may be updated when features, legal requirements or processes change. The version published on the website applies.",
        ],
      },
      {
        title: "15. Contact",
        paragraphs: [
          "Questions, complaints, partnerships, event ideas or notices of rule violations can be submitted through Discord support or by email.",
        ],
      },
      {
        title: "16. Applicable law",
        paragraphs: [
          "The law of the Federal Republic of Germany applies unless mandatory consumer protection provisions conflict with this.",
        ],
      },
    ],
  },

  fr: {
    badge: "📜 Règles",
    title: "Conditions d’utilisation",
    intro:
      "Ces conditions d’utilisation régissent l’utilisation d’Asko Cafe. En t’inscrivant, en te connectant, en soumettant un serveur ou en continuant à utiliser la plateforme, tu acceptes ces conditions.",
    sideTitle: "Important",
    sideText:
      "Toute personne qui ajoute un serveur, écrit des avis ou crée des signalements doit respecter ces règles.",
    impressum: "Mentions légales",
    privacy: "Politique de confidentialité",
    support: "Contacter le support",
    discordSupport: "Ouvrir le support Discord",
    emailLabel: SUPPORT_EMAIL,
    sections: [
      {
        title: "1. Fournisseur",
        paragraphs: [
          "Le fournisseur de la plateforme Asko Cafe est le prestataire indiqué dans les mentions légales.",
        ],
      },
      {
        title: "2. Objet de la plateforme",
        paragraphs: [
          "Asko Cafe est une plateforme permettant d’afficher, rechercher, ajouter, gérer, évaluer et modérer des serveurs Discord. Les utilisateurs peuvent ajouter des serveurs, consulter des profils de serveurs, publier des avis, signaler des serveurs et utiliser, si disponibles, des fonctions premium ou partenaire.",
        ],
      },
      {
        title: "3. Inscription et connexion",
        paragraphs: [
          "Certaines fonctions nécessitent une connexion, notamment via Discord. En te connectant, tu confirmes que les informations fournies sont correctes et que tu n’utilises pas ton compte de manière abusive.",
          "Tu es responsable de la sécurité de ton compte Discord. Si tu soupçonnes une utilisation abusive de ton compte, tu dois nous contacter rapidement.",
        ],
      },
      {
        title: "4. Ajout de serveurs",
        paragraphs: [
          "Lorsque tu ajoutes un serveur, tu confirmes que tu es autorisé à le publier sur Asko Cafe et que les informations fournies sont correctes.",
        ],
        items: [
          "Le lien d’invitation doit fonctionner et ne doit pas être trompeur.",
          "Le nom du serveur, la description, les tags, la bannière et le logo doivent être véridiques.",
          "Les contenus NSFW ou sensibles doivent être correctement indiqués.",
          "Tu ne dois pas violer les droits de tiers.",
          "Tu ne dois pas ajouter de contenus contraires aux lois ou aux règles de Discord.",
        ],
      },
      {
        title: "5. Validation et modération",
        paragraphs: [
          "Les serveurs soumis peuvent être vérifiés, acceptés, refusés, restreints, verrouillés, bannis ou supprimés par l’équipe. Il n’existe aucun droit à l’inscription, à la visibilité, au placement premium ou à une publication permanente.",
          "Asko Cafe peut prendre des mesures lorsque des contenus enfreignent ces conditions, des obligations légales, les règles de Discord ou la sécurité de la plateforme.",
        ],
      },
      {
        title: "6. Avis et signalements",
        paragraphs: [
          "Les avis doivent être honnêtes, factuels et équitables. Il est interdit de manipuler les avis, de publier de faux avis, d’insulter d’autres utilisateurs ou d’utiliser les avis pour du spam, de la publicité ou pour nuire à d’autres serveurs.",
          "Les signalements ne doivent être utilisés que pour de vrais problèmes. Les signalements abusifs ou faux peuvent entraîner une limitation de ton compte.",
        ],
      },
      {
        title: "7. Contenus et actions interdits",
        paragraphs: ["Sont notamment interdits :"],
        items: [
          "les contenus illégaux,",
          "les discours haineux, menaces, insultes ou discriminations,",
          "les contenus extrémistes, terroristes ou glorifiant la violence,",
          "les contenus sexuels impliquant des mineurs ou autres contenus sexuels illégaux,",
          "la fraude, le phishing, les arnaques, les malwares, token grabbers ou logiciels nuisibles,",
          "le spam, les faux serveurs, les informations trompeuses ou les avis manipulés,",
          "les violations de marques, droits d’auteur, noms ou droits de la personnalité,",
          "le contournement de restrictions, bannissements, bump-bans ou mesures de sécurité,",
          "l’utilisation automatisée, le scraping ou les attaques contre la plateforme sans autorisation.",
        ],
      },
      {
        title: "8. Système de bump",
        paragraphs: [
          "Le système de bump sert à rendre les serveurs actifs plus visibles. Il ne doit pas être manipulé, automatisé, abusé ou exploité de manière injuste via plusieurs comptes. En cas d’abus, des bump-bans ou d’autres mesures de modération peuvent être appliqués.",
        ],
      },
      {
        title: "9. Fonctions premium et partenaire",
        paragraphs: [
          "Les fonctions premium et partenaire peuvent offrir une visibilité supplémentaire, des options de design, des mises en page spéciales, des temps de bump plus courts ou des mises en avant. L’étendue exacte des fonctions peut changer, notamment pendant le développement d’Asko Cafe.",
          "Un statut premium ou partenaire n’autorise pas les violations des règles. Les serveurs premium et partenaires peuvent aussi être modérés, restreints ou supprimés.",
        ],
      },
      {
        title: "10. Disponibilité",
        paragraphs: [
          "Nous faisons notre possible pour assurer un fonctionnement stable. Toutefois, la disponibilité permanente du site, de la base de données, des fonctions du bot, de l’API Discord, des liens d’invitation ou des fonctions premium ne peut pas être garantie.",
        ],
      },
      {
        title: "11. Contenus utilisateur et droits",
        paragraphs: [
          "Tu conserves en principe tes droits sur tes propres contenus. Tu accordes toutefois à Asko Cafe le droit d’afficher, traiter techniquement, stocker, vérifier, modérer et utiliser les contenus soumis pour la présentation des serveurs sur la plateforme.",
        ],
      },
      {
        title: "12. Suppression et restriction",
        paragraphs: [
          "Tu peux demander la suppression ou la modification de tes contenus. Nous pouvons également supprimer des contenus s’ils ne sont plus actuels, enfreignent les règles, violent des droits ou mettent en danger la sécurité de la plateforme.",
        ],
      },
      {
        title: "13. Responsabilité",
        paragraphs: [
          "Asko Cafe n’est responsable que conformément aux dispositions légales. Les utilisateurs ou exploitants de serveurs sont en principe responsables des contenus utilisateur et des serveurs Discord externes. Nous ne sommes pas responsables des liens externes.",
        ],
      },
      {
        title: "14. Modifications de la plateforme et des conditions",
        paragraphs: [
          "Asko Cafe est en développement et peut modifier, étendre ou supprimer des fonctions. Ces conditions d’utilisation peuvent être adaptées lorsque les fonctions, exigences légales ou processus changent. La version publiée sur le site s’applique.",
        ],
      },
      {
        title: "15. Contact",
        paragraphs: [
          "Les questions, réclamations, partenariats, idées d’événements ou signalements de violations des règles peuvent être envoyés via le support Discord ou par e-mail.",
        ],
      },
      {
        title: "16. Droit applicable",
        paragraphs: [
          "Le droit de la République fédérale d’Allemagne s’applique, sauf dispositions impératives de protection des consommateurs contraires.",
        ],
      },
    ],
  },

  it: {
    badge: "📜 Regole",
    title: "Condizioni d’uso",
    intro:
      "Queste condizioni d’uso regolano l’utilizzo di Asko Cafe. Registrandoti, accedendo, inviando un server o continuando a usare la piattaforma, accetti queste condizioni.",
    sideTitle: "Importante",
    sideText:
      "Chi inserisce un server, scrive recensioni o crea segnalazioni deve rispettare queste regole.",
    impressum: "Note legali",
    privacy: "Privacy policy",
    support: "Contatta il supporto",
    discordSupport: "Apri supporto Discord",
    emailLabel: SUPPORT_EMAIL,
    sections: [
      {
        title: "1. Fornitore",
        paragraphs: [
          "Il fornitore della piattaforma Asko Cafe è il soggetto indicato nelle note legali.",
        ],
      },
      {
        title: "2. Oggetto della piattaforma",
        paragraphs: [
          "Asko Cafe è una piattaforma per mostrare, cercare, inserire, gestire, recensire e moderare server Discord. Gli utenti possono inserire server, visualizzare profili server, pubblicare recensioni, segnalare server e, se disponibili, utilizzare funzioni premium o partner.",
        ],
      },
      {
        title: "3. Registrazione e accesso",
        paragraphs: [
          "Alcune funzioni richiedono l’accesso, in particolare tramite Discord. Accedendo confermi che i dati forniti sono corretti e che non userai il tuo account in modo abusivo.",
          "Sei responsabile della sicurezza del tuo account Discord. Se sospetti un abuso del tuo account, dovresti contattarci il prima possibile.",
        ],
      },
      {
        title: "4. Inserimento di server",
        paragraphs: [
          "Quando inserisci un server, confermi di essere autorizzato a pubblicarlo su Asko Cafe e che le informazioni inviate sono corrette.",
        ],
        items: [
          "Il link di invito deve funzionare e non deve essere fuorviante.",
          "Nome del server, descrizione, tag, banner e logo devono essere veritieri.",
          "Contenuti NSFW o sensibili devono essere indicati correttamente.",
          "Non devi violare diritti di terzi.",
          "Non devi inserire contenuti contrari alla legge o alle regole di Discord.",
        ],
      },
      {
        title: "5. Approvazione e moderazione",
        paragraphs: [
          "I server inviati possono essere controllati, accettati, rifiutati, limitati, bloccati, bannati o eliminati dal team. Non esiste alcun diritto all’inserimento, alla visibilità, al posizionamento premium o alla pubblicazione permanente.",
          "Asko Cafe può adottare misure se i contenuti violano queste condizioni, requisiti legali, regole di Discord o la sicurezza della piattaforma.",
        ],
      },
      {
        title: "6. Recensioni e segnalazioni",
        paragraphs: [
          "Le recensioni devono essere oneste, oggettive e corrette. È vietato manipolare recensioni, creare recensioni false, insultare altri utenti o usare recensioni per spam, pubblicità o per danneggiare altri server.",
          "Le segnalazioni devono essere usate solo per problemi reali. Segnalazioni abusive o false possono portare a limitazioni del tuo account.",
        ],
      },
      {
        title: "7. Contenuti e azioni vietati",
        paragraphs: ["Sono vietati in particolare:"],
        items: [
          "contenuti illegali,",
          "discorsi d’odio, minacce, insulti o discriminazione,",
          "contenuti estremisti, terroristici o che glorificano la violenza,",
          "contenuti sessuali con minori o altri contenuti sessuali illegali,",
          "frode, phishing, scam, malware, token grabber o software dannoso,",
          "spam, server falsi, informazioni fuorvianti o recensioni manipolate,",
          "violazioni di marchi, copyright, nomi o diritti della personalità,",
          "aggiramento di blocchi, ban, bump-ban o misure di sicurezza,",
          "uso automatizzato, scraping o attacchi alla piattaforma senza autorizzazione.",
        ],
      },
      {
        title: "8. Sistema bump",
        paragraphs: [
          "Il sistema bump serve a rendere più visibili i server attivi. Non deve essere manipolato, automatizzato, abusato o sfruttato in modo scorretto tramite più account. In caso di abuso possono essere applicati bump-ban o ulteriori misure di moderazione.",
        ],
      },
      {
        title: "9. Funzioni premium e partner",
        paragraphs: [
          "Le funzioni premium e partner possono offrire maggiore visibilità, opzioni di design, layout speciali, tempi di bump più brevi o evidenziazioni. L’esatto ambito delle funzioni può cambiare, soprattutto mentre Asko Cafe viene sviluppato.",
          "Lo status premium o partner non autorizza violazioni delle regole. Anche server premium e partner possono essere moderati, limitati o rimossi.",
        ],
      },
      {
        title: "10. Disponibilità",
        paragraphs: [
          "Ci impegniamo per un funzionamento stabile. Tuttavia non può essere garantita la disponibilità costante del sito, database, funzioni bot, API Discord, link di invito o funzioni premium.",
        ],
      },
      {
        title: "11. Contenuti degli utenti e diritti",
        paragraphs: [
          "In linea di principio mantieni i diritti sui tuoi contenuti. Tuttavia concedi ad Asko Cafe il diritto di mostrare, elaborare tecnicamente, salvare, controllare, moderare e utilizzare i contenuti inviati per la presentazione dei server sulla piattaforma.",
        ],
      },
      {
        title: "12. Cancellazione e limitazione",
        paragraphs: [
          "Puoi richiedere la cancellazione o modifica dei tuoi contenuti. Possiamo anche rimuovere contenuti se non sono più aggiornati, violano regole, infrangono diritti o mettono a rischio la sicurezza della piattaforma.",
        ],
      },
      {
        title: "13. Responsabilità",
        paragraphs: [
          "Asko Cafe risponde solo secondo le disposizioni di legge. Gli utenti o gestori dei server sono generalmente responsabili dei contenuti utente e dei server Discord esterni. Non siamo responsabili per link esterni.",
        ],
      },
      {
        title: "14. Modifiche alla piattaforma e alle condizioni",
        paragraphs: [
          "Asko Cafe è in fase di sviluppo e può modificare, ampliare o rimuovere funzioni. Queste condizioni d’uso possono essere aggiornate quando cambiano funzioni, requisiti legali o processi. Si applica la versione pubblicata sul sito.",
        ],
      },
      {
        title: "15. Contatto",
        paragraphs: [
          "Domande, reclami, partnership, idee per eventi o segnalazioni di violazioni delle regole possono essere inviati tramite supporto Discord o e-mail.",
        ],
      },
      {
        title: "16. Legge applicabile",
        paragraphs: [
          "Si applica il diritto della Repubblica Federale di Germania, salvo norme imperative di tutela dei consumatori contrarie.",
        ],
      },
    ],
  },

  pl: {
    badge: "📜 Zasady",
    title: "Warunki korzystania",
    intro:
      "Niniejsze warunki korzystania regulują używanie Asko Cafe. Rejestrując się, logując, zgłaszając serwer lub dalej korzystając z platformy, akceptujesz te warunki.",
    sideTitle: "Ważne",
    sideText:
      "Każdy, kto dodaje serwer, pisze recenzje lub tworzy zgłoszenia, musi przestrzegać tych zasad.",
    impressum: "Nota prawna",
    privacy: "Polityka prywatności",
    support: "Kontakt z pomocą",
    discordSupport: "Otwórz pomoc Discord",
    emailLabel: SUPPORT_EMAIL,
    sections: [
      {
        title: "1. Dostawca",
        paragraphs: [
          "Dostawcą platformy Asko Cafe jest usługodawca wskazany w nocie prawnej.",
        ],
      },
      {
        title: "2. Cel platformy",
        paragraphs: [
          "Asko Cafe to platforma do prezentowania, wyszukiwania, dodawania, zarządzania, oceniania i moderowania serwerów Discord. Użytkownicy mogą dodawać serwery, przeglądać profile serwerów, pisać recenzje, zgłaszać serwery oraz, jeśli są dostępne, korzystać z funkcji premium lub partnerskich.",
        ],
      },
      {
        title: "3. Rejestracja i logowanie",
        paragraphs: [
          "Niektóre funkcje wymagają logowania, szczególnie przez Discord. Logując się, potwierdzasz, że podane dane są poprawne i że nie będziesz nadużywać swojego konta.",
          "Odpowiadasz za bezpieczeństwo swojego konta Discord. Jeśli podejrzewasz nadużycie konta, skontaktuj się z nami jak najszybciej.",
        ],
      },
      {
        title: "4. Dodawanie serwerów",
        paragraphs: [
          "Dodając serwer, potwierdzasz, że masz prawo opublikować go na Asko Cafe i że podane informacje są poprawne.",
        ],
        items: [
          "Link zaproszenia musi działać i nie może wprowadzać w błąd.",
          "Nazwa serwera, opis, tagi, banner i logo muszą być zgodne z prawdą.",
          "Treści NSFW lub wrażliwe muszą być poprawnie oznaczone.",
          "Nie wolno naruszać praw osób trzecich.",
          "Nie wolno dodawać treści naruszających prawo lub zasady Discorda.",
        ],
      },
      {
        title: "5. Akceptacja i moderacja",
        paragraphs: [
          "Dodane serwery mogą zostać sprawdzone, zaakceptowane, odrzucone, ograniczone, zablokowane, zbanowane lub usunięte przez zespół. Nie istnieje prawo do dodania, widoczności, miejsca premium ani trwałej publikacji.",
          "Asko Cafe może podjąć działania, gdy treści naruszają te warunki, wymogi prawne, zasady Discorda lub bezpieczeństwo platformy.",
        ],
      },
      {
        title: "6. Recenzje i zgłoszenia",
        paragraphs: [
          "Recenzje powinny być uczciwe, rzeczowe i fair. Zabronione jest manipulowanie recenzjami, tworzenie fałszywych recenzji, obrażanie innych użytkowników oraz używanie recenzji do spamu, reklamy lub szkodzenia innym serwerom.",
          "Zgłoszenia mogą być używane tylko do rzeczywistych problemów. Nadużycia lub fałszywe zgłoszenia mogą prowadzić do ograniczenia konta.",
        ],
      },
      {
        title: "7. Zabronione treści i działania",
        paragraphs: ["Zabronione są w szczególności:"],
        items: [
          "treści nielegalne,",
          "mowa nienawiści, groźby, obelgi lub dyskryminacja,",
          "treści ekstremistyczne, terrorystyczne lub gloryfikujące przemoc,",
          "treści seksualne z udziałem nieletnich lub inne nielegalne treści seksualne,",
          "oszustwa, phishing, scam, malware, token grabbery lub szkodliwe oprogramowanie,",
          "spam, fałszywe serwery, mylące informacje lub manipulowane recenzje,",
          "naruszanie znaków towarowych, praw autorskich, nazw lub dóbr osobistych,",
          "omijanie blokad, banów, bump-banów lub środków bezpieczeństwa,",
          "automatyczne użycie, scraping lub ataki na platformę bez pozwolenia.",
        ],
      },
      {
        title: "8. System bump",
        paragraphs: [
          "System bump służy zwiększeniu widoczności aktywnych serwerów. Nie wolno go manipulować, automatyzować, nadużywać ani nieuczciwie wykorzystywać przez wiele kont. Nadużycia mogą skutkować bump-banem lub dalszymi działaniami moderacyjnymi.",
        ],
      },
      {
        title: "9. Funkcje premium i partnerskie",
        paragraphs: [
          "Funkcje premium i partnerskie mogą oferować dodatkową widoczność, opcje wyglądu, specjalne układy, krótsze czasy bumpowania lub wyróżnienia. Dokładny zakres funkcji może się zmieniać, szczególnie podczas rozwoju Asko Cafe.",
          "Status premium lub partnerski nie uprawnia do łamania zasad. Serwery premium i partnerskie również mogą być moderowane, ograniczane lub usuwane.",
        ],
      },
      {
        title: "10. Dostępność",
        paragraphs: [
          "Staramy się zapewnić stabilne działanie. Nie można jednak zagwarantować stałej dostępności strony, bazy danych, funkcji bota, API Discord, linków zaproszeń ani funkcji premium.",
        ],
      },
      {
        title: "11. Treści użytkowników i prawa",
        paragraphs: [
          "Zasadniczo zachowujesz prawa do własnych treści. Udzielasz jednak Asko Cafe prawa do wyświetlania, technicznego przetwarzania, przechowywania, sprawdzania, moderowania i używania przesłanych treści do prezentacji serwerów na platformie.",
        ],
      },
      {
        title: "12. Usuwanie i ograniczanie",
        paragraphs: [
          "Możesz poprosić o usunięcie lub zmianę swoich treści. Możemy również usuwać treści, jeśli nie są już aktualne, naruszają zasady, naruszają prawa lub zagrażają bezpieczeństwu platformy.",
        ],
      },
      {
        title: "13. Odpowiedzialność",
        paragraphs: [
          "Asko Cafe odpowiada wyłącznie zgodnie z przepisami prawa. Za treści użytkowników oraz zewnętrzne serwery Discord zasadniczo odpowiadają użytkownicy lub operatorzy serwerów. Nie odpowiadamy za linki zewnętrzne.",
        ],
      },
      {
        title: "14. Zmiany platformy i warunków",
        paragraphs: [
          "Asko Cafe jest w trakcie rozwoju i może zmieniać, rozszerzać lub usuwać funkcje. Niniejsze warunki korzystania mogą zostać zaktualizowane, jeśli zmienią się funkcje, wymagania prawne lub procesy. Obowiązuje wersja opublikowana na stronie.",
        ],
      },
      {
        title: "15. Kontakt",
        paragraphs: [
          "Pytania, skargi, partnerstwa, pomysły na wydarzenia lub zgłoszenia naruszeń zasad można przesyłać przez support Discord lub e-mail.",
        ],
      },
      {
        title: "16. Prawo właściwe",
        paragraphs: [
          "Obowiązuje prawo Republiki Federalnej Niemiec, o ile nie sprzeciwiają się temu bezwzględnie obowiązujące przepisy ochrony konsumentów.",
        ],
      },
    ],
  },
} as const;

function normalizeLanguage(language: unknown): UiLanguage {
  const value = String(language ?? "").toLowerCase();

  if (value === "en") return "en";
  if (value === "fr") return "fr";
  if (value === "it") return "it";
  if (value === "pl") return "pl";

  return "de";
}

export default function NutzungsbedingungenPage() {
  const language = normalizeLanguage(useLanguage());
  const pageText = TERMS_TEXT[language];

  return (
    <main className="legal-shell">
      <style>{`
        .legal-shell {
          width: min(1120px, calc(100% - 32px));
          margin: 0 auto;
          padding: 72px 0 90px;
        }

        .legal-hero {
          position: relative;
          overflow: hidden;
          padding: clamp(28px, 5vw, 54px);
          border-radius: 34px;
          background:
            radial-gradient(circle at 0% 0%, rgba(181, 76, 255, 0.22), transparent 35%),
            radial-gradient(circle at 100% 0%, rgba(255, 207, 64, 0.12), transparent 34%),
            linear-gradient(135deg, rgba(18, 16, 42, 0.98), rgba(9, 10, 26, 0.98));
          border: 1px solid rgba(170, 120, 255, 0.22);
          box-shadow: 0 0 48px rgba(130, 85, 255, 0.14);
        }

        .legal-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          color: #9deaff;
          background: rgba(157, 234, 255, 0.08);
          border: 1px solid rgba(157, 234, 255, 0.20);
          font-weight: 950;
          font-size: 0.85rem;
        }

        .legal-hero h1 {
          margin: 22px 0 0;
          color: #ffffff;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          line-height: 0.92;
          letter-spacing: -0.07em;
        }

        .legal-hero p {
          max-width: 820px;
          margin: 20px 0 0;
          color: rgba(236, 240, 255, 0.76);
          line-height: 1.75;
          font-size: 1.05rem;
        }

        .legal-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 22px;
          align-items: start;
          margin-top: 24px;
        }

        .legal-card,
        .legal-side-card {
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)),
            rgba(12, 12, 30, 0.86);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow: 0 0 32px rgba(100, 80, 255, 0.08);
        }

        .legal-card {
          padding: clamp(22px, 4vw, 34px);
        }

        .legal-side-card {
          padding: 22px;
          position: sticky;
          top: 110px;
        }

        .legal-card h2,
        .legal-side-card h2 {
          margin: 0 0 12px;
          color: #ffffff;
          font-size: clamp(1.35rem, 3vw, 2rem);
          letter-spacing: -0.04em;
        }

        .legal-card p,
        .legal-card li,
        .legal-side-card p {
          color: rgba(236, 240, 255, 0.78);
          line-height: 1.75;
        }

        .legal-card p {
          margin: 0 0 14px;
        }

        .legal-card ul {
          margin: 10px 0 18px;
          padding-left: 22px;
        }

        .legal-link-list {
          display: grid;
          gap: 10px;
          margin-top: 14px;
        }

        .legal-link-list a,
        .legal-button {
          min-height: 42px;
          padding: 0 14px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          color: rgba(236, 240, 255, 0.82);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.10);
          font-weight: 850;
        }

        .legal-link-list a:hover,
        .legal-button:hover {
          color: #ffffff;
          border-color: rgba(157, 234, 255, 0.28);
        }

        @media (max-width: 900px) {
          .legal-grid {
            grid-template-columns: 1fr;
          }

          .legal-side-card {
            position: static;
          }
        }
      `}</style>

      <section className="legal-hero">
        <span className="legal-badge">{pageText.badge}</span>
        <h1>{pageText.title}</h1>
        <p>{pageText.intro}</p>
      </section>

      <div className="legal-grid">
        <article className="legal-card">
          {pageText.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {"items" in section && section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p>
            <a
              className="legal-button"
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
            >
              {pageText.discordSupport}
            </a>{" "}
            <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}`}>
              {pageText.emailLabel}
            </a>
          </p>
        </article>

        <aside className="legal-side-card">
          <h2>{pageText.sideTitle}</h2>
          <p>{pageText.sideText}</p>

          <div className="legal-link-list">
            <Link href="/impressum">{pageText.impressum}</Link>
            <Link href="/datenschutz">{pageText.privacy}</Link>
            <Link href="/support">{pageText.support}</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
