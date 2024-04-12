import { useState } from "react";
import "./Feed.scss";
import Review from "./Review";
import { Review as ReviewType } from "../types";
import ReviewInput from "./ReviewInput";

export default function Feed() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const addReview = (newReview: ReviewType) => {
    setReviews([...reviews, newReview]);
  }

  return (
    <div className = "feed">
      <ReviewInput addReview={addReview} />

      {reviews.map((r) => (
        <Review review={r} />
      ))}
    </div>
  );
}
