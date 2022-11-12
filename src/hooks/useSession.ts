import {Session} from "next-auth";
import {useSession as nextAuthUseSession} from "next-auth/react";
import {DiscordProfile} from "next-auth/providers/discord";

// This hook is used to get the 'Session' and 'DiscordProfile' from the context
export function useSession() {
    return nextAuthUseSession() as {data: Session & {discordUser: DiscordProfile} | null}
}