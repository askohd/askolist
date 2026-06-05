export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || body.apiKey !== process.env.BOT_API_KEY) {
    return Response.json({ success: false, error: 'Invalid API key' }, { status: 401 });
  }

  const { discordServerId, ownerDiscordUserId } = body;
  if (!discordServerId || !ownerDiscordUserId) {
    return Response.json({ success: false, error: 'discordServerId and ownerDiscordUserId are required' }, { status: 400 });
  }

  // TODO: Connect Supabase/Postgres here:
  // 1. Find server by discordServerId
  // 2. Check approved = true
  // 3. Check ownerDiscordUserId
  // 4. Check 2-hour cooldown
  // 5. Update lastBump and bumps

  return Response.json({
    success: true,
    message: 'Bump endpoint prepared. Connect database logic next.',
    discordServerId
  });
}
