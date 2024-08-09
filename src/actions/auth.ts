"use server"

import { cookies } from "next/headers"
import { AUTHENTICATION_COOKIE_NAME } from "@/constants"

export async function logout() {
  cookies().delete(AUTHENTICATION_COOKIE_NAME)
}
