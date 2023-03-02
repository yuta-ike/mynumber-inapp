import { Cancel, ArrowLeft } from "iconoir-react"
import { useRouter } from "next/router"

import TopBar from "@/components/layouts/TopBar"

const AddDiaryTag: React.FC = () => {
  const router = useRouter()
  console.log(router.query)

  return (
    <>
      <TopBar>
        <div className="flex w-full items-center justify-between">
          <ArrowLeft onClick={() => router.back()} />
          <h1 className="text-center text-base font-bold">3/3(土)</h1>
          <Cancel onClick={() => router.push("/")} />
        </div>
      </TopBar>
    </>
  )
}

export default AddDiaryTag
