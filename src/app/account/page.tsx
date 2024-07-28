import { redirect } from "next/navigation"

import { serverApi } from "@/lib/api"
import { isUserAuthenticated } from "@/lib/session"

export default async function Account() {
  const isAuthenticated = await isUserAuthenticated()

  if (!isAuthenticated) {
    redirect("/login")
  }

  const user = await serverApi.v1.usersControllerMe()

  console.log(user)

  return <div>Account</div>
}
