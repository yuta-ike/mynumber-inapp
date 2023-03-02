export type Sex = "male" | "female" | "unapplicable" | "unknown"

export type PersonalInfo = {
  subscriptionId: string
  name: string
  birthday: Date
  sex: Sex
  address: string
}
