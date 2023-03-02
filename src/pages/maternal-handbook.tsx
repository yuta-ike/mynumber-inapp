import BottomNavBar from "@/components/layouts/BottomNavBar"
import TopBar from "@/components/layouts/TopBar"

const MaterilHandbook: React.FC = () => {
  return (
    <>
      <TopBar>母子手帳</TopBar>
      <main>
        <div className="m-4">
          <p className="text-red-400">Statstincs</p>
        </div>
      </main>
      <BottomNavBar />
    </>
  )
}

export default MaterilHandbook
