import React from "react"
import { AppWindow } from "iconoir-react"
import Link from "next/link"

const DebugPanel = () => {
  return (
    <Link
      href="/debug"
      className="fixed top-4 right-4 z-[5000] grid h-8 w-8 place-items-center rounded-full border border-solid border-gray-100 text-black shadow-sm"
    >
      <AppWindow width={16} height={16} />
    </Link>
  )
}

export default DebugPanel
