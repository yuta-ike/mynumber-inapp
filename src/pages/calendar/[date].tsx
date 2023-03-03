import { ThemeProvider } from "@emotion/react"
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle, Cancel } from "iconoir-react"
import { useRouter } from "next/router"
import { Stack } from "@mui/system"
import { useCallback, useEffect, useState } from "react"
import { Avatar, Card, CardContent, Chip, IconButton } from "@mui/material"

import { bgBaseColor, theme } from "@/consts/theme"
import TopBar from "@/components/layouts/TopBar"
import { dateStringToJapaneseFormat } from "@/lib/date/dateStringToJapaneseFormat"
import { Diary } from "@/types/diary"
import axios from "@/lib/axios"
import { usePersonalInfo } from "@/lib/pocketSign/PersonalInfoProvider"
import { getEmotionImageById } from "@/lib/emotion/getEmotionImageById"
import { emotion } from "@/consts/emotion"
import { getFormattedTime } from "@/lib/date/getFormattedTime"
import { getYesterday } from "@/lib/date/getYesterday"
import { getTomorrow } from "@/lib/date/getTomorrow"

const CalendarDate: React.FC = () => {
  const router = useRouter()
  const personalInfo = usePersonalInfo()
  const { date } = router.query
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    console.log(date)
    ;(async () => {
      const res = await axios.get(`diary/${date}`, {
        headers: {
          Authorization: personalInfo.data?.subscriptionId,
        },
      })
      setDiaries(res.data)
    })()
  }, [date, personalInfo.data?.subscriptionId])
  console.log(diaries)

  const handleClickPrev = useCallback(() => {
    router.push(`/diary/${getFormattedTime(getYesterday(Date.now()))}`)
  }, [router])

  const handleClickNext = useCallback(() => {
    router.push(`/diary/${getFormattedTime(getTomorrow(Date.now()))}`)
  }, [router])
  return (
    <ThemeProvider theme={theme}>
      <TopBar bgcolor={bgBaseColor}>
        <div className="flex w-full items-center justify-between px-1">
          <ArrowLeft onClick={() => router.back()} />
          <Cancel onClick={() => router.push("/")} />
        </div>
      </TopBar>
      <main>
        <div className="flex justify-center text-lg font-bold">
          <Stack direction="row" spacing={3} alignItems="center">
            <IconButton size="small" onClick={handleClickPrev}>
              <ArrowLeftCircle />
            </IconButton>
            <div>{dateStringToJapaneseFormat(date as string)}</div>
            <IconButton size="small" onClick={handleClickNext}>
              <ArrowRightCircle />
            </IconButton>
          </Stack>
        </div>
        <div className="m-4">
          <Stack spacing={2}>
            {diaries.length > 0 ? (
              <>
                {diaries?.map((diary) => (
                  <Card key={diary.id} elevation={0} sx={{ borderRadius: 8 }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={4}>
                          <Avatar>{getEmotionImageById(parseInt(diary.emotion.toString()))}</Avatar>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <div className="text-xl font-bold">{emotion[diary.emotion]}</div>
                            <div className="mb-2 self-end pb-[.3em] text-sm text-gray-500">
                              {getFormattedTime(diary.created_at)}
                            </div>
                          </Stack>
                        </Stack>
                        {diary.tags && (
                          <Stack direction="row">
                            {/* TODO: タグがうまく表示されない問題 */}
                            {diary.tags?.map((tag) => (
                              <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
                            ))}
                          </Stack>
                        )}
                        <div>{diary.body}</div>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <div className="top-[50%] bottom-[50%] flex -translate-y-1/2">
                みつかりませんでした
              </div>
            )}
          </Stack>
        </div>
      </main>
    </ThemeProvider>
  )
}

export default CalendarDate
