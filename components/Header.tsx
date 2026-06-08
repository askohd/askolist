import Image from "next/image";
import Link from "next/link";
import LoginButton from "./LoginButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import TranslatedText from "@/components/TranslatedText";
import { getCurrentAdmin } from "@/lib/admin";

export default async function Header() {
  const admin = await getCurrentAdmin();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark">
            <Image
              src="/logo.png"
              alt="Asko Cafe Logo"
              width={56}
              height={56}
              priority
            />
          </span>
          <span>Asko Cafe</span>
        </Link>

        <nav className="nav-links">
          <Link href="/servers">
            <TranslatedText textKey="nav.servers" />
          </Link>

          <Link href="/submit">
            <TranslatedText textKey="nav.submit" />
          </Link>

          <Link href="/shop">
            <TranslatedText textKey="nav.shop" />
          </Link>

          <Link href="/profile">
            <TranslatedText textKey="nav.profile" />
          </Link>

          {admin && (
            <Link href="/admin">
              <TranslatedText textKey="nav.admin" />
            </Link>
          )}
        </nav>

        <LanguageSwitcher />
        <LoginButton />
      </div>
    </header>
  );
}
