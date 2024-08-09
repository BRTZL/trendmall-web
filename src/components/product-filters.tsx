"use client"

import { useState } from "react"
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

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    searchParams.get("categoryId")?.split(",") || []
  )

  const handleCategoryChange = (value: string) => {
    const newCategoryIds = selectedCategoryIds.includes(value)
      ? selectedCategoryIds.filter((id) => id !== value)
      : [...selectedCategoryIds, value]

    setSelectedCategoryIds(newCategoryIds)

    if (newCategoryIds.length === 0) {
      router.push("/")
      return
    }

    const params = new URLSearchParams()
    params.set("categoryId", newCategoryIds.join(","))
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
                    checked={selectedCategoryIds.includes(category.id)}
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
