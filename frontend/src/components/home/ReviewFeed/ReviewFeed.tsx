import "./ReviewFeed.scss";
import Review from "../Review/Review";
import { useMemo, useState } from "react";
import { Review as ReviewType } from "../../../features/reviews/reviewsSlice";

interface ReviewFeedProps {
  reviews: ReviewType[];
  courses: string[];
}
export default function ReviewFeed({ reviews, courses }: ReviewFeedProps) {
  const [courseFilter, setCourseFilter] = useState("");

  const filteredReviews = useMemo(() => {
    if (!reviews) {
      return [];
    }

    if (courseFilter === "") {
      return reviews;
    }

    return reviews.filter((r) => r.course === courseFilter);
  }, [reviews, courseFilter]);

  return (
    <>
      {reviews.length > 0 && (
        <select
          className="filter"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value={""}>All Courses</option>

          {courses.map((course, i) => (
            <option value={course} key={i}>
              {course}
            </option>
          ))}
        </select>
      )}

      {filteredReviews.map((review, i) => (
        <Review review={review} key={i} />
      ))}
    </>
  );
}
