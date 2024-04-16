import { useEffect, useState } from "react";
import "./Home.scss";
import {Review as ReviewType } from "../../../types/review-types";
import Review from "../Review/Review";
import ReviewInput from "../ReviewInput/ReviewInput";
import Layout from "../../layout/Layout";
import axios from "axios";

export default function Home() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const getReviews = async () => {
    const url = `${import.meta.env.VITE_API_URL}/reviews/all`;

    await axios.get(url)
    .then((response) => {
      console.log(response.data);

      setReviews(response.data);
    }
    ).catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Layout>
      <div className="feed">
        <h1>Professor Bob from Stony Brook University</h1>
        <ReviewInput refreshParent={getReviews} />

        {reviews.map((review, i) => (
          <Review review={review} key={i} refreshParent={getReviews} />
        ))}
      </div>
    </Layout>
  );
}
