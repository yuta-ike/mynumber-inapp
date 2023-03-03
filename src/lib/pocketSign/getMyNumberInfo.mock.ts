import type { PersonalInfo, Sex } from "./type"

const DEFINED_USER_ID = undefined

export const getMyNumberInfoMock = async (): Promise<PersonalInfo> => {
  const { faker } = await import("@faker-js/faker")
  faker.locale = "ja"

  const subscriptionId = DEFINED_USER_ID ?? faker.datatype.uuid()
  console.log(`Your mock subscription id is ${subscriptionId}`)

  return {
    subscriptionId,
    name: faker.name.fullName(),
    address: `${faker.address.state()} ${faker.address.cityName()} ${faker.address.secondaryAddress()}`,
    birthday: faker.date.between("1950-01-01T00:00:00.000Z", "2023-03-03T00:00:00.000Z"),
    sex: faker.helpers.arrayElement(["male", "female", "unapplicable", "unknown"]) as Sex,
  } as PersonalInfo
}
