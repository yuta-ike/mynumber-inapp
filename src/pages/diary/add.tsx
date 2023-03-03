import { useRouter } from "next/router"
import { Cancel, ArrowLeft, ArrowRight, Camera } from "iconoir-react"
import { Fab } from "@mui/material"
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { ThemeProvider } from "@emotion/react"

import TopBar from "@/components/layouts/TopBar"
import { bottomNavBarHeight } from "@/consts/layouts"
import { theme } from "@/consts/theme"
import { dateStringToJapaneseFormat } from "@/lib/date/dateStringToJapaneseFormat"

const AddDiary: React.FC = () => {
  const router = useRouter()
  const { emote } = router.query
  const [body, setBody] = useState<string>("")

  // NOTE: Auto focus用（解決できていない）
  const inputElement = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [])

  const handleTextfieldChange = useCallback((e: { target: { value: SetStateAction<string> } }) => {
    setBody(e.target.value)
  }, [])

  const handleNextClick = useCallback(() => {
    router.push({ pathname: "/diary/tag/add", query: { emote, body } })
  }, [body, emote, router])

  return (
    <ThemeProvider theme={theme}>
      <TopBar>
        <div className="flex w-full items-center justify-between px-1">
          <ArrowLeft onClick={() => router.back()} />
          <h1 className="my-5 text-center text-lg font-bold">
            {dateStringToJapaneseFormat(Date.now())}
          </h1>
          <Cancel onClick={() => router.push("/")} />
        </div>
      </TopBar>
      <form
        className="bg-white px-5"
        onSubmit={(e) => {
          e.preventDefault()
          handleNextClick()
        }}
      >
        <div style={{ height: "calc(100vh - 56px)" }}>
          <textarea
            className="block w-full rounded-lg border border-none text-base text-gray-900 focus:outline-none"
            style={{ height: "100%" }}
            placeholder="今日はどんなことがありましたか？"
            onChange={handleTextfieldChange}
            ref={inputElement}
          />
        </div>
        <button
          type="button"
          className="fixed left-4 appearance-none rounded border-none bg-[#E0E0E0] p-3"
          style={{ bottom: bottomNavBarHeight }}
          onClick={() => window.alert("現在サポートされていません")}
        >
          <Camera className="fill-white text-[#E0E0E0]" />
        </button>
        <Fab
          type="submit"
          className="!fixed !right-4 shadow-none"
          style={{ bottom: bottomNavBarHeight, backgroundColor: theme.palette.primary["500"] }}
        >
          <ArrowRight style={{ color: "white", width: 24, height: 24, strokeWidth: 2 }} />
        </Fab>
      </form>
    </ThemeProvider>
  )
}

export default AddDiary
