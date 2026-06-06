import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "identify email",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        const discordProfile = profile as any;
        token.discordId = discordProfile.id;
        token.username = discordProfile.username;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.discordId;
        (session.user as any).discordId = token.discordId;
        (session.user as any).username = token.username;
      }

      return session;
    },
  },
};
