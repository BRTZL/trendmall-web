import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { AddressEntity, CreateAddressDto, UpdateAddressDto } from "@/types/api"
import { clientApi } from "@/lib/client-api"

export function useGetAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await clientApi.v1.addressesControllerFindAll()

      return res.data
    },
    initialData: [],
  })
}

export function useCreateAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateAddressDto) => {
      const res = await clientApi.v1.addressesControllerCreate(data)

      return res.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData<AddressEntity[]>(
        ["addresses"],
        (oldData = []) => [...oldData, data]
      )
    },
  })
}

export function useEditAddress(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateAddressDto) => {
      const res = await clientApi.v1.addressesControllerUpdate(id, data)

      return res.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData<AddressEntity[]>(["addresses"], (oldData) =>
        oldData?.map((address) => (address.id === id ? data : address))
      )
    },
  })
}

export function useRemoveAddress(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await clientApi.v1.addressesControllerRemove(id)

      return res.data
    },
    onSuccess: () => {
      queryClient.setQueryData<AddressEntity[]>(["addresses"], (oldData) =>
        oldData?.filter((address) => address.id !== id)
      )
    },
  })
}
