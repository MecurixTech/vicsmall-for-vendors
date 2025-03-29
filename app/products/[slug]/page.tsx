import { Suspense } from "react"
import { notFound } from "next/navigation"
import ProductDetailsClient from "./product-details-client"
import ProductLoading from "./loading"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params

  // console.log("Server component rendering with slug:", slug)

  if (!slug) {
    console.error("Invalid product ID: slug is undefined or empty")
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductLoading />}>
        <ProductDetailsClient slug={slug} />
      </Suspense>
    </div>
  )
}

