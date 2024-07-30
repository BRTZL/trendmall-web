"use client"

import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { deleteCookie } from "cookies-next"

import { Button } from "./ui/button"

export function LogoutButton() {
  const queryClient = useQueryClient()
  const router = useRouter()

  function handleLogout() {
    deleteCookie("accessToken")
    queryClient.clear()

    router.replace("/login")
    window.location.reload()
  }

  return (
    <Button
      className="absolute right-0"
      variant="destructive"
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}
