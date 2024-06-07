import "./Home.scss";
import Review from "../Review/Review";
import ReviewInput from "../ReviewInput/ReviewInput";
import Layout from "../../layout/Layout";
import { useGetReviewsQuery } from "../../../features/api/apiSlice";

export default function Home() {
  const { data: reviews } = useGetReviewsQuery();

  return (
    <Layout>
      <div className="feed">
        <h1>Professor Bob from Stony Brook University</h1>
        <ReviewInput />

        {reviews?.map((review, i) => (
          <Review review={review} key={i}/>
        ))}
      </div>
    </Layout>
  );
}
