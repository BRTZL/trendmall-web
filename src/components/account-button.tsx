import Link from "next/link"
import { User } from "lucide-react"

export function AccountButton() {
  return (
    <Link href="/account" className="hover:opacity-80">
      <User className="size-6" />
    </Link>
  )
}
