import { useContext, useState } from "react";
import "./Home.scss";
import { Review as ReviewType, User } from "../../types";
import Review from "../Review/Review";
import ReviewInput from "../ReviewInput/ReviewInput";
import { UserContext } from "../../App";

export default function Home() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const UserState = useContext(UserContext);

  const addReview = (newReview: ReviewType) => {
    setReviews([...reviews, newReview]);
  };

  const vote = (i: number, change: number) => {
    if (UserState.currentUser === null) {
      alert("Not Logged In!");
      return;
    }

    const newReviews = [...reviews];
    newReviews[i].votes += change;
    setReviews(newReviews);
  };

  const addComment = (i: number, text: string) => {
    if (UserState.currentUser === null) {
      alert("Not Logged In!");
      return;
    }

    const newReviews = [...reviews];
    const poster: User = { name: UserState.currentUser.name };

    newReviews[i].comments.push({
      poster,
      text,
    });
    
    setReviews(newReviews);
  }

  return (
    <div className="feed">
      <h1>Professor Bob from Stony Brook University</h1>
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
