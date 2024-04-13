import { Review as ReviewType } from "../types";

import "./Review.scss";

interface ReviewProps {
  review: ReviewType;
  vote: (change: number) => void;
}

export default function Review({ review, vote }: ReviewProps) {
  return (
    <div className="review">
      <div>
        <span className="author">{review.author.name}</span>'s review of{" "}
        <span className="course">{review.course}</span>
      </div>

      <div className="reviewBody">
        <div className="vote">
          <div className="arrow" onClick={() => vote(1)}>
            ▲
          </div>
          <div>{review.votes}</div>
          <div className="arrow" onClick={() => vote(-1)}>
            ▼
          </div>
        </div>

        <div className="boxes">
          <Box name="Rating" value={review.rating + "/5"} />
          <Box name="Difficulty" value={review.difficulty + "/5"} />
          <Box name="Amount Learned" value={review.amountLearned + "/5"} />
          <Box name="Lecture Quality" value={review.lectureQuality + "/5"} />
          <Box name="Hours Per Week" value={review.hrsPerWeek.toString()} />
        </div>
      </div>

      <div className="box body">{review.text}</div>
    </div>
  );
}

interface BoxProps {
  name: string;
  value: string;
}
function Box({ name, value }: BoxProps) {
  return (
    <div className="box">
      <div className="name">{name}</div>
      <div>{value}</div>
    </div>
  );
}
