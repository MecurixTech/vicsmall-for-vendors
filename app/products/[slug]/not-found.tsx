import Link from "next/link"

export default function NotFound() {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Product not found!</h1>
      <p className="mb-6 text-gray-600">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <Link href="/products" className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
        Back to Products
      </Link>
    </div>
  )
}

