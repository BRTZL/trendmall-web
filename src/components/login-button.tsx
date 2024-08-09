import Link from "next/link"
import { LogIn } from "lucide-react"

export function LoginButton() {
  return (
    <Link href="/login" className="hover:opacity-80">
      <LogIn className="size-6" />
    </Link>
  )
}
