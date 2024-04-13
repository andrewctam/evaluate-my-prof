import { useContext } from "react";
import "./Home.scss";
import { ReviewActionType, Review as ReviewType } from "../../types/review-types";
import Review from "../Review/Review";
import ReviewInput from "../ReviewInput/ReviewInput";
import { ReviewContext, ReviewDispatchContext, UserContext } from "../../App";
import Layout from "../../layout/Layout";

export default function Home() {
  const userState = useContext(UserContext);
  const reviewState = useContext(ReviewContext);
  const reviewDispatch = useContext(ReviewDispatchContext);

  const addReview = (newReview: ReviewType) => {
    if (userState.currentUser === null) {
      alert("Not Logged In!");
      return;
    }

    reviewDispatch({
      type: ReviewActionType.ADD_REVIEW,
      payload: newReview,
    });
  };

  return (
    <Layout>
      <div className="feed">
        <h1>Professor Bob from Stony Brook University</h1>
        <ReviewInput addReview={addReview} />

        {reviewState.reviews.map(review => (
          <Review review={review} />
        ))}
      </div>
    </Layout>
  );
}
