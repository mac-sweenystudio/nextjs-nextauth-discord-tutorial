import React from "react";
import { unstable_getServerSession } from "next-auth/next";
import { InferGetServerSidePropsType } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import DiscordData from "../components/discordData";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function MyServers(props: Props) {
  return (
    <div className="bg-white w-full min-h-screen">
      <DiscordData guilds={props.guilds} user={props.user} />
    </div>
  );
}

// nextJS will call this function on the page being loaded
export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  // The Guild request we make to discords API
  const guildFetch = await fetch(
    `https://discord.com/api/v10/users/@me/guilds`,
    {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  // The User request we make to discords API
  const userFetch = await fetch(`https://discord.com/api/v10/users/@me`, {
    headers: {
      // @ts-ignore
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  // The response we get from discords API (the guilds)
  // This part isn't necessary, I just wanted to demonstrate how to use the response

  const guilds = await guildFetch.json();
  const user = await userFetch.json();

  if (user) {
    for (let i = 0; i < guilds.length; i++) {
      if (guilds[i].owner === false) {
        guilds.splice(i, 1);
      }
      if (guilds[i].icon === null) {
        guilds[
          i
        ].icon_url = `https://cdn.discordapp.com/icons/1010422850483650570/7ce037d361cbacb995a9075c5cb28e58.png`;
      } else {
        guilds[
          i
        ].icon_url = `https://cdn.discordapp.com/icons/${guilds[i].id}/${guilds[i].icon}.png`;
      }
      if (guilds[i].owner === true) {
        const removedObject = guilds.splice(i, 1);
        guilds.unshift(removedObject[0]);
      }
    }
  }
  if (guilds) {
    if (user.avatar === null) {
      const defaultAvatarNumber = parseInt(user.discriminator) % 5;
      user.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
    } else {
      const format = user.avatar.startsWith("a_") ? "gif" : "png";
      user.image_url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}`;
    }
    console.log(guilds, user);
    return {
      props: {
        guilds,
        user,
      },
    };
  }
}
