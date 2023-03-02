/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"
    readonly NEXT_PUBLIC_APP_URL: string
    readonly NEXT_PUBLIC_POCKET_SIGN_SERVICE_ID: string
    readonly NEXT_PUBLIC_USE_POCKET_SIGN_MOCK: "use" | string
  }
}
