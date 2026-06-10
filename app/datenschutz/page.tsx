"use client";

import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

type UiLanguage = "de" | "en" | "fr" | "it" | "pl";

const RESPONSIBLE_NAME = "Tim Buschmann";
const RESPONSIBLE_STREET = "Schlosstraße 1";
const RESPONSIBLE_CITY = "23701 Eutin";
const SUPPORT_EMAIL = "dcaskocafe@gmail.com";
const DISCORD_INVITE_URL = "https://discord.gg/askocafe";

const PRIVACY_TEXT = {
  de: {
    badge: "🔐 Datenschutz",
    title: "Datenschutzerklärung",
    intro:
      "Hier erklären wir, welche personenbezogenen Daten auf Asko Cafe verarbeitet werden, warum sie verarbeitet werden, wo sie gespeichert werden können und welche Rechte Nutzer haben.",
    responsibleTitle: "1. Verantwortlicher",
    emailLabel: "E-Mail",
    country: "Deutschland",
    sideTitle: "Kontakt",
    sideText:
      "Datenschutzanfragen kannst du per E-Mail oder über den Discord-Support stellen.",
    discordSupport: "Discord-Support",
    impressum: "Impressum",
    terms: "Nutzungsbedingungen",
    tableData: "Daten",
    tablePurpose: "Zweck",
    tableLegalBasis: "Rechtsgrundlage",
    tableServerData: "Serverdaten",
    tableUserData: "Nutzerdaten",
    tableModerationData: "Moderationsdaten",
    sections: [
      {
        title: "2. Grundsatz",
        paragraphs: [
          "Wir verarbeiten personenbezogene Daten nur, soweit dies für den Betrieb von Asko Cafe, die Bereitstellung von Nutzerfunktionen, die Anmeldung über Discord, die Verwaltung von Servereinträgen, die Moderation, die Sicherheit der Plattform oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.",
        ],
      },
      {
        title: "3. Hosting und technische Bereitstellung",
        paragraphs: [
          "Beim Aufruf der Website werden technisch notwendige Daten verarbeitet, damit die Website ausgeliefert und geschützt werden kann. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp, Betriebssystem, Referrer, aufgerufene Seiten, technische Fehlerdaten und Sicherheitsereignisse gehören.",
          "Diese Daten können durch den Hostinganbieter, CDN-Anbieter oder technische Dienstleister verarbeitet werden, damit die Website erreichbar, schnell und sicher bleibt.",
        ],
      },
      {
        title: "4. Daten bei Discord-Login",
        paragraphs: [
          "Wenn du dich über Discord anmeldest, verarbeiten wir Daten, die zur Anmeldung und Kontozuordnung erforderlich sind.",
        ],
        tableRows: [
          {
            label: "Daten",
            value:
              "Discord-ID, Discord-Username, Anzeigename, Avatar/Profilbild, gegebenenfalls E-Mail-Adresse, Session-ID, Login-Zeitpunkt.",
          },
          {
            label: "Zweck",
            value:
              "Anmeldung, Wiedererkennung des Nutzers, Zuordnung von Servereinträgen, Moderationsentscheidungen, Missbrauchsschutz.",
          },
          {
            label: "Rechtsgrundlage",
            value:
              "Art. 6 Abs. 1 lit. b DSGVO für Nutzerfunktionen und Art. 6 Abs. 1 lit. f DSGVO für Sicherheit, Nachweis und Missbrauchsschutz.",
          },
        ],
      },
      {
        title: "5. Daten bei Servereinträgen",
        paragraphs: [
          "Wenn du einen Discord-Server einträgst, speichern und verarbeiten wir die Daten, die für die Darstellung, Prüfung und Verwaltung des Servereintrags notwendig sind.",
        ],
        tableRows: [
          {
            label: "Serverdaten",
            value:
              "Servername, Beschreibung, Discord-Invite-Link, Kategorie, Sprache, Land, Tags, NSFW-Angabe, Banner, Logo, Premium-Design, Partner-/Premium-Status, Bump-Zeitpunkte, Erstellungs- und Änderungszeitpunkte.",
          },
          {
            label: "Nutzerdaten",
            value:
              "Discord-ID und Discord-Username des Einreichers oder Serverbetreibers, soweit sie zur Zuordnung und Verwaltung notwendig sind.",
          },
          {
            label: "Moderationsdaten",
            value:
              "Freigabe, Ablehnung, Sperren, Banns, Bump-Sperren, Gründe, Bearbeiter, Zeitpunkte und interne Prüfnotizen.",
          },
        ],
      },
      {
        title: "6. Bewertungen und Meldungen",
        paragraphs: [
          "Wenn Nutzer Bewertungen schreiben oder Inhalte melden, können wir folgende Daten speichern: Bewertung, Sterne, Kommentar, Meldungsgrund, Details, Serverbezug, Review-Bezug, Discord-ID, Discord-Username, Zeitpunkt und Bearbeitungsstatus.",
          "Diese Daten dienen dazu, Server transparenter zu machen, Missbrauch zu verhindern und gemeldete Inhalte prüfen zu können.",
        ],
      },
      {
        title: "7. Premium, Partner und Shop",
        paragraphs: [
          "Wenn Premium-, Partner- oder Shop-Funktionen genutzt werden, verarbeiten wir Daten zur gebuchten Funktion, Laufzeit, Status, ausgewähltem Design, zugehörigem Server und gegebenenfalls zur Zahlungsabwicklung. Zahlungsdaten werden, sofern externe Zahlungsanbieter genutzt werden, grundsätzlich durch den jeweiligen Zahlungsdienstleister verarbeitet.",
        ],
      },
      {
        title: "8. Bot- und Discord-API-Daten",
        paragraphs: [
          "Der Asko-Cafe-Bot kann technische Serverinformationen abrufen oder aktualisieren, soweit dies für die Plattformfunktionen erforderlich ist. Dazu können Server-ID, Servername, Icon, Invite-Status, Mitgliederanzahl, Online-Anzahl und Zeitpunkte der Aktualisierung gehören.",
        ],
      },
      {
        title: "9. Cookies, lokale Speicherung und Sessions",
        paragraphs: [
          "Asko Cafe kann technisch notwendige Cookies oder ähnliche Speichertechniken verwenden, zum Beispiel für Login-Sessions, Spracheinstellungen, Sicherheitsfunktionen oder die Funktionsfähigkeit der Website. Nicht notwendige Cookies oder Tracking-Funktionen sollen nur eingesetzt werden, wenn eine entsprechende Einwilligung vorliegt.",
        ],
      },
      {
        title: "10. Rechtsgrundlagen",
        paragraphs: [],
        items: [
          "Art. 6 Abs. 1 lit. b DSGVO: Vertragliche oder vorvertragliche Leistungen, zum Beispiel Login, Servereintrag, Profilverwaltung.",
          "Art. 6 Abs. 1 lit. f DSGVO: Berechtigtes Interesse am sicheren Betrieb, Missbrauchsschutz, Moderation, Nachweis und Plattformschutz.",
          "Art. 6 Abs. 1 lit. c DSGVO: Gesetzliche Pflichten, soweit solche bestehen.",
          "Art. 6 Abs. 1 lit. a DSGVO: Einwilligung, wenn freiwillige Funktionen oder nicht notwendige Cookies eingesetzt werden.",
        ],
      },
      {
        title: "11. Speicherdauer",
        paragraphs: [
          "Personenbezogene Daten werden nur so lange gespeichert, wie sie für den jeweiligen Zweck benötigt werden. Account- und Serverdaten können bis zur Löschung des Accounts oder Servereintrags gespeichert bleiben. Moderations-, Sperr-, Melde- und Sicherheitsdaten können länger gespeichert werden, soweit dies zur Nachvollziehbarkeit, zum Schutz der Plattform, zur Abwehr von Missbrauch oder zur Erfüllung rechtlicher Pflichten erforderlich ist.",
        ],
      },
      {
        title: "12. Empfänger und Dienstleister",
        paragraphs: [
          "Daten können durch technische Dienstleister verarbeitet werden, die für Betrieb, Hosting, Datenbank, Authentifizierung, E-Mail, Sicherheit, Deployment oder Zahlungsabwicklung eingesetzt werden. Dazu können insbesondere Hostinganbieter, Datenbankanbieter, Discord als Login- und Plattformanbieter sowie gegebenenfalls Zahlungsanbieter gehören.",
        ],
      },
      {
        title: "13. Drittlandübermittlung",
        paragraphs: [
          "Bei der Nutzung von Discord, Hosting-, Cloud- oder Zahlungsdiensten kann eine Verarbeitung außerhalb der Europäischen Union nicht ausgeschlossen werden. Soweit erforderlich, soll die Verarbeitung auf geeignete Garantien, Standardvertragsklauseln oder andere zulässige Mechanismen nach der DSGVO gestützt werden.",
        ],
      },
      {
        title: "14. Rechte der betroffenen Personen",
        paragraphs: ["Du hast nach Maßgabe der DSGVO insbesondere folgende Rechte:"],
        items: [
          "Auskunft über gespeicherte personenbezogene Daten,",
          "Berichtigung unrichtiger Daten,",
          "Löschung personenbezogener Daten,",
          "Einschränkung der Verarbeitung,",
          "Datenübertragbarkeit,",
          "Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen,",
          "Widerruf erteilter Einwilligungen für die Zukunft.",
        ],
      },
      {
        title: "15. Beschwerderecht",
        paragraphs: [
          "Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn du der Ansicht bist, dass die Verarbeitung deiner personenbezogenen Daten gegen Datenschutzrecht verstößt.",
        ],
      },
      {
        title: "16. Sicherheit",
        paragraphs: [
          "Wir treffen technische und organisatorische Maßnahmen, um die Plattform und gespeicherte Daten vor Missbrauch, unbefugtem Zugriff, Verlust oder Manipulation zu schützen. Ein vollständiger Schutz bei Datenübertragung im Internet kann jedoch nicht garantiert werden.",
        ],
      },
      {
        title: "17. Änderung dieser Datenschutzerklärung",
        paragraphs: [
          "Diese Datenschutzerklärung kann angepasst werden, wenn sich Funktionen, Dienstleister, Rechtslage oder technische Abläufe ändern. Es gilt die jeweils auf der Website veröffentlichte Fassung.",
        ],
      },
    ],
  },

  en: {
    badge: "🔐 Privacy",
    title: "Privacy Policy",
    intro:
      "This page explains which personal data is processed on Asko Cafe, why it is processed, where it may be stored and which rights users have.",
    responsibleTitle: "1. Controller",
    emailLabel: "Email",
    country: "Germany",
    sideTitle: "Contact",
    sideText:
      "Privacy requests can be sent by email or through Discord support.",
    discordSupport: "Discord support",
    impressum: "Legal Notice",
    terms: "Terms of Use",
    sections: [
      {
        title: "2. Principle",
        paragraphs: [
          "We process personal data only to the extent necessary for operating Asko Cafe, providing user features, Discord login, managing server listings, moderation, platform security or complying with legal obligations.",
        ],
      },
      {
        title: "3. Hosting and technical delivery",
        paragraphs: [
          "When the website is accessed, technically necessary data is processed so the website can be delivered and protected. This may include IP address, date and time of access, browser type, operating system, referrer, accessed pages, technical error data and security events.",
          "This data may be processed by hosting providers, CDN providers or technical service providers so the website remains available, fast and secure.",
        ],
      },
      {
        title: "4. Data during Discord login",
        paragraphs: [
          "When you log in through Discord, we process data required for authentication and account assignment.",
        ],
        tableRows: [
          {
            label: "Data",
            value:
              "Discord ID, Discord username, display name, avatar/profile picture, possibly email address, session ID and login time.",
          },
          {
            label: "Purpose",
            value:
              "Login, user recognition, assignment of server entries, moderation decisions and abuse protection.",
          },
          {
            label: "Legal basis",
            value:
              "Art. 6(1)(b) GDPR for user features and Art. 6(1)(f) GDPR for security, proof and abuse protection.",
          },
        ],
      },
      {
        title: "5. Data for server listings",
        paragraphs: [
          "When you submit a Discord server, we store and process the data necessary for displaying, reviewing and managing the server listing.",
        ],
        tableRows: [
          {
            label: "Server data",
            value:
              "Server name, description, Discord invite link, category, language, country, tags, NSFW information, banner, logo, premium design, partner/premium status, bump times, creation and update times.",
          },
          {
            label: "User data",
            value:
              "Discord ID and Discord username of the submitter or server operator, as far as necessary for assignment and management.",
          },
          {
            label: "Moderation data",
            value:
              "Approval, rejection, locks, bans, bump bans, reasons, handlers, timestamps and internal review notes.",
          },
        ],
      },
      {
        title: "6. Reviews and reports",
        paragraphs: [
          "When users write reviews or report content, we may store the following data: review, rating, comment, report reason, details, server reference, review reference, Discord ID, Discord username, timestamp and processing status.",
          "This data is used to make servers more transparent, prevent abuse and review reported content.",
        ],
      },
      {
        title: "7. Premium, partner and shop",
        paragraphs: [
          "When premium, partner or shop features are used, we process data about the booked feature, duration, status, selected design, associated server and, where applicable, payment processing. If external payment providers are used, payment data is generally processed by the respective payment provider.",
        ],
      },
      {
        title: "8. Bot and Discord API data",
        paragraphs: [
          "The Asko Cafe bot may retrieve or update technical server information where necessary for platform functions. This may include server ID, server name, icon, invite status, member count, online count and update timestamps.",
        ],
      },
      {
        title: "9. Cookies, local storage and sessions",
        paragraphs: [
          "Asko Cafe may use technically necessary cookies or similar storage technologies, for example for login sessions, language settings, security functions or website functionality. Non-essential cookies or tracking features should only be used when consent has been given.",
        ],
      },
      {
        title: "10. Legal bases",
        paragraphs: [],
        items: [
          "Art. 6(1)(b) GDPR: contractual or pre-contractual services, such as login, server listing and profile management.",
          "Art. 6(1)(f) GDPR: legitimate interest in secure operation, abuse protection, moderation, proof and platform protection.",
          "Art. 6(1)(c) GDPR: legal obligations where applicable.",
          "Art. 6(1)(a) GDPR: consent where voluntary features or non-essential cookies are used.",
        ],
      },
      {
        title: "11. Storage period",
        paragraphs: [
          "Personal data is stored only as long as needed for the respective purpose. Account and server data may remain stored until the account or server listing is deleted. Moderation, lock, report and security data may be stored longer where necessary for traceability, platform protection, abuse prevention or legal obligations.",
        ],
      },
      {
        title: "12. Recipients and service providers",
        paragraphs: [
          "Data may be processed by technical service providers used for operation, hosting, database, authentication, email, security, deployment or payment processing. This may include hosting providers, database providers, Discord as login and platform provider and, where applicable, payment providers.",
        ],
      },
      {
        title: "13. Third-country transfers",
        paragraphs: [
          "When using Discord, hosting, cloud or payment services, processing outside the European Union cannot be excluded. Where required, processing should be based on appropriate safeguards, standard contractual clauses or other mechanisms permitted under the GDPR.",
        ],
      },
      {
        title: "14. Rights of data subjects",
        paragraphs: ["Under the GDPR, you have in particular the following rights:"],
        items: [
          "access to stored personal data,",
          "correction of inaccurate data,",
          "deletion of personal data,",
          "restriction of processing,",
          "data portability,",
          "objection to processing based on legitimate interests,",
          "withdrawal of consent with effect for the future.",
        ],
      },
      {
        title: "15. Right to lodge a complaint",
        paragraphs: [
          "You have the right to lodge a complaint with a data protection supervisory authority if you believe that the processing of your personal data violates data protection law.",
        ],
      },
      {
        title: "16. Security",
        paragraphs: [
          "We take technical and organizational measures to protect the platform and stored data against abuse, unauthorized access, loss or manipulation. However, complete protection during data transmission over the internet cannot be guaranteed.",
        ],
      },
      {
        title: "17. Changes to this privacy policy",
        paragraphs: [
          "This privacy policy may be updated if features, service providers, legal requirements or technical processes change. The version published on the website applies.",
        ],
      },
    ],
  },

  fr: {
    badge: "🔐 Confidentialité",
    title: "Politique de confidentialité",
    intro:
      "Cette page explique quelles données personnelles sont traitées sur Asko Cafe, pourquoi elles sont traitées, où elles peuvent être stockées et quels droits les utilisateurs ont.",
    responsibleTitle: "1. Responsable",
    emailLabel: "E-mail",
    country: "Allemagne",
    sideTitle: "Contact",
    sideText:
      "Les demandes relatives à la protection des données peuvent être envoyées par e-mail ou via le support Discord.",
    discordSupport: "Support Discord",
    impressum: "Mentions légales",
    terms: "Conditions d’utilisation",
    sections: [
      {
        title: "2. Principe",
        paragraphs: [
          "Nous ne traitons les données personnelles que dans la mesure nécessaire au fonctionnement d’Asko Cafe, à la mise à disposition des fonctions utilisateur, à la connexion via Discord, à la gestion des serveurs, à la modération, à la sécurité de la plateforme ou au respect d’obligations légales.",
        ],
      },
      {
        title: "3. Hébergement et fourniture technique",
        paragraphs: [
          "Lors de l’accès au site, des données techniquement nécessaires sont traitées afin que le site puisse être fourni et protégé. Cela peut inclure l’adresse IP, la date et l’heure d’accès, le type de navigateur, le système d’exploitation, le référent, les pages consultées, les données d’erreur technique et les événements de sécurité.",
          "Ces données peuvent être traitées par des hébergeurs, fournisseurs CDN ou prestataires techniques afin que le site reste accessible, rapide et sécurisé.",
        ],
      },
      {
        title: "4. Données lors de la connexion Discord",
        paragraphs: [
          "Lorsque tu te connectes via Discord, nous traitons les données nécessaires à la connexion et à l’attribution du compte.",
        ],
        tableRows: [
          {
            label: "Données",
            value:
              "ID Discord, nom d’utilisateur Discord, nom affiché, avatar/photo de profil, éventuellement adresse e-mail, ID de session et heure de connexion.",
          },
          {
            label: "Finalité",
            value:
              "Connexion, reconnaissance de l’utilisateur, attribution des serveurs, décisions de modération et protection contre les abus.",
          },
          {
            label: "Base juridique",
            value:
              "Art. 6 al. 1 let. b RGPD pour les fonctions utilisateur et Art. 6 al. 1 let. f RGPD pour la sécurité, la preuve et la protection contre les abus.",
          },
        ],
      },
      {
        title: "5. Données lors de l’ajout de serveurs",
        paragraphs: [
          "Lorsque tu ajoutes un serveur Discord, nous stockons et traitons les données nécessaires à l’affichage, à la vérification et à la gestion de l’entrée serveur.",
        ],
        tableRows: [
          {
            label: "Données serveur",
            value:
              "Nom du serveur, description, lien d’invitation Discord, catégorie, langue, pays, tags, indication NSFW, bannière, logo, design premium, statut partenaire/premium, dates de bump, dates de création et de modification.",
          },
          {
            label: "Données utilisateur",
            value:
              "ID Discord et nom d’utilisateur Discord de la personne ayant ajouté le serveur ou de l’exploitant du serveur, dans la mesure nécessaire à l’attribution et à la gestion.",
          },
          {
            label: "Données de modération",
            value:
              "Validation, refus, verrouillages, bannissements, bump-bans, raisons, personnes responsables, dates et notes internes.",
          },
        ],
      },
      {
        title: "6. Avis et signalements",
        paragraphs: [
          "Lorsque des utilisateurs écrivent des avis ou signalent des contenus, nous pouvons stocker les données suivantes : avis, étoiles, commentaire, motif du signalement, détails, référence serveur, référence avis, ID Discord, nom d’utilisateur Discord, date et statut de traitement.",
          "Ces données servent à rendre les serveurs plus transparents, à prévenir les abus et à vérifier les contenus signalés.",
        ],
      },
      {
        title: "7. Premium, partenaire et boutique",
        paragraphs: [
          "Lorsque des fonctions premium, partenaire ou boutique sont utilisées, nous traitons les données relatives à la fonction réservée, la durée, le statut, le design choisi, le serveur associé et, le cas échéant, le paiement. Si des prestataires de paiement externes sont utilisés, les données de paiement sont généralement traitées par le prestataire concerné.",
        ],
      },
      {
        title: "8. Données du bot et de l’API Discord",
        paragraphs: [
          "Le bot Asko Cafe peut récupérer ou mettre à jour des informations techniques de serveur lorsque cela est nécessaire aux fonctions de la plateforme. Cela peut inclure l’ID du serveur, le nom du serveur, l’icône, le statut de l’invitation, le nombre de membres, le nombre en ligne et les dates de mise à jour.",
        ],
      },
      {
        title: "9. Cookies, stockage local et sessions",
        paragraphs: [
          "Asko Cafe peut utiliser des cookies techniquement nécessaires ou des technologies similaires, par exemple pour les sessions de connexion, les paramètres de langue, les fonctions de sécurité ou le bon fonctionnement du site. Les cookies non nécessaires ou les fonctions de suivi ne doivent être utilisés qu’avec consentement.",
        ],
      },
      {
        title: "10. Bases juridiques",
        paragraphs: [],
        items: [
          "Art. 6 al. 1 let. b RGPD : services contractuels ou précontractuels, par exemple connexion, ajout de serveur et gestion de profil.",
          "Art. 6 al. 1 let. f RGPD : intérêt légitime au fonctionnement sécurisé, à la protection contre les abus, à la modération, à la preuve et à la protection de la plateforme.",
          "Art. 6 al. 1 let. c RGPD : obligations légales, le cas échéant.",
          "Art. 6 al. 1 let. a RGPD : consentement lorsque des fonctions volontaires ou des cookies non nécessaires sont utilisés.",
        ],
      },
      {
        title: "11. Durée de conservation",
        paragraphs: [
          "Les données personnelles ne sont conservées que le temps nécessaire à la finalité concernée. Les données de compte et de serveur peuvent rester stockées jusqu’à la suppression du compte ou de l’entrée serveur. Les données de modération, verrouillage, signalement et sécurité peuvent être conservées plus longtemps si cela est nécessaire à la traçabilité, à la protection de la plateforme, à la lutte contre les abus ou au respect d’obligations légales.",
        ],
      },
      {
        title: "12. Destinataires et prestataires",
        paragraphs: [
          "Les données peuvent être traitées par des prestataires techniques utilisés pour l’exploitation, l’hébergement, la base de données, l’authentification, l’e-mail, la sécurité, le déploiement ou le paiement. Cela peut inclure des hébergeurs, fournisseurs de base de données, Discord comme fournisseur de connexion et de plateforme ainsi que, le cas échéant, des prestataires de paiement.",
        ],
      },
      {
        title: "13. Transferts vers des pays tiers",
        paragraphs: [
          "Lors de l’utilisation de Discord, de services d’hébergement, de cloud ou de paiement, un traitement en dehors de l’Union européenne ne peut pas être exclu. Si nécessaire, ce traitement doit être fondé sur des garanties appropriées, des clauses contractuelles types ou d’autres mécanismes autorisés par le RGPD.",
        ],
      },
      {
        title: "14. Droits des personnes concernées",
        paragraphs: ["Conformément au RGPD, tu disposes notamment des droits suivants :"],
        items: [
          "accès aux données personnelles stockées,",
          "rectification des données incorrectes,",
          "suppression des données personnelles,",
          "limitation du traitement,",
          "portabilité des données,",
          "opposition au traitement fondé sur des intérêts légitimes,",
          "retrait du consentement pour l’avenir.",
        ],
      },
      {
        title: "15. Droit de réclamation",
        paragraphs: [
          "Tu as le droit d’introduire une réclamation auprès d’une autorité de contrôle de la protection des données si tu estimes que le traitement de tes données personnelles viole le droit de la protection des données.",
        ],
      },
      {
        title: "16. Sécurité",
        paragraphs: [
          "Nous prenons des mesures techniques et organisationnelles pour protéger la plateforme et les données stockées contre les abus, les accès non autorisés, la perte ou la manipulation. Une protection complète lors de la transmission de données sur internet ne peut toutefois pas être garantie.",
        ],
      },
      {
        title: "17. Modification de cette politique",
        paragraphs: [
          "Cette politique de confidentialité peut être adaptée si les fonctions, prestataires, exigences légales ou processus techniques changent. La version publiée sur le site s’applique.",
        ],
      },
    ],
  },

  it: {
    badge: "🔐 Privacy",
    title: "Privacy policy",
    intro:
      "Qui spieghiamo quali dati personali vengono trattati su Asko Cafe, perché vengono trattati, dove possono essere salvati e quali diritti hanno gli utenti.",
    responsibleTitle: "1. Titolare",
    emailLabel: "E-mail",
    country: "Germania",
    sideTitle: "Contatto",
    sideText:
      "Le richieste sulla privacy possono essere inviate via e-mail o tramite supporto Discord.",
    discordSupport: "Supporto Discord",
    impressum: "Note legali",
    terms: "Condizioni d’uso",
    sections: [
      {
        title: "2. Principio",
        paragraphs: [
          "Trattiamo dati personali solo nella misura necessaria per il funzionamento di Asko Cafe, la fornitura delle funzioni utente, l’accesso tramite Discord, la gestione degli inserimenti server, la moderazione, la sicurezza della piattaforma o l’adempimento di obblighi legali.",
        ],
      },
      {
        title: "3. Hosting e fornitura tecnica",
        paragraphs: [
          "Quando il sito viene visitato, vengono trattati dati tecnicamente necessari affinché il sito possa essere fornito e protetto. Questo può includere indirizzo IP, data e ora di accesso, tipo di browser, sistema operativo, referrer, pagine visitate, dati di errore tecnico ed eventi di sicurezza.",
          "Questi dati possono essere trattati da provider di hosting, CDN o fornitori tecnici affinché il sito resti disponibile, veloce e sicuro.",
        ],
      },
      {
        title: "4. Dati durante il login Discord",
        paragraphs: [
          "Quando accedi tramite Discord, trattiamo i dati necessari per l’accesso e l’assegnazione dell’account.",
        ],
        tableRows: [
          {
            label: "Dati",
            value:
              "ID Discord, username Discord, nome visualizzato, avatar/immagine profilo, eventualmente indirizzo e-mail, ID sessione e orario di login.",
          },
          {
            label: "Scopo",
            value:
              "Accesso, riconoscimento dell’utente, assegnazione degli inserimenti server, decisioni di moderazione e protezione dagli abusi.",
          },
          {
            label: "Base giuridica",
            value:
              "Art. 6 par. 1 lett. b GDPR per le funzioni utente e Art. 6 par. 1 lett. f GDPR per sicurezza, prova e protezione dagli abusi.",
          },
        ],
      },
      {
        title: "5. Dati negli inserimenti server",
        paragraphs: [
          "Quando inserisci un server Discord, salviamo e trattiamo i dati necessari per mostrare, verificare e gestire l’inserimento.",
        ],
        tableRows: [
          {
            label: "Dati server",
            value:
              "Nome server, descrizione, link invito Discord, categoria, lingua, paese, tag, indicazione NSFW, banner, logo, design premium, status partner/premium, orari di bump, date di creazione e modifica.",
          },
          {
            label: "Dati utente",
            value:
              "ID Discord e username Discord di chi inserisce il server o del gestore del server, nella misura necessaria per assegnazione e gestione.",
          },
          {
            label: "Dati di moderazione",
            value:
              "Approvazione, rifiuto, blocchi, ban, bump-ban, motivi, responsabili, date e note interne.",
          },
        ],
      },
      {
        title: "6. Recensioni e segnalazioni",
        paragraphs: [
          "Quando gli utenti scrivono recensioni o segnalano contenuti, possiamo salvare i seguenti dati: recensione, stelle, commento, motivo della segnalazione, dettagli, riferimento server, riferimento recensione, ID Discord, username Discord, data e stato di elaborazione.",
          "Questi dati servono a rendere i server più trasparenti, prevenire abusi e controllare i contenuti segnalati.",
        ],
      },
      {
        title: "7. Premium, partner e shop",
        paragraphs: [
          "Quando vengono usate funzioni premium, partner o shop, trattiamo dati relativi alla funzione prenotata, durata, stato, design scelto, server associato ed eventualmente pagamento. Se vengono usati fornitori di pagamento esterni, i dati di pagamento vengono generalmente trattati dal rispettivo fornitore.",
        ],
      },
      {
        title: "8. Dati del bot e API Discord",
        paragraphs: [
          "Il bot Asko Cafe può recuperare o aggiornare informazioni tecniche del server quando necessario per le funzioni della piattaforma. Questo può includere ID server, nome server, icona, stato invito, numero membri, numero online e timestamp degli aggiornamenti.",
        ],
      },
      {
        title: "9. Cookie, archiviazione locale e sessioni",
        paragraphs: [
          "Asko Cafe può usare cookie tecnicamente necessari o tecnologie simili, ad esempio per sessioni di login, impostazioni lingua, funzioni di sicurezza o funzionalità del sito. Cookie non necessari o funzioni di tracking dovrebbero essere usati solo con consenso.",
        ],
      },
      {
        title: "10. Basi giuridiche",
        paragraphs: [],
        items: [
          "Art. 6 par. 1 lett. b GDPR: servizi contrattuali o precontrattuali, ad esempio login, inserimento server e gestione profilo.",
          "Art. 6 par. 1 lett. f GDPR: interesse legittimo al funzionamento sicuro, protezione dagli abusi, moderazione, prova e protezione della piattaforma.",
          "Art. 6 par. 1 lett. c GDPR: obblighi legali, se applicabili.",
          "Art. 6 par. 1 lett. a GDPR: consenso quando vengono usate funzioni volontarie o cookie non necessari.",
        ],
      },
      {
        title: "11. Durata di conservazione",
        paragraphs: [
          "I dati personali vengono salvati solo per il tempo necessario allo scopo specifico. Dati account e server possono restare salvati fino alla cancellazione dell’account o dell’inserimento server. Dati di moderazione, blocco, segnalazione e sicurezza possono essere conservati più a lungo se necessario per tracciabilità, protezione della piattaforma, prevenzione abusi o obblighi legali.",
        ],
      },
      {
        title: "12. Destinatari e fornitori",
        paragraphs: [
          "I dati possono essere trattati da fornitori tecnici usati per funzionamento, hosting, database, autenticazione, e-mail, sicurezza, deployment o pagamenti. Questo può includere provider hosting, provider database, Discord come provider login e piattaforma e, se applicabile, provider di pagamento.",
        ],
      },
      {
        title: "13. Trasferimenti verso paesi terzi",
        paragraphs: [
          "Usando Discord, servizi hosting, cloud o pagamento, non si può escludere un trattamento fuori dall’Unione Europea. Se necessario, il trattamento dovrebbe basarsi su garanzie adeguate, clausole contrattuali standard o altri meccanismi consentiti dal GDPR.",
        ],
      },
      {
        title: "14. Diritti degli interessati",
        paragraphs: ["Ai sensi del GDPR hai in particolare i seguenti diritti:"],
        items: [
          "accesso ai dati personali salvati,",
          "rettifica dei dati inesatti,",
          "cancellazione dei dati personali,",
          "limitazione del trattamento,",
          "portabilità dei dati,",
          "opposizione al trattamento basato su interessi legittimi,",
          "revoca del consenso con effetto per il futuro.",
        ],
      },
      {
        title: "15. Diritto di reclamo",
        paragraphs: [
          "Hai il diritto di presentare reclamo a un’autorità di controllo per la protezione dei dati se ritieni che il trattamento dei tuoi dati personali violi la normativa sulla protezione dei dati.",
        ],
      },
      {
        title: "16. Sicurezza",
        paragraphs: [
          "Adottiamo misure tecniche e organizzative per proteggere la piattaforma e i dati salvati da abusi, accessi non autorizzati, perdita o manipolazione. Tuttavia una protezione completa nella trasmissione dati su internet non può essere garantita.",
        ],
      },
      {
        title: "17. Modifiche a questa privacy policy",
        paragraphs: [
          "Questa privacy policy può essere modificata se cambiano funzioni, fornitori, requisiti legali o processi tecnici. Si applica la versione pubblicata sul sito.",
        ],
      },
    ],
  },

  pl: {
    badge: "🔐 Prywatność",
    title: "Polityka prywatności",
    intro:
      "Tutaj wyjaśniamy, jakie dane osobowe są przetwarzane na Asko Cafe, dlaczego są przetwarzane, gdzie mogą być przechowywane i jakie prawa mają użytkownicy.",
    responsibleTitle: "1. Administrator danych",
    emailLabel: "E-mail",
    country: "Niemcy",
    sideTitle: "Kontakt",
    sideText:
      "Zapytania dotyczące prywatności możesz wysłać e-mailem lub przez wsparcie Discord.",
    discordSupport: "Wsparcie Discord",
    impressum: "Nota prawna",
    terms: "Warunki korzystania",
    sections: [
      {
        title: "2. Zasada",
        paragraphs: [
          "Przetwarzamy dane osobowe tylko w zakresie niezbędnym do działania Asko Cafe, udostępniania funkcji użytkownika, logowania przez Discord, zarządzania wpisami serwerów, moderacji, bezpieczeństwa platformy lub spełniania obowiązków prawnych.",
        ],
      },
      {
        title: "3. Hosting i techniczne udostępnienie",
        paragraphs: [
          "Podczas odwiedzania strony przetwarzane są dane technicznie niezbędne, aby strona mogła zostać dostarczona i zabezpieczona. Mogą to być w szczególności adres IP, data i godzina dostępu, typ przeglądarki, system operacyjny, referrer, odwiedzane strony, dane błędów technicznych i zdarzenia bezpieczeństwa.",
          "Dane te mogą być przetwarzane przez dostawców hostingu, CDN lub usług technicznych, aby strona była dostępna, szybka i bezpieczna.",
        ],
      },
      {
        title: "4. Dane przy logowaniu Discord",
        paragraphs: [
          "Gdy logujesz się przez Discord, przetwarzamy dane wymagane do logowania i przypisania konta.",
        ],
        tableRows: [
          {
            label: "Dane",
            value:
              "ID Discord, nazwa użytkownika Discord, nazwa wyświetlana, avatar/zdjęcie profilowe, ewentualnie adres e-mail, ID sesji i czas logowania.",
          },
          {
            label: "Cel",
            value:
              "Logowanie, rozpoznawanie użytkownika, przypisanie wpisów serwerów, decyzje moderacyjne i ochrona przed nadużyciami.",
          },
          {
            label: "Podstawa prawna",
            value:
              "Art. 6 ust. 1 lit. b RODO dla funkcji użytkownika oraz Art. 6 ust. 1 lit. f RODO dla bezpieczeństwa, dowodów i ochrony przed nadużyciami.",
          },
        ],
      },
      {
        title: "5. Dane przy wpisach serwerów",
        paragraphs: [
          "Gdy dodajesz serwer Discord, przechowujemy i przetwarzamy dane niezbędne do prezentacji, sprawdzenia i zarządzania wpisem serwera.",
        ],
        tableRows: [
          {
            label: "Dane serwera",
            value:
              "Nazwa serwera, opis, link zaproszenia Discord, kategoria, język, kraj, tagi, informacja NSFW, banner, logo, projekt premium, status partner/premium, czasy bumpów, daty utworzenia i zmiany.",
          },
          {
            label: "Dane użytkownika",
            value:
              "ID Discord i nazwa użytkownika Discord osoby dodającej lub operatora serwera, o ile jest to potrzebne do przypisania i zarządzania.",
          },
          {
            label: "Dane moderacyjne",
            value:
              "Akceptacja, odrzucenie, blokady, bany, bump-bany, powody, osoby obsługujące, daty i wewnętrzne notatki.",
          },
        ],
      },
      {
        title: "6. Recenzje i zgłoszenia",
        paragraphs: [
          "Gdy użytkownicy piszą recenzje lub zgłaszają treści, możemy przechowywać następujące dane: recenzja, gwiazdki, komentarz, powód zgłoszenia, szczegóły, odniesienie do serwera, odniesienie do recenzji, ID Discord, nazwa użytkownika Discord, czas i status obsługi.",
          "Dane te służą do zwiększenia przejrzystości serwerów, zapobiegania nadużyciom i sprawdzania zgłoszonych treści.",
        ],
      },
      {
        title: "7. Premium, partner i sklep",
        paragraphs: [
          "Gdy używane są funkcje premium, partnerskie lub sklepowe, przetwarzamy dane dotyczące wybranej funkcji, czasu trwania, statusu, wybranego projektu, powiązanego serwera i ewentualnie płatności. Jeśli używani są zewnętrzni dostawcy płatności, dane płatnicze są zasadniczo przetwarzane przez danego dostawcę.",
        ],
      },
      {
        title: "8. Dane bota i API Discord",
        paragraphs: [
          "Bot Asko Cafe może pobierać lub aktualizować techniczne informacje serwera, jeśli jest to potrzebne do funkcji platformy. Może to obejmować ID serwera, nazwę serwera, ikonę, status zaproszenia, liczbę członków, liczbę online i czas aktualizacji.",
        ],
      },
      {
        title: "9. Cookies, lokalne przechowywanie i sesje",
        paragraphs: [
          "Asko Cafe może używać technicznie niezbędnych cookies lub podobnych technologii, na przykład dla sesji logowania, ustawień języka, funkcji bezpieczeństwa lub działania strony. Cookies niekonieczne lub funkcje śledzenia powinny być używane tylko po uzyskaniu zgody.",
        ],
      },
      {
        title: "10. Podstawy prawne",
        paragraphs: [],
        items: [
          "Art. 6 ust. 1 lit. b RODO: usługi umowne lub przedumowne, na przykład logowanie, wpis serwera i zarządzanie profilem.",
          "Art. 6 ust. 1 lit. f RODO: uzasadniony interes w bezpiecznym działaniu, ochronie przed nadużyciami, moderacji, dowodach i ochronie platformy.",
          "Art. 6 ust. 1 lit. c RODO: obowiązki prawne, jeśli istnieją.",
          "Art. 6 ust. 1 lit. a RODO: zgoda, gdy używane są funkcje dobrowolne lub cookies niekonieczne.",
        ],
      },
      {
        title: "11. Okres przechowywania",
        paragraphs: [
          "Dane osobowe są przechowywane tylko tak długo, jak jest to potrzebne do danego celu. Dane konta i serwera mogą pozostać zapisane do czasu usunięcia konta lub wpisu serwera. Dane moderacyjne, blokady, zgłoszenia i bezpieczeństwa mogą być przechowywane dłużej, jeśli jest to potrzebne do przejrzystości, ochrony platformy, zapobiegania nadużyciom lub obowiązków prawnych.",
        ],
      },
      {
        title: "12. Odbiorcy i usługodawcy",
        paragraphs: [
          "Dane mogą być przetwarzane przez technicznych usługodawców używanych do działania, hostingu, bazy danych, uwierzytelniania, e-maila, bezpieczeństwa, wdrożenia lub płatności. Może to obejmować dostawców hostingu, dostawców bazy danych, Discord jako dostawcę logowania i platformy oraz ewentualnie dostawców płatności.",
        ],
      },
      {
        title: "13. Przekazywanie do państw trzecich",
        paragraphs: [
          "Przy korzystaniu z Discord, hostingu, usług chmurowych lub płatniczych nie można wykluczyć przetwarzania poza Unią Europejską. Jeśli jest to wymagane, przetwarzanie powinno opierać się na odpowiednich zabezpieczeniach, standardowych klauzulach umownych lub innych mechanizmach dopuszczalnych przez RODO.",
        ],
      },
      {
        title: "14. Prawa osób, których dane dotyczą",
        paragraphs: ["Zgodnie z RODO masz w szczególności następujące prawa:"],
        items: [
          "dostęp do zapisanych danych osobowych,",
          "sprostowanie nieprawidłowych danych,",
          "usunięcie danych osobowych,",
          "ograniczenie przetwarzania,",
          "przenoszenie danych,",
          "sprzeciw wobec przetwarzania na podstawie uzasadnionych interesów,",
          "cofnięcie zgody ze skutkiem na przyszłość.",
        ],
      },
      {
        title: "15. Prawo do skargi",
        paragraphs: [
          "Masz prawo złożyć skargę do organu nadzorczego ds. ochrony danych, jeśli uważasz, że przetwarzanie twoich danych osobowych narusza prawo ochrony danych.",
        ],
      },
      {
        title: "16. Bezpieczeństwo",
        paragraphs: [
          "Stosujemy środki techniczne i organizacyjne, aby chronić platformę i zapisane dane przed nadużyciami, nieuprawnionym dostępem, utratą lub manipulacją. Pełna ochrona podczas przesyłania danych w internecie nie może jednak zostać zagwarantowana.",
        ],
      },
      {
        title: "17. Zmiany tej polityki prywatności",
        paragraphs: [
          "Ta polityka prywatności może zostać zmieniona, jeśli zmienią się funkcje, usługodawcy, wymagania prawne lub procesy techniczne. Obowiązuje wersja opublikowana na stronie.",
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

export default function DatenschutzPage() {
  const language = normalizeLanguage(useLanguage());
  const pageText = PRIVACY_TEXT[language];

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
            radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.18), transparent 35%),
            radial-gradient(circle at 100% 0%, rgba(181, 76, 255, 0.18), transparent 34%),
            linear-gradient(135deg, rgba(18, 16, 42, 0.98), rgba(9, 10, 26, 0.98));
          border: 1px solid rgba(157, 234, 255, 0.18);
          box-shadow: 0 0 48px rgba(80, 190, 255, 0.10);
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

        .data-table {
          overflow: hidden;
          margin: 18px 0 26px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.10);
        }

        .data-row {
          display: grid;
          grid-template-columns: 230px 1fr;
          gap: 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .data-row:last-child {
          border-bottom: 0;
        }

        .data-row strong {
          padding: 14px 16px;
          color: #ffffff;
          background: rgba(157, 234, 255, 0.06);
        }

        .data-row span {
          padding: 14px 16px;
          color: rgba(236, 240, 255, 0.78);
          line-height: 1.6;
        }

        .legal-contact-box {
          margin: 16px 0 24px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(157, 234, 255, 0.06);
          border: 1px solid rgba(157, 234, 255, 0.16);
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

          .data-row {
            grid-template-columns: 1fr;
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
          <h2>{pageText.responsibleTitle}</h2>

          <div className="legal-contact-box">
            <p>
              <strong>{RESPONSIBLE_NAME}</strong>
              <br />
              {RESPONSIBLE_STREET}
              <br />
              {RESPONSIBLE_CITY}
              <br />
              {pageText.country}
            </p>

            <p>
              {pageText.emailLabel}:{" "}
              <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>

          {pageText.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {"tableRows" in section && section.tableRows && (
                <div className="data-table">
                  {section.tableRows.map((row) => (
                    <div className="data-row" key={row.label}>
                      <strong>{row.label}</strong>
                      <span>{row.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {"items" in section && section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <aside className="legal-side-card">
          <h2>{pageText.sideTitle}</h2>
          <p>{pageText.sideText}</p>

          <div className="legal-link-list">
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            <a href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
              {pageText.discordSupport}
            </a>
            <Link href="/impressum">{pageText.impressum}</Link>
            <Link href="/nutzungsbedingungen">{pageText.terms}</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
