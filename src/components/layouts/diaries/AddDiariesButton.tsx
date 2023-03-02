import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import EditIcon from "@mui/icons-material/Edit"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"

import 最高 from "@/images/最高.png"
import いい感じ from "@/images/いい感じ.png"
import ふつう from "@/images/ふつう.png"
import 微妙 from "@/images/微妙.png"
import 最悪 from "@/images/最悪.png"

const AddDiariesButton: React.FC = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const router = useRouter()

  const size = 45

  const actions = [
    { icon: <Image src={最高} alt="最高" width={size} height={size} />, name: "最高" },
    { icon: <Image src={いい感じ} alt="いい感じ" width={size} height={size} />, name: "いい感じ" },
    { icon: <Image src={ふつう} alt="ふつう" width={size} height={size} />, name: "ふつう" },
    { icon: <Image src={微妙} alt="微妙" width={size} height={size} />, name: "微妙" },
    { icon: <Image src={最悪} alt="最悪" width={40} height={40} />, name: "最悪" },
  ]

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Add diaries button"
        direction="left"
        sx={{ position: "fixed", bottom: 16, right: 16, mb: 10 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => router.push({ pathname: "/diaries/write", query: action.name })}
          />
        ))}
      </SpeedDial>
    </>
  )
}

export default AddDiariesButton
