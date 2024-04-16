import { UserState } from "./user-types";

export const emptyFunction = () => {};

export const initialUserState: UserState = {
    username: localStorage.getItem("username") || "",
    sessionToken: localStorage.getItem("sessionToken")
}
