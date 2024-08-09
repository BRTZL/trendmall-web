"use client"

import { logout } from "@/actions/auth"
import { useQueryClient } from "@tanstack/react-query"

import { useRedirect } from "@/hooks/auth"

import { Button } from "./ui/button"

export function LogoutButton() {
  const queryClient = useQueryClient()
  const { redirectTo } = useRedirect()

  async function handleLogout() {
    await logout()
    queryClient.clear()

    redirectTo("/login")
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
