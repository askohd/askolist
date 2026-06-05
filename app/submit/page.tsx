import { categories, countries, languages } from "@/lib/demoData";

export default function SubmitPage() {
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
        <form className="submit-card">
          <div className="form-grid">
            <label className="field">
              <span>Server name</span>
              <input className="input" placeholder="Example: Asko Community" />
            </label>

            <label className="field">
              <span>Discord invite link</span>
              <input className="input" placeholder="https://discord.gg/..." />
            </label>

            <label className="field">
              <span>Discord Server ID</span>
              <input className="input" placeholder="123456789012345678" />
            </label>

            <label className="field">
              <span>Owner Discord User ID</span>
              <input className="input" placeholder="Your Discord User ID" />
            </label>

            <label className="field full">
              <span>Description</span>
              <textarea placeholder="Describe your Discord server, community, rules and what makes it special..." />
            </label>

            <label className="field">
              <span>Category</span>
              <select>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Tags</span>
              <input className="input" placeholder="#chill, #gaming, #anime" />
            </label>

            <label className="field">
              <span>Country</span>
              <select>
                {countries.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Language</span>
              <select>
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>

            <label className="check-row full">
              <input type="checkbox" />
              <span>This server contains NSFW content</span>
            </label>
          </div>

          <button className="btn submit-button" type="button">
            Submit for admin review
          </button>

          <p className="form-note">
            This starter version prepares the design only. Real saving,
            Discord login and admin approval will be connected later with a
            database.
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
