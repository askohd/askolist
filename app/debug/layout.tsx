import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnose",
  robots: { index: false, follow: false },
};

export default function DebugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
