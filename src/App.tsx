import React, { useReducer } from "react";
import "./App.scss";
import Home from "./home/Home/Home";
import {
  ReviewAction,
  ReviewActionType,
  ReviewState,
  initialReviewState,
} from "./types/review-types";

import {
  UserAction,
  UserActionType,
  UserState,
  initialUserState,
} from "./types/user-types";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./user/Profile/Profile";

const emptyFunction = () => {};
export const UserContext = React.createContext<UserState>(initialUserState);
export const UserDispatchContext =
  React.createContext<React.Dispatch<UserAction>>(emptyFunction);

export const ReviewContext =
  React.createContext<ReviewState>(initialReviewState);
export const ReviewDispatchContext =
  React.createContext<React.Dispatch<ReviewAction>>(emptyFunction);

export default function App() {
  const userReducer = (state: UserState, action: UserAction) => {
    const { type, payload } = action;
    switch (type) {
      case UserActionType.SWITCH:
        if (state.users.some((user) => user.name === payload.name)) {
          return { ...state, currentUser: payload };
        } else {
          console.log("User not found");
          return state;
        }
      case UserActionType.ADD:
        if (state.users.some((user) => user.name === payload.name)) {
          console.log("User already exists");
          return state;
        } else {
          return { ...state, users: [...state.users, payload] };
        }
      default:
        return state;
    }
  };
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const reviewReducer = (state: ReviewState, action: ReviewAction) => {
    const { type, payload } = action;
    switch (type) {
      case ReviewActionType.ADD_REVIEW:
        const review = {
          ...payload,
          id: state.reviews.length,
        }
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
        const voteIndex = voteReviews.findIndex((review) => review.id === voteId);
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
  const [reviewState, reviewDispatch] = useReducer(reviewReducer, initialReviewState);

  return (
    <UserContext.Provider value={userState}>
      <UserDispatchContext.Provider value={userDispatch}>
        <ReviewContext.Provider value={reviewState}>
          <ReviewDispatchContext.Provider value={reviewDispatch}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="profile/:username" element={<Profile />} />
              </Routes>
            </BrowserRouter>
          </ReviewDispatchContext.Provider>
        </ReviewContext.Provider>
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
