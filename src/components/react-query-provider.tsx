"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type ReactQueryProviderProps = {
  children: React.ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
