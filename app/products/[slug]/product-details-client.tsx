"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  EditOutlined,
  Inventory2Outlined,
  LocalOfferOutlined,
  DeleteOutlined,
  SaveOutlined,
  CancelOutlined,
  AddPhotoAlternate,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { API_BASE_URL } from "@/lib/constants"

interface ProductImage {
  product_image: string
}

interface Product {
  product_id: string
  items: ProductImage[]
  product_name: string
  product_description: string
  product_tags: string
  product_sale_price: string
  product_regular_price: string
  product_visibility: boolean
  product_status: boolean
  product_variant: string
  created_at: string
  updated_at: string
  product_shop: string
  category: string
}

interface ApiResponse {
  Message: string
  Success: boolean
  Status: number
  Data: Product
}

const fixImageUrl = (url: string): string => {
  if (!url) return "/placeholder.svg"

  if (url.startsWith("image/upload/") && url.includes("https://")) {
    
    const fixedUrl = url.substring(url.indexOf("https://"))
    console.log(`Fixed malformed URL: ${url} -> ${fixedUrl}`)
    return fixedUrl
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  console.log(`Invalid URL detected, using placeholder: ${url}`)
  return "/placeholder.svg"
}

export default function ProductDetailsClient({ slug }: { slug: string }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null)
  const [productResponse, setProductResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({})
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isUploadingImages, setIsUploadingImages] = useState(false)
  const [newImageFiles, setNewImageFiles] = useState<File[]>([])
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const product = productResponse?.Data || null

  const checkScrollability = () => {
    if (thumbnailsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = thumbnailsContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
    }
  }

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailsContainerRef.current) {
      const scrollAmount = 100
      const newScrollLeft =
        direction === "left"
          ? thumbnailsContainerRef.current.scrollLeft - scrollAmount
          : thumbnailsContainerRef.current.scrollLeft + scrollAmount

      thumbnailsContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Starting to fetch product with slug:", slug)

      if (!slug) {
        console.error("Invalid product ID: slug is undefined or empty")
        setError("Invalid product ID")
        setLoading(false)
        return
      }

      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("No authentication token found in localStorage")
          throw new Error("No authentication token found")
        }

        

        const response = await fetch(`${API_BASE_URL}/shop/vendor-product/${slug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        console.log("API response status:", response.status)

        if (!response.ok) {
          console.error(`API error: ${response.status} ${response.statusText}`)
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Product data received:", JSON.stringify(data, null, 2))

        if (!data) {
          console.error("API returned empty data")
          throw new Error("No product data received")
        }

        setProductResponse(data)
        if (data.Data) {
          setEditedProduct(data.Data)
          console.log("Product state updated successfully")
        } else {
          console.error("API response doesn't contain Data property")
          throw new Error("Invalid API response format")
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
        console.log("Product fetch completed, loading state set to false")
      }
    }

    fetchProduct()
  }, [slug])

  useEffect(() => {
    if ((product?.items ?? []).length > 0) {
      checkScrollability()
      window.addEventListener("resize", checkScrollability)

      return () => {
        window.removeEventListener("resize", checkScrollability)
      }
    }
  }, [product])

  useEffect(() => {
    const container = thumbnailsContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollability)

      return () => {
        container.removeEventListener("scroll", checkScrollability)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    console.log(`Input changed: ${name} = ${value}`)
    setEditedProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    console.log(`Checkbox changed: ${name} = ${checked}`)
    setEditedProduct((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      console.log("No files selected")
      return
    }

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))
    console.log(`Selected ${imageFiles.length} valid image files`)

    if (imageFiles.length === 0) {
      toast.error("Please select valid image files")
      return
    }

    setNewImageFiles(imageFiles)

    toast.success("Images will be uploaded when you save the product")
  }

  const handleSaveEdit = async () => {
    console.log("Saving product edits...")
    setIsSaving(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No authentication token found")
        throw new Error("No authentication token found")
      }

      const productData = {
        product_name: editedProduct.product_name,
        product_description: editedProduct.product_description,
        product_tags: editedProduct.product_tags,
        product_sale_price: editedProduct.product_sale_price,
        product_regular_price: editedProduct.product_regular_price,
        product_visibility: editedProduct.product_visibility,
        product_status: editedProduct.product_status,
        product_variant: editedProduct.product_variant,
        product_shop: editedProduct.product_shop,
        category: editedProduct.category,
      }

      console.log("Edited product data:", JSON.stringify(productData, null, 2))

      const response = await fetch(`${API_BASE_URL}/shop/vendor-product/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })

      console.log("Save response status:", response.status)

      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`)
        throw new Error("Failed to update product")
      }

      const updatedData = await response.json()
      console.log("Updated product data:", JSON.stringify(updatedData, null, 2))

     
      if (newImageFiles.length > 0) {
        toast.error("Image uploads are not supported when editing products. Only product details were updated.")
        setNewImageFiles([])
      }

      setProductResponse(updatedData)
      setIsEditing(false)
      toast.success("Product updated successfully!")
    } catch (err) {
      console.error("Error saving product:", err)
      toast.error(err instanceof Error ? err.message : "Failed to update product")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    console.log("Deleting product...")
    try {
      setIsDeleting(true)
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No authentication token found")
        throw new Error("No authentication token found")
      }

      const response = await fetch(`${API_BASE_URL}/shop/vendor-product/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Delete response status:", response.status)

      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`)
        throw new Error("Failed to delete product")
      }

      toast.success("Product deleted successfully!")
      router.push("/products")
    } catch (err) {
      console.error("Error deleting product:", err)
      toast.error(err instanceof Error ? err.message : "Failed to delete product")
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-t-orange-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    )
  }

  if (error || !product) {
    console.error("Rendering error state:", error)
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{error || "Product not found!"}</h1>
        <button className="mt-4 rounded-lg bg-orange-500 px-4 py-2 text-white" onClick={() => router.push("/products")}>
          Back to Products
        </button>
      </div>
    )
  }

  console.log("Rendering product details:", JSON.stringify(product, null, 2))
  console.log("Active image index:", activeImageIndex)
  console.log("Product items:", product.items ? JSON.stringify(product.items, null, 2) : "No items")

  const mainImageUrl =
    product.items && product.items.length > 0 && activeImageIndex < product.items.length
      ? fixImageUrl(product.items[activeImageIndex].product_image)
      : "/placeholder.svg?height=400&width=400"

  console.log("Main image URL:", mainImageUrl)

  return (
    <>
      <h1 className="mb-4 text-2xl md:text-3xl font-bold text-gray-800">Product Details</h1>

      <div className="mb-4">
        <Link href="/products" className="text-orange-500 hover:underline">
          ← Back to Products
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Product Image Section */}
        <div className="w-full lg:w-2/5">
          <div className="mb-4 rounded-xl bg-white p-4 md:p-8 shadow-sm">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={mainImageUrl || "/placeholder.svg"}
                alt={product.product_name}
                fill
                className="object-contain"
                onError={(e) => {
                  console.error(`Image load error for: ${mainImageUrl}`)
                 
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=400"
                }}
              />
              {isEditing && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-full bg-orange-500 p-2 text-white hover:bg-orange-600"
                    title="Add images"
                  >
                    <AddPhotoAlternate />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>

            {/* Image Gallery with Horizontal Scroll */}
            <div className="relative mt-4">
              {/* Left scroll button */}
              {canScrollLeft && (
                <button
                  onClick={() => scrollThumbnails("left")}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md"
                >
                  <ChevronLeft />
                </button>
              )}

              {/* Gradient mask for left edge */}
              {canScrollLeft && (
                <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-[1]"></div>
              )}

              {/* Thumbnails container */}
              <div
                ref={thumbnailsContainerRef}
                className="flex overflow-x-auto pb-2 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onScroll={checkScrollability}
              >
                {product.items && product.items.length > 0 ? (
                  product.items.map((image, index) => {
                    const thumbnailUrl = fixImageUrl(image.product_image)
                    console.log(`Thumbnail ${index} URL:`, thumbnailUrl)

                    return (
                      <div
                        key={index}
                        className={`relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 mx-1 ${
                          index === activeImageIndex ? "border-orange-500" : "border-transparent"
                        }`}
                        onClick={() => {
                          console.log(`Setting active image index to ${index}`)
                          setActiveImageIndex(index)
                        }}
                      >
                        <Image
                          src={thumbnailUrl || "/placeholder.svg"}
                          alt={`${product.product_name} - image ${index + 1}`}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            console.error(`Thumbnail load error for: ${thumbnailUrl}`)
                           
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                          }}
                        />
                      </div>
                    )
                  })
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
                    No images
                  </div>
                )}

                {isEditing && (
                  <div
                    className="flex h-20 w-20 flex-shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 mx-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <AddPhotoAlternate />
                  </div>
                )}

                {isUploadingImages && (
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 mx-1">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-orange-500" />
                  </div>
                )}
              </div>

              {/* Gradient mask for right edge */}
              {canScrollRight && (
                <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-[1]"></div>
              )}

              {/* Right scroll button */}
              {canScrollRight && (
                <button
                  onClick={() => scrollThumbnails("right")}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md"
                >
                  <ChevronRight />
                </button>
              )}
            </div>

            {/* New images preview */}
            {newImageFiles.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="mb-2 text-sm font-medium">New images to upload ({newImageFiles.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {newImageFiles.map((file, index) => (
                    <div key={index} className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`New image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-md p-1 text-xs"
                        onClick={() => {
                          setNewImageFiles((prev) => prev.filter((_, i) => i !== index))
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Note: Image uploads are not supported when editing products
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-white p-4 md:p-8 text-sm shadow-sm">
            <h3 className="mb-2 text-base font-medium text-gray-800">Product Full Description</h3>
            {isEditing ? (
              <textarea
                name="product_description"
                value={editedProduct.product_description || ""}
                onChange={handleInputChange}
                className="w-full rounded-lg border p-2"
                rows={6}
              />
            ) : (
              <p className="whitespace-pre-line">{product.product_description || "No description available"}</p>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-3/5">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="product_name"
                  value={editedProduct.product_name || ""}
                  onChange={handleInputChange}
                  className="mb-2 w-full rounded-lg border p-2 text-xl md:text-2xl"
                />
              ) : (
                <h2 className="text-xl md:text-2xl font-semibold">{product.product_name}</h2>
              )}
              <p className="text-sm text-gray-500">Product ID: {product.product_id}</p>
            </div>

            <div className="flex gap-2 self-start">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 rounded-xl bg-orange-500 px-4 py-2 text-white"
                    onClick={handleSaveEdit}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-white mr-1" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <SaveOutlined fontSize="small" />
                        <span>Save</span>
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 rounded-xl bg-gray-500 px-4 py-2 text-white"
                    onClick={() => {
                      setIsEditing(false)
                      setEditedProduct(product)
                      setNewImageFiles([])
                    }}
                    disabled={isSaving}
                  >
                    <CancelOutlined fontSize="small" />
                    <span>Cancel</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 rounded-xl bg-orange-500 px-4 py-2 text-white"
                    onClick={() => setIsEditing(true)}
                  >
                    <EditOutlined fontSize="small" />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 rounded-xl bg-red-500 px-4 py-2 text-white"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <DeleteOutlined fontSize="small" />
                    <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                  </motion.button>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
            <h3 className="mb-1 text-base font-medium text-gray-800">Product Short Description</h3>
            {isEditing ? (
              <textarea
                name="product_tags"
                value={editedProduct.product_tags || ""}
                onChange={handleInputChange}
                className="mb-4 w-full rounded-lg border p-2 text-sm"
                rows={3}
              />
            ) : (
              <p className="mb-4 text-sm">{product.product_tags || "No tags available"}</p>
            )}

            <div className="mb-8 flex flex-wrap gap-4">
              <motion.div
                className="flex w-full sm:w-48 items-center gap-2 rounded-xl bg-white p-4 shadow-sm border"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <LocalOfferOutlined fontSize="large" className="text-orange-500" />
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="product_sale_price"
                      value={editedProduct.product_sale_price || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border p-1 text-xl"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-gray-800">
                      ${Number.parseFloat(product.product_sale_price || "0").toFixed(2)}
                    </p>
                  )}
                  <p className="text-gray-500">Price</p>
                </div>
              </motion.div>
              <motion.div
                className="flex w-full sm:w-48 items-center gap-2 rounded-xl bg-white p-4 shadow-sm border"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Inventory2Outlined fontSize="large" className="text-orange-500" />
                <div>
                  {isEditing ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="product_status"
                        name="product_status"
                        checked={editedProduct.product_status || false}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="product_status">In Stock</label>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-800">
                      {product.product_status ? "In Stock" : "Out of Stock"}
                    </p>
                  )}
                  <p className="text-gray-500">Availability</p>
                </div>
              </motion.div>
            </div>

            {/* Size & Color Options */}
            <div className="mb-8 flex flex-wrap items-start gap-8">
              <div>
                <p className="font-medium text-gray-800">SIZE</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <motion.button
                      key={size}
                      className={`rounded-xl border px-4 py-2 ${
                        selectedSize === size ? "border-orange-500 bg-orange-50 text-orange-500" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800">COLOR</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { name: "red", color: "bg-red-500" },
                    { name: "green", color: "bg-green-500" },
                    { name: "blue", color: "bg-blue-500" },
                    { name: "orange", color: "bg-orange-500" },
                  ].map((color) => (
                    <motion.button
                      key={color.name}
                      className={`h-10 w-10 rounded-full ${color.color} ${
                        selectedColor === color.name ? "ring-2 ring-offset-2 ring-gray-400" : ""
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <p className="mb-4 font-medium text-gray-800">Additional information</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 font-medium">VISIBILITY</td>
                    <td>
                      {isEditing ? (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="product_visibility"
                            name="product_visibility"
                            checked={editedProduct.product_visibility || false}
                            onChange={handleCheckboxChange}
                            className="mr-2 h-4 w-4"
                          />
                          <label htmlFor="product_visibility">Visible</label>
                        </div>
                      ) : product.product_visibility ? (
                        "Visible"
                      ) : (
                        "Hidden"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">VARIANT</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="product_variant"
                          value={editedProduct.product_variant || ""}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border p-1"
                        />
                      ) : (
                        product.product_variant || "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">CREATED</td>
                    <td>{product.created_at ? new Date(product.created_at).toLocaleString() : "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">UPDATED</td>
                    <td>{product.updated_at ? new Date(product.updated_at).toLocaleString() : "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">REGULAR PRICE</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="product_regular_price"
                          value={editedProduct.product_regular_price || ""}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border p-1"
                        />
                      ) : (
                        `$${Number.parseFloat(product.product_regular_price || "0").toFixed(2)}`
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

