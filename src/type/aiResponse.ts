export type WaitingAiResponse = {
  type: "Waiting"
}

export type NotPostedAiResponse = {
  type: "NotPosted"
}

export type UserRecommendationAiResponse = {
  type: "UserRecommendation"
  message: string
  users: {
    userId: string
    nickname: string
    iconId: number
    ageDecades: number
    postedTags: {
      tag: string
      count: number
    }[]
  }[]
}

export type AdministrativeSupportAiResponse = {
  type: "AdministrativeSupport"
  message: string
  link: string
}

export type AiResponse =
  | NotPostedAiResponse
  | WaitingAiResponse
  | UserRecommendationAiResponse
  | AdministrativeSupportAiResponse
