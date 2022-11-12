import { DiscordGuild } from "next-auth";

export default function Guilds({ guilds }: { guilds: DiscordGuild[] }) {
  return (
    <>
      {guilds.map((guilds) => (
        <div
          key={guilds.id}
          className="grid justify-items-start grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3 xl:gap-x-20 my-10 lg:mx-40"
        >
          {guilds.name}
        </div>
      ))}
    </>
  );
}
