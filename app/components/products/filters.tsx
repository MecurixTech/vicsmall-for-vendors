"use client"

import { CloseOutlined, ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material"
import { useState, useEffect } from "react"
import RangeSlider from "./slider"
import { API_BASE_URL } from "@/lib/constants"

interface Category {
  category_id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

interface ProductItem {
  product_image: string
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

interface FiltersProps {
  products: Product[]
  onFilterChange: (filters: {
    categories: string[]
    priceRange: number[]
    colors: string[]
  }) => void
}

const colors = [
  { id: 0, value: "red" },
  { id: 1, value: "blue" },
  { id: 2, value: "green" },
  { id: 3, value: "black" },
  { id: 4, value: "white" },
]

const Filters = ({ products = [], onFilterChange }: FiltersProps) => {
  const [isShowingCategories, setIsShowingCategories] = useState<boolean>(false)
  const [isShowingColor, setIsShowingColor] = useState<boolean>(false)
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(1000)

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
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => Number.parseFloat(product.product_sale_price))
      const validPrices = prices.filter((price) => !isNaN(price) && price > 0)

      if (validPrices.length > 0) {
        const max = Math.ceil(Math.max(...validPrices))
        setMaxPrice(max)
        setPriceRange([0, max])
      }
    }
  }, [products])

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        priceRange: priceRange,
        colors: selectedColors,
      })
    }
  }, [selectedCategories, priceRange, selectedColors, onFilterChange])

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories((prev) => prev.filter((id) => id !== categoryId))
  }

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color)
      } else {
        return [...prev, color]
      }
    })
  }

  return (
    <aside className="flex-1 rounded-xl bg-white/70 p-4 text-sm">
      <p className="mb-2 text-base font-medium text-gray-800">Filters</p>

      <div className="mb-4 flex flex-wrap gap-1 text-xs uppercase">
        {selectedCategories.map((categoryId) => {
          const category = categories.find((cat) => cat.category_id === categoryId)
          return category ? (
            <div
              key={categoryId}
              className="flex items-center gap-1 rounded-xl bg-accent-100 px-2 py-1 leading-none text-white"
            >
              <span className="text-gray-600">{category.name}</span>
              <button className="text-accent-900" onClick={() => handleRemoveCategory(categoryId)}>
                <CloseOutlined fontSize="inherit" />
              </button>
            </div>
          ) : null
        })}
      </div>

      {/* Category */}
      <button
        onClick={() => setIsShowingCategories((prev) => !prev)}
        className="mb-2 flex w-full items-center justify-between text-accent-900"
      >
        <span className="font-medium text-gray-800">Category</span>
        {isShowingCategories ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </button>
      {isShowingCategories && (
        <div className="max-h-24 overflow-y-scroll">
          {categories.map((category) => (
            <div key={category.category_id} className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                name={category.slug}
                id={category.category_id}
                className="accent-orange-500"
                checked={selectedCategories.includes(category.category_id)}
                onChange={() => handleCategoryToggle(category.category_id)}
              />
              <label htmlFor={category.category_id} className="font-normal capitalize">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Price */}
      <p className="mb-2 mt-4 font-medium text-gray-800">Price</p>
      <RangeSlider priceRange={priceRange} setPriceRange={setPriceRange} min={0} max={maxPrice} />
      <div className="mb-4 mt-1 flex items-center justify-between text-xs text-gray-500">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>

      {/* Color */}
      <button
        onClick={() => setIsShowingColor((prev) => !prev)}
        className="mb-2 mt-4 flex w-full items-center justify-between"
      >
        <p className="font-medium text-gray-800">Color</p>
        <div className="text-accent-900">{isShowingColor ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}</div>
      </button>
      {isShowingColor && (
        <div>
          {colors.map((color) => (
            <div key={color.id} className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                className="accent-orange-500"
                name={color.value}
                id={color.value}
                checked={selectedColors.includes(color.value)}
                onChange={() => handleColorToggle(color.value)}
              />
              <label htmlFor={color.value} className="font-normal capitalize">
                {color.value}
              </label>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

export default Filters