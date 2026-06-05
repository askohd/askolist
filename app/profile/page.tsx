import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="container profile-page">
        <section className="profile-card">
          <h1>Login required</h1>
          <p>You need to login with Discord to view your profile.</p>

          <Link className="btn" href="/api/auth/signin">
            Login with Discord
          </Link>
        </section>
      </main>
    );
  }

  const user = session.user as any;

  const myServers: any[] = [];

  return (
    <main className="container profile-page">
      <section className="profile-header-card">
        <div className="profile-user">
          {session.user?.image ? (
            <img src={session.user.image} alt="Discord Avatar" />
          ) : (
            <div className="profile-avatar-fallback">?</div>
          )}

          <div>
            <span className="page-badge">Discord Profile</span>
            <h1>{session.user?.name}</h1>
            <p>Discord User ID: {user.id ?? "Not available"}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>My Servers</h2>
          <Link href="/submit" className="btn">
            Add Server
          </Link>
        </div>

        {myServers.length === 0 ? (
          <div className="card empty">
            <h3>No server added yet</h3>
            <p>
              You have not submitted a Discord server yet. Each user can add
              one server.
            </p>
            <Link href="/submit" className="btn">
              Submit your server
            </Link>
          </div>
        ) : (
          <div className="grid">
            {myServers.map((server) => (
              <div className="card" key={server.id}>
                <h3>{server.name}</h3>
                <p>{server.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
