import "@/style/global.css"
import "@/style/modern-normalize.css"

import { SWRConfig } from "swr"

import PersonalInfoProvider from "@/lib/pocketSign/PersonalInfoProvider"
import DebugPanel from "@/lib/pocketSign/DebugPanel"

import type { AppProps } from "next/app"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <PersonalInfoProvider>
      <SWRConfig>
        <Component {...pageProps} />
        {process.env.NODE_ENV === "development" && <DebugPanel />}
      </SWRConfig>
    </PersonalInfoProvider>
  )
}

export default MyApp
