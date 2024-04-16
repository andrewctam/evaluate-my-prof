import { UserAction, UserActionType, UserState } from "../types/user-types";

export const userReducer = (state: UserState, action: UserAction) => {
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