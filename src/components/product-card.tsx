import Image from "next/image"
import Link from "next/link"

import { ProductEntity } from "@/types/api"

import { Button } from "./ui/button"

type ProductCardProps = {
  product: ProductEntity
}

export function ProductCard({ product }: ProductCardProps) {
  const thumbnail = product.images[0]?.url || "/product-placeholder.png"

  return (
    <Link
      href={`/product/${product.id}`}
      className="flex flex-col overflow-hidden rounded-lg bg-background shadow-lg transition-shadow duration-200 ease-in-out hover:z-10 hover:-translate-y-1 hover:rotate-2 hover:scale-105 hover:cursor-pointer hover:shadow-xl"
    >
      <Image
        id={product.id}
        key={product.id}
        src={thumbnail}
        alt="Product 1"
        width={300}
        height={300}
        className="size-[300px] w-full bg-muted object-contain"
      />
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
        <p className="mb-4 text-base font-medium">${product.price / 100}</p>
        <Button size="sm" className="w-full">
          Add to Cart
        </Button>
      </div>
    </Link>
  )
}
