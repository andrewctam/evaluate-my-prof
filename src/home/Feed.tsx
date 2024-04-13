import { useState } from "react";
import "./Feed.scss";
import Review from "./Review";
import { Review as ReviewType } from "../types";
import ReviewInput from "./ReviewInput";

export default function Feed() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const addReview = (newReview: ReviewType) => {
    setReviews([...reviews, newReview]);
  };

  const vote = (i: number, change: number) => {
    const newReviews = [...reviews];
    newReviews[i].votes += change;
    setReviews(newReviews);
  };

  return (
    <div className="feed">
      <ReviewInput addReview={addReview} />

      {reviews.map((review, i) => (
        <Review review={review} vote={(change: number) => vote(i, change)} />
      ))}
    </div>
  );
}
