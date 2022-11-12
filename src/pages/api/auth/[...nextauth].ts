import NextAuth from "next-auth";
import type { NextAuthOptions } from 'next-auth'
import DiscordProvider from "next-auth/providers/discord";
import DiscordOauth2 from "discord-oauth2";
const oauth = new DiscordOauth2();

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "identify email guilds applications.commands.permissions.update",
        },
      },
      async profile(profile, account) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }

        return {
          id: profile.id,
          name: profile.username,
          discriminator: profile.discriminator,
          image: profile.image_url,
          accentColor: profile.accentColor,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile}: any) {

      if (account) {
        token.accessToken = account.access_token;
        token.tokenType = account.token_type;
      }
      if (profile) {
        token.profile = profile;
      }



      return token;
    },

    async session({ session, token, user }: any) {
      if (session) {
        session.accessToken = token.accessToken;
        session.tokenType = token.tokenType;
        session.discordUser = token.profile;
      }

      return session;
    },
  },
};
export default NextAuth(authOptions);