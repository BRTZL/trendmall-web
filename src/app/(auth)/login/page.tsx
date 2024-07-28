"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login } from "@/actions/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { setCookie } from "cookies-next"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { toast } from "@/components/ui/use-toast"

import { serverApi } from "@/lib/api"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginSchemaType = z.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()
  const form = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) })

  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(data: LoginSchemaType) {
    setIsLoading(true)

    try {
      await login(data.email, data.password)

      router.replace("/account")
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast({
          title: "Something went wrong.",
          description: error.response?.data.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex size-full items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="me@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="**********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
