import React, { createContext, useEffect, useState } from "react"

import { getMyNumberInfo } from "./getMyNumberInfo"
import { PersonalInfo } from "./type"

export type PersonalInfoContextType =
  | {
      data: null
      isLoading: true
      error: null
    }
  | {
      data: PersonalInfo
      isLoading: false
      error: null
    }
  | {
      data: null
      isLoading: false
      error: Error
    }

const PersonalInfoProviderContext = createContext<PersonalInfoContextType | null>(null)

export type PersonalInfoProviderProps = {
  children: React.ReactElement
}

const PersonalInfoProvider: React.FC<PersonalInfoProviderProps> = ({ children }) => {
  const [personalInfoResult, setPersonalInfoResult] = useState<PersonalInfoContextType>({
    isLoading: true,
    error: null,
    data: null,
  })

  useEffect(() => {
    const init = async () => {
      try {
        const personalInfo = await getMyNumberInfo()
        setPersonalInfoResult({ data: personalInfo, isLoading: false, error: null })
      } catch (e: any) {
        setPersonalInfoResult({ data: null, isLoading: false, error: e as Error })
      }
    }
    init()
  }, [])

  return (
    <PersonalInfoProviderContext.Provider value={personalInfoResult}>
      {children}
    </PersonalInfoProviderContext.Provider>
  )
}

export default PersonalInfoProvider

export const usePersonalInfo = () => {
  const personalInfoResult = React.useContext(PersonalInfoProviderContext)
  if (!personalInfoResult) {
    throw new Error("usePersonalInfo must be used within a PersonalInfoProvider")
  }
  return personalInfoResult
}
