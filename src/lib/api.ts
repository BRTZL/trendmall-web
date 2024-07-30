import { cookies } from "next/headers"

import { Api } from "@/types/api"

export const serverApi = new Api({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

serverApi.instance.interceptors.request.use((config) => {
  const accessToken = cookies().get("accessToken")?.value

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
