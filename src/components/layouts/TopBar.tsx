import { AppBar, Toolbar } from "@mui/material"

import { topBarHeight } from "@/consts/layouts"

export type TopBarProps = {
  children: React.ReactNode
  bgcolor?: string
  color?: string
}

const TopBar: React.FC<TopBarProps> = ({ children, bgcolor = "white", color = "black" }) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ top: 0, bgcolor: bgcolor, color: color, height: topBarHeight }}
        elevation={0}
      >
        <Toolbar>{children}</Toolbar>
      </AppBar>
      <div style={{ marginTop: topBarHeight }}></div>
    </>
  )
}

export default TopBar
