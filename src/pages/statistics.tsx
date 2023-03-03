import { Stack } from "@mui/material"
import { NavArrowRight } from "iconoir-react"

import BottomNavBar from "@/components/layouts/BottomNavBar"
import TopBar from "@/components/layouts/TopBar"

const Statistics: React.FC = () => {
  return (
    <>
      <TopBar>
        <h1 className="pl-2 text-[24px]">記録</h1>
      </TopBar>
      <main className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col rounded-xl bg-white p-4">
            <h2 className="m-0 mb-4 text-base">じぶんの１週間</h2>
            <Stack direction="row" style={{ borderRadius: "50%", width: "100%" }}>
              <div
                style={{
                  width: "65%",
                  backgroundColor: "#7DAA88",
                  height: "20px",
                  borderRadius: "20px 0 0 20px",
                }}
              />
              <div style={{ width: "20%", height: "20px", backgroundColor: "#9BB0F9" }} />
              <div
                style={{
                  width: "15%",
                  backgroundColor: "#F48F82",
                  height: "20px",
                  borderRadius: "0 20px 20px 0",
                }}
              />
            </Stack>
            <Stack direction="row" className="mt-3" spacing={1}>
              <Stack direction="row" className="text-sm" alignItems="center" gap={0.5}>
                <Stack
                  style={{
                    width: " 8px",
                    height: "8px",
                    backgroundColor: "#7DAA88",
                    borderRadius: "999px",
                  }}
                />
                スキンシップ
              </Stack>
              <Stack direction="row" alignItems="center" className="text-sm" gap={0.5}>
                <Stack
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#9BB0F9",
                    borderRadius: "999px",
                  }}
                />
                夜泣き
              </Stack>
              <Stack direction="row" alignItems="center" className="text-sm" gap={0.5}>
                <Stack
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#F48F82",
                    borderRadius: "999px",
                  }}
                />
                成長
              </Stack>
            </Stack>
          </div>
          <div className="flex items-center rounded-xl bg-white p-4">
            <Stack className="grow">
              <div className="text-lg font-bold text-gray-700">ヘルスケアアプリと連携</div>
              <p className="m-0 text-sm text-gray-400">ヘルスケアアプリを連携させます</p>
            </Stack>
            <NavArrowRight className="shrink-0" />
          </div>
        </div>
      </main>
      <BottomNavBar />
    </>
  )
}

export default Statistics
