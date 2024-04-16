import { ReviewState } from "./review-types";
import { UserState } from "./user-types";

const savedUsers = localStorage.getItem("userState");
const savedReviews = localStorage.getItem("reviewState");

export const emptyFunction = () => {};

export const initialUserState: UserState = savedUsers
  ? JSON.parse(savedUsers)
  : {
      users: [],
      currentUser: null,
    };

export const initialReviewState: ReviewState = savedReviews
  ? JSON.parse(savedReviews)
  : {
      reviews: [],
    };
