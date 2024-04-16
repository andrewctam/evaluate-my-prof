import React from "react";
import { UserAction, UserState } from "./user-types";
import { emptyFunction, initialUserState } from "./constants";

export const UserContext = React.createContext<UserState>(initialUserState);
export const UserDispatchContext =
  React.createContext<React.Dispatch<UserAction>>(emptyFunction);
  