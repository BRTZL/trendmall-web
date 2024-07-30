"use client"

import { useGetCart } from "@/queries/cart"

import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/cart-item"

import { CartItemEntity } from "@/types/api"

import { CheckoutButton } from "./checkout-form"

type CartFormProps = {
  items: CartItemEntity[]
}

export function CartForm({ items }: CartFormProps) {
  const { data } = useGetCart(items)

  const total = data.reduce(
    (acc, item) => acc + (item.product.price * item.quantity) / 100,
    0
  )

  return (
    <div>
      <div className="grid gap-8">
        {data.map((item) => (
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
