"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AUTHENTICATION_COOKIE_NAME } from "@/constants"

export async function isUserAuthenticated() {
  const accessToken = cookies().get(AUTHENTICATION_COOKIE_NAME)

  return !!accessToken?.value
}

export async function ensureUserIsAuthenticated() {
  const accessToken = cookies().get(AUTHENTICATION_COOKIE_NAME)

  if (!accessToken?.value) {
    redirect("/login")
  }
}
