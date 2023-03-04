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
        <div className="h-10 w-10 shrink-0">
          <Image src={AI} alt="AI" width={40} height={40} />
        </div>
        <p className="m-0 ml-2">{children}</p>
      </div>
      {underContent && (
        <div
          className="mt-4 pt-4 text-left"
          style={{ borderTop: `1px solid ${theme.palette.primary["500"]}` }}
        >
          {underContent}
        </div>
      )}
    </div>
  )
}

export default AIWhisperInlineButton
