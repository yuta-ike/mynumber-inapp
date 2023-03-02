import {
  createSDKInstance,
  getPersonalInfo,
  getSubscriptionId,
} from "@pocketsign/in-app-service-sdk"

import type { PersonalInfo, Sex } from "./type"

export const getMyNumberInfo = async (): Promise<PersonalInfo> => {
  if (process.env.NEXT_PUBLIC_USE_POCKET_SIGN_MOCK === "use") {
    const { getMyNumberInfoMock } = await import("./getMyNumberInfo.mock")
    const mockGetMyNumberInfo = await getMyNumberInfoMock()
    return mockGetMyNumberInfo
  }

  const sdk = await createSDKInstance({
    serviceId: process.env.NEXT_PUBLIC_POCKET_SIGN_SERVICE_ID,
  })

  const [subscriptionId, personalInfo] = await Promise.all([
    getSubscriptionId(sdk),
    getPersonalInfo(sdk),
  ])

  if (typeof subscriptionId !== "string") {
    window.alert(`エラーが発生しました(type: subscriptionId, errno: ${subscriptionId.errno})`)
    throw new Error()
  }

  if ("errno" in personalInfo) {
    window.alert(`エラーが発生しました(type: personalInfo, errno: ${personalInfo.errno})`)
    throw new Error()
  }

  if (
    personalInfo.name == null ||
    personalInfo.address == null ||
    personalInfo.birthday == null ||
    personalInfo.sex == null
  ) {
    window.alert("開発中のため、基本四情報を全て指定する必要があります🙇‍♂️")
    throw new Error()
  }

  return {
    subscriptionId: subscriptionId as string,
    name: personalInfo.name as string,
    address: personalInfo.address as string,
    birthday: personalInfo.birthday as Date,
    sex: personalInfo.sex as Sex,
  } as PersonalInfo
}
