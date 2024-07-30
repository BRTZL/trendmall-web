import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { AddItemToCartDto, CartItemEntity } from "@/types/api"
import { clientApi } from "@/lib/client-api"

export function useGetCart(initialData: CartItemEntity[]) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await clientApi.v1.cartControllerGetCart()

      return res.data
    },
    initialData,
  })
}

export function useAddToCart() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: AddItemToCartDto) => {
      const res = await clientApi.v1.cartControllerAddItemToCart(data)

      return res.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data)
      router.prefetch("/cart")
    },
  })
}

export function useRemoveFromCart() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: AddItemToCartDto) => {
      const res = await clientApi.v1.cartControllerRemoveItemFromCart(data)

      return res.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data)
      router.prefetch("/cart")
    },
  })
}
