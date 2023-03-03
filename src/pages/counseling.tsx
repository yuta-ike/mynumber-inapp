import sub from "date-fns/sub"

import BottomNavBar from "@/components/layouts/BottomNavBar"
import TopBar from "@/components/layouts/TopBar"
import { formatDistanceToNow } from "@/utils/datetime"

const CHATROOMS = [
  {
    id: "1",
    nickname: "田中太郎",
    iconId: 1,
    tags: ["夜泣き", "成長"],
    updatedAt: new Date(),
    lastMessage: "私は近くの病院で専門医に診てもらっていました",
  },
  {
    id: "2",
    nickname: "山本次郎",
    iconId: 2,
    tags: ["夜泣き", "成長"],
    updatedAt: sub(new Date(), { days: 1 }),
    lastMessage:
      "私は近くの病院で専門医に診てもらっていました。私は近くの病院で専門医に診てもらっていました。私は近くの病院で専門医に診てもらっていました。",
  },
  {
    id: "3",
    nickname: "坂東三郎",
    iconId: 3,
    tags: ["夜泣き", "成長"],
    updatedAt: sub(new Date(), { days: 3 }),
    lastMessage: "私は近くの病院で専門医に診てもらっていました",
  },
  {
    id: "4",
    nickname: "田中太郎",
    iconId: 4,
    tags: ["夜泣き", "成長"],
    updatedAt: sub(new Date(), { days: 7 }),
    lastMessage: "私は近くの病院で専門医に診てもらっていました",
  },
  {
    id: "5",
    nickname: "山本次郎",
    iconId: 5,
    tags: ["夜泣き", "成長"],
    updatedAt: sub(new Date(), { days: 30 }),
    lastMessage: "私は近くの病院で専門医に診てもらっていました",
  },
  {
    id: "6",
    nickname: "坂東三郎",
    iconId: 0,
    tags: ["夜泣き", "成長"],
    updatedAt: sub(new Date(), { days: 365 }),
    lastMessage: "私は近くの病院で専門医に診てもらっていました",
  },
]

const Counseling: React.FC = () => {
  return (
    <>
      <TopBar>
        <h1 className="pl-2 text-[24px]">相談</h1>
      </TopBar>
      <main className="p-4">
        <div className="overflow-hidden rounded-xl bg-white">
          {CHATROOMS.map((item) => (
            <div
              key={item.id}
              className="relative border-b border-solid border-transparent border-b-gray-100 px-5 py-4 text-gray-900"
            >
              <div className="text-sm font-bold leading-none">{item.nickname}</div>
              <div className="mt-2 flex flex-wrap gap-x-2">
                {item.tags.map((tag) => (
                  <div key={tag} className="rounded-full bg-gray-200 px-2 py-1 text-xs">
                    {tag}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-400 line-clamp-2">{item.lastMessage}</div>
              <div className="absolute top-4 right-4 text-xs text-gray-400">
                {formatDistanceToNow(item.updatedAt)}
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNavBar />
    </>
  )
}

export default Counseling
