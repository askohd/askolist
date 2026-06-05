import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark">
            <Image
              src="/logo.png"
              alt="AskoList Logo"
              width={38}
              height={38}
              priority
            />
          </span>
          <span>AskoList</span>
        </Link>

        <nav className="nav-links">
          <Link href="/servers">Servers</Link>
          <Link href="/submit">Submit Server</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/admin">Admin</Link>
        </nav>

        <button className="btn secondary">Login with Discord</button>
      </div>
    </header>
  );
}
