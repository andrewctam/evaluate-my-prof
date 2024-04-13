import {  useState } from "react";

import "./Review.scss";
import { Review as ReviewType } from "../../types";

interface ReviewProps {
  review: ReviewType;
  vote: (change: number) => void;
  comment: (text: string) => void;
}

export default function Review({ review, vote, comment }: ReviewProps) {
  const [addingComment, setAddingComment] = useState(false);
  const [commentText, setCommentText] = useState("");


  const addComment = () => {
    comment(commentText);
    setCommentText("");
    setAddingComment(false);
  };
  return (
    <div className="review">
      <div>
        <span className="username">{review.author.name}</span>'s review of{" "}
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
        <div>
          <div className="boxes">
            <Box name="Rating" value={review.rating + "/5"} />
            <Box name="Difficulty" value={review.difficulty + "/5"} />
            <Box name="Amount Learned" value={review.amountLearned + "/5"} />
            <Box name="Lecture Quality" value={review.lectureQuality + "/5"} />
            <Box name="Hours Per Week" value={review.hrsPerWeek.toString()} />
          </div>

          <div className="box">{review.text}</div>
        </div>
      </div>

      {review.comments.map((comment, i) => (
        <div key={i} className="comment">
          <div className="username">{comment.poster.name}</div>
          {comment.text}
        </div>
      ))}

      {addingComment && (
        <>
          <textarea
            className="commentBox"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <button onClick={addComment}>Post</button>
        </>
      )}

      <div
        className="addComment"
        onClick={() => setAddingComment(!addingComment)}
      >
        {addingComment ? "Cancel Comment" : "Add Comment"}
      </div>
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
