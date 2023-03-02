import Link from "next/link"

import BottomNavBar from "@/components/layouts/BottomNavBar"
import AddDiariesButton from "@/components/layouts/diaries/AddDiariesButton"
import TopBar from "@/components/layouts/TopBar"

import type { NextPage } from "next"

const Index: NextPage = () => {
  return (
    <>
      <TopBar>
        <h1 className="pl-2 text-[24px]">ホーム</h1>
      </TopBar>
      <main>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <div className="m-4">
          <p className="text-red-400">Hello, world</p>
        </div>
        <Link href="/diary/add">日記を書く</Link>
        <AddDiariesButton />
      </main>
      <BottomNavBar />
    </>
  )
}

export default Index
