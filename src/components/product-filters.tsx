"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { CategoryEntity } from "@/types/api"

export type ProductFiltersProps = {
  categories: CategoryEntity[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedCategoryId = searchParams.get("categoryId")

  const handleCategoryChange = (value: string) => {
    if (value === selectedCategoryId) {
      router.push("/")
      return
    }

    const params = new URLSearchParams()
    params.set("categoryId", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="category"
      >
        <AccordionItem value="category">
          <AccordionTrigger className="text-base">Category</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-3">
              {categories.map((category) => (
                <Label
                  key={category.id}
                  className="flex items-center gap-2 font-normal capitalize"
                >
                  <Checkbox
                    checked={category.id === selectedCategoryId}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  {category.name.split("-").join(" ")}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
