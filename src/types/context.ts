import React from "react";
import { UserAction, UserState } from "./user-types";
import { emptyFunction, initialReviewState, initialUserState } from "./initial-states";
import { ReviewAction, ReviewState } from "./review-types";

export const UserContext = React.createContext<UserState>(initialUserState);
export const UserDispatchContext =
  React.createContext<React.Dispatch<UserAction>>(emptyFunction);

export const ReviewContext =
  React.createContext<ReviewState>(initialReviewState);
export const ReviewDispatchContext =
  React.createContext<React.Dispatch<ReviewAction>>(emptyFunction);
