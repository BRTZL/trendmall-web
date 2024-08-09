import { useRouter } from "next/navigation"

import { Paths } from "@/types/paths"

export function useRedirect() {
  const router = useRouter()

  return {
    redirectTo: (path: Paths) => {
      router.push(path)
    },
  }
}
