import { createContext, useContext } from "react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import axios from "@/lib/axios"

import { usePersonalInfo } from "../pocketSign/PersonalInfoProvider"

type AuthStateContextType =
  | {
      isLoading: true
      isAuthed: null
    }
  | {
      isLoading: false
      isAuthed: boolean
    }

const AuthStateContext = createContext<AuthStateContextType | null>(null)

export type AuthStateProviderProps = {
  children: React.ReactElement
}

const AuthStateProvider: React.FC<AuthStateProviderProps> = ({ children }) => {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthStateContextType>({
    isLoading: true,
    isAuthed: null,
  })
  const { data: personalInfo } = usePersonalInfo()

  useEffect(() => {
    if (personalInfo?.subscriptionId == null) {
      return
    }
    const init = async () => {
      const res = await axios.get("/auth-state", {
        headers: {
          authorization: personalInfo.subscriptionId,
        },
      })
      setAuthState({ isLoading: false, isAuthed: res.data.authed })
      if (router.asPath !== "/sign_up" && !res.data.authed) {
        router.push("/sign_up")
      }
    }
    init()
  }, [personalInfo?.subscriptionId, router, router.asPath])

  return <AuthStateContext.Provider value={authState}>{children}</AuthStateContext.Provider>
}

export default AuthStateProvider

export const useAuthState = () => {
  const authState = useContext(AuthStateContext)
  if (authState == null) {
    throw new Error("useAuthState must be used within an AuthStateProvider")
  }
  return authState
}
