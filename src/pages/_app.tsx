import "../styles/globals.css";
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    // We wrap our app in the SessionProvider component
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
