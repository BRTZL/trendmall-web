import { redirectToLogin } from "@/actions/router"

import { Api } from "@/types/api"

export const clientApi = new Api({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

clientApi.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      redirectToLogin()
    }
  }
)
