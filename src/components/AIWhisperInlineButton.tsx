import { Avatar } from "@mui/material"
import Image from "next/image"

import { theme } from "@/consts/theme"
import AI from "@/images/AI.png"

export type AIWhisperProps = {
  children: React.ReactNode
  underContent?: React.ReactNode
  onClick?: () => void
}

const AIWhisperInlineButton: React.FC<AIWhisperProps> = ({ children, onClick, underContent }) => {
  return (
    <div
      onClick={onClick}
      className="block w-full rounded-md border border-solid p-5 font-bold"
      style={{
        backgroundColor: theme.palette.primary["100"],
        borderColor: theme.palette.primary["500"],
        color: theme.palette.primary["500"],
      }}
    >
      <div
        className="text-gray flex w-full items-center justify-start"
        style={{
          backgroundColor: theme.palette.primary["100"],
          borderColor: theme.palette.primary["500"],
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
      {underContent && (
        <div
          className="mt-2 pt-5 text-left"
          style={{ borderTop: `1px solid ${theme.palette.primary["500"]}` }}
        >
          {underContent}
        </div>
      )}
    </div>
  )
}

export default AIWhisperInlineButton
