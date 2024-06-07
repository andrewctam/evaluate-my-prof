import "./Home.scss";
import Review from "../Review/Review";
import Layout from "../../layout/Layout";
import { useGetReviewsQuery } from "../../../features/api/apiSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateReview from "../CreateReview/CreateReview";
import { useAppSelector } from "../../../app/hooks";

export default function Home() {
  const { data: reviews } = useGetReviewsQuery();

  const user = useAppSelector((state) => state.user);

  const [creating, setCreating] = useState(false);

  return (
    <Layout>
      <div className="feed">
        <h1>Professor Bob from Stony Brook University</h1>

        {user.sessionToken !== null && (
          <button className="create" onClick={() => setCreating(!creating)}>
            Create Review
          </button>
        )}

        <div className="createReview">
          <Link to="/create-review">Create Review</Link>
        </div>
        {creating ? (
          <CreateReview />
        ) : (
          reviews?.map((review, i) => <Review review={review} key={i} />)
        )}
      </div>
    </Layout>
  );
}
