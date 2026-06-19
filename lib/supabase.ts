export async function supabaseRequest(
  path: string,
  options: RequestInit = {}
) {
  const rawSupabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!rawSupabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const supabaseUrl = rawSupabaseUrl
    .trim()
    .replace(/\/rest\/v1\/?$/i, "")
    .replace(/\/$/i, "");

  const cleanPath = path
    .trim()
    .replace(/^\/+/i, "")
    .replace(/^rest\/v1\/?/i, "");

  const requestUrl = `${supabaseUrl}/rest/v1/${cleanPath}`;

  const response = await fetch(requestUrl, {
    ...options,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Supabase error: ${response.status} ${errorText} | URL: ${requestUrl}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
