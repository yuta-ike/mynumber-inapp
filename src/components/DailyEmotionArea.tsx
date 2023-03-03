import React, { useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import classNames from "classnames"
import { useRouter } from "next/router"

import CakeImage from "@/images/cake.png"
import Emote1 from "@/images/emote_1.png"
import Emote2 from "@/images/emote_2.png"
import Emote3 from "@/images/emote_3.png"
import Emote4 from "@/images/emote_4.png"
import Emote5 from "@/images/emote_5.png"

const EMOTE_IMAGES = [Emote1, Emote2, Emote3, Emote4, Emote5]

export type DailyEmotionAreaProps = {
  calendarData: {
    isToday: boolean
    date: string
    emotion: number
    event?: string
  }[]
}

const DailyEmotionArea: React.FC<DailyEmotionAreaProps> = ({ calendarData }) => {
  const router = useRouter()
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null)
  const todayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTimeout(() => {
      const todayIndex = calendarData.findIndex((data) => data.isToday)
      scrollWrapperRef.current?.scrollTo({
        left: 73 * todayIndex - window.innerWidth / 2.0 + 36,
        behavior: "smooth",
      })
    }, 300)
  }, [calendarData, calendarData.length])

  const handleClick = useCallback(
    (date: string) => {
      router.push({ pathname: `/calendar/${date}` })
    },
    [router],
  )

  return (
    <div className="relative mt-4">
      <div className="absolute top-[72px] h-[6px] w-full bg-[#F9B1A4]" />
      <div className="relative w-full">
        <div
          className="flex items-center space-x-3 overflow-x-auto px-3  pb-3"
          ref={scrollWrapperRef}
        >
          {calendarData.map((data) => (
            <div
              key={data.date}
              className="flex flex-col items-center pt-3"
              ref={data.isToday ? todayRef : undefined}
              onClick={() => handleClick(data.date)}
            >
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
              {data?.emotion == undefined || data?.emotion === 0 ? (
                <div
                  className={classNames(
                    "roundend-full mt-2 h-[60px] w-[60px] rounded-full bg-[#F5F5F5]",
                    data.isToday ? "border border-dashed border-primary" : "",
                  )}
                />
              ) : (
                <Image
                  src={EMOTE_IMAGES[data.emotion - 1]}
                  alt=""
                  className="mt-2 h-[60px] w-[60px] rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DailyEmotionArea
