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
        <Link href="/diary/add">日記を書く</Link>
        <AddDiariesButton />
      </main>
      <BottomNavBar />
    </ThemeProvider>
  )
}

export default Index
