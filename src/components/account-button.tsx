import Link from "next/link"
import { Paths } from "@/constants"
import { User } from "lucide-react"

export function AccountButton() {
  return (
    <Link href={Paths.account} className="hover:opacity-80">
      <User className="size-6" />
    </Link>
  )
}
