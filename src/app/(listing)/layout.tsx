import { cache } from "react"

import { ProductFilters } from "@/components/product-filters"

import { serverApi } from "@/lib/api.server"

type ListingLayoutProps = {
  children: React.ReactNode
}

const getCategories = cache(async () => {
  const res = await serverApi.v1.categoriesControllerFindAll()
  return res.data
})

export default async function ListingLayout({ children }: ListingLayoutProps) {
  const categories = await getCategories()

  return (
    <div className="grid gap-10 md:grid-cols-[240px_1fr]">
      <ProductFilters categories={categories} />
      <div>{children}</div>
    </div>
  )
}
