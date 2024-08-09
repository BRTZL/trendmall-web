"use server"

import { redirect } from "next/navigation"
import { Paths } from "@/constants"

export async function redirectToLogin() {
  redirect(Paths.login)
}
