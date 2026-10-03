import { publicPageMetadata } from "@/lib/pageMetadata";

export const metadata = publicPageMetadata(
  "/nutzungsbedingungen",
  "Nutzungsbedingungen",
  "Bedingungen für die Nutzung von Asko Cafe, das Eintragen von Discord Servern, Bewertungen und das Bump-System."
);

export default function NutzungsbedingungenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
