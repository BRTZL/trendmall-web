import { getCookie } from "cookies-next"

import { Api } from "@/types/api"

export const clientApi = new Api({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

clientApi.instance.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken")

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
