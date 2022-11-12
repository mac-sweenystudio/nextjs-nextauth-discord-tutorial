## Documentation Links:

To view the different Discord API endpoints and data you can retrieve, visit: 
```https://discord.com/developers/docs/topics/oauth2```

To view how nextjs works with using _Server Side Props_, visit:
```https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props```

To view how to use NextAuth, visit:
```https://next-auth.js.org/getting-started/introduction```

## Deployment

First, install all dependancies with:

```bash
npm install 
# or
yarn install
```

Second, Add a .env file with the following:

```bash
DISCORD_CLIENT_ID= *Your Discord Client Id*
DISCORD_CLIENT_SECRET=  *Your Discord Client Secret*
NEXTAUTH_URL= *Your Deployment URL (EG: http://localhost:3000)
NEXTAUTH_SECRET= *Your NextAuth Secret*
```

Third, Run the application locally with:

```bash
npm run dev
# or 
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Explanation

**NextAuth API (Found in 'src/pages/api/auth[...nextauth].ts')**

This file is how you add NextAuth.js to a project. It should be created in pages/api/auth. This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations. 

Specifically, the file contains the provider credentials (in this case Discord) which looks like this:

```
clientId: process.env.DISCORD_CLIENT_ID as string,
clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
authorization: {
  params: {
    scope:
      "identify email guilds applications.commands.permissions.update",
  },
},
``` 

The [...nextauth].ts file also contains a set of callbacks. Callbacks are asynchronous functions you can use to control what happens when an action is performed. They are extremely powerful, especially in scenarios involving JSON Web Tokens as they allow you to implement access controls without a database and to integrate with external databases or APIs. 

Our first Callback is the __JWT Callback__. It is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client). The returned value will be encrypted, and it is stored in a cookie. Our __JWT Callbacl__ looks like this: 

```
async jwt({ token, account, profile }: any) {
  if (account) {
    token.accessToken = account.access_token;
    token.tokenType = account.token_type;
  }
  if (profile) {
    token.profile = profile;
  }
  return token;
},
```

Our second Callback is the __Session Callback__. It is called whenever a session is checked (When we want to see if the user is authenticated). We stored the accessToken, tokenType, and the profile into session, along with some basic user data (which comes as a default). Our __Session Callback__ looks like this: 

```
async session({ session, token, user }: any) {
  if (session) {
    session.accessToken = token.accessToken;
    session.tokenType = token.tokenType;
    session.discordUser = token.profile;
  }
  return session;
},
```



**GetServerSideProps (Found in 'src/pages/index.ts')**
To put it simply, getServerSideProps enables a page to render server-side. getServerSideProps renders your client-side page server-side and returns a hydrated SEO-friendly HTML document to the browser. Meaning getServerSideProps pre-renders the page on each request using the data it retrieves from the server. This is particularly useful in our use-case as we want to pre-render the returned objects from our Discord API call. 

We use the __unstable_getServerSession__ method. This is different from the traditional getSession() method you may see in other tutorials, in that it does not do an extra fetch out over the internet to confirm data from itself, increasing performance significantly. Our __getServerSideProps__ Session looks like the following: 

```
const session = await unstable_getServerSession(
  context.req,
  context.res,
  authOptions
);
```

We then fetch the __DiscordGuilds__ Object which looks like:

```
const guildFetch = await fetch(
  `https://discord.com/api/v10/users/@me/guilds`,
  {
    headers: {
      // @ts-ignore
      Authorization: `Bearer ${session?.accessToken}`,
    },
  }
);
const guilds = await guildFetch.json();
```

Finally, we fetch the __DiscordUser__ Object which looks like:

```
const userFetch = await fetch(`https://discord.com/api/v10/users/@me`, {
  headers: {
    // @ts-ignore
    Authorization: `Bearer ${session?.accessToken}`,
  },
});
const user = await userFetch.json();
```

We are then able to modify our __DiscordUser__ and __DiscordGuilds__ Object. 

An example of modifying the __DiscordUser__ Object could be: 

```
if (user) {
  for (let i = 0; i < user.length; i++) {
    if (user.icon === null) {
      user.icon_url = `https://cdn.discordapp.com/icons/1010422850483650570/7ce037d361cbacb995a9075c5cb28e58.png`;
    } else {
      user.icon_url = `https://cdn.discordapp.com/icons/${user.id}/${user.icon}.png`;
    }
  }
}
```

or modifying the __DiscordGuilds__ could look like: 

```
if (guilds) {
  if (user.avatar === null) {
    const defaultAvatarNumber = parseInt(user.discriminator) % 5;
    user.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  } else {
    const format = user.avatar.startsWith("a_") ? "gif" : "png";
    user.image_url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}`;
  }
```


