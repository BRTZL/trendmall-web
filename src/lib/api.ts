import { redirectToLogin } from "@/actions/router"

import { Api } from "@/types/api"

export const clientApi = new Api({
  baseURL: "http://localhost:3001/",
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
