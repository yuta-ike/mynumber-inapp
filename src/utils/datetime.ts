import fnsFormatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"
import jaLocale from "date-fns/locale/ja"

export const formatDistanceToNow = (date: Date) => {
  return fnsFormatDistanceToNowStrict(date, { locale: jaLocale, addSuffix: true })
}
