"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const PRIVACY_TEXT = {
  de: {
tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "    badge: "Datenschutz",
    title: "Datenschutzerklärung",
    intro:
      "Diese Datenschutzerklärung informiert darüber, welche personenbezogenen Daten bei der Nutzung von Asko Cafe verarbeitet werden, zu welchen Zwecken dies geschieht und welche Rechte betroffene Personen haben.",
    legalNote:
      "Die deutsche Fassung dieser Datenschutzerklärung ist rechtlich maßgeblich. Übersetzungen dienen nur der besseren Verständlichkeit.",

    controllerTitle: "1. Verantwortlicher",
    controllerText:
      "Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist der Betreiber von Asko Cafe. Die vollständigen Anbieter- und Kontaktdaten findest du im Impressum.",

    contactTitle: "2. Kontakt für Datenschutzfragen",
    contactText:
      "Datenschutzanfragen, Auskunftsanfragen, Löschanfragen oder sonstige Anliegen können per E-Mail oder über das Discord-Ticketsystem gestellt werden.",

    generalTitle: "3. Allgemeine Datenverarbeitung",
    generalText:
      "Personenbezogene Daten werden verarbeitet, soweit dies zur Bereitstellung der Website, zur Nutzung der Plattformfunktionen, zur Verwaltung von Discord-Servereinträgen, zur Durchführung von Login- und Sicherheitsfunktionen, zur Moderation, zur Bearbeitung von Meldungen oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.",

    legalBasisTitle: "4. Rechtsgrundlagen",
    legalBasisIntro:
      "Die Verarbeitung personenbezogener Daten erfolgt je nach Funktion auf Grundlage folgender Rechtsgrundlagen:",
    legalBasisItems: [
      "Art. 6 Abs. 1 lit. a DSGVO – Einwilligung",
      "Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung oder vorvertragliche Maßnahmen",
      "Art. 6 Abs. 1 lit. c DSGVO – Erfüllung rechtlicher Verpflichtungen",
      "Art. 6 Abs. 1 lit. f DSGVO – berechtigte Interessen, insbesondere Sicherheit, Missbrauchsvermeidung, Moderation und stabiler Betrieb",
    ],

    hostingTitle: "5. Hosting und technische Zugriffsdaten",
    hostingText:
      "Beim Aufruf der Website werden technisch notwendige Daten verarbeitet, damit die Website ausgeliefert und sicher betrieben werden kann. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, Browserinformationen, Referrer, angeforderte Seiten, Systemdaten und Logdaten gehören.",

    discordTitle: "6. Discord-Login und Nutzerkonto",
    discordText1:
      "Soweit eine Anmeldung über Discord angeboten wird, werden die von Discord bereitgestellten Daten verarbeitet, soweit dies für Login, Account-Zuordnung und Plattformfunktionen erforderlich ist. Dazu können Discord-ID, Benutzername, Avatar, öffentliche Profildaten und weitere für die Authentifizierung notwendige Daten gehören.",
    discordText2:
      "Mit der Registrierung oder Anmeldung auf Asko Cafe akzeptiert der Nutzer die Nutzungsbedingungen in ihrer jeweils gültigen Fassung.",

    serverTitle: "7. Servereinträge",
    serverIntro:
      "Wenn ein Discord-Server eingetragen oder bearbeitet wird, können insbesondere folgende Daten verarbeitet werden:",
    serverItems: [
      "Servername",
      "Serverbeschreibung",
      "Kategorie, Sprache, Land und Tags",
      "Discord-Invite-Link",
      "Banner, Logo oder Serverbild",
      "NSFW-Angabe",
      "Premium- oder Partner-Status",
      "Bump-Zeitpunkte und Bump-Sperren",
      "Moderationsstatus, Gründe und Bearbeiter",
    ],

    reviewTitle: "8. Bewertungen, Kommentare und Meldungen",
    reviewText:
      "Nutzer können Bewertungen, Kommentare und Meldungen abgeben. Dabei können Discord-ID, Nutzername, Bewertung, Kommentartext, Meldegrund, gemeldeter Server, gemeldete Bewertung, Zeitstempel und Moderationsentscheidungen verarbeitet werden.",

    moderationTitle: "9. Moderation und Sicherheit",
    moderationText:
      "Zur Sicherheit der Plattform und zur Durchsetzung von Regeln können Inhalte geprüft, Server gesperrt, gebannt, entfernt, Bewertungen versteckt oder gelöscht und Bump-Sperren verhängt werden. Dabei werden Moderationsgründe, Zeitpunkte, Dauer und verantwortliche Staff-Accounts gespeichert.",

    notificationsTitle: "10. Benachrichtigungen",
    notificationsText:
      "Nutzer können Benachrichtigungen erhalten, etwa wenn ein Server angenommen, abgelehnt, gesperrt, gebannt, gelöscht, Premium aktiviert, Partner aktiviert oder eine Bewertung moderiert wurde.",

    storageTitle: "11. Cookies, Local Storage und ähnliche Technologien",
    storageText1:
      "Asko Cafe kann technisch notwendige Cookies, Local Storage oder ähnliche Technologien verwenden, zum Beispiel für Login-Sitzungen, Spracheinstellungen, Sicherheitsfunktionen oder die Bereitstellung ausdrücklich gewünschter Funktionen.",
    storageText2:
      "Soweit nicht notwendige Cookies oder vergleichbare Technologien eingesetzt werden, erfolgt dies nur auf Grundlage einer Einwilligung, sofern eine solche gesetzlich erforderlich ist.",

    recipientsTitle: "12. Empfänger und technische Dienstleister",
    recipientsText:
      "Zur Bereitstellung der Plattform können technische Dienstleister eingesetzt werden, insbesondere für Hosting, Datenbank, Authentifizierung, Speicherung, Sicherheit und Infrastruktur. Dazu können insbesondere Vercel, Supabase, Discord OAuth und NextAuth gehören, sofern diese Dienste tatsächlich eingesetzt werden.",

    durationTitle: "13. Speicherdauer",
    durationText:
      "Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich ist. Servereinträge, Bewertungen, Meldungen und Moderationsdaten können gespeichert bleiben, solange dies zur Plattformverwaltung, Missbrauchsvermeidung, Nachvollziehbarkeit von Moderationsentscheidungen oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.",

    rightsTitle: "14. Rechte betroffener Personen",
    rightsIntro: "Betroffene Personen haben nach Maßgabe der DSGVO insbesondere:",
    rightsItems: [
      "Recht auf Auskunft",
      "Recht auf Berichtigung",
      "Recht auf Löschung",
      "Recht auf Einschränkung der Verarbeitung",
      "Recht auf Datenübertragbarkeit",
      "Recht auf Widerspruch",
      "Recht auf Widerruf erteilter Einwilligungen",
      "Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde",
    ],

    securityTitle: "15. Datensicherheit",
    securityText:
      "Es werden angemessene technische und organisatorische Maßnahmen getroffen, um Daten vor Verlust, Missbrauch, unberechtigtem Zugriff, unbefugter Offenlegung und Veränderung zu schützen. Eine vollständig risikofreie Datenübertragung im Internet kann jedoch nicht garantiert werden.",

    changesTitle: "16. Änderungen dieser Datenschutzerklärung",
    changesText:
      "Diese Datenschutzerklärung kann angepasst werden, wenn sich technische, rechtliche oder organisatorische Umstände ändern.",

    imprint: "Impressum",
    discordTicket: "Discord-Ticketsystem",
  },

  en: {
    badge: "Privacy",
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains which personal data is processed when using Asko Cafe, for what purposes this happens and what rights data subjects have.",
    legalNote:
      "The German version of this Privacy Policy is legally authoritative. Translations are provided for better understanding only.",

    controllerTitle: "1. Controller",
    controllerText:
      "The controller within the meaning of the General Data Protection Regulation is the operator of Asko Cafe. Full provider and contact details can be found in the imprint.",

    contactTitle: "2. Contact for privacy matters",
    contactText:
      "Privacy requests, access requests, deletion requests or other concerns can be submitted by email or through the Discord ticket system.",

    generalTitle: "3. General data processing",
    generalText:
      "Personal data is processed where necessary to provide the website, use platform functions, manage Discord server entries, perform login and security functions, moderate content, handle reports or comply with legal obligations.",

    legalBasisTitle: "4. Legal bases",
    legalBasisIntro:
      "Depending on the function, personal data is processed on the following legal bases:",
    legalBasisItems: [
      "Art. 6(1)(a) GDPR – consent",
      "Art. 6(1)(b) GDPR – performance of a contract or pre-contractual measures",
      "Art. 6(1)(c) GDPR – compliance with legal obligations",
      "Art. 6(1)(f) GDPR – legitimate interests, especially security, abuse prevention, moderation and stable operation",
    ],

    hostingTitle: "5. Hosting and technical access data",
    hostingText:
      "When the website is accessed, technically necessary data is processed so that the website can be delivered and operated securely. This may include IP address, date and time of access, browser information, referrer, requested pages, system data and log data.",

    discordTitle: "6. Discord login and user account",
    discordText1:
      "Where login via Discord is offered, data provided by Discord is processed to the extent required for login, account assignment and platform functions. This may include Discord ID, username, avatar, public profile data and other data necessary for authentication.",
    discordText2:
      "By registering or logging into Asko Cafe, the user accepts the Terms of Use in their current version.",

    serverTitle: "7. Server entries",
    serverIntro:
      "When a Discord server is submitted or edited, the following data in particular may be processed:",
    serverItems: [
      "server name",
      "server description",
      "category, language, country and tags",
      "Discord invite link",
      "banner, logo or server image",
      "NSFW status",
      "premium or partner status",
      "bump timestamps and bump bans",
      "moderation status, reasons and moderators",
    ],

    reviewTitle: "8. Reviews, comments and reports",
    reviewText:
      "Users may submit reviews, comments and reports. In this context, Discord ID, username, rating, comment text, report reason, reported server, reported review, timestamps and moderation decisions may be processed.",

    moderationTitle: "9. Moderation and security",
    moderationText:
      "For platform security and rule enforcement, content may be reviewed, servers may be locked, banned or removed, reviews may be hidden or deleted and bump bans may be imposed. Moderation reasons, timestamps, duration and responsible staff accounts are stored.",

    notificationsTitle: "10. Notifications",
    notificationsText:
      "Users may receive notifications, for example when a server has been approved, rejected, locked, banned, deleted, premium activated, partner activated or a review moderated.",

    storageTitle: "11. Cookies, local storage and similar technologies",
    storageText1:
      "Asko Cafe may use technically necessary cookies, local storage or similar technologies, for example for login sessions, language settings, security functions or requested functions.",
    storageText2:
      "Where non-essential cookies or comparable technologies are used, this is done only on the basis of consent where legally required.",

    recipientsTitle: "12. Recipients and technical service providers",
    recipientsText:
      "Technical service providers may be used to provide the platform, especially for hosting, database, authentication, storage, security and infrastructure. This may include Vercel, Supabase, Discord OAuth and NextAuth if these services are actually used.",

    durationTitle: "13. Storage period",
    durationText:
      "Personal data is stored only as long as necessary for the respective purposes. Server entries, reviews, reports and moderation data may be stored as long as required for platform management, abuse prevention, traceability of moderation decisions or compliance with legal obligations.",

    rightsTitle: "14. Rights of data subjects",
    rightsIntro: "Data subjects have, in particular, the following rights under the GDPR:",
    rightsItems: [
      "right of access",
      "right to rectification",
      "right to erasure",
      "right to restriction of processing",
      "right to data portability",
      "right to object",
      "right to withdraw consent",
      "right to lodge a complaint with a data protection supervisory authority",
    ],

    securityTitle: "15. Data security",
    securityText:
      "Appropriate technical and organizational measures are taken to protect data against loss, misuse, unauthorized access, unauthorized disclosure and alteration. However, completely risk-free data transmission over the internet cannot be guaranteed.",

    changesTitle: "16. Changes to this Privacy Policy",
    changesText:
      "This Privacy Policy may be updated if technical, legal or organizational circumstances change.",

    imprint: "Imprint",
    discordTicket: "Discord ticket system",
  },

  fr: {
    badge: "Confidentialité",
    title: "Politique de confidentialité",
    intro:
      "Cette politique de confidentialité explique quelles données personnelles sont traitées lors de l’utilisation d’Asko Cafe, à quelles fins et quels droits possèdent les personnes concernées.",
    legalNote:
      "La version allemande de cette politique de confidentialité fait foi juridiquement. Les traductions servent uniquement à une meilleure compréhension.",

    controllerTitle: "1. Responsable du traitement",
    controllerText:
      "Le responsable au sens du RGPD est l’exploitant d’Asko Cafe. Les informations complètes du fournisseur et les coordonnées se trouvent dans les mentions légales.",

    contactTitle: "2. Contact pour les questions de confidentialité",
    contactText:
      "Les demandes relatives à la confidentialité, à l’accès, à la suppression ou autres peuvent être envoyées par e-mail ou via le système de tickets Discord.",

    generalTitle: "3. Traitement général des données",
    generalText:
      "Les données personnelles sont traitées lorsque cela est nécessaire pour fournir le site, utiliser les fonctions de la plateforme, gérer les entrées de serveurs Discord, assurer la connexion et la sécurité, modérer les contenus, traiter les signalements ou respecter des obligations légales.",

    legalBasisTitle: "4. Bases juridiques",
    legalBasisIntro:
      "Selon la fonction, les données personnelles sont traitées sur les bases juridiques suivantes :",
    legalBasisItems: [
      "Art. 6(1)(a) RGPD – consentement",
      "Art. 6(1)(b) RGPD – exécution d’un contrat ou mesures précontractuelles",
      "Art. 6(1)(c) RGPD – respect d’obligations légales",
      "Art. 6(1)(f) RGPD – intérêts légitimes, notamment sécurité, prévention des abus, modération et fonctionnement stable",
    ],

    hostingTitle: "5. Hébergement et données techniques d’accès",
    hostingText:
      "Lors de l’accès au site, des données techniquement nécessaires sont traitées afin que le site puisse être fourni et exploité en toute sécurité. Cela peut inclure l’adresse IP, la date et l’heure d’accès, les informations du navigateur, le référent, les pages demandées, les données système et les logs.",

    discordTitle: "6. Connexion Discord et compte utilisateur",
    discordText1:
      "Lorsque la connexion via Discord est proposée, les données fournies par Discord sont traitées dans la mesure nécessaire à la connexion, à l’attribution du compte et aux fonctions de la plateforme. Cela peut inclure l’ID Discord, le nom d’utilisateur, l’avatar, les données publiques de profil et d’autres données nécessaires à l’authentification.",
    discordText2:
      "En s’inscrivant ou en se connectant à Asko Cafe, l’utilisateur accepte les conditions d’utilisation dans leur version actuelle.",

    serverTitle: "7. Entrées de serveurs",
    serverIntro:
      "Lorsqu’un serveur Discord est soumis ou modifié, les données suivantes peuvent notamment être traitées :",
    serverItems: [
      "nom du serveur",
      "description du serveur",
      "catégorie, langue, pays et tags",
      "lien d’invitation Discord",
      "bannière, logo ou image du serveur",
      "statut NSFW",
      "statut Premium ou Partenaire",
      "horodatages de bump et blocages de bump",
      "statut de modération, raisons et modérateurs",
    ],

    reviewTitle: "8. Avis, commentaires et signalements",
    reviewText:
      "Les utilisateurs peuvent publier des avis, commentaires et signalements. L’ID Discord, le nom d’utilisateur, la note, le commentaire, le motif de signalement, le serveur signalé, l’avis signalé, les horodatages et les décisions de modération peuvent être traités.",

    moderationTitle: "9. Modération et sécurité",
    moderationText:
      "Pour la sécurité de la plateforme et l’application des règles, les contenus peuvent être examinés, les serveurs verrouillés, bannis ou supprimés, les avis masqués ou supprimés et des blocages de bump imposés. Les raisons de modération, horodatages, durées et comptes staff responsables sont enregistrés.",

    notificationsTitle: "10. Notifications",
    notificationsText:
      "Les utilisateurs peuvent recevoir des notifications, par exemple lorsqu’un serveur est accepté, refusé, verrouillé, banni, supprimé, Premium activé, Partenaire activé ou qu’un avis est modéré.",

    storageTitle: "11. Cookies, stockage local et technologies similaires",
    storageText1:
      "Asko Cafe peut utiliser des cookies techniquement nécessaires, du stockage local ou des technologies similaires, par exemple pour les sessions de connexion, paramètres de langue, fonctions de sécurité ou fonctions demandées.",
    storageText2:
      "Lorsque des cookies non essentiels ou technologies comparables sont utilisés, cela se fait uniquement sur la base du consentement lorsque la loi l’exige.",

    recipientsTitle: "12. Destinataires et prestataires techniques",
    recipientsText:
      "Des prestataires techniques peuvent être utilisés pour fournir la plateforme, notamment pour l’hébergement, la base de données, l’authentification, le stockage, la sécurité et l’infrastructure. Cela peut inclure Vercel, Supabase, Discord OAuth et NextAuth si ces services sont réellement utilisés.",

    durationTitle: "13. Durée de conservation",
    durationText:
      "Les données personnelles ne sont conservées que le temps nécessaire aux finalités concernées. Les entrées de serveurs, avis, signalements et données de modération peuvent être conservés tant que cela est nécessaire pour la gestion de la plateforme, la prévention des abus, la traçabilité des décisions de modération ou le respect d’obligations légales.",

    rightsTitle: "14. Droits des personnes concernées",
    rightsIntro: "Les personnes concernées disposent notamment des droits suivants selon le RGPD :",
    rightsItems: [
      "droit d’accès",
      "droit de rectification",
      "droit à l’effacement",
      "droit à la limitation du traitement",
      "droit à la portabilité des données",
      "droit d’opposition",
      "droit de retirer un consentement",
      "droit de déposer une plainte auprès d’une autorité de protection des données",
    ],

    securityTitle: "15. Sécurité des données",
    securityText:
      "Des mesures techniques et organisationnelles appropriées sont prises pour protéger les données contre la perte, l’abus, l’accès non autorisé, la divulgation non autorisée et la modification. Toutefois, une transmission totalement sans risque sur Internet ne peut être garantie.",

    changesTitle: "16. Modifications de cette politique",
    changesText:
      "Cette politique de confidentialité peut être mise à jour si des circonstances techniques, juridiques ou organisationnelles changent.",

    imprint: "Mentions légales",
    discordTicket: "système de tickets Discord",
  },

  it: {
    badge: "Privacy",
    title: "Informativa sulla privacy",
    intro:
      "Questa informativa spiega quali dati personali vengono trattati durante l’utilizzo di Asko Cafe, per quali finalità e quali diritti hanno gli interessati.",
    legalNote:
      "La versione tedesca di questa informativa è giuridicamente vincolante. Le traduzioni servono solo per una migliore comprensione.",

    controllerTitle: "1. Titolare del trattamento",
    controllerText:
      "Il titolare ai sensi del GDPR è il gestore di Asko Cafe. I dati completi del fornitore e i contatti sono disponibili nell’impressum.",

    contactTitle: "2. Contatto per questioni privacy",
    contactText:
      "Richieste privacy, accesso, cancellazione o altri Anliegen possono essere inviate via e-mail o tramite sistema ticket Discord.",

    generalTitle: "3. Trattamento generale dei dati",
    generalText:
      "I dati personali vengono trattati quando necessario per fornire il sito, utilizzare le funzioni della piattaforma, gestire inserimenti di server Discord, eseguire login e funzioni di sicurezza, moderare contenuti, gestire segnalazioni o adempiere obblighi legali.",

    legalBasisTitle: "4. Basi giuridiche",
    legalBasisIntro:
      "A seconda della funzione, i dati personali vengono trattati sulle seguenti basi giuridiche:",
    legalBasisItems: [
      "Art. 6(1)(a) GDPR – consenso",
      "Art. 6(1)(b) GDPR – esecuzione di un contratto o misure precontrattuali",
      "Art. 6(1)(c) GDPR – adempimento di obblighi legali",
      "Art. 6(1)(f) GDPR – interessi legittimi, in particolare sicurezza, prevenzione abusi, moderazione e funzionamento stabile",
    ],

    hostingTitle: "5. Hosting e dati tecnici di accesso",
    hostingText:
      "Quando il sito viene aperto, vengono trattati dati tecnicamente necessari affinché il sito possa essere fornito e gestito in sicurezza. Ciò può includere indirizzo IP, data e ora dell’accesso, informazioni browser, referrer, pagine richieste, dati di sistema e log.",

    discordTitle: "6. Login Discord e account utente",
    discordText1:
      "Se viene offerto il login tramite Discord, i dati forniti da Discord vengono trattati nella misura necessaria per login, assegnazione account e funzioni della piattaforma. Ciò può includere ID Discord, nome utente, avatar, dati pubblici del profilo e altri dati necessari all’autenticazione.",
    discordText2:
      "Registrandosi o accedendo ad Asko Cafe, l’utente accetta le condizioni d’uso nella versione vigente.",

    serverTitle: "7. Inserimenti server",
    serverIntro:
      "Quando un server Discord viene inserito o modificato, possono essere trattati in particolare i seguenti dati:",
    serverItems: [
      "nome server",
      "descrizione server",
      "categoria, lingua, paese e tag",
      "link invito Discord",
      "banner, logo o immagine server",
      "indicazione NSFW",
      "stato Premium o Partner",
      "orari bump e blocchi bump",
      "stato moderazione, motivi e moderatori",
    ],

    reviewTitle: "8. Recensioni, commenti e segnalazioni",
    reviewText:
      "Gli utenti possono inviare recensioni, commenti e segnalazioni. In questo contesto possono essere trattati ID Discord, nome utente, valutazione, testo commento, motivo segnalazione, server segnalato, recensione segnalata, timestamp e decisioni di moderazione.",

    moderationTitle: "9. Moderazione e sicurezza",
    moderationText:
      "Per la sicurezza della piattaforma e l’applicazione delle regole, contenuti possono essere controllati, server bloccati, bannati o rimossi, recensioni nascoste o eliminate e blocchi bump applicati. Motivi, tempi, durata e account staff responsabili vengono salvati.",

    notificationsTitle: "10. Notifiche",
    notificationsText:
      "Gli utenti possono ricevere notifiche, ad esempio quando un server viene approvato, rifiutato, bloccato, bannato, eliminato, Premium attivato, Partner attivato o una recensione moderata.",

    storageTitle: "11. Cookie, local storage e tecnologie simili",
    storageText1:
      "Asko Cafe può usare cookie tecnicamente necessari, local storage o tecnologie simili, ad esempio per sessioni login, impostazioni lingua, funzioni di sicurezza o funzioni richieste.",
    storageText2:
      "Se vengono usati cookie non essenziali o tecnologie comparabili, ciò avviene solo sulla base del consenso quando richiesto dalla legge.",

    recipientsTitle: "12. Destinatari e fornitori tecnici",
    recipientsText:
      "Per fornire la piattaforma possono essere usati fornitori tecnici, in particolare per hosting, database, autenticazione, archiviazione, sicurezza e infrastruttura. Ciò può includere Vercel, Supabase, Discord OAuth e NextAuth se questi servizi sono effettivamente usati.",

    durationTitle: "13. Durata di conservazione",
    durationText:
      "I dati personali vengono conservati solo per il tempo necessario alle rispettive finalità. Inserimenti server, recensioni, segnalazioni e dati di moderazione possono essere conservati finché necessario per gestione piattaforma, prevenzione abusi, tracciabilità delle decisioni di moderazione o obblighi legali.",

    rightsTitle: "14. Diritti degli interessati",
    rightsIntro: "Gli interessati hanno in particolare i seguenti diritti secondo il GDPR:",
    rightsItems: [
      "diritto di accesso",
      "diritto di rettifica",
      "diritto alla cancellazione",
      "diritto alla limitazione del trattamento",
      "diritto alla portabilità dei dati",
      "diritto di opposizione",
      "diritto di revocare il consenso",
      "diritto di proporre reclamo a un’autorità di controllo privacy",
    ],

    securityTitle: "15. Sicurezza dei dati",
    securityText:
      "Vengono adottate misure tecniche e organizzative adeguate per proteggere i dati da perdita, abuso, accesso non autorizzato, divulgazione non autorizzata e modifica. Tuttavia non può essere garantita una trasmissione completamente priva di rischi su Internet.",

    changesTitle: "16. Modifiche a questa informativa",
    changesText:
      "Questa informativa può essere aggiornata se cambiano circostanze tecniche, legali o organizzative.",

    imprint: "Impressum",
    discordTicket: "sistema ticket Discord",
  },

  pl: {
    badge: "Prywatność",
    title: "Polityka prywatności",
    intro:
      "Niniejsza polityka prywatności informuje, jakie dane osobowe są przetwarzane podczas korzystania z Asko Cafe, w jakich celach i jakie prawa mają osoby, których dane dotyczą.",
    legalNote:
      "Niemiecka wersja tej polityki prywatności jest prawnie wiążąca. Tłumaczenia służą wyłącznie lepszemu zrozumieniu.",

    controllerTitle: "1. Administrator danych",
    controllerText:
      "Administratorem w rozumieniu RODO jest operator Asko Cafe. Pełne dane dostawcy i kontakt znajdują się w impressum.",

    contactTitle: "2. Kontakt w sprawach prywatności",
    contactText:
      "Zapytania dotyczące prywatności, dostępu, usunięcia danych lub inne sprawy można wysyłać e-mailem albo przez system ticketów Discord.",

    generalTitle: "3. Ogólne przetwarzanie danych",
    generalText:
      "Dane osobowe są przetwarzane, gdy jest to konieczne do udostępnienia strony, korzystania z funkcji platformy, zarządzania wpisami serwerów Discord, realizacji logowania i bezpieczeństwa, moderacji, obsługi zgłoszeń lub spełnienia obowiązków prawnych.",

    legalBasisTitle: "4. Podstawy prawne",
    legalBasisIntro:
      "W zależności od funkcji dane osobowe są przetwarzane na następujących podstawach prawnych:",
    legalBasisItems: [
      "Art. 6 ust. 1 lit. a RODO – zgoda",
      "Art. 6 ust. 1 lit. b RODO – wykonanie umowy lub działania przedumowne",
      "Art. 6 ust. 1 lit. c RODO – spełnienie obowiązków prawnych",
      "Art. 6 ust. 1 lit. f RODO – uzasadnione interesy, w szczególności bezpieczeństwo, zapobieganie nadużyciom, moderacja i stabilne działanie",
    ],

    hostingTitle: "5. Hosting i techniczne dane dostępu",
    hostingText:
      "Podczas odwiedzania strony przetwarzane są technicznie niezbędne dane, aby strona mogła być dostarczana i bezpiecznie obsługiwana. Może to obejmować adres IP, datę i godzinę dostępu, informacje o przeglądarce, referrer, żądane strony, dane systemowe i logi.",

    discordTitle: "6. Logowanie Discord i konto użytkownika",
    discordText1:
      "Jeżeli oferowane jest logowanie przez Discord, dane udostępnione przez Discord są przetwarzane w zakresie koniecznym do logowania, przypisania konta i funkcji platformy. Może to obejmować ID Discord, nazwę użytkownika, avatar, publiczne dane profilu i inne dane potrzebne do uwierzytelnienia.",
    discordText2:
      "Rejestrując się lub logując do Asko Cafe, użytkownik akceptuje warunki korzystania w aktualnej wersji.",

    serverTitle: "7. Wpisy serwerów",
    serverIntro:
      "Gdy serwer Discord jest dodawany lub edytowany, mogą być przetwarzane w szczególności następujące dane:",
    serverItems: [
      "nazwa serwera",
      "opis serwera",
      "kategoria, język, kraj i tagi",
      "link zaproszenia Discord",
      "banner, logo lub obraz serwera",
      "oznaczenie NSFW",
      "status Premium lub Partner",
      "czasy bump i blokady bump",
      "status moderacji, powody i moderatorzy",
    ],

    reviewTitle: "8. Oceny, komentarze i zgłoszenia",
    reviewText:
      "Użytkownicy mogą dodawać oceny, komentarze i zgłoszenia. W tym kontekście mogą być przetwarzane ID Discord, nazwa użytkownika, ocena, tekst komentarza, powód zgłoszenia, zgłoszony serwer, zgłoszona ocena, znaczniki czasu i decyzje moderacyjne.",

    moderationTitle: "9. Moderacja i bezpieczeństwo",
    moderationText:
      "Dla bezpieczeństwa platformy i egzekwowania zasad treści mogą być sprawdzane, serwery blokowane, banowane lub usuwane, oceny ukrywane lub usuwane oraz nakładane blokady bump. Zapisywane są powody moderacji, czas, długość oraz odpowiedzialne konta staff.",

    notificationsTitle: "10. Powiadomienia",
    notificationsText:
      "Użytkownicy mogą otrzymywać powiadomienia, np. gdy serwer został zaakceptowany, odrzucony, zablokowany, zbanowany, usunięty, aktywowano Premium, aktywowano Partner lub ocena została zmoderowana.",

    storageTitle: "11. Cookies, local storage i podobne technologie",
    storageText1:
      "Asko Cafe może używać technicznie niezbędnych cookies, local storage lub podobnych technologii, np. dla sesji logowania, ustawień języka, funkcji bezpieczeństwa lub żądanych funkcji.",
    storageText2:
      "Jeżeli używane są niekonieczne cookies lub podobne technologie, dzieje się to tylko na podstawie zgody, jeśli prawo tego wymaga.",

    recipientsTitle: "12. Odbiorcy i dostawcy techniczni",
    recipientsText:
      "Do udostępnienia platformy mogą być używani dostawcy techniczni, szczególnie hosting, baza danych, uwierzytelnianie, przechowywanie, bezpieczeństwo i infrastruktura. Może to obejmować Vercel, Supabase, Discord OAuth i NextAuth, jeśli te usługi są faktycznie używane.",

    durationTitle: "13. Okres przechowywania",
    durationText:
      "Dane osobowe są przechowywane tylko tak długo, jak jest to potrzebne do odpowiednich celów. Wpisy serwerów, oceny, zgłoszenia i dane moderacyjne mogą być przechowywane, dopóki jest to konieczne do zarządzania platformą, zapobiegania nadużyciom, śledzenia decyzji moderacyjnych lub spełniania obowiązków prawnych.",

    rightsTitle: "14. Prawa osób, których dane dotyczą",
    rightsIntro: "Osobom, których dane dotyczą, przysługują według RODO w szczególności:",
    rightsItems: [
      "prawo dostępu",
      "prawo do sprostowania",
      "prawo do usunięcia",
      "prawo do ograniczenia przetwarzania",
      "prawo do przenoszenia danych",
      "prawo sprzeciwu",
      "prawo cofnięcia zgody",
      "prawo skargi do organu nadzorczego ochrony danych",
    ],

    securityTitle: "15. Bezpieczeństwo danych",
    securityText:
      "Stosowane są odpowiednie środki techniczne i organizacyjne w celu ochrony danych przed utratą, nadużyciem, nieuprawnionym dostępem, nieuprawnionym ujawnieniem i zmianą. Nie można jednak zagwarantować całkowicie bezpiecznej transmisji danych w Internecie.",

    changesTitle: "16. Zmiany tej polityki",
    changesText:
      "Ta polityka prywatności może zostać zaktualizowana, jeśli zmienią się okoliczności techniczne, prawne lub organizacyjne.",

    imprint: "Impressum",
    discordTicket: "system ticketów Discord",
  },
} as const;

