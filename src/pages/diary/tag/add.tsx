import { Cancel, ArrowLeft } from "iconoir-react"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { Button, Chip, ThemeProvider } from "@mui/material"
import classNames from "classnames"

import TopBar from "@/components/layouts/TopBar"
import AIWhisper from "@/components/AIWhisper"
import { bgBaseColor, theme } from "@/consts/theme"
import { bottomNavBarHeight } from "@/consts/layouts"

const AddDiaryTag: React.FC = () => {
  const router = useRouter()
  const { emote, body } = router.query

  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const tags = [
    "タグ1",
    "タグ22",
    "タグ3333",
    "タグ44444",
    "タグ111111",
    "タグ2222222",
    "タグ33333333",
    "タグA",
    "タグB",
    "タグCC",
    "タグDDD",
    "タグEEEE",
  ]

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }, [])

  const handleSubmit = useCallback(() => {
    // TODO: submit diary
    console.log(emote, body)
    router.push("/")
  }, [body, emote, router])

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
          <AIWhisper>あなたの悩み事はどれですか？</AIWhisper>
        </div>
        <div className="flex flex-wrap justify-center p-4">
          {tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleTagClick(tag)}
              sx={{ m: 0.5 }}
              className={classNames(selectedTags.includes(tag) ? "!bg-primary text-white" : "")}
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
          >
            決定する
          </Button>
        </div>
      </main>
    </ThemeProvider>
  )
}

export default AddDiaryTag
