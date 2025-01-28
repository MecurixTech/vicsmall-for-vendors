import {
  CloseOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import RangeSlider from "./slider";

const selectedCategories = [
  { id: 0, value: "lingerie" },
  { id: 1, value: "accessories" },
  { id: 2, value: "shoes" },
  { id: 3, value: "dresses" },
];

const sizes = [
  { id: 0, value: "Small (S)", name: "sm" },
  { id: 1, value: "Medium (M)", name: "md" },
  { id: 2, value: "Large (L)", name: "lg" },
  { id: 3, value: "Extralarge (XL)", name: "xl" },
];

const categories = [
  { id: 0, value: "lingerie" },
  { id: 1, value: "accessories" },
  { id: 2, value: "shoes" },
  { id: 3, value: "dresses" },
  { id: 4, value: "tops" },
  { id: 5, value: "bottoms" },
];

const brands = [
  { id: 0, value: "Dior", name: "dior" },
  { id: 1, value: "Gucci", name: "gucci" },
  { id: 2, value: "Dolce & Gabbana", name: "dolce_and_gabbana" },
  { id: 3, value: "Louis Vutton", name: "louis_vutton" },
];

const colors = [
  { id: 0, value: "red" },
  { id: 1, value: "blue" },
  { id: 2, value: "green" },
  { id: 3, value: "black" },
  { id: 4, value: "white" },
];

const Filters = () => {
  const [isShowingCategories, setIsShowingCategories] =
    useState<boolean>(false);
  const [isShowingSize, setIsShowingSize] = useState<boolean>(false);
  const [isShowingBrand, setIsShowingBrand] = useState<boolean>(false);
  const [isShowingColor, setIsShowingColor] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  return (
    <aside className="flex-1 rounded-xl bg-white/70 p-4 text-sm">
      <p className="mb-2 text-base font-medium text-gray-800">Filters</p>

      <div className="mb-4 flex flex-wrap gap-1 text-xs uppercase">
        {selectedCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-1 rounded-xl bg-accent-100 px-2 py-1 leading-none text-white"
          >
            <span className="text-gray-600">{category.value}</span>
            <button className="text-accent-900">
              <CloseOutlined fontSize="inherit" />
            </button>
          </div>
        ))}
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
            <div key={category.id} className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                name={category.value}
                id={category.value}
              />
              <label
                htmlFor={category.value}
                className="font-normal capitalize"
              >
                {category.value}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Price */}
      <p className="mb-2 mt-4 font-medium text-gray-800">Price</p>
      <RangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />
      <div className="mb-4 mt-1 flex items-center justify-between text-xs text-gray-500">
        <span>$0</span>
        <span>$10000</span>
      </div>

      {/* Size */}
      <button
        onClick={() => setIsShowingSize((prev) => !prev)}
        className="mb-2 flex w-full items-center justify-between"
      >
        <p className="font-medium text-gray-800">Size</p>
        <div className="text-accent-900">
          {isShowingSize ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </div>
      </button>
      {isShowingSize && (
        <div>
          {sizes.map((size) => (
            <div key={size.id} className="flex items-center gap-1 text-xs">
              <input type="checkbox" name={size.name} id={size.name} />
              <label htmlFor={size.name} className="font-normal">
                {size.value}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Brand */}
      <button
        onClick={() => setIsShowingBrand((prev) => !prev)}
        className="mb-2 mt-4 flex w-full items-center justify-between"
      >
        <p className="font-medium text-gray-800">Brand</p>
        <div className="text-accent-900">
          {isShowingBrand ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </div>
      </button>
      {isShowingBrand && (
        <div className="max-h-24 overflow-y-scroll">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center gap-1 text-xs">
              <input type="checkbox" name={brand.name} id={brand.name} />
              <label htmlFor={brand.name} className="font-normal">
                {brand.value}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Color */}
      <button
        onClick={() => setIsShowingColor((prev) => !prev)}
        className="mb-2 mt-4 flex w-full items-center justify-between"
      >
        <p className="font-medium text-gray-800">Color</p>
        <div className="text-accent-900">
          {isShowingColor ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </div>
      </button>
      {isShowingColor && (
        <div>
          {colors.map((color) => (
            <div key={color.id} className="flex items-center gap-1 text-xs">
              <input type="checkbox" name={color.value} id={color.value} />
              <label htmlFor={color.value} className="font-normal capitalize">
                {color.value}
              </label>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Filters;
