"use client"

import { useRouter } from "next/navigation"
import { useCreateAddress } from "@/queries/address"
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

import { showErrorToast, showSuccessToast } from "@/lib/toast"

const createAddressSchema = z.object({
  fullName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
})

type CreateAddressSchemaType = z.infer<typeof createAddressSchema>

export function CreateAddressForm() {
  const router = useRouter()
  const { mutate: createAddress, isPending } = useCreateAddress()

  const form = useForm<CreateAddressSchemaType>({
    resolver: zodResolver(createAddressSchema),
  })

  const onSubmit = form.handleSubmit((data) => {
    createAddress(data, {
      onSuccess: () => {
        router.refresh()
        form.reset()
        showSuccessToast("Address created")
      },
      onError: (error) => {
        showErrorToast(error, "Failed to create address")
      },
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Add New Address</CardTitle>
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
          <CardFooter className="flex items-center justify-end">
            <Button disabled={isPending} type="submit">
              {isPending && <Loader2 className="size-6 animate-spin" />}
              Save Address
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
