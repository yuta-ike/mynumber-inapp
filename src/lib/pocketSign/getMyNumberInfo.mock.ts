import type { PersonalInfo, Sex } from "./type"

export const getMyNumberInfoMock = async (): Promise<PersonalInfo> => {
  const { faker } = await import("@faker-js/faker")
  faker.locale = "ja"

  return {
    subscriptionId: faker.datatype.uuid(),
    name: faker.name.fullName(),
    address: `${faker.address.state()} ${faker.address.cityName()} ${faker.address.secondaryAddress()}`,
    birthday: faker.date.between("1950-01-01T00:00:00.000Z", "2023-03-03T00:00:00.000Z"),
    sex: faker.helpers.arrayElement(["male", "female", "unapplicable", "unknown"]) as Sex,
  } as PersonalInfo
}
