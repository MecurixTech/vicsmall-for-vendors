import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  status: "In Stock" | "Low Stock";
  sold: number;
}

const products: Product[] = [
  { id: "55R98", name: "Fancy Bikini", price: 125.0, status: "In Stock", sold: 250 },
  { id: "55R99", name: "Luxury Swimsuit", price: 100.0, status: "Low Stock", sold: 610 },
  { id: "55R100", name: "Beachwear", price: 80.0, status: "In Stock", sold: 320 },
  { id: "55R101", name: "Designer Bikini", price: 150.0, status: "In Stock", sold: 190 },
];

export function Leaderboard() {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Leaderboard</h2>
        <select className="rounded-md border border-gray-200 px-3 py-1.5 text-sm outline-none">
          <option value="sort">Sort</option>
        </select>
      </div>

      {/* Table Header (Hidden on Mobile) */}
      <div className="hidden sm:grid grid-cols-[2fr,1fr,1fr,1fr] items-center px-4 py-3 border-b">
        <div className="text-sm font-medium text-muted-foreground">PRODUCT NAME</div>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          PRICE
          <ChevronsUpDownIcon className="h-4 w-4" />
        </div>
        <div className="text-sm font-medium text-muted-foreground">STATUS</div>
        <div className="flex items-center justify-end gap-2 text-sm font-medium text-muted-foreground">
          SOLD
          <ChevronsUpDownIcon className="h-4 w-4" />
        </div>
      </div>

      {/* Product List */}
      <div className="w-full border rounded-md">
        {products.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-2 sm:grid-cols-[2fr,1fr,1fr,1fr] items-center gap-2 sm:gap-0 px-4 py-4 border-b last:border-b-0"
          >
            {/* Product Name & Image */}
            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0"></div>
              <div>
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="hidden sm:block text-sm text-gray-500">PRODUCT ID: {product.id}</div>
              </div>
            </div>

            {/* Price */}
            <div className="text-xs sm:text-base font-medium">${product.price.toFixed(2)}</div>

            {/* Status */}
            <div>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs sm:text-sm",
                  product.status === "In Stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                )}
              >
                {product.status}
              </span>
            </div>

            {/* Sold Count */}
            <div className="text-right font-medium tabular-nums text-xs sm:text-base">{product.sold}</div>
          </div>
        ))}
      </div>
    </div>
  );
}