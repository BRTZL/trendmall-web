import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon, Info } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductChart } from "@/components/product-chart"
import { ProductReview } from "@/components/product-review"

import { serverApi } from "@/lib/api.server"

type ProductDetailProps = {
  params: {
    productId: string
  }
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { data: product } = await serverApi.v1.productsControllerFindOne(
    params.productId
  )

  const isMultipleImages = product.images.length > 1
  const isNoImages = product.images.length === 0

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 py-8 md:grid-cols-2 md:py-12">
        <div className="grid gap-4">
          <Carousel
            opts={{ align: "center", loop: true }}
            className="overflow-hidden rounded-lg border"
          >
            <CarouselContent>
              {product.images.map((image) => (
                <CarouselItem key={image.id}>
                  <Image
                    src={image.url}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="aspect-square object-contain"
                  />
                </CarouselItem>
              ))}
              {isNoImages && (
                <CarouselItem>
                  <Image
                    src="/product-placeholder.png"
                    alt="Product Image"
                    width={800}
                    height={800}
                    className="aspect-square object-contain"
                  />
                </CarouselItem>
              )}
            </CarouselContent>
            {isMultipleImages && (
              <CarouselPrevious className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground hover:bg-background/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <ChevronLeftIcon className="size-5" />
              </CarouselPrevious>
            )}
            {isMultipleImages && (
              <CarouselNext className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground hover:bg-background/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <ChevronRightIcon className="size-5" />
              </CarouselNext>
            )}
          </Carousel>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-1 flex-col gap-3">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <ProductChart />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <p className="text-4xl font-bold">${product.price / 100}</p>
              <Badge variant={product.stock < 10 ? "destructive" : "secondary"}>
                {product.stock} in stock
              </Badge>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="mt-12 md:px-0">
        <div className="grid gap-8">
          <div>
            <h2 className="text-2xl font-bold">Product Reviews</h2>
            <div className="mt-6 grid gap-12">
              {Array.from({ length: 10 }).map((_, i) => (
                <ProductReview key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Alert className="mt-12">
        <Info className="size-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Reviews are not implemented yet. This is just a UI showcase.
        </AlertDescription>
      </Alert>
    </div>
  )
}
