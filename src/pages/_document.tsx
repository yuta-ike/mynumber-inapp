import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="ja">
      <Head prefix="og: http://ogp.me/ns#">
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#fafaf9" />
      </Head>
      <body className="bg-[#fafaf9]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
