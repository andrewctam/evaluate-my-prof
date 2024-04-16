import { useContext, useState } from "react";

import "./Review.scss";
import {
  Comment as CommentType,
  Review as ReviewType,
} from "../../../types/review-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../types/context";

interface ReviewProps {
  review: ReviewType;
  refreshParent: () => void;
}

export default function Review({ review, refreshParent }: ReviewProps) {
  const [addingComment, setAddingComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const userState = useContext(UserContext);

  const addCommentOrVote = async (action: "vote" | "comment", change?: 1 | -1) => {
    if (userState.sessionToken === null) {
      return;
    }
    const url = `${import.meta.env.VITE_API_URL}/reviews/${action}`;
    const body = JSON.stringify({
      authorUsername: userState.username,
      sessionToken: userState.sessionToken,
      reviewId: review.id,
      text: action === "comment" ? commentText : undefined,
      vote: action === "vote" ? change : undefined
    })
    const config = { 
      headers: {
        "Content-Type": "application/json"
      }
    }
    await axios.post(url, body, config)
    .then((response) => {
      console.log(response);
      if (action === "comment") {
        setCommentText("");
        setAddingComment(false);
      }
      refreshParent();
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="review">
      <div className="vote">
        <div className="arrow" onClick={() => addCommentOrVote("vote", 1)}>
          ▲
        </div>
        <div>{review.votes}</div>
        <div className="arrow" onClick={() => addCommentOrVote("vote", -1)}>
          ▼
        </div>
      </div>

      <div>
        <Link to={`/profile/${review.authorName}`}>
          <span className="username">{review.authorName}</span>
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

          <button onClick={() => addCommentOrVote("comment")}>Post</button>
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
  const name = comment.posterName;
  return (
    <div className="comment">
      <Link to={`/profile/${name}`}>
        <div className="username">{name}</div>
      </Link>

      {comment.text}
    </div>
  );
}
