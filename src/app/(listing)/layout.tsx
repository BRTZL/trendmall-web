import {
  ProductFilters,
  ProductFiltersProps,
} from "@/components/product-filters"

import { api } from "@/lib/api"

type ListingLayoutProps = {
  children: React.ReactNode
}

export default async function ListingLayout({ children }: ListingLayoutProps) {
  const { data: categories } = await api.v1.categoriesControllerFindAll()

  return (
    <div className="container mx-auto py-12">
      <div className="grid gap-10 md:grid-cols-[240px_1fr]">
        <ProductFilters categories={categories} />
        <div>{children}</div>
      </div>
    </div>
  )
}
