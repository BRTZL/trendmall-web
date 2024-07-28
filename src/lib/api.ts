import { Api } from "@/types/api"

export const serverApi = new Api({
  baseURL: "http://localhost:3001",
  withCredentials: true,
})
