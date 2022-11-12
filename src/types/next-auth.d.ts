import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken: string
    tokenType: string
  }

  export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    avatar_decoration: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string;
    banner_color: string;
    accent_color: number;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    email: string;
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