import "server-only"

import { headers } from "next/headers"
import { redirectToLogin } from "@/actions/router"

import { Api } from "@/types/api"

export const serverApi = new Api({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
  headers: {
    Cookie: headers().get("cookie"),
  },
})

serverApi.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      redirectToLogin()
    }
  }
)
