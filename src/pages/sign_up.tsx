import { Button } from "@mui/material"
import React, { useId, useState } from "react"
import Image from "next/image"
import classNames from "classnames"
import { useRouter } from "next/router"

import { theme } from "@/consts/theme"
import axios from "@/lib/axios"
import { usePersonalInfo } from "@/lib/pocketSign/PersonalInfoProvider"
import Icon1 from "@/images/icon_1.png"
import Icon2 from "@/images/icon_2.png"
import Icon3 from "@/images/icon_3.png"

const ICONS = [Icon1, Icon2, Icon3]

const SignUp = () => {
  const router = useRouter()
  const nicknameId = useId()
  const [input, setInput] = useState("")
  const [iconId, setIconId] = useState<number | null>(null)
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
        <label htmlFor={nicknameId}>ニックネームを登録してください</label>
        <div className="mt-4 flex w-full overflow-hidden rounded-lg border border-solid border-slate-200 p-[1px] text-sm">
          <input
            id={nicknameId}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="m-0 w-full appearance-none rounded-lg border-none p-4 placeholder:text-slate-200"
            placeholder="ニックネーム"
          />
        </div>

        <label htmlFor={nicknameId} className="mt-10 block">
          アイコンを選択してください
        </label>
        <div className="mt-4 flex w-full">
          {ICONS.map((icon, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setIconId(i)}
              className="rounded-full border-none bg-transparent"
            >
              <Image
                src={icon}
                width={64}
                height={64}
                alt=""
                className={classNames(
                  "rounded-full border-2 border-solid bg-white shadow",
                  i === iconId ? "border-primary" : "border-white",
                )}
              />
            </button>
          ))}
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
          className="mt-10"
          fullWidth
        >
          決定する
        </Button>
      </form>
    </div>
  )
}

export default SignUp
