import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

export default async function DebugPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  const discordId =
    user?.id || user?.discordId || user?.discord_user_id || "NO_ID_FOUND";

  let foundUser: any = null;
  let errorMessage = "";

  try {
    if (discordId !== "NO_ID_FOUND") {
      const users = await supabaseRequest(
        `users?discord_user_id=eq.${discordId}&select=*`
      );
      foundUser = users?.[0] ?? null;
    }
  } catch (error: any) {
    errorMessage = error.message;
  }

  return (
    <main className="container profile-page">
      <section className="profile-card">
        <h1>Debug</h1>

        <h2>Session user</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(session?.user ?? null, null, 2)}
        </pre>

        <h2>Detected Discord ID</h2>
        <pre>{discordId}</pre>

        <h2>Supabase user found</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(foundUser, null, 2)}
        </pre>

        <h2>Error</h2>
        <pre>{errorMessage || "No error"}</pre>
      </section>
    </main>
  );
}
