import { AppBar, Toolbar } from "@mui/material"

export type TopBarProps = {
  children: React.ReactNode
  bgcolor?: string
  color?: string
}

const TopBar: React.FC<TopBarProps> = ({ children, bgcolor = "white", color = "black" }) => {
  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, bgcolor: bgcolor, color: color }} elevation={0}>
        <Toolbar variant="dense">{children}</Toolbar>
      </AppBar>
      <div style={{ marginTop: "40px" }}></div>
    </>
  )
}

export default TopBar
