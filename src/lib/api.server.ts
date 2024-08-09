import "server-only"

import { cookies } from "next/headers"
import { redirectToLogin } from "@/actions/router"
import { AUTHENTICATION_COOKIE_NAME } from "@/constants"

import { Api } from "@/types/api"

export const serverApi = new Api({
  baseURL: process.env.API_URL,
  withCredentials: true,
})

serverApi.instance.interceptors.request.use((config) => {
  config.headers["Cookie"] = `${AUTHENTICATION_COOKIE_NAME}=${
    cookies().get(AUTHENTICATION_COOKIE_NAME)?.value
  }`
  return config
})

serverApi.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      redirectToLogin()
    }
  }
)
