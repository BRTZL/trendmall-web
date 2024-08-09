"use client"

import Image from "next/image"
import { useAddToCart, useRemoveFromCart } from "@/queries/cart"
import { Minus, Plus, Trash2 } from "lucide-react"

import { CartItemEntity } from "@/types/api"
import { showErrorToast, showSuccessToast } from "@/lib/toast"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

type CartItemProps = {
  item: CartItemEntity
}

export function CartItem({ item }: CartItemProps) {
  const thumbnailImage =
    item.product.images[0]?.url || "/product-placeholder.png"

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()
  const { mutate: removeFromCart, isPending: isRemovingFromCart } =
    useRemoveFromCart()

  const isLoading = isAddingToCart || isRemovingFromCart

  const handleIncrement = () => {
    addToCart(
      {
        productId: item.product.id,
        quantity: 1,
      },
      {
        onError: (error) => {
          showErrorToast(error, "Failed to add to cart")
        },
      }
    )
  }
  const handleDecrement = () => {
    removeFromCart(
      {
        productId: item.product.id,
        quantity: 1,
      },
      {
        onError: (error) => {
          showErrorToast(error, "Failed to remove from cart")
        },
      }
    )
  }
  const handleRemove = () => {
    removeFromCart(
      {
        productId: item.product.id,
        quantity: item.quantity,
      },
      {
        onSuccess: () => {
          showSuccessToast(`${item.product.name} removed from cart`)
        },
        onError: (error) => {
          showErrorToast(error, "Failed to remove from cart")
        },
      }
    )
  }

  return (
    <div
      key={item.id}
      className={cn(
        "grid grid-cols-[100px_1fr_auto] items-center gap-4",
        isLoading && "pointer-events-none opacity-50"
      )}
    >
      <Image
        src={thumbnailImage}
        alt={item.product.name}
        width={100}
        height={100}
        className="size-[100px] rounded-lg object-contain"
      />
      <div className="grid gap-1">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-muted-foreground">
          ${((item.product.price * item.quantity) / 100).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={item.quantity === 1}
        >
          <Minus className="size-4" />
        </Button>
        <span className="font-medium">{item.quantity}</span>
        <Button variant="outline" size="icon" onClick={handleIncrement}>
          {}
          <Plus className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleRemove}>
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  )
}
