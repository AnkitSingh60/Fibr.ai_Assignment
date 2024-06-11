import { generatePageTitle } from "@/shared/utils"
import {Metadata} from "next"


type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: generatePageTitle("Preview"),
}

export default function OrdersLayout(props: Props) {
  return <>{props.children}</>
}
