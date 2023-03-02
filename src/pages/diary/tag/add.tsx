import { Cancel, ArrowLeft } from "iconoir-react"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { Button, Chip, ThemeProvider } from "@mui/material"

import TopBar from "@/components/layouts/TopBar"
import AIWhisper from "@/components/AIWhisper"
import { bgBaseColor, theme } from "@/consts/theme"
import { bottomNavBarHeight } from "@/consts/layouts"

const AddDiaryTag: React.FC = () => {
  const router = useRouter()
  const { emote, body } = router.query

  const tags = [
    "タグ1",
    "タグ2",
    "タグ3",
    "タグ4",
    "タグ1",
    "タグ2",
    "タグ3",
    "タグ4",
    "タグ1",
    "タグ2",
    "タグ3",
    "タグ4",
  ]

  const handleTagClick = useCallback((tag) => {
    console.log(tag)
  }, [])

  const handleSubmit = useCallback(() => {
    // TODO: submit diary
    console.log(emote, body)
  }, [body, emote])

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
        <div className="p-4">
          {tags?.map((tag) => (
            <Chip key={tag} label={tag} onClick={() => handleTagClick(tag)} sx={{ m: 0.5 }} />
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
