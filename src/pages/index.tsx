import { ThemeProvider } from "@emotion/react"
import add from "date-fns/add"
import sub from "date-fns/sub"
import format from "date-fns/format"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Stack } from "@mui/system"
import { NavArrowRight } from "iconoir-react"
import { AvatarGroup, Button, Card, CardContent } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"
import { OpenInNew } from "@mui/icons-material"

import BottomNavBar from "@/components/layouts/BottomNavBar"
import AddDiariesButton from "@/components/layouts/diaries/AddDiariesButton"
import TopBar from "@/components/layouts/TopBar"
import { theme } from "@/consts/theme"
import DailyEmotionArea from "@/components/DailyEmotionArea"
import AIWhisper from "@/components/AIWhisper"
import AIWhisperInlineButton from "@/components/AIWhisperInlineButton"
import { bottomNavBarHeight } from "@/consts/layouts"
import axios from "@/lib/axios"
import { usePersonalInfo } from "@/lib/pocketSign/PersonalInfoProvider"
import { AiResponse } from "@/type/aiResponse"
import AiLoading from "@/components/AiLoading"
import { delayed } from "@/utils/delayed"
import { ICONS } from "@/consts/icons"
import { Calendar } from "@/types/calendar"

import type { NextPage } from "next"

// const calendar = [
//   {
//     date: "2023-03-04",
//     emotion: 5,
//     event: undefined,
//   },
//   {
//     date: "2023-03-03",
//     emotion: 4,
//     event: "birthday",
//   },
//   {
//     date: "2023-03-02",
//     emotion: 2,
//     event: undefined,
//   },
//   {
//     date: "2023-03-01",
//     emotion: 3,
//     event: undefined,
//   },
//   {
//     date: "2023-02-28",
//     emotion: 4,
//     event: undefined,
//   },
//   {
//     date: "2023-02-27",
//     emotion: 1,
//     event: undefined,
//   },
//   {
//     date: "2023-02-26",
//     emotion: 4,
//     event: undefined,
//   },
//   {
//     date: "2023-02-25",
//     emotion: 1,
//     event: undefined,
//   },
//   {
//     date: "2023-02-24",
//     emotion: 4,
//     event: undefined,
//   },
//   {
//     date: "2023-02-23",
//     emotion: 1,
//     event: undefined,
//   },
//   {
//     date: "2023-02-22",
//     emotion: 4,
//     event: undefined,
//   },
//   {
//     date: "2023-02-21",
//     emotion: 1,
//     event: undefined,
//   },
// ].reverse()

