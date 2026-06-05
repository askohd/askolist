# AskoList Starter

A Next.js MVP starter for an international Discord server list.

## Included

- Dark Discord-style UI
- Homepage with hero, featured slider placeholder, search, categories, latest bumped and best-rated sections
- Empty state with no fake/demo servers
- Server listing page with filters
- Submit server page
- Shop page for Premium Placement – 7 Days
- Admin dashboard placeholder
- Prepared bot API endpoints:
  - `POST /api/bump-server`
  - `POST /api/register-server`

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Next steps

1. Connect Supabase/Postgres for real persistence.
2. Add Discord OAuth login.
3. Save submitted servers with `approved=false`.
4. Build admin approval actions.
5. Connect `/api/bump-server` to real server records.
6. Add review table and rating logic.

## Bot endpoint example

```bash
curl -X POST http://localhost:3000/api/bump-server \
  -H "Content-Type: application/json" \
  -d '{"apiKey":"change-this-secret-key","discordServerId":"123","ownerDiscordUserId":"456"}'
```
