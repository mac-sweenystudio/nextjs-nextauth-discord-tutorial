import React from "react";
import { DiscordGuild } from "next-auth";
import { signIn } from "next-auth/react";
import { useSession } from "../hooks/useSession";

const Home = () => {
  const { data: session } = useSession();
  const username = session?.user?.name as string;
  const email = session?.user?.email as string;
  const discordUser = session?.discordUser as unknown as string;
  const discordGuilds = session?.discordUser?.guilds as DiscordGuild[];


  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <button
          className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
          onClick={() => signIn("discord")}
        >
          Login
        </button>
      </div>
    );
  } else {
    return <div className="flex h-screen items-center justify-center font-bold text-5xl">{username} is in {discordGuilds.length} discord servers! </div>;
  }
};

export default Home;