const Index: NextPage = () => {
  const router = useRouter()
  const { data: personalInfo } = usePersonalInfo()
  const [calendar, setCalendar] = useState<Calendar[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await axios.get("calendar", {
        headers: {
          Authorization: personalInfo?.subscriptionId,
        },
      })
      console.log(res)
      // @ts-ignore
      setCalendar(res.data)
    })()
  }, [personalInfo?.subscriptionId])

  const calendarData = useMemo(() => {
    const today = new Date()
    const pastArray = Array(10)
      .fill(null)
      .map((_, i) => {
        const key = format(sub(today, { days: i }), "yyyy-MM-dd")
        const calData = calendar.find(({ date }) => date === key)
        return calData != null
          ? { ...calData, isToday: i === 0 }
          : {
              date: key,
              emotion: 0,
              event: undefined,
              isToday: i === 0,
            }
      })
      .reverse()
    const futureArray = Array(10)
      .fill(null)
      .map((_, i) => {
        const key = format(add(today, { days: i + 1 }), "yyyy-MM-dd")
        return {
          date: key,
          emotion: 0,
          event: undefined,
          isToday: false,
        }
      })
    return [...pastArray, ...futureArray]
  }, [calendar])

  const handleClickUserRecommend = useCallback(() => {
    router.push({ pathname: `/user-recommend` })
  }, [router])

  // const handleClickMunicipality = useCallback(() => {
  //   // target="_blank"と同義
  //   window.open("https://www.pref.miyagi.jp/site/kosodate/")
  // }, [])

  const [aiResponse, setAiResponse] = useState<AiResponse>({ type: "Waiting" })

  useEffect(() => {
    if (personalInfo == null) {
      return
    }
    const init = async () => {
      const [res, _] = await Promise.all([
        axios.get<{
          botResponse:
            | {
                userId: string
                nickname: string
                iconId: number
                ageDecades: number
                postedTags: {
                  tag: string
                  count: number
                }[]
              }[]
            | null
        }>("/bot/home", {
          headers: {
            Authorization: personalInfo?.subscriptionId,
          },
        }),
        delayed(1000),
      ])
      if (res.data.botResponse == null) {
        setAiResponse({ type: "NotPosted" })
      } else {
        setAiResponse({ type: "UserRecommendation", message: "", users: res.data.botResponse })
      }
    }

    init()
  }, [personalInfo])

  return (
    <ThemeProvider theme={theme}>
      <TopBar>
        <h1 className="pl-2 text-[24px]">ホーム</h1>
      </TopBar>
      <main style={{ marginBottom: bottomNavBarHeight }} className="pb-4">
        <div className="overflow-hidden rounded-xl pb-4" style={{ backgroundColor: "#FAFAEC" }}>
          <div className="m-4 border-r-[16px]">
            <AIWhisper bgcolor="#F1F1D7">あなたの今日の気分はどうですか？</AIWhisper>
          </div>
          <DailyEmotionArea calendarData={calendarData} onClickToday={() => setOpen(true)} />
        </div>
        <div className="m-4 mt-8">
          {aiResponse.type === "Waiting" ? (
            <AIWhisper>
              <AiLoading />
            </AIWhisper>
          ) : aiResponse.type === "NotPosted" ? (
            <AIWhisper>今日の日記を投稿してみよう！</AIWhisper>
          ) : aiResponse.type === "UserRecommendation" ? (
            <AIWhisperInlineButton
              underContent={
                <Stack spacing={2}>
                  {1 <= aiResponse.users.length && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      className="mb-6"
                    >
                      <Button
                        className="w-full justify-between p-0"
                        onClick={handleClickUserRecommend}
                      >
                        <Stack justifyContent="space-between" className="mr-4 w-full">
                          <p className="my-0 mb-2 text-left font-bold leading-normal">
                            最近{aiResponse.users.length}人の先輩が同じ悩みを解決しました
                          </p>
                          <AvatarGroup max={4} spacing={-10} className="justify-end text-sm">
                            {aiResponse.users.map((user) => (
                              <Image
                                key={user.userId}
                                src={ICONS[user.iconId - 1]}
                                alt=""
                                width={40}
                                height={40}
                              />
                            ))}
                          </AvatarGroup>
                        </Stack>
                        <NavArrowRight className="shrink-0" />
                      </Button>
                    </Stack>
                  )}
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <div className="flex w-full flex-col p-0">
                      <p className="my-0 text-left text-sm font-bold leading-normal">
                        自治体の情報があなたの役にたつかもしれません
                      </p>
                      <a
                        target="_blank"
                        rel="noreferer noopener"
                        href="https://www.pref.miyagi.jp/site/kosodate/"
                        className="mt-2 flex items-center justify-between rounded border border-solid border-primary/30 bg-white/80 px-4 py-2 text-sm text-primary no-underline hover:underline active:underline"
                      >
                        <span>子育て支援サイト みやぎっこ広場</span>
                        <OpenInNew className="h-4 w-4 shrink-0" />
                      </a>
                    </div>
                  </Stack>
                </Stack>
              }
            >
              あなたの日記を元に分析しました。
            </AIWhisperInlineButton>
          ) : null}
        </div>
        <div className="space-y-4 p-4">
          <Card elevation={0}>
            <CardContent>
              <h2 className="m-0 mb-4 text-base">じぶんの１週間</h2>
              <Stack direction="row" style={{ borderRadius: "50%", width: "100%" }}>
                <div
                  style={{
                    width: "65%",
                    backgroundColor: "#7DAA88",
                    height: "20px",
                    borderRadius: "20px 0 0 20px",
                  }}
                />
                <div style={{ width: "20%", height: "20px", backgroundColor: "#9BB0F9" }} />
                <div
                  style={{
                    width: "15%",
                    backgroundColor: "#F48F82",
                    height: "20px",
                    borderRadius: "0 20px 20px 0",
                  }}
                />
              </Stack>
              <Stack direction="row" className="mt-3" spacing={1}>
                <Stack direction="row" className="text-sm" alignItems="center" gap={0.5}>
                  <Stack
                    style={{
                      width: " 8px",
                      height: "8px",
                      backgroundColor: "#7DAA88",
                      borderRadius: "999px",
                    }}
                  />
                  スキンシップ
                </Stack>
                <Stack direction="row" alignItems="center" className="text-sm" gap={0.5}>
                  <Stack
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#9BB0F9",
                      borderRadius: "999px",
                    }}
                  />
                  夜泣き
                </Stack>
                <Stack direction="row" alignItems="center" className="text-sm" gap={0.5}>
                  <Stack
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#F48F82",
                      borderRadius: "999px",
                    }}
                  />
                  成長
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </div>
        {/* <div className="relative mt-4">
          <div className="absolute top-[72px] h-[6px] w-full bg-[#F9B1A4]" />
          <div className="relative w-full overflow-x-scroll">
            <div className="flex items-center px-4 space-x-3">
              {calendarData.map((data) => (
                <div key={data.date} className="flex flex-col items-center pt-3">
                  {data.event != null ? (
                    <>
                      <Image
                        src={CakeImage}
                        alt="誕生日"
                        className="h-10 w-10 rounded-full bg-[#9BB0F9]"
                      />
                      <div className="h-[20px] w-[2px] bg-[#F9B1A4]" />
                    </>
                  ) : (
                    <div className="h-[60px] w-10" />
                  )}
                  <time
                    className={classNames(
                      "mt-[16px] grid place-items-center rounded-full px-2 py-0.5 text-sm font-bold leading-normal",
                      data.isToday ? "bg-primary text-white" : "text-base-black",
                    )}
                  >{`${parseInt(data.date.slice(5, 7), 10)}/${parseInt(
                    data.date.slice(8, 10),
                    10,
                  )}`}</time>
                  {data.emotion === 0 ? (
                    <div
                      className={classNames(
                        "roundend-full mt-2 h-[60px] w-[60px] rounded-full bg-[#F5F5F5]",
                        data.isToday ? "border border-dashed border-primary" : "",
                      )}
                    />
                  ) : (
                    <Image
                      src={EMOTE_IMAGES[data.emotion - 1]}
                      alt="最悪"
                      className="mt-2 h-[60px] w-[60px] rounded-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <AddDiariesButton open={open} setOpen={setOpen} />
      </main>
      <BottomNavBar />
    </ThemeProvider>
  )
}

export default Index
