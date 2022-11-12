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
