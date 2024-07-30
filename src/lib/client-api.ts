import { getCookie } from "cookies-next"

import { Api } from "@/types/api"

export const clientApi = new Api({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://trendmall-api.up.railway.app/",
  withCredentials: true,
})

clientApi.instance.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken")

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
