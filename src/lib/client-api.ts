import { Api } from "@/types/api"

export const clientApi = new Api({
  baseURL: "http://localhost:3001",
  withCredentials: true,
})
