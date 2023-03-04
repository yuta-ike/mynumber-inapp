import Image from "next/image"
import { NavArrowRight } from "iconoir-react"

import BottomNavBar from "@/components/layouts/BottomNavBar"
import TopBar from "@/components/layouts/TopBar"
import { bgBaseColor } from "@/consts/theme"
import Municipality from "@/images/municipality.png"
import { bottomNavBarHeight } from "@/consts/layouts"

const MaterilHandbook: React.FC = () => {
  return (
    <>
      <TopBar bgcolor={bgBaseColor}>
        <h1 className="pl-2 text-[24px]">母子手帳</h1>
      </TopBar>
      <main style={{ marginBottom: bottomNavBarHeight }} className="pb-4">
        <div className="relative m-4 h-[140px]">
          <a href="https://miya-pass.jp/" target="_blank">
            <Image
              src={Municipality}
              alt="自治体の子育て支援"
              layout="fill"
              objectFit="contain"
              priority
              placeholder="blur"
            />
          </a>
        </div>
        <div className="m-4">
          <h2 className="-mb-2 text-xl">お母さんの基本情報</h2>
          <ul className="list-none pl-0">
            <li className="my-1 flex items-center justify-between">
              <p>妊婦の健康状態</p>
              <NavArrowRight />
            </li>
            <li className="my-1 flex items-center justify-between">
              <p>妊娠の職業・環境</p>
              <NavArrowRight />
            </li>
          </ul>
        </div>
        <div className="m-4">
          <h2 className="-mb-2 text-xl">妊娠中の経過</h2>
          <ul className="list-none pl-0">
            <li className="my-1 flex items-center justify-between">
              <p>妊娠健診（妊娠の経過）</p>
              <NavArrowRight />
            </li>
            <li className="my-1 flex items-center justify-between">
              <p>検査の記録</p>
              <NavArrowRight />
            </li>
            <li className="my-1 flex items-center justify-between">
              <p>妊娠中と産後の歯の状態</p>
              <NavArrowRight />
            </li>
          </ul>
        </div>
      </main>
      <BottomNavBar />
    </>
  )
}

export default MaterilHandbook
