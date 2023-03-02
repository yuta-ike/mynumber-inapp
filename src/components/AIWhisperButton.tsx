import { Avatar, Button } from "@mui/material"
import Image from "next/image"

import { theme } from "@/consts/theme"
import AI from "@/images/AI.png"

export type AIWhisperProps = {
  children: React.ReactNode
  onClick: () => void
}

const AIWhisperButton: React.FC<AIWhisperProps> = ({ children, onClick }) => {
  return (
    <Button onClick={onClick} className="w-full p-0">
      <div
        className="text-gray flex w-full items-center justify-start rounded-md border border-solid p-5"
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
    </Button>
  )
}

export default AIWhisperButton
