import { UserState } from "./user-types";

export const emptyFunction = () => {};

export const initialUserState: UserState = {
    username: localStorage.getItem("username") || "",
    sessionToken: localStorage.getItem("sessionToken")
}

export const API_URL = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL;
