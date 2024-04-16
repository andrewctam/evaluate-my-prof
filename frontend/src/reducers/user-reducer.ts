import { UserAction, UserActionType, UserState } from "../types/user-types";

export const userReducer = (state: UserState, action: UserAction) => {
    const { type, payload } = action;
    switch (type) {
      case UserActionType.LOGIN:
        localStorage.setItem("username", payload.username);
        localStorage.setItem("sessionToken", payload.sessionToken);
        return { username: payload.username, sessionToken: payload.sessionToken };
      case UserActionType.LOGOUT:
        localStorage.removeItem("username");
        localStorage.removeItem("sessionToken");
        return { username: "" , sessionToken: null };
      default:
        return state;
    }
  };