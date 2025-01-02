import { MoreVertOutlined, SearchOutlined } from "@mui/icons-material";
import { reviews } from "../data/dummyData";
import Image from "next/image";
import StarRating from "../components/star-rating";

const Reviews = () => {
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
          ALL REVIEWS [250]
        </button>
        <button>APPROVED [120]</button>
        <button>PENDING [80]</button>
        <button>TRASH [34]</button>
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
              <th>Type</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Customer</th>
              <th>Submitted on</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>
                  <input
                    type="checkbox"
                    name="select_all_items"
                    id="select_all_items"
                    aria-label="Select all items"
                  />
                </td>
                <td>{review.type}</td>
                <td className="flex items-center gap-2">
                  <Image
                    src={review.product.imgSrc}
                    alt={review.product.name}
                    height={48}
                    width={48}
                    className="rounded-xl"
                  />
                  <div>
                    <p>{review.product.name}</p>
                    <p className="text-xs">
                      Category: {review.product.category}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="flex w-fit items-center">
                    <StarRating rating={review.rating} size="inherit" />
                  </div>
                </td>
                <td className="max-w-[40ch] truncate">
                  {review.reviewMessage}
                </td>
                <td>{review.customer}</td>
                <td>{review.submittedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reviews;
