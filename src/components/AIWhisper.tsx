import { Avatar } from "@mui/material"
import Image from "next/image"

import AI from "@/images/AI.png"
import { theme } from "@/consts/theme"

export type AIWhisperProps = {
  children: React.ReactNode
  underContent?: React.ReactNode
  bgcolor?: string
  padding?: string
}

const AIWhisper: React.FC<AIWhisperProps> = ({ children, underContent, bgcolor = "#fff" }) => {
  return (
    <div className="rounded-md">
      <div
        className="flex items-center justify-start rounded-md  p-5 font-bold"
        style={{
          color: theme.palette.primary["500"],
          backgroundColor: bgcolor,
        }}
      >
        <div className="w-[17%]">
          <Avatar>
            <Image src={AI} alt="AI" />
          </Avatar>
        </div>
        <p>{children}</p>
      </div>
      {underContent && (
        <div
          className="mt-2 pt-5"
          style={{ borderTop: `1px solid ${theme.palette.primary["500"]}` }}
        >
          {underContent}
        </div>
      )}
    </div>
  )
}

export default AIWhisper
