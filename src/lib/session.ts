"use server"

import { cookies } from "next/headers"

export async function isUserAuthenticated() {
  const accessToken = cookies().get("accessToken")

  return !!accessToken?.value
}
