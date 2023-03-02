import Link from "next/link"
import { ThemeProvider } from "@emotion/react"
import add from "date-fns/add"
import sub from "date-fns/sub"
import format from "date-fns/format"
import { useMemo } from "react"

import BottomNavBar from "@/components/layouts/BottomNavBar"
import AddDiariesButton from "@/components/layouts/diaries/AddDiariesButton"
import TopBar from "@/components/layouts/TopBar"
import { theme } from "@/consts/theme"
import DailyEmotionArea from "@/components/DailyEmotionArea"

import type { NextPage } from "next"

const calendar = [
  {
    date: "2023-03-02",
    emotion: 2,
    event: undefined,
  },
  {
    date: "2023-03-01",
    emotion: 3,
    event: {
      name: "birthday",
    },
  },
  {
    date: "2023-02-28",
    emotion: 4,
    event: undefined,
  },
  {
    date: "2023-02-27",
    emotion: 1,
    event: undefined,
  },
  {
    date: "2023-02-26",
    emotion: 4,
    event: undefined,
  },
  {
    date: "2023-02-25",
    emotion: 1,
    event: undefined,
  },
  {
    date: "2023-02-24",
    emotion: 4,
    event: undefined,
  },
  {
    date: "2023-02-23",
    emotion: 1,
    event: undefined,
  },
  {
    date: "2023-02-22",
    emotion: 4,
    event: undefined,
  },
  {
    date: "2023-02-21",
    emotion: 1,
    event: undefined,
  },
].reverse()

const Index: NextPage = () => {
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
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <TopBar>
        <h1 className="pl-2 text-[24px]">ホーム</h1>
      </TopBar>
      <main>
        <DailyEmotionArea calendarData={calendarData} />
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
        <Link href="/diary/add">日記を書く</Link>
        <AddDiariesButton />
      </main>
      <BottomNavBar />
    </ThemeProvider>
  )
}

export default Index
