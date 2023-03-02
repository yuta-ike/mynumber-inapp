import { Html, Head, Main, NextScript } from "next/document"

import { bgBaseColor } from "@/consts/theme"

export default function Document() {
  return (
    <Html lang="ja">
      <Head prefix="og: http://ogp.me/ns#">
        <meta charSet="utf-8" />
        <meta name="theme-color" content={bgBaseColor} />
      </Head>
      <body style={{ backgroundColor: bgBaseColor }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
