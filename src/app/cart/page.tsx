import Link from "next/link"

import { Button } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

import { serverApi } from "@/lib/api.server"
import { ensureUserIsAuthenticated } from "@/lib/session"

import { CartForm } from "./cart-form"

export default async function Cart() {
  await ensureUserIsAuthenticated()

  const cart = await serverApi.v1.cartControllerGetCart()

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="mb-8 text-2xl font-bold">Your Cart</h1>
      {cart.data.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon />
          <EmptyPlaceholder.Title>Your cart is empty</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You have no items in your cart. Start adding some!
          </EmptyPlaceholder.Description>

          <Link href="/">
            <Button>Browse products</Button>
          </Link>
        </EmptyPlaceholder>
      ) : (
        <CartForm items={cart.data} />
      )}
    </div>
  )
}
