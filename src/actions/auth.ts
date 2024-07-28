"use server"

import { cookies } from "next/headers"

import { serverApi } from "@/lib/api"

export async function login(email: string, password: string) {
  const res = await serverApi.v1.authControllerLogin({
    email,
    password,
  })

  cookies().set("accessToken", res.data.accessToken)

  return res.data
}
