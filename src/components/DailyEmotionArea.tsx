import React, { useCallback, useEffect, useMemo, useRef } from "react"
import Image from "next/image"
import classNames from "classnames"
import { useRouter } from "next/router"

import CakeImage from "@/images/cake.png"
import Emote1 from "@/images/avatars/emote_1.png"
import Emote2 from "@/images/avatars/emote_2.png"
import Emote3 from "@/images/avatars/emote_3.png"
import Emote4 from "@/images/avatars/emote_4.png"
import Emote5 from "@/images/avatars/emote_5.png"

const EMOTE_IMAGES = [Emote1, Emote2, Emote3, Emote4, Emote5]

export type DailyEmotionAreaProps = {
  calendarData: {
    isToday: boolean
    date: string
    emotion: number
    event?: string
  }[]
  onClickToday?: () => void
}

const DailyEmotionArea: React.FC<DailyEmotionAreaProps> = ({ calendarData, onClickToday }) => {
  const router = useRouter()
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null)
  const todayRef = useRef<HTMLDivElement | null>(null)

  const todayIndex = useMemo(() => calendarData.findIndex((data) => data.isToday), [calendarData])

  useEffect(() => {
    setTimeout(() => {
      scrollWrapperRef.current?.scrollTo({
        left: 73 * todayIndex - window.innerWidth / 2.0 + 36,
        behavior: "smooth",
      })
    }, 300)
  }, [calendarData, calendarData.length, todayIndex])

  const handleClick = useCallback(
    (date: { isToday: boolean; date: string; emotion: number; event?: string | undefined }) => {
      if (date.isToday) {
        onClickToday?.()
      } else {
        router.push(`/calendar/${date.date}`)
      }
    },
    [onClickToday, router],
  )

  return (
    <div className="relative mt-4">
      <div className="absolute top-[72px] h-[6px] w-full bg-[#F9B1A4]" />
      <div className="relative w-full">
        <div
          className="flex items-center space-x-3 overflow-x-auto px-3 pb-3"
          ref={scrollWrapperRef}
        >
          {calendarData.map((data, i) => (
            <div
              key={data.date}
              className="relative flex flex-col items-center pt-3"
              ref={data.isToday ? todayRef : undefined}
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
                  data.isToday
                    ? "bg-primary text-white"
                    : i <= todayIndex
                    ? "text-base-black"
                    : "text-base-black/20",
                )}
              >
                {`${parseInt(data.date.slice(5, 7), 10)}/${parseInt(data.date.slice(8, 10), 10)}`}
              </time>
              <div className="relative">
                {data?.emotion == undefined || data?.emotion === 0 ? (
                  <div
                    className={classNames(
                      "roundend-full mt-2 h-[60px] w-[60px] rounded-full",
                      data.isToday ? "border border-dashed border-primary" : "bg-[#F1F1D7]",
                    )}
                  />
                ) : (
                  <Image
                    src={EMOTE_IMAGES[data.emotion - 1]}
                    alt=""
                    className="mt-2 h-[60px] w-[60px] rounded-full"
                  />
                )}
                {i <= todayIndex && (
                  <button
                    onClick={() => handleClick(data)}
                    className="absolute inset-0 mt-2 rounded-full opacity-0"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DailyEmotionArea
