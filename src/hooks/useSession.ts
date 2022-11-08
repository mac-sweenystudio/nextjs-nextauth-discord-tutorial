import {Session} from "next-auth";
import {useSession as nextAuthUseSession} from "next-auth/react";
import {DiscordProfile} from "next-auth/providers/discord";

export function useSession() {
    return nextAuthUseSession() as {data: Session & {discordUser: DiscordProfile} | null}
}