import { ProductFilters } from "@/components/product-filters"

import { serverApi } from "@/lib/api.server"

type ListingLayoutProps = {
  children: React.ReactNode
}

export default async function ListingLayout({ children }: ListingLayoutProps) {
  const { data: categories } = await serverApi.v1.categoriesControllerFindAll()

  return (
    <div className="grid gap-10 md:grid-cols-[240px_1fr]">
      <ProductFilters categories={categories} />
      <div>{children}</div>
    </div>
  )
}
