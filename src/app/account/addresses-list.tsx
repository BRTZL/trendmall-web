"use client"

import { useGetAddresses } from "@/queries/address"

import { AddressEntity } from "@/types/api"

import { CreateAddressForm } from "./create-address-form"
import { EditAddressForm } from "./edit-address-form"

type AddressesListProps = {
  addresses: AddressEntity[]
}

export function AddressesList({ addresses }: AddressesListProps) {
  const { data } = useGetAddresses(addresses)

  return (
    <div className="px-4 py-8 md:px-6">
      <h1 className="text-2xl font-bold">Addresses</h1>
      <div className="mt-6 grid gap-6">
        {data.map((address) => (
          <EditAddressForm key={address.id} address={address} />
        ))}

        <CreateAddressForm />
      </div>
    </div>
  )
}
