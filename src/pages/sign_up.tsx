import { Button, TextField } from "@mui/material"
import React, { useId, useState } from "react"
import Image from "next/image"
import classNames from "classnames"
import { useRouter } from "next/router"
import { ThemeProvider } from "@emotion/react"

import { theme } from "@/consts/theme"
import axios from "@/lib/axios"
import { usePersonalInfo } from "@/lib/pocketSign/PersonalInfoProvider"
import { ICONS } from "@/consts/icons"

const SignUp = () => {
  const router = useRouter()
  const nicknameId = useId()
  const [input, setInput] = useState("")
  const [iconId, setIconId] = useState<number | null>(null)
  const [childName, setChildName] = useState<string>("")
  const [childBirth, setChildBirth] = useState<string>("")
  const { data: personalInfo } = usePersonalInfo()

  const handleSignUp = async () => {
    if (personalInfo == null) {
      return
    }
    await axios.post(
      "/sign_up",
      {
        name: personalInfo.name,
        nickname: input,
        birthday: personalInfo.birthday.toISOString(),
        address: personalInfo.address,
        child_name: childName,
        child_birth: childBirth,
        iconId,
      },
      {
        headers: {
          Authorization: personalInfo.subscriptionId,
        },
      },
    )
    router.push("/")
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="p-5">
        <header className="flex">
          <h2 className="text-2xl font-bold">ユーザー登録</h2>
        </header>
        <form
          className="mt-5"
          onSubmit={(e) => {
            e.preventDefault()
            handleSignUp()
          }}
        >
          <label htmlFor={nicknameId} className="mt-10 flex items-center gap-2">
            ニックネームを登録してください<small style={{ color: "red" }}>※</small>
          </label>
          <div className="mt-4 flex w-full overflow-hidden rounded-lg border border-solid border-slate-200 p-[1px] text-base">
            <input
              id={nicknameId}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="m-0 w-full appearance-none rounded-lg border-none p-4 placeholder:text-slate-200"
              placeholder="ニックネーム"
              required
            />
          </div>

          <label htmlFor={nicknameId} className="mt-10 flex items-center gap-2">
            アイコンを選択してください <small style={{ color: "red" }}>※</small>
          </label>
          <div className="scrollbar-hidden -mx-5 mt-4 flex w-[calc(100%+40px)] space-x-1 overflow-x-scroll px-5">
            {ICONS.map((icon, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setIconId(i + 1)}
                className={classNames(
                  "flex appearance-none rounded-full border-4 border-solid bg-transparent p-0",
                  i + 1 === iconId ? "border-primary" : "border-transparent",
                )}
              >
                <Image
                  src={icon}
                  width={64}
                  height={64}
                  alt=""
                  className={classNames(
                    "rounded-full border-2 border-solid border-transparent bg-white shadow",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="mt-8">
            <label htmlFor={nicknameId}>赤ちゃんのニックネームを登録してください</label>
            <div className="mt-4 flex w-full overflow-hidden rounded-lg border border-solid border-slate-200 p-[1px] text-base">
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="m-0 w-full appearance-none rounded-lg border-none p-4 placeholder:text-slate-200"
                placeholder="赤ちゃんのニックネーム"
              />
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor={nicknameId}>赤ちゃんの誕生日を登録してください</label>
            <div className="mt-4 flex w-full overflow-hidden rounded-lg border border-solid border-slate-200 bg-white  p-0 text-base">
              <TextField
                type="date"
                value={childBirth}
                onChange={(e) => setChildBirth(e.target.value)}
                className="m-0 w-full appearance-none rounded-lg border-none p-4 placeholder:text-slate-200"
                placeholder="赤ちゃんの誕生日"
                sx={{ padding: 0 }}
              />
            </div>
          </div>
          <Button
            type="submit"
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
            className="mt-10 disabled:!text-white disabled:opacity-70"
            fullWidth
            disabled={input === "" || iconId == null}
          >
            決定する
          </Button>
        </form>
      </div>
    </ThemeProvider>
  )
}

export default SignUp
