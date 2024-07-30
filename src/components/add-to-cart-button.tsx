"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAddToCart } from "@/queries/cart"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ProductEntity } from "@/types/api"
import { isUserAuthenticatedClient } from "@/lib/client-session"
import { showErrorToast, showSuccessToast } from "@/lib/toast"
import { cn } from "@/lib/utils"

type AddToCartButtonProps = {
  product: ProductEntity
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const router = useRouter()

  const isAuthenticated = isUserAuthenticatedClient()

  const [quantity, setQuantity] = useState(1)

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()

  function handleAddToCart() {
    if (!isAuthenticated) {
      showErrorToast(null, "You need to be logged in to add to cart")
      return router.push("/login")
    }

    addToCart(
      {
        quantity,
        productId: product.id,
      },
      {
        onSuccess: () => {
          showSuccessToast(`${product.name} added to cart`)
        },
        onError: (error) => {
          showErrorToast(error, `Failed to add ${product.name} to cart`)
        },
      }
    )
  }

  return (
    <div
      className={cn(
        "flex flex-row gap-2",
        isAddingToCart && "pointer-events-none opacity-50"
      )}
    >
      <Select
        value={quantity.toString()}
        onValueChange={(value) => setQuantity(+value)}
      >
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {new Array(20).fill(0).map((_, i) => (
            <SelectItem key={i} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAddToCart} className="flex-1">
        {isAddingToCart && <Loader2 className="mr-2 size-4 animate-spin" />}
        Add to Cart
      </Button>
    </div>
  )
}