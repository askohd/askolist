import Link from 'next/link';

export default function Header() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark">A</span>
          <span>AskoList</span>
        </Link>
        <nav className="nav-links">
          <Link href="/servers">Servers</Link>
          <Link href="/submit">Submit</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <button className="btn secondary">Login with Discord</button>
      </div>
    </header>
  );
}
