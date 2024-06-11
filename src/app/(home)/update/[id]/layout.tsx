import {Metadata} from "next"
import {generatePageTitle} from "@/shared/utils"

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: generatePageTitle("Update"),
}

export default function OrdersLayout(props: Props) {
  return <>{props.children}</>
}
