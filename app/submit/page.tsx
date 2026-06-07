import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { categories, languages } from "@/lib/demoData";
import TagInput from "@/components/TagInput";

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
          Add your community to AskoList. After submission, you will be sent to
          Discord to invite the AskoList bot.
        </p>
      </section>

      <section className="submit-layout">
        <form
          className="submit-card"
          action="/api/submit-server"
          method="POST"
          encType="multipart/form-data"
        >
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

            <label className="field full">
              <span>Description</span>
              <textarea
                name="description"
                placeholder="Describe your Discord server..."
                required
              />
              <small className="char-counter">Maximal 1500 Wörter.</small>
            </label>

            <label className="field">
              <span>Server logo</span>
              <input type="file" name="logo" accept="image/*" />
            </label>

            <label className="field">
              <span>Server banner</span>
              <input type="file" name="banner" accept="image/*" />
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
              <span>Language</span>
              <select name="language">
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>

            <label className="field full">
              <span>Tags</span>
              <TagInput />
            </label>

            <label className="check-row full">
              <input type="checkbox" name="nsfw" />
              <span>This server contains NSFW content</span>
            </label>
          </div>

          <button className="btn submit-button" type="submit">
            Submit server and invite bot
          </button>

          <p className="form-note">
            Nach dem Eintragen wirst du automatisch zu Discord weitergeleitet,
            damit du den AskoList Bot auf deinen Server einladen kannst.
          </p>
        </form>

        <aside className="submit-info">
          <h2>How approval works</h2>

          <div className="info-step">
            <strong>1</strong>
            <div>
              <h3>Submit your server</h3>
              <p>Trage deinen Server ohne Server-ID ein.</p>
            </div>
          </div>

          <div className="info-step">
            <strong>2</strong>
            <div>
              <h3>Invite the bot</h3>
              <p>Nach dem Eintragen öffnet sich automatisch die Bot-Einladung.</p>
            </div>
          </div>

          <div className="info-step">
            <strong>3</strong>
            <div>
              <h3>Admin review</h3>
              <p>Nach Freigabe kann dein Server gebumpt werden.</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
