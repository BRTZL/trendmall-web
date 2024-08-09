"use client"

import { useState } from "react"
import { useGetAddresses } from "@/queries/address"
import { useCheckout } from "@/queries/order"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { showErrorToast, showSuccessToast } from "@/lib/toast"
import { useRedirect } from "@/hooks/auth"

export function CheckoutButton() {
  const { redirectTo } = useRedirect()

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  )

  const { data: addresses } = useGetAddresses()

  const { mutate: checkout, isPending: isCheckouting } = useCheckout()

  function handleCheckout() {
    if (!selectedAddressId) {
      return showErrorToast("Please select a shipping address.")
    }
    checkout(selectedAddressId, {
      onSuccess: () => {
        showSuccessToast("Order completed successfully.")
        redirectTo("/account")
      },
      onError: (error) => {
        showErrorToast(error)
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Complete Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Order</DialogTitle>
          <DialogDescription>
            Please review your details before completing your order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="address">Address</Label>
          <Select onValueChange={(value) => setSelectedAddressId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select shipping address" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {addresses.map((address) => (
                  <SelectItem key={address.id} value={address.id}>
                    {address.address} {address.city}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCheckout}
            disabled={!selectedAddressId || isCheckouting}
          >
            {isCheckouting && <Loader2 className="mr-2 size-4 animate-spin" />}
            Complete Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
