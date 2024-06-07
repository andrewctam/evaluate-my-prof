import { useParams } from "react-router-dom";

import { useMemo } from "react";
import Review from "../../home/Review/Review";
import "./Profile.scss";
import { useGetReviewsQuery } from "../../../features/api/apiSlice";
import { Review as ReviewType } from "../../../features/reviews/reviewsSlice";
import Layout from "../../layout/Layout";

export default function Profile() {
  const params = useParams();
  const username = params?.username ?? "";

  const { reviews, refetch } = useGetReviewsQuery(undefined, {
    selectFromResult: ({data}) => ({
      reviews: data?.filter((review: ReviewType) => review.authorName === username)
    })
  });
  
  const score = useMemo(() => {
    console.log(reviews)
    const sum = reviews?.reduce((acc: number, review: ReviewType ) => {
      return acc + review.rating;
    }, 0);

    return sum;
  }, [reviews])

  if (!reviews)
    return null;

  return <Layout>
    <div className="profile">
      <h1>{username}</h1>
      <div className="stats">
        <div> Total Score: {score} </div>
        <div> Reviews: {reviews.length} </div>
      </div>
      <div className="feed">
        {reviews.map((review, i) => (
          <Review key={i} review={review} refreshParent={refetch} />
        ))}
      </div>
    </div>

  </Layout>;
}
