import { useMutation } from "@tanstack/react-query"

import { UpdateUserDto } from "@/types/api"
import { clientApi } from "@/lib/api"

export function useUpdateAccount() {
  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      const res = await clientApi.v1.usersControllerUpdateMe(data)

      return res.data
    },
  })
}
