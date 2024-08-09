import "server-only"

import { headers } from "next/headers"

import { Api } from "@/types/api"

export const serverApi = new Api({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
  headers: {
    Cookie: headers().get("cookie"),
  },
})
