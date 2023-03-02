import { Button } from "@mui/material"

import type { NextPage } from "next"

const Index: NextPage = () => {
  return (
    <main>
      <div className="m-4">
        <p className="text-red-400">Hello, world</p>
      </div>
      <Button variant="contained">Text</Button>
    </main>
  )
}

export default Index
