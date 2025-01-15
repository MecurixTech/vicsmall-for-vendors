import { ChevronsUpDownIcon } from 'lucide-react'
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Leaderboard</h2>
        <select className="rounded-md border border-gray-200 px-3 py-1.5 text-sm outline-none">
          <option value="sort">Sort</option>
        </select>
      </div>
      <div className="w-full border rounded-md">
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr] items-center px-4 py-3 border-b">
          <div className="text-sm font-medium text-muted-foreground">
            PRODUCT NAME
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            PRICE
            <ChevronsUpDownIcon className="h-4 w-4" />
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            STATUS
          </div>
          <div className="flex items-center justify-end gap-2 text-sm font-medium text-muted-foreground">
            SOLD
            <ChevronsUpDownIcon className="h-4 w-4" />
          </div>
        </div>
        {products.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr,1fr,1fr,1fr] items-center px-4 py-4 border-b last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0"></div>
              <div>
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500">PRODUCT ID: {product.id}</div>
              </div>
            </div>
            <div>
              <span className="font-medium">${product.price.toFixed(2)}</span>
            </div>
            <div>
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
            <div className="text-right">
              <span className="font-medium tabular-nums">{product.sold}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

