import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { fireEvent, render, screen } from "@testing-library/react"

import { ProductCard } from "@/components/product-card"

import "@testing-library/jest-dom"

const product = {
  id: "1",
  name: "Test Product",
  description: "Test Description",
  price: 100,
  category: {
    id: "cat-1",
    name: "Test Category",
    parentId: "parent-cat-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  images: [
    {
      id: "img-1",
      url: "https://example.com/image.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  stock: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

// Mocking useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => null,
    }
  },
}))

describe("Page", () => {
  it("renders the card", () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <ProductCard product={product} />
      </QueryClientProvider>
    )

    const productName = screen.getByText(product.name)
    expect(productName).toBeInTheDocument()

    const productPrice = screen.getByText(`$${product.price / 100}`)
    expect(productPrice).toBeInTheDocument()

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()

    const image = screen.getByRole("img")
    expect(image).toBeInTheDocument()
  })
})
