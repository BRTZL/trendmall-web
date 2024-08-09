import Link from "next/link"
import { Paths } from "@/constants"
import { LogIn } from "lucide-react"

export function LoginButton() {
  return (
    <Link href={Paths.login} className="hover:opacity-80">
      <LogIn className="size-6" />
    </Link>
  )
}
