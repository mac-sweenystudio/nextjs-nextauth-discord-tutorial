import { DiscordGuild, DiscordUser } from "next-auth";

// Just a standard react component
export default function DiscordData(props: { guilds: DiscordGuild[], user: DiscordUser }) {
  return (
    <>
      <div className="text-blue-600 font-bold text-4xl">
        {props.user.username}
      </div>
      {props.guilds.map((guilds) => (
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
