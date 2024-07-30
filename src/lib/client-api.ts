import { Api } from "@/types/api"

export const clientApi = new Api({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://magnificent-patience-production.up.railway.app/",
  withCredentials: true,
})
