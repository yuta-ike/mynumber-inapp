import { ThemeProvider } from "@emotion/react"
import add from "date-fns/add"
import sub from "date-fns/sub"
import format from "date-fns/format"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Stack } from "@mui/system"
import { NavArrowRight } from "iconoir-react"
import { Avatar, AvatarGroup, Button } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"

import BottomNavBar from "@/components/layouts/BottomNavBar"
import AddDiariesButton from "@/components/layouts/diaries/AddDiariesButton"
import TopBar from "@/components/layouts/TopBar"
import { theme } from "@/consts/theme"
import DailyEmotionArea from "@/components/DailyEmotionArea"
import AIWhisper from "@/components/AIWhisper"
import Carrot from "@/images/avatars/carrot.png"
import Sun from "@/images/avatars/sun.png"
import Flower from "@/images/avatars/flower.png"
import AIWhisperInlineButton from "@/components/AIWhisperInlineButton"
import { bottomNavBarHeight } from "@/consts/layouts"
import axios from "@/lib/axios"
import { usePersonalInfo } from "@/lib/pocketSign/PersonalInfoProvider"
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
  const personalInfo = usePersonalInfo()
  const [calendar, setCalendar] = useState<Calendar[]>([])

  useEffect(() => {
    ;(async () => {
      const res = await axios.get("calendar", {
        headers: {
          Authorization: personalInfo.data?.subscriptionId,
        },
      })
      console.log(res)
      // @ts-ignore
      setCalendar(res.data)
    })()
  }, [personalInfo.data?.subscriptionId])

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

  const handleClickMunicipality = useCallback(() => {
    // target="_blank"と同義
    window.open("https://www.pref.miyagi.jp/site/kosodate/")
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <TopBar>
        <h1 className="pl-2 text-[24px]">ホーム</h1>
      </TopBar>
      <main style={{ marginBottom: bottomNavBarHeight }} className="pb-4">
        <div className="pt-2" style={{ backgroundColor: "#FAFAEC" }}>
          <div className="m-4 border-r-[16px]">
            <AIWhisper bgcolor="#F1F1D7">あなたの今日の気分はどうですか？</AIWhisper>
          </div>
          <DailyEmotionArea calendarData={calendarData} />
        </div>
        <div className="m-4 mt-8">
          <AIWhisperInlineButton
            underContent={
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Button className=" w-full justify-between" onClick={handleClickUserRecommend}>
                    <Stack justifyContent="space-between">
                      <p className="my-0 max-w-[97%] text-left font-bold">
                        最近3人の先輩が同じ悩みを解決しました
                      </p>
                      <AvatarGroup max={4} spacing={-10} className="justify-end">
                        <Avatar>
                          <Image src={Carrot} alt="" layout="fill" />
                        </Avatar>
                        <Avatar>
                          <Image src={Sun} alt="" layout="fill" />
                        </Avatar>
                        <Avatar>
                          <Image src={Flower} alt="" layout="fill" />
                        </Avatar>
                      </AvatarGroup>
                    </Stack>
                    <NavArrowRight />
                  </Button>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Button className="w-full justify-between" onClick={handleClickMunicipality}>
                    <Stack justifyContent="space-between">
                      <p className="my-0 max-w-[95%] text-left font-bold">
                        自分の情報があなたの役に立つかもしれません
                      </p>
                    </Stack>
                    <NavArrowRight />
                  </Button>
                </Stack>
              </Stack>
            }
          >
            あなたの日記を元に分析しました。
          </AIWhisperInlineButton>
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
        <AddDiariesButton />
      </main>
      <BottomNavBar />
    </ThemeProvider>
  )
}

export default Index
