import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { categories, countries, languages } from "@/lib/demoData";

export default async function SubmitPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="container submit-page">
        <section className="profile-card">
          <span className="page-badge">Discord Login required</span>
          <h1>Login required</h1>
          <p>You need to login with Discord before submitting a server.</p>
          <Link className="btn" href="/api/auth/signin">
            Login with Discord
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container submit-page">
      <section className="submit-hero">
        <span className="page-badge">One server per Discord user</span>
        <h1>Submit your Discord Server</h1>
        <p>
          Add your community to AskoList. After submission, an admin will review
          your server before it becomes public.
        </p>
      </section>

      <section className="submit-layout">
        <form className="submit-card" action="/api/submit-server" method="POST">
          <div className="form-grid">
            <label className="field">
              <span>Server name</span>
              <input
                className="input"
                name="server_name"
                placeholder="Example: Asko Community"
                required
              />
            </label>

            <label className="field">
              <span>Discord invite link</span>
              <input
                className="input"
                name="invite_link"
                placeholder="https://discord.gg/..."
                required
              />
            </label>

            <label className="field">
              <span>Discord Server ID</span>
              <input
                className="input"
                name="discord_server_id"
                placeholder="123456789012345678"
                required
              />
            </label>

            <label className="field">
              <span>Server logo URL</span>
              <input
                className="input"
                name="logo_url"
                placeholder="https://example.com/logo.png"
              />
            </label>

            <label className="field full">
              <span>Description</span>
              <textarea
                name="description"
                placeholder="Describe your Discord server..."
                required
              />
            </label>

            <label className="field">
              <span>Category</span>
              <select name="category">
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Tags</span>
              <input
                className="input"
                name="tags"
                placeholder="#chill, #gaming, #anime"
              />
            </label>

            <label className="field">
              <span>Country</span>
              <select name="country">
                {countries.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Language</span>
              <select name="language">
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>

            <label className="check-row full">
              <input type="checkbox" name="nsfw" />
              <span>This server contains NSFW content</span>
            </label>
          </div>

          <button className="btn submit-button" type="submit">
            Submit for admin review
          </button>

          <p className="form-note">
            Your server will be saved and shown in your profile. It becomes
            public after admin approval.
          </p>
        </form>

        <aside className="submit-info">
          <h2>How approval works</h2>

          <div className="info-step">
            <strong>1</strong>
            <div>
              <h3>Submit your server</h3>
              <p>Fill out all required server information.</p>
            </div>
          </div>

          <div className="info-step">
            <strong>2</strong>
            <div>
              <h3>Admin review</h3>
              <p>Your server will be checked before it appears publicly.</p>
            </div>
          </div>

          <div className="info-step">
            <strong>3</strong>
            <div>
              <h3>Get discovered</h3>
              <p>Once approved, users can find, rate and bump your server.</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
