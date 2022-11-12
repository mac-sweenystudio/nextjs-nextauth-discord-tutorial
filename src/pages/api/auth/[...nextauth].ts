import NextAuth from "next-auth";
import type { NextAuthOptions } from 'next-auth'
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

      // This is the profile function that we want to use to get the user's profile
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
    // This is the callback that we want to use to get oAuth tokens
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

    // This is the callback that we want to use to get the session
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