"use client"

import Link from "next/link"
import { useGetCart } from "@/queries/cart"
import { ShoppingCart } from "lucide-react"

export function CartButton() {
  const { data } = useGetCart([])

  return (
    <Link
      href="/cart"
      prefetch={false}
      className="relative flex flex-row items-center gap-1 hover:opacity-80"
    >
      <ShoppingCart className="size-6" />

      {data.length > 0 && (
        <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-card text-xs text-card-foreground">
          {data.length}
        </span>
      )}
    </Link>
  )
}
