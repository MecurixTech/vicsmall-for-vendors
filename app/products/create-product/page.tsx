"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, ChevronDown } from "lucide-react"

export default function CreateProductPage() {
  const [productImages, setProductImages] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>(["#FF0000", "#00FF00", "#0000FF"])
  const [shippingClasses, setShippingClasses] = useState({
    footwear: false,
    appliances: false,
    accessories: false,
  })
  const [productType, setProductType] = useState({
    abroad: false,
    local: false,
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setProductImages([...productImages, ...newImages])
    }
  }

  const toggleShippingClass = (key: keyof typeof shippingClasses) => {
    setShippingClasses((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleProductType = (key: keyof typeof productType) => {
    setProductType((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="bg-[#F9F7F7] min-h-screen pb-16 px-4 md:px-6">

      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 py-4 hidden text-3xl font-bold text-gray-800 md:block">Create Product</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full lg:w-1/2">

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>

              <div className="mb-6">
                <label className="block mb-1 text-base">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <Input
                  className="w-full h-[38px] border border-[#D9D9D9] rounded-md bg-white"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block mb-1 text-base">
                  Full Product Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  className="w-full h-[136px] border border-[#D9D9D9] rounded-[10px] bg-white"
                  placeholder="Enter full product description"
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>

              <div>
                <label className="block mb-1 text-base">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full h-[43px] border border-[#D9D9D9] rounded-md bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6">
                <label className="block mb-1 text-base">Product Tags</label>
                <Input
                  className="w-full h-[49px] border border-[#D9D9D9] rounded-[10px] bg-white"
                  placeholder="Enter product tags separated by commas"
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block mb-1 text-base">Variant</label>
              <div className="flex items-center w-full h-[66px] border border-[#D9D9D9] rounded-md bg-white px-4 relative">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Size</span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Color</span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <button className="absolute right-4 px-4 h-[38px] rounded-[10px] border border-[#D9D9D9] text-sm bg-white">
                  Add variant
                </button>
              </div>
            </div>
            <div className="mb-8">
              <label className="block mb-1 text-base">
                Weight <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-4">
                <Input
                  className="w-full sm:w-[104px] h-[48px] border border-[#D9D9D9] rounded-md bg-white"
                  placeholder="Weight"
                />
                <Input
                  className="w-full sm:w-[104px] h-[48px] border border-[#D9D9D9] rounded-md bg-white"
                  placeholder="Length"
                />
                <Input
                  className="w-full sm:w-[104px] h-[48px] border border-[#D9D9D9] rounded-md bg-white"
                  placeholder="Width"
                />
                <Input
                  className="w-full sm:w-[104px] h-[48px] border border-[#D9D9D9] rounded-md bg-white"
                  placeholder="Height"
                />
              </div>
            </div>

            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div>
                <label className="block mb-1 text-base">
                  Shipping Class <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full md:w-[220px] h-[62px] border border-[#D9D9D9] rounded-[10px] bg-white">
                    <SelectValue placeholder="Shipping Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id="footwear"
                          checked={shippingClasses.footwear}
                          onCheckedChange={() => toggleShippingClass("footwear")}
                        />
                        <label htmlFor="footwear" className="text-sm">
                          Foot wear
                        </label>
                      </div>
                      <div className="border-t border-[#D9D9D9] my-1"></div>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id="appliances"
                          checked={shippingClasses.appliances}
                          onCheckedChange={() => toggleShippingClass("appliances")}
                        />
                        <label htmlFor="appliances" className="text-sm">
                          Appliances
                        </label>
                      </div>
                      <div className="border-t border-[#D9D9D9] my-1"></div>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id="accessories"
                          checked={shippingClasses.accessories}
                          onCheckedChange={() => toggleShippingClass("accessories")}
                        />
                        <label htmlFor="accessories" className="text-sm">
                          Accessories
                        </label>
                      </div>
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-1 text-base invisible md:visible">.</label>
                <Select>
                  <SelectTrigger className="w-full md:w-[223px] h-[62px] border border-[#D9D9D9] rounded-[10px] bg-white">
                    <SelectValue placeholder="Is the product?" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id="abroad"
                          checked={productType.abroad}
                          onCheckedChange={() => toggleProductType("abroad")}
                        />
                        <label htmlFor="abroad" className="text-sm">
                          Abroad Product
                        </label>
                      </div>
                      <div className="border-t border-[#D9D9D9] my-1"></div>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id="local"
                          checked={productType.local}
                          onCheckedChange={() => toggleProductType("local")}
                        />
                        <label htmlFor="local" className="text-sm">
                          Local Product
                        </label>
                      </div>
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Product Gallery</h2>

            <div className="border border-[#D9D9D9] rounded-[20px] p-4 bg-white mb-8">
              <div className="w-full h-[272px] bg-[#F5F5F5] rounded-[20px] flex flex-col items-center justify-center mb-6">
                <Upload className="w-[50px] h-[50px] mb-4" />
                <p className="text-center text-base">Drop or Click to upload image</p>
                
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="product-images"
                  onChange={handleImageUpload}
                />
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById("product-images")?.click()}
                >
                  Upload Images
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                {productImages.length > 0 ? (
                  productImages.slice(0, 4).map((img, index) => (
                    <div key={index} className="w-[86px] h-[84px] bg-[#F5F5F5] rounded-[10px] overflow-hidden">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        width={86}
                        height={84}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <div className="w-[86px] h-[84px] bg-[#F5F5F5] rounded-[10px]"></div>
                    <div className="w-[86px] h-[84px] bg-[#F5F5F5] rounded-[10px]"></div>
                    <div className="w-[86px] h-[84px] bg-[#F5F5F5] rounded-[10px]"></div>
                    <div className="w-[86px] h-[84px] bg-[#F5F5F5] rounded-[10px]"></div>
                  </>
                )}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div>
                  <label className="block mb-1 text-base">
                    Regular Price <span className="text-red-500">*</span>
                  </label>
                  <Input
                    className="w-full md:w-[202px] h-[48px] border border-[#D9D9D9] rounded-md bg-white"
                    placeholder="0.00"
                    type="number"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-base">Sales Price</label>
                  <Input
                    className="w-full md:w-[202px] h-[48px] border border-[#D9D9D9] rounded-md bg-white"
                    placeholder="0.00"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Publish</h2>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-full md:w-[223px] h-[63px] border border-[#D9D9D9] rounded-[10px] bg-white flex items-center justify-between px-4">
                  <span>Status</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 rotate-90" />
                </div>

                <div className="w-full md:w-[248px] h-[63px] border border-[#D9D9D9] rounded-[10px] bg-white flex items-center justify-between px-4">
                  <span>Visibility</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 rotate-90" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-end">
                <Button
                  variant="outline"
                  className="w-full sm:w-[168px] h-[62px] border border-[#D9D9D9] rounded-[10px] bg-white"
                >
                  Cancel
                </Button>

                <Button className="w-full sm:w-[168px] h-[62px] rounded-[10px] bg-[#FF8C48] hover:bg-[#e67e3e] text-white">
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

