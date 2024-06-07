import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export interface UserState {
  username: string;
  sessionToken: string | null;
}

const initialState: UserState = {
  username: localStorage.getItem("username") || "",
  sessionToken: localStorage.getItem("sessionToken"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("username");
      localStorage.removeItem("sessionToken");

      return { username: "", sessionToken: null };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        apiSlice.endpoints.register.matchFulfilled,
        apiSlice.endpoints.login.matchFulfilled
      ),
      (state, action) => {
        console.log(state);
        const { username, sessionToken } = action.payload;

        localStorage.setItem("username", username);
        localStorage.setItem("sessionToken", sessionToken);

        return { username, sessionToken };
      }
    );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
