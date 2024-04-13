import { useContext, useState } from "react";

import "./Review.scss";
import {
  Comment as CommentType,
  ReviewActionType,
  Review as ReviewType,
} from "../../types/review-types";
import { Link } from "react-router-dom";
import { ReviewDispatchContext, UserContext } from "../../types/context";

interface ReviewProps {
  review: ReviewType;
}

export default function Review({ review }: ReviewProps) {
  const userContext = useContext(UserContext);
  const reviewDispatch = useContext(ReviewDispatchContext);

  const [addingComment, setAddingComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const loggedIn = userContext.currentUser;

  const addComment = () => {
    if (!loggedIn) {
      alert("Not Logged In!");
      return;
    }

    reviewDispatch({
      type: ReviewActionType.ADD_COMMENT,
      payload: {
        id: review.id,
        comment: {
          poster: { name: loggedIn.name },
          text: commentText,
        },
      },
    });
    setCommentText("");
    setAddingComment(false);
  };

  const vote = (change: number) => {
    if (!loggedIn) {
      alert("Not Logged In!");
      return;
    }

    reviewDispatch({
      type: ReviewActionType.VOTE,
      payload: { id: review.id, change },
    });
  };

  return (
    <div className="review">
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
        <Link to={`/profile/${review.author.name}`}>
          <span className="username">{review.author.name}</span>
        </Link>
        <span>'s review of </span>
        <span className="course">{review.course}</span>
      </div>

      <div className="boxes">
        <Box name="Rating" value={review.rating + "/5"} />
        <Box name="Difficulty" value={review.difficulty + "/5"} />
        <Box name="Amount Learned" value={review.amountLearned + "/5"} />
        <Box name="Lecture Quality" value={review.lectureQuality + "/5"} />
        <Box name="Hours Per Week" value={review.hrsPerWeek.toString()} />
      </div>

      <div className="reviewText">{review.text}</div>

      {review.comments.map((comment, i) => (
        <Comment key={i} comment={comment} />
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

interface CommentProps {
  comment: CommentType;
}
function Comment({ comment }: CommentProps) {
  const name = comment.poster.name;
  return (
    <div className="comment">
      <Link to={`/profile/${name}`}>
        <div className="username">{name}</div>
      </Link>

      {comment.text}
    </div>
  );
}
