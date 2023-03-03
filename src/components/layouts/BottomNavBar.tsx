import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { HomeSimpleDoor, GraphUp, ChatLines, BookStack } from "iconoir-react"
import { useRouter } from "next/router"
import { useState } from "react"

const BottomNavBar: React.FC = () => {
  const [value, setValue] = useState(0)

  const router = useRouter()

  const onLink = (href: string) => {
    router.push(href)
  }

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        pb: 3,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          value="/"
          label="ホーム"
          icon={<HomeSimpleDoor />}
          onClick={() => onLink("/")}
          sx={{ gap: 0.5 }}
        />

        <BottomNavigationAction
          value="/statistics"
          label="記録"
          icon={<GraphUp />}
          onClick={() => onLink("/statistics")}
          sx={{ gap: 0.5 }}
        />

        <BottomNavigationAction
          value="/counseling"
          label="相談"
          icon={<ChatLines />}
          onClick={() => onLink("/counseling")}
          sx={{ gap: 0.5 }}
        />

        <BottomNavigationAction
          value="/maternal-handbook"
          label="母子手帳"
          icon={<BookStack />}
          onClick={() => onLink("/maternal-handbook")}
          sx={{ gap: 0.5 }}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNavBar
