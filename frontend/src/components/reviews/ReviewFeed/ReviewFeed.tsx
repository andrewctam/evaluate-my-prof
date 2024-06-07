import "./ReviewFeed.scss";
import Review from "../../reviews/Review/Review";
import { useMemo, useState } from "react";
import { Review as ReviewType } from "../../../features/reviews/reviewsSlice";

interface ReviewFeedProps {
  reviews: ReviewType[];
  showCourseFilter?: boolean;
  showSchoolFilter?: boolean;
  showProfFilter?: boolean;
  reviewShowProfSchool?: boolean;
}
export default function ReviewFeed({
  reviews,
  showCourseFilter,
  showProfFilter,
  showSchoolFilter,
  reviewShowProfSchool,
}: ReviewFeedProps) {
  const [courseFilter, setCourseFilter] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [profFilter, setProfFilter] = useState("");

  const [courses, schools, profs] = useMemo(() => {
    if (!reviews) {
      return [[], [], []];
    }
    const courseSet = new Set<string>();
    const schoolSet = new Set<string>();
    const profSet = new Set<string>();

    reviews.forEach((review) => {
      courseSet.add(review.course)
      schoolSet.add(review.schoolName)
      profSet.add(review.profName)
    });

    const courseArr = Array.from(courseSet);
    courseArr.sort();

    const schoolArr = Array.from(schoolSet);
    schoolArr.sort();

    const profArr = Array.from(profSet);
    profArr.sort();

    return [courseArr, schoolArr, profArr];
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (!reviews) {
      return [];
    }
    let filtered = reviews;
    if (courseFilter !== "") {
      filtered = filtered.filter((r) => r.course === courseFilter);
    }

    if (schoolFilter !== "") {
      filtered = filtered.filter((r) => r.schoolName === schoolFilter);
    }

    if (profFilter !== "") {
      filtered = filtered.filter((r) => r.profName === profFilter);
    }

    return filtered;
  }, [reviews, courseFilter, schoolFilter, profFilter]);

  if (reviews.length === 0) {
    return <div className="noReviews">No Reviews Yet</div>;
  }

  return (
    <>
      {showCourseFilter && (
        <Filter
          options={courses}
          value={courseFilter}
          update={setCourseFilter}
          name="Courses"
        />
      )}
      {showSchoolFilter && (
        <Filter
          options={schools}
          value={schoolFilter}
          update={setSchoolFilter}
          name="Schools"
        />
      )}
      {showProfFilter && (
        <Filter
          options={profs}
          value={profFilter}
          update={setProfFilter}
          name="Professors"
        />
      )}

      {filteredReviews.map((review, i) => (
        <Review review={review} key={i} showProfSchool={reviewShowProfSchool}/>
      ))}
    </>
  );
}

interface FilterProps {
  options: string[];
  value: string;
  update: (value: string) => void;
  name: string;
}
const Filter = ({ options, value, update, name }: FilterProps) => {
  return (
    <select
      className="filter"
      value={value}
      onChange={(e) => update(e.target.value)}
    >
      <option value={""}>{`All ${name}`}</option>

      {options.map((option, i) => (
        <option value={option} key={i}>
          {option}
        </option>
      ))}
    </select>
  );
};
