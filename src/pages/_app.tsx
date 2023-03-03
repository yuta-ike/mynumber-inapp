import "@/style/global.css"
import "@/style/modern-normalize.css"

import { SWRConfig } from "swr"
import Head from "next/head"

import PersonalInfoProvider from "@/lib/pocketSign/PersonalInfoProvider"
import DebugPanel from "@/lib/pocketSign/DebugPanel"
import AuthStateProvider from "@/lib/auth/AuthStateProvider"

import type { AppProps } from "next/app"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, viewport-fit=cover" />
      </Head>
      <PersonalInfoProvider>
        <AuthStateProvider>
          <SWRConfig>
            <Component {...pageProps} />
            {process.env.NODE_ENV === "development" && <DebugPanel />}
          </SWRConfig>
        </AuthStateProvider>
      </PersonalInfoProvider>
    </>
  )
}

export default MyApp
