import { useRouter } from "next/router"
import { Cancel, ArrowLeft, ArrowRight } from "iconoir-react"
import { Fab } from "@mui/material"
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { ThemeProvider } from "@emotion/react"

import TopBar from "@/components/layouts/TopBar"
import { bottomNavBarHeight } from "@/consts/layouts"
import { theme } from "@/consts/theme"

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
    router.push({ pathname: "/diary/tag/add", query: { emote: emote, body: body } })
  }, [body, emote, router])

  return (
    <ThemeProvider theme={theme}>
      <TopBar>
        <div className="flex w-full items-center justify-between">
          <ArrowLeft onClick={() => router.back()} />
          <h1 className="text-center text-base font-bold">3/3(土)</h1>
          <Cancel onClick={() => router.push("/")} />
        </div>
      </TopBar>
      <main>
        <div style={{ height: "calc(100vh - 56px)" }}>
          <textarea
            className="block w-full rounded-lg border border-none bg-white p-2.5 text-gray-900 focus:outline-none"
            style={{ height: "100%" }}
            placeholder="今日はどんなことがありましたか？"
            // autoFocus
            onChange={handleTextfieldChange}
            ref={inputElement}
          />
        </div>
        <Fab
          className={"fixed right-[16px]"}
          style={{ bottom: bottomNavBarHeight }}
          color="primary"
          onClick={handleNextClick}
        >
          <ArrowRight style={{ color: "white" }} />
        </Fab>
      </main>
    </ThemeProvider>
  )
}

export default AddDiary
