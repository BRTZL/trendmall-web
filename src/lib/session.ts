"use server"

import { cookies } from "next/headers"

export async function isUserAuthenticated() {
  const accessToken = cookies().get("accessToken")
  console.log(accessToken)

  return !!accessToken
}
