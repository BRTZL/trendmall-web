"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEditAddress, useRemoveAddress } from "@/queries/address"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { AddressEntity } from "@/types/api"
import { showErrorToast, showSuccessToast } from "@/lib/toast"

const editAddressSchema = z.object({
  fullName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
})

type EditAddressSchemaType = z.infer<typeof editAddressSchema>

type EditAddressFormProps = {
  address: AddressEntity
}

export function EditAddressForm({ address }: EditAddressFormProps) {
  const router = useRouter()

  const [isUpdateMode, setIsUpdateMode] = useState(false)

  const { mutate: editAddress, isPending: isUpdating } = useEditAddress(
    address.id
  )
  const { mutate: removeAddress, isPending: isRemoving } = useRemoveAddress(
    address.id
  )

  const form = useForm<EditAddressSchemaType>({
    resolver: zodResolver(editAddressSchema),
    defaultValues: {
      fullName: address.fullName,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    editAddress(data, {
      onSuccess: () => {
        router.refresh()
        setIsUpdateMode(false)
        showSuccessToast("Address editd")
      },
      onError: (error) => {
        showErrorToast(error, "Failed to edit address")
      },
    })
  })

  const onRemove = () => {
    removeAddress(undefined, {
      onSuccess: () => {
        router.refresh()
        showSuccessToast("Address removed")
      },
      onError: (error) => {
        showErrorToast(error, "Failed to remove address")
      },
    })
  }

  if (!isUpdateMode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{address.fullName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {address.address}
            <br />
            {address.city}, {address.state} {address.zipCode}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsUpdateMode(true)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRemove}
            disabled={isRemoving}
          >
            {isRemoving && <Loader2 className="mr-2 size-4 animate-spin" />}
            Remove
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Update Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="San Francisco" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="California" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="94107" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-3">
            <Button
              disabled={isUpdating}
              type="button"
              variant="secondary"
              onClick={() => setIsUpdateMode(false)}
            >
              Cancel
            </Button>

            <Button disabled={isUpdating} type="submit">
              {isUpdating && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save Address
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
