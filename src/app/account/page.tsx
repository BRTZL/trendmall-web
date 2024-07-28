import { redirect } from "next/navigation"

import { isUserAuthenticated } from "@/lib/session"

export default async function Account() {
  const isAuthenticated = await isUserAuthenticated()

  if (!isAuthenticated) {
    redirect("/login")
  }

  return <div>Account</div>
}
