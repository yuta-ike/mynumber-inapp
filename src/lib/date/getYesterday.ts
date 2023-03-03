export function getYesterday(date: string | number) {
  var yesterday = new Date(date)
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().slice(0, 10)
}
