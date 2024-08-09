"use client"

import { useRouter } from "next/navigation"
import { logout } from "@/actions/auth"
import { Paths } from "@/constants"
import { useQueryClient } from "@tanstack/react-query"

import { Button } from "./ui/button"

export function LogoutButton() {
  const queryClient = useQueryClient()
  const { push } = useRouter()

  async function handleLogout() {
    await logout()
    queryClient.clear()

    push(Paths.login)
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
