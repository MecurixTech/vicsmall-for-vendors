"use client"

import type React from "react"

import { Search, Edit, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"

const InvoicePage = () => {
  const [attachPdf, setAttachPdf] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ message, attachPdf })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <span>Orders</span>
        <ChevronRight className="h-4 w-4" />
        <span>Order Details</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-900">Invoice</span>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input type="search" placeholder="Search Invoice" className="pl-10 rounded-full border-gray-200" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="default" className="rounded-full">
            Manage Invoice
          </Button>
          <Button className="rounded-full bg-[#FF7A45] hover:bg-[#FF7A45]/90">Add New</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Top Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Invoice Number Card */}
            <div className="rounded-2xl bg-[#FF7A45] p-6 text-white">
              <div className="flex justify-between">
                <div>
                  <p className="mb-1 text-sm font-light">Invoice Number</p>
                  <p className="mb-4 font-medium">No: #96DS6A</p>
                  <p className="text-sm font-light">Issue Date: Dec 05 2024</p>
                  <p className="text-sm font-light">Due Date: Dec 12 2024</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-10 w-10 bg-white/20" />
                  <div className="h-10 w-10 bg-white/20" />
                  <div className="h-10 w-10 bg-white/20" />
                  <div className="h-10 w-10 bg-white/20" />
                </div>
              </div>
            </div>

            {/* Invoice To Card */}
            <div className="rounded-2xl bg-[#000051] p-6 text-white">
              <p className="mb-2 text-sm font-light">Invoice to</p>
              <p className="mb-4 text-lg font-medium">Hasedwdk</p>
              <p className="text-sm font-light">19th dema street, Dubia</p>
              <p className="text-sm font-light">Dubai UAE</p>
            </div>
          </div>

          {/* Item Details */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium">Item Details</h2>
              <Button variant="ghost" size="sm" className="text-blue-600">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-4 pl-0 text-sm font-medium text-gray-500">PRODUCT</th>
                    <th className="pb-4 text-sm font-medium text-gray-500">PRICE</th>
                    <th className="pb-4 text-sm font-medium text-gray-500">QUANTITY</th>
                    <th className="pb-4 text-sm font-medium text-gray-500">TOTAL AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { quantity: "02", total: "$200" },
                    { quantity: "02", total: "$200" },
                    { quantity: "15", total: "$1500" },
                  ].map((item, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-4 pl-0">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg overflow-hidden">
                            <Image
                              src="https://s3-alpha-sig.figma.com/img/a290/0ec7/528cc3a077b0fd9d56551b0471f993c6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J2jYZQuAs~VyxY22QDaNB2HFDkUueG3u2ALPJbV-yuNdMNgiV95QQ1vcbEaoOCw9DSCSr~lxq08pO2szYCK-w8iyRahUNzWaenWRnrasZwr6t4Ib~cl90Jf5ak5SYBT0a6Z95hXA-N4xOX3cCFopVLJDIhAkqZc7vMPSBgFG1r3Tf5pGXrwZBbNoWjCEqsW8AgqFMo0RkJDwftnjEKOGhAaGz-j3ChK9Aa8gTMgZwWpHnIsmussnRXweqDwNKbgszlCERwoNzcU4-uCOh77aZUpor62soB57UGzr7cBLzxkpr0CRdQ5UovvVxzvqkVF1NnZRPpwZ-NGY5WVty2~VLg__"
                              alt="Fancy Bikini"
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span>Fancy Bikini</span>
                        </div>
                      </td>
                      <td className="py-4">$100</td>
                      <td className="py-4">{item.quantity}</td>
                      <td className="py-4">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {/* Comment Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Comment</label>
                <Textarea
                  placeholder="Say something....."
                  className="h-[120px] resize-none rounded-xl border-gray-200"
                />
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">SUBTOTAL:</span>
                  <span className="font-medium">$4,300.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DISCOUNT:</span>
                  <span className="font-medium">$100.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ESTIMATED TAX:</span>
                  <span className="font-medium">$45.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SHIPPING CHARGE:</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="my-2 h-px bg-gray-200" />
                <div className="flex justify-between">
                  <span className="text-gray-600">TOTAL (USD):</span>
                  <span className="font-medium">$4,235.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full px-8">
              Share
            </Button>
            <Button className="rounded-full bg-[#FF7A45] px-8 hover:bg-[#FF7A45]/90">Download</Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Customer Profile */}
          <div className="relative rounded-3xl bg-white shadow-sm overflow-hidden">
            {/* Orange Header */}
            <div className="h-32 bg-[#FF7A45] rounded-b-[48px]" />

            {/* Avatar */}
            <div className="absolute left-1/2 top-24 -translate-x-1/2">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarFallback className="bg-gray-200">V</AvatarFallback>
              </Avatar>
            </div>

            {/* Content */}
            <div className="mt-16 p-6 text-center">
              <h2 className="text-xl font-medium">Vera</h2>
              <p className="text-sm text-gray-500">Customer</p>

              <div className="mt-6 space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">COUNTRY:</span>
                  <span className="text-sm">Dubia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">LOCATION:</span>
                  <span className="text-sm">19th dema street, Dubia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">PHONE NUMBER:</span>
                  <span className="text-sm">+971 456 444 556</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">EMAIL ADDRESS:</span>
                  <span className="text-sm">vera@gmail.com</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6 rounded-lg border p-4 text-left">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Payment Method</h3>
                  <Button variant="ghost" className="h-8 gap-1 text-blue-600 p-0">
                    <Edit className="h-4 w-4" />
                    <span className="text-xs">Edit</span>
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">CARD HOLDER NAME:</span>
                    <span className="text-sm">Vera</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">CARD NUMBER:</span>
                    <span className="text-sm">xxxx xxxx xxxx 1234</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Send Invoice */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Send Invoice</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Say something....."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none rounded-xl border-gray-200"
              />
              <div className="flex items-center justify-between">
                <Label htmlFor="attach-pdf" className="text-sm text-gray-600">
                  Also attach pdf in email
                </Label>
                <Switch id="attach-pdf" checked={attachPdf} onCheckedChange={setAttachPdf} />
              </div>
              <Button type="submit" className="w-full rounded-full bg-[#FF7A45] hover:bg-[#FF7A45]/90">
                Send Invoice
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePage

