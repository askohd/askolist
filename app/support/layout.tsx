import { publicPageMetadata } from "@/lib/pageMetadata";

export const metadata = publicPageMetadata(
  "/support",
  "Support für deine Discord Serverliste",
  "Hilfe zu Servereinträgen, Freigaben, Bumps, Premium-Funktionen und deinem Account auf Asko Cafe. Erreiche den Support über Discord."
);

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
