"use client"

import { useRouter } from "next/navigation"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { PaginationProductEntity } from "@/types/api"

interface ProductPaginationProps {
  paginationData: PaginationProductEntity
}

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 6
) => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const visiblePages = []

  if (currentPage <= maxVisible - 2) {
    for (let i = 1; i < maxVisible; i++) {
      visiblePages.push(i)
    }
    visiblePages.push("...")
    visiblePages.push(totalPages)
  } else if (currentPage > totalPages - (maxVisible - 3)) {
    visiblePages.push(1)
    visiblePages.push("...")
    for (let i = totalPages - (maxVisible - 3); i <= totalPages; i++) {
      visiblePages.push(i)
    }
  } else {
    visiblePages.push(1)
    visiblePages.push("...")
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      visiblePages.push(i)
    }
    visiblePages.push("...")
    visiblePages.push(totalPages)
  }

  return visiblePages
}

export function ProductPagination({ paginationData }: ProductPaginationProps) {
  const router = useRouter()
  const totalPages = Math.ceil(paginationData.total / paginationData.limit)
  const currentPage = paginationData.page

  const onClick = (page: number | string) => () => {
    const url = new URL(window.location.href)
    url.searchParams.set("page", page.toString())
    router.push(url.toString())
  }

  const renderPaginationLinks = () => {
    const visiblePages = getVisiblePages(currentPage, totalPages)
    return visiblePages.map((page, index) => {
      if (page === "...") {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      return (
        <PaginationItem key={page}>
          <PaginationLink
            onClick={onClick(page)}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onClick(Math.max(currentPage - 1, 1))}
            className={currentPage === 1 ? "pointer-events-none" : ""}
          />
        </PaginationItem>
        {renderPaginationLinks()}
        <PaginationItem>
          <PaginationNext
            onClick={onClick(Math.min(currentPage + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
