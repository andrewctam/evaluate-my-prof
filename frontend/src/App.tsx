import { useReducer } from "react";
import "./App.scss";
import Home from "./components/home/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/user/Profile/Profile";
import { initialUserState } from "./types/constants";
import {
  UserContext,
  UserDispatchContext,
} from "./types/context";
import { userReducer } from "./reducers/user-reducer";

export default function App() {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={userState}>
      <UserDispatchContext.Provider value={userDispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile/:username" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
