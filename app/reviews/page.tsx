"use client"

import { MoreVertOutlined, SearchOutlined, Star } from "@mui/icons-material"
import StarRating from "../components/star-rating"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import type { Review } from "../data/dummyTypes"
import { motion } from "framer-motion" 
import Link from "next/link"

const Reviews = () => {
  const accessToken = (typeof window !== "undefined" && localStorage.getItem("token")) || ""

  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadingReviews = toast.loading("Fetching your reviews...")
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/vendor/all_customer_review`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      )
      .then((res) => {
        console.log(res)
        toast.dismiss(loadingReviews)
        if (res.status === 200) {
          setReviews(res.data.Data || [])
          if (res.data.Data.length === 0) {
            toast.error("No reviews found for this vendor")
          } else toast.success(res.data.Message)
        } else {
          toast.error(res.data.Message)
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error("An error occurred!")
      })
      .finally(() => {
        toast.dismiss(loadingReviews)
        setLoading(false)
      })
  }, [accessToken])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#F37F34] border-t-transparent"></div>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <>
        <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">Reviews</h1>

        <motion.div
          className="mt-8 flex flex-col items-center justify-center rounded-xl bg-white p-8 sm:p-12 text-center shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-6 flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center rounded-full bg-yellow-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Star style={{ fontSize: 80, color: "#FFB800" }} />
            </motion.div>
          </motion.div>

          <motion.h2
            className="mb-2 text-xl sm:text-2xl font-bold text-gray-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No Reviews Yet
          </motion.h2>

          <motion.p
            className="mb-6 max-w-md text-sm sm:text-base text-gray-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You haven&apos;t received any customer reviews yet. Reviews will appear here once customers start rating your
            products.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/products">
                <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                  View Products
                </button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/orders">
                <button className="w-full rounded-lg bg-orange-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-orange-600">
                  Check Orders
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </>
    )
  }

  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">Reviews</h1>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews"
              className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 focus:border-black focus:outline-none focus:ring"
            />
            <SearchOutlined className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-xl border bg-gray-200 p-2 pr-3">
          <MoreVertOutlined fontSize="inherit" />
          <span>Bulk action</span>
        </button>
      </div>

      <div className="mb-4 flex items-center gap-4 text-sm">
        <button className="font-semibold text-accent-900">ALL REVIEWS [{reviews.length}]</button>
      </div>

      <div className="overscroll-x-scroll w-full">
        <table className="min-w-full rounded-xl bg-white text-sm shadow-sm">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="select_all_items" id="select_all_items" aria-label="Select all items" />
              </th>
              <th>Rating</th>
              <th>Review</th>
              <th>Customer</th>
              <th>Submitted on</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review: Review) => (
              <tr key={review.id}>
                <td>
                  <input type="checkbox" name="select_all_items" id="select_all_items" aria-label="Select all items" />
                </td>
                <td>
                  <div className="flex w-fit items-center">
                    <StarRating rating={review.rating} size="inherit" />
                  </div>
                </td>
                <td className="max-w-[40ch] truncate">{review.review}</td>
                <td>{review.customer_name}</td>
                <td>{new Date(review.created_at).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Reviews

