import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string
    tokenType: string
  }

  export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
  }

  export interface DiscordGuild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
    icon_url: string;
  }

}