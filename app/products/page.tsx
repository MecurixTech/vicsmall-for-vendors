"use client";

import {
  DeleteOutlined,
  FilterAltOutlined,
  MenuOutlined,
  SearchOutlined,
  WindowOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { products } from "../data/dummyData";
import Image from "next/image";
import Filters from "../components/products/filters";

const Products = () => {
  const [isInListView, setIsInListView] = useState<boolean>(true);
  const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);

  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Products
      </h1>

      <div className="flex items-start gap-4">
        {isShowingFilters && <Filters />}

        <div className="flex-[5]">
          <div className="flex items-center justify-between gap-8">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search reviews"
                  className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 focus:border-black focus:outline-none focus:ring"
                />
                <SearchOutlined className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
              </div>
              <button
                onClick={() => setIsShowingFilters((prev) => !prev)}
                title="Filters"
                aria-label="Filters"
                className={`${isShowingFilters && "bg-gray-200 text-accent-900"} grid h-12 w-12 place-content-center rounded-full hover:bg-gray-200`}
              >
                <FilterAltOutlined />
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <button
                  onClick={() => setIsInListView(true)}
                  className={`${isInListView && "bg-gray-200 text-accent-900"} grid h-12 w-12 place-content-center rounded-full hover:bg-gray-200`}
                >
                  <MenuOutlined />
                </button>
                <button
                  onClick={() => setIsInListView(false)}
                  className={`${!isInListView && "bg-gray-200 text-accent-900"} grid h-12 w-12 place-content-center rounded-full hover:bg-gray-200`}
                >
                  <WindowOutlined />
                </button>
              </div>
              <Link
                href="/products/create-product"
                className="button button-accent px-4 py-2"
              >
                Add product +
              </Link>
            </div>
          </div>

          <div className="my-4 flex items-center gap-4 text-sm">
            <button className="font-medium text-accent-900">
              ALL PRODUCTS [100]
            </button>
            <button>AVAILABLE [85]</button>
            <button>OUT OF STOCK [15]</button>
          </div>

          {isInListView ? (
            <table className="w-full rounded-xl bg-white text-sm shadow-sm">
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT NAME</th>
                  <th>PRICE</th>
                  <th>PRODUCT CATEGORIES</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <Image
                        src={product.imgSrc}
                        alt={product.name}
                        height={48}
                        width={48}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    </td>
                    <td>
                      <Link
                        href={`products/${product.id}`}
                        className="hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td>{product.price}</td>
                    <td className="capitalize">{product.category}</td>
                    <td>
                      <span
                        className={`${product.status === "Available" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} rounded-lg p-2 text-xs`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td>{product.date}</td>
                    <td>
                      <DeleteOutlined />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((product) => (
                <Link
                  href={`products/${product.id}`}
                  key={product.id}
                  className="relative overflow-hidden rounded-xl bg-white"
                >
                  <span
                    className={`${product.status === "Available" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} absolute right-4 top-4 rounded-lg p-2 text-xs`}
                  >
                    {product.status}
                  </span>
                  <Image
                    src={product.imgSrc}
                    height={48}
                    width={48}
                    alt={product.name}
                    className="h-32 w-full"
                  />
                  <div className="p-2 text-sm">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-400">
                      Category: {product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span>{product.date}</span>
                      <span className="text-lg font-bold text-gray-800">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
