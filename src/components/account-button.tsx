import Link from "next/link"
import { LogIn, User } from "lucide-react"

import { isUserAuthenticated } from "@/lib/session"

export async function AccountButton() {
  const isAuthenticated = await isUserAuthenticated()

  return isAuthenticated ? (
    <Link href="/account" className="hover:opacity-80" prefetch={false}>
      <User className="size-6" />
    </Link>
  ) : (
    <Link href="/login" className="hover:opacity-80" prefetch={false}>
      <LogIn className="size-6" />
    </Link>
  )
}
