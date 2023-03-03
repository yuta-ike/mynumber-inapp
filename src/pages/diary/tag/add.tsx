import { Cancel, ArrowLeft } from "iconoir-react"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { Button, Chip, ThemeProvider } from "@mui/material"
import classNames from "classnames"

import TopBar from "@/components/layouts/TopBar"
import AIWhisper from "@/components/AIWhisper"
import { bgBaseColor, theme } from "@/consts/theme"
import { bottomNavBarHeight } from "@/consts/layouts"
import { usePersonalInfo } from "@/lib/pocketSign/PersonalInfoProvider"
import axios from "@/lib/axios"
import { delayed } from "@/utils/delayed"
import AiLoading from "@/components/AiLoading"

const AddDiaryTag: React.FC = () => {
  const { data: personalInfo } = usePersonalInfo()
  const router = useRouter()
  const { emote, body } = router.query
  const [tags, setTags] = useState<string[] | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    if (personalInfo == null) {
      window.alert("エラーが発生しました")
      return
    }
    const init = async () => {
      const [res] = await Promise.all([
        axios.post(
          "/suggest-tags",
          { sentence: body },
          {
            headers: {
              Authorization: personalInfo?.subscriptionId,
            },
          },
        ),
        delayed(3000),
      ])
      setTags(res.data)
    }
    init()
  }, [body, personalInfo])

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      return prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    })
  }, [])

  const handleSubmit = useCallback(async () => {
    await axios.post(
      "/diary",
      {
        tags: selectedTags,
        body: body,
        emotion: emote && parseInt(emote as string),
      },
      {
        headers: {
          Authorization: personalInfo?.subscriptionId,
        },
      },
    )
    router.push("/")
  }, [body, emote, personalInfo?.subscriptionId, router, selectedTags])

  return (
    <ThemeProvider theme={theme}>
      <TopBar bgcolor={bgBaseColor}>
        <div className="flex w-full items-center justify-between">
          <ArrowLeft onClick={() => router.back()} />
          <h1 className="text-center text-base font-bold">3/3(土)</h1>
          <Cancel onClick={() => router.push("/")} />
        </div>
      </TopBar>
      <main className="relative">
        <div className="p-4">
          <AIWhisper>
            {tags == null ? <AiLoading className="ml-4" /> : "あなたの悩み事はどれですか？"}
          </AIWhisper>
        </div>
        <div className="flex flex-wrap justify-center p-4">
          {tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleTagClick(tag)}
              sx={{ m: 0.5 }}
              className={classNames(
                "font-bold",
                selectedTags?.includes(tag) && "!bg-primary !text-white",
              )}
            />
          ))}
        </div>
        <div
          style={{
            bottom: bottomNavBarHeight,
            position: "fixed",
            left: 0,
            right: 0,
            margin: "0 40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              color: "#fff",
              bgcolor: theme.palette.primary["500"],
              fontWeight: "bold",
              py: 1.5,
              "&:hover": {
                bgcolor: theme.palette.primary["500"],
              },
              borderRadius: "8px",
            }}
            fullWidth
            onClick={handleSubmit}
            disabled={tags == null}
          >
            決定する
          </Button>
        </div>
      </main>
    </ThemeProvider>
  )
}

export default AddDiaryTag
