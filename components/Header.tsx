import Image from "next/image";
import Link from "next/link";
import LoginButton from "./LoginButton";
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
              alt="AskoList Logo"
              width={56}
              height={56}
              priority
            />
          </span>
          <span>AskoList</span>
        </Link>

        <nav className="nav-links">
          <Link href="/servers">Servers</Link>
          <Link href="/submit">Submit Server</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/profile">Profile</Link>

          {admin && <Link href="/admin">Admin</Link>}
        </nav>

        <LoginButton />
      </div>
    </header>
  );
}
