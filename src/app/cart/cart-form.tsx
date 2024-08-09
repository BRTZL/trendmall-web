"use client"

import { useMemo } from "react"
import { useGetCart } from "@/queries/cart"

import { CartItem } from "@/components/cart-item"

import { CartItemEntity } from "@/types/api"

import { CheckoutButton } from "./checkout-form"

type CartFormProps = {
  items: CartItemEntity[]
}

export function CartForm({ items }: CartFormProps) {
  const { data: cartItems } = useGetCart(items)

  const total = useMemo(() => {
    return (
      cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ) / 100
    )
  }, [cartItems])

  return (
    <div>
      <div className="grid gap-8">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <p className="text-lg font-medium">Total: ${total.toFixed(2)}</p>
        <CheckoutButton />
      </div>
    </div>
  )
}
