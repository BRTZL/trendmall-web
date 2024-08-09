import Image from "next/image"

import { shimmer, toBase64 } from "@/lib/shimmer"

export default function ListingLoading() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={`product-shimmer-${index}`}
            className="relative flex h-96 flex-col overflow-hidden rounded-lg bg-background shadow-lg transition-shadow duration-200 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
          >
            <Image
              key={index}
              alt="Product Shimmer"
              src={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
              width={300}
              height={300}
              className="h-96 w-full animate-pulse rounded-md bg-muted"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
