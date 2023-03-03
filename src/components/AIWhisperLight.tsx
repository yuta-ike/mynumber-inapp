import Image from "next/image"

import AI from "@/images/AI.png"
import { theme } from "@/consts/theme"

export type AIWhisperLightProps = {
  children: React.ReactNode
}

const AIWhisperLight: React.FC<AIWhisperLightProps> = ({ children }) => {
  return (
    <div
      className="flex items-center justify-start rounded-md p-5 font-bold"
      style={{
        color: theme.palette.primary["500"],
      }}
    >
      <Image src={AI} alt="AI" width={40} height={40} />
      <p className="m-0 ml-4 text-sm">{children}</p>
    </div>
  )
}

export default AIWhisperLight
