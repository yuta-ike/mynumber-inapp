import { ThemeProvider } from "@emotion/react"
import { useRouter } from "next/router"
import { Cancel, ArrowLeft } from "iconoir-react"
import { Button, Card, CardContent, Chip, Stack } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"

import { bgBaseColor, theme } from "@/consts/theme"
import TopBar from "@/components/layouts/TopBar"
import { bottomNavBarHeight } from "@/consts/layouts"
import { ICONS } from "@/consts/icons"
import AIWhisperLight from "@/components/AIWhisperLight"
import axios from "@/lib/axios"
import { usePersonalInfo } from "@/lib/pocketSign/PersonalInfoProvider"

const UserRecommend: React.FC = () => {
  const { data: personalInfo } = usePersonalInfo()
  const [users, setUsers] = useState<
    {
      userId: string
      nickname: string
      iconId: number
      ageDecades: number
      postedTags: {
        tag: string
        count: number
      }[]
    }[]
  >()

  useEffect(() => {
    const init = async () => {
      const res = await axios.get("/user-recommend", {
        headers: {
          Authorization: personalInfo?.subscriptionId,
        },
      })
      setUsers(res.data.users)
    }
    init()
  }, [personalInfo?.subscriptionId, setUsers])

  const [tags, setTags] = useState(["習慣", "スキンシップ"])

  const router = useRouter()

  const handleCounselingClick = useCallback(
    (matchingId: number, tag: string | undefined = undefined) => {
      router.push({ pathname: `/chat/${matchingId}`, query: { tag: tag } })
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
            <div className="rounded-xl bg-white">
              <AIWhisperLight>あなたに似た悩みを持った先輩を紹介します</AIWhisperLight>
              <div className="mx-5 border-t border-solid border-transparent border-t-primary py-5">
                <h3 className="m-0 text-sm font-normal text-[#212121]">あなたの選んだタグ</h3>
                <div className="mt-2 flex items-center">
                  {tags.map((tag) => (
                    <Chip key={tag} label={tag} sx={{ mr: 1, py: 1 }} />
                  ))}
                </div>
              </div>
            </div>
            {users?.map((user) => {
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
                <Card key={user.userId} elevation={0} sx={{ borderRadius: "16px" }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Image src={ICONS[user.iconId]} alt="" width={40} height={40} />
                        <Stack>
                          <div className="font-bold">{user.nickname}</div>
                          <div className="text-sm font-bold">{user.ageDecades}0代</div>
                        </Stack>
                      </Stack>
                      <div>
                        {/* 選択されたタグを表示する */}
                        {selectedTags.map((selectedTag) => (
                          <Chip
                            key={selectedTag.tag}
                            label={
                              <span className="inline-flex items-center gap-2 font-bold">
                                <span>{selectedTag.tag}</span>
                                <span className="text-[1.1em] font-semibold">
                                  {selectedTag.count}
                                </span>
                              </span>
                            }
                            sx={{ mr: 1 }}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap">
                        {/* その他のタグを表示する */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          {unselectedTags.map((unselectedTag) => (
                            <div key={unselectedTag.tag} className="flex items-center gap-[6px]">
                              <div className="text-sm">{unselectedTag.tag}</div>
                              <div className="m-0.5 flex h-[23px] w-[23px]  items-center justify-center rounded-full bg-[#EBEBEB] p-1 text-xs font-bold text-gray-600">
                                {unselectedTag.count}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        style={{
                          bottom: bottomNavBarHeight,
                          marginTop: "20px",
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
                            width: "100%",
                            "&:hover": {
                              bgcolor: theme.palette.primary["500"],
                            },
                          }}
                          className="rounded-lg"
                          // 選択されたタグのうち、初めに出現するものをパラメタとして次のページに渡す
                          onClick={() => {
                            // handleCounselingClick(user.matchingId, selectedTags[0].tag)
                          }}
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
