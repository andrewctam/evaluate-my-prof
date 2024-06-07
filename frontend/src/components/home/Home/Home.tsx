import "./Home.scss";
import Review from "../Review/Review";
import Layout from "../../layout/Layout";
import { useGetReviewsQuery } from "../../../features/api/apiSlice";
import { useMemo, useState } from "react";
import CreateReview from "../CreateReview/CreateReview";
import { useAppSelector } from "../../../app/hooks";

export default function Home() {
  const { data: reviews } = useGetReviewsQuery();

  const user = useAppSelector((state) => state.user);

  const [creating, setCreating] = useState(false);

  const courses = useMemo(() => {
    if (!reviews) {
      return [];
    }

    const courseSet = new Set<string>();
    reviews.forEach((review) => courseSet.add(review.course));

    const arr = Array.from(courseSet);
    arr.sort();
    return arr;
  }, [reviews])
  
  return (
    <Layout>
      <div className="feed">
        <h1>Professor Bob from Stony Brook University</h1>

        {user.sessionToken !== null && (
          <button className="create" onClick={() => setCreating(!creating)}>
            Create Review
          </button>
        )}

        {creating ? (
          <CreateReview close={() => setCreating(false)} courses={courses}/>
        ) : (
          reviews?.map((review, i) => <Review review={review} key={i} />)
        )}
      </div>
    </Layout>
  );
}