function tx(language: UiLanguage, key: keyof typeof PRIVACY_TEXT.de) {
  return PRIVACY_TEXT[language]?.[key] || PRIVACY_TEXT.de[key];
}

function list(
  language: UiLanguage,
  key: "legalBasisItems" | "serverItems" | "rightsItems"
) {
  return PRIVACY_TEXT[language]?.[key] || PRIVACY_TEXT.de[key];
}

export default function DatenschutzPage() {
  const language = useLanguage() as UiLanguage;

  return (
    <main className="legal-page">
      <section className="legal-card">
        <span className="page-badge">🔐 {tx(language, "badge")}</span>
        <h1>{tx(language, "title")}</h1>

        <p>{tx(language, "intro")}</p>
        <p className="legal-small">{tx(language, "legalNote")}</p>

        <h2>{tx(language, "controllerTitle")}</h2>
        <p>
          {tx(language, "controllerText")}{" "}
          <Link href="/impressum">{tx(language, "imprint")}</Link>.
        </p>

        <h2>{tx(language, "contactTitle")}</h2>
        <p>
          {tx(language, "contactText")}{" "}
          <a href="mailto:dcaskocafe@gmail.com">dcaskocafe@gmail.com</a> ·{" "}
          <a href="https://discord.gg/asko" target="_blank" rel="noreferrer">
            {tx(language, "discordTicket")}
          </a>
        </p>

        <h2>{tx(language, "generalTitle")}</h2>
        <p>{tx(language, "generalText")}</p>

        <h2>{tx(language, "legalBasisTitle")}</h2>
        <p>{tx(language, "legalBasisIntro")}</p>
        <ul>
          {list(language, "legalBasisItems").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{tx(language, "hostingTitle")}</h2>
        <p>{tx(language, "hostingText")}</p>

        <h2>{tx(language, "discordTitle")}</h2>
        <p>{tx(language, "discordText1")}</p>
        <p>{tx(language, "discordText2")}</p>

        <h2>{tx(language, "serverTitle")}</h2>
        <p>{tx(language, "serverIntro")}</p>
        <ul>
          {list(language, "serverItems").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{tx(language, "reviewTitle")}</h2>
        <p>{tx(language, "reviewText")}</p>

        <h2>{tx(language, "moderationTitle")}</h2>
        <p>{tx(language, "moderationText")}</p>

        <h2>{tx(language, "notificationsTitle")}</h2>
        <p>{tx(language, "notificationsText")}</p>

        <h2>{tx(language, "storageTitle")}</h2>
        <p>{tx(language, "storageText1")}</p>
        <p>{tx(language, "storageText2")}</p>

        <h2>{tx(language, "recipientsTitle")}</h2>
        <p>{tx(language, "recipientsText")}</p>

        <h2>{tx(language, "durationTitle")}</h2>
        <p>{tx(language, "durationText")}</p>

        <h2>{tx(language, "rightsTitle")}</h2>
        <p>{tx(language, "rightsIntro")}</p>
        <ul>
          {list(language, "rightsItems").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{tx(language, "securityTitle")}</h2>
        <p>{tx(language, "securityText")}</p>

        <h2>{tx(language, "changesTitle")}</h2>
        <p>{tx(language, "changesText")}</p>
      </section>
    </main>
  );
}
