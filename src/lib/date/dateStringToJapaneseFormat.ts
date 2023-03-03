// dateString(2023-03-03など) -> 3/3(土)
export function dateStringToJapaneseFormat(dateString: string | number) {
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"]
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = daysOfWeek[date.getDay()]
  return `${month}/${day}(${dayOfWeek})`
}
