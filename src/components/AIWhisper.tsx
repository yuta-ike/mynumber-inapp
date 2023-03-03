import { Avatar } from "@mui/material"
import Image from "next/image"

import AI from "@/images/AI.png"
import { theme } from "@/consts/theme"

export type AIWhisperProps = {
  children: React.ReactNode
}

const AIWhisper: React.FC<AIWhisperProps> = ({ children }) => {
  return (
    <div
      className="flex items-center justify-start rounded-md bg-white p-5 font-bold"
      style={{
        color: theme.palette.primary["500"],
      }}
    >
      <div className="w-[17%]">
        <Avatar>
          <Image src={AI} alt="AI" />
        </Avatar>
      </div>
      <p>{children}</p>
    </div>
  )
}

export default AIWhisper
