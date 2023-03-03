import { ThemeProvider } from "@emotion/react"
import { ArrowLeft, Cancel } from "iconoir-react"
import { useRouter } from "next/router"
import { Stack } from "@mui/system"
import { Avatar, IconButton, TextField } from "@mui/material"
import Image from "next/image"
import { SendDiagonal } from "iconoir-react"
import { useCallback, useEffect, useState } from "react"

import { bgBaseColor, theme } from "@/consts/theme"
import TopBar from "@/components/layouts/TopBar"
import { usePersonalInfo } from "@/lib/pocketSign/PersonalInfoProvider"
import AIWhisperSimple from "@/components/AIWhisperSimple"
import Carrot from "@/images/avatars/carrot.png"

export function getNowTime(): string {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const currentTime = `${hours}:${minutes}`
  return currentTime
}

const Chat: React.FC = () => {
  const router = useRouter()
  const { matchingId, tag } = router.query
  const personalInfo = usePersonalInfo()
  const [text, setText] = useState<string>("")

  const counselor = {
    subscriptionId: 1,
    name: "石川 沙也加",
  }

  const [chats, setChats] = useState<any[]>([])
  useEffect(() => {
    setChats([
      {
        id: 1,
        body: "はじめまして。1歳の子供の夜泣きが止まらなくてとても不安です。どうしたらいいですか？",
        user: {
          subscriptionId: personalInfo.data?.subscriptionId,
          name: personalInfo.data?.name,
        },
        createdAt: "9:46",
      },
      {
        id: 2,
        body: "はじめして。ご相談ありがとうございます。私には、6歳の息子がいます。",
        user: {
          subscriptionId: 1,
          name: "石川 沙也加",
        },
        createdAt: "10:20",
      },
      {
        id: 3,
        body: "はじめまして。1歳の子供の夜泣きが止まらなくてとても不安です。どうしたらいいですか？",
        user: {
          subscriptionId: personalInfo.data?.subscriptionId,
          name: personalInfo.data?.name,
        },
        createdAt: "10:23",
      },
      {
        id: 4,
        body: "はじめして。ご相談ありがとうございます。私には、6歳の息子がいます。",
        user: {
          subscriptionId: 1,
          name: "石川 沙也加",
        },
        createdAt: "12:12",
      },
      {
        id: 5,
        body: "はじめまして。1歳の子供の夜泣きが止まらなくてとても不安です。どうしたらいいですか？",
        user: {
          subscriptionId: personalInfo.data?.subscriptionId,
          name: personalInfo.data?.name,
        },
        createdAt: "13:20",
      },
      {
        id: 6,
        body: "はじめして。ご相談ありがとうございます。私には、6歳の息子がいます。",
        user: {
          subscriptionId: 1,
          name: "石川 沙也加",
        },
        createdAt: "13:25",
      },
    ])
  }, [personalInfo.data?.name, personalInfo.data?.subscriptionId])

  const handleChange = useCallback((e: any) => {
    setText(e.target.value)
  }, [])

  const handleSubmit = useCallback(() => {
    setChats([
      ...chats,
      {
        id: 7,
        body: text,
        user: {
          subscriptionId: personalInfo.data?.subscriptionId,
          name: personalInfo.data?.name,
        },
        createdAt: getNowTime(),
      },
    ])
    setText("")
  }, [chats, personalInfo.data?.name, personalInfo.data?.subscriptionId, text])

  return (
    <ThemeProvider theme={theme}>
      <TopBar bgcolor={bgBaseColor}>
        <div className="flex w-full items-center justify-between">
          <ArrowLeft onClick={() => router.back()} />
          <h1 className="text-center text-base font-bold">{counselor.name}</h1>
          <Cancel onClick={() => router.push("/")} />
        </div>
      </TopBar>
      <main>
        {tag && (
          <div className="mb-4">
            <AIWhisperSimple>
              {tag}について同じ悩みを持って、解決した先輩を紹介します
            </AIWhisperSimple>
          </div>
        )}
        <div className="mx-4 mb-20">
          <Stack spacing={3} className="mb-4">
            {personalInfo.data?.subscriptionId &&
              chats.map((chat) => (
                <Stack
                  key={chat.id}
                  direction={
                    chat.user.subscriptionId === personalInfo.data?.subscriptionId
                      ? "row-reverse"
                      : "row"
                  }
                  className="items-center"
                  spacing={2}
                >
                  <Avatar className="self-center">
                    <Image src={Carrot} alt={chat.user.name ?? ""} layout="fill" />
                  </Avatar>
                  <Stack
                    direction={
                      chat.user.subscriptionId === personalInfo.data?.subscriptionId
                        ? "row-reverse"
                        : "row"
                    }
                    className="items-center gap-2"
                  >
                    <div className=" bg-white p-4" style={{ borderRadius: "16px", width: "70%" }}>
                      {chat.body}
                    </div>
                    <div className="mb-2 self-end text-gray-500">{chat.createdAt}</div>
                  </Stack>
                </Stack>
              ))}
          </Stack>
        </div>

        <Stack
          className="fixed bottom-0 left-0 right-0 mx-auto w-full px-8 py-2"
          style={{ backgroundColor: bgBaseColor }}
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <TextField fullWidth size="small" name="chat" type="text" onChange={handleChange} />
          <IconButton
            style={{ backgroundColor: theme.palette.primary["500"], color: "#fff" }}
            onClick={handleSubmit}
          >
            <SendDiagonal />
          </IconButton>
        </Stack>
      </main>
    </ThemeProvider>
  )
}

export default Chat
