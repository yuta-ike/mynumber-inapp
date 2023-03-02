import ngrok from "ngrok"
import QRCode from "qrcode"

let tunPort = undefined
let tunUrl = undefined

export default function expose() {
  return {
    name: "expose-plugin",
    apply: "serve",
    configureServer({ config, httpServer }) {
      if (config.isProduction) {
        return
      }
      setInterval(async () => {
        if (tunUrl) {
          return
        }

        const { port } = httpServer.address() ?? {}
        if (!port) {
          return
        }

        tunPort = port
        tunUrl = await ngrok.connect({
          port,
          region: "jp",
          authtoken: process.env.npm_package_config_ngrok_authtoken,
        })

        httpServer.on("close", () => {
          console.log("[expose] closing tunnel")
          ngrok.disconnect()
        })

        const inAppUrl = `https://p8n.jp/in_app?service_id=${encodeURIComponent(
          process.env.npm_package_config_pocketsign_service_id,
        )}&url=${encodeURIComponent(tunUrl)}`

        console.log(`[expose] Tunnel URL: ${tunUrl}`)
        console.log(`[expose] PocketSign In-App URL: ${inAppUrl}`)

        await QRCode.toFile("CODE.png", inAppUrl, { scale: 4 })
        console.log("\n[expose] ☑ 2D code for PocketSign app is saved: CODE.png\n")
      }, 1000)
    },
  }
}
