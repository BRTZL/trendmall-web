"use client"

import { useUpdateAccount } from "@/queries/user"
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

import { UserEntity } from "@/types/api"
import { showErrorToast, showSuccessToast } from "@/lib/toast"

const personalInfoSchema = z.object({
  fullName: z.string().min(1),
  phoneNumber: z.string().min(1),
})

type PersonalInfoSchemaType = z.infer<typeof personalInfoSchema>

type PersonalInfoFormProps = {
  user: UserEntity
}

export function PersonalInfoForm({ user }: PersonalInfoFormProps) {
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount()

  const form = useForm<PersonalInfoSchemaType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    updateAccount(data, {
      onSuccess: () => {
        showSuccessToast("Account updated")
      },
      onError: (error) => {
        showErrorToast(error, "Failed to update account")
      },
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-3">
            <Button disabled={isUpdating} type="submit">
              {isUpdating && <Loader2 className="mr-2 size-4 animate-spin" />}
              Update Account
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
