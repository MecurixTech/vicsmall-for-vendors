"use client";

import { MoreVertOutlined, SearchOutlined } from "@mui/icons-material";
import StarRating from "../components/star-rating";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Review } from "../data/dummyTypes";

const Reviews = () => {
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadingReviews = toast.loading("Fetching your reviews...");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/vendor/all_customer_review`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      )
      .then((res) => {
        console.log(res);
        toast.dismiss(loadingReviews);
        if (res.status === 200) {
          setReviews(res.data.Data);
          if (reviews.length === 0) {
            toast.error("No reviews found for this vendor");
          } else toast.success(res.data.Message);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred!");
      })
      .finally(() => toast.dismiss(loadingReviews));
  }, [accessToken]);

  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Reviews
      </h1>

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
        <button className="font-semibold text-accent-900">
          ALL REVIEWS [{reviews.length}]
        </button>
      </div>

      <div className="overscroll-x-scroll w-full">
        <table className="min-w-full rounded-xl bg-white text-sm shadow-sm">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="select_all_items"
                  id="select_all_items"
                  aria-label="Select all items"
                />
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
                  <input
                    type="checkbox"
                    name="select_all_items"
                    id="select_all_items"
                    aria-label="Select all items"
                  />
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
  );
};

export default Reviews;
