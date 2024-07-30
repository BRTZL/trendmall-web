"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAddToCart } from "@/queries/cart"
import { Loader2, ShoppingBasket } from "lucide-react"

import { ProductEntity } from "@/types/api"
import { isUserAuthenticatedClient } from "@/lib/client-session"
import { showErrorToast, showSuccessToast } from "@/lib/toast"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

type ProductCardProps = {
  product: ProductEntity
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const thumbnail = product.images[0]?.url || "/product-placeholder.png"

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()

  const handleButtonClick = () => {
    if (!isUserAuthenticatedClient()) {
      showErrorToast(null, "You need to be logged in to add to cart")
      return router.push("/login")
    }

    addToCart(
      {
        productId: product.id,
        quantity: 1,
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
    <div className="relative flex flex-col overflow-hidden rounded-lg bg-background shadow-lg transition-shadow duration-200 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
      <Link href={`/product/${product.id}`} className="flex flex-col">
        <Image
          id={product.id}
          key={product.id}
          src={thumbnail}
          alt={product.name}
          quality={65}
          width={300}
          height={300}
          className="size-[300px] w-full bg-muted object-contain"
        />
        <div className="flex flex-col p-4">
          <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
          <p className="mb-4 text-base font-medium">${product.price / 100}</p>
        </div>
      </Link>
      <Button
        size="icon"
        className={cn(
          "absolute right-4 top-4",
          isAddingToCart && "cursor-not-allowed"
        )}
        onClick={handleButtonClick}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? (
          <Loader2 className="size-6 animate-spin" />
        ) : (
          <ShoppingBasket className="size-6" />
        )}
      </Button>
    </div>
  )
}
