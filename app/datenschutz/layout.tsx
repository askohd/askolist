import { publicPageMetadata } from "@/lib/pageMetadata";

export const metadata = publicPageMetadata(
  "/datenschutz",
  "Datenschutzerklärung",
  "Informationen zur Verarbeitung personenbezogener Daten bei Discord-Login, Servereinträgen und der Nutzung von Asko Cafe."
);

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return children;
}
