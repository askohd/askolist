import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: 'AskoList – Discover Discord Servers Worldwide',
  description: 'Discover, rate and bump international Discord communities on AskoList.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
     <body>
  <AuthProvider>
    <Header />
    {children}
    <Footer />
  </AuthProvider>
</body>
