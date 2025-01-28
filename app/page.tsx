"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Home, LocalShipping, CheckCircleOutline, ShoppingBag, Inventory} from '@mui/icons-material';

const HomePage = () => {
  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">Dashboard</h1>

    
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm">
            <span className="text-gray-600">Orders</span>
            <span className="mx-2">·</span>
            <span className="font-medium">Order Details</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-xl font-semibold">Order #VICS765</h1>
                <Button variant="outline" className="w-full sm:w-auto bg-[#FF7A45] text-white hover:bg-[#FF7A45]/90">
                  Invoice
                </Button>
              </div>

              <div className="overflow-x-auto -mx-4 md:mx-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">PRODUCT</TableHead>
                      <TableHead className="min-w-[100px]">PRICE</TableHead>
                      <TableHead className="min-w-[100px]">QUANTITY</TableHead>
                      <TableHead className="min-w-[120px] text-right">TOTAL AMOUNT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...Array(6)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Image
                              src="/image.png"
                              alt="Fancy Bikini"
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                            <span className="whitespace-nowrap">Fancy Bikini</span>
                          </div>
                        </TableCell>
                        <TableCell>$100</TableCell>
                        <TableCell>{i === 2 ? "15" : i === 5 ? "20" : "02"}</TableCell>
                        <TableCell className="text-right">${i === 2 ? "1500" : i === 5 ? "2000" : "200"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8">
                <h2 className="font-semibold mb-4">Shipping Information</h2>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-gray-500">NAME:</span>
                    <span className="sm:col-span-2">Vera</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-gray-500">ADDRESS:</span>
                    <span className="sm:col-span-2">15th dema street, Dubai</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-gray-500">PHONE NUMBER:</span>
                    <span className="sm:col-span-2">+971 456 444 566</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-gray-500">EMAIL ADDRESS:</span>
                    <span className="sm:col-span-2">vera@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <span className="text-gray-500">SUBTOTAL :</span>
                    <span>$4,300.00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <span className="text-gray-500">DISCOUNT :</span>
                    <span>$100.00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <span className="text-gray-500">SHIPPING CHARGE :</span>
                    <span>$45.00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <span className="text-gray-500">ESTIMATED TAX :</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 font-semibold">
                    <span className="text-gray-500">TOTAL (USD) :</span>
                    <span>$4,235.00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Input placeholder="Enter Discount" className="flex-1" />
                    <Button className="w-full sm:w-auto bg-[#FF7A45] text-white hover:bg-[#FF7A45]/90">Apply</Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Order Tracking</h2>
                <div className="text-sm text-gray-500 mb-6">TRACKING ID: 1DFDSNCBCO</div>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#FF7A45] flex items-center justify-center text-white">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div className="absolute top-10 bottom-0 left-1/2 w-0.5 h-16 bg-gray-200" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold">Order Placed</h3>
                      <p className="text-sm text-gray-500 break-words">An order as been placed</p>
                      <p className="text-sm text-gray-500">05 Dec 2024 15:46</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#FF7A45] flex items-center justify-center text-white">
                        <Inventory className="w-5 h-5" />
                      </div>
                      <div className="absolute top-10 bottom-0 left-1/2 w-0.5 h-16 bg-gray-200" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold">Packed</h3>
                      <p className="text-sm text-gray-500 break-words">Picked up by courier partner</p>
                      <p className="text-sm text-gray-500">06 Dec 2024 10:45</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#FF7A45] flex items-center justify-center text-white">
                        <LocalShipping className="w-5 h-5" />
                      </div>
                      <div className="absolute top-10 bottom-0 left-1/2 w-0.5 h-16 bg-gray-200" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold">Shipped</h3>
                      <p className="text-sm text-gray-500 break-words">ASAP Logistics</p>
                      <p className="text-sm text-gray-500">06 Dec 2024 14:45</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <Home className="w-5 h-5" />
                      </div>
                      <div className="absolute top-10 bottom-0 left-1/2 w-0.5 h-16 bg-gray-200" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-500">Out for Delivery</h3>
                      <p className="text-sm text-gray-500 break-words">An order as been placed</p>
                      <p className="text-sm text-gray-500">05 Dec 2024 15:46</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <CheckCircleOutline className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-500">Delivered</h3>
                      <p className="text-sm text-gray-500 break-words">An order as been placed</p>
                      <p className="text-sm text-gray-500">05 Dec 2024 15:46</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default HomePage
