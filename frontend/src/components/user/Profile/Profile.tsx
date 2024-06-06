import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import { useEffect, useMemo, useState } from "react";
import Review from "../../home/Review/Review";
import "./Profile.scss";
import { Review as ReviewType } from "../../../types/review-types";
import axios from "axios";
import { API_URL } from "../../../types/constants";
import { useAppSelector } from "../../../app/hooks";

export default function Profile() {
  const params = useParams();
  const username = params?.username;
  const user = useAppSelector(state => state.user);

  const [reviews, setReviews] = useState<ReviewType[]>([]);
  
  const getProfile = async () => {
    if (user.sessionToken === null) {
      return;
    }
    const url = `${API_URL}/reviews/user/${username}`;

    await axios.get(url)
    .then((response) => {
      console.log(response);
      setReviews(response.data.reviews);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getProfile();
  }, [])

  const score = useMemo(() => {
    const sum = reviews.reduce((acc: number, review: ReviewType) => {
      return acc + review.rating;
    }, 0);  

    return sum;
  }, [reviews])

  return <Layout>
    <div className="profile">
      <h1>{username}</h1>
      <div className="stats">
        <div> Total Score: {score} </div>
        <div> Reviews: {reviews.length} </div>
      </div>
      <div className="feed">
        {reviews.map((review, i) => (
          <Review key={i} review={review} refreshParent={getProfile} />
        ))}
      </div>
    </div>

  </Layout>;
}
