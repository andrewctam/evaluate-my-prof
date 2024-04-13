import { useState } from "react";
import "./Feed.scss";
import { Review as ReviewType, User } from "../../types";
import { names, uniqueNamesGenerator } from "unique-names-generator";
import Review from "../Review/Review";
import ReviewInput from "../ReviewInput/ReviewInput";

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

  const addComment = (i: number, text: string) => {
    const newReviews = [...reviews];
    const poster: User = { name: uniqueNamesGenerator({ dictionaries: [names] }) }

    newReviews[i].comments.push({
      poster,
      text,
    });
    
    setReviews(newReviews);
  }

  return (
    <div className="feed">
      <ReviewInput addReview={addReview} />

      {reviews.map((review, i) => (
        <Review
          review={review} 
          vote={(change: number) => vote(i, change)} 
          comment={(text: string) => addComment(i, text)}
        />
      ))}
    </div>
  );
}
