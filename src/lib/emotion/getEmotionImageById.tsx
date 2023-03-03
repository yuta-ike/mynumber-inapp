import Image from "next/image"

import 最高 from "@/images/最高.png"
import いい感じ from "@/images/いい感じ.png"
import ふつう from "@/images/ふつう.png"
import 微妙 from "@/images/微妙.png"
import 最悪 from "@/images/最悪.png"

export const getEmotionImageById = (id: number) => {
  switch (id) {
    case 1:
      return <Image src={最悪} alt="最悪" layout="fill" />
      break
    case 2:
      return <Image src={微妙} alt="微妙" layout="fill" />
      break
    case 3:
      return <Image src={ふつう} alt="ふつう" layout="fill" />
      break
    case 4:
      return <Image src={いい感じ} alt="いい感じ" layout="fill" />
      break
    case 5:
      return <Image src={最高} alt="最高" layout="fill" />
  }
}
