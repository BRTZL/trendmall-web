import { cache } from "react"

import { ProductCard } from "@/components/product-card"
import { ProductPagination } from "@/components/product-pagination"

import { serverApi } from "@/lib/api.server"

type ListingPageProps = {
  searchParams: {
    page?: number
    categoryId?: string
  }
}

const getProducts = cache(async (props: ListingPageProps) => {
  const res = await serverApi.v1.productsControllerFindAll({
    limit: 12,
    page: props.searchParams.page || 1,
    inStock: true,
    categoryId: props.searchParams.categoryId,
  })

  return res.data
})

export default async function Listing(props: ListingPageProps) {
  const products = await getProducts(props)

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 flex items-center">
        <ProductPagination paginationData={products} />
      </div>
    </div>
  )
}
