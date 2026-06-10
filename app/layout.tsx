import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Asko Cafe",
  description: "Discover Discord Servers Worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
