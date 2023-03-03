import { ThemeProvider } from "@emotion/react"
import { useRouter } from "next/router"
import { Cancel, ArrowLeft } from "iconoir-react"
import { Avatar, Button, Card, CardContent, Chip, Stack } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"

import { bgBaseColor, theme } from "@/consts/theme"
import TopBar from "@/components/layouts/TopBar"
import AIWhisper from "@/components/AIWhisper"
import Carrot from "@/images/avatars/carrot.png"
import { bottomNavBarHeight } from "@/consts/layouts"

const UserRecommend: React.FC = () => {
  const [tags, setTags] = useState(["習慣", "スキンシップ"])

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "ニックネーム",
      age: 20,
      postedTags: [
        {
          tag: "読書",
          count: 5,
        },
        {
          tag: "スキンシップ",
          count: 5,
        },
        {
          tag: "習慣",
          count: 13,
        },
        {
          tag: "喧嘩",
          count: 13,
        },
        {
          tag: "産後太り",
          count: 13,
        },
        {
          tag: "ほげ",
          count: 13,
        },
        {
          tag: "ふが",
          count: 13,
        },
        {
          tag: "ダイエット",
          count: 13,
        },
      ],
      matchingId: 1,
    },
    {
      id: 2,
      name: "ニックネーム",
      age: 20,
      postedTags: [
        {
          tag: "読書",
          count: 5,
        },
        {
          tag: "スキンシップ",
          count: 5,
        },
        {
          tag: "ダイエット",
          count: 13,
        },
        {
          tag: "喧嘩",
          count: 13,
        },
        {
          tag: "産後太り",
          count: 13,
        },
        {
          tag: "ほげ",
          count: 13,
        },
        {
          tag: "ふが",
          count: 13,
        },
        {
          tag: "ダイエット",
          count: 13,
        },
      ],
      matchingId: 2,
    },
    {
      id: 3,
      name: "ニックネーム",
      age: 20,
      postedTags: [
        {
          tag: "読書",
          count: 5,
        },
        {
          tag: "スキンシップ",
          count: 5,
        },
        {
          tag: "ダイエット",
          count: 13,
        },
        {
          tag: "喧嘩",
          count: 13,
        },
        {
          tag: "産後太り",
          count: 13,
        },
        {
          tag: "ほげ",
          count: 13,
        },
        {
          tag: "ふが",
          count: 13,
        },
        {
          tag: "ダイエット",
          count: 13,
        },
      ],
      matchingId: 3,
    },
    {
      id: 4,
      name: "ニックネーム",
      age: 20,
      postedTags: [
        {
          tag: "読書",
          count: 5,
        },
        {
          tag: "スキンシップ",
          count: 5,
        },
        {
          tag: "ダイエット",
          count: 13,
        },
        {
          tag: "喧嘩",
          count: 13,
        },
        {
          tag: "産後太り",
          count: 13,
        },
        {
          tag: "ほげ",
          count: 13,
        },
        {
          tag: "ふが",
          count: 13,
        },
        {
          tag: "ダイエット",
          count: 13,
        },
      ],
      matchingId: 4,
    },
  ])

  const router = useRouter()

  useEffect(() => {
    const userRecommend = {}
  }, [])

  const handleCounselingClick = useCallback(
    (matchingId: number) => {
      router.push({ pathname: `/chat/${matchingId}` })
    },
    [router],
  )

  return (
    <ThemeProvider theme={theme}>
      <TopBar bgcolor={bgBaseColor}>
        <div className="flex w-full items-center justify-between">
          <ArrowLeft onClick={() => router.back()} />
          <h1 className="text-center text-base font-bold">3/3(土)</h1>
          <Cancel onClick={() => router.push("/")} />
        </div>
      </TopBar>
      <main>
        <div className="m-4">
          <Stack spacing={2}>
            <AIWhisper
              underContent={
                <>
                  <div className="mb-1 text-sm text-gray-900">あなたの選んだタグ</div>
                  {tags.map((tag) => (
                    <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
                  ))}
                </>
              }
              bold
            >
              あなたに似た悩みを持った先輩を紹介します。
            </AIWhisper>
            {users.map((user) => {
              // 選択されたタグと同じタグの情報が格納される
              const selectedTags: { count: number; tag: string }[] = []
              // 上記以外のタグが格納される
              const unselectedTags: { count: number; tag: string }[] = []
              user.postedTags?.forEach((postedTag) => {
                if (tags?.includes(postedTag.tag)) {
                  selectedTags.push(postedTag)
                } else {
                  unselectedTags.push(postedTag)
                }
              })

              return (
                <Card key={user.id} elevation={0}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar>
                          <Image src={Carrot} alt={user.name} layout="fill" />
                        </Avatar>
                        <Stack>
                          <div className="text-lg font-bold">{user.name}</div>
                          <div>{user.age}代</div>
                        </Stack>
                      </Stack>
                      <div>
                        {/* 選択されたタグを表示する */}
                        {selectedTags.map((selectedTag) => (
                          <Chip
                            key={selectedTag.tag}
                            label={
                              <span className="inline-flex items-center gap-2">
                                <span>{selectedTag.tag}</span>
                                <span className="text-[1.1em] font-semibold">
                                  {selectedTag.count}
                                </span>
                              </span>
                            }
                            sx={{ m: 0.5 }}
                          ></Chip>
                        ))}
                      </div>
                      <div>
                        {/* その他のタグを表示する */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          {unselectedTags.map((unselectedTag) => (
                            <div key={unselectedTag.tag} className="flex items-center gap-2">
                              <div>{unselectedTag.tag}</div>
                              <div className="m-0.5 flex h-[23px] w-[23px]  items-center justify-center rounded-full bg-gray-300 p-1 text-sm">
                                {unselectedTag.count}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        style={{
                          bottom: bottomNavBarHeight,
                          margin: "20px 40px 0",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          sx={{
                            color: "#fff",
                            bgcolor: theme.palette.primary["500"],
                            fontWeight: "bold",
                            py: 1.25,
                            width: "80%",
                            "&:hover": {
                              bgcolor: theme.palette.primary["500"],
                            },
                          }}
                          onClick={() => handleCounselingClick(user.matchingId)}
                        >
                          相談する
                        </Button>
                      </div>
                    </Stack>
                  </CardContent>
                </Card>
              )
            })}
          </Stack>
        </div>
      </main>
    </ThemeProvider>
  )
}

export default UserRecommend
