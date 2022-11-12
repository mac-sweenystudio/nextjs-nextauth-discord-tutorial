import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // Discord OAuth2 provider
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          // This is the scope that we want to request from Discord
          scope:
            "identify email guilds applications.commands.permissions.update",
        },
      },
    }),
  ],
  callbacks: {
    // This is the callback that we want to use to get oAuth tokens
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.tokenType = account.token_type;
      }
      return token;
    },

    // This is the callback that we want to use to get the session
    async session({ session, token }: any) {
      if (session) {
        session.accessToken = token.accessToken;
        session.tokenType = token.tokenType;
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
