import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import { useContext } from "react";
import Review from "../../home/Review/Review";
import "./Profile.scss";
import { ReviewContext } from "../../types/context";

export default function Profile() {
  const reviewContext = useContext(ReviewContext);

  const params = useParams();
  const username = params?.username;
      
  const reviews = reviewContext.reviews.filter((review) => review.author.name === username);
  const score = reviews.reduce((acc, review) => acc + review.votes, 0);

  return <Layout>
    <div className="profile">
      <h1>{username}</h1>
      <div className="stats">
        <div> Total Score: {score} </div>
        <div> Reviews: {reviews.length} </div>
      </div>
      <div className="feed">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>

  </Layout>;
}
