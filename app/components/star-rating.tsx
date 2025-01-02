import { Star } from "@mui/icons-material";

const StarRating = ({
  rating,
  size,
}: {
  rating: number;
  size: "small" | "inherit" | "large" | "medium";
}) => {
  return [...Array(5)].map((star, index) => {
    const currentRating = index + 1;
    return (
      <Star
        fontSize={size}
        key={index}
        className={currentRating > rating ? "text-gray-300" : "text-accent-900"}
      />
    );
  });
};

export default StarRating;
