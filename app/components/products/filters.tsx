import {
  CloseOutlined
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RangeSlider from "./slider";

const Filters = () => {
  const router = useRouter();

  const categories = ["Clothing", "Beauty", "Footwear", "Accessories", "Electronics"];
  const sizes = ["Small (S)", "Medium (M)", "Large (L)", "Extra Large (XL)"];
  const brands = ["Dior", "Gucci", "Dolce&Gabbana", "Louis Vuitton"];
  const colors = ["White", "Red", "Black", "Pink"];

  // State for selected filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);

  // Toggle selection for filters
  const toggleSelection = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };
  

  // Apply filters and update URL
  const applyFilters = () => {
    const query = new URLSearchParams();
    if (selectedCategories.length) query.set("categories", selectedCategories.join(","));
    if (selectedSizes.length) query.set("sizes", selectedSizes.join(","));
    if (selectedBrands.length) query.set("brands", selectedBrands.join(","));
    if (selectedColors.length) query.set("colors", selectedColors.join(","));
    query.set("minPrice", priceRange[0].toString());
    query.set("maxPrice", priceRange[1].toString());
    router.push(`/products?${query.toString()}`);
  };

  return (
    <aside className="w-56 p-4 bg-[#F5842F1A] rounded-xl text-white">

<p className="text-lg font-bold text-black">Filters</p>

{/* Selected Filters Tags */}
<div className="flex flex-wrap gap-2 mt-2">
  {[...selectedCategories, ...selectedSizes, ...selectedBrands, ...selectedColors].map((filter) => {
    // Determine which array the filter belongs to
    const isCategory = selectedCategories.includes(filter);
    const isSize = selectedSizes.includes(filter);
    const isBrand = selectedBrands.includes(filter);
    const isColor = selectedColors.includes(filter);

    return (
      <span
        key={filter}
        className="bg-[#F5842F4D] px-2 py-1 text-black rounded-full text-xs flex items-center"
      >
        {filter}
        <CloseOutlined
          className="ml-1 cursor-pointer text-white"
          style={{ fontSize: "14px" }}
          onClick={() => {
            if (isCategory) toggleSelection(selectedCategories, setSelectedCategories, filter);
            if (isSize) toggleSelection(selectedSizes, setSelectedSizes, filter);
            if (isBrand) toggleSelection(selectedBrands, setSelectedBrands, filter);
            if (isColor) toggleSelection(selectedColors, setSelectedColors, filter);
          }}
        />
      </span>
    );
  })}
</div>

{/* Category */}
<p className="mt-4 text-sm text-black font-semibold">Category</p>
{categories.map((category) => (
  <div key={category} className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={selectedCategories.includes(category)}
      onChange={() => toggleSelection(selectedCategories, setSelectedCategories, category)}
      className="accent-white"
    />
    <label className="text-sm">{category}</label>
  </div>
))}


      {/* Price */}
      <p className="mt-4 text-sm font-semibold text-black">Price</p>
      <RangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />
      <div className="flex justify-between mt-1 text-sm">
        <input
          type="text"
          value={`₦${priceRange[0]}`}
          readOnly
          className="bg-white text-black px-2 py-1 rounded-md w-20 text-center"
        />
        <input
          type="text"
          value={`₦${priceRange[1]}`}
          readOnly
          className="bg-white text-black px-2 py-1 rounded-md w-20 text-center"
        />
      </div>

      {/* Size */}
      <p className="mt-4 text-sm font-semibold text-black">Size</p>
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedSizes.includes(size)}
            onChange={() => toggleSelection(selectedSizes, setSelectedSizes, size)}
            className="accent-white"
          />
          <label className="text-sm">{size}</label>
        </div>
      ))}

      {/* Brand */}
      <p className="mt-4 text-sm font-semibold text-black">Brand</p>
      {brands.map((brand) => (
        <div key={brand} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand)}
            onChange={() => toggleSelection(selectedBrands, setSelectedBrands, brand)}
            className="accent-white"
          />
          <label className="text-sm">{brand}</label>
        </div>
      ))}

      {/* Color */}
      <p className="mt-4 text-sm font-semibold text-black">Color</p>
      {colors.map((color) => (
        <div key={color} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedColors.includes(color)}
            onChange={() => toggleSelection(selectedColors, setSelectedColors, color)}
            className="accent-white"
          />
          <label className="text-sm">{color}</label>
        </div>
      ))}

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="mt-4 w-full bg-white text-orange-600 font-semibold py-2 rounded-md"
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default Filters;
