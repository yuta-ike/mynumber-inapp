import BottomNavBar from "@/components/layouts/BottomNavBar"
import TopBar from "@/components/layouts/TopBar"

const Counseling: React.FC = () => {
  return (
    <>
      <TopBar>相談</TopBar>
      <main>
        <div className="m-4">
          <p className="text-red-400">Counseling</p>
        </div>
      </main>
      <BottomNavBar />
    </>
  )
}

export default Counseling
