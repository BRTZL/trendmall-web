import { useMutation } from "@tanstack/react-query"

import { clientApi } from "@/lib/api"

export function useCheckout() {
  return useMutation({
    mutationFn: async (addressId: string) => {
      const res = await clientApi.v1.ordersControllerCheckout({
        addressId,
      })

      return res.data
    },
  })
}
