import { ArrowUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"


interface Product {
  id: string
  name: string
  price: number
  status: "In Stock" | "Low Stock"
  sold: number
}

const products: Product[] = [
  { id: "55R98", name: "Fancy Bikini", price: 125.00, status: "In Stock", sold: 250 },
  { id: "55R98", name: "Fancy Bikini", price: 100.00, status: "Low Stock", sold: 610 },
  { id: "55R98", name: "Fancy Bikini", price: 125.00, status: "In Stock", sold: 250 },
  { id: "55R98", name: "Fancy Bikini", price: 125.00, status: "In Stock", sold: 250 },
  { id: "55R98", name: "Fancy Bikini", price: 125.00, status: "In Stock", sold: 250 },
  { id: "55R98", name: "Fancy Bikini", price: 125.00, status: "In Stock", sold: 250 },
]

export function Leaderboard() {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Leaderboard</h2>
        <button className="w-full sm:w-auto px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 flex items-center justify-center sm:justify-start gap-1">
          Sort
          <ArrowUpDown className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full">
        <div className="hidden sm:grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 px-4 py-2 border-b text-sm text-gray-500">
          <div className="uppercase">Product Name</div>
          <div className="uppercase flex items-center gap-1">
            Price
            <ArrowUpDown className="w-4 h-4" />
          </div>
          <div className="uppercase">Status</div>
          <div className="uppercase flex items-center gap-1 justify-end">
            Sold
            <ArrowUpDown className="w-4 h-4" />
          </div>
        </div>
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col sm:grid sm:grid-cols-[2fr,1fr,1fr,1fr] gap-4 px-4 py-4 border-b"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-md shrink-0"></div>
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">PRODUCT ID: {product.id}</div>
              </div>
            </div>
            <div className="flex sm:block items-center justify-between mt-4 sm:mt-0">
              <span className="text-sm text-gray-500 sm:hidden">Price:</span>
              <span className="font-medium">${product.price.toFixed(2)}</span>
            </div>
            <div className="flex sm:block items-center justify-between mt-2 sm:mt-0">
              <span className="text-sm text-gray-500 sm:hidden">Status:</span>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm",
                  product.status === "In Stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                )}
              >
                {product.status}
              </span>
            </div>
            <div className="flex sm:block items-center justify-between mt-2 sm:mt-0">
              <span className="text-sm text-gray-500 sm:hidden">Sold:</span>
              <span className="text-right font-medium">{product.sold}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

