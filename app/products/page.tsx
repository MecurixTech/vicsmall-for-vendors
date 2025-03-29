"use client"

import { DeleteOutlined, FilterAltOutlined, MenuOutlined, SearchOutlined, WindowOutlined } from "@mui/icons-material"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Filters from "../components/products/filters"
import { toast } from "react-hot-toast"
import { API_BASE_URL } from "@/lib/constants"

interface Category {
  category_id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

interface Product {
  product_id: string
  product_name: string
  product_description: string
  category: string
  product_tags: string
  product_sale_price: string
  product_regular_price: string
  product_visibility: boolean
  product_status: boolean
  created_at: string
  updated_at: string
  items: ProductItem[]
}

interface ProductItem {
  product_image: string
}


const fixImageUrl = (url: string): string => {
  if (!url) return "/placeholder.png"

  if (url.startsWith("image/upload/") && url.includes("https://")) {
  
    return url.substring(url.indexOf("https://"))
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  return "/placeholder.png"
}

const Products = () => {
  const [isInListView, setIsInListView] = useState<boolean>(true)
  const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState("")

  const [filterCriteria, setFilterCriteria] = useState({
    categories: [] as string[],
    priceRange: [0, 10000] as number[],
    colors: [] as string[],
  })

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/categories/customer/view-categories`,
        )

        if (response.ok) {
          const data = await response.json()
          if (data.Success && Array.isArray(data.Data)) {
            const categoryMap: Record<string, string> = {}
            data.Data.forEach((category: Category) => {
              categoryMap[category.category_id] = category.name
            })
            setCategories(categoryMap)
          }
        } else {
          console.error("Failed to fetch categories")
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("No authentication token found")
        }

        console.log("Fetching products...")
        const response = await fetch("https://vicsmall-backend-ckn4.onrender.com/v1/api/shop/vendor-products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          console.log("Products data:", data)
          setProducts(data.Data || [])
        } else {
          console.error("Failed to fetch products")
          toast.error("Failed to fetch products")
        }
      } catch (error) {
        console.error("Error:", error)
        toast.error("Error fetching products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (products.length > 0) {

      let filtered = products.filter((product) => product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))

      if (filterCriteria.priceRange && filterCriteria.priceRange.length === 2) {
        filtered = filtered.filter((product) => {
          const price = Number.parseFloat(product.product_sale_price)
          return price >= filterCriteria.priceRange[0] && price <= filterCriteria.priceRange[1]
        })
      }

      if (filterCriteria.categories && filterCriteria.categories.length > 0) {
        filtered = filtered.filter((product) => filterCriteria.categories.includes(product.category))
      }

      if (filterCriteria.colors && filterCriteria.colors.length > 0) {
       
      }

      setDisplayedProducts(filtered)
    } else {
      setDisplayedProducts([])
    }
  }, [products, searchTerm, filterCriteria])

  const handleFilterChange = (filters: { categories: string[]; priceRange: number[]; colors: string[] }) => {
    // console.log("Filter changed:", filters)
    setFilterCriteria(filters)
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(
        `https://vicsmall-backend-ckn4.onrender.com/v1/api/shop/vendor-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.product_id !== productId))
        toast.success("Product deleted successfully")
      } else {
        toast.error("Failed to delete product")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Error deleting product")
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-t-orange-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <>
        <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">Products</h1>

        <motion.div
          className="flex flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
            className="mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-gray-100"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <WindowOutlined style={{ fontSize: 80, color: "#FF7A45" }} />
            </motion.div>
          </motion.div>

          <motion.h2
            className="mb-2 text-2xl font-bold text-gray-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No Products Found
          </motion.h2>

          <motion.p
            className="mb-6 max-w-md text-gray-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You haven`&apos;`t added any products to your store yet. Start adding products to showcase them to your customers.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/products/create-product"
              className="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
            >
              Add Your First Product
            </Link>
          </motion.div>
        </motion.div>
      </>
    )
  }

  console.log("Rendering products:", displayedProducts)

  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">Products</h1>

      <div className="flex flex-col items-start gap-4 md:flex-row">
        {isShowingFilters && <Filters products={products} onFilterChange={handleFilterChange} />}

