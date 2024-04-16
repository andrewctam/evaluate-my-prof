import { ReviewAction, ReviewActionType, ReviewState } from "../types/review-types";

export 
const reviewReducer = (state: ReviewState, action: ReviewAction) => {
  const { type, payload } = action;
  switch (type) {
    case ReviewActionType.ADD_REVIEW:
      const review = {
        ...payload,
        id: state.reviews.length,
      };
      return { reviews: [...state.reviews, review] };
    case ReviewActionType.ADD_COMMENT:
      const { id, comment } = payload;
      const newReviews = [...state.reviews];
      const reviewIndex = newReviews.findIndex((review) => review.id === id);
      if (reviewIndex === -1) {
        console.log("Review not found");
        return state;
      }
      newReviews[reviewIndex].comments.push(comment);
      return { reviews: newReviews };
    case ReviewActionType.VOTE:
      const { id: voteId, change } = payload;
      const voteReviews = [...state.reviews];
      const voteIndex = voteReviews.findIndex(
        (review) => review.id === voteId
      );
      if (voteIndex === -1) {
        console.log("Review not found");
        return state;
      }
      voteReviews[voteIndex].votes += change;
      return { reviews: voteReviews };
    default:
      return state;
  }
};
