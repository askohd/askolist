import { publicPageMetadata } from "@/lib/pageMetadata";

export const metadata = publicPageMetadata(
  "/impressum",
  "Impressum",
  "Anbieterangaben und Kontaktinformationen zur Discord Serverliste Asko Cafe."
);

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
