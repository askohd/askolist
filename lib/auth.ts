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

        token.discordId = discordProfile.id ?? token.sub;
        token.username = discordProfile.username;
        token.avatar = discordProfile.avatar;
      }

      if (!token.discordId && token.sub) {
        token.discordId = token.sub;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        const discordId = token.discordId ?? token.sub;

        (session.user as any).id = discordId;
        (session.user as any).discordId = discordId;
        (session.user as any).username = token.username;
      }

      return session;
    },
  },
};
