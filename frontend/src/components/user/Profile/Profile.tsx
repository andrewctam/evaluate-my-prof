import { useParams } from "react-router-dom";

import { useMemo } from "react";
import "./Profile.scss";
import { useGetFileteredReviewsQuery } from "../../../features/api/apiSlice";
import { Review as ReviewType } from "../../../features/reviews/reviewsSlice";
import Layout from "../../layout/Layout";
import ReviewFeed from "../../reviews/ReviewFeed/ReviewFeed";

export default function Profile() {
  const params = useParams();
  const username = params?.username ?? "";

  const { data: reviews } = useGetFileteredReviewsQuery({
    authorName: username,
    profName: "",
    schoolName: "",
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
       <ReviewFeed
          reviews={reviews}
          showProfFilter
          showSchoolFilter
          reviewShowProfSchool
        />
      </div>
    </div>

  </Layout>;
}
