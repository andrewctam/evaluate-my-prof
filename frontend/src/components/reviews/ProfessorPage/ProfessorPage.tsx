import "./ProfessorPage.scss";
import Layout from "../../layout/Layout";
import { useGetFileteredReviewsQuery } from "../../../features/api/apiSlice";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import CreateReview from "../CreateReview/CreateReview";
import ReviewFeed from "../ReviewFeed/ReviewFeed";

export default function ProfessorPage() {
  const params = useParams();
  const profName = params?.profName;
  const schoolName = params?.schoolName;

  if (!profName || !schoolName) {
    return null;
  }

  const { data: reviews } = useGetFileteredReviewsQuery({
    authorName: "",
    profName,
    schoolName,
  });

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
  }, [reviews]);

  return (
    <Layout>
      <div className="feed">
        <h1>{`${profName} from ${schoolName}`}</h1>

        {user.sessionToken !== null && (
          <div
            className={`createReview ${creating ? "cancel" : ""}`}
            onClick={() => setCreating(!creating)}
          >
            {creating ? "Cancel" : "Create New Review"}
          </div>
        )}

        {creating ? (
          <CreateReview
            close={() => setCreating(false)}
            schoolName={schoolName}
            profName={profName}
            courses={courses}
          />
        ) : (
          <ReviewFeed reviews={reviews ?? []} showCourseFilter />
        )}
      </div>
    </Layout>
  );
}
