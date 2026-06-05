export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || body.apiKey !== process.env.BOT_API_KEY) {
    return Response.json({ success: false, error: 'Invalid API key' }, { status: 401 });
  }

  const required = ['discordServerId', 'serverName', 'inviteLink', 'ownerDiscordUserId'];
  const missing = required.filter((key) => !body[key]);
  if (missing.length) {
    return Response.json({ success: false, error: `Missing fields: ${missing.join(', ')}` }, { status: 400 });
  }

  // TODO: Connect Supabase/Postgres here and create server with approved=false.

  return Response.json({
    success: true,
    message: 'Register endpoint prepared. Connect database logic next.',
    approved: false
  });
}
