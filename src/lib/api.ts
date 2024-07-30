import { cookies } from "next/headers"

import { Api } from "@/types/api"

export const serverApi = new Api({
  baseURL: "http://localhost:3001",
  withCredentials: true,
})

serverApi.instance.interceptors.request.use((config) => {
  const accessToken = cookies().get("accessToken")?.value

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