        <div className="w-full flex-[5]">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
            <div className="flex w-full items-center gap-2 md:flex-1">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 focus:border-black focus:outline-none focus:ring"
                />
                <SearchOutlined className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsShowingFilters((prev) => !prev)}
                title="Filters"
                aria-label="Filters"
                className={`${
                  isShowingFilters && "bg-gray-200 text-orange-500"
                } grid h-12 w-12 place-content-center rounded-full hover:bg-gray-200`}
              >
                <FilterAltOutlined />
              </motion.button>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsInListView(true)}
                  className={`${
                    isInListView && "bg-gray-200 text-orange-500"
                  } grid h-12 w-12 place-content-center rounded-full hover:bg-gray-200`}
                >
                  <MenuOutlined />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsInListView(false)}
                  className={`${
                    !isInListView && "bg-gray-200 text-orange-500"
                  } grid h-12 w-12 place-content-center rounded-full hover:bg-gray-200`}
                >
                  <WindowOutlined />
                </motion.button>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/products/create-product"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                >
                  Add product +
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="my-4 flex flex-wrap items-center gap-2 text-xs md:gap-4 md:text-sm">
            <button className="font-medium text-orange-500">ALL PRODUCTS [{displayedProducts.length}]</button>
            <button>AVAILABLE [{displayedProducts.filter((product) => product.product_status).length}]</button>
            <button>OUT OF STOCK [{displayedProducts.filter((product) => !product.product_status).length}]</button>
          </div>

          {isInListView ? (
            <div className="overflow-x-auto">
              <table className="w-full rounded-xl bg-white text-xs shadow-sm md:text-sm">
                <thead>
                  <tr>
                    <th className="p-2">IMAGE</th>
                    <th className="p-2">PRODUCT NAME</th>
                    <th className="p-2">PRICE</th>
                    <th className="p-2">PRODUCT CATEGORIES</th>
                    <th className="p-2">STATUS</th>
                    <th className="p-2">DATE</th>
                    <th className="p-2">ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {displayedProducts.map((product) => (
                    <tr key={product.product_id} className="hover:bg-gray-50">
                      <td className="p-2">
                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                          {product.items && product.items.length > 0 ? (
                            <div className="relative h-12 w-12">
                              <Image
                                src={fixImageUrl(product.items[0].product_image) || "/placeholder.png"}
                                alt={product.product_name}
                                fill
                                className="rounded-lg object-cover"
                                onError={(e) => {
                                 
                                  ;(e.target as HTMLImageElement).src = "/placeholder.png?height=48&width=48"
                                }}
                              />
                            </div>
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center bg-gray-200 text-xs text-gray-500">
                              No image
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <Link
                          href={`/products/${product.product_id}`}
                          className="font-medium text-orange-500 hover:underline"
                        >
                          {product.product_name}
                        </Link>
                      </td>
                      <td className="p-2">${Number.parseFloat(product.product_sale_price).toFixed(2)}</td>
                      <td className="capitalize p-2">{categories[product.category] || product.category}</td>
                      <td className="p-2">
                        <span
                          className={`${
                            product.product_status ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                          } rounded-lg p-2 text-xs`}
                        >
                          {product.product_status ? "Available" : "Out of stock"}
                        </span>
                      </td>
                      <td className="p-2">{new Date(product.created_at).toLocaleDateString()}</td>
                      <td className="p-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteProduct(product.product_id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <DeleteOutlined />
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {displayedProducts.map((product) => (
                <motion.div
                  key={product.product_id}
                  className="relative overflow-hidden rounded-xl bg-white shadow-sm transition-all"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <span
                    className={`${
                      product.product_status ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    } absolute right-4 top-4 z-10 rounded-lg p-2 text-xs`}
                  >
                    {product.product_status ? "Available" : "Out of stock"}
                  </span>

                  <motion.button
                    className="absolute left-4 top-4 z-10 rounded-full bg-red-500 p-2 text-white opacity-0 hover:opacity-100"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDeleteProduct(product.product_id)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <DeleteOutlined fontSize="small" />
                  </motion.button>

                  <Link href={`/products/${product.product_id}`} className="block">
                    <div className="relative h-48 w-full bg-gray-100">
                      {product.items && product.items.length > 0 ? (
                        <Image
                          src={fixImageUrl(product.items[0].product_image) || "/placeholder.png"}
                          alt={product.product_name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                          
                            ;(e.target as HTMLImageElement).src = "/placeholder.png?height=192&width=192"
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 font-medium">{product.product_name}</h3>
                      <p className="mb-2 text-sm text-gray-500">
                        Category: {categories[product.category] || product.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {new Date(product.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-lg font-bold text-gray-800">
                          ${Number.parseFloat(product.product_sale_price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Products

