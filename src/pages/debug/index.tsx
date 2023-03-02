import React from "react"

import { usePersonalInfo } from "@/lib/pocketSign/PersonalInfoProvider"

const Debug = () => {
  const { data: personalInfo, isLoading, error } = usePersonalInfo()
  return (
    <div className="m-8 rounded border border-gray-100 bg-gray-50 p-4 text-sm shadow">
      <h1 className="m-0 text-base font-bold">個人情報の取得</h1>
      {isLoading ? (
        "loading..."
      ) : error ? (
        "エラーが発生しました"
      ) : (
        <>
          <dl className="text-sm font-bold">
            <dt>subscription id</dt>
            <dd>{personalInfo?.subscriptionId}</dd>
          </dl>

          <dl className="text-sm font-bold">
            <dt>name</dt>
            <dd>{personalInfo?.name}</dd>
          </dl>

          <dl className="text-sm font-bold">
            <dt>sex</dt>
            <dd>{personalInfo?.sex}</dd>
          </dl>

          <dl className="text-sm font-bold">
            <dt>address</dt>
            <dd>{personalInfo?.address}</dd>
          </dl>

          <dl className="text-sm font-bold">
            <dt>birthday</dt>
            <dd>{personalInfo?.birthday.toISOString()}</dd>
          </dl>
        </>
      )}
    </div>
  )
}

export default Debug
