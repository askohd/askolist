import { publicPageMetadata } from "@/lib/pageMetadata";

export const metadata = publicPageMetadata(
  "/shop",
  "Shop und Premium-Funktionen",
  "Informationen zu Premium-Layouts und zusätzlichen Funktionen für Discord Server auf Asko Cafe. Der Shop ist noch im Aufbau; Käufe sind deaktiviert."
);

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
