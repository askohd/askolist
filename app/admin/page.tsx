export default function AdminPage() {
  return (
    <main className="container section">
      <div className="section-title"><h1>Admin Dashboard</h1><span className="meta">Protected area placeholder</span></div>
      <div className="grid">
        {['Pending servers', 'Approved servers', 'Users', 'Bumps', 'Reviews', 'Premium / Partner'].map((item) => (
          <article className="card" key={item}>
            <h2>{item}</h2>
            <p className="meta">Admin controls will be connected after Discord login and database setup.</p>
          </article>
        ))}
      </div>
    </main>
  );
}
