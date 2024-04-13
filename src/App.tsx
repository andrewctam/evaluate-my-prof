import { useEffect, useReducer } from "react";
import "./App.scss";
import Home from "./home/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./user/Profile/Profile";
import { initialReviewState, initialUserState } from "./types/initial-states";
import {
  ReviewContext,
  ReviewDispatchContext,
  UserContext,
  UserDispatchContext,
} from "./types/context";
import { reviewReducer } from "./reducers/review-reducer";
import { userReducer } from "./reducers/user-reducer";

export default function App() {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [reviewState, reviewDispatch] = useReducer(reviewReducer, initialReviewState);

  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(userState));
    localStorage.setItem("reviewState", JSON.stringify(reviewState));
  }, [userState, reviewState]);

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
