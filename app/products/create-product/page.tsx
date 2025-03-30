"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, ArrowUp } from "lucide-react"
import { z } from "zod"
import toast from "react-hot-toast"
import { API_BASE_URL } from "@/lib/constants"

const productSchema = z.object({
  product_name: z.string().min(3, "Product name must be at least 3 characters"),
  product_description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  product_tags: z.string().optional(),
  product_sale_price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Sale price must be a valid number",
  }),
  product_regular_price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Regular price must be a positive number",
  }),
  product_visibility: z.boolean(),
  product_status: z.boolean(),
  product_variant: z.string().optional(),
  shipping_class: z.string().nullable(),
  product_type: z.string().nullable(),
})

interface Category {
  category_id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export default function CreateProductPage() {

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [productImageFiles, setProductImageFiles] = useState<File[]>([])

  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])

  const [shippingClasses, setShippingClasses] = useState({
    footwear: false,
    appliances: false,
    accessories: false,
  })
  const [selectedShippingClass, setSelectedShippingClass] = useState<string | null>(null)
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null)
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [category, setCategory] = useState("")
  const [productTags, setProductTags] = useState("")
  const [productSalePrice, setProductSalePrice] = useState("")
  const [productRegularPrice, setProductRegularPrice] = useState("")
  const [productVisibility, setProductVisibility] = useState(true)
  const [productStatus, setProductStatus] = useState(true)
  const [productVariant, setProductVariant] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/categories/customer/view-categories`,
        )

        if (response.ok) {
          const data = await response.json()
          if (data.Success && Array.isArray(data.Data)) {
            setCategories(data.Data)
          }
        } else {
          console.error("Failed to fetch categories")
          toast.error("Failed to load categories")
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast.error("Error loading categories")
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    } else {
      console.error("No token found in localStorage")
      toast.error("Authentication required")
      router.push("/sign-in")
    }
  }, [router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))

    if (newFiles.length === 0) {
      toast.error("Please select valid image files")
      return
    }

    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))

    setProductImageFiles((prev) => [...prev, ...newFiles])
    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls])

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {

    URL.revokeObjectURL(imagePreviewUrls[index])

    setProductImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const makeMainImage = (index: number) => {
    if (index === 0) return 

    const newFiles = [...productImageFiles]
    const newUrls = [...imagePreviewUrls]

    const [fileToMove] = newFiles.splice(index, 1)
    const [urlToMove] = newUrls.splice(index, 1)

    newFiles.unshift(fileToMove)
    newUrls.unshift(urlToMove)

    setProductImageFiles(newFiles)
    setImagePreviewUrls(newUrls)

    toast.success("Set as main image")
  }

  const toggleShippingClass = (key: keyof typeof shippingClasses) => {
    setShippingClasses((prev) => ({ ...prev, [key]: !prev[key] }))
    setSelectedShippingClass(key)
  }

  const verifyToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        console.log("Token is valid")
        return true
      } else {
        console.error("Token is invalid")
        return false
      }
    } catch (error) {
      console.error("Error verifying token:", error)
      return false
    }
  }

  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.newToken)
        setToken(data.newToken)
        console.log("Token refreshed successfully")
      } else {
        console.error("Failed to refresh token")
      }
    } catch (error) {
      console.error("Error refreshing token:", error)
    }
  }

  const validateForm = () => {
    try {
      productSchema.parse({
        product_name: productName,
        product_description: productDescription,
        category,
        product_tags: productTags,
        product_sale_price: productSalePrice,
        product_regular_price: productRegularPrice,
        product_visibility: productVisibility,
        product_status: productStatus,
        product_variant: productVariant,
        shipping_class: selectedShippingClass,
        product_type: selectedProductType,
      })
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)

        const firstError = error.errors[0]
        if (firstError) {
          toast.error(firstError.message)
        }
      }
      return false
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (!token) {
        throw new Error("No authentication token found")
      }

      if (productImageFiles.length === 0) {
        toast.error("Please upload at least one product image")
        return
      }

      const isTokenValid = await verifyToken()
      if (!isTokenValid) {
        console.log("Token expired, refreshing token...")
        await refreshToken()
      }

      const formData = new FormData()

      formData.append("product_name", productName)
      formData.append("product_description", productDescription)
      formData.append("category", category)
      formData.append("product_tags", productTags)
      formData.append("product_sale_price", productSalePrice)
      formData.append("product_regular_price", productRegularPrice)
      formData.append("product_visibility", productVisibility.toString())
      formData.append("product_status", productStatus.toString())
      formData.append("product_variant", productVariant)

      if (selectedShippingClass) {
        formData.append("shipping_class", selectedShippingClass)
      }

      if (selectedProductType) {
        formData.append("product_type", selectedProductType)
      }

      productImageFiles.forEach((file) => {
        formData.append("product_images", file)
      })

      const currentToken = localStorage.getItem("token")

      const response = await fetch(`${API_BASE_URL}/shop/create-product`, {
        method: "POST",
        headers: {
         
          Authorization: `Bearer ${currentToken}`,
        },
        body: formData,
      })

      if (response.ok) {
        toast.success("Product created successfully")
        router.push("/products")
      } else {
        const errorData = await response.json()
        console.error("Failed to create product", errorData)

        if (response.status === 413) {
          toast.error("Image files are too large. Please use smaller images.")
        } else if (response.status === 415) {
          toast.error("Unsupported file type. Please use JPG, PNG, or WebP images.")
        } else {
          toast.error(errorData.Message || "Failed to create product")
        }
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An error occurred while creating the product")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 py-4 hidden text-3xl font-bold text-gray-800 md:block">Create Product</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="mb-6">
                <label className="block mb-1 text-base">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <Input
                  className={`w-full h-[38px] border ${errors.product_name ? "border-red-500" : "border-[#D9D9D9]"} rounded-md bg-white`}
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                {errors.product_name && <p className="mt-1 text-sm text-red-500">{errors.product_name}</p>}
              </div>
              <div>
                <label className="block mb-1 text-base">
                  Full Product Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  className={`w-full h-[136px] border ${errors.product_description ? "border-red-500" : "border-[#D9D9D9]"} rounded-[10px] bg-white`}
                  placeholder="Enter full product description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
                {errors.product_description && (
                  <p className="mt-1 text-sm text-red-500">{errors.product_description}</p>
                )}
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div>
                <label className="block mb-1 text-base">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger
                    className={`w-full h-[43px] border ${errors.category ? "border-red-500" : "border-[#D9D9D9]"} rounded-md bg-white`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.category_id} value={cat.category_id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>
              <div className="mt-6">
                <label className="block mb-1 text-base">Product Tags</label>
                <Input
                  className="w-full h-[49px] border border-[#D9D9D9] rounded-[10px] bg-white"
                  placeholder="Enter product tags separated by commas"
                  value={productTags}
                  onChange={(e) => setProductTags(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block mb-1 text-base">Variant</label>
              <select
                className="w-full h-[38px] border border-[#D9D9D9] rounded-md bg-white px-2"
                value={productVariant}
                onChange={(e) => setProductVariant(e.target.value)}
              >
                <option value="">Select a variant</option>
                <option value="Black">Black</option>
                <option value="Red">Red</option>
                <option value="Orange">Orange</option>
                <option value="Gray">Gray</option>
              </select>
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
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block mb-1 text-base">
                  Shipping Class <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => setSelectedShippingClass(value)}>
                  <SelectTrigger className="w-full md:w-[220px] h-[62px] border border-[#D9D9D9] rounded-[10px] bg-white">
                    <SelectValue placeholder={selectedShippingClass || "Shipping Class"} />
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
                <Select onValueChange={(value) => setSelectedProductType(value)}>
                  <SelectTrigger className="w-full md:w-[223px] h-[62px] border border-[#D9D9D9] rounded-[10px] bg-white">
                    <SelectValue placeholder={selectedProductType || "Is the product?"} />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id="abroad"
                          checked={selectedProductType === "abroad"}
                          onCheckedChange={(checked) => {
                            if (checked) setSelectedProductType("abroad")
                          }}
                        />
                        <label htmlFor="abroad" className="text-sm">
                          Abroad Product
                        </label>
                      </div>
                      <div className="border-t border-[#D9D9D9] my-1"></div>
                      <div className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id="local"
                          checked={selectedProductType === "local"}
                          onCheckedChange={(checked) => {
                            if (checked) setSelectedProductType("local")
                          }}
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
              {/* Main Image Preview */}
              {imagePreviewUrls.length > 0 ? (
                <div className="w-full h-[200px] sm:h-[272px] bg-[#F5F5F5] rounded-[20px] relative overflow-hidden mb-6">
                  <Image
                    src={imagePreviewUrls[0] || "/placeholder.svg"}
                    alt="Main product image"
                    width={600}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                  {/* <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Main Image
                  </div> */}
                </div>
              ) : (
                <div
                  className="w-full h-[200px] sm:h-[272px] bg-[#F5F5F5] rounded-[20px] flex flex-col items-center justify-center mb-6 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-[50px] h-[50px] mb-4" />
                  <p className="text-center text-base">Drop or Click to upload image</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="product-images"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <Button
                    variant="outline"
                    className="mt-4"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                  >
                    Upload Images
                  </Button>
                </div>
              )}

              {/* Thumbnail Gallery */}
              <div className="flex flex-wrap gap-3 justify-center">
                {imagePreviewUrls.length > 0 ? (
                  imagePreviewUrls.map((img, index) => (
                    <div
                      key={index}
                      className={`w-[80px] h-[80px] sm:w-[86px] sm:h-[84px] bg-[#F5F5F5] rounded-[10px] overflow-hidden relative group ${
                        index === 0 ? "ring-2 ring-orange-500" : ""
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        width={86}
                        height={84}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => makeMainImage(index)}
                            className="bg-orange-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Make main image"
                          >
                            <ArrowUp size={16} />
                          </button>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="w-[80px] h-[80px] sm:w-[86px] sm:h-[84px] bg-[#F5F5F5] rounded-[10px]"></div>
                    <div className="w-[80px] h-[80px] sm:w-[86px] sm:h-[84px] bg-[#F5F5F5] rounded-[10px]"></div>
                    <div className="w-[80px] h-[80px] sm:w-[86px] sm:h-[84px] bg-[#F5F5F5] rounded-[10px]"></div>
                    <div className="w-[80px] h-[80px] sm:w-[86px] sm:h-[84px] bg-[#F5F5F5] rounded-[10px]"></div>
                  </>
                )}

                {/* Add more images button */}
                {imagePreviewUrls.length > 0 && (
                  <div
                    className="w-[80px] h-[80px] sm:w-[86px] sm:h-[84px] bg-[#F5F5F5] rounded-[10px] flex items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6" />
                  </div>
                )}
              </div>

              {imagePreviewUrls.length > 0 && (
                <div className="mt-4 text-sm text-center">
                  <p className="text-gray-500">
                    {imagePreviewUrls.length} image{imagePreviewUrls.length !== 1 ? "s" : ""} selected
                  </p>
                  <p className="text-gray-500 mt-1">The first image will be displayed as the main product image</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Add More Images
                  </Button>
                </div>
              )}
            </div>
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                <div>
                  <label className="block mb-1 text-base">
                    Regular Price <span className="text-red-500">*</span>
                  </label>
                  <Input
                    className={`w-full md:w-[202px] h-[48px] border ${errors.product_regular_price ? "border-red-500" : "border-[#D9D9D9]"} rounded-md bg-white`}
                    placeholder="0.00"
                    type="number"
                    value={productRegularPrice}
                    onChange={(e) => setProductRegularPrice(e.target.value)}
                  />
                  {errors.product_regular_price && (
                    <p className="mt-1 text-sm text-red-500">{errors.product_regular_price}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-base">Sales Price</label>
                  <Input
                    className={`w-full md:w-[202px] h-[48px] border ${errors.product_sale_price ? "border-red-500" : "border-[#D9D9D9]"} rounded-md bg-white`}
                    placeholder="0.00"
                    type="number"
                    value={productSalePrice}
                    onChange={(e) => setProductSalePrice(e.target.value)}
                  />
                  {errors.product_sale_price && (
                    <p className="mt-1 text-sm text-red-500">{errors.product_sale_price}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Publish</h2>
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-full md:w-[223px] h-[63px] border border-[#D9D9D9] rounded-[10px] bg-white flex items-center justify-between px-4">
                  <span>Status</span>
                  <Checkbox
                    id="status"
                    checked={productStatus}
                    onCheckedChange={(checked) => setProductStatus(checked === true)}
                  />
                </div>
                <div className="w-full md:w-[248px] h-[63px] border border-[#D9D9D9] rounded-[10px] bg-white flex items-center justify-between px-4">
                  <span>Visibility</span>
                  <Checkbox
                    id="visibility"
                    checked={productVisibility}
                    onCheckedChange={(checked) => setProductVisibility(checked === true)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  variant="outline"
                  className="w-full sm:w-[168px] h-[50px] sm:h-[62px] border border-[#D9D9D9] rounded-[10px] bg-white"
                  onClick={() => router.push("/products")}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  className="w-full sm:w-[168px] h-[50px] sm:h-[62px] rounded-[10px] bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  type="button"
                >
                  {isSubmitting ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

