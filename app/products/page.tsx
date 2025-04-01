"use client";

import {
  DeleteOutlined,
  FilterAltOutlined,
  MenuOutlined,
  SearchOutlined,
  WindowOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Filters from "../components/products/filters";
import toast from 'react-hot-toast'

interface Product {
  id: string;
  product_name: string;
  product_description: string;
  category: string;
  product_tags: string;
  product_sale_price: string;
  product_regular_price: string;
  product_visibility: boolean;
  product_status: boolean;
  created_at: string;
  updated_at: string;
  imgSrc: string;
}

const categoryMapping: { [key: string]: string } = {
  "b587c20d-c3f6-4b5d-9d9f-2795f669a01b": "Clothing",
  "b41e74a6-13f5-4277-8474-4a772725a6aa": "Electronics",
  "8284ec4f-7b05-4e16-8eeb-788ed39dcd05": "Beauty",
  };

const Products = () => {
  const [isInListView, setIsInListView] = useState<boolean>(true);
  const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const [isChecked, setisChecked] = useState<{ [key: string]: boolean }>({});

  const toggleSelection = (id: string) => {
    setisChecked((prev) => ({
      ...prev,
      [id]: !prev[id], // 
    }));
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

  toast.loading("Loading Product Data....")

        const response = await fetch(
          "https://vicsmall-backend-ckn4.onrender.com/v1/api/shop/vendor-products",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          toast.dismiss();
          toast.success("Product Data Loaded Succesfully")
          setProducts(data.Data || []);
        } else {
          toast.dismiss();
        toast.error("Failed to fetch Product data.")
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
if (loading){
  console.log("loading")
}


  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Products
      </h1>

      <div className="flex flex-col items-start gap-4 md:flex-row">
        {isShowingFilters && <Filters />}

        <div className="w-full flex-[5]">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
            <div className="flex w-full items-center gap-2 md:flex-1">
              <div className="relative w-full">
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

            <div className="flex items-center gap-4 md:gap-8">
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

          <div className="my-4 flex flex-wrap items-center gap-2 text-xs md:gap-4 md:text-sm">
            <button className="font-medium text-accent-900">
              ALL PRODUCTS [{products.length}]
            </button>
            <button>
              AVAILABLE [
              {products.filter((product) => product.product_status).length}]
            </button>
            <button>
              OUT OF STOCK [
              {products.filter((product) => !product.product_status).length}]
            </button>
          </div>

          {isInListView ? (
            <div className="overflow-x-auto">
              <table className="w-full rounded-xl bg-white text-xs shadow-sm md:text-sm">
                <thead>
                  <tr>
                    <th></th>
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
      <label className="relative flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={isChecked}
    onChange={() => setIsChecked((prev) => !prev)} // Allow user interaction
    className="peer hidden" // Remove `cursor-not-allowed` to make it clickable
  />
  <div className="w-5 h-5 border-2 border-[#F5842F] rounded-md transition-all peer-checked:bg-[#F5842F] peer-checked:border-[#F5842F] flex items-center justify-center">
    <span className="hidden peer-checked:block text-white text-sm font-bold">✔</span>
  </div>
</label>
      </td>
      <td>
        <Image
          src={product.imgSrc}
          alt={product.product_name}
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
          {product.product_name}
        </Link>
      </td>
      <td>{product.product_sale_price}</td>
      <td className="capitalize">{categoryMapping[product.category] || product.category}</td>
      <td>
        <span
          className={`${
            product.product_status
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          } rounded-lg p-2 text-xs`}
        >
          {product.product_status ? "Available" : "Out of stock"}
        </span>
      </td>
      <td>
        {new Date(product.created_at).toLocaleDateString()}
      </td>
      <td>
        <DeleteOutlined />
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xs:grid-cols-2">
              {products.map((product) => (
                <Link
                  href={`products/${product.id}`}
                  key={product.id}
                  className="relative overflow-hidden rounded-xl bg-white"
                >
                  <span
                    className={`${product.product_status ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} absolute right-4 top-4 rounded-lg p-2 text-xs`}
                  >
                    {product.product_status ? "Available" : "Out of stock"}
                  </span>
                  <Image
                    src={product.imgSrc}
                    height={48}
                    width={48}
                    alt={product.product_name}
                    className="h-32 w-full"
                  />
                  <div className="p-2 text-sm">
                    <p className="font-medium">{product.product_name}</p>
                    <p className="text-gray-400">
                      Category: {categoryMapping[product.category] || product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span>
                        {new Date(product.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        {product.product_sale_price}
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