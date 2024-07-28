import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { serverApi } from "@/lib/api"

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
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2 md:py-12">
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
                  alt="Product Image"
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
      <div className="grid gap-4">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
        <div className="text-4xl font-bold">${product.price / 100}</div>

        <div className="flex-1" />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-base">
              Quantity
            </Label>
            <Select defaultValue="1">
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
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button size="lg" className="flex-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
