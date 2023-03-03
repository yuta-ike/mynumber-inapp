import BottomNavBar from "@/components/layouts/BottomNavBar"
import TopBar from "@/components/layouts/TopBar"

const Statistics: React.FC = () => {
  return (
    <>
      <TopBar>
        <h1 className="pl-2 text-[24px]">記録</h1>
      </TopBar>
      <main className="p-4"></main>
      <BottomNavBar />
    </>
  )
}

export default Statistics
