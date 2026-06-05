"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button className="btn secondary">Loading...</button>;
  }

  if (!session) {
    return (
      <button className="btn secondary" onClick={() => signIn("discord")}>
        Login with Discord
      </button>
    );
  }

  return (
    <div className="user-menu">
      <Link href="/profile" className="user-pill">
        {session.user?.image ? (
          <img src={session.user.image} alt="Discord Avatar" />
        ) : (
          <span className="user-avatar-fallback">?</span>
        )}

        <span>{session.user?.name ?? "Profile"}</span>
      </Link>

      <button className="logout-btn" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
