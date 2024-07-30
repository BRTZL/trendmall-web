import { isAxiosError } from "axios"

import { toast } from "@/components/ui/use-toast"

export function showErrorToast(error: unknown, defaultMessage?: string) {
  let message: string

  if (isAxiosError(error)) {
    message = defaultMessage
      ? defaultMessage
      : error.response?.data.message || "An error occurred"
  } else {
    message = defaultMessage || "An error occurred"
  }

  return toast({
    title: "Error",
    description: message,
    variant: "destructive",
  })
}

export function showSuccessToast(message: string) {
  return toast({
    title: "Success",
    description: message,
  })
}
